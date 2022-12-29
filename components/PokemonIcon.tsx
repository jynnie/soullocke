import PokemonImage from "components/PokemonImage";
import type { IPokemon } from "models";
import React from "react";
import { usePalette } from "react-palette";
import styles from "styles/Pokemon.module.scss";
import Box from "ui-box";

import Tooltip from "@tippyjs/react";

import { TooltipContent } from "./ui-library/TooltipContent";

export function PokemonIcon({
  pokemon,
  onClick,
  width = 40,
  height = 40,
  backgroundColor,
}: {
  pokemon: IPokemon;
  onClick?: () => void;
  width?: number;
  height?: number;
  backgroundColor?: string;
}) {
  const pokemonNickname = pokemon?.nickname || "?";

  const [src, setSrc] = React.useState<string>("");
  const { data } = usePalette(src || "");
  const avatarStyle = {
    backgroundColor:
      backgroundColor || data?.vibrant || "var(--midnight-primary)",
  };

  return (
    <Tooltip
      content={<TooltipContent content={`${pokemonNickname}`} />}
      placement="top"
    >
      <div>
        <Box position="relative" onClick={onClick} width="max-content">
          <div>
            <Box
              className={styles.iconAvatar}
              width={width || 40}
              height={height || 40}
              {...avatarStyle}
            >
              <PokemonImage pokemon={pokemon} updateSrc={setSrc} />
            </Box>
          </div>
        </Box>
      </div>
    </Tooltip>
  );
}

export default PokemonIcon;
