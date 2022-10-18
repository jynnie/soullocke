import { Button } from "components/ui-library/Button";
import { TimelineBullet } from "components/ui-library/TimelineBullet";
import { useAddEvent } from "hooks/useAddEvent";
import { EventType, IPokemon, PlaceName, PokemonEvent } from "models";
import React, { useState } from "react";
import { PlusCircle } from "react-feather";

import Form from "./Form";

export function AddEvent({ pokemon }: { pokemon: IPokemon }) {
  const { addEvent } = useAddEvent(pokemon.playerId, pokemon.origin);
  const [showForm, setShowForm] = useState<boolean>(false);

  const toggleForm = () => setShowForm(!showForm);

  const onFinish = async (
    eventType: EventType,
    eventLocation: PlaceName,
    eventDetails: PokemonEvent["details"],
  ) => {
    await addEvent(eventType, eventLocation, eventDetails);
    toggleForm();
  };

  return (
    <TimelineBullet dot={<PlusCircle size={16} />}>
      {!showForm && (
        <Button className="outline" onClick={toggleForm}>
          Add Event
        </Button>
      )}

      {showForm && <Form {...{ pokemon, onFinish, onCancel: toggleForm }} />}
    </TimelineBullet>
  );
}

export default AddEvent;
