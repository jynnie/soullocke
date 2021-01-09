import React from "react";
import { UseState, Pokemon } from "models";

import Modal from "./Modal";
import PokemonIcon from "components/PokemonIcon";

export function TimelinePokemon({
  pokemon,
  playerId,
  location,
}: {
  pokemon: Pokemon;
  playerId: string;
  location: string;
}) {
  const [showModal, setShowModal]: UseState<boolean> = React.useState(null);

  const handleOpenModal = () => setShowModal(true);
  const handleCloseModal = () => setShowModal(false);

  return (
    <>
      <Modal
        {...{
          pokemon,
          location,
          playerId,
          showModal,
          onCancel: handleCloseModal,
        }}
      />

      <PokemonIcon {...{ pokemon }} onClick={handleOpenModal} />
    </>
  );
}

export default TimelinePokemon;
