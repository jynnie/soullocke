import React from "react";
import { RunContext } from "pages/run/[id]";
import type { UseState, PokemonListApiData as ListPokemon } from "models";

import styles from "styles/Form.module.scss";
import { Checkbox, Form, Select, Input, Button } from "antd";
const { Option } = Select;

function AddPokemonForm({
  onFinish,
  onCancel,
  showCaughtCheckbox = true,
}: {
  onFinish?: (pokemonName: string, nickname: string, caught: boolean) => void;
  onCancel?: () => void;
  showCaughtCheckbox?: boolean;
}) {
  const { allPokemon } = React.useContext(RunContext);
  const [pokemon, setPokemon]: UseState<string> = React.useState(null);
  const [nickname, setNickname]: UseState<string> = React.useState(null);
  const [caught, setCaught] = React.useState(true);

  const [form] = Form.useForm();

  const handleFinish = () => {
    form.resetFields();
    setPokemon(null);
    setNickname(null);
    setCaught(true);
    if (onFinish) onFinish(pokemon, nickname, caught);
  };

  const handlePokemonChange = (value) => {
    setPokemon(value);
  };

  const handleNicknameChange = (evt) => {
    setNickname(evt.target.value);
  };

  const handleCaughtChange = (evt) => {
    setCaught(evt.target.checked);
  };

  const handleCancel = () => {
    form.resetFields();
    setPokemon(null);
    setNickname(null);
    setCaught(true);
    if (onCancel) onCancel();
  };

  return (
    <Form form={form} name="addPokemon" onFinish={handleFinish}>
      <Form.Item
        className={styles.item}
        name="pokemon"
        rules={[
          {
            required: caught,
            message: "Please choose what Pokémon was caught",
          },
        ]}
      >
        <Select
          className={styles.select}
          onChange={handlePokemonChange}
          value={pokemon}
          placeholder="Select a Pokémon"
          showSearch
        >
          {allPokemon?.map((p) => (
            <Option key={p.name} value={p.name} className={styles.option}>
              {p.name}
            </Option>
          ))}
        </Select>
      </Form.Item>

      <Form.Item
        className={styles.item}
        name="nickname"
        rules={[
          {
            required: caught,
            message: "Please input your Pokémon's nickname",
          },
        ]}
      >
        <Input
          onChange={handleNicknameChange}
          value={nickname}
          placeholder="Nickname"
        />
      </Form.Item>

      {showCaughtCheckbox && (
        <Form.Item className={styles.item} name="caught" initialValue={true}>
          <Checkbox onChange={handleCaughtChange} checked={caught}>
            Caught
          </Checkbox>
        </Form.Item>
      )}

      <Form.Item className={styles.itemButtons}>
        {onCancel && <Button onClick={handleCancel}>Cancel</Button>}

        <Button type="primary" htmlType="submit">
          Add
        </Button>
      </Form.Item>
    </Form>
  );
}

export default AddPokemonForm;
