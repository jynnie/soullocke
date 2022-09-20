import { Modal, Timeline } from "antd";
import cn from "classnames";
import AddEvent from "components/AddEvent";
import PokemonForm from "components/AddPokemon/Form";
import PLTag from "components/LocationSummary/PLTag";
import PokemonImage from "components/PokemonImage";
import { Button } from "components/ui-library/Button";
import { useBackfillPokemon } from "hooks/useBackfillPokemon";
import { useTimelineLocations } from "hooks/useTimelineLocations";
import { IPokemon, PokemonLocation } from "models";
import React from "react";
import { Edit } from "react-feather";
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
  const [editPokemon, setEditPokemon] = React.useState<boolean>(false);
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

  const handleCancelEditing = () => {
    setEditPokemon(false);
  };

  const handleFinish = (pokemonName: string, nickname: string): void => {
    backfillPokemon(pokemonName, nickname);
    if (editPokemon) setEditPokemon(false);
  };

  return (
    <Modal visible={!!showModal} onCancel={onCancel} footer={null}>
      {!editPokemon && (
        <div className={styles.modalHeader}>
          <PokemonImage className={styles.modalHeaderImg} pokemon={pokemon} />
          <h3>{cleanName(pokemon?.nickname)}</h3>
          <div className="flex center">
            <PLTag
              className={styles.modalHeaderTag}
              pokemonLocation={pokemon?.location}
            />
            <h4>{cleanName(pokemon?.name)}</h4>
          </div>

          <Button
            className={cn("icon", styles.modalHeaderEdit)}
            onClick={() => setEditPokemon(!editPokemon)}
            icon={<Edit />}
          />
        </div>
      )}

      {(!pokemon.name || editPokemon) && (
        <PokemonForm
          showCaughtCheckbox={false}
          onCancel={editPokemon ? handleCancelEditing : undefined}
          onFinish={handleFinish}
          finishText={editPokemon ? "Save" : "Add"}
          defaultValues={{
            pokemon: pokemon?.name,
            nickname: pokemon?.nickname,
          }}
        />
      )}

      <Timeline>
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
      </Timeline>
    </Modal>
  );
}

export default PokemonModal;
