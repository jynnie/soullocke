import cn from "classnames";
import PokemonIcon from "components/PokemonIcon";
import { RunContext } from "pages/run/[id]";
import React from "react";
import styles from "styles/Summary.module.scss";

function Box({ player: pid, j }: { player: string; j: number }) {
  const { RUN } = React.useContext(RunContext);

  const boxedPokemon = RUN?.getPokemonInPlayerBox(pid, true);

  return (
    <div className={cn(styles.grave, { [styles.onRight]: j % 2 === 1 })}>
      <div className={styles.gravePokemon}>
        {boxedPokemon?.map((pokemon, i) => (
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
