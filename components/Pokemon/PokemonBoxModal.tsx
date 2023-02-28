import classNames from "classnames";
import PLTag from "components/LocationSummary/PLTag";
import PokemonImage from "components/PokemonImage";
import { Data } from "components/Timeline/Timeline";
import { EditablePokemon } from "components/ui-library/EditablePokemon";
import { EditableText } from "components/ui-library/EditableText";
import { Modal } from "components/ui-library/Modal";
import { useBackfillPokemons } from "hooks/useBackfillPokemon";
import { usePlayersArray } from "hooks/usePlayersArray";
import { PokemonLocation } from "models";
import styles from "styles/Pokemon.module.scss";
import { capitalize, cleanName } from "utils/utils";

export function PokemonBoxModal({
  data,
  showModal,
  onCancel,
}: {
  data: Data;
  showModal: boolean;
  onCancel: () => void;
}) {
  const players = usePlayersArray();
  const backfillPokemon = useBackfillPokemons(data.location.key);
  const pokemons = data.pokemon;

  function handleFinish(
    playerId: string,
    pokemonName: string,
    nickname: string,
    location: PokemonLocation,
  ): void {
    backfillPokemon(playerId, pokemonName, nickname, location);
  }

  return (
    <Modal
      className={styles.modalBgd}
      visible={!!showModal}
      onCancel={onCancel}
    >
      <>
        <div className="flex gap-4 justify-center items-center mb-4">
          {capitalize(cleanName(data.location.name || "?"))}
          <PLTag
            className={styles.modalHeaderTag}
            pokemonLocation={pokemons[0]?.location}
          />
        </div>

        {pokemons.map((pokemon) => (
          <div className={styles.modalHeader} key={pokemon.playerId}>
            <div className={styles.modalHeaderImg}>
              <PokemonImage pokemon={pokemon} />
            </div>

            <div className="flex flex-col gap-1">
              <h4 className="italic">
                {players.find((p) => p.id === pokemon.playerId)?.name}&apos;s
              </h4>

              <EditableText
                display={
                  <h3 className="capitalize">
                    {cleanName(pokemon?.nickname) || "Unspecified Nickname"}
                  </h3>
                }
                value={cleanName(pokemon?.nickname)}
                onChange={(nickname: string) =>
                  handleFinish(
                    pokemon.playerId,
                    pokemon.name,
                    nickname,
                    pokemon.location,
                  )
                }
              />
              <EditablePokemon
                display={
                  <h4 className="pb-2">
                    {cleanName(pokemon?.name) || "Unspecified Pokémon"}
                  </h4>
                }
                value={cleanName(pokemon?.name)}
                onChange={(name?: string) =>
                  name &&
                  handleFinish(
                    pokemon.playerId,
                    name,
                    pokemon?.nickname,
                    pokemon.location,
                  )
                }
              />
            </div>
          </div>
        ))}
      </>
    </Modal>
  );
}
