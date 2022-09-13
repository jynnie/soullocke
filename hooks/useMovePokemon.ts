import { IPokemon, PlaceName, Player, PokemonLocation } from "models/db.model";
import { useMemo, useState } from "react";

import { useMovePokemon } from "./useMovePokemon.1";
import { usePlayersArray } from "./usePlayersArray";
import { usePokemonByOrigin } from "./usePokemonByOrigin";
import { useRunChild } from "./useRun";

export function useMovePokemonToTeam(
  origin: PlaceName,
  currentLocation: PlaceName,
  onCancel?: () => void,
) {
  const playersArr = usePlayersArray();

  //* Information-----------------------#07cf7f

  const teamsByPlayer = useMemo(() => {
    const teamsByPlayer: Record<string, IPokemon[]> = {};
    for (const player of playersArr) {
      if (!player.id || !player.pokemon) continue;
      const pokemonOnTeam = Object.values(player.pokemon || []).filter(
        (p) => p.location === PokemonLocation.team,
      );
      teamsByPlayer[player.id] = pokemonOnTeam;
    }
    return teamsByPlayer;
  }, [playersArr]);

  const teamGroupedByOrigin = useMemo(() => {
    const allPokemon: IPokemon[] = [];
    for (const team of Object.values(teamsByPlayer || {})) {
      allPokemon.push(...team);
    }

    const result: Record<string, IPokemon[]> = {};
    for (let pokemon of allPokemon) {
      const origin = pokemon.origin;
      if (origin in result) continue;
      result[origin] = allPokemon.filter((p) => p.origin === origin);
    }
    return result;
  }, [teamsByPlayer]);

  const teamLength = useMemo(() => {
    return Object.values(teamsByPlayer)[0]?.length || 0;
  }, [teamsByPlayer]);

  const pokemonToSwitchIn = usePokemonByOrigin(origin);

  const isNoSwapsNeeded = useMemo(() => teamLength < 6, [teamLength]);
  const numSwapsNeeded = useMemo(() => teamLength - 5, [teamLength]);

  //* Handlers--------------------------#07cf7f

  /**
   * The Pokemon of what origin are you swapping out to
   * put the currently selected ones in.
   */
  const players = useRunChild<Record<string, Player>>("players", {});
  const movePokemon = useMovePokemon(players);
  const [swapOut, setSwapOut] = useState<PlaceName[]>([]);

  function selectGroup(origin: PlaceName) {
    let newVal = [...swapOut];
    newVal.push(origin);
    newVal = newVal.slice(-numSwapsNeeded);
    setSwapOut(newVal);
  }

  function handleCancel() {
    setSwapOut([]);
    onCancel?.();
  }

  async function handleAdd() {
    const joiningPromise = movePokemon(
      origin,
      currentLocation,
      PokemonLocation.team,
    );
    const leavingPromises = swapOut.map((o) =>
      movePokemon(o, currentLocation, PokemonLocation.box),
    );
    await Promise.all([joiningPromise, ...leavingPromises]);

    return onCancel?.() || true;
  }

  return {
    teamGroupedByOrigin,
    teamLength,
    pokemonToSwitchIn,
    isNoSwapsNeeded,
    numSwapsNeeded,
    selectGroup,
    cancel: handleCancel,
    add: handleAdd,
    isAddable: swapOut.length === numSwapsNeeded,
    pokemonSwappingOut: swapOut,
  };
}
