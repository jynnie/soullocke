import type firebase from "firebase";
import {
  EventType,
  MapLocation,
  Pokemon,
  PokemonEvent,
  PokemonLocation,
} from "models";
import type {
  PlaceName,
  PokemonEvents,
  Run as RunData,
  Timeline,
} from "models";

import { oVal } from "./utils";

type Ref = firebase.database.Reference;

export class Run {
  runRef: Ref;
  runData: RunData;
  patchNum: number = 0;
  allLocations: string[] = [];

  constructor(runRef: Ref) {
    this.runRef = runRef;
  }

  public attachRef = (runRef: Ref) => {
    this.runRef = runRef;
  };

  public attachData = (allLocations: string[]) => {
    this.allLocations = allLocations;
  };

  public updateRunData = (runData: RunData) => {
    this.runData = runData;
    this.patchNum += 1;
  };

  //----------------------------------#01F2DF
  //- Helper Filters

  private filterForPokemonNotMissed = (p: Pokemon): boolean => {
    return (
      !!p.name &&
      oVal(p.events || {}).every(
        (e) => e.type !== EventType.missed && e.type !== EventType.soulMiss,
      )
    );
  };

  private filterForPokemonDefeated = (p: Pokemon): boolean => {
    return (
      !!p.name &&
      oVal(p.events || {}).some((e) => e.type === EventType.defeated)
    );
  };

  private filterForPokemonMissed = (p: Pokemon): boolean => {
    return (
      !!p.name && oVal(p.events || {}).some((e) => e.type === EventType.missed)
    );
  };

  //----------------------------------#01F2DF
  //- Getters

  public getPlayersArray = () => {
    if (!this.runData) return;
    const playersArr = oVal(this.runData.players);
    return playersArr;
  };

  public getPlayer = (id: string) => {
    return this.runData?.players?.[id];
  };

  public getPlayerPokemonArr = (id: string) => {
    return oVal(this.runData.players[id]?.pokemon || []);
  };

  public getPokemonOnTeam = (): { [playerId: string]: Pokemon[] } => {
    if (!this.runData || !this.runData.players) return {};

    const result = {};
    const playersArr = oVal(this.runData.players);
    playersArr.forEach((player) => {
      const pokemonOnTeam = oVal(player.pokemon || []).filter(
        (p) => p.location === PokemonLocation.team,
      );
      result[player.id] = pokemonOnTeam;
    });
    return result;
  };

  public getPokemonOnPlayerTeam = (playerId: string) => {
    if (!this.runData || !this.runData.players || !playerId) return;

    return this.getPlayerPokemonArr(playerId).filter(
      (p) => p.location === PokemonLocation.team,
    );
  };

  public getPokemonInPlayerBox = (
    playerId: string,
    includeDaycare: boolean = false,
  ) => {
    if (!this.runData || !this.runData.players || !playerId) return;

    return this.getPlayerPokemonArr(playerId).filter(
      (p) =>
        p.location === PokemonLocation.box ||
        (includeDaycare ? p.location === PokemonLocation.daycare : false),
    );
  };

  public getPokemonInPlayerGraveyard = (
    playerId: string,
    dontCountMisses: boolean = false,
  ) => {
    if (!this.runData || !this.runData.players || !playerId) return;

    const pokemonInGrave = this.getPlayerPokemonArr(playerId).filter(
      (p) => p.location === PokemonLocation.grave,
    );

    if (!dontCountMisses) return pokemonInGrave;
    return pokemonInGrave.filter(this.filterForPokemonNotMissed);
  };

  public getPlayerDefeatCount = (playerId: string) => {
    if (!this.runData || !this.runData.players || !playerId) return;

    const pokemonDefeated = this.getPlayerPokemonArr(playerId).filter(
      this.filterForPokemonDefeated,
    );
    return pokemonDefeated.length;
  };

  public getPlayerMissedCount = (playerId: string) => {
    if (!this.runData || !this.runData.players || !playerId) return;

    const pokemonMissed = this.getPlayerPokemonArr(playerId).filter(
      this.filterForPokemonMissed,
    );
    return pokemonMissed.length;
  };

