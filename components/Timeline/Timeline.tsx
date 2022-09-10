import { message } from "antd";
import cn from "classnames";
import AddToTimeline from "components/AddToTimeline";
import MovePokemonToTeam from "components/MovePokemonToTeam";
import { oKey, oVal } from "lib/utils";
import {
  EventType,
  MapLocation,
  PlaceName,
  Player,
  Pokemon as PokemonData,
  PokemonLocation,
  Timeline as TL,
} from "models";
import { RunContext } from "pages/run/[id]";
import React from "react";
import {
  DragDropContext,
  Draggable,
  DraggableProvidedDraggableProps,
  DropResult,
  Droppable,
} from "react-beautiful-dnd";
import styles from "styles/Timeline.module.scss";
import Box from "ui-box";

import Filters, { Filter } from "./Filters";
import Row from "./Row";

// Reordering helper function
const reorder = (list: TL[], startIndex: number, endIndex: number) => {
  let result = Array.from(list);
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);

  result = result.map((l, i) => ({ ...l, index: i }));

  return result;
};

// Styling draggable things
const getItemStyle = (
  isDragging: boolean,
  draggableStyle: DraggableProvidedDraggableProps["style"],
) =>
  ({
    userSelect: "none",
    background: isDragging ? "var(--tertiary)" : "transparent",
    ...draggableStyle,
  } as React.CSSProperties);

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

function makePokemonNameString(acc: string, p: PokemonData | null): string {
  if (!p) return acc;
  let newNameString = `${acc} ${p.name} ${p.nickname}`;

  const events = oVal(p.events || {});
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
  const [addToTeamOrigin, setATTO] = React.useState<string>("");
  const [addToTeamLocation, setATTL] = React.useState<string>("");
  const [filteredData, setFilteredData] = React.useState<Data[]>([]);
  const [filterClassNames, setFilterClassNames] = React.useState<string>("");

  //----------------------------------#01F2DF
  // Data
  const timelineArr = RUN?.getTimelineLocations() || [];
  const playerArr = RUN?.getPlayersArray() || [];
  const allDataArr: Data[] = timelineArr.map((l) => {
    const pokemon = RUN?.getPokemonByOrigin(l.name) || [];
    const pokemonNames = pokemon.reduce(makePokemonNameString, "");

    return {
      location: l,
      players: playerArr,
      pokemon: pokemon.filter((p) => !!p) as PokemonData[],
      pokemonNames,
      pokemonLocation:
        RUN?.getPokemonLocationByOrigin(l.name) || PokemonLocation.box,
      notes: RUN?.getLocationNotes(l.name) || "",
    };
  });

  //----------------------------------#01F2DF
  // Handlers
  const moveToTeam = (origin: string, location: string) => {
    setATTO(origin);
    setATTL(location);
  };

  const clearMove = () => {
    setATTO("");
    setATTL("");
  };

  const handleFinishAdd = (location: PlaceName) => {
    return (caught: boolean) => {
      const allPokemonSet = RUN?.haveAllPlayersGotPokemonAt(location);
      if (caught && allPokemonSet) {
        moveToTeam(location, location);
      }
    };
  };

  const onDragEnd = async (result: DropResult) => {
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
    const classnames: string[] = [];
    oKey(filters).forEach((f) => {
      if ((filters as any)[f] && f.includes("hide")) classnames.push(styles[f]);
    });
    if (!!filters.searchTerm) {
      const newFiltered = allDataArr.filter((d) =>
        matchesPokemonName(d, filters),
      );
      setFilteredData(newFiltered);
    } else setFilteredData([]);
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
            {(p) => (
              <tbody
                {...p.droppableProps}
                ref={p.innerRef}
                key={p.droppableProps["data-rbd-droppable-id"]}
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
