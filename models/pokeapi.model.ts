/**
 * Interfaces for PokéApi data
 */
// region/hoenn => locations (locations.name)
// location/hoenn-route-123

interface MapLocation {
  id?: number;
  name: string;
  url: string;
}

interface Region {
  id: number;
  name: string;
  locations: {
    name: string;
    url: string; // api url for location
  }[];
}

interface PokemonListApiData {
  name: string;
  url: string;
}

interface PokemonApiData {
  name: string;
  id: string;
  sprites: {
    front_default: string;
    front_shiny: string;
  };
  types: { type: { name: string } }[];
}

export type { MapLocation, Region, PokemonListApiData, PokemonApiData };
