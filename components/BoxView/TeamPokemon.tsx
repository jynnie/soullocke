import { PokemonBoxModal } from "components/Pokemon/PokemonBoxModal";
import PokemonImage from "components/PokemonImage";
import { Data } from "components/Timeline/Timeline";
import React from "react";
import styles from "styles/Box.module.scss";
import { cleanName } from "utils/utils";

export function TeamPokemon({ data }: { data: Data }) {
  const [showModal, setShowModal] = React.useState<boolean>(false);

  const handleOpenModal = () => setShowModal(true);
  const handleCloseModal = () => setShowModal(false);

  return (
    <>
      <PokemonBoxModal
        {...{
          data,
          showModal,
          onCancel: handleCloseModal,
        }}
      />

      <div className={styles.pokemon} onClick={handleOpenModal}>
        <div className="flex-grow">
          <div className="capitalize">{cleanName(data.location.name)}</div>
          <div
            className="text-lg capitalize font-bold truncate"
            style={{ lineHeight: "1.1em", maxWidth: 232 }}
          >
            {cleanName(data.pokemon.map((p) => p.nickname || "?").join(" & "))}
          </div>
        </div>

        <div className={styles.images}>
          {data.pokemon.map((p, i) => (
            <PokemonImage
              key={i}
              pokemon={p}
              width={72}
              marginRight={i !== 0 ? -24 : -32}
              marginTop={i * 20 - 16}
            />
          ))}
        </div>
      </div>
    </>
  );
}
