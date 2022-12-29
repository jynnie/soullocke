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

  // FIXME: Something about this tooltip is still seriously messed up...
  // Maybe this is the one place I should keep ant?
  return (
    <Tooltip
      content={
        <TooltipContent>
          <Form {...{ onFinish: handleFinish, onCancel }} />
        </TooltipContent>
      }
      visible={showForm}
      interactive
      interactiveBorder={10}
      onClickOutside={() => setShowForm(false)}
    >
      <div>
        <Tooltip content={<TooltipContent content="Add Pokemon" />}>
          <div>
            <Button
              className="subtle outline icon"
              icon={<Plus />}
              onClick={() => setShowForm(true)}
            />
          </div>
        </Tooltip>
      </div>
    </Tooltip>
  );
}

export default AddPokemon;
