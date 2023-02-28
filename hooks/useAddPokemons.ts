import { EventType, IPokemon, Player, PokemonLocation } from "models";

import { useAddNewLocation } from "./useAddNewLocation";
import { useRunChild } from "./useRun";

/**
 * Adds newly caught Pokemon to the box
 * Used in BoxView
 */
export function useAddPokemonAndLocation() {
  const addLocation = useAddNewLocation();

  const players = useRunChild<Record<string, Player>>("players", {});

  async function addPokemon(
    newLocation: string,
    playerIds: string[],
    pokemonNames: string[],
    nicknames: string[],
  ) {
    if (!players.ref) return;

    const originKey = await addLocation(newLocation);
    if (!originKey) return;

    for (let i = 0; i < playerIds.length; i++) {
      const playerId = playerIds[i];
      const pokemonName = pokemonNames[i];
      const nickname = nicknames[i];

      const newPokemonRef = players.ref.child(
        `${playerId}/pokemon/${originKey}`,
      );

      if (!newPokemonRef) continue;

      let pokemon: IPokemon;
      pokemon = {
        playerId: playerId,
        origin: originKey,
        name: pokemonName,
        nickname: nickname || pokemonName,
        events: {
          0: {
            index: "0",
            type: EventType.catch,
            location: originKey,
          },
        },
        location: PokemonLocation.box,
      };

      await newPokemonRef.set(pokemon);
    }
  }

  return addPokemon;
}
