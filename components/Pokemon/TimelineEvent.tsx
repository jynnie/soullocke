import { Button, Modal, Timeline } from "antd";
import { ModalProps } from "antd/lib/modal";
import EditEvent from "components/EditEvent";
import Pokeball from "lib/icons/Pokeball";
import { EventType, IPokemon } from "models";
import type { PokemonEvent } from "models";
import { RunContext } from "pages/run/[id]";
import React from "react";
import styles from "styles/Event.module.scss";
import { cleanName } from "utils/utils";

import {
  EditOutlined,
  FrownOutlined,
  InboxOutlined,
  StarOutlined,
} from "@ant-design/icons";

function PokemonTimelineEvent({
  event,
  pokemon,
  playerId,
  isLatestEvent,
}: {
  event: PokemonEvent;
  pokemon: IPokemon;
  playerId: string;
  isLatestEvent?: boolean;
}) {
  const { RUN } = React.useContext(RunContext);
  const place = cleanName(event.location);

  const [isEditing, setIsEditing] = React.useState(false);
  const [isDeleting, setIsDeleting] = React.useState(false);

  async function handleSaveEdits(
    eventType: EventType,
    location: string,
    details: PokemonEvent["details"],
  ) {
    await RUN?.editEvent(
      playerId,
      pokemon.origin,
      event.index,
      eventType,
      location,
      details,
      isLatestEvent && location === RUN.getLatestLocation(),
    );
    setIsEditing(false);
    setIsDeleting(false);
  }

  function handleStartDelete() {
    setIsDeleting(true);
  }

  function handleDelete() {
    setIsEditing(false);
    setIsDeleting(false);
    return RUN?.removeEvent(playerId, pokemon.origin, event.index);
  }

  function handleCancel() {
    setIsEditing(false);
    setIsDeleting(false);
  }

  let eventDetails: string = "";
  let eventDot: React.ReactElement | undefined = undefined;
  let eventColor: string = "";
  if (event.type === EventType.catch) {
    eventDot = <Pokeball size={18} />;
    eventDetails = `Caught on ${place}`;
  } else if (event.type === EventType.moved) {
    eventColor = "gray";
    eventDot = <InboxOutlined />;
    eventDetails = `Moved to ${event.details?.location} while at ${place}`;
  } else if (event.type === EventType.missed) {
    eventColor = "red";
    eventDot = <FrownOutlined />;
    eventDetails = `Missed on ${place}`;
  } else if (event.type === EventType.defeated) {
    eventColor = "red";
    eventDetails = `Defeated at ${place}`;
    eventDot = <FrownOutlined />;
  } else if (event.type === EventType.soulDeath) {
    eventColor = "red";
    eventDot = <FrownOutlined />;
    eventDetails = `Soul died at ${place}`;
  } else if (event.type === EventType.soulMiss) {
    eventColor = "red";
    eventDot = <FrownOutlined />;
    eventDetails = `Soul missed at ${place}`;
  } else if (event.type === EventType.evolved) {
    eventColor = "blue";
    eventDot = <StarOutlined />;
    eventDetails = `Evolved into ${
      event.details?.evolution || "?"
    } at ${place}`;
  }

  if (isEditing) {
    return (
      <>
        <EditEvent
          {...{
            event,
            onCancel: handleCancel,
            onDelete: handleStartDelete,
            onFinish: handleSaveEdits,
            isLatestEvent,
          }}
        />
        <DeleteEventModal
          onCancel={() => setIsDeleting(false)}
          visible={isDeleting}
          onDelete={handleDelete}
        />
      </>
    );
  }

  return (
    <Timeline.Item color={eventColor} dot={eventDot}>
      <div className={styles.container}>
        <span>{eventDetails}</span>
        <Button
          className={styles.action}
          type="text"
          icon={<EditOutlined size={18} />}
          onClick={() => setIsEditing(true)}
        />
      </div>
    </Timeline.Item>
  );
}

interface DeleteEventModalProps extends ModalProps {
  onDelete?: () => void;
}

function DeleteEventModal(props: DeleteEventModalProps) {
  return (
    <Modal
      title={"Are you sure you want to delete this event?"}
      footer={null}
      {...props}
    >
      <p>
        This only deletes this event for this Pokémon. Deleting this event won
        {"'"}t change this or linked Pokémons{"'"} origin, name, or location.
      </p>
      <div className="flex justifyEnd gap05">
        <Button onClick={props?.onCancel}>Cancel</Button>
        <Button type="primary" danger onClick={props?.onDelete}>
          Delete
        </Button>
      </div>
    </Modal>
  );
}

export default PokemonTimelineEvent;