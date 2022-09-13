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
  //- Getters

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
    _playerId: string,
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
