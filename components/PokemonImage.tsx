import React from "react";
import Box from "ui-box";
import { oVal } from "lib/utils";
import { UseState, Pokemon, PokemonApiData, EventType } from "models";

export function PokemonIcon({
  updateSrc,
  pokemon,
  ...props
}: {
  updateSrc?: (src: string) => void;
  pokemon: Pokemon;
  [propName: string]: any;
}) {
  const pokemonName = pokemon?.name || "?";
  const pokemonEventsArr = oVal(pokemon?.events || []);
  const evolutionEvents = pokemonEventsArr.filter(
    (e) => e.type === EventType.evolved,
  );

  const [src, setSrc]: UseState<string> = React.useState(null);

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
  }, [pokemon?.name, evolutionEvents.length]);

  return <Box is="img" alt={pokemonName} src={src} {...props} />;
}

export default PokemonIcon;
