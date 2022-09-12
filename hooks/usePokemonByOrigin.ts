import { IPokemon, PlaceName, Player } from "models/db.model";

import { useRunChild } from "./useRun";

export function usePokemonByOrigin(origin: PlaceName) {
  const players = useRunChild<Record<string, Player>>("players", {});

  const allPokemonOfOrigin: IPokemon[] = [];
  const playerArr = Object.values(players.value || {});
  for (const p of playerArr) {
    const pokemonOfOrigin = Object.values(p.pokemon).find(
      (pokemon) => pokemon.origin === origin,
    );
    if (pokemonOfOrigin) allPokemonOfOrigin.push(pokemonOfOrigin);
  }
  return allPokemonOfOrigin;
}
