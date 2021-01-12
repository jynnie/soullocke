import React from "react";
import { cleanName, oVal } from "lib/utils";
import { RunContext } from "pages/run/[id]";
import { UseState, PlaceName, PokemonLocation } from "models";

import styles from "styles/Form.module.scss";
import PokemonGroup from "components/PokemonGroup";
import PokemonIcon from "components/PokemonIcon";
import { Form, Select, Button, Modal } from "antd";
const { Option } = Select;

export function MovePokemon({
  pokemonOrigin,
  visible,
  onCancel,
  onFinish,
}: {
  pokemonOrigin: PlaceName;
  visible: boolean;
  onCancel?: () => void;
  onFinish?: (location: PlaceName, pokemonLocation: PokemonLocation) => void;
}) {
  const { RUN } = React.useContext(RunContext);

  //----------------------------------#01F2DF
  // Information Getters
  const pokemonMoving = RUN.getPokemonByOrigin(pokemonOrigin);
  const pokemonMovingNames = pokemonMoving
    ?.map((p) => p?.nickname || "?")
    .join(" & ");
  const timelineLocations = oVal(RUN.runData?.timeline || [])
    .sort((a, b) => a.index - b.index)
    .map((l) => l.name);
  const latestLocation = timelineLocations.slice(-1)[0];
  const pokemonLocations = oVal(PokemonLocation).filter(
    (l) => l !== pokemonMoving[0]?.location,
  );

  //----------------------------------#01F2DF
  //- States
  const [location, setLocation]: UseState<string> = React.useState(null);
  const [
    pokemonLocation,
    setPokemonLocation,
  ]: UseState<PokemonLocation> = React.useState(null);
  const [form] = Form.useForm();

  // Set initial values
  React.useEffect(() => {
    form.setFieldsValue({ location: latestLocation });
    setLocation(latestLocation);
  }, []);

  //----------------------------------#01F2DF
  //- Handlers
  const handleLocationChange = setLocation;
  const handlePokemonLocationChange = setPokemonLocation;

  const handleFinish = async () => {
    await form.resetFields();
    if (onFinish) onFinish(location, pokemonLocation);
  };

  const handleCancel = async () => {
    await form.resetFields();
    if (onCancel) onCancel();
  };

  return (
    <Modal
      title={`Move ${pokemonMovingNames}?`}
      footer={null}
      {...{ visible, onCancel }}
    >
      <div className="flex column center">
        <PokemonGroup marginBottom={12}>
          {pokemonMoving.map((p, i) => (
            <PokemonIcon key={i} pokemon={p} />
          ))}
        </PokemonGroup>
      </div>

      <Form form={form} name="movePokemon" onFinish={handleFinish}>
        <Form.Item
          className={styles.item}
          label="At"
          name="location"
          rules={[
            { required: true, message: "Please choose where this happened" },
          ]}
        >
          <Select
            className={styles.select}
            onChange={handleLocationChange}
            value={location}
            placeholder="Select the location of this event"
            showSearch
          >
            {timelineLocations.map((l) => (
              <Option key={l} value={l} className={styles.option}>
                {cleanName(l)}
              </Option>
            ))}
          </Select>
        </Form.Item>

        <Form.Item
          className={styles.item}
          label="to"
          name="pokemonLocation"
          rules={[
            {
              required: true,
              message: "Please choose where your Pokémon was moved to",
            },
          ]}
        >
          <Select
            className={styles.select}
            onChange={handlePokemonLocationChange}
            value={pokemonLocation}
            placeholder="Select new location"
            showSearch
          >
            {pokemonLocations.map((l) => (
              <Option key={l} value={l} className={styles.option}>
                {l}
              </Option>
            ))}
          </Select>
        </Form.Item>

        <Form.Item className={styles.itemButtons}>
          <Button onClick={handleCancel}>Cancel</Button>

          <Button type="primary" htmlType="submit">
            Move
          </Button>
        </Form.Item>
      </Form>
    </Modal>
  );
}

export default MovePokemon;
