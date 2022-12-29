import { Button } from "components/ui-library/Button";
import { TooltipContent } from "components/ui-library/TooltipContent";
import { useAddEvent } from "hooks/useAddEvent";
import { PlaceName } from "models";
import React from "react";
import { Plus } from "react-feather";

import Tooltip from "@tippyjs/react";

import Form from "./Form";

export function AddPokemon({
  playerId,
  location,
  onFinish,
}: {
  playerId: string;
  location: PlaceName;
  onFinish: (caught: boolean) => void;
}) {
  const [showForm, setShowForm] = React.useState<boolean>(false);

  const toggleForm = () => setShowForm(!showForm);
  const { addPokemon } = useAddEvent(playerId, location);

  const handleFinish = async (
    pokemonName: string,
    nickname: string,
    caught: boolean,
  ) => {
    await addPokemon(pokemonName, nickname, caught);
    onFinish?.(caught);
    toggleForm();
  };
  const onCancel = () => toggleForm();

  return (
    <Tooltip
      content={
        <TooltipContent>
          <Form {...{ onFinish: handleFinish, onCancel }} />
        </TooltipContent>
      }
      trigger="click"
      interactive
    >
      <div>
        <Tooltip content={<TooltipContent content="Add Pokemon" />}>
          <div>
            <Button className="subtle outline icon" icon={<Plus />} />
          </div>
        </Tooltip>
      </div>
    </Tooltip>
  );
}

export default AddPokemon;
