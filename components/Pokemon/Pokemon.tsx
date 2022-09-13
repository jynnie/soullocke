import PokemonIcon from "components/PokemonIcon";
import { IPokemon } from "models";
import React from "react";

import Modal from "./Modal";

export function TimelinePokemon({
  pokemon,
  playerId,
  location,
}: {
  pokemon: IPokemon;
  playerId: string;
  location: string;
}) {
  const [showModal, setShowModal] = React.useState<boolean>(false);

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
