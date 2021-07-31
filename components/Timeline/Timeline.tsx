import React from "react";
import Box from "ui-box";
import cn from "classnames";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import { RunContext } from "pages/run/[id]";
import { oKey, oVal } from "lib/utils";
import {
    EventType, MapLocation, PlaceName, Player, Pokemon as PokemonData, PokemonLocation,
    Timeline as TL, UseState
} from "models";
import styles from "styles/Timeline.module.scss";
import Pokemon from "components/Pokemon";
import LocationListing from "components/LocationListing";
import LocationSummary from "components/LocationSummary";
import AddToTimeline from "components/AddToTimeline";
import AddPokemon from "components/AddPokemon";
import MovePokemonToTeam from "components/MovePokemonToTeam";
import LocationActions from "components/LocationActions";
import { message } from "antd";

import Row from "./Row";
import Filters, { Filter } from "./Filters";

// Reordering helper function
const reorder = (list: TL[], startIndex, endIndex) => {
  let result = Array.from(list);
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);

  result = result.map((l, i) => ({ ...l, index: i }));

  return result;
};

// Styling draggable things
const getItemStyle = (isDragging, draggableStyle) => ({
  userSelect: "none",
  background: isDragging ? "var(--tertiary)" : "transparent",
  ...draggableStyle,
});

// Create <tr /> classnames for filtering
const getClassNames = (data: Data): string => {
  const classnames = [];

  if (data.location.name.includes("Badge")) classnames.push(styles.badge);
  else classnames.push(styles.location);
  if (data.pokemonLocation) classnames.push(styles[data.pokemonLocation]);

  return classnames.join(" ");
};

function matchesPokemonName(d: Data, filters: Filter): boolean {
  const searchTerm = filters.searchTerm?.toLowerCase();
  return d.pokemonNames?.toLowerCase().includes(searchTerm);
}

function makePokemonNameString(acc: string, p: PokemonData): string {
  if (!p) return acc;
  let newNameString = `${acc} ${p.name} ${p.nickname}`;

  const events = Object.values(p.events || {});
  for (const e of events) {
    if (e?.type === EventType.evolved) {
      const evolution = e.details?.evolution;
      if (evolution) newNameString += ` ${evolution}`;
    }
  }
  return newNameString;
}

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
function TimelineGrid({
  allLocations,
  allBadges,
}: {
  allLocations: MapLocation[];
  allBadges: string[];
}) {
  const { RUN } = React.useContext(RunContext);
  const [addToTeamOrigin, setATTO]: UseState<string> = React.useState(null);
  const [addToTeamLocation, setATTL]: UseState<string> = React.useState(null);
  const [filteredData, setFilteredData]: UseState<Data[]> =
    React.useState(null);
  const [filterClassNames, setFilterClassNames]: UseState<string> =
    React.useState(null);

  //----------------------------------#01F2DF
  // Data
  const timelineArr = RUN.getTimelineLocations();
  const playerArr = RUN.getPlayersArray();
  const allDataArr: Data[] = timelineArr.map((l) => {
    const pokemon = RUN.getPokemonByOrigin(l.name);
    const pokemonNames = pokemon.reduce(makePokemonNameString, "");

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

  const onDragEnd = async (result) => {
    // dropped outside the list
    if (!result.destination) return;

    const items = reorder(
      timelineArr,
      result.source.index,
      result.destination.index,
    );

    const data = await RUN?.setTimelineOrder(items);
    message.success("Timeline order change saved");
    return data;
  };

  const handleFilterChange = (filters: Filter) => {
    const classnames = [];
    oKey(filters).forEach((f) => {
      if (filters[f] && f.includes("hide")) classnames.push(styles[f]);
    });
    if (!!filters.searchTerm) {
      const newFiltered = allDataArr.filter((d) =>
        matchesPokemonName(d, filters),
      );
      setFilteredData(newFiltered);
    } else setFilteredData(null);
    setFilterClassNames(classnames.join(" "));
  };

  //----------------------------------#01F2DF
  return (
    <>
      <Filters onChange={handleFilterChange} />

      <DragDropContext onDragEnd={onDragEnd}>
        <Box is="table" className={styles.table}>
          <thead>
            <tr>
              <th>Location</th>
              {playerArr?.map((p) => (
                <th key={p.id}>{p.name}</th>
              ))}
              <th>Summary</th>
              <th>Actions</th>
            </tr>
          </thead>

          <Droppable droppableId="droppable">
            {(p, i) => (
              <tbody
                {...p.droppableProps}
                ref={p.innerRef}
                key={i}
                className={filterClassNames}
              >
                {allDataArr.map((data, i) => (
                  <Draggable
                    key={data.location.key}
                    draggableId={data.location.key}
                    index={i}
                  >
                    {(p, snapshot) => (
                      <tr
                        key={data.location.key}
                        data-row-key={data.location.key}
                        ref={p.innerRef}
                        {...p.draggableProps}
                        {...p.dragHandleProps}
                        style={getItemStyle(
                          snapshot.isDragging,
                          p.draggableProps.style,
                        )}
                        className={cn(getClassNames(data), {
                          [styles.hide]:
                            !!filteredData &&
                            !filteredData.find(
                              (d) => d.location.key === data.location.key,
                            ),
                        })}
                      >
                        <Row {...{ data, handleFinishAdd, moveToTeam }} />
                      </tr>
                    )}
                  </Draggable>
                ))}
              </tbody>
            )}
          </Droppable>
        </Box>
      </DragDropContext>

      <AddToTimeline {...{ allLocations, allBadges }} />
      <MovePokemonToTeam
        pokemonOrigin={addToTeamOrigin}
        currentLocation={addToTeamLocation}
        visible={!!addToTeamOrigin}
        onCancel={clearMove}
      />
    </>
  );
}

export default TimelineGrid;
