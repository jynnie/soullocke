/**
 * Interfaces for PokéApi data
 */
// region/hoenn => locations (locations.name)
// location/hoenn-route-123

interface MapLocation {
  id: number;
  name: string;
}

interface Region {
  id: number;
  name: string;
  locations: {
    name: string;
    url: string; // api url for location
  }[];
}

export type { MapLocation, Region };
