import React from "react";
import { PlaceName } from "models";

import Move from "./Move";
import Delete from "./Delete";

export function LocationActions({
  location,
  moveToTeam,
}: {
  location: PlaceName;
  moveToTeam: (origin: string, location: string) => void;
}) {
  const handleMoveToTeam = (origin: string, location: string) => {
    moveToTeam(origin, location);
  };

  return (
    <td>
      <Move {...{ location, handleMoveToTeam }} />
      <Delete {...{ location }} />
    </td>
  );
}

export default LocationActions;
