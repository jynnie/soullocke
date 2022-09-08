import { Button, Form, Select } from "antd";
import cn from "classnames";
import { cleanName, oVal } from "lib/utils";
import {
  EventType,
  PlaceName,
  Pokemon,
  PokemonEvent,
  PokemonLocation,
} from "models";
import { RunContext } from "pages/run/[id]";
import React from "react";
import styles from "styles/Form.module.scss";

const { Option } = Select;

function AddEventForm({
  pokemon,
  onFinish,
  onCancel,
}: {
  pokemon: Pokemon;
  onFinish?: (
    eventType: EventType,
    eventLocation: PlaceName,
    eventDetails: PokemonEvent["details"],
  ) => void;
  onCancel?: () => void;
}) {
  const { RUN, allPokemon } = React.useContext(RunContext);

  //* States----------------------------#07cf7f
  const [location, setLocation] = React.useState<string | null>(null);
  const [eventType, setEventType] = React.useState<EventType | null>(null);
  const [pokemonLocation, setPokemonLocation] =
    React.useState<PokemonLocation | null>(null);
  const [evolution, setEvolution] = React.useState<string | null>(null);
  const [form] = Form.useForm();

  //* Handlers--------------------------#07cf7f
  const handleFinish = async () => {
    await form.resetFields();
    if (onFinish)
      onFinish(eventType, location, {
        location: pokemonLocation,
        evolution,
      });
  };

  const handleCancel = async () => {
    await form.resetFields();
    if (onCancel) onCancel();
  };

  //* Options---------------------------#07cf7f
  const eventTypes = ["moved", "defeated", "evolved"];
  const pokemonLocations = oVal(PokemonLocation).filter(
    (l) => l !== pokemon.location,
  );
  const timelineLocations = RUN.allLocations;
  const latestLocation = RUN.getLatestLocation();

  // Set initial values
  React.useEffect(() => {
    form.setFieldsValue({ location: latestLocation });
    setLocation(latestLocation);
  }, []);

  return (
    <Form form={form} name="addPokemonEvent" onFinish={handleFinish}>
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
          {timelineLocations.map((l) => (
            <Option key={l} value={l} className={styles.option}>
              {cleanName(l)}
            </Option>
          ))}
        </Select>
      </Form.Item>

      <Form.Item
        className={styles.item}
        label="We"
        name="eventType"
        rules={[{ required: true, message: "Please choose event type" }]}
      >
        <Select
          className={styles.select}
          onChange={(value) => setEventType(value)}
          value={eventType}
          placeholder="Select an Event Type"
          showSearch
        >
          {eventTypes.map((t) => (
            <Option key={t} value={EventType[t]} className={styles.option}>
              {t}
            </Option>
          ))}
        </Select>
      </Form.Item>

      {eventType === EventType.moved && (
        <Form.Item
          className={styles.item}
          label="to"
          name="pokemonLocation"
          rules={[
            {
              required: eventType === EventType.moved,
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
      )}

      {eventType === EventType.evolved && (
        <Form.Item
          className={styles.item}
          label="into"
          name="evolution"
          rules={[
            {
              required: eventType === EventType.evolved,
              message: "Please choose the evolution",
            },
          ]}
        >
          <Select
            className={styles.select}
            onChange={(value) => setEvolution(value)}
            value={evolution}
            placeholder="Select evolution"
            showSearch
          >
            {allPokemon?.map((p) => (
              <Option key={p.name} value={p.name} className={styles.option}>
                {p.name}
              </Option>
            ))}
          </Select>
        </Form.Item>
      )}

      <Form.Item className={cn(styles.itemButtons, "formButtons")}>
        <Button onClick={handleCancel}>Cancel</Button>

        <Button type="primary" htmlType="submit">
          Add
        </Button>
      </Form.Item>
    </Form>
  );
}

export default AddEventForm;
