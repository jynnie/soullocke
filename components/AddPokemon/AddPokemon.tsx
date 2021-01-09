import React from "react";
import { RunContext } from "pages/run/[id]";
import { UseState, PlaceName } from "models";

import { Popover, Button, Tooltip } from "antd";
import { PlusOutlined } from "@ant-design/icons";

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
  const { RUN } = React.useContext(RunContext);
  const [showForm, setShowForm]: UseState<boolean> = React.useState(null);

  const toggleForm = () => setShowForm(!showForm);

  const handleFinish = async (
    pokemonName: string,
    nickname: string,
    caught: boolean,
  ) => {
    await RUN.addPokemon(pokemonName, nickname, playerId, location, caught);
    if (onFinish) onFinish(caught);
    toggleForm();
  };
  const onCancel = () => {
    toggleForm();
  };

  return (
    <Popover
      content={<Form {...{ onFinish: handleFinish, onCancel }} />}
      trigger="click"
      visible={showForm}
      onVisibleChange={(v) => setShowForm(v)}
    >
      <Tooltip title="Add Pokemon">
        <Button type="dashed" shape="circle" icon={<PlusOutlined />} />
      </Tooltip>
    </Popover>
  );
}

export default AddPokemon;
