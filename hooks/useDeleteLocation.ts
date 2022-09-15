import { Player, Timeline } from "models/db.model";

import { useRunChild } from "./useRun";

export function useDeleteLocation(locationKey: string) {
  const timeline = useRunChild<Timeline>(`timeline/${locationKey}`);
  const players = useRunChild<Record<string, Player>>("players", {});

  async function deleteLocation() {
    const promises: Promise<any>[] = [];

    const promise = timeline.set(null);
    if (promise) promises.push(promise);

    for (const player of Object.values(players.value || {})) {
      const promise = players.ref
        ?.child(`${player.id}/pokemon/${locationKey}`)
        .set(null);

      if (promise) promises.push(promise);
    }

    await Promise.all(promises);
  }

  return deleteLocation;
}
