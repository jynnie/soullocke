import React from "react";
import { cleanName, oVal } from "lib/utils";
import { RunContext } from "pages/run/[id]";
import { Pokemon, PokemonLocation } from "models";

import Event from "./Event";
import AddEvent from "components/AddEvent";
import PokemonImage from "components/PokemonImage";
import PokemonForm from "components/AddPokemon/Form";
import PLTag from "components/LocationSummary/PLTag";
import styles from "styles/Pokemon.module.scss";
import { Modal, Timeline } from "antd";

function PokemonModal({
  pokemon,
  playerId,
  location,
  showModal,
  onCancel,
}: {
  pokemon: Pokemon;
  playerId: string;
  location: string;
  showModal: boolean;
  onCancel: () => void;
}) {
  const { RUN } = React.useContext(RunContext);

  const timelineArr = RUN.getTimelineLocationNames();
  const eventsArr = oVal(pokemon?.events || {}).sort(
    (a, b) => timelineArr.indexOf(a.location) - timelineArr.indexOf(b.location),
  );
  const pokemonIsAlive = pokemon.location !== PokemonLocation.grave;

  const handleFinish = (pokemonName: string, nickname: string): void => {
    RUN.backfillPokemon(pokemonName, nickname, playerId, location);
  };

  return (
    <Modal visible={!!showModal} onCancel={onCancel} footer={null}>
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
      </div>

      {!pokemon.name && (
        <PokemonForm showCaughtCheckbox={false} onFinish={handleFinish} />
      )}

      <Timeline>
        {eventsArr?.map((event, i) => (
          <Event key={i} {...{ event }} />
        ))}
        {pokemonIsAlive && <AddEvent {...{ pokemon }} />}
      </Timeline>
    </Modal>
  );
}

export default PokemonModal;
