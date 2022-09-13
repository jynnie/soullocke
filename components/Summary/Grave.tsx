import cn from "classnames";
import PokemonIcon from "components/PokemonIcon";
import { EventType, IPokemon } from "models";
import React from "react";
import styles from "styles/Summary.module.scss";

export function Grave({ grave, j }: { grave: IPokemon[]; j: number }) {
  const defeatedNum = grave.filter(filterForPokemonDefeated).length || 0;
  const missedNum = grave.filter(filterForPokemonMissed).length || 0;

  function filterForPokemonDefeated(p: IPokemon): boolean {
    return Object.values(p.events || {}).some(
      (e) => e.type === EventType.defeated,
    );
  }

  function filterForPokemonMissed(p: IPokemon): boolean {
    return Object.values(p.events || {}).some(
      (e) => e.type === EventType.missed,
    );
  }

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
