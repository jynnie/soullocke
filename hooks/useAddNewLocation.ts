import { PlaceName, Run } from "models/db.model";

import { useRunChild } from "./useRun";

export function useAddNewLocation() {
  const timeline = useRunChild<Run["timeline"]>("timeline");

  async function addNewLocation(location: PlaceName) {
    const prevLargestIndex = Object.values(timeline.value || []).reduce(
      (prev, current) => (prev > current.index ? prev : current.index),
      -1,
    );
    const index = prevLargestIndex + 1;
    const uuid = self.crypto.randomUUID();

    await timeline.update({
      [uuid]: {
        key: uuid,
        index,
        name: location,
      },
    });
  }

  return addNewLocation;
}
