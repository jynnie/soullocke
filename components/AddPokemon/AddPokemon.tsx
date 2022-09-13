import { Button, Popover, Tooltip } from "antd";
import { useAddEvent } from "hooks/useAddEvent";
import { PlaceName } from "models";
import React from "react";
import styles from "styles/Home.module.css";

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
        <Button
          type="dashed"
          shape="circle"
          icon={<PlusOutlined />}
          className={styles.secondaryButton}
        />
      </Tooltip>
    </Popover>
  );
}

export default AddPokemon;
