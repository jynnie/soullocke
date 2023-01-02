import PokemonImage from "components/PokemonImage";
import { Data } from "components/Timeline/Timeline";
import { useFilters } from "components/Timeline/useFilters";
import { useTimelineData } from "components/Timeline/useTimelineData";
import { TooltipContent } from "components/ui-library/TooltipContent";
import { PokemonLocation } from "models";
import React, { useMemo } from "react";
import { Search } from "react-feather";
import styles from "styles/Filters.module.scss";
import Box from "ui-box";
import { cleanName } from "utils/utils";

import Tippy from "@tippyjs/react";

export function BoxView() {
  const { team, box, grave, daycare, onFilterChange } = usePokemon();

  return (
    <div style={{ maxWidth: 720, width: "calc(100vw - 4rem)" }}>
      <Filters onChange={onFilterChange} />

      <div className="flex gap-10 mt-8">
        <div className="flex flex-col gap-2">
          <div className="teko uppercase text-xl p-pink">Team</div>
          <div className="flex flex-col gap-4">
            {team?.map((tp, i) => (
              <TeamPokemon key={i} data={tp} />
            ))}
          </div>
        </div>

        <div className="flex flex-col gap-10">
          <div className="flex flex-col gap-2 p-blue">
            <div className="teko uppercase text-xl">Box</div>
            <div className="flex flew-wrap gap-4">
              {box?.map((d, i) => (
                <BoxPokemon key={i} data={d} />
              ))}
            </div>
          </div>

          <div className="flex flex-col gap-2">
            <div className="teko uppercase text-xl p-yellow">Daycare</div>
            <div className="flex flew-wrap gap-4">
              {daycare?.map((d, i) => (
                <BoxPokemon key={i} data={d} />
              ))}
            </div>
          </div>

          <div className="flex flex-col gap-2">
            <div className="teko uppercase text-xl">Grave</div>
            <div className="flex flew-wrap gap-4">
              {grave?.map((d, i) => (
                <BoxPokemon key={i} data={d} />
              ))}
            </div>
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

function Filters({ onChange }: { onChange: (val: any) => void }) {
  const [inputVal, setInputVal] = React.useState<string>("");

  const handleSearch: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    setInputVal(e.target.value);
    handleChange({ searchTerm: e.target.value });
  };

  const handleChange = (override?: any) => {
    if (onChange)
      onChange({
        searchTerm: inputVal,
        ...(override || {}),
      });
  };

  return (
    <Box className="flex justify-between" width="100%" marginBottom={8}>
      <div className={styles.search}>
        <Search size="1rem" />
        <input
          type="text"
          placeholder="Search"
          value={inputVal}
          onChange={handleSearch}
        />
      </div>
    </Box>
  );
}

function TeamPokemon({ data }: { data: Data }) {
  return (
    <div
      className="py-2 px-6 shadow-lg flex items-center relative overflow-hidden"
      style={{
        borderRadius: 48,
        height: 62,
        width: 260,
        background: `linear-gradient(
          118deg,
          var(--midnight-primary),
          var(--midnight-primary) 70%,
          var(--midnight-hover) 70%
        )`,
      }}
    >
      <div className="flex-grow">
        <div className="capitalize">{cleanName(data.location.name)}</div>
        <div
          className="text-lg capitalize font-bold truncate"
          style={{ lineHeight: "1.1em", maxWidth: 232 }}
        >
          {cleanName(data.pokemon.map((p) => p.nickname || "?").join(" & "))}
        </div>
      </div>

      <div className="flex items-center absolute right-4">
        {data.pokemon.map((p, i) => (
          <PokemonImage
            key={i}
            pokemon={p}
            width={72}
            marginRight={i !== 0 ? -24 : -32}
            marginTop={i * 20 - 16}
          />
        ))}
      </div>
    </div>
  );
}

function BoxPokemon({ data }: { data: Data }) {
  // TODO: Move styles into scss
  // TODO: Hover styles
  return (
    <div
      className="rounded-lg flex center bg-contain"
      style={{
        width: 64,
        height: 64,
        // backgroundColor: "var(--midnight-primary)",
        backgroundImage: "url('/PokeballLight.svg')",
      }}
    >
      <Tippy
        content={
          <TooltipContent className="capitalize">
            {data.pokemon.map((p) => p.nickname || "?").join(" & ")}
          </TooltipContent>
        }
        delay={[500, 0]}
      >
        <div className="flex items-center">
          {data.pokemon.map((p, i) => (
            <PokemonImage
              key={i}
              pokemon={p}
              width={48}
              marginLeft={i * -16}
              marginTop={i * 16 - 12}
            />
          ))}
        </div>
      </Tippy>
    </div>
  );
}
