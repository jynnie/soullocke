import React from "react";
import { useToUpdate } from "lib/hooks";
import { RunContext } from "pages/run/[id]";
import { PlaceName, Pokemon, PokemonLocation } from "models";

import styles from "styles/Location.module.scss";
import Tag from "./PLTag";

export function LocationSummary({
  pokemon,
  pokemonLocation,
}: {
  pokemon: Pokemon[];
  pokemonLocation: PokemonLocation;
}) {
  useToUpdate(pokemon && pokemon.length);

  const pokemonArr = pokemon.filter((p) => !!p);
  if (pokemonArr.length === 0) return null;

  return (
    <div className={styles.location}>
      {pokemonArr.length > 0 && <Tag {...{ pokemonLocation }}></Tag>}
      {pokemonArr.map((p) => p?.nickname).join(" & ")}
    </div>
  );
}
