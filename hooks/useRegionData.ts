import { Region } from "models";
import { useEffect, useState } from "react";

export function useRegionData(region?: string) {
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
