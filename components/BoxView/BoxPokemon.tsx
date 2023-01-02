import PokemonImage from "components/PokemonImage";
import { Data } from "components/Timeline/Timeline";
import { TooltipContent } from "components/ui-library/TooltipContent";
import React from "react";

import Tippy from "@tippyjs/react";

export function BoxPokemon({ data }: { data: Data }) {
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
