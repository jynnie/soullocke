//------- enums
enum PokemonLocation {
  team,
  box,
  grave,
}

enum EventType {
  catch,
  missed,
  boxed,
  defeated,
  soulDeath,
  evolved,
}

type PlaceName = string;

//------- realtime database

interface PokemonEvents {
  [index: string]: PokemonEvent;
}

interface PokemonEvent {
  index: string;
  event: EventType;
  location: PlaceName;
  details?: any; // Includes details like what evolved into, etc.
}

interface Pokemon {
  origin: string;
  name: string;
  nickname: string;
  events: PokemonEvents;
  location: PokemonLocation;
  shiny?: boolean;
}

interface Timeline {
  key: string;
  index: number;
  name: PlaceName;
}

interface Run {
  id: string;
  password?: string;
  game: string;
  region: string;

  timeline: Timeline[];
  players: {
    [id: string]: {
      id: string;
      name: string;
      // Pokemon to locations is 1 to 1
      pokemon: {
        [origin: string]: Pokemon;
      };
    };
  };
}

interface RealtimeDatabase {
  [id: string]: Run;
}

export type { PlaceName, Pokemon, PokemonEvents, PokemonEvent, Run, Timeline };
export { PokemonLocation, EventType };
