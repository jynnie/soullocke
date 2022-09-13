import { useTimelineLocationNames } from "./useTimelineLocationNames";

export default function useEarnedBadges() {
  const allLocations = useTimelineLocationNames();
  const allBadges = allLocations.filter((l) => /badge/gi.test(l.name));
  return allBadges;
}
