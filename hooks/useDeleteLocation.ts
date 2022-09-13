import { PlaceName, Timeline } from "models/db.model";

import { useRunChild } from "./useRun";

export function useDeleteLocation(location: PlaceName) {
  const timeline = useRunChild<Timeline>(`timeline/${location}`);

  async function deleteLocation() {
    timeline.set(null);
  }

  return deleteLocation;
}
