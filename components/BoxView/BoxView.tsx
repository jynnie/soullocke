import { useFilters } from "components/Timeline/useFilters";
import { useTimelineData } from "components/Timeline/useTimelineData";
import { PokemonLocation } from "models";
import React, { useMemo } from "react";

import { BoxFilters } from "./BoxFilters";
import { BoxPokemon } from "./BoxPokemon";
import { TeamPokemon } from "./TeamPokemon";

export function BoxView() {
  const { team, box, grave, daycare, onFilterChange } = usePokemon();

  return (
    <div style={{ maxWidth: "var(--max-width)", width: "calc(100vw - 4rem)" }}>
      <BoxFilters onChange={onFilterChange} />

      <div className="flex gap-10 mt-8">
        <div className="flex flex-col gap-2">
          <div className="teko uppercase text-xl p-pink">Team</div>
          <div className="flex flex-col gap-4" style={{ width: 260 }}>
            {team?.map((d) => (
              <TeamPokemon key={d.pokemonNames} data={d} />
            ))}
          </div>
          {!team?.length && <p className="caption">None</p>}
        </div>

        <div className="flex flex-col gap-10">
          <div className="flex flex-col gap-2 p-blue">
            <div className="teko uppercase text-xl">Box</div>
            <div className="flex flex-wrap gap-4">
              {box?.map((d) => (
                <BoxPokemon key={d.pokemonNames} data={d} />
              ))}
            </div>
            {!box?.length && <p className="caption">None</p>}
          </div>

          <div className="flex flex-col gap-2">
            <div className="teko uppercase text-xl p-yellow">Daycare</div>
            <div className="flex flex-wrap gap-4">
              {daycare?.map((d) => (
                <BoxPokemon key={d.pokemonNames} data={d} />
              ))}
              {!daycare?.length && <p className="caption">None</p>}
            </div>
          </div>

          <div className="flex flex-col gap-2">
            <div className="teko uppercase text-xl">Grave</div>
            <div className="flex flex-wrap gap-4">
              {grave?.map((d) => (
                <BoxPokemon key={d.pokemonNames} data={d} />
              ))}
            </div>
            {!grave?.length && <p className="caption">None</p>}
          </div>
        </div>
      </div>
    </div>
  );
}

function usePokemon() {
  const { allDataArr } = useTimelineData();
  const { filteredData, onFilterChange } = useFilters(allDataArr);

  const team = useMemo(
    () =>
      (filteredData || allDataArr)?.filter(
        (d) => d.pokemonLocation === PokemonLocation.team,
      ),
    [filteredData, allDataArr],
  );

  const box = useMemo(
    () =>
      (filteredData || allDataArr)?.filter(
        (d) => d.pokemonLocation === PokemonLocation.box,
      ),
    [filteredData, allDataArr],
  );

  const grave = useMemo(
    () =>
      (filteredData || allDataArr)?.filter(
        (d) => d.pokemonLocation === PokemonLocation.grave && d.pokemonNames,
      ),
    [filteredData, allDataArr],
  );

  const daycare = useMemo(
    () =>
      (filteredData || allDataArr)?.filter(
        (d) => d.pokemonLocation === PokemonLocation.daycare,
      ),
    [filteredData, allDataArr],
  );
  return { team, box, grave, daycare, onFilterChange };
}
