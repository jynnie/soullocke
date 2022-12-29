import classNames from "classnames";
import MovePokemon from "components/MovePokemon";
import { Button } from "components/ui-library/Button";
import { useAddEvent } from "hooks/useAddEvent";
import { EventType, PokemonLocation } from "models";
import React from "react";
import styles from "styles/Location.module.scss";

export function Move({
  locationKey: origin,
  handleMoveToTeam,
}: {
  locationKey: string;
  handleMoveToTeam: (origin: string, locationKey: string) => void;
}) {
  const [showModal, setShowModal] = React.useState(false);

  const { addEvent } = useAddEvent("", origin, {
    callback: () => setShowModal(false),
    startMoveToTeam: handleMoveToTeam,
  });

  function handleMove(locationKey: string, pokemonLocation: PokemonLocation) {
    return addEvent(EventType.moved, locationKey, {
      location: pokemonLocation,
    });
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
        className={classNames("text", styles.listingMoveButton)}
        onClick={() => setShowModal(true)}
      >
        Move
      </Button>
    </>
  );
}

export default Move;
