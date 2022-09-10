import cn from "classnames";
import { RunContext } from "pages/run/[id]";
import React from "react";
import styles from "styles/Summary.module.scss";

// import { badgeImages } from "lib/badges";

/**
 * Badge Progress Box
 */
function BadgeBox({ allBadges }: { allBadges: string[] }) {
  const { RUN } = React.useContext(RunContext);

  const earnedBadges = RUN?.getEarnedBadges() || [];

  return (
    <div className={styles.badgeBox}>
      {allBadges.map((badge) => (
        <img
          key={badge}
          className={cn({ [styles.earned]: earnedBadges.includes(badge) })}
          src={`https://nuzlocke-generator.herokuapp.com/img/checkpoints/${badge
            .replaceAll("_", "-")
            .toLowerCase()}.png`}
          alt={badge}
        />
      ))}
    </div>
  );
}

export default BadgeBox;
