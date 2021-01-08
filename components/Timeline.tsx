import React from "react";
import Box from "ui-box";
import { oVal, cleanName } from "lib/utils";
import type { Run, MapLocation } from "models";

import styles from "styles/Timeline.module.scss";
import Pokemon from "components/Pokemon";
import AddToTimeline from "components/AddToTimeline";
import AddPokemon from "components/AddPokemon";

// TODO: Search and filter
// TODO: Delete location
// TODO: Roam research style help legend
// TODO: Scrolling?

/**
 * Timeline Grid
 * View focused on what pokemon were caught when
 * Will be modified into true timeline view later
 */
const TimelineGrid = ({
  timeline,
  players,
  allLocations,
  allBadges,
}: {
  timeline: Run["timeline"];
  players: Run["players"];
  allLocations: MapLocation[];
  allBadges: string[];
}) => {
  const timelineArr = oVal(timeline || []).sort((a, b) => a.index - b.index);
  const playerArr = oVal(players || []);
  const numTrainers = playerArr.length;

  return (
    <Box
      className={styles.container}
      gridTemplateColumns={`1fr repeat(${numTrainers}, 60px)`}
    >
      {/* Legend */}
      <div>Location</div>
      {playerArr.map((p) => (
        <div key={p.id}>{p.name}</div>
      ))}

      {/* Timeline Grid & Caught Pokemon */}
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
              <AddPokemon {...{ key, playerId: p.id, location: t.name }} />
            );
          })}
        </React.Fragment>
      ))}

      {/* Add Button */}
      <AddToTimeline {...{ allLocations, allBadges }} />
    </Box>
  );
};

export default TimelineGrid;
