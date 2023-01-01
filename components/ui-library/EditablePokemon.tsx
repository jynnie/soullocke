import { Button } from "components/ui-library/Button";
import { SearchableSelect } from "components/ui-library/SearchableSelect";
import { RunContext } from "pages/run/[id]";
import React, { useState } from "react";
import { Check, X } from "react-feather";

export function EditablePokemon({
  display,
  value,
  onChange,
}: {
  display: JSX.Element;
  value?: string;
  onChange: (val?: string) => void;
}) {
  const { allPokemon } = React.useContext(RunContext);

  const [isEditing, setIsEditing] = useState(false);
  const [editValue, setEditValue] = React.useState<string | undefined>(value);
  const handlePokemonChange = (value: string) => setEditValue(value);

  if (!isEditing)
    return <span onDoubleClick={() => setIsEditing(true)}>{display}</span>;
  return (
    <div className="flex gap-1">
      <SearchableSelect
        onChange={handlePokemonChange}
        value={editValue}
        placeholder="Select a Pokémon"
        options={allPokemon.map((p) => ({ value: p.name, label: p.name }))}
      />
      <Button
        icon={<X />}
        className="text icon subtle"
        onClick={() => {
          setEditValue(value);
          setIsEditing(false);
        }}
      />
      <Button
        icon={<Check />}
        className="text icon"
        onClick={() => {
          onChange?.(editValue);
          setIsEditing(false);
        }}
      />
    </div>
  );
}
