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

    await timeline.update({
      [location]: {
        key: location,
        index,
        name: location,
      },
    });
  }

  return addNewLocation;
}
