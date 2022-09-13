import { EventType, PokemonEvent } from "models/db.model";

import { useAddEvent } from "./useAddEvent";
import { useRunChild } from "./useRun";

export function useEditEvent(
  playerId: string,
  pokemonOrigin: string,
  eventIndex: string,
) {
  const { addEvent } = useAddEvent(playerId, pokemonOrigin);
  const event = useRunChild(
    `/players/${playerId}/pokemon/${pokemonOrigin}/events/${eventIndex}`,
  );

  function deleteEvent() {
    return event.ref?.set(null);
  }

  async function editEvent(
    type: EventType,
    locationKey: string,
    details?: PokemonEvent["details"],
    isLatestEvent?: boolean,
  ) {
    /**
     * If this is the latest event, we'll change the pokemons' location and
     * other relevant details
     */
    if (isLatestEvent) {
      await event.ref?.set(null);
      return addEvent(type, locationKey, details);
    } else {
      return event.ref?.update({
        type,
        location: locationKey,
        ...(!!details
          ? {
              details: {
                ...(details.evolution ? { evolution: details.evolution } : {}),
                ...(details.location ? { location: details.location } : {}),
              },
            }
          : {}),
      });
    }
  }

  return { editEvent, deleteEvent };
}
