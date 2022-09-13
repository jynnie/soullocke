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
  soulMiss,
}

export const EVENT_NAME_TO_TYPE: Record<string, EventType> = {
  catch: EventType.catch,
  missed: EventType.missed,
  moved: EventType.moved,
  defeated: EventType.defeated,
  soulDeath: EventType.soulDeath,
  evolved: EventType.evolved,
  soulMiss: EventType.soulMiss,
};

type PlaceName = string;

//* Realtime Database-----------------#07cf7f

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

interface IPokemon {
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
  notes?: string;
}

interface Player {
  id: string;
  name: string;
  // Pokemon to locations is 1 to 1
  pokemon: {
    [origin: string]: IPokemon;
  };
}

interface Run {
  id: string;
  password?: string;
  game: string;
  region: string;

  // Only used for when a run is not found
  notFound?: boolean;

  // Arrays are stored as records in rtdb
  timeline: Record<string, Timeline>;
  players: {
    [id: string]: Player;
  };
}

// This isn't used anywhere, but describes the rtdb structure
export interface RealtimeDatabase {
  [id: string]: Run;
}

export type {
  PlaceName,
  IPokemon,
  PokemonEvents,
  PokemonEvent,
  Run,
  Timeline,
  Player,
};
export { PokemonLocation, EventType };
