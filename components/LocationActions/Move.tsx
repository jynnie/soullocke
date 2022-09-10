import { Button } from "antd";
import MovePokemon from "components/MovePokemon";
import { PlaceName, PokemonLocation } from "models";
import { RunContext } from "pages/run/[id]";
import React from "react";
import styles from "styles/Location.module.scss";

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
      RUN?.movePokemon(origin, location, pokemonLocation);
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
        size="small"
      >
        Move
      </Button>
    </>
  );
}

export default Move;
