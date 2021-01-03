/**
 * Until PokéApi has details about the badges
 * in different regions; we are keeping a
 * hard-coded list of badges and URLs to badge
 * images.
 */

// https://static.wikia.nocookie.net/pokemon/images/f/f0/Stonebadge.png
// https://cdn.bulbagarden.net/upload/6/63/Stone_Badge.png
const indigo: string[] = [
  "Boulder_Badge",
  "Cascade_Badge",
  "Thunder_Badge",
  "Rainbow_Badge",
  "Soul_Badge",
  "Marsh_Badge",
  "Volcano_Badge",
  "Earth_Badge",
];

const johto: string[] = [
  "Zephyr_Badge",
  "Hive_Badge",
  "Plain_Badge",
  "Fog_Badge",
  "Storm_Badge",
  "Mineral_Badge",
  "Glacier_Badge",
  "Rising_Badge",
];

const hoenn: string[] = [
  "Stone_Badge",
  "Knuckle_Badge",
  "Dynamo_Badge",
  "Heat_Badge",
  "Balance_Badge",
  "Feather_Badge",
  "Mind_Badge",
  "Rain_Badge",
];

const sinnoh: string[] = [
  "Coal_Badge",
  "Forest_Badge",
  "Cobble_Badge",
  "Fen_Badge",
  "Relic_Badge",
  "Mine_Badge",
  "Icicle_Badge",
  "Beacon_Badge",
];

const unova: string[] = [
  "Trio_Badge",
  "Toxic_Badge",
  "Basic_Badge",
  "Insect_Badge",
  "Insect_Badge",
  "Bolt_Badge",
  "Wave_Badge",
  "Quake_Badge",
  "Jet_Badge",
  "Freeze_Badge",
  "Legend_Badge",
];

const kalos: string[] = [
  "Bug_Badge",
  "Cliff_Badge",
  "Rumble_Badge",
  "Plant_Badge",
  "Voltage_Badge",
  "Fairy_Badge",
  "Psychic_Badge",
  "Iceberg_Badge",
];

const galar: string[] = [
  "Grass_Badge",
  "Water_Badge",
  "Fire_Badge",
  "Fighting_Badge",
  "Ghost_Badge",
  "Fairy_Badge",
  "Rock_Badge",
  "Ice_Badge",
  "Dark_Badge",
  "Dragon_Badge",
];

export { indigo, johto, hoenn, kalos, galar };
export default { indigo, johto, hoenn, kalos, galar };
