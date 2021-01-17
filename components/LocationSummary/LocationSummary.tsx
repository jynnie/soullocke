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

  return (
    <div className={styles.location}>
      {pokemon.length > 0 && <Tag {...{ pokemonLocation }}></Tag>}
      {pokemon.map((p) => p?.nickname).join(" & ")}
    </div>
  );
}
