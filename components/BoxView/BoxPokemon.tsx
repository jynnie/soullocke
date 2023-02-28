import { PokemonBoxModal } from "components/Pokemon/PokemonBoxModal";
import PokemonImage from "components/PokemonImage";
import { Data } from "components/Timeline/Timeline";
import { TooltipContent } from "components/ui-library/TooltipContent";
import React from "react";
import styles from "styles/Box.module.scss";

import Tippy from "@tippyjs/react";

export function BoxPokemon({ data }: { data: Data }) {
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
        <Tippy
          content={
            <TooltipContent className="capitalize">
              {data.pokemon.map((p) => p.nickname || "?").join(" & ")}
            </TooltipContent>
          }
          delay={[500, 0]}
        >
          <div className={styles.images}>
            {data.pokemon.map((p, i) => (
              <PokemonImage
                key={i}
                pokemon={p}
                width={48}
                marginLeft={i * -16}
                marginTop={i * 16 - 12}
              />
            ))}
          </div>
        </Tippy>
      </div>
    </>
  );
}
