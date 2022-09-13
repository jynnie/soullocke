import { IPokemon, Player } from "models/db.model";

export function getPokemonByOrigin({
  playerArr,
  origin,
}: {
  playerArr: Player[];
  origin: string;
}): (IPokemon | null)[] {
  return playerArr.map((p) => p.pokemon?.[origin]);
}
