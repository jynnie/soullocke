import { Player } from "models/db.model";

import { useRunChild } from "./useRun";

export function usePlayersArray() {
  const { value } = useRunChild("players", {});
  return Object.values(value || {}) as Player[];
}
