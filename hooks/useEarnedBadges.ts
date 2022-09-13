import { useTimelineLocations } from "./useTimelineLocations";

export default function useEarnedBadges() {
  const allLocations = useTimelineLocations();
  const allBadges = allLocations
    .filter((l) => /badge/gi.test(l.name))
    .map((l) => l.name);
  return allBadges;
}
