import AddEvent from "components/AddEvent";
import PLTag from "components/LocationSummary/PLTag";
import PokemonImage from "components/PokemonImage";
import { Modal } from "components/ui-library/Modal";
import { useBackfillPokemon } from "hooks/useBackfillPokemon";
import { useTimelineLocations } from "hooks/useTimelineLocations";
import { IPokemon, PokemonLocation } from "models";
import React from "react";
import styles from "styles/Pokemon.module.scss";
import { cleanName } from "utils/utils";

import { EditablePokemon } from "../ui-library/EditablePokemon";
import { EditableText } from "../ui-library/EditableText";
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
