import PokemonGroup from "components/PokemonGroup";
import PokemonIcon from "components/PokemonIcon";
import { Button } from "components/ui-library/Button";
import { Modal } from "components/ui-library/Modal";
import { useMovePokemonToTeam } from "hooks/useMovePokemon";
import { PlaceName } from "models";
import React from "react";
import styles from "styles/Pokemon.module.scss";
import { isNullish } from "utils/utils";

/**
 * Prompt for Moving Pokemon to Team
 * If team is full, will also ask for switches.
 */
export function MovePokemonToTeam({
  pokemonOrigin,
  currentLocation,
  visible,
  onCancel,
}: {
  pokemonOrigin: PlaceName;
  currentLocation: PlaceName;
  visible: boolean;
  onCancel?: () => void;
}) {
  const {
    teamGroupedByOrigin,
    teamLength,
    pokemonToSwitchIn,
    isNoSwapsNeeded,
    numSwapsNeeded,
    selectGroup,
    cancel,
    add,
    isAddable,
    pokemonSwappingOut,
  } = useMovePokemonToTeam(pokemonOrigin, currentLocation, onCancel);

  const pokemonToSwitchNames = pokemonToSwitchIn
    ?.map((p) => p?.nickname || "?")
    .join(" & ");

  const loadingRunData = isNullish(teamLength);
  if (loadingRunData) return null;

  return (
    <Modal {...{ visible, onCancel }}>
      <p className="text-lg mt-0">Add {pokemonToSwitchNames} to your teams?</p>

      <div className="flex flex-col center">
        <PokemonGroup marginBottom={12}>
          {pokemonToSwitchIn?.map(
            (p, i) => p && <PokemonIcon key={i} pokemon={p} />,
          )}
        </PokemonGroup>

        {isNoSwapsNeeded && <p>No swaps necessary to add</p>}
        {!isNoSwapsNeeded && (
          <p>Need to swap out {numSwapsNeeded} pair(s) of Pokemon</p>
        )}
        {!isNoSwapsNeeded && (
          <div className={styles.party}>
            {Object.keys(teamGroupedByOrigin).map((o, i) => (
              <PokemonGroup
                actionable
                key={i}
                onClick={() => selectGroup(o)}
                selected={pokemonSwappingOut.includes(o)}
              >
                {teamGroupedByOrigin[o].map((p, j) => (
                  <PokemonIcon key={j} pokemon={p} />
                ))}
              </PokemonGroup>
            ))}
          </div>
        )}
      </div>

      <div className="flex gap-2 justify-end items-center">
        <Button key="cancel" className="outline" onClick={cancel}>
          Cancel
        </Button>
        <Button
          key="add"
          disabled={!isNoSwapsNeeded && !isAddable}
          onClick={add}
        >
          {isNoSwapsNeeded ? "Add" : "Swap"}
        </Button>
      </div>
    </Modal>
  );
}

export default MovePokemonToTeam;
