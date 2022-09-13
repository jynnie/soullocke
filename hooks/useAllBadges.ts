import BADGES from "lib/badges";

export function useAllBadges(region?: string | false) {
  return (!!region && BADGES[region as keyof typeof BADGES]) || [];
}
