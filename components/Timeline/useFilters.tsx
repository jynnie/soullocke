import React from "react";
import styles from "styles/Timeline.module.scss";

import { Filter } from "./Filters";
import { Data } from "./Timeline";

export function useFilters(allDataArr: Data[]) {
  const [filteredData, setFilteredData] = React.useState<Data[] | null>(null);
  const [filterClassNames, setFilterClassNames] = React.useState<string>("");

  function handleFilterChange(filters: Filter) {
    const classnames: string[] = [];

    for (const f in filters) {
      if (filters[f as keyof typeof filters] && f.includes("hide")) {
        classnames.push(styles[f]);
      }
    }

    if (!!filters.searchTerm) {
      const newFiltered = allDataArr.filter((d) =>
        matchesPokemonName(d, filters),
      );
      setFilteredData(newFiltered);
    } else {
      setFilteredData(null);
    }

    setFilterClassNames(classnames.join(" "));
  }

  return { filteredData, filterClassNames, onFilterChange: handleFilterChange };
}

function matchesPokemonName(d: Data, filters: Filter): boolean {
  const searchTerm = filters.searchTerm?.toLowerCase();
  return d.pokemonNames?.toLowerCase().includes(searchTerm);
}
