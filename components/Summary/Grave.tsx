import React from "react";
import styles from "styles/Summary.module.scss";
import { RunContext } from "pages/run/[id]";
import PokemonIcon from "components/PokemonIcon";

function Grave({ player: pid }: { player: string }) {
  const { RUN } = React.useContext(RunContext);

  const grave = RUN.getPokemonInPlayerGraveyard(pid, true);

  return (
    <div className={styles.grave}>
      {grave.map((pokemon, i) => (
        <PokemonIcon key={i} {...{ pokemon, width: 32, height: 32 }} />
      ))}
    </div>
  );
}

export default Grave;
