import React from "react";
import Box from "ui-box";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import { RunContext } from "pages/run/[id]";
import { oVal } from "lib/utils";
import type {
  Run,
  MapLocation,
  UseState,
  PlaceName,
  Timeline as TL,
} from "models";

import styles from "styles/Timeline.module.scss";
import Pokemon from "components/Pokemon";
import LocationListing from "./LocationListing";
import LocationSummary from "components/LocationSummary";
import AddToTimeline from "components/AddToTimeline";
import AddPokemon from "components/AddPokemon";
import MovePokemonToTeam from "components/MovePokemonToTeam";
import LocationActions from "./LocationActions";
import { message } from "antd";

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
  background: isDragging ? "#27272A" : "transparent",
  ...draggableStyle,
});

/**
 * Timeline Grid
 * View focused on what pokemon were caught when
 * Will be modified into true timeline view later
 */
function TimelineGrid({
  timeline,
  players,
  allLocations,
  allBadges,
}: {
  timeline: Run["timeline"];
  players: Run["players"];
  allLocations: MapLocation[];
  allBadges: string[];
}) {
  const { RUN } = React.useContext(RunContext);
  const [addToTeamOrigin, setATTO]: UseState<string> = React.useState(null);
  const [addToTeamLocation, setATTL]: UseState<string> = React.useState(null);

  //----------------------------------#01F2DF
  // Data
  const timelineArr = oVal(timeline || []).sort((a, b) => a.index - b.index);
  const playerArr = oVal(players || []);
  const numTrainers = playerArr.length;

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

  //----------------------------------#01F2DF
  return (
    <>
      <DragDropContext onDragEnd={onDragEnd}>
        <Box is="table" className={styles.table}>
          <colgroup>
            <col />
            <col span={numTrainers} />
            <col />
          </colgroup>

          <thead>
            <tr>
              <th>Location</th>
              {playerArr.map((p) => (
                <th key={p.id}>{p.name}</th>
              ))}
              <th>Summary</th>
              <th>Actions</th>
            </tr>
          </thead>

          <Droppable droppableId="droppable">
            {(p, i) => (
              <tbody {...p.droppableProps} ref={p.innerRef} key={i}>
                {timelineArr.map((t, i) => (
                  <Draggable key={t.key} draggableId={t.key} index={i}>
                    {(p, snapshot) => (
                      <tr
                        key={t.key}
                        data-row-key={t.key}
                        ref={p.innerRef}
                        {...p.draggableProps}
                        {...p.dragHandleProps}
                        style={getItemStyle(
                          snapshot.isDragging,
                          p.draggableProps.style,
                        )}
                      >
                        <LocationListing key={t.name} location={t.name} />

                        {playerArr.map((p) => {
                          const key = t.key + p.name;
                          const playerPokemon = p.pokemon
                            ? p.pokemon[t.name]
                            : null;
                          const isBadge = /badge/gi.test(t.name);
                          const props = {
                            key,
                            playerId: p.id,
                            location: t.name,
                            onFinish: handleFinishAdd(t.name),
                            pokemon: playerPokemon,
                          };

                          if (isBadge) return <td>-</td>;
                          let display = <AddPokemon {...props} />;
                          if (playerPokemon) display = <Pokemon {...props} />;
                          return <td>{display}</td>;
                        })}

                        <td>
                          <LocationSummary name={t.name} index={t.index} />
                        </td>

                        <LocationActions
                          location={t.name}
                          {...{ moveToTeam }}
                        />
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
