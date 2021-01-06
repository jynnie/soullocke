import React from "react";
import Box from "ui-box";
import { oVal, cleanName } from "lib/utils";
import type { Pokemon } from "models";

import Event from "./Event";
import { Modal, Timeline } from "antd";

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
      </Timeline>
    </Modal>
  );
};

export default PokemonModal;
