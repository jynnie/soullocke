import cn from "classnames";
import useEarnedBadges from "hooks/useEarnedBadges";
import React from "react";
import styles from "styles/Summary.module.scss";

// import { badgeImages } from "lib/badges";

/**
 * Badge Progress Box
 */
export function BadgeBox({ allBadges }: { allBadges: string[] }) {
  const earnedBadges = useEarnedBadges();

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
