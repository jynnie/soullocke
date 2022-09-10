import { Button, Modal } from "antd";
import PokemonGroup from "components/PokemonGroup";
import PokemonIcon from "components/PokemonIcon";
import { IPokemon, PlaceName } from "models";
import { RunContext } from "pages/run/[id]";
import React from "react";
import styles from "styles/Pokemon.module.scss";
import { isNullish, oKey, oVal } from "utils/utils";

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
  const { RUN } = React.useContext(RunContext);

  // Information Getters
  const teamsByPlayer = RUN?.getPokemonOnTeam() || {};
  const teamLength = oVal(teamsByPlayer)[0]?.length;
  const noSwapsNeeded = teamLength < 6;
  const numSwapsNeeded = teamLength - 5;
  const pokemonToSwitchIn = RUN?.DEPRECATED_getPokemonByOrigin(pokemonOrigin);
  const pokemonToSwitchNames = pokemonToSwitchIn
    ?.map((p) => p?.nickname || "?")
    .join(" & ");
  const teamArr: IPokemon[] = oVal(teamsByPlayer).reduce(
    (acc, ps) => acc.concat(...ps),
    [],
  );
  const teamGroupedByOrigin = RUN?.groupByOrigin(teamArr) || {};

  // Handlers for actually swapping
  const [swapOut, setSwapOut] = React.useState<PlaceName[]>([]);
  const selectGroup = (origin: PlaceName) => {
    let newVal = [...swapOut];
    newVal.push(origin);
    newVal = newVal.slice(-numSwapsNeeded);
    setSwapOut(newVal);
  };
  const handleCancel = () => {
    setSwapOut([]);
    if (onCancel) onCancel();
  };
  const handleAdd = async () => {
    await RUN?.swapPokemonOnTeam(pokemonOrigin, swapOut, currentLocation);
    if (onCancel) return onCancel();
    return true;
  };

  // Loading stuff
  const loadingRunData = isNullish(teamLength);
  if (loadingRunData) return null;

  const footerButtons = [
    <Button key="cancel" onClick={handleCancel}>
      Cancel
    </Button>,
    <Button
      key="add"
      disabled={!noSwapsNeeded && swapOut.length !== numSwapsNeeded}
      onClick={handleAdd}
      type="primary"
    >
      {noSwapsNeeded ? "Add" : "Swap"}
    </Button>,
  ];

  return (
    <Modal
      title={`Add ${pokemonToSwitchNames} to your teams?`}
      footer={footerButtons}
      {...{ visible, onCancel }}
    >
      <div className="flex column center">
        <PokemonGroup marginBottom={12}>
          {pokemonToSwitchIn?.map(
            (p, i) => p && <PokemonIcon key={i} pokemon={p} />,
          )}
        </PokemonGroup>

        {noSwapsNeeded && <p>No swaps necessary to add</p>}
        {!noSwapsNeeded && (
          <p>Need to swap out {numSwapsNeeded} pair(s) of Pokemon</p>
        )}
        {!noSwapsNeeded && (
          <div className={styles.party}>
            {oKey(teamGroupedByOrigin).map((o, i) => (
              <PokemonGroup
                actionable
                key={i}
                onClick={() => selectGroup(o)}
                selected={swapOut.includes(o)}
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
