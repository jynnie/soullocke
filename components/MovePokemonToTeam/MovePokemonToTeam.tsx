import { Button, Modal } from "antd";
import PokemonGroup from "components/PokemonGroup";
import PokemonIcon from "components/PokemonIcon";
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

  const footerButtons = [
    <Button key="cancel" onClick={cancel}>
      Cancel
    </Button>,
    <Button
      key="add"
      disabled={!isNoSwapsNeeded && !isAddable}
      onClick={add}
      type="primary"
    >
      {isNoSwapsNeeded ? "Add" : "Swap"}
    </Button>,
  ];

  return (
    <Modal
      title={`Add ${pokemonToSwitchNames} to your teams?`}
      footer={footerButtons}
      {...{ visible, onCancel }}
    >
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
    </Modal>
  );
}

export default MovePokemonToTeam;
