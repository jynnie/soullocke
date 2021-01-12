import React from "react";
import { useToUpdate } from "lib/hooks";
import { RunContext } from "pages/run/[id]";
import { PlaceName, PokemonLocation } from "models";

import styles from "styles/Location.module.scss";
import Tag from "./PLTag";

export function LocationSummary({
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

  useToUpdate(pokemonArr && pokemonArr.length);

  return (
    <div className={styles.location}>
      {pokemonArr.length > 0 && <Tag {...{ pokemonLocation }}></Tag>}
      {pokemonArr.map((p) => p.nickname).join(" & ")}
    </div>
  );
}
