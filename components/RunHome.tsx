import classNames from "classnames";
import Summary from "components/Summary";
import Timeline from "components/Timeline";
import { useGameName } from "hooks/useGameName";
import { usePlayersArray } from "hooks/usePlayersArray";
import type { MapLocation } from "models";
import Image from "next/image";
import React, { useState } from "react";
import styles from "styles/Run.module.scss";

interface Props {
  id: string;
  allBadges: string[];
  allLocations: MapLocation[];
  region: string | false | undefined;
}

function RunHome({ id, region, allBadges, allLocations }: Props) {
  const playerArr = usePlayersArray();
  const game = useGameName();

  const [viewingTab, setViewingTab] = useState(0);

  return (
    <div
      className={styles.container}
      style={{
        backgroundImage: `linear-gradient(#071e3e7c, #071e3e 300px),
    url("/${!!region ? region : "hoenn"}.png")`,
      }}
    >
      <span className={styles.pokeball}>
        <Image src="/Pokeball.svg" alt="" width={150} height={150} />
      </span>
      <div className={styles.header}>
        <h3 className="capitalize font-normal">
          {playerArr.map((p) => p.name).join(" & ")}
        </h3>
        <h2 className="capitalize">{game} Soullocke</h2>
      </div>
      {/* <div>codename: {id}</div> */}

      <div
        className={classNames(
          styles.content,
          "mb-4 flex flex-col center gap-2",
        )}
      >
        <div className="flex gap-4 mt-4 mb-8">
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
    </div>
  );
}

export default RunHome;
