import {
  EventType,
  IPokemon,
  PokemonEvent,
  PokemonLocation,
} from "models/db.model";

import { useRunChild } from "./useRun";

export function useBackfillPokemon(playerId: string, originKey: string) {
  const pokemon = useRunChild<IPokemon>(
    `players/${playerId}/pokemon/${originKey}`,
  );

  async function backfillPokemon(pokemonName: string, nickname: string) {
    await pokemon.update({
      playerId,
      origin: originKey,
      name: pokemonName,
      nickname,
    } as IPokemon);

    const isAlive = pokemon.value?.location !== PokemonLocation.grave;
    if (isAlive) {
      const catchEvent: PokemonEvent = {
        index: "0",
        type: EventType.catch,
        location: origin,
      };
      await pokemon.ref?.child("events/0").set(catchEvent);
    }
  }

  return backfillPokemon;
}
