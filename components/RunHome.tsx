import React from "react";
import { oVal } from "lib/utils";
import type {
  Run,
  MapLocation,
  PokemonListApiData as ListPokemon,
} from "models";

import styles from "styles/Run.module.scss";
import AddToTimeline from "components/AddToTimeline";

interface Props extends Run {
  locations: MapLocation[];
  allPokemon: ListPokemon[];
}

function RunHome({
  id,
  game,
  region,
  timeline,
  players,
  locations,
  allPokemon,
}: Props) {
  const playerArr = oVal(players || []);
  const timelineArr = oVal(timeline || []).sort((a, b) => a.index - b.index);

  return (
    <div className={styles.container}>
      <h2>{game} soullocke</h2>
      <h3>{playerArr.map((p) => p.name).join(" | ")}</h3>
      <div>codename: {id}</div>

      <div>
        <h4>timeline</h4>
        <div>
          {timelineArr.map((t) => (
            <div key={t.key}>{t.name}</div>
          ))}
        </div>
        <AddToTimeline {...{ allLocations: locations }} />
      </div>
    </div>
  );
}

export default RunHome;
