import classNames from "classnames";
import PokemonGroup from "components/PokemonGroup";
import PokemonIcon from "components/PokemonIcon";
import { Button } from "components/ui-library/Button";
import { Modal } from "components/ui-library/Modal";
import { SearchableSelect } from "components/ui-library/SearchableSelect";
import { usePokemonByOrigin } from "hooks/usePokemonByOrigin";
import { useTimelineLocations } from "hooks/useTimelineLocations";
import { PlaceName, PokemonLocation } from "models";
import React, { useEffect } from "react";
import styles from "styles/Form.module.scss";
import { getLastItem } from "utils/getLastItem";
import { cleanName } from "utils/utils";

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
  const pokemonMoving = usePokemonByOrigin(pokemonOrigin);
  const pokemonMovingNames = pokemonMoving
    ?.map((p) => p?.nickname || "?")
    .join(" & ");
  const timelineLocations = useTimelineLocations();
  const pokemonLocations = Object.values(PokemonLocation).filter(
    (l) => l !== pokemonMoving?.[0]?.location,
  );

  //* States----------------------------#07cf7f
  const [location, setLocation] = React.useState<string>("");
  const [pokemonLocation, setPokemonLocation] = React.useState<
    PokemonLocation | undefined
  >(undefined);

  // WORKAROUND: We set the initial value to the latest location
  // once that data loads. Since we're dependent on the hook, we
  // useEffect to wait for the info.
  useEffect(() => {
    const latestLocation = getLastItem(timelineLocations);
    setLocation(latestLocation?.key);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [timelineLocations.length]);

  //* Handlers--------------------------#07cf7f
  const handleFinish = async () => {
    if (onFinish && pokemonLocation) onFinish(location, pokemonLocation);
  };

  const handleCancel = async () => {
    if (onCancel) onCancel();
  };

  return (
    <Modal {...{ visible, onCancel }}>
      <p className="text-lg mt-0 capitalize">Move {pokemonMovingNames}?</p>

      <div className="flex flex-col center">
        <PokemonGroup marginBottom={12}>
          {pokemonMoving?.map(
            (p, i) => p && <PokemonIcon key={i} pokemon={p} />,
          )}
        </PokemonGroup>
      </div>

      <form className="mt-2" method="dialog">
        <div
          className={classNames(styles.item, "flex gap-2 items-center")}
          // rules={[
          //   { required: true, message: "Please choose where this happened" },
          // ]}
        >
          <label>
            <span className="color-purple">*</span> At
          </label>
          <SearchableSelect
            onChange={(value) => setLocation(value)}
            value={location}
            placeholder="Select the location of this event"
            options={timelineLocations?.map((l) => ({
              label: cleanName(l.name),
              value: l.key,
            }))}
          />
        </div>

        <div
          className={classNames(styles.item, "flex gap-2 items-center")}
          // rules={[
          //   {
          //     required: true,
          //     message: "Please choose where your Pokémon was moved to",
          //   },
          // ]}
        >
          <label>
            <span className="color-purple">*</span> To
          </label>
          <SearchableSelect
            onChange={(value) => setPokemonLocation(value)}
            value={pokemonLocation}
            placeholder="Select new location"
            options={pokemonLocations.map((l) => ({
              label: cleanName(l),
              value: l,
            }))}
          />
        </div>

        <div
          className={classNames(
            "flex items-center justify-end gap-2",
            styles.itemButtons,
          )}
        >
          <Button className="outline" onClick={handleCancel}>
            Cancel
          </Button>
          <Button onClick={handleFinish}>Move</Button>
        </div>
      </form>
    </Modal>
  );
}

export default MovePokemon;
