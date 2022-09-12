import { Button } from "antd";
import MovePokemon from "components/MovePokemon";
import { useAddEvent } from "hooks/useAddEvent";
import { EventType, PlaceName, PokemonLocation } from "models";
import React from "react";
import styles from "styles/Location.module.scss";

export function Move({
  location: origin,
  handleMoveToTeam,
}: {
  location: PlaceName;
  handleMoveToTeam: (origin: string, location: string) => void;
}) {
  const [showModal, setShowModal] = React.useState(false);

  const { addEvent } = useAddEvent("", origin, {
    callback: () => setShowModal(false),
    startMoveToTeam: handleMoveToTeam,
  });

  function handleMove(location: PlaceName, pokemonLocation: PokemonLocation) {
    return addEvent(EventType.moved, location, { location: pokemonLocation });
  }

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
