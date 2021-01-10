import React from "react";
import { RunContext } from "pages/run/[id]";
import { PlaceName, PokemonLocation } from "models";

import styles from "styles/Location.module.scss";
import Tag from "components/Location/PLTag";

export function LocationListing({
  index,
  name,
}: {
  index: number;
  name: PlaceName;
}) {
  const { RUN } = React.useContext(RunContext);

  if (!name) return null;
  const pokemonArr = RUN.getPokemonByOrigin(name).filter((p) => !!p);
  const pokemonLocation = pokemonArr?.[0]?.location || PokemonLocation.grave;

  return (
    <div className={styles.location}>
      <Tag {...{ pokemonLocation }}></Tag>
      {pokemonArr.map((p) => p.nickname).join(" & ")}
    </div>
  );
}
