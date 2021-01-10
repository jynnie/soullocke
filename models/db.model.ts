//------- enums
enum PokemonLocation {
  team = "team",
  box = "box",
  grave = "grave",
  daycare = "daycare",
}

enum EventType {
  catch,
  missed,
  moved,
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
  type: EventType;
  location: PlaceName;
  details?: {
    location?: PokemonLocation;
    evolution?: string;
  }; // Includes details like what evolved into, etc.
}

interface Pokemon {
  playerId: string;
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

interface Player {
  id: string;
  name: string;
  // Pokemon to locations is 1 to 1
  pokemon: {
    [origin: string]: Pokemon;
  };
}

interface Run {
  id: string;
  password?: string;
  game: string;
  region: string;

  timeline: Timeline[];
  players: {
    [id: string]: Player;
  };
}

interface RealtimeDatabase {
  [id: string]: Run;
}

export type {
  PlaceName,
  Pokemon,
  PokemonEvents,
  PokemonEvent,
  Run,
  Timeline,
  Player,
};
export { PokemonLocation, EventType };
