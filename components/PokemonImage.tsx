import { EventType, IPokemon, PokemonApiData } from "models";
import React from "react";
import Box from "ui-box";

export function PokemonImage({
  updateSrc,
  pokemon,
  ...props
}: {
  updateSrc?: (src: string) => void;
  pokemon: IPokemon;
  [propName: string]: any;
}) {
  const pokemonName = pokemon?.name || "?";
  const pokemonEventsArr = Object.values(pokemon?.events || []);
  const evolutionEvents = pokemonEventsArr.filter(
    (e) => e.type === EventType.evolved,
  );

  const [src, setSrc] = React.useState<string | null>(null);

  React.useEffect(() => {
    if (pokemonName) {
      const latestEvolution = evolutionEvents.slice(-1)?.[0];
      const searchPokemon = latestEvolution?.details?.evolution ?? pokemonName;
      fetch(`https://pokeapi.co/api/v2/pokemon/${searchPokemon}`)
        .then((res) => res.json())
        .then((data: PokemonApiData) => {
          const foundSrc = data?.sprites?.front_default;
          setSrc(foundSrc);
          if (updateSrc) updateSrc(foundSrc);
        });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pokemon.name, pokemonName, evolutionEvents.length, updateSrc]);

  if (!src) return <>{pokemonName}</>;
  return <Box is="img" alt={pokemonName} src={src} {...props} />;
}

export default PokemonImage;
