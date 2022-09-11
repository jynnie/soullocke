import { Button, Timeline } from "antd";
import { useAddEvent } from "hooks/useAddEvent";
import { EventType, IPokemon, PlaceName, PokemonEvent } from "models";
import React, { useState } from "react";

import { PlusCircleOutlined } from "@ant-design/icons";

import Form from "./Form";

export function AddEvent({ pokemon }: { pokemon: IPokemon }) {
  const addEvent = useAddEvent(pokemon.playerId, pokemon.origin);
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
    <Timeline.Item dot={<PlusCircleOutlined size={18} />}>
      {!showForm && <Button onClick={toggleForm}>Add Event</Button>}

      {showForm && <Form {...{ pokemon, onFinish, onCancel: toggleForm }} />}
    </Timeline.Item>
  );
}

export default AddEvent;
