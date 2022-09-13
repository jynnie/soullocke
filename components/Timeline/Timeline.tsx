import { message } from "antd";
import cn from "classnames";
import AddToTimeline from "components/AddToTimeline";
import MovePokemonToTeam from "components/MovePokemonToTeam";
import {
  IPokemon,
  MapLocation,
  PlaceName,
  Player,
  PokemonLocation,
  Timeline as TL,
} from "models";
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
import { getPokemonByOrigin } from "utils/getPokemonByOrigin";

import Filters from "./Filters";
import Row from "./Row";
import { useFilters } from "./useFilters";
import { useTimelineData } from "./useTimelineData";

export interface Data {
  location: TL;
  players: Player[];
  pokemon: IPokemon[];
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
  // TODO: Make these their own hooks
  const [addToTeamOrigin, setATTO] = React.useState<string>("");
  const [addToTeamLocation, setATTL] = React.useState<string>("");

  const { playerArr, timelineArr, allDataArr, setTimelineOrder } =
    useTimelineData();
  const { filteredData, filterClassNames, onFilterChange } =
    useFilters(allDataArr);

  function moveToTeam(origin: string, location: string) {
    setATTO(origin);
    setATTL(location);
  }

  function clearMove() {
    setATTO("");
    setATTL("");
  }

  function haveAllPlayersGotPokemonAt(origin: string) {
    const existingPokemon = getPokemonByOrigin({ playerArr, origin }).filter(
      (p) => !!p,
    );
    // WORKAROUND: We'll be one step behind the latest pokemon add
    // so we add one to the length of pokemon we've added
    return existingPokemon.length + 1 === playerArr.length;
  }

  function handleFinishAdd(location: string) {
    return (caught: boolean) => {
      const allPokemonSet = haveAllPlayersGotPokemonAt(location);
      if (caught && allPokemonSet) {
        moveToTeam(location, location);
      }
    };
  }

  async function onDragEnd(result: DropResult) {
    // dropped outside the list
    if (!result.destination) return;

    const items = reorder(
      timelineArr,
      result.source.index,
      result.destination.index,
    );

    const data = await setTimelineOrder(items);
    message.success("Timeline order change saved");
    return data;
  }

  return (
    <>
      <Filters onChange={onFilterChange} />

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

// Create <tr /> classnames for filtering
function getClassNames(data: Data): string {
  const classnames = [];

  if (data.location.name.includes("Badge")) classnames.push(styles.badge);
  else classnames.push(styles.location);
  if (data.pokemonLocation) classnames.push(styles[data.pokemonLocation]);

  return classnames.join(" ");
}

// Reordering helper function
function reorder(list: TL[], startIndex: number, endIndex: number) {
  let result = Array.from(list);
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);

  result = result.map((l, i) => ({ ...l, index: i }));

  return result;
}

// Styling draggable things
function getItemStyle(
  isDragging: boolean,
  draggableStyle: DraggableProvidedDraggableProps["style"],
) {
  return {
    userSelect: "none",
    background: isDragging ? "var(--tertiary)" : "transparent",
    ...draggableStyle,
  } as React.CSSProperties;
}
