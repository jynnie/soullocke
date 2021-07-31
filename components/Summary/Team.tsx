import React from "react";
import cn from "classnames";
import styles from "styles/Summary.module.scss";
import PokemonImage from "components/PokemonImage";

import type {
  Player,
  MapLocation,
  UseState,
  PlaceName,
  Timeline as TL,
  Pokemon as PokemonData,
  Timeline,
} from "models";

/**
 * Timeline Grid
 */
function Team({ team, j }: { team: PokemonData[]; j: number }) {
  return (
    <div className={styles.team}>
      {team.map((pokemon, i) => (
        <PokemonImage
          className={cn({
            [styles.faceRight]: i + (j % 2) < team.length / 2,
          })}
          {...{ pokemon }}
        />
      ))}
    </div>
  );
}

export default Team;
