import firebase from "firebase";
import { PokemonEvent } from "models/db.model";

export function useAddEventToFirebase() {
  async function addEventToFirebase(
    pokemonRef: firebase.database.Reference,
    event: Omit<PokemonEvent, "index">,
  ) {
    const eventRef = pokemonRef.child("events").push();
    const finalEvent = {
      ...event,
      index: eventRef.key,
    };
    return eventRef.set(finalEvent);
  }

  return addEventToFirebase;
}
