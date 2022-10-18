import { Popover, Tooltip } from "antd";
import { Button } from "components/ui-library/Button";
import { useAddEvent } from "hooks/useAddEvent";
import { PlaceName } from "models";
import React from "react";
import { Plus } from "react-feather";

import Form from "./Form";

export function AddPokemon({
  playerId,
  location,
  onFinish,
}: {
  playerId: string;
  location: PlaceName;
  onFinish: (caught: boolean) => void;
}) {
  const [showForm, setShowForm] = React.useState<boolean>(false);

  const toggleForm = () => setShowForm(!showForm);
  const { addPokemon } = useAddEvent(playerId, location);

  const handleFinish = async (
    pokemonName: string,
    nickname: string,
    caught: boolean,
  ) => {
    await addPokemon(pokemonName, nickname, caught);
    onFinish?.(caught);
    toggleForm();
  };
  const onCancel = () => toggleForm();

  return (
    <Popover
      content={<Form {...{ onFinish: handleFinish, onCancel }} />}
      trigger="click"
      visible={showForm}
      onVisibleChange={(v) => setShowForm(v)}
    >
      <Tooltip title="Add Pokemon">
        <Button className="subtle outline icon" icon={<Plus />} />
      </Tooltip>
    </Popover>
  );
}

export default AddPokemon;
