import React from "react";
import cn from "classnames";
import { PokemonLocation } from "models";

import styles from "styles/Pokemon.module.scss";
import { Badge } from "antd";

export function LocationBadge({
  pokemonLocation,
  children,
  hide = false,
}: {
  pokemonLocation: PokemonLocation;
  children?: JSX.Element[] | JSX.Element;
  hide?: boolean;
}) {
  return (
    <Badge
      className={cn(styles.badge, styles[pokemonLocation])}
      count={hide ? 0 : pokemonLocation.slice(0, 1)}
      title={pokemonLocation}
      // size="small"
    >
      {children}
    </Badge>
  );
}

export default LocationBadge;
