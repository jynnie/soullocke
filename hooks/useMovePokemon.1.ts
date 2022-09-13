import firebase from "firebase";
import { EventType, PlaceName, Player, PokemonLocation } from "models/db.model";

import { useAddEventToFirebase } from "./useAddEventToFirebase";

export function useMovePokemon(players?: {
  value?: Record<string, Player>;
  update?: (newValue: Record<string, Player>) => Promise<void> | undefined;
  set?: (newValue: Record<string, Player> | null) => Promise<void> | undefined;
  ref?: firebase.database.Reference;
}) {
  const addEventToFirebase = useAddEventToFirebase();

  async function movePokemon(
    pokemonOrigin: PlaceName,
    eventLocation: PlaceName,
    pokemonLocation: PokemonLocation,
  ) {
    if (!players?.ref) return;

    const movingPromises: Promise<void>[] = [];
    for (const player of Object.values(players.value || {})) {
      const pokemonRef = players.ref?.child(
        `${player.id}/pokemon/${pokemonOrigin}`,
      );

      // Update the pokemon's current information
      movingPromises.push(pokemonRef.child("origin").set(pokemonOrigin));
      movingPromises.push(pokemonRef.child("location").set(pokemonLocation));

      // Add events to both pokemon
      movingPromises.push(
        addEventToFirebase(pokemonRef, {
          type: EventType.moved,
          location: eventLocation,
          details: {
            location: pokemonLocation,
          },
        }),
      );
    }

    return await Promise.all(movingPromises);
  }

  return movePokemon;
}
