import { Tooltip } from "antd";
import LocationBadge from "components/LocationBadge";
import PokemonImage from "components/PokemonImage";
import { IPokemon, PokemonLocation } from "models";
import React from "react";
import { usePalette } from "react-palette";
import styles from "styles/Pokemon.module.scss";
import Box from "ui-box";

export function PokemonIcon({
  pokemon,
  onClick,
  showBadge = false,
  width = 40,
  height = 40,
  backgroundColor,
}: {
  pokemon: IPokemon;
  onClick?: () => void;
  showBadge?: boolean;
  width?: number;
  height?: number;
  backgroundColor?: string;
}) {
  const pokemonNickname = pokemon?.nickname || "?";
  const pokemonLocation = pokemon?.location || PokemonLocation.grave;

  const [src, setSrc] = React.useState<string>("");
  const { data } = usePalette(src || "");
  const avatarStyle = {
    backgroundColor:
      backgroundColor || data?.vibrant || "var(--midnight-primary)",
  };

  return (
    <Tooltip title={`${pokemonNickname}`} placement="right">
      <Box position="relative" onClick={onClick} width="max-content">
        <LocationBadge {...{ pokemonLocation, hide: !showBadge }}>
          <Box
            className={styles.iconAvatar}
            width={width || 40}
            height={height || 40}
            {...avatarStyle}
          >
            <PokemonImage pokemon={pokemon} updateSrc={setSrc} />
          </Box>
        </LocationBadge>
      </Box>
    </Tooltip>
  );
}

export default PokemonIcon;
