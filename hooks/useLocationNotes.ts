import { useRunChild } from "./useRun";

export function useLocationNotes(place: string) {
  const { value } = useRunChild(`timeline/${place}/notes`);
  return value || "";
}
