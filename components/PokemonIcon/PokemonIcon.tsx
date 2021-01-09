import React from "react";
import Box from "ui-box";
import { alpha, colorize } from "lib/utils";
import { UseState, Pokemon, PokemonApiData } from "models";

import styles from "styles/Pokemon.module.scss";
import { Avatar, Tooltip, Badge } from "antd";
import { BADGE_COLOR } from "./index";

export function PokemonIcon({
  pokemon,
  onClick = null,
}: {
  pokemon: Pokemon;
  onClick?: () => void;
}) {
  const pokemonName = pokemon?.name || "?";
  const pokemonNickname = pokemon?.nickname || "?";
  const pokemonLocation = pokemon?.location || "grave";

  const [src, setSrc]: UseState<string> = React.useState(null);
  const avatarStyle = {
    backgroundColor: colorize(pokemonName) + alpha(0.5),
  };

  React.useEffect(() => {
    if (pokemonName) {
      fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonName}`)
        .then((res) => res.json())
        .then((data: PokemonApiData) => {
          setSrc(data?.sprites?.front_default);
        });
    }
  }, [pokemon?.name]);

  return (
    <Tooltip title={pokemonNickname}>
      <Box position="relative" onClick={onClick}>
        <Badge
          className={styles.badge}
          status={BADGE_COLOR[pokemonLocation]}
          title={pokemonLocation}
        >
          <Avatar size="large" src={src} style={avatarStyle}>
            {pokemonNickname}
          </Avatar>
        </Badge>
      </Box>
    </Tooltip>
  );
}
