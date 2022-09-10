import { usePlayersArray } from "hooks/usePlayersArray";
import { PokemonLocation } from "models";
import type { Player, IPokemon as PokemonData, Timeline as TL } from "models";
import React, { useMemo } from "react";
import styles from "styles/Summary.module.scss";
import Box from "ui-box";

import BadgeBox from "./BadgeBox";
import Boxed from "./Box";
import Grave from "./Grave";
import { Team } from "./Team";

export interface Data {
  location: TL;
  players: Player[];
  pokemon: PokemonData[];
  pokemonLocation: PokemonLocation;
  notes: string;
}

/**
 * Timeline Grid
 */
function Summary({ allBadges }: { allBadges: string[] }) {
  const playersArr = usePlayersArray();
  const teams = useTeam(playersArr);

  return (
    <div className={styles.container}>
      <BadgeBox {...{ allBadges }} />
      <Box className={styles.dualContainer} minHeight={97}>
        {Object.values(teams).map((team, j) => (
          <Team
            key={j}
            {...{ player: team.player, pokemonTeam: team.pokemon, j }}
          />
        ))}
      </Box>

      <div className={styles.sectionHeader}>
        <div className={styles.sectionDivider} />
        <span aria-details="Graveyard">🪦</span>
        <div className={styles.sectionDivider} />
      </div>
      <Box className={styles.dualContainer} marginTop="-1rem">
        {playersArr.map((player, j) => (
          <Grave key={j} {...{ player: player.id, j }} />
        ))}
      </Box>

      <div className={styles.sectionHeader}>
        <div className={styles.sectionDivider} />
        <span aria-details="Boxed">🖥</span>
        <div className={styles.sectionDivider} />
      </div>
      <div className={styles.dualContainer}>
        {playersArr.map((player, j) => (
          <Boxed key={j} {...{ player: player.id, j }} />
        ))}
      </div>
    </div>
  );
}

function useTeam(playersArr: Player[]) {
  const pokemonTeams = useMemo(() => {
    const teamPokemon: {
      [playerId: string]: { pokemon: PokemonData[]; player: Player };
    } = {};

    // Sort pokemon per player into categories
    for (const player of playersArr) {
      // Initialize arrays
      teamPokemon[player.id] = { pokemon: [], player: player };
      const team: PokemonData[] = [];
      const pokemon = Object.values(player.pokemon || {});

      for (const p of pokemon) {
        if (!p) continue;
        const l = p.location;
        if (l === PokemonLocation.team) {
          team.push(p);
        }
      }
      teamPokemon[player.id].pokemon = team;
    }

    return teamPokemon;
  }, [playersArr]);

  return pokemonTeams;
}

export default Summary;
