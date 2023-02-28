import classNames from "classnames";
import PokemonImage from "components/PokemonImage";
import type { IPokemon } from "models";
import React from "react";
import { usePalette } from "react-palette";
import styles from "styles/Pokemon.module.scss";
import Box from "ui-box";

import Tooltip from "@tippyjs/react";

import { TooltipContent } from "./ui-library/TooltipContent";

export function PokemonIcon({
  className,
  pokemon,
  onClick,
  width = 36,
  height = 36,
  backgroundColor,
}: {
  className?: string;
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
      backgroundColor || data?.vibrant + "36" || "var(--midnight-primary)",
  };

  return (
    <Tooltip
      content={<TooltipContent content={`${pokemonNickname}`} />}
      placement="top"
    >
      <div
        className={classNames(className, "flex justify-center relative w-max")}
        onClick={onClick}
      >
        <Box
          className={styles.iconAvatar}
          width={width || 36}
          height={height || 36}
          {...avatarStyle}
        >
          <PokemonImage
            pokemon={pokemon}
            updateSrc={setSrc}
            width={width + 12 || 46}
            height={height + 12 || 46}
          />
        </Box>
      </div>
    </Tooltip>
  );
}

export default PokemonIcon;
