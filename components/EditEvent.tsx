import { Button, Form, Select } from "antd";
import cn from "classnames";
import { cleanName, oVal } from "lib/utils";
import {
  EventType,
  PlaceName,
  PokemonEvent,
  PokemonLocation,
  UseState,
} from "models";
import { RunContext } from "pages/run/[id]";
import React from "react";
import styles from "styles/Form.module.scss";

const { Option } = Select;

function EditEvent({
  event,
  onFinish,
  onCancel,
  onDelete,
}: {
  event: PokemonEvent;
  onFinish?: (
    eventType: EventType,
    eventLocation: PlaceName,
    eventDetails: PokemonEvent["details"],
  ) => void;
  onCancel?: () => void;
  onDelete?: () => void;
}) {
  const { RUN, allPokemon } = React.useContext(RunContext);

  //----------------------------------#01F2DF
  //- States
  const [location, setLocation]: UseState<string> = React.useState(
    event?.location,
  );
  const [eventType, setEventType]: UseState<number> = React.useState(
    event?.type,
  );
  const [pokemonLocation, setPokemonLocation]: UseState<PokemonLocation> =
    React.useState(event?.details?.location || null);
  const [evolution, setEvolution]: UseState<string> = React.useState(
    event?.details?.evolution || null,
  );
  // FIXME: Just use the form API hook instead of duplicating states
  const [form] = Form.useForm();

  //----------------------------------#01F2DF
  //- Handlers
  const handleEventTypeChange = setEventType;
  const handleLocationChange = setLocation;
  const handlePokemonLocationChange = setPokemonLocation;
  const handleEvolutionChange = setEvolution;

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

  const handleDelete = async () => {
    await form.resetFields();
    if (onDelete) onDelete();
  };

  //----------------------------------#01F2DF
  //- Options
  const eventTypes = ["moved", "defeated", "evolved"];
  const pokemonLocations = oVal(PokemonLocation);
  const timelineLocations = RUN.allLocations;
  const latestLocation = RUN.getLatestLocation();

  return (
    <Form
      form={form}
      name="addPokemonEvent"
      onFinish={handleFinish}
      initialValues={{
        location: event?.location || latestLocation,
        eventType: event?.type,
        pokemonLocation: event?.details?.location,
        evolution: event?.details?.evolution,
      }}
    >
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
        label="We"
        name="eventType"
        rules={[{ required: true, message: "Please choose event type" }]}
      >
        <Select
          className={styles.select}
          onChange={handleEventTypeChange}
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
            onChange={handleEvolutionChange}
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

      <p className="caption">
        *Warning: Editing or deleting this event does not affect events of
        linked Pokémon. Nor will it automatically update current Pokémon
        location or name.
      </p>

      <Form.Item className={cn(styles.itemButtons, "formButtons")}>
        <Button onClick={handleCancel}>Cancel</Button>

        <Button danger onClick={handleDelete} htmlType="button">
          Delete
        </Button>

        <Button type="primary" htmlType="submit">
          Save
        </Button>
      </Form.Item>
    </Form>
  );
}

export default EditEvent;
