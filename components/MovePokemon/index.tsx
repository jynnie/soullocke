import { Button, Form, Modal, Select } from "antd";
import PokemonGroup from "components/PokemonGroup";
import PokemonIcon from "components/PokemonIcon";
import { useEffectOnce } from "hooks/useEffectOnce";
import { cleanName, oVal } from "lib/utils";
import { PlaceName, PokemonLocation } from "models";
import { RunContext } from "pages/run/[id]";
import React from "react";
import styles from "styles/Form.module.scss";

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

  const pokemonMoving = RUN?.getPokemonByOrigin(pokemonOrigin);
  const pokemonMovingNames = pokemonMoving
    ?.map((p) => p?.nickname || "?")
    .join(" & ");
  const timelineLocations = RUN?.getTimelineLocationNames();
  const latestLocation = RUN?.getLatestLocation();
  const pokemonLocations = oVal(PokemonLocation).filter(
    (l) => l !== pokemonMoving?.[0]?.location,
  );

  //* States----------------------------#07cf7f
  const [location, setLocation] = React.useState<string>("");
  const [pokemonLocation, setPokemonLocation] = React.useState<
    PokemonLocation | undefined
  >(undefined);
  const [form] = Form.useForm();

  // Set initial values
  useEffectOnce(() => {
    form.setFieldsValue({ location: latestLocation });
    setLocation(latestLocation ?? "");
  });

  //* Handlers--------------------------#07cf7f
  const handleFinish = async () => {
    form.resetFields();
    if (onFinish && pokemonLocation) onFinish(location, pokemonLocation);
  };

  const handleCancel = async () => {
    form.resetFields();
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
          {pokemonMoving?.map(
            (p, i) => p && <PokemonIcon key={i} pokemon={p} />,
          )}
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
            onChange={(value) => setLocation(value)}
            value={location}
            placeholder="Select the location of this event"
            showSearch
          >
            {timelineLocations?.map((l) => (
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
            onChange={(value) => setPokemonLocation(value)}
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
