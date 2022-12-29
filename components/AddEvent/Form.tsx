import cn from "classnames";
import { Button } from "components/ui-library/Button";
import { SearchableSelect } from "components/ui-library/SearchableSelect";
import { useTimelineLocations } from "hooks/useTimelineLocations";
import {
  EVENT_NAME_TO_TYPE,
  EventType,
  IPokemon,
  PlaceName,
  PokemonEvent,
  PokemonLocation,
} from "models";
import { RunContext } from "pages/run/[id]";
import React, { useCallback, useEffect } from "react";
import styles from "styles/Form.module.scss";
import { getLastItem } from "utils/getLastItem";
import { cleanName } from "utils/utils";

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
  const { allPokemon } = React.useContext(RunContext);
  const timelineLocations = useTimelineLocations();
  const latestLocation = getLastItem(timelineLocations);

  //* States----------------------------#07cf7f
  const [location, setLocation] = React.useState<string | undefined>(
    latestLocation?.key,
  );
  const [eventType, setEventType] = React.useState<EventType | undefined>(
    undefined,
  );
  const [pokemonLocation, setPokemonLocation] = React.useState<
    PokemonLocation | undefined
  >(undefined);
  const [evolution, setEvolution] = React.useState<string | undefined>(
    undefined,
  );

  const resetFields = useCallback(() => {
    setLocation(latestLocation?.key);
    setEventType(undefined);
    setPokemonLocation(undefined);
    setEvolution(undefined);
  }, [latestLocation?.key]);

  // WORKAROUND: We set the initial value to the latest location
  // once that data loads. Since we're dependent on the hook, we
  // useEffect to wait for the info.
  useEffect(() => {
    setLocation(latestLocation?.key);
  }, [latestLocation?.key]);

  //* Handlers--------------------------#07cf7f
  const handleFinish = async () => {
    resetFields();
    if (eventType && location)
      onFinish?.(eventType, location, {
        location: pokemonLocation,
        evolution,
      });
  };

  const handleCancel = async () => {
    resetFields();
    onCancel?.();
  };

  //* Options---------------------------#07cf7f
  const eventTypes = ["moved", "defeated", "evolved"];
  const pokemonLocations = Object.values(PokemonLocation).filter(
    (l) => l !== pokemon.location,
  );

  return (
    <form className="flex flex-col" name="addPokemonEvent" method="dialog">
      <div
        className={cn(styles.item, "flex gap-2 items-center")}
        // rules={[
        //   { required: true, message: "Please choose where this happened" },
        // ]}
      >
        <label>
          <span className="color-purple">*</span> At:
        </label>
        <SearchableSelect
          className="grow-1"
          onChange={(value) => setLocation(value)}
          value={location}
          placeholder="Select the location of this event"
          options={timelineLocations.map((l) => ({
            value: l.key,
            label: cleanName(l.name),
          }))}
        />
      </div>

      <div
        className={cn(styles.item, "flex gap-2 items-center")}
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
          className={cn(styles.item, "flex gap-2 items-center")}
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
              label: l,
              value: l,
            }))}
          />
        </div>
      )}

      {eventType === EventType.evolved && (
        <div
          className={cn(styles.item, "flex gap-2 items-center")}
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

      <div className={"flex gap-2 justify-end"}>
        <Button onClick={handleCancel}>Cancel</Button>

        <Button onClick={handleFinish}>Add</Button>
      </div>
    </form>
  );
}

export default AddEventForm;
