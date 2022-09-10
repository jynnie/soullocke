import { Tabs } from "antd";
import Summary from "components/Summary";
import Timeline from "components/Timeline";
import { oVal } from "lib/utils";
import type { MapLocation, Run } from "models";
import React from "react";
import styles from "styles/Run.module.scss";

const { TabPane } = Tabs;

interface Props extends Run {
  allBadges: string[];
  allLocations: MapLocation[];
}

function RunHome({ id, game, players, allBadges, allLocations }: Props) {
  const playerArr = oVal(players || []);

  return (
    <div className={styles.container}>
      <h2>{game} Soullocke</h2>
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
