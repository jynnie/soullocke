import React from "react";
import Box from "ui-box";
import { usePalette } from "react-palette";
import { alpha, colorize, oVal } from "lib/utils";
import {
  UseState,
  Pokemon,
  PokemonApiData,
  EventType,
  PokemonLocation,
} from "models";

import styles from "styles/Pokemon.module.scss";
import LocationBadge from "components/LocationBadge";
import { Avatar, Tooltip } from "antd";

export function PokemonIcon({
  pokemon,
  onClick = null,
  showBadge = false,
}: {
  pokemon: Pokemon;
  onClick?: () => void;
  showBadge?: boolean;
}) {
  const pokemonName = pokemon?.name || "?";
  const pokemonNickname = pokemon?.nickname || "?";
  const pokemonLocation = pokemon?.location || PokemonLocation.grave;
  const pokemonEventsArr = oVal(pokemon?.events || []);
  const evolutionEvents = pokemonEventsArr.filter(
    (e) => e.type === EventType.evolved,
  );

  const [src, setSrc]: UseState<string> = React.useState(null);
  const { data } = usePalette(src);
  const avatarStyle = {
    backgroundColor: data?.vibrant || "var(--tertiary)",
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
        <LocationBadge {...{ pokemonLocation, hide: !showBadge }}>
          <Box className={styles.iconAvatar} {...avatarStyle}>
            <Box is="img" alt={pokemonName} src={src} />
          </Box>
        </LocationBadge>
      </Box>
    </Tooltip>
  );
}

export default PokemonIcon;
