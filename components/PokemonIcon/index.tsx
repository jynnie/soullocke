import { BadgeProps } from "antd/lib/badge";
import { PokemonIcon } from "./PokemonIcon";

export const BADGE_COLOR: {
  [key: string]: BadgeProps["status"];
} = {
  team: "processing",
  box: "success",
  grave: "default",
  daycare: "warning",
};

export default PokemonIcon;
