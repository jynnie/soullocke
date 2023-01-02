import PokemonImage from "components/PokemonImage";
import { Data } from "components/Timeline/Timeline";
import React from "react";
import { cleanName } from "utils/utils";

export function TeamPokemon({ data }: { data: Data }) {
  return (
    <div
      className="py-2 px-6 shadow-lg flex items-center relative"
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
