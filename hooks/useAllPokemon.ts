import { PokemonListApiData } from "models";
import { useEffect, useState } from "react";

/**
 * Get a list of all Pokémon in the Pokédex with their name and a
 * url to more information about them.
 */
export function useAllPokemon() {
  const [allPokemon, setAllPokemon] = useState<PokemonListApiData[]>([]);

  useEffect(() => {
    fetch("https://pokeapi.co/api/v2/pokemon?limit=1118")
      .then((res) => res.json())
      .then((data) => {
        const basePokemon = (data.results as PokemonListApiData[]).filter(
          (p: { name: string }) => !/(mega|gmax)/gi.test(p.name),
        );
        setAllPokemon(basePokemon);
      });
  }, []);

  return allPokemon;
}
