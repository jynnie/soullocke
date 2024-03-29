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
    if (!playerId || !originKey) return;

    await pokemon.update({
      playerId,
      origin: originKey,
      name: pokemonName || "",
      nickname: nickname || "",
    } as IPokemon);

    const isAlive = pokemon.value?.location !== PokemonLocation.grave;
    if (isAlive) {
      const catchEvent: PokemonEvent = {
        index: "0",
        type: EventType.catch,
        location: originKey,
      };
      await pokemon.ref?.child("events/0").set(catchEvent);
    }
  }

  return backfillPokemon;
}

export function useBackfillPokemons(originKey: string) {
  const players = useRunChild<IPokemon>(`players`);

  async function backfillPokemon(
    playerId: string,
    pokemonName: string,
    nickname: string,
    location: PokemonLocation,
  ) {
    if (!playerId || !originKey) return;

    const pokemon = players?.ref?.child(`${playerId}/pokemon/${originKey}`);
    if (!pokemon) return;

    await pokemon.update({
      playerId,
      origin: originKey,
      name: pokemonName || "",
      nickname: nickname || "",
    } as IPokemon);

    const isAlive = location !== PokemonLocation.grave;
    if (isAlive) {
      const catchEvent: PokemonEvent = {
        index: "0",
        type: EventType.catch,
        location: originKey,
      };
      await pokemon.ref?.child("events/0").set(catchEvent);
    }
  }

  return backfillPokemon;
}
