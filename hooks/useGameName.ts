import { useRunChild } from "./useRun";

export function useGameName() {
  const name = useRunChild(`game`);
  return name.value;
}
