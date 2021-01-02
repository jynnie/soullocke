//------- enums
enum PokemonLocation {
  team,
  box,
  grave,
}

enum PokemonEvent {
  catch,
  missed,
  boxed,
  defeated,
  soulDeath,
}

type PlaceName = string;

//------- realtime database
interface Event {
  where: PlaceName;
  what: PokemonEvent;
}

interface Pokemon {
  id: string;
  nickname: string;
  // origin: PlaceName;
  events: Event[];
  location: PokemonLocation;
}

interface Run {
  id: string;
  password: string;
  game: string;
  region: string;

  timeline: PlaceName[];
  players: {
    [id: string]: {
      name: string;
      [index: number]: Pokemon;
    };
  };
}

interface RealtimeDatabase {
  [id: string]: Run;
}

//------- firestore mockup
interface PlayerCollection {
  name: string;
  pokemon: Pokemon[];
}

interface RunCollection {
  id: string;
  password: string;
  game: string;
  region: string;

  timeline: PlaceName[];
  players: PlayerCollection;
}

export type { PlaceName, Event, Pokemon, Run };
export { PokemonLocation, PokemonEvent };