  public getPokemonByOrigin = (origin: string): (Pokemon | null)[] => {
    if (!this.runData) return [];

    const playersArr = this.getPlayersArray();
    const matchingPokemon = playersArr.map(
      (player) => player.pokemon?.[origin],
    );

    return matchingPokemon;
  };

  public getPokemonLocationByOrigin = (origin: string): PokemonLocation => {
    const pokemonArr = this.getPokemonByOrigin(origin).filter((p) => !!p);
    const pokemonLocation = pokemonArr?.[0]?.location || PokemonLocation.grave;
    return pokemonLocation;
  };

  public haveAllPlayersGotPokemonAt = (origin: string) => {
    if (!this.runData) return;

    const existingPokemon = this.getPokemonByOrigin(origin).filter((p) => !!p);
    const playersArr = this.getPlayersArray();
    return existingPokemon.length === playersArr.length;
  };

  public getTimelineLocations = (): Timeline[] => {
    const timelineLocations = oVal(this.runData?.timeline || []).sort(
      (a, b) => a.index - b.index,
    );
    return timelineLocations;
  };

  public getTimelineLocationNames = (): PlaceName[] => {
    const timelineLocations = this.getTimelineLocations().map((l) => l.name);
    return timelineLocations;
  };

  public getEarnedBadges = (): PlaceName[] => {
    const allLocations = this.getTimelineLocationNames();
    const allBadges = allLocations.filter((name) => /badge/gi.test(name));
    return allBadges;
  };

  public getLatestLocation = (): PlaceName => {
    const latestLocation = this.getTimelineLocationNames()?.slice(-1)?.[0];
    return latestLocation;
  };

  public getLocationNotes = (place: PlaceName): string => {
    if (!this.runData) return;

    return this.runData.timeline?.[place]?.notes;
  };

  //----------------------------------#01F2DF
  //- Organizational Helpers

  public groupByOrigin = (
    allPokemon: Pokemon[],
  ): { [origin: string]: Pokemon[] } => {
    const result = {};
    for (let pokemon of allPokemon) {
      const origin = pokemon.origin;
      if (origin in result) continue;
      result[origin] = allPokemon.filter((p) => p.origin === origin);
    }
    return result;
  };

  //----------------------------------#01F2DF
  //- Timeline

  public addNewLocation = async (location: PlaceName) => {
    if (!this.runData || !this.runRef || !location) return;

    let index: number = 0;
    if (this.runData.timeline) {
      const prevLargest = oVal(this.runData.timeline).reduce((prev, current) =>
        prev.index > current.index ? prev : current,
      );
      index = prevLargest.index + 1;
    }

    await this.runRef.child(`timeline/${location}`).set({
      key: location,
      index,
      name: location,
    });
    return location;
  };

  public deleteLocation = async (key: string) => {
    if (!this.runRef) return;

    await this.runRef.child(`timeline/${key}`).set(null);

    const playerArr = oVal(this.runData.players);
    for (let player of playerArr) {
      await this.runRef.child(`players/${player.id}/pokemon/${key}`).set(null);
    }

    return key;
  };

  public setTimelineOrder = async (newOrder: Timeline[]) => {
    if (!this.runRef) return;

    const result = newOrder.reduce((acc, t) => ({ ...acc, [t.name]: t }), {});

    return this.runRef.child("timeline").set(result);
  };

  public saveLocationNotes = (place: PlaceName, notes: string) => {
    if (!this.runData) return;

    return this.runRef.child(`timeline/${place}/notes`).set(notes);
  };

  //----------------------------------#01F2DF
  //- Add Pokemon

  public addPokemon = async (
    pokemonName: string,
    nickname: string,
    playerId: string,
    locationCaught: PlaceName,
    caught: boolean = true,
  ) => {
    if (!this.runRef) return;

    let pokemon;
    if (caught) {
      pokemon = await this.addCaughtPokemon(
        pokemonName,
        nickname,
        playerId,
        locationCaught,
      );
    } else {
      pokemon = await this.addMissedPokemon(
        pokemonName,
        nickname,
        playerId,
        locationCaught,
      );
    }

    return pokemon;
  };

