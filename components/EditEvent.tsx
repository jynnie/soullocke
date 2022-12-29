import cn from "classnames";
import { Button } from "components/ui-library/Button";
import { SearchableSelect } from "components/ui-library/SearchableSelect";
import { useTimelineLocations } from "hooks/useTimelineLocations";
import {
  EVENT_NAME_TO_TYPE,
  EventType,
  PokemonEvent,
  PokemonLocation,
} from "models";
import { RunContext } from "pages/run/[id]";
import React from "react";
import styles from "styles/Form.module.scss";
import { getLastItem } from "utils/getLastItem";
import { cleanName } from "utils/utils";

function EditEvent({
  event,
  onFinish,
  onCancel,
  onDelete,
  isLatestEvent,
}: {
  event: PokemonEvent;
  onFinish?: (
    eventType: EventType,
    eventLocationKey: string,
    eventDetails: PokemonEvent["details"],
  ) => void;
  onCancel?: () => void;
  onDelete?: () => void;
  isLatestEvent?: boolean;
}) {
  const { allPokemon } = React.useContext(RunContext);

  const eventTypes = ["moved", "defeated", "evolved"];
  const pokemonLocations = Object.values(PokemonLocation);
  const timelineLocations = useTimelineLocations();
  const latestLocation = getLastItem(timelineLocations);

  //* States----------------------------#07cf7f
  const [locationKey, setLocationKey] = React.useState<string | undefined>(
    event?.location || latestLocation?.key,
  );
  const [eventType, setEventType] = React.useState<EventType | undefined>(
    event?.type,
  );
  const [pokemonLocation, setPokemonLocation] = React.useState<
    PokemonLocation | undefined
  >(event?.details?.location);

  const [evolution, setEvolution] = React.useState<string | undefined>(
    event?.details?.evolution,
  );

  const isDisabled =
    !locationKey ||
    !eventType ||
    (eventType === EventType.evolved && !evolution) ||
    (eventType === EventType.moved && !pokemonLocation);

  //* Handlers--------------------------#07cf7f
  function resetFields() {
    setLocationKey(event?.location || latestLocation?.key);
    setEventType(event?.type);
    setPokemonLocation(event?.details?.location);
    setEvolution(event?.details?.evolution);
  }

  const handleFinish = async () => {
    if (isDisabled) return;
    resetFields();
    if (eventType && locationKey)
      onFinish?.(eventType, locationKey, {
        location: pokemonLocation,
        evolution,
      });
  };

  const handleCancel = async () => {
    resetFields();
    onCancel?.();
  };

  const handleDelete = async () => {
    resetFields();
    onDelete?.();
  };

  return (
    <form
      name="addPokemonEvent"
      className="flex column"
      method="dialog"
      // initialValues={{
      //   location: event?.location || latestLocation?.key,
      //   eventType: event?.type,
      //   pokemonLocation: event?.details?.location,
      //   evolution: event?.details?.evolution,
      // }}
    >
      <div
        className={cn(styles.item, "flex gap-2 alignCenter")}
        // rules={[
        //   { required: true, message: "Please choose where this happened" },
        // ]}
      >
        <label>
          <span className="color-purple">*</span> At:
        </label>
        <SearchableSelect
          className="grow-1"
          onChange={(value) => setLocationKey(value)}
          value={locationKey}
          placeholder="Select the location of this event"
          options={timelineLocations.map((l) => ({
            value: l.key,
            label: cleanName(l.name),
          }))}
        />
      </div>

      <div
        className={cn(styles.item, "flex gap-2 alignCenter")}
        // rules={[{ required: true, message: "Please choose event type" }]}
      >
        <label>
          <span className="color-purple">*</span> We:
        </label>
        <SearchableSelect
          className="grow-1"
          onChange={(value) => setEventType(value)}
          value={eventType}
          placeholder="Select an Event Type"
          options={eventTypes.map((t) => ({
            value: EVENT_NAME_TO_TYPE[t],
            label: t,
          }))}
        />
      </div>

      {eventType === EventType.moved && (
        <div
          className={cn(styles.item, "flex gap-2 alignCenter")}
          // rules={[
          //   {
          //     required: eventType === EventType.moved,
          //     message: "Please choose where your Pokémon was moved to",
          //   },
          // ]}
        >
          <label>
            <span className="color-purple">*</span> To:
          </label>
          <SearchableSelect
            className="grow-1"
            onChange={(value) => setPokemonLocation(value)}
            value={pokemonLocation}
            placeholder="Select new location"
            options={pokemonLocations.map((l) => ({
              value: l,
              label: l,
            }))}
          />
        </div>
      )}

      {eventType === EventType.evolved && (
        <div
          className={cn(styles.item, "flex gap-2 alignCenter")}
          // rules={[
          //   {
          //     required: eventType === EventType.evolved,
          //     message: "Please choose the evolution",
          //   },
          // ]}
        >
          <label>
            <span className="color-purple">*</span> Into:
          </label>
          <SearchableSelect
            className="grow-1"
            onChange={(value) => setEvolution(value)}
            value={evolution}
            placeholder="Select evolution"
            options={allPokemon?.map((p) => ({
              label: p.name,
              value: p.name,
            }))}
          />
        </div>
      )}

      <p className="caption">
        *Warning: Editing or deleting this event does not affect events of
        linked Pokémon.{" "}
        {!isLatestEvent &&
          "Nor will it automatically update current Pokémon location."}
      </p>

      <div className={"flex gap-2 justifyEnd"}>
        <Button className="outline" onClick={handleCancel}>
          Cancel
        </Button>

        <Button className="outline danger" onClick={handleDelete}>
          Delete
        </Button>

        <Button disabled={isDisabled} onClick={handleFinish}>
          Save
        </Button>
      </div>
    </form>
  );
}

export default EditEvent;
