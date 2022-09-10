import { Button, Form, Select } from "antd";
import cn from "classnames";
import { useEffectOnce } from "hooks/useEffectOnce";
import {
  EVENT_NAME_TO_TYPE,
  EventType,
  IPokemon,
  PlaceName,
  PokemonEvent,
  PokemonLocation,
} from "models";
import { RunContext } from "pages/run/[id]";
import React from "react";
import styles from "styles/Form.module.scss";
import { cleanName, oVal } from "utils/utils";

const { Option } = Select;

function AddEventForm({
  pokemon,
  onFinish,
  onCancel,
}: {
  pokemon: IPokemon;
  onFinish?: (
    eventType: EventType,
    eventLocation: PlaceName,
    eventDetails: PokemonEvent["details"],
  ) => void;
  onCancel?: () => void;
}) {
  const { RUN, allPokemon } = React.useContext(RunContext);

  //* States----------------------------#07cf7f
  const [location, setLocation] = React.useState<string | undefined>(undefined);
  const [eventType, setEventType] = React.useState<EventType | undefined>(
    undefined,
  );
  const [pokemonLocation, setPokemonLocation] = React.useState<
    PokemonLocation | undefined
  >(undefined);
  const [evolution, setEvolution] = React.useState<string | undefined>(
    undefined,
  );
  const [form] = Form.useForm();

  //* Handlers--------------------------#07cf7f
  const handleFinish = async () => {
    form.resetFields();
    if (onFinish && eventType && location)
      onFinish(eventType, location, {
        location: pokemonLocation,
        evolution,
      });
  };

  const handleCancel = async () => {
    form.resetFields();
    if (onCancel) onCancel();
  };

  //* Options---------------------------#07cf7f
  const eventTypes = ["moved", "defeated", "evolved"];
  const pokemonLocations = oVal(PokemonLocation).filter(
    (l) => l !== pokemon.location,
  );
  const timelineLocations = RUN?.allLocations || [];

  // FIXME: Use initialValues instead
  // Set initial values
  useEffectOnce(() => {
    const latestLocation = RUN?.getLatestLocation();
    form.setFieldsValue({ location: latestLocation });
    setLocation(latestLocation);
  });

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
            <Option
              key={t}
              value={EVENT_NAME_TO_TYPE[t]}
              className={styles.option}
            >
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
