import React from "react";
import { oVal } from "lib/utils";
import type {
  Run,
  MapLocation,
  PokemonListApiData as ListPokemon,
} from "models";

import styles from "styles/Run.module.scss";
import Timeline from "components/Timeline";
import Summary from "components/Summary";
import { Tabs } from "antd";

const { TabPane } = Tabs;

interface Props extends Run {
  allBadges: string[];
  allLocations: MapLocation[];
}

function RunHome({ id, game, players, allBadges, allLocations }: Props) {
  const playerArr = oVal(players || []);

  return (
    <div className={styles.container}>
      <h2>{game} soullocke</h2>
      <h3>{playerArr.map((p) => p.name).join(" | ")}</h3>
      <div>codename: {id}</div>

      <Tabs className={styles.tabs} defaultActiveKey="1" centered>
        <TabPane tab="Timeline" key="1">
          <Timeline {...{ allLocations, allBadges }} />
        </TabPane>
        <TabPane tab="Summary" key="2">
          <Summary {...{ allBadges }} />
        </TabPane>
      </Tabs>
    </div>
  );
}

export default RunHome;
