import React from "react";
import Box from "ui-box";
import { alpha, colorize } from "lib/utils";
import { UseState, Pokemon, PokemonApiData } from "models";

import Modal from "./Modal";
import styles from "styles/Pokemon.module.scss";
import { Avatar, Tooltip, Badge } from "antd";
import { BADGE_COLOR } from "./index";

export function PokemonIcon({
  pokemon,
  playerId,
  location,
}: {
  pokemon: Pokemon;
  playerId: string;
  location: string;
}) {
  const [src, setSrc]: UseState<string> = React.useState(null);
  const [showModal, setShowModal]: UseState<boolean> = React.useState(null);

  const handleOpenModal = () => setShowModal(true);
  const handleCloseModal = () => setShowModal(false);
  const avatarStyle = { backgroundColor: colorize(pokemon.name) + alpha(0.5) };

  React.useEffect(() => {
    if (pokemon.name) {
      fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon.name}`)
        .then((res) => res.json())
        .then((data: PokemonApiData) => {
          setSrc(data?.sprites?.front_default);
        });
    }
  }, [pokemon.name]);

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

      <Tooltip title={pokemon.nickname}>
        <Box position="relative" onClick={handleOpenModal}>
          <Badge
            className={styles.badge}
            status={BADGE_COLOR[pokemon.location || "grave"]}
          >
            <Avatar size="large" src={src} style={avatarStyle}>
              {pokemon.nickname || "?"}
            </Avatar>
          </Badge>
        </Box>
      </Tooltip>
    </>
  );
}

export default PokemonIcon;