  private addCaughtPokemon = async (
    pokemonName: string,
    nickname: string,
    playerId: string,
    locationCaught: PlaceName,
  ) => {
    const events: PokemonEvents = {
      0: { index: "0", type: EventType.catch, location: locationCaught },
    };
    const newPokemonRef = this.runRef.child(
      `players/${playerId}/pokemon/${locationCaught}`,
    );
    const pokemon: Pokemon = {
      playerId,
      origin: locationCaught,
      name: pokemonName,
      nickname,
      events,
      location: PokemonLocation.box, // FIXME
      shiny: false, // FIXME
    };
    await newPokemonRef.set(pokemon);
    return pokemon;
  };

  private addMissedPokemon = async (
    pokemonName: string,
    nickname: string,
    playerId: string,
    locationCaught: PlaceName,
  ) => {
    this.soulDeath(playerId, locationCaught, locationCaught, true);

    const events: PokemonEvents = {
      0: { index: "0", type: EventType.missed, location: locationCaught },
    };
    const newPokemonRef = this.runRef.child(
      `players/${playerId}/pokemon/${locationCaught}`,
    );
    const pokemon: Pokemon = {
      playerId,
      origin: locationCaught,
      name: pokemonName,
      nickname,
      events,
      location: PokemonLocation.grave, // FIXME
      shiny: false, // FIXME
    };
    await newPokemonRef.set(pokemon);
    return pokemon;
  };

  public backfillPokemon = async (
    pokemonName: string,
    nickname: string,
    playerId: string,
    origin: string,
  ) => {
    if (!this.runRef) return;

    const newPokemonRef = this.runRef.child(
      `players/${playerId}/pokemon/${origin}`,
    );
    const pokemon = {
      playerId,
      origin,
      name: pokemonName,
      nickname,
      shiny: false, // FIXME
    };
    await newPokemonRef.update(pokemon);

    const alive =
      this.runData?.players[playerId]?.pokemon[origin]?.location !==
      PokemonLocation.grave;
    if (alive) {
      const catchEvent: PokemonEvent = {
        index: "0",
        type: EventType.catch,
        location: origin,
      };
      await newPokemonRef.child("events/0").set(catchEvent);
    }

    return pokemon;
  };

  //----------------------------------#01F2DF
  //- Pokemon Events

  public addEvent = async (
    playerId: string,
    pokemonOrigin: string,
    type: EventType,
    location: PlaceName,
    details?: PokemonEvent["details"],
  ) => {
    if (!this.runRef) return;

    let event;
    if (type === EventType.moved && !!details?.location) {
      event = this.movePokemon(pokemonOrigin, location, details.location);
    } else if (type === EventType.defeated) {
      event = this.markAsDefeated(playerId, pokemonOrigin, location);
    } else if (type === EventType.evolved && !!details?.evolution) {
      event = this.addEvolution(
        playerId,
        pokemonOrigin,
        location,
        details.evolution,
      );
    }
    return event;
  };

  public editEvent = async (
    playerId: string,
    pokemonOrigin: string,
    index: string,
    type: EventType,
    location: PlaceName,
    details?: PokemonEvent["details"],
  ) => {
    const eventRef = this.runRef.child(
      `players/${playerId}/pokemon/${pokemonOrigin}/events/${index}`,
    );
    return eventRef.update({
      type,
      location,
      details,
    });
  };

  // This can potentially make the soullocke get out of sync
  public removeEvent = (
    playerId: string,
    pokemonOrigin: string,
    index: string,
  ) => {
    if (!this.runRef || !playerId || !pokemonOrigin) return;

    const eventRef = this.runRef.child(
      `players/${playerId}/pokemon/${pokemonOrigin}/events/${index}`,
    );
    return eventRef.set(null);
  };

