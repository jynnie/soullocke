import type firebase from "firebase";
import { EventType, Pokemon, PokemonEvent, PokemonLocation } from "models";
import type {
  PokemonEvents,
  PlaceName,
  Timeline,
  Run as RunData,
} from "models";
import { oVal } from "./utils";

type Ref = firebase.database.Reference;

export class Run {
  runRef: Ref;
  runData: RunData;

  constructor(runRef: Ref) {
    this.runRef = runRef;
  }

  public attachRef = (runRef: Ref) => {
    this.runRef = runRef;
  };

  public updateRunData = (runData: RunData) => {
    this.runData = runData;
  };

  //----------------------------------#01F2DF
  //- Getters

  public getPlayersArray = () => {
    if (!this.runData) return;
    const playersArr = oVal(this.runData.players);
    return playersArr;
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

    return oVal(this.runData.players[playerId]?.pokemon || []).filter(
      (p) => p.location === PokemonLocation.team,
    );
  };

  public getPokemonByOrigin = (origin: string): (Pokemon | null)[] => {
    if (!this.runData) return [];

    const playersArr = this.getPlayersArray();
    const matchingPokemon = playersArr.map(
      (player) => player.pokemon?.[origin],
    );

    return matchingPokemon;
  };

  public getPlayerPokemonByOrigin = (origin: string, playerId: string) => {};

  public haveAllPlayersGotPokemonAt = (origin: string) => {
    if (!this.runData) return;

    const existingPokemon = this.getPokemonByOrigin(origin).filter((p) => !!p);
    const playersArr = this.getPlayersArray();
    return existingPokemon.length === playersArr.length;
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
    return key;
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
    this.soulDeath(playerId, locationCaught, locationCaught);

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

  // Take care that soullink doesn't get
  // desynced
  public removeEvent = (
    playerId: string,
    pokemonOrigin: string,
    index: string,
  ) => {
    if (!this.runRef) return;
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

  private movePokemon = (
    pokemonOrigin: PlaceName,
    location: PlaceName,
    pokemonLocation: PokemonLocation,
  ) => {
    const playerArr = oVal(this.runData.players);
    let event;

    playerArr.forEach((player) => {
      const pokemonRef = this.runRef.child(
        `players/${player.id}/pokemon/${pokemonOrigin}`,
      );

      pokemonRef.child("origin").set(pokemonOrigin);
      pokemonRef.child("location").set(pokemonLocation);
      const eventRef = pokemonRef.child("events").push();
      event = {
        index: eventRef.key,
        type: EventType.moved,
        location,
        details: {
          location: pokemonLocation,
        },
      };
      eventRef.set(event);
    });

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
  ) => {
    const playerArr = oVal(this.runData.players);
    let event;

    playerArr.forEach((player) => {
      const isPlayerResponsible = player.id === playerResponsible;
      const pokemonRef = this.runRef.child(
        `players/${player.id}/pokemon/${pokemonOrigin}`,
      );

      pokemonRef.child("origin").set(pokemonOrigin);
      pokemonRef.child("location").set(PokemonLocation.grave);
      const eventRef = pokemonRef.child("events").push();
      event = {
        index: eventRef.key,
        type: isPlayerResponsible ? EventType.defeated : EventType.soulDeath,
        location,
        details: {
          location: PokemonLocation.grave,
        },
      };
      eventRef.set(event);
    });

    return event;
  };
}

// FIXME: Make these specific functions instead
export const updatePokemonLocation = (runRef: Ref) => async (
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
  await pokemonRef.child(`events/${timelineLocation}`).update(pokemonLocation);
  return pokemonIndex;
};

export default Run;
