import cn from "classnames";
import PokemonIcon from "components/PokemonIcon";
import { IPokemon } from "models";
import React from "react";
import styles from "styles/Summary.module.scss";

function Box({ box, j }: { box: IPokemon[]; j: number }) {
  return (
    <div className={cn(styles.grave, { [styles.onRight]: j % 2 === 1 })}>
      <div className={styles.gravePokemon}>
        {box?.map((pokemon, i) => (
          <PokemonIcon
            key={i}
            {...{
              pokemon,
              width: 32,
              height: 32,
            }}
          />
        ))}
      </div>
    </div>
  );
}

export default Box;
