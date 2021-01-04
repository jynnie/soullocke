import type firebase from "firebase";
import { EventType, Pokemon, PokemonLocation } from "models";
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
  //- Timeline

  public addNewLocation = async (location: PlaceName) => {
    if (!this.runData || !this.runRef) return;

    let index: number = 0;
    if (this.runData.timeline) {
      const prevLargest = oVal(this.runData.timeline).reduce((prev, current) =>
        prev.index > current.index ? prev : current,
      );
      index = prevLargest.index + 1;
    }

    const newLocationRef = await this.runRef.child(`timeline`).push();
    const newTimeline: Timeline = {
      key: newLocationRef.key,
      index,
      name: location,
    };
    await newLocationRef.set(newTimeline);
    return location;
  };

  public deleteLocation = async (key: string) => {
    if (!this.runRef) return;

    await this.runRef.child(`timeline/${key}`).set(null);
    return key;
  };

  //----------------------------------#01F2DF
  //- Add Pokemon

  public addCaughtPokemon = async (
    pokemonName: string,
    nickname: string,
    playerId: string,
    locationCaught: PlaceName,
  ) => {
    if (!this.runRef) return;

    const events: PokemonEvents = {
      0: { index: "0", type: EventType.catch, location: locationCaught },
    };
    const newPokemonRef = this.runRef.child(
      `players/${playerId}/pokemon/${locationCaught}`,
    );
    const pokemon: Pokemon = {
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

  public addMissedPokemon = () => {};

  //----------------------------------#01F2DF
  //- Soullocked Changes

  public moveToBox = () => {};

  public moveToDaycare = () => {};

  public moveToTeam = () => {};

  public markAsDefeated = () => {};

  //----------------------------------#01F2DF
  //- Other Pokemon Events

  public addEvolution = () => {};

  public removePokemon = () => {};

  // Take care that soullink doesn't get
  // desynced
  public removeEvent = () => {};
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
