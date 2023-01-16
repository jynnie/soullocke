import classNames from "classnames";
import Notes from "components/Notes";
import React, { useState } from "react";
import styles from "styles/Timeline.module.scss";

import Delete from "./Delete";
import Move from "./Move";

export function LocationActions({
  locationKey,
  moveToTeam,
  isBadge,
}: {
  locationKey: string;
  moveToTeam: (origin: string, location: string) => void;
  isBadge?: boolean;
}) {
  const [isMiniMenuOpen, setIsMiniMenuOpen] = useState(false);

  const handleMoveToTeam = (origin: string, location: string) => {
    moveToTeam(origin, location);
  };

  return (
    <td>
      <div
        className={classNames(
          styles.actions,
          "flex gap-2 items-center justify-end",
          { [styles.miniMenuOpen]: isMiniMenuOpen },
        )}
      >
        <Notes {...{ locationKey }} />
        {!isBadge && <Move {...{ locationKey, handleMoveToTeam }} />}
        <Delete {...{ locationKey, setIsMiniMenuOpen }} />
      </div>
    </td>
  );
}

export default LocationActions;
