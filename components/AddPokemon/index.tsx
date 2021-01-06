import React from "react";
import { RunContext } from "pages/run/[id]";
import type {
  UseState,
  PokemonListApiData as ListPokemon,
  PlaceName,
} from "models";

import { Popover, Button, Tooltip } from "antd";
import { PlusOutlined } from "@ant-design/icons";

import Form from "./Form";

const AddPokemon = ({
  allPokemon,
  playerId,
  location,
}: {
  allPokemon: ListPokemon[];
  playerId: string;
  location: PlaceName;
}) => {
  const { RUN } = React.useContext(RunContext);
  const [showForm, setShowForm]: UseState<boolean> = React.useState(null);

  const toggleForm = () => setShowForm(!showForm);

  const onFinish = async (pokemonName: string, nickname: string) => {
    await RUN.addCaughtPokemon(pokemonName, nickname, playerId, location);
    toggleForm();
  };
  const onCancel = () => {
    toggleForm();
  };

  return (
    <Popover
      content={<Form {...{ allPokemon, onFinish, onCancel }} />}
      trigger="click"
      visible={showForm}
      onVisibleChange={(v) => setShowForm(v)}
    >
      <Tooltip title="Add Pokemon">
        <Button type="dashed" shape="circle" icon={<PlusOutlined />} />
      </Tooltip>
    </Popover>
  );
};

export default AddPokemon;
