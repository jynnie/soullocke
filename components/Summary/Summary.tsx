import { PokemonLocation } from "models";
import type { Player, IPokemon as PokemonData, Timeline as TL } from "models";
import { RunContext } from "pages/run/[id]";
import React from "react";
import styles from "styles/Summary.module.scss";
import Box from "ui-box";
import { oKey, oVal } from "utils/utils";

import BadgeBox from "./BadgeBox";
import Boxed from "./Box";
import Grave from "./Grave";
import Team from "./Team";

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
  const { RUN } = React.useContext(RunContext);

  //----------------------------------#01F2DF
  // Data
  const playerArr = RUN?.DEPRECATED_getPlayersArray() || [];
  const teamPokemon: { [playerId: string]: PokemonData[] } = {};

  // Sort pokemon per player into categories
  for (const player of playerArr) {
    // Initialize arrays
    teamPokemon[player.id] = [];

    const pokemon = oVal(player.pokemon || {});
    for (const p of pokemon) {
      if (!p) continue;

      const l = p.location;
      if (l === PokemonLocation.team) {
        teamPokemon[player.id].push(p);
      }
    }
  }

  //----------------------------------#01F2DF
  return (
    <div className={styles.container}>
      <BadgeBox {...{ allBadges }} />
      <Box className={styles.dualContainer} minHeight={97}>
        {oKey(teamPokemon).map((player, j) => (
          <Team key={j} {...{ player, j }} />
        ))}
      </Box>

      <div className={styles.sectionHeader}>
        <div className={styles.sectionDivider} />
        <span aria-details="Graveyard">🪦</span>
        <div className={styles.sectionDivider} />
      </div>
      <Box className={styles.dualContainer} marginTop="-1rem">
        {playerArr.map((player, j) => (
          <Grave key={j} {...{ player: player.id, j }} />
        ))}
      </Box>

      <div className={styles.sectionHeader}>
        <div className={styles.sectionDivider} />
        <span aria-details="Boxed">🖥</span>
        <div className={styles.sectionDivider} />
      </div>
      <div className={styles.dualContainer}>
        {playerArr.map((player, j) => (
          <Boxed key={j} {...{ player: player.id, j }} />
        ))}
      </div>
    </div>
  );
}

export default Summary;
