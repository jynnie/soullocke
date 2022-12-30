import cn from "classnames";
import EditEvent from "components/EditEvent";
import { Button } from "components/ui-library/Button";
import { Modal, ModalProps } from "components/ui-library/Modal";
import { TimelineBullet } from "components/ui-library/TimelineBullet";
import { useEditEvent } from "hooks/useEditEvent";
import Pokeball from "lib/icons/Pokeball";
import { EventType, IPokemon, PokemonLocation } from "models";
import type { PokemonEvent } from "models";
import React from "react";
import { Edit, Frown, Inbox, Star, Users } from "react-feather";
import styles from "styles/Event.module.scss";
import { cleanName } from "utils/utils";

interface ModifiedPokemonEvent extends PokemonEvent {
  locationName?: string;
}

function PokemonTimelineEvent({
  event,
  pokemon,
  playerId,
  isLatestEvent,
}: {
  event: ModifiedPokemonEvent;
  pokemon: IPokemon;
  playerId: string;
  isLatestEvent?: boolean;
}) {
  const place = cleanName(event.locationName || event.location);

  const [isEditing, setIsEditing] = React.useState(false);
  const [isDeleting, setIsDeleting] = React.useState(false);

  const { editEvent, deleteEvent } = useEditEvent(
    playerId,
    pokemon.origin,
    event.index,
  );

  async function handleSaveEdits(
    eventType: EventType,
    location: string,
    details: PokemonEvent["details"],
  ) {
    await editEvent(eventType, location, details, isLatestEvent);
    setIsEditing(false);
    setIsDeleting(false);
  }

  function handleStartDelete() {
    setIsDeleting(true);
  }

  function handleDelete() {
    setIsEditing(false);
    setIsDeleting(false);
    return deleteEvent();
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
    eventColor = "var(--text-caption)";
    eventDot =
      event.details?.location === PokemonLocation.team ? <Users /> : <Inbox />;
    eventDetails = `Moved to ${event.details?.location} while at ${place}`;
  } else if (event.type === EventType.missed) {
    eventColor = "var(--red-primary)";
    eventDot = <Frown />;
    eventDetails = `Missed on ${place}`;
  } else if (event.type === EventType.defeated) {
    eventColor = "var(--red-primary)";
    eventDetails = `Defeated at ${place}`;
    eventDot = <Frown />;
  } else if (event.type === EventType.soulDeath) {
    eventColor = "var(--red-primary)";
    eventDot = <Frown />;
    eventDetails = `Soul died at ${place}`;
  } else if (event.type === EventType.soulMiss) {
    eventColor = "var(--red-primary)";
    eventDot = <Frown />;
    eventDetails = `Soul missed at ${place}`;
  } else if (event.type === EventType.evolved) {
    eventColor = "var(--blue-primary)";
    eventDot = <Star />;
    eventDetails = `Evolved into ${
      event.details?.evolution || "?"
    } at ${place}`;
  }

  if (isEditing) {
    return (
      <div className="py-4">
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
      </div>
    );
  }

  return (
    <TimelineBullet color={eventColor} dot={eventDot}>
      <div className={styles.container}>
        <span>{eventDetails}</span>
        <Button
          className={cn(styles.action, "icon text")}
          icon={<Edit size="1em" />}
          onClick={() => setIsEditing(true)}
        />
      </div>
    </TimelineBullet>
  );
}

interface DeleteEventModalProps extends ModalProps {
  onDelete?: () => void;
}

function DeleteEventModal(props: DeleteEventModalProps) {
  return (
    <Modal {...props}>
      <p className="text-lg m-0">Are you sure you want to delete this event?</p>
      <p className="my-2">
        This only deletes this event for this Pokémon. Deleting this event won
        {"'"}t change this or linked Pokémons{"'"} origin, name, or location.
      </p>
      <div className="flex justify-end gap-4">
        {/* FIXME: */}
        <Button className="outline" onClick={props?.onCancel as any}>
          Cancel
        </Button>
        <Button className="danger" onClick={props?.onDelete}>
          Delete
        </Button>
      </div>
    </Modal>
  );
}

export default PokemonTimelineEvent;
