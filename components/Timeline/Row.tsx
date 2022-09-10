import AddPokemon from "components/AddPokemon";
import LocationActions from "components/LocationActions";
import LocationSummary from "components/LocationSummary";
import Pokemon from "components/Pokemon";
import type { PlaceName } from "models";
import React from "react";

import LocationListing from "../LocationListing";
import type { Data } from "./Timeline";

function TimelineRow({
  data,
  handleFinishAdd,
  moveToTeam,
}: {
  data: Data;
  handleFinishAdd: (location: PlaceName) => (caught: boolean) => void;
  moveToTeam: (origin: string, location: string) => void;
}) {
  return (
    <>
      <LocationListing location={data.location.name} />

      {data.players?.map((p) => {
        const key = data.location.key + p.name;
        const playerPokemon = p.pokemon?.[data.location.name];
        const isBadge = /badge/gi.test(data.location.name);
        const props = {
          playerId: p.id,
          location: data.location.name,
          onFinish: handleFinishAdd(data.location.name),
          pokemon: playerPokemon,
        };

        let display: any = <AddPokemon {...props} />;
        if (isBadge) display = "-";
        if (playerPokemon) display = <Pokemon {...props} />;
        return <td key={key}>{display}</td>;
      })}

      <td>
        <LocationSummary
          pokemon={data.pokemon}
          pokemonLocation={data.pokemonLocation}
        />
      </td>

      <LocationActions location={data.location.name} {...{ moveToTeam }} />
    </>
  );
}

export default TimelineRow;
