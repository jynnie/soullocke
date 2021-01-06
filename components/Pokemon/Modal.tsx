import React from "react";
import { oVal } from "lib/utils";
import { Pokemon, PokemonLocation } from "models";

import Event from "./Event";
import AddEvent from "components/AddEvent";
import { Modal, Timeline } from "antd";

// TODO: Back fill pokemon
// TODO: Delete pokemon (doesn't delete events)
// TODO: Delete event
// TODO: Buttons for move to team (does it require a trade?)

const PokemonModal = ({
  pokemon,
  showModal,
  onCancel,
}: {
  pokemon: Pokemon;
  showModal: boolean;
  onCancel: () => void;
}) => {
  // FIXME: Sort array by timeline
  const eventsArr = oVal(pokemon?.events || {});

  const pokemonIsAlive = pokemon.location !== PokemonLocation.grave;

  return (
    <Modal
      title={`${pokemon.nickname} (${pokemon.name})`}
      visible={!!showModal}
      onCancel={onCancel}
      footer={null}
    >
      <Timeline>
        {eventsArr?.map((event, i) => (
          <Event key={i} {...{ event }} />
        ))}
        {pokemonIsAlive && <AddEvent {...{ pokemon }} />}
      </Timeline>
    </Modal>
  );
};

export default PokemonModal;
