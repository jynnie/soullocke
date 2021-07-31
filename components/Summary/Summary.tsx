import React from "react";
import Box from "ui-box";
import cn from "classnames";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import { RunContext } from "pages/run/[id]";
import { oKey, oVal } from "lib/utils";
import type {
  Player,
  MapLocation,
  UseState,
  PlaceName,
  Timeline as TL,
  PokemonLocation,
  Pokemon as PokemonData,
  Timeline,
} from "models";

import styles from "styles/Summary.module.scss";
import Pokemon from "components/Pokemon";
import LocationListing from "components/LocationListing";
import LocationSummary from "components/LocationSummary";
import AddToTimeline from "components/AddToTimeline";
import AddPokemon from "components/AddPokemon";
import MovePokemonToTeam from "components/MovePokemonToTeam";
import LocationActions from "components/LocationActions";
import { Badge, message } from "antd";
import { badgeImages } from "lib/badges";

export interface Data {
  location: TL;
  players: Player[];
  pokemon: PokemonData[];
  pokemonNames: string;
  pokemonLocation: PokemonLocation;
  notes: string;
}

/**
 * Timeline Grid
 */
function Summary({ allBadges }: { allBadges: string[] }) {
  const { RUN } = React.useContext(RunContext);
  const [addToTeamOrigin, setATTO]: UseState<string> = React.useState(null);
  const [addToTeamLocation, setATTL]: UseState<string> = React.useState(null);
  const [filteredData, setFilteredData]: UseState<Data[]> = React.useState(
    null,
  );
  const [
    filterClassNames,
    setFilterClassNames,
  ]: UseState<string> = React.useState(null);

  //----------------------------------#01F2DF
  // Data
  const timelineArr = RUN.getTimelineLocations();
  const playerArr = RUN.getPlayersArray();
  const earnedBadges = RUN.getEarnedBadges();
  const allDataArr: Data[] = timelineArr.map((l) => {
    const pokemon = RUN.getPokemonByOrigin(l.name);
    const pokemonNames = pokemon.reduce(
      (acc, p) => (!!p ? `${acc} ${p.name} ${p.nickname}` : acc),
      "",
    );

    return {
      location: l,
      players: playerArr,
      pokemon,
      pokemonNames,
      pokemonLocation: RUN.getPokemonLocationByOrigin(l.name),
      notes: RUN.getLocationNotes(l.name),
    };
  });

  //----------------------------------#01F2DF
  // Handlers
  const moveToTeam = (origin: string, location: string) => {
    setATTO(origin);
    setATTL(location);
  };

  const clearMove = () => {
    setATTO(null);
    setATTL(null);
  };

  const handleFinishAdd = (location: PlaceName) => {
    return (caught: boolean) => {
      const allPokemonSet = RUN.haveAllPlayersGotPokemonAt(location);
      if (caught && allPokemonSet) {
        moveToTeam(location, location);
      }
    };
  };

  console.log(earnedBadges);

  //----------------------------------#01F2DF
  return (
    <div className={styles.container}>
      <div className={styles.badgeBox}>
        {allBadges.map((badge) => (
          <img
            className={cn({ [styles.earned]: earnedBadges.includes(badge) })}
            src={`https://nuzlocke-generator.herokuapp.com/img/checkpoints/${badge
              .replaceAll("_", "-")
              .toLowerCase()}.png`}
            alt={badge}
          />
        ))}
      </div>
    </div>
  );
}

export default Summary;
