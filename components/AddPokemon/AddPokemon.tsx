import { Button } from "components/ui-library/Button";
import { TooltipContent } from "components/ui-library/TooltipContent";
import { useAddEvent } from "hooks/useAddEvent";
import { PlaceName } from "models";
import React from "react";
import { Plus } from "react-feather";

import Tippy from "@tippyjs/react";

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
    <Tippy
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
      <div className="flex center">
        <Tippy content={<TooltipContent content="Add Pokemon" />}>
          <div>
            <Button
              className="subtle outline icon"
              icon={<Plus size="1.5rem" />}
              onClick={() => setShowForm(true)}
            />
          </div>
        </Tippy>
      </div>
    </Tippy>
  );
}

export default AddPokemon;
