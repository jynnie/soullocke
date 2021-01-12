import React from "react";
import { oVal } from "lib/utils";
import { RunContext } from "pages/run/[id]";
import { Pokemon, PokemonLocation } from "models";

import Event from "./Event";
import AddEvent from "components/AddEvent";
import PokemonForm from "components/AddPokemon/Form";
import { Modal, Timeline } from "antd";

function PokemonModal({
  pokemon,
  playerId,
  location,
  showModal,
  onCancel,
}: {
  pokemon: Pokemon;
  playerId: string;
  location: string;
  showModal: boolean;
  onCancel: () => void;
}) {
  const { RUN } = React.useContext(RunContext);

  const timelineArr = RUN.getTimelineLocationNames();
  const eventsArr = oVal(pokemon?.events || {}).sort(
    (a, b) => timelineArr.indexOf(a.location) - timelineArr.indexOf(b.location),
  );
  const pokemonIsAlive = pokemon.location !== PokemonLocation.grave;

  const handleFinish = (pokemonName: string, nickname: string): void => {
    RUN.backfillPokemon(pokemonName, nickname, playerId, location);
  };

  return (
    <Modal
      title={`${pokemon.nickname} (${pokemon.name})`}
      visible={!!showModal}
      onCancel={onCancel}
      footer={null}
    >
      {!pokemon.name && (
        <PokemonForm showCaughtCheckbox={false} onFinish={handleFinish} />
      )}

      <Timeline>
        {eventsArr?.map((event, i) => (
          <Event key={i} {...{ event }} />
        ))}
        {pokemonIsAlive && <AddEvent {...{ pokemon }} />}
      </Timeline>
    </Modal>
  );
}

export default PokemonModal;
