/**
 * Until PokéApi has details about the badges
 * in different regions; we are keeping a
 * hard-coded list of badges and URLs to badge
 * images.
 */
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
  "Galar_Fairy_Badge",
  "Rock_Badge",
  "Ice_Badge",
  "Dark_Badge",
  "Dragon_Badge",
];

const paldea: string[] = [
  "Cortondo_Gym_Badge",
  "Artazon_Gym_Badge",
  "Levincia_Gym_Badge",
  "Cascarrafa_Gym_Badge",
  "Medali_Gym_Badge",
  "Montenevera_Gym_Badge",
  "Alfornada_Gym_Badge",
  "Glaseado_Gym_Badge",
  "Segin_Squad_Badge",
  "Schedar_Squad_Badge",
  "Navi_Squad_Badge",
  "Ruchbah_Squad_Badge",
  "Caph_Squad_Badge",
  "South_Province_Titan_Badge",
  "West_Province_Titan_Badge",
  "East_Province_Titan_Badge",
  "Asado_Desert_Titan_Badge",
  "Casseroya_Lake_Titan_Badge",
];

const images: { [name: string]: string } = {
  Boulder_Badge:
    "https://cdn2.bulbagarden.net/upload/thumb/d/dd/Boulder_Badge.png/50px-Boulder_Badge.png",
  Cascade_Badge:
    "https://cdn2.bulbagarden.net/upload/thumb/9/9c/Cascade_Badge.png/50px-Cascade_Badge.png",
  Thunder_Badge:
    "https://cdn2.bulbagarden.net/upload/thumb/a/a6/Thunder_Badge.png/50px-Thunder_Badge.png",
  Rainbow_Badge:
    "https://cdn2.bulbagarden.net/upload/thumb/b/b5/Rainbow_Badge.png/50px-Rainbow_Badge.png",
  Soul_Badge:
    "https://cdn2.bulbagarden.net/upload/thumb/7/7d/Soul_Badge.png/50px-Soul_Badge.png",
  Marsh_Badge:
    "https://cdn2.bulbagarden.net/upload/thumb/6/6b/Marsh_Badge.png/50px-Marsh_Badge.png",
  Volcano_Badge:
    "https://cdn2.bulbagarden.net/upload/thumb/1/12/Volcano_Badge.png/50px-Volcano_Badge.png",
  Earth_Badge:
    "https://cdn2.bulbagarden.net/upload/thumb/7/78/Earth_Badge.png/50px-Earth_Badge.png",
  Zephyr_Badge:
    "https://cdn2.bulbagarden.net/upload/thumb/4/4a/Zephyr_Badge.png/50px-Zephyr_Badge.png",
  Hive_Badge:
    "https://cdn2.bulbagarden.net/upload/thumb/0/08/Hive_Badge.png/50px-Hive_Badge.png",
  Plain_Badge:
    "https://cdn2.bulbagarden.net/upload/thumb/a/a7/Plain_Badge.png/50px-Plain_Badge.png",
  Fog_Badge:
    "https://cdn2.bulbagarden.net/upload/thumb/4/48/Fog_Badge.png/50px-Fog_Badge.png",
  Storm_Badge:
    "https://cdn2.bulbagarden.net/upload/thumb/b/b9/Storm_Badge.png/50px-Storm_Badge.png",
  Mineral_Badge:
    "https://cdn2.bulbagarden.net/upload/thumb/7/7b/Mineral_Badge.png/50px-Mineral_Badge.png",
  Glacier_Badge:
    "https://cdn2.bulbagarden.net/upload/thumb/e/e6/Glacier_Badge.png/50px-Glacier_Badge.png",
  Rising_Badge:
    "https://cdn2.bulbagarden.net/upload/thumb/5/58/Rising_Badge.png/50px-Rising_Badge.png",
  Stone_Badge:
    "https://cdn2.bulbagarden.net/upload/thumb/6/63/Stone_Badge.png/50px-Stone_Badge.png",
  Knuckle_Badge:
    "https://cdn2.bulbagarden.net/upload/thumb/9/97/Knuckle_Badge.png/50px-Knuckle_Badge.png",
  Dynamo_Badge:
    "https://cdn2.bulbagarden.net/upload/thumb/3/34/Dynamo_Badge.png/50px-Dynamo_Badge.png",
  Heat_Badge:
    "https://cdn2.bulbagarden.net/upload/thumb/c/c4/Heat_Badge.png/50px-Heat_Badge.png",
  Balance_Badge:
    "https://cdn2.bulbagarden.net/upload/thumb/6/63/Balance_Badge.png/50px-Balance_Badge.png",
  Feather_Badge:
    "https://cdn2.bulbagarden.net/upload/thumb/6/62/Feather_Badge.png/50px-Feather_Badge.png",
  Mind_Badge:
    "https://cdn2.bulbagarden.net/upload/thumb/c/cc/Mind_Badge.png/50px-Mind_Badge.png",
  Rain_Badge:
    "https://cdn2.bulbagarden.net/upload/thumb/9/9b/Rain_Badge.png/50px-Rain_Badge.png",
  Coal_Badge:
    "https://cdn2.bulbagarden.net/upload/thumb/0/0b/Coal_Badge.png/50px-Coal_Badge.png",
  Forest_Badge:
    "https://cdn2.bulbagarden.net/upload/thumb/8/8c/Forest_Badge.png/50px-Forest_Badge.png",
  Cobble_Badge:
    "https://cdn2.bulbagarden.net/upload/thumb/2/27/Cobble_Badge.png/50px-Cobble_Badge.png",
  Fen_Badge:
    "https://cdn2.bulbagarden.net/upload/thumb/1/13/Fen_Badge.png/50px-Fen_Badge.png",
  Relic_Badge:
    "https://cdn2.bulbagarden.net/upload/thumb/2/28/Relic_Badge.png/50px-Relic_Badge.png",
  Mine_Badge:
    "https://cdn2.bulbagarden.net/upload/thumb/f/fe/Mine_Badge.png/50px-Mine_Badge.png",
  Icicle_Badge:
    "https://cdn2.bulbagarden.net/upload/thumb/0/09/Icicle_Badge.png/50px-Icicle_Badge.png",
  Beacon_Badge:
    "https://cdn2.bulbagarden.net/upload/thumb/0/0c/Beacon_Badge.png/50px-Beacon_Badge.png",
  Trio_Badge:
    "https://cdn2.bulbagarden.net/upload/thumb/7/74/Trio_Badge.png/50px-Trio_Badge.png",
  Toxic_Badge:
    "https://cdn2.bulbagarden.net/upload/thumb/8/85/Basic_Badge.png/50px-Basic_Badge.png",
  Basic_Badge:
    "https://cdn2.bulbagarden.net/upload/thumb/8/8a/Insect_Badge.png/50px-Insect_Badge.png",
  Insect_Badge:
    "https://cdn2.bulbagarden.net/upload/thumb/8/8a/Insect_Badge.png/50px-Insect_Badge.png",
  Bolt_Badge:
    "https://cdn2.bulbagarden.net/upload/thumb/5/5b/Bolt_Badge.png/50px-Bolt_Badge.png",
  Wave_Badge:
    "https://cdn2.bulbagarden.net/upload/thumb/0/00/Wave_Badge.png/50px-Wave_Badge.png",
  Quake_Badge:
    "https://cdn2.bulbagarden.net/upload/thumb/2/29/Quake_Badge.png/50px-Quake_Badge.png",
  Jet_Badge:
    "https://cdn2.bulbagarden.net/upload/thumb/9/9c/Jet_Badge.png/50px-Jet_Badge.png",
  Freeze_Badge:
    "https://cdn2.bulbagarden.net/upload/thumb/a/ac/Freeze_Badge.png/50px-Freeze_Badge.png",
  Legend_Badge:
    "https://cdn2.bulbagarden.net/upload/thumb/c/c0/Legend_Badge.png/50px-Legend_Badge.png",
  Bug_Badge:
    "https://cdn2.bulbagarden.net/upload/thumb/a/a5/Bug_Badge.png/50px-Bug_Badge.png",
  Cliff_Badge:
    "https://cdn2.bulbagarden.net/upload/thumb/3/39/Cliff_Badge.png/50px-Cliff_Badge.png",
  Rumble_Badge:
    "https://cdn2.bulbagarden.net/upload/thumb/d/d4/Rumble_Badge.png/50px-Rumble_Badge.png",
  Plant_Badge:
    "https://cdn2.bulbagarden.net/upload/thumb/7/7d/Plant_Badge.png/50px-Plant_Badge.png",
  Voltage_Badge:
    "https://cdn2.bulbagarden.net/upload/thumb/f/fc/Voltage_Badge.png/50px-Voltage_Badge.png",
  Fairy_Badge:
    "https://cdn2.bulbagarden.net/upload/thumb/d/d1/Fairy_Badge.png/50px-Fairy_Badge.png",
  Psychic_Badge:
    "https://cdn2.bulbagarden.net/upload/thumb/1/13/Psychic_Badge.png/50px-Psychic_Badge.png",
  Iceberg_Badge:
    "https://cdn2.bulbagarden.net/upload/thumb/8/84/Iceberg_Badge.png/50px-Iceberg_Badge.png",
  Grass_Badge:
    "https://cdn2.bulbagarden.net/upload/thumb/0/00/Grass_Badge.png/50px-Grass_Badge.png",
  Water_Badge:
    "https://cdn2.bulbagarden.net/upload/thumb/7/7a/Water_Badge.png/50px-Water_Badge.png",
  Fire_Badge:
    "https://cdn2.bulbagarden.net/upload/thumb/c/cc/Fire_Badge.png/50px-Fire_Badge.png",
  Fighting_Badge:
    "https://cdn2.bulbagarden.net/upload/thumb/2/20/Fighting_Badge.png/50px-Fighting_Badge.png",
  Ghost_Badge:
    "https://cdn2.bulbagarden.net/upload/thumb/3/30/Ghost_Badge.png/50px-Ghost_Badge.png",
  Galar_Fairy_Badge:
    "https://cdn2.bulbagarden.net/upload/thumb/e/e3/GalarFairy_Badge.png/50px-GalarFairy_Badge.png",
  Rock_Badge:
    "https://cdn2.bulbagarden.net/upload/thumb/3/3e/Rock_Badge.png/50px-Rock_Badge.png",
  Ice_Badge:
    "https://cdn2.bulbagarden.net/upload/thumb/4/43/Ice_Badge.png/50px-Ice_Badge.png",
  Dark_Badge:
    "https://cdn2.bulbagarden.net/upload/thumb/4/4d/Dark_Badge.png/50px-Dark_Badge.png",
  Dragon_Badge:
    "https://cdn2.bulbagarden.net/upload/thumb/2/27/Dragon_Badge.png/50px-Dragon_Badge.png",
  Cortondo_Gym_Badge:
    "https://archives.bulbagarden.net/media/upload/9/95/SVbadge_VictoryRoad_Bug.png",
  Artazon_Gym_Badge:
    "https://archives.bulbagarden.net/media/upload/a/ac/SVbadge_VictoryRoad_Grass.png",
  Levincia_Gym_Badge:
    "https://archives.bulbagarden.net/media/upload/f/ff/SVbadge_VictoryRoad_Electric.png",
  Cascarrafa_Gym_Badge:
    "https://archives.bulbagarden.net/media/upload/4/4f/SVbadge_VictoryRoad_Water.png",
  Medali_Gym_Badge:
    "https://archives.bulbagarden.net/media/upload/d/d6/SVbadge_VictoryRoad_Normal.png",
  Montenevera_Gym_Badge:
    "https://archives.bulbagarden.net/media/upload/4/4c/SVbadge_VictoryRoad_Ghost.png",
  Alfornada_Gym_Badge:
    "https://archives.bulbagarden.net/media/upload/2/2d/SVbadge_VictoryRoad_Psychic.png",
  Glaseado_Gym_Badge:
    "https://archives.bulbagarden.net/media/upload/4/46/SVbadge_VictoryRoad_Ice.png",
  Segin_Squad_Badge:
    "https://archives.bulbagarden.net/media/upload/1/1a/SVbadge_StarfallStreet_Dark.png",
  Schedar_Squad_Badge:
    "https://archives.bulbagarden.net/media/upload/4/46/SVbadge_StarfallStreet_Fire.png",
  Navi_Squad_Badge:
    "https://archives.bulbagarden.net/media/upload/4/4b/SVbadge_StarfallStreet_Poison.png",
  Ruchbah_Squad_Badge:
    "https://archives.bulbagarden.net/media/upload/f/f0/SVbadge_StarfallStreet_Fairy.png",
  Caph_Squad_Badge:
    "https://archives.bulbagarden.net/media/upload/0/03/SVbadge_StarfallStreet_Fighting.png",
  South_Province_Titan_Badge:
    "https://archives.bulbagarden.net/media/upload/3/3d/SVbadge_PathOfLegends_Rock.png",
  West_Province_Titan_Badge:
    "https://archives.bulbagarden.net/media/upload/3/37/SVbadge_PathOfLegends_Flying.png",
  East_Province_Titan_Badge:
    "https://archives.bulbagarden.net/media/upload/1/11/SVbadge_PathOfLegends_Steel.png",
  Asado_Desert_Titan_Badge:
    "https://archives.bulbagarden.net/media/upload/1/11/SVbadge_PathOfLegends_Ground.png",
  Casseroya_Lake_Titan_Badge:
    "https://archives.bulbagarden.net/media/upload/d/dc/SVbadge_PathOfLegends_Dragon.png",
};

export {
  images as badgeImages,
  indigo,
  indigo as kanto,
  johto,
  hoenn,
  sinnoh,
  unova,
  kalos,
  galar,
  paldea,
};

export const BADGES = {
  indigo,
  kanto: indigo,
  johto,
  hoenn,
  sinnoh,
  unova,
  kalos,
  galar,
  paldea,
};
export default BADGES;
