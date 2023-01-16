import { Button } from "components/ui-library/Button";
import React, { useState } from "react";
import { Check, X } from "react-feather";

export function EditableText({
  display,
  value,
  onChange,
}: {
  display: JSX.Element;
  value?: string;
  onChange: (text: string) => void;
}) {
  const [editValue, setEditValue] = useState<string | undefined>(value);
  const [isEditing, setIsEditing] = useState(false);

  if (!isEditing)
    return <span onDoubleClick={() => setIsEditing(true)}>{display}</span>;
  return (
    <div className="flex gap-1">
      <input
        type="text"
        value={editValue}
        onChange={(evt) => setEditValue(evt.target.value)}
        autoFocus
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
          onChange?.(editValue ?? "");
          setIsEditing(false);
        }}
      />
    </div>
  );
}