  public swapPokemonOnTeam = async (
    originToTeam: PlaceName | PlaceName[],
    originFromTeam: PlaceName | PlaceName[],
    location: PlaceName,
  ) => {
    const joiningTeam = Array.isArray(originToTeam)
      ? originToTeam
      : [originToTeam];
    const leavingTeam = Array.isArray(originFromTeam)
      ? originFromTeam
      : [originFromTeam];

    const joiningPromises = joiningTeam.map((o) =>
      this.movePokemon(o, location, PokemonLocation.team),
    );
    const leavingPromises = leavingTeam.map((o) =>
      this.movePokemon(o, location, PokemonLocation.box),
    );
    await Promise.all([...joiningPromises, ...leavingPromises]);
    return true;
  };

  public movePokemon = async (
    pokemonOrigin: PlaceName,
    location: PlaceName,
    pokemonLocation: PokemonLocation,
  ) => {
    const playerArr = oVal(this.runData.players);
    let event;

    for (let player of playerArr) {
      const pokemonRef = this.runRef.child(
        `players/${player.id}/pokemon/${pokemonOrigin}`,
      );

      pokemonRef.child("origin").set(pokemonOrigin);
      pokemonRef.child("location").set(pokemonLocation);
      const eventRef = await pokemonRef.child("events").push();
      event = {
        index: eventRef.key,
        type: EventType.moved,
        location,
        details: {
          location: pokemonLocation,
        },
      };
      eventRef.set(event);
    }

    return event;
  };

  private markAsDefeated = (
    playerWhoDefeated: string,
    pokemonOrigin: PlaceName,
    location: PlaceName,
  ) => {
    if (!this.runRef || !this.runData) return;

    this.soulDeath(playerWhoDefeated, pokemonOrigin, location);

    const pokemonRef = this.runRef.child(
      `players/${playerWhoDefeated}/pokemon/${pokemonOrigin}`,
    );
    const eventRef = pokemonRef.child("events").push();
    const event = {
      index: eventRef.key,
      type: EventType.defeated,
      location,
      details: {
        location: PokemonLocation.grave,
      },
    };

    eventRef.set(event);
    pokemonRef.child("location").set(PokemonLocation.grave);

    return event;
  };

  private addEvolution = (
    playerId: string,
    pokemonOrigin: PlaceName,
    location: PlaceName,
    evolution: string,
  ) => {
    const pokemonRef = this.runRef.child(
      `players/${playerId}/pokemon/${pokemonOrigin}`,
    );

    pokemonRef.child("origin").set(pokemonOrigin);
    const eventRef = pokemonRef.child("events").push();
    const event = {
      index: eventRef.key,
      type: EventType.evolved,
      location,
      details: {
        evolution,
      },
    };
    eventRef.set(event);

    return event;
  };

  //----------------------------------#01F2DF
  //- Other Pokemon Events

  public removePokemon = () => {};

  private soulDeath = (
    playerResponsible: string,
    pokemonOrigin: PlaceName,
    location: PlaceName,
    missed: boolean = false,
  ) => {
    const playerArr = oVal(this.runData.players);
    let event;

    playerArr.forEach((player) => {
      const isPlayerResponsible = player.id === playerResponsible;
      if (!isPlayerResponsible) {
        const pokemonRef = this.runRef.child(
          `players/${player.id}/pokemon/${pokemonOrigin}`,
        );

        pokemonRef.child("origin").set(pokemonOrigin);
        pokemonRef.child("location").set(PokemonLocation.grave);
        const eventRef = pokemonRef.child("events").push();
        event = {
          index: eventRef.key,
          type: missed ? EventType.soulMiss : EventType.soulDeath,
          location,
          details: {
            location: PokemonLocation.grave,
          },
        };
        eventRef.set(event);
      }
    });

    return event;
  };
}

// FIXME: Make these specific functions instead
export const updatePokemonLocation =
  (runRef: Ref) =>
  async (
    playerId: string,
    pokemonIndex: string,
    pokemonLocation: PokemonLocation,
    timelineLocation: PlaceName,
  ) => {
    const pokemonRef = runRef.child(
      `players/${playerId}/pokemon/${pokemonIndex}`,
    );
    await pokemonRef.update({
      location: pokemonLocation,
    });
    await pokemonRef
      .child(`events/${timelineLocation}`)
      .update(pokemonLocation);
    return pokemonIndex;
  };

export default Run;
