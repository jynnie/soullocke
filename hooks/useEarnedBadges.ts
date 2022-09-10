import { useTimelineLocationNames } from "./useTimelineLocationNames";

export default function useEarnedBadges() {
  const allLocations = useTimelineLocationNames();
  const allBadges = allLocations.filter((name) => /badge/gi.test(name));
  return allBadges;
}
