import { Player, PokemonLocation } from "models/db.model";

import { getPokemonByOrigin } from "./getPokemonByOrigin";

export function getPokemonLocationByOrigin(
  playerArr: Player[],
  origin: string,
): PokemonLocation {
  const pokemonArr = getPokemonByOrigin({ playerArr, origin }).filter(
    (p) => !!p,
  );
  const pokemonLocation: PokemonLocation =
    pokemonArr?.[0]?.location || PokemonLocation.grave;
  return pokemonLocation;
}
