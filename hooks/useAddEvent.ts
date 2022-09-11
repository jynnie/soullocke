import firebase from "firebase";
import {
  EventType,
  IPokemon,
  PlaceName,
  Player,
  PokemonEvent,
  PokemonLocation,
} from "models/db.model";

import { useRunChild } from "./useRun";

export function useAddEvent(
  actingPlayerId: string,
  actingPokemonOrigin: string,
) {
  const players = useRunChild<Record<string, Player>>("players", {});

  async function addEventToFirebase(
    pokemonRef: firebase.database.Reference,
    event: Omit<PokemonEvent, "index">,
  ) {
    const eventRef = pokemonRef.child("events").push();
    const finalEvent = {
      ...event,
      index: eventRef.key,
    };
    await eventRef.set(finalEvent);
    return event;
  }

  async function movePokemon(
    eventLocation: PlaceName,
    pokemonLocation: PokemonLocation,
  ) {
    if (!players.ref) return;

    for (const player of Object.values(players.value || {})) {
      const pokemonRef = players.ref?.child(
        `${player.id}/pokemon/${actingPokemonOrigin}`,
      );

      // Update the pokemon's current information
      pokemonRef.child("origin").set(actingPokemonOrigin);
      pokemonRef.child("location").set(pokemonLocation);

      // Add events to both pokemon
      addEventToFirebase(pokemonRef, {
        type: EventType.moved,
        location: eventLocation,
        details: {
          location: pokemonLocation,
        },
      });
    }
  }

  async function soulDeath(location: PlaceName, missed?: boolean) {
    if (!players.ref) return;

    for (const player of Object.values(players.value || {})) {
      const isPlayerResponsible = player.id === actingPlayerId;
      console.log(player.id, isPlayerResponsible);
      if (isPlayerResponsible) continue;

      const pokemonRef = players.ref.child(
        `${player.id}/pokemon/${actingPokemonOrigin}`,
      );

      // Update Pokemons information
      pokemonRef.child("origin").set(actingPokemonOrigin);
      pokemonRef.child("location").set(PokemonLocation.grave);

      addEventToFirebase(pokemonRef, {
        type: !!missed ? EventType.soulMiss : EventType.soulDeath,
        location,
        details: {
          location: PokemonLocation.grave,
        },
      });
    }
  }

  async function markAsDefeated(location: PlaceName) {
    if (!players.ref) return;

    // Add the event to the responsible member
    const pokemonRef = players.ref.child(
      `${actingPlayerId}/pokemon/${actingPokemonOrigin}`,
    );
    await addEventToFirebase(pokemonRef, {
      type: EventType.defeated,
      location,
      details: {
        location: PokemonLocation.grave,
      },
    });

    // Move pokemon location
    pokemonRef.child("location").set(PokemonLocation.grave);

    // Mark everyone else as soul deaths
    soulDeath(location);
  }

  async function addEvolution(location: PlaceName, evolution: string) {
    if (!players.ref) return;
    const pokemonRef = players.ref.child(
      `${actingPlayerId}/pokemon/${actingPokemonOrigin}`,
    );

    await addEventToFirebase(pokemonRef, {
      type: EventType.evolved,
      location,
      details: {
        evolution,
      },
    });
  }

  function addEvent(
    type: EventType,
    location: PlaceName,
    details?: PokemonEvent["details"],
  ) {
    if (type === EventType.moved && !!details?.location) {
      return movePokemon(location, details.location);
    } else if (type === EventType.defeated) {
      return markAsDefeated(location);
    } else if (type === EventType.evolved && !!details?.evolution) {
      return addEvolution(location, details.evolution);
    }
  }

  async function addPokemon(
    pokemonName: string,
    nickname: string,
    isCaught: boolean,
  ) {
    if (!players.ref) return;

    const newPokemonRef = players.ref.child(
      `${actingPlayerId}/pokemon/${actingPokemonOrigin}`,
    );

    let pokemon: IPokemon;
    if (isCaught) {
      pokemon = {
        playerId: actingPlayerId,
        origin: actingPokemonOrigin,
        name: pokemonName,
        nickname,
        events: {
          0: {
            index: "0",
            type: EventType.catch,
            location: actingPokemonOrigin,
          },
        },
        location: PokemonLocation.box,
      };
    } else {
      soulDeath(actingPokemonOrigin, true);
      pokemon = {
        playerId: actingPlayerId,
        origin: actingPokemonOrigin,
        name: pokemonName,
        nickname,
        events: {
          0: {
            index: "0",
            type: EventType.missed,
            location: actingPokemonOrigin,
          },
        },
        location: PokemonLocation.grave,
      };
    }
    await newPokemonRef.set(pokemon);
  }

  return { addEvent, addPokemon };
}
