import cn from "classnames";
import PokemonIcon from "components/PokemonIcon";
import { RunContext } from "pages/run/[id]";
import React from "react";
import styles from "styles/Summary.module.scss";

function Grave({ player: pid, j }: { player: string; j: number }) {
  const { RUN } = React.useContext(RunContext);

  const grave = RUN?.getPokemonInPlayerGraveyard(pid, true);
  const defeatedNum = RUN?.getPlayerDefeatCount(pid) || 0;
  const missedNum = RUN?.getPlayerMissedCount(pid) || 0;

  return (
    <div className={cn(styles.grave, { [styles.onRight]: j % 2 === 1 })}>
      <div className={styles.graveCount}>
        {defeatedNum}D - {missedNum}M
      </div>
      <div className={styles.gravePokemon}>
        {grave?.map((pokemon, i) => (
          <PokemonIcon
            key={i}
            {...{
              pokemon,
              width: 32,
              height: 32,
              backgroundColor: "var(--tertiary)",
            }}
          />
        ))}
      </div>
    </div>
  );
}

export default Grave;
