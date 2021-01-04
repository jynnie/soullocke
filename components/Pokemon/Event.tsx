import React from "react";
import { cleanName } from "lib/utils";
import { EventType } from "models";
import type { PokemonEvent } from "models";

import Pokeball from "lib/icons/Pokeball";
import { Timeline } from "antd";
import { InboxOutlined, FrownOutlined, StarOutlined } from "@ant-design/icons";

function PokemonTimelineEvent({ event }: { event: PokemonEvent }) {
  const place = cleanName(event.location);

  if (event.type === EventType.catch)
    return (
      <Timeline.Item dot={<Pokeball size={18} />}>
        Caught on {place}
      </Timeline.Item>
    );
  if (event.type === EventType.moved)
    return (
      <Timeline.Item color="gray" dot={<InboxOutlined />}>
        Moved to {event.details?.location} while at {place}
      </Timeline.Item>
    );
  if (event.type === EventType.missed)
    return (
      <Timeline.Item color="red" dot={<InboxOutlined />}>
        Missed on {place}
      </Timeline.Item>
    );
  if (event.type === EventType.defeated)
    return (
      <Timeline.Item color="red" dot={<FrownOutlined />}>
        Defeated at {place}
      </Timeline.Item>
    );
  if (event.type === EventType.soulDeath)
    return (
      <Timeline.Item color="red" dot={<FrownOutlined />}>
        Soul died at {place}
      </Timeline.Item>
    );
  if (event.type === EventType.evolved)
    return (
      <Timeline.Item color="blue" dot={<StarOutlined />}>
        Evolved into {event.details?.evolution || "?"} at {place}
      </Timeline.Item>
    );
}

export default PokemonTimelineEvent;
