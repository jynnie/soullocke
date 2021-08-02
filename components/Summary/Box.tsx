import React from "react";
import cn from "classnames";
import styles from "styles/Summary.module.scss";
import { RunContext } from "pages/run/[id]";
import PokemonIcon from "components/PokemonIcon";

function Box({ player: pid, j }: { player: string; j: number }) {
  const { RUN } = React.useContext(RunContext);

  const grave = RUN.getPokemonInPlayerBox(pid);

  return (
    <div className={cn(styles.grave, { [styles.onRight]: j % 2 === 1 })}>
      <div className={styles.gravePokemon}>
        {grave.map((pokemon, i) => (
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
