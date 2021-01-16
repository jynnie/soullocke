import React from "react";
import Box from "ui-box";
import { usePalette } from "react-palette";
import { UseState, Pokemon, PokemonLocation } from "models";

import styles from "styles/Pokemon.module.scss";
import LocationBadge from "components/LocationBadge";
import PokemonImage from "components/PokemonImage";
import { Tooltip } from "antd";

export function PokemonIcon({
  pokemon,
  onClick = null,
  showBadge = false,
}: {
  pokemon: Pokemon;
  onClick?: () => void;
  showBadge?: boolean;
}) {
  const pokemonNickname = pokemon?.nickname || "?";
  const pokemonLocation = pokemon?.location || PokemonLocation.grave;

  const [src, setSrc]: UseState<string> = React.useState(null);
  const { data } = usePalette(src);
  const avatarStyle = {
    backgroundColor: data?.vibrant || "var(--tertiary)",
  };

  return (
    <Tooltip title={`${pokemonNickname}`} placement="right">
      <Box position="relative" onClick={onClick} width="max-content">
        <LocationBadge {...{ pokemonLocation, hide: !showBadge }}>
          <Box className={styles.iconAvatar} {...avatarStyle}>
            <PokemonImage pokemon={pokemon} updateSrc={setSrc} />
          </Box>
        </LocationBadge>
      </Box>
    </Tooltip>
  );
}

export default PokemonIcon;
