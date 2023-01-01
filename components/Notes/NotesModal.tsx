import { Button } from "components/ui-library/Button";
import { Modal } from "components/ui-library/Modal";
import { useLocationNotes } from "hooks/useLocationNotes";
import React, { useEffect } from "react";
import { cleanName } from "utils/utils";

function NotesModal({
  visible = false,
  locationKey,
  onCancel,
}: {
  visible: boolean;
  locationKey: string;
  onCancel: () => void;
}) {
  const { notes: existingNotes, name } = useLocationNotes(locationKey);
  const [notes, setNotes] = React.useState<string>("");

  useEffect(() => {
    setNotes(existingNotes?.value ?? "");
  }, [existingNotes?.value]);

  const handleChange: React.ChangeEventHandler<HTMLTextAreaElement> = (evt) => {
    setNotes(evt.target.value);
  };

  const handleSave = () => {
    existingNotes.set(notes);
    onCancel?.();
  };

  return (
    <Modal {...{ visible, onCancel }}>
      <p className="mt-0 text-lg capitalize">{cleanName(name.value)} Notes</p>
      <textarea
        className="w-full"
        placeholder="Place notes..."
        value={notes}
        onChange={handleChange}
      />

      <div className="mt-4 flex gap-2 justify-end items-center">
        <Button className="outline" key="cancel" onClick={onCancel}>
          Cancel
        </Button>
        <Button key="save" onClick={handleSave}>
          Save
        </Button>
      </div>
    </Modal>
  );
}

export default NotesModal;
