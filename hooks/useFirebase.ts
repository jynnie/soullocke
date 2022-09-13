import { FirebaseContext } from "pages/_app";
import { useContext, useEffect, useMemo, useState } from "react";

/**
 * useFirebase realtime value at a path. Returns ref, value, set, and
 * update methods.
 */
export function useFirebase<T extends Object>(
  path?: string,
  { defaultValue, fallbackValue }: { defaultValue?: T; fallbackValue?: T } = {},
) {
  const db = useContext(FirebaseContext)?.db;
  const dbRef = useMemo(() => db?.ref(path), [db, path]);

  const [value, setReadValue] = useState<T | undefined>(defaultValue);

  useEffect(() => {
    const listener = dbRef?.on("value", (snapshot) => {
      const rawValue = snapshot.val() || fallbackValue;
      setReadValue(rawValue);
    });
    return () => {
      dbRef?.off("value", listener);
    };
  }, [dbRef, fallbackValue]);

  function updateValue(newValue: T) {
    return dbRef?.update(newValue);
  }

  function setValue(newValue: T | null) {
    return dbRef?.set(newValue);
  }

  return { value, update: updateValue, set: setValue, ref: dbRef };
}
