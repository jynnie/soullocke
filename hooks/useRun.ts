import { Run } from "models/db.model";
import { RunContext } from "pages/run/[id]";
import { useContext } from "react";

import { useFirebase } from "./useFirebase";

/**
 * Gets all the information for a run. Can be expensive
 * to subscribe to this.
 * @returns undefined while loading, returns false if no such run exists
 */
export function useRun(id?: string) {
  return useFirebase<Run | false>(id, {
    defaultValue: undefined,
    fallbackValue: false,
  });
}

export function useRunChild<T extends Object>(
  childPath: string,
  defaultValue?: T,
) {
  const runId = useRunId();
  return useFirebase<T>(`${runId}/${childPath}`, { defaultValue });
}

export function useRunId() {
  const { id } = useContext(RunContext);
  return id;
}
