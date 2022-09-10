import { Tag } from "antd";
import cn from "classnames";
import { PokemonLocation } from "models";
import React from "react";
import styles from "styles/Location.module.scss";

const BADGE_TEXT = {
  [PokemonLocation.box]: "B",
  [PokemonLocation.daycare]: "D",
  [PokemonLocation.grave]: "X",
  [PokemonLocation.team]: "T",
};

export function LocationTag({
  className,
  pokemonLocation,
}: {
  className?: string;
  pokemonLocation: PokemonLocation;
}) {
  return (
    <Tag className={cn(className, styles.tag, styles[pokemonLocation])}>
      {BADGE_TEXT[pokemonLocation]}
    </Tag>
  );
}

export default LocationTag;
