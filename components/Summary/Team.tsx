import cn from "classnames";
import { pokemonAlternativeNames } from "lib/pokemonAlternativeNames";
import { EventType, Player, IPokemon as PokemonData } from "models";
import React from "react";
import styles from "styles/Summary.module.scss";
import { oVal } from "utils/utils";

function isFacingRight(teamLength: number, i: number, j: number) {
  if (teamLength % 2 === 0) {
    return i < teamLength / 2;
  } else {
    return i + (j % 2) < teamLength / 2;
  }
}

export function Team({
  player,
  pokemonTeam,
  j,
}: {
  player: Player;
  pokemonTeam: PokemonData[];
  j: number;
}) {
  return (
    <div className={styles.team}>
      <div className={styles.playerName}>{player?.name ?? "Unknown"}</div>
      {pokemonTeam.map((pokemon, i) => (
        <div
          key={i}
          className={cn(styles.pokemon, { [styles.onRight]: j % 2 === 1 })}
        >
          <TeamImage
            className={cn({
              [styles.faceRight]: isFacingRight(pokemonTeam.length, i, j),
            })}
            {...{ pokemon }}
          />
          <div className={styles.nickname}>{pokemon.nickname}</div>
        </div>
      ))}
    </div>
  );
}

/**
 * We choose to use Pokesprite instead of PokeAPI here, because
 * where Pokemon's feet are, are on the same baseline. Providing
 * more aesthetic team summary images.
 */
export function TeamImage({
  pokemon,
  ...props
}: {
  pokemon: PokemonData;
  [propName: string]: any;
}) {
  const pokemonName = pokemon?.name || "?";
  const pokemonEventsArr = oVal(pokemon?.events || []);
  const evolutionEvents = pokemonEventsArr.filter(
    (e) => e.type === EventType.evolved,
  );
  const latestEvolution = evolutionEvents.slice(-1)?.[0];
  let searchPokemon = latestEvolution?.details?.evolution ?? pokemonName;
  const alternativePokemon = pokemonAlternativeNames[searchPokemon];
  if (alternativePokemon) searchPokemon = alternativePokemon;
  const src = `https://raw.githubusercontent.com/msikma/pokesprite/master/pokemon-gen8/regular/${searchPokemon}.png`;

  return <img alt={pokemonName} src={src} {...props} />;
}
