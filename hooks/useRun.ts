import { RunContext } from "pages/run/[id]";
import { useContext } from "react";

import { useFirebase } from "./useFirebase";

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
