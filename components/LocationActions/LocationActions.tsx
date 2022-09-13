import Notes from "components/Notes";
import React from "react";

import Delete from "./Delete";
import Move from "./Move";

export function LocationActions({
  locationKey,
  moveToTeam,
}: {
  locationKey: string;
  moveToTeam: (origin: string, location: string) => void;
}) {
  const handleMoveToTeam = (origin: string, location: string) => {
    moveToTeam(origin, location);
  };

  return (
    <td>
      <Notes {...{ locationKey }} />
      <Move {...{ locationKey, handleMoveToTeam }} />
      <Delete {...{ locationKey }} />
    </td>
  );
}

export default LocationActions;
