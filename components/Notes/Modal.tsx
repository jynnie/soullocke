import { Button, Input, Modal } from "antd";
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
  const existingNotes = useLocationNotes(locationKey);
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

  const footer = [
    <Button key="cancel" onClick={onCancel}>
      Cancel
    </Button>,
    <Button key="save" onClick={handleSave} type="primary">
      Save
    </Button>,
  ];

  return (
    <Modal
      // FIXME: Use location name instead of key
      title={`${cleanName(locationKey)} Notes`}
      {...{ visible, footer, onCancel }}
    >
      <Input.TextArea
        placeholder="Place notes..."
        value={notes}
        onChange={handleChange}
      />
    </Modal>
  );
}

export default NotesModal;
