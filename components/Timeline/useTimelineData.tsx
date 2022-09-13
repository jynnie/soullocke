import { usePlayersArray } from "hooks/usePlayersArray";
import { useRunChild } from "hooks/useRun";
import { EventType, IPokemon, PokemonEvent, Run, Timeline } from "models";
import { getPokemonByOrigin } from "utils/getPokemonByOrigin";
import { getPokemonLocationByOrigin } from "utils/getPokemonLocationByOrigin";

import { Data } from "./Timeline";

export function useTimelineData() {
  const timeline = useRunChild<Run["timeline"]>("timeline", {});
  const timelineArr = Object.values(timeline.value || {}).sort(
    (a, b) => a.index - b.index,
  );

  const playerArr = usePlayersArray();

  function getLocationNotes(locationKey: string): string {
    return timelineArr.find((l) => l.key === locationKey)?.notes || "";
  }

  const allDataArr: Data[] = timelineArr.map((l) => {
    const pokemon = getPokemonByOrigin({ playerArr, origin: l.key }) || [];
    const pokemonNames = pokemon.reduce(makePokemonNameString, "");

    return {
      location: l,
      players: playerArr,
      pokemon: pokemon.filter((p) => !!p) as IPokemon[],
      pokemonNames,
      pokemonLocation: getPokemonLocationByOrigin(playerArr, l.name),
      notes: getLocationNotes(l.key),
    };
  });

  function setTimelineOrder(newOrder: Timeline[]) {
    const result = newOrder.reduce(
      (acc, t) => ({
        ...acc,
        [t.key]: t,
      }),
      {},
    );
    return timeline.set(result);
  }

  return { playerArr, timelineArr, allDataArr, setTimelineOrder };
}

function makePokemonNameString(acc: string, p: IPokemon | null): string {
  if (!p) return acc;
  let newNameString = `${acc} ${p.name} ${p.nickname}`;

  const events: PokemonEvent[] = Object.values(p.events || {});
  for (const e of events) {
    if (e?.type === EventType.evolved) {
      const evolution = e.details?.evolution;
      if (evolution) newNameString += ` ${evolution}`;
    }
  }
  return newNameString;
}
