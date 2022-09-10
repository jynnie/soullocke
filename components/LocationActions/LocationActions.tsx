import Notes from "components/Notes";
import { PlaceName } from "models";
import React from "react";

import Delete from "./Delete";
import Move from "./Move";

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
      <Notes {...{ location }} />
      <Move {...{ location, handleMoveToTeam }} />
      <Delete {...{ location }} />
    </td>
  );
}

export default LocationActions;
