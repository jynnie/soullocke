import type firebase from "firebase";
import { PokemonLocation, PokemonEvent, PlaceName } from "models";

export const addCaughtPokemon = (runRef: firebase.database.Reference) => {
  return (
    pokemonName: string,
    nickname: string,
    playerId: string,
    locationCaught: PokemonLocation,
  ) => {
    const events = { [locationCaught]: PokemonEvent.catch };
    const newPokemonRef = runRef.child(
      `players/${playerId}/pokemon/${locationCaught}`,
    );
    newPokemonRef.set({
      origin: locationCaught,
      name: pokemonName,
      nickname,
      events,
      shiny: false, // FIXME
    });
  };
};

export const updatePokemonLocation = (runRef: firebase.database.Reference) => {
  return (
    playerId: string,
    pokemonIndex: string,
    pokemonLocation: PokemonLocation,
    timelineLocation: PlaceName,
  ) => {
    const pokemonRef = runRef.child(
      `players/${playerId}/pokemon/${pokemonIndex}`,
    );
    pokemonRef.update({
      location: pokemonLocation,
    });
    pokemonRef.child(`events/${timelineLocation}`).update(pokemonLocation);
  };
};

export const runHelpers = {
  addCaughtPokemon,
  updatePokemonLocation,
};
export default runHelpers;
