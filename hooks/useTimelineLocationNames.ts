import { Run } from "models/db.model";

import { useRunChild } from "./useRun";

export function useTimelineLocationNames() {
  const timeline = useRunChild<Run["timeline"]>("timeline", {});
  const timelineArr = Object.values(timeline.value || {})
    .sort((a, b) => a.index - b.index)
    .map((l) => ({ name: l.name, key: l.key }));
  return timelineArr;
}
