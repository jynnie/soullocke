import React from "react";
import Box from "ui-box";
import { alpha, colorize, oVal } from "lib/utils";
import {
  UseState,
  Pokemon,
  PokemonApiData,
  EventType,
  PokemonLocation,
} from "models";

import LocationBadge from "components/LocationBadge";
import { Avatar, Tooltip } from "antd";

export function PokemonIcon({
  pokemon,
  onClick = null,
  hideBadge = false,
}: {
  pokemon: Pokemon;
  onClick?: () => void;
  hideBadge?: boolean;
}) {
  const pokemonName = pokemon?.name || "?";
  const pokemonNickname = pokemon?.nickname || "?";
  const pokemonLocation = pokemon?.location || PokemonLocation.grave;
  const pokemonEventsArr = oVal(pokemon?.events || []);
  const evolutionEvents = pokemonEventsArr.filter(
    (e) => e.type === EventType.evolved,
  );

  const [src, setSrc]: UseState<string> = React.useState(null);
  const avatarStyle = {
    backgroundColor: colorize(pokemonName) + alpha(0.3),
  };

  React.useEffect(() => {
    if (pokemonName) {
      const latestEvolution = evolutionEvents.slice(-1)?.[0];
      const searchPokemon = latestEvolution?.details?.evolution ?? pokemonName;
      fetch(`https://pokeapi.co/api/v2/pokemon/${searchPokemon}`)
        .then((res) => res.json())
        .then((data: PokemonApiData) => {
          setSrc(data?.sprites?.front_default);
        });
    }
  }, [pokemon?.name, evolutionEvents.length]);

  return (
    <Tooltip title={`${pokemonNickname}`} placement="right">
      <Box position="relative" onClick={onClick} width="max-content">
        <LocationBadge {...{ pokemonLocation, hide: hideBadge }}>
          <Avatar size="large" src={src} style={avatarStyle}>
            {pokemonNickname}
          </Avatar>
        </LocationBadge>
      </Box>
    </Tooltip>
  );
}

export default PokemonIcon;
