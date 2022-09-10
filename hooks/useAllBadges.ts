import BADGES from "lib/badges";

export function useAllBadges(region?: string) {
  return (!!region && BADGES[region as keyof typeof BADGES]) || [];
}
