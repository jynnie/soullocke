import React from "react";
import { oVal } from "lib/utils";
import type { Run, MapLocation } from "models";

import styles from "styles/Home.module.css";

interface Props extends Run {
  locations: MapLocation[];
}

function RunHome({ id, game, region, timeline, players, locations }: Props) {
  const playerArray = oVal(players);

  return (
    <>
      <h2>{game} soullocke</h2>
      <h3>{playerArray.map((p) => p.name).join(" | ")}</h3>
      <div>codename: {id}</div>
    </>
  );
}

export default RunHome;
