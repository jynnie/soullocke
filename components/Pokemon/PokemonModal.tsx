import AddEvent from "components/AddEvent";
import PLTag from "components/LocationSummary/PLTag";
import PokemonImage from "components/PokemonImage";
import { Button } from "components/ui-library/Button";
import { Modal } from "components/ui-library/Modal";
import { SearchableSelect } from "components/ui-library/SearchableSelect";
import { useBackfillPokemon } from "hooks/useBackfillPokemon";
import { useTimelineLocations } from "hooks/useTimelineLocations";
import { IPokemon, PokemonLocation } from "models";
import { RunContext } from "pages/run/[id]";
import React, { useState } from "react";
import { Check, X } from "react-feather";
import styles from "styles/Pokemon.module.scss";
import { cleanName } from "utils/utils";

import Event from "./TimelineEvent";

function PokemonModal({
  pokemon,
  playerId,
  location,
  showModal,
  onCancel,
}: {
  pokemon: IPokemon;
  playerId: string;
  location: string;
  showModal: boolean;
  onCancel: () => void;
}) {
  const backfillPokemon = useBackfillPokemon(playerId, location);

  const tlLocations = useTimelineLocations();
  const tlLocationKeys = tlLocations.map((l) => l.key);
  const eventsArr = Object.values(pokemon?.events || {})
    .filter((e) => tlLocationKeys.includes(e.location))
    .sort(
      (a, b) =>
        tlLocationKeys.indexOf(a.location) - tlLocationKeys.indexOf(b.location),
    )
    // Map the keys into names of the locations
    .map((e) => ({
      ...e,
      locationName: tlLocations.find((t) => t.key === e.location)?.name,
    }));

  const isAlive = pokemon.location !== PokemonLocation.grave;

  const handleFinish = (pokemonName: string, nickname: string): void => {
    backfillPokemon(pokemonName, nickname);
  };

  return (
    <Modal
      className={styles.modalBgd}
      visible={!!showModal}
      onCancel={onCancel}
    >
      <div className={styles.modalHeader}>
        <PokemonImage className={styles.modalHeaderImg} pokemon={pokemon} />

        <div className="flex flex-col gap-1">
          <PLTag
            className={styles.modalHeaderTag}
            pokemonLocation={pokemon?.location}
          />
          <EditableText
            display={
              <h3 className="capitalize">{cleanName(pokemon?.nickname)}</h3>
            }
            value={cleanName(pokemon?.nickname)}
            onChange={(name: string) => handleFinish(pokemon.name, name)}
          />
          <EditablePokemon
            display={<h4 className="pb-2">{cleanName(pokemon?.name)}</h4>}
            value={cleanName(pokemon?.name)}
            onChange={(name?: string) =>
              name && handleFinish(name, pokemon?.nickname)
            }
          />
        </div>
      </div>

      <div className="mx-4" style={{ maxWidth: 480 }}>
        {eventsArr?.map((event, i) => (
          <Event
            key={i}
            {...{
              event,
              pokemon,
              playerId,
              isLatestEvent: i === eventsArr.length - 1,
            }}
          />
        ))}
        {isAlive && <AddEvent {...{ pokemon }} />}
      </div>
    </Modal>
  );
}

export default PokemonModal;

function EditableText({
  display,
  value,
  onChange,
}: {
  display: JSX.Element;
  value?: string;
  onChange: (text: string) => void;
}) {
  const [editValue, setEditValue] = useState<string>(value ?? "");
  const [isEditing, setIsEditing] = useState(false);

  if (!isEditing)
    return <span onDoubleClick={() => setIsEditing(true)}>{display}</span>;
  return (
    <div className="flex gap-1">
      <input
        type="text"
        value={editValue}
        onChange={(evt) => setEditValue(evt.target.value)}
      />
      <Button
        icon={<Check />}
        className="text icon"
        onClick={() => {
          onChange?.(editValue);
          setIsEditing(false);
        }}
      />
    </div>
  );
}

function EditablePokemon({
  display,
  value,
  onChange,
}: {
  display: JSX.Element;
  value?: string;
  onChange: (val?: string) => void;
}) {
  const { allPokemon } = React.useContext(RunContext);

  const [isEditing, setIsEditing] = useState(false);
  const [editValue, setEditValue] = React.useState<string | undefined>(value);
  const handlePokemonChange = (value: string) => setEditValue(value);

  if (!isEditing)
    return <span onDoubleClick={() => setIsEditing(true)}>{display}</span>;
  return (
    <div className="flex gap-1">
      <SearchableSelect
        onChange={handlePokemonChange}
        value={editValue}
        placeholder="Select a Pokémon"
        options={allPokemon.map((p) => ({ value: p.name, label: p.name }))}
      />
      <Button
        icon={<X />}
        className="text icon"
        onClick={() => {
          setEditValue(value);
          setIsEditing(false);
        }}
      />
      <Button
        icon={<Check />}
        className="text icon"
        onClick={() => {
          onChange?.(editValue);
          setIsEditing(false);
        }}
      />
    </div>
  );
}
