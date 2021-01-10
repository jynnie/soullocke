import React from "react";
import cn from "classnames";
import { PokemonLocation } from "models";

import styles from "styles/Location.module.scss";
import { Tag } from "antd";

const BADGE_TEXT = {
  [PokemonLocation.box]: "B",
  [PokemonLocation.daycare]: "D",
  [PokemonLocation.grave]: "X",
  [PokemonLocation.team]: "T",
};

export function LocationTag({
  pokemonLocation,
}: {
  pokemonLocation: PokemonLocation;
}) {
  return (
    <Tag className={cn(styles.tag, styles[pokemonLocation])}>
      {BADGE_TEXT[pokemonLocation]}
    </Tag>
  );
}

export default LocationTag;
