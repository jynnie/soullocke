import classNames from "classnames";
import Summary from "components/Summary";
import Timeline from "components/Timeline";
import { useGameName } from "hooks/useGameName";
import { usePlayersArray } from "hooks/usePlayersArray";
import type { MapLocation } from "models";
import React, { useState } from "react";
import styles from "styles/Run.module.scss";

interface Props {
  id: string;
  allBadges: string[];
  allLocations: MapLocation[];
}

function RunHome({ id, allBadges, allLocations }: Props) {
  const playerArr = usePlayersArray();
  const game = useGameName();

  const [viewingTab, setViewingTab] = useState(0);

  return (
    <div className={styles.container}>
      <h2 className="capitalize">{game} Soullocke</h2>
      <h3>{playerArr.map((p) => p.name).join(" | ")}</h3>
      <div>codename: {id}</div>

      <div className="mt-8 mb-4 flex center gap-2">
        {["Timeline", "Summary"].map((t, k) => (
          <label
            key={k}
            className={classNames(styles.tab, {
              [styles.selectedTab]: viewingTab === k,
            })}
            onClick={() => setViewingTab(k)}
          >
            {t}
          </label>
        ))}
      </div>

      <div className={classNames({ hidden: viewingTab !== 0 })}>
        <Timeline {...{ allLocations, allBadges }} />
      </div>
      <div className={classNames({ hidden: viewingTab !== 1 })}>
        <Summary {...{ allBadges }} key="Summary" />
      </div>
    </div>
  );
}

export default RunHome;
