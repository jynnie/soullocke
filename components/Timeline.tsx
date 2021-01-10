import React from "react";
import Box from "ui-box";
import { RunContext } from "pages/run/[id]";
import { cleanName, oVal } from "lib/utils";
import type { Run, MapLocation, UseState, PlaceName } from "models";

import styles from "styles/Timeline.module.scss";
import Pokemon from "components/Pokemon";
import Location from "components/Location";
import AddToTimeline from "components/AddToTimeline";
import AddPokemon from "components/AddPokemon";
import MovePokemonToTeam from "components/MovePokemonToTeam";

/**
 * Timeline Grid
 * View focused on what pokemon were caught when
 * Will be modified into true timeline view later
 */
function TimelineGrid({
  timeline,
  players,
  allLocations,
  allBadges,
}: {
  timeline: Run["timeline"];
  players: Run["players"];
  allLocations: MapLocation[];
  allBadges: string[];
}) {
  const { RUN } = React.useContext(RunContext);
  const [addToTeamOrigin, setATTO]: UseState<string> = React.useState(null);

  const timelineArr = oVal(timeline || []).sort((a, b) => a.index - b.index);
  const playerArr = oVal(players || []);
  const numTrainers = playerArr.length;

  const handleFinishAdd = (location: PlaceName) => {
    return (caught: boolean) => {
      const allPokemonSet = RUN.haveAllPlayersGotPokemonAt(location);
      if (caught && allPokemonSet) setATTO(location);
    };
  };

  return (
    <>
      <Box is="table" className={styles.table}>
        <colgroup>
          <col />
          <col span={numTrainers} />
          <col />
        </colgroup>

        <thead>
          <tr>
            <th>Location</th>
            {playerArr.map((p) => (
              <th key={p.id}>{p.name}</th>
            ))}
            <th>Summary</th>
          </tr>
        </thead>

        <tbody>
          {timelineArr.map((t) => (
            <tr key={t.key} data-row-key={t.key}>
              <td key={t.name}>{cleanName(t.name)}</td>

              {playerArr.map((p) => {
                const key = t.key + p.name;
                const playerPokemon = p.pokemon ? p.pokemon[t.name] : null;
                const isBadge = /badge/gi.test(t.name);
                const props = {
                  key,
                  playerId: p.id,
                  location: t.name,
                  onFinish: handleFinishAdd(t.name),
                  pokemon: playerPokemon,
                };

                if (isBadge) return <td>-</td>;
                let display = <AddPokemon {...props} />;
                if (playerPokemon) display = <Pokemon {...props} />;
                return <td>{display}</td>;
              })}

              <td>
                <Location name={t.name} index={t.index} />
              </td>
            </tr>
          ))}
        </tbody>
      </Box>
      <AddToTimeline {...{ allLocations, allBadges }} />
      <MovePokemonToTeam
        pokemonOrigin={addToTeamOrigin}
        currentLocation={addToTeamOrigin}
        visible={!!addToTeamOrigin}
        onCancel={() => setATTO(null)}
      />
    </>
  );
}

export default TimelineGrid;
