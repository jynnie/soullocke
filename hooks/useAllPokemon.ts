import { PokemonApiData, PokemonListApiData } from "models";
import { useEffect, useState } from "react";

/**
 * Get a list of all Pokémon in the Pokédex with their name and a
 * url to more information about them.
 */
export function useAllPokemon(): [
  PokemonListApiData[],
  Record<string, PokemonApiData>,
] {
  const [allPokemon, setAllPokemon] = useState<PokemonListApiData[]>([]);
  const [pokemonDef, setPokemonDef] = useState<Record<string, PokemonApiData>>(
    {},
  );

  useEffect(() => {
    fetch("https://pokeapi.co/api/v2/pokemon?limit=1318")
      .then((res) => res.json())
      .then((data) => {
        const basePokemon = (data.results as PokemonListApiData[]).filter(
          (p: { name: string }) =>
            !/((?<!yan)mega(?!nium)|gmax)/gi.test(p.name),
        );
        setAllPokemon(basePokemon);
      });
  }, []);

  useEffect(() => {
    if (allPokemon) {
      for (const pokemon of allPokemon) {
        fetch(pokemon.url)
          .then((res) => res.json())
          .then((data) => {
            const pData = data as PokemonApiData;
            if (!pData) return;
            setPokemonDef((d) => ({ ...d, [pData.id]: pData }));
          });
      }
    }
  }, [allPokemon]);

  return [allPokemon, pokemonDef];
}
