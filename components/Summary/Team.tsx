import React from "react";
import cn from "classnames";
import styles from "styles/Summary.module.scss";
import { RunContext } from "pages/run/[id]";
import { oVal } from "lib/utils";
import { EventType, Pokemon as PokemonData } from "models";

/**
 * We choose to use Pokesprite instead of PokeAPI here, because
 * where Pokemon's feet are, are on the same baseline. Providing
 * more aesthetic team summary images.
 */
function TeamImage({
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
  if (searchPokemon === "giratina-altered") searchPokemon = "giratina";
  const derivativeIndex = searchPokemon.indexOf("-");
  if (searchPokemon.indexOf("-") > 0)
    searchPokemon = searchPokemon.slice(0, derivativeIndex);
  const src = `https://raw.githubusercontent.com/msikma/pokesprite/master/pokemon-gen8/regular/${searchPokemon}.png`;

  return <img alt={pokemonName} src={src} {...props} />;
}

function isFacingRight(teamLength: number, i: number, j: number) {
  if (teamLength % 2 === 0) {
    return i < teamLength / 2;
  } else {
    return i + (j % 2) < teamLength / 2;
  }
}

function Team({ player: pid, j }: { player: string; j: number }) {
  const { RUN } = React.useContext(RunContext);

  const player = RUN.getPlayer(pid);
  const team = RUN.getPokemonOnPlayerTeam(pid);

  return (
    <div className={styles.team}>
      <div className={styles.playerName}>{player.name}</div>
      {team.map((pokemon, i) => (
        <div
          key={i}
          className={cn(styles.pokemon, { [styles.onRight]: j % 2 === 1 })}
        >
          <TeamImage
            className={cn({
              [styles.faceRight]: isFacingRight(team.length, i, j),
            })}
            {...{ pokemon }}
          />
          <div className={styles.nickname}>{pokemon.nickname}</div>
        </div>
      ))}
    </div>
  );
}

export default Team;
