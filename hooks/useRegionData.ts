import { Region } from "models";
import { useEffect, useState } from "react";

import { useFirebase } from "./useFirebase";

export function useRegionData(region?: string | false) {
  const [regionData, setRegionData] = useState<Region | null>(null);

  useEffect(() => {
    if (!!region) {
      fetch(`https://pokeapi.co/api/v2/region/${region}/`)
        .then((res) => res.json())
        .then((data) => setRegionData(data));
    }
  }, [region]);

  return regionData;
}

export function useRegion(id?: string) {
  const { value: region } = useFirebase<string | false>(`${id}/region`, {
    defaultValue: undefined,
    fallbackValue: false,
  });
  return region;
}
