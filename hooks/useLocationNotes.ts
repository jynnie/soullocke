import { PlaceName } from "models";

import { useRunChild } from "./useRun";

export function useLocationNotes(place: PlaceName) {
  const notes = useRunChild<string>(`timeline/${place}/notes`);
  const name = useRunChild<string>(`timeline/${place}/name`);
  return { notes, name };
}
