import classNames from "classnames";
import { useFilters } from "components/Timeline/useFilters";
import { useTimelineData } from "components/Timeline/useTimelineData";
import { useMovePokemon } from "hooks/useMovePokemon.1";
import { useRunChild } from "hooks/useRun";
import { useTimelineLocations } from "hooks/useTimelineLocations";
import { Player, PokemonLocation } from "models";
import React, { useMemo } from "react";
import {
  DragDropContext,
  Draggable,
  DropResult,
  Droppable,
} from "react-beautiful-dnd";
import styles from "styles/Box.module.scss";
import { getLastItem } from "utils/getLastItem";

import { BoxFilters } from "./BoxFilters";
import { BoxPokemon } from "./BoxPokemon";
import { TeamPokemon } from "./TeamPokemon";

export function BoxView() {
  const { team, box, grave, daycare, onFilterChange } = usePokemon();
  const players = useRunChild<Record<string, Player>>("players", {});
  const movePokemon = useMovePokemon(players);

  const timelineLocations = useTimelineLocations();
  const latestLocation = getLastItem(timelineLocations);

  async function onDragEnd(result: DropResult) {
    // dropped outside the list
    if (!result.destination) return;

    // same location (we're not doing index rearrangement)
    if (result.destination.droppableId === result.source.droppableId) {
      return;
    }

    // Move pokemon from one place to another depending on the drop location
    const pokemon = result.draggableId; // Draggable id is the location key
    const to = result.destination.droppableId as PokemonLocation;
    movePokemon(pokemon, latestLocation.key, to);
  }

  return (
    <div className={styles.page}>
      <BoxFilters onChange={onFilterChange} />

      <DragDropContext onDragEnd={onDragEnd}>
        <div className={styles.pokemonContainer}>
          <Droppable droppableId="team">
            {(p) => (
              <div
                className={styles.teamColumn}
                {...p.droppableProps}
                ref={p.innerRef}
                key={p.droppableProps["data-rbd-droppable-id"]}
              >
                <div className={classNames(styles.header, "teko p-pink")}>
                  Team
                </div>
                <div className={styles.container}>
                  {team?.map((d, i) => (
                    <Draggable
                      key={d.location.key}
                      draggableId={d.location.key}
                      index={i}
                    >
                      {(p) => (
                        <span
                          key={d.location.key}
                          data-row-key={d.location.key}
                          ref={p.innerRef}
                          {...p.draggableProps}
                          {...p.dragHandleProps}
                          style={p.draggableProps.style}
                        >
                          <TeamPokemon key={d.location.key} data={d} />
                        </span>
                      )}
                    </Draggable>
                  ))}
                </div>
                {!team?.length && <p className="caption">None</p>}
              </div>
            )}
          </Droppable>

          <div className={styles.nonTeamColumn}>
            <Droppable droppableId="box" direction="horizontal">
              {(p) => (
                <div
                  className={classNames(styles.section, "p-blue")}
                  {...p.droppableProps}
                  ref={p.innerRef}
                  key={p.droppableProps["data-rbd-droppable-id"]}
                >
                  <div className="teko uppercase text-xl">Box</div>
                  <div className={styles.container}>
                    {box?.map((d, i) => (
                      <Draggable
                        key={d.location.key}
                        draggableId={d.location.key}
                        index={i}
                      >
                        {(p) => (
                          <span
                            key={d.location.key}
                            data-row-key={d.location.key}
                            ref={p.innerRef}
                            {...p.draggableProps}
                            {...p.dragHandleProps}
                            style={p.draggableProps.style}
                          >
                            <BoxPokemon key={d.location.key} data={d} />
                          </span>
                        )}
                      </Draggable>
                    ))}
                  </div>
                  {!box?.length && <p className="caption">None</p>}
                </div>
              )}
            </Droppable>

            <Droppable droppableId="daycare" direction="horizontal">
              {(p) => (
                <div
                  className={styles.section}
                  {...p.droppableProps}
                  ref={p.innerRef}
                  key={p.droppableProps["data-rbd-droppable-id"]}
                >
                  <div className="teko uppercase text-xl p-yellow">Daycare</div>
                  <div className={styles.container}>
                    {daycare?.map((d, i) => (
                      <Draggable
                        key={d.location.key}
                        draggableId={d.location.key}
                        index={i}
                      >
                        {(p) => (
                          <span
                            key={d.location.key}
                            data-row-key={d.location.key}
                            ref={p.innerRef}
                            {...p.draggableProps}
                            {...p.dragHandleProps}
                            style={p.draggableProps.style}
                          >
                            <BoxPokemon key={d.location.key} data={d} />
                          </span>
                        )}
                      </Draggable>
                    ))}
                    {!daycare?.length && <p className="caption">None</p>}
                  </div>
                </div>
              )}
            </Droppable>

            <Droppable droppableId="grave" direction="horizontal">
              {(p) => (
                <div
                  className={styles.section}
                  {...p.droppableProps}
                  ref={p.innerRef}
                  key={p.droppableProps["data-rbd-droppable-id"]}
                >
                  <div className="teko uppercase text-xl">Grave</div>
                  <div className={styles.container}>
                    {grave?.map((d, i) => (
                      <Draggable
                        key={d.location.key}
                        draggableId={d.location.key}
                        index={i}
                      >
                        {(p) => (
                          <span
                            key={d.location.key}
                            data-row-key={d.location.key}
                            ref={p.innerRef}
                            {...p.draggableProps}
                            {...p.dragHandleProps}
                            style={p.draggableProps.style}
                          >
                            <BoxPokemon key={d.location.key} data={d} />
                          </span>
                        )}
                      </Draggable>
                    ))}
                  </div>
                  {!grave?.length && <p className="caption">None</p>}
                </div>
              )}
            </Droppable>
          </div>
        </div>
      </DragDropContext>
    </div>
  );
}

function usePokemon() {
  const { allDataArr } = useTimelineData();
  const { filteredData, onFilterChange } = useFilters(allDataArr);

  const team = useMemo(
    () =>
      (filteredData || allDataArr)?.filter(
        (d) => d.pokemonLocation === PokemonLocation.team,
      ),
    [filteredData, allDataArr],
  );

  const box = useMemo(
    () =>
      (filteredData || allDataArr)?.filter(
        (d) => d.pokemonLocation === PokemonLocation.box,
      ),
    [filteredData, allDataArr],
  );

  const grave = useMemo(
    () =>
      (filteredData || allDataArr)?.filter(
        (d) => d.pokemonLocation === PokemonLocation.grave && d.pokemonNames,
      ),
    [filteredData, allDataArr],
  );

  const daycare = useMemo(
    () =>
      (filteredData || allDataArr)?.filter(
        (d) => d.pokemonLocation === PokemonLocation.daycare,
      ),
    [filteredData, allDataArr],
  );
  return { team, box, grave, daycare, onFilterChange };
}
