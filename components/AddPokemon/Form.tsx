import React from "react";
import type { UseState, PokemonListApiData as ListPokemon } from "models";

import styles from "styles/Form.module.scss";
import { Form, Select, Input, Button } from "antd";
const { Option } = Select;

function AddPokemonForm({
  allPokemon,
  onFinish,
  onCancel,
}: {
  allPokemon: ListPokemon[];
  onFinish?: (pokemonName: string, nickname: string) => void;
  onCancel?: () => void;
}) {
  const [pokemon, setPokemon]: UseState<string> = React.useState(null);
  const [nickname, setNickname]: UseState<string> = React.useState(null);

  const [form] = Form.useForm();

  const handleFinish = () => {
    if (onFinish) onFinish(pokemon, nickname);
    form.resetFields();
    setPokemon(null);
    setNickname(null);
  };

  const handlePokemonChange = (value) => {
    setPokemon(value);
  };

  const handleNicknameChange = (evt) => {
    setNickname(evt.target.value);
  };

  const handleCancel = () => {
    if (onCancel) onCancel();
    form.resetFields();
    setPokemon(null);
    setNickname(null);
  };

  return (
    <Form form={form} name="addPokemon" onFinish={handleFinish}>
      <Form.Item
        className={styles.item}
        name="pokemon"
        rules={[
          { required: true, message: "Please choose what Pokémon was caught" },
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
          { required: true, message: "Please input your Pokémon's nickname" },
        ]}
      >
        <Input
          onChange={handleNicknameChange}
          value={nickname}
          placeholder="Nickname"
        />
      </Form.Item>

      <Form.Item className={styles.itemButtons}>
        <Button onClick={handleCancel}>Cancel</Button>

        <Button type="primary" htmlType="submit">
          Add
        </Button>
      </Form.Item>
    </Form>
  );
}

export default AddPokemonForm;
