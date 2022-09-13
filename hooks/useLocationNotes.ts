import { PlaceName } from "models";

import { useRunChild } from "./useRun";

export function useLocationNotes(place: PlaceName) {
  const notes = useRunChild<string>(`timeline/${place}/notes`);
  return notes;
}
