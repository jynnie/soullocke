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
interface Pokemon {
  origin: string;
  name: string;
  nickname: string;
  events: {
    [timelineLocation: string]: PokemonEvent;
  };
  location: PokemonLocation;
  shiny?: boolean;
}

interface Run {
  id: string;
  password?: string;
  game: string;
  region: string;

  timeline: PlaceName[];
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

export type { PlaceName, Pokemon, Run };
export { PokemonLocation, PokemonEvent };
