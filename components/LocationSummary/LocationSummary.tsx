import { IPokemon, PokemonLocation } from "models";
import React from "react";
import styles from "styles/Location.module.scss";

import Tag from "./PLTag";

export function LocationSummary({
  pokemon,
  pokemonLocation,
}: {
  pokemon: IPokemon[];
  pokemonLocation: PokemonLocation;
}) {
  const pokemonArr = pokemon.filter((p) => !!p);
  if (pokemonArr.length === 0) return null;

  return (
    <div className={styles.location}>
      {pokemonArr.length > 0 && <Tag {...{ pokemonLocation }}></Tag>}
      {pokemonArr
        .map((p) => p?.nickname)
        .filter((p) => !!p)
        .join(" & ")}
    </div>
  );
}
