import type firebase from "firebase";
import { EventType, IPokemon, PokemonEvent, PokemonLocation } from "models";
import type { PlaceName, Run as RunData, Timeline } from "models";

import { oVal } from "../utils/utils";

type Ref = firebase.database.Reference;

export class Run {
  runRef: Ref;
  runData?: RunData;
  patchNum: number = 0;

  constructor(runRef: Ref) {
    this.runRef = runRef;
  }

  public attachRef = (runRef: Ref) => {
    this.runRef = runRef;
  };

  public updateRunData = (runData: RunData) => {
    this.runData = runData;
    this.patchNum += 1;
  };

  //----------------------------------#01F2DF
  //- Helper Filters

  private filterForPokemonNotMissed = (p: IPokemon): boolean => {
    return (
      !!p.name &&
      oVal(p.events || {}).every(
        (e) => e.type !== EventType.missed && e.type !== EventType.soulMiss,
      )
    );
  };

  //----------------------------------#01F2DF
  //- Getters

  public DEPRECATED_getPlayersArray = () => {
    if (!this.runData) return;
    const playersArr = oVal(this.runData.players);
    return playersArr;
  };

  public getPlayer = (id: string) => {
    return this.runData?.players?.[id];
  };

  public getPlayerPokemonArr = (id: string) => {
    return oVal(this.runData?.players[id]?.pokemon || []);
  };

  public getPokemonOnTeam = (): { [playerId: string]: IPokemon[] } => {
    if (!this.runData || !this.runData.players) return {};

    const result: Record<string, IPokemon[]> = {};
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

  public DEPRECATED_getPokemonByOrigin = (
    origin: string,
  ): (IPokemon | null)[] => {
    if (!this.runData) return [];

    const playersArr = this.DEPRECATED_getPlayersArray() || [];
    const matchingPokemon = playersArr.map(
      (player) => player.pokemon?.[origin],
    );

    return matchingPokemon;
  };

  public DEPRECATED_getPokemonLocationByOrigin = (
    origin: string,
  ): PokemonLocation => {
    const pokemonArr = this.DEPRECATED_getPokemonByOrigin(origin).filter(
      (p) => !!p,
    );
    const pokemonLocation = pokemonArr?.[0]?.location || PokemonLocation.grave;
    return pokemonLocation;
  };

  public DEPRECATED_getTimelineLocations = (): Timeline[] => {
    const timelineLocations = oVal(this.runData?.timeline || []).sort(
      (a, b) => a.index - b.index,
    );
    return timelineLocations;
  };

  public DEPRECATED_getTimelineLocationNames = (): PlaceName[] => {
    const timelineLocations = this.DEPRECATED_getTimelineLocations().map(
      (l) => l.name,
    );
    return timelineLocations;
  };

  public getLatestLocation = (): PlaceName => {
    const latestLocation =
      this.DEPRECATED_getTimelineLocationNames()?.slice(-1)?.[0];
    return latestLocation;
  };

  public DEPRECATED_getLocationNotes = (place: PlaceName): string => {
    if (!this.runData) return "";

    return this.runData.timeline?.[place]?.notes || "";
  };

  //----------------------------------#01F2DF
  //- Organizational Helpers

  public groupByOrigin = (
    allPokemon: IPokemon[],
  ): { [origin: string]: IPokemon[] } => {
    const result: Record<string, IPokemon[]> = {};
    for (let pokemon of allPokemon) {
      const origin = pokemon.origin;
      if (origin in result) continue;
      result[origin] = allPokemon.filter((p) => p.origin === origin);
    }
    return result;
  };

  //----------------------------------#01F2DF
  //- Timeline

  public saveLocationNotes = (place: PlaceName, notes: string) => {
    if (!this.runData) return;

    return this.runRef.child(`timeline/${place}/notes`).set(notes);
  };

  //----------------------------------#01F2DF
  //- Add Pokemon

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
      shiny: false, // FIXME:
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

  public DEPRECATED_addEvent = async (
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
      // event = this.markAsDefeated(playerId, pokemonOrigin, location);
    } else if (type === EventType.evolved && !!details?.evolution) {
      // event = this.addEvolution(
      //   playerId,
      //   pokemonOrigin,
      //   location,
      //   details.evolution,
      // );
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
    isLatestEvent?: boolean,
  ) => {
    // If this is the latest event, we'll change the pokemon's location and
    // other relevant details.
    if (isLatestEvent) {
      await this.removeEvent(playerId, pokemonOrigin, index);
      return this.DEPRECATED_addEvent(
        playerId,
        pokemonOrigin,
        type,
        location,
        details,
      );
    } else {
      const eventRef = this.runRef.child(
        `players/${playerId}/pokemon/${pokemonOrigin}/events/${index}`,
      );
      return eventRef.update({
        type,
        location,
        details,
      });
    }
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

  private movePokemon = async (
    pokemonOrigin: PlaceName,
    location: PlaceName,
    pokemonLocation: PokemonLocation,
  ) => {
    const playerArr = oVal(this.runData?.players || {});
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

  //----------------------------------#01F2DF
  //- Other Pokemon Events

  public removePokemon = () => {};
}

export default Run;
