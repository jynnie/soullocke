import { Button, Timeline } from "antd";
import { EventType, PlaceName, Pokemon, PokemonEvent } from "models";
import { RunContext } from "pages/run/[id]";
import React from "react";

import { PlusCircleOutlined } from "@ant-design/icons";

import Form from "./Form";

export function AddEvent({ pokemon }: { pokemon: Pokemon }) {
  const { RUN } = React.useContext(RunContext);
  const [showForm, setShowForm] = React.useState<boolean>(false);

  const toggleForm = () => setShowForm(!showForm);

  const onFinish = async (
    eventType: EventType,
    eventLocation: PlaceName,
    eventDetails: PokemonEvent["details"],
  ) => {
    await RUN.addEvent(
      pokemon.playerId,
      pokemon.origin,
      eventType,
      eventLocation,
      eventDetails,
    );
    toggleForm();
  };
  const onCancel = () => {
    toggleForm();
  };

  return (
    <Timeline.Item dot={<PlusCircleOutlined size={18} />}>
      {!showForm && <Button onClick={toggleForm}>Add Event</Button>}

      {showForm && <Form {...{ pokemon, onFinish, onCancel }} />}
    </Timeline.Item>
  );
}

export default AddEvent;
