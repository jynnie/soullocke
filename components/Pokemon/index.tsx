import React from "react";
import Box from "ui-box";
import { alpha, colorize } from "lib/utils";
import type { UseState, Pokemon, PokemonApiData } from "models";

import Modal from "./Modal";
import { Avatar, Tooltip } from "antd";

const PokemonIcon = ({ pokemon }: { pokemon: Pokemon }) => {
  const [src, setSrc]: UseState<string> = React.useState(null);
  const [showModal, setShowModal]: UseState<boolean> = React.useState(null);

  const handleOpenModal = () => setShowModal(true);
  const handleCloseModal = () => setShowModal(false);
  const avatarStyle = { backgroundColor: colorize(pokemon.name) + alpha(0.5) };

  React.useEffect(() => {
    fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon.name}`)
      .then((res) => res.json())
      .then((data: PokemonApiData) => {
        setSrc(data?.sprites?.front_default);
      });
  }, [pokemon.name]);

  return (
    <>
      <Modal
        pokemon={pokemon}
        showModal={showModal}
        onCancel={handleCloseModal}
      />

      <Tooltip title={pokemon.nickname}>
        <Avatar
          size="large"
          src={src}
          onClick={handleOpenModal}
          style={avatarStyle}
        >
          {pokemon.nickname}
        </Avatar>
      </Tooltip>
    </>
  );
};

export default PokemonIcon;
