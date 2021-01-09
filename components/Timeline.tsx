import React from "react";
import Box from "ui-box";
import { RunContext } from "pages/run/[id]";
import { oVal, cleanName } from "lib/utils";
import type { Run, MapLocation, UseState, PlaceName } from "models";

import styles from "styles/Timeline.module.scss";
import Pokemon from "components/Pokemon";
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
    <Box
      className={styles.container}
      gridTemplateColumns={`1fr repeat(${numTrainers}, 60px)`}
    >
      <div>Location</div>
      {playerArr.map((p) => (
        <div key={p.id}>{p.name}</div>
      ))}

      {timelineArr.map((t) => (
        <React.Fragment key={t.key}>
          <div className="capitalize">{cleanName(t.name)}</div>
          {playerArr.map((p) => {
            const key = t.key + p.name;
            const playerPokemon = p.pokemon ? p.pokemon[t.name] : null;
            const isBadge = /badge/gi.test(t.name);

            if (isBadge) return <div {...{ key }} />;
            if (playerPokemon)
              return (
                <Pokemon
                  {...{
                    key,
                    playerId: p.id,
                    location: t.name,
                    pokemon: playerPokemon,
                  }}
                />
              );
            return (
              <AddPokemon
                {...{
                  key,
                  playerId: p.id,
                  location: t.name,
                  onFinish: handleFinishAdd(t.name),
                }}
              />
            );
          })}
        </React.Fragment>
      ))}

      <AddToTimeline {...{ allLocations, allBadges }} />

      <MovePokemonToTeam
        pokemonOrigin={addToTeamOrigin}
        currentLocation={addToTeamOrigin}
        visible={!!addToTeamOrigin}
        onCancel={() => setATTO(null)}
      />
    </Box>
  );
}

export default TimelineGrid;
