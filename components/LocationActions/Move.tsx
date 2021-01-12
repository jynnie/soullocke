import React from "react";
import { RunContext } from "pages/run/[id]";
import { PlaceName, PokemonLocation } from "models";

import styles from "styles/Location.module.scss";
import MovePokemon from "components/MovePokemon";
import { Button } from "antd";

export function Move({
  location: origin,
  handleMoveToTeam,
}: {
  location: PlaceName;
  handleMoveToTeam: (origin: string, location: string) => void;
}) {
  const { RUN } = React.useContext(RunContext);

  const [showModal, setShowModal] = React.useState(false);

  const handleMove = async (
    location: PlaceName,
    pokemonLocation: PokemonLocation,
  ) => {
    if (pokemonLocation === PokemonLocation.team)
      handleMoveToTeam(origin, location);
    else {
      RUN.movePokemon(origin, location, pokemonLocation);
    }
    setShowModal(false);
  };

  return (
    <>
      <MovePokemon
        visible={showModal}
        onCancel={() => setShowModal(false)}
        onFinish={handleMove}
        pokemonOrigin={origin}
      />
      <Button
        className={styles.listingMoveButton}
        onClick={() => setShowModal(true)}
        type="text"
        children="Move"
        size="small"
      />
    </>
  );
}

export default Move;
