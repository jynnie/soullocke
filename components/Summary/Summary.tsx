import { usePlayersArray } from "hooks/usePlayersArray";
import { PokemonLocation } from "models";
import type { IPokemon, Player, Timeline as TL } from "models";
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
  pokemon: IPokemon[];
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
        {teams?.map((team, j) => (
          <Team
            key={j}
            {...{ player: team.player, pokemonTeam: team.team, j }}
          />
        ))}
      </Box>

      <div className={styles.sectionHeader}>
        <div className={styles.sectionDivider} />
        <span aria-details="Graveyard">🪦</span>
        <div className={styles.sectionDivider} />
      </div>
      <Box className={styles.dualContainer} marginTop="-1rem">
        {teams?.map((team, j) => (
          <Grave key={j} {...{ grave: team.grave, j }} />
        ))}
      </Box>

      <div className={styles.sectionHeader}>
        <div className={styles.sectionDivider} />
        <span aria-details="Boxed">🖥</span>
        <div className={styles.sectionDivider} />
      </div>
      <div className={styles.dualContainer}>
        {playersArr?.map((player, j) => (
          <Boxed key={j} {...{ player: player.id, j }} />
        ))}
      </div>
    </div>
  );
}

function useTeam(playersArr: Player[]) {
  const pokemonTeams = useMemo(() => {
    const playerPokemon: {
      [playerId: string]: {
        team: IPokemon[];
        grave: IPokemon[];
        box: IPokemon[];
        player: Player;
      };
    } = {};

    // Sort pokemon per player into categories
    for (const player of playersArr) {
      // Initialize arrays
      playerPokemon[player.id] = {
        team: [],
        grave: [],
        box: [],
        player: player,
      };

      const team: IPokemon[] = [];
      const grave: IPokemon[] = [];
      const box: IPokemon[] = [];

      const pokemon = Object.values(player.pokemon || {});
      for (const p of pokemon) {
        if (!p) continue;
        const l = p.location;
        if (l === PokemonLocation.team) {
          team.push(p);
        } else if (l === PokemonLocation.grave) {
          grave.push(p);
        } else if (l === PokemonLocation.box) {
          box.push(p);
        }
      }
      playerPokemon[player.id].team = team;
      playerPokemon[player.id].grave = grave;
      playerPokemon[player.id].box = box;
    }

    return Object.values(playerPokemon);
  }, [playersArr]);

  return pokemonTeams;
}

export default Summary;
