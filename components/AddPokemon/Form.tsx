import classNames from "classnames";
import cn from "classnames";
import { Button } from "components/ui-library/Button";
import { SearchableSelect } from "components/ui-library/SearchableSelect";
import { RunContext } from "pages/run/[id]";
import React from "react";

function AddPokemonForm({
  defaultValues,
  finishText = "Add",
  onFinish,
  onCancel,
  showCaughtCheckbox = true,
}: {
  defaultValues?: { pokemon: string; nickname: string };
  finishText?: string;
  onFinish?: (pokemonName: string, nickname: string, caught: boolean) => void;
  onCancel?: () => void;
  showCaughtCheckbox?: boolean;
}) {
  const { allPokemon } = React.useContext(RunContext);
  const [pokemon, setPokemon] = React.useState<string | undefined>(
    defaultValues?.pokemon,
  );
  const [nickname, setNickname] = React.useState<string | undefined>(
    defaultValues?.nickname,
  );
  const [caught, setCaught] = React.useState(true);

  const handleFinish = () => {
    if (pokemon) onFinish?.(pokemon, nickname || pokemon, caught);

    setPokemon(undefined);
    setNickname(undefined);
    setCaught(true);
  };

  const handlePokemonChange = (value: string) => setPokemon(value);
  const handleNicknameChange: React.ChangeEventHandler<HTMLInputElement> = (
    evt,
  ) => setNickname(evt.target.value);
  const handleCaughtChange = () => setCaught((c) => !c);

  const handleCancel = () => {
    setPokemon(undefined);
    setNickname(undefined);
    setCaught(true);
    if (onCancel) onCancel();
  };

  return (
    <form
      className="flex flex-col gap-2 my-2"
      name="addPokemon"
      method="dialog"
    >
      <SearchableSelect
        onChange={handlePokemonChange}
        value={pokemon}
        placeholder="Select a Pokémon"
        options={allPokemon.map((p) => ({ value: p.name, label: p.name }))}
      />

      <div className="w-full">
        <input
          className="w-full"
          type="text"
          onChange={handleNicknameChange}
          value={nickname}
          placeholder="Nickname"
        />
      </div>

      {showCaughtCheckbox && (
        <div className={classNames("flex gap-1")}>
          <input
            type="checkbox"
            checked={caught}
            onChange={(evt) => setCaught(evt.target.checked)}
          />
          <label onClick={handleCaughtChange}>Caught</label>
        </div>
      )}

      <div className={cn("flex justifyEnd gap-1 pointer")}>
        {onCancel && (
          <Button className="outline" onClick={handleCancel}>
            Cancel
          </Button>
        )}

        <Button onClick={handleFinish}>{finishText}</Button>
      </div>
    </form>
  );
}

export default AddPokemonForm;
