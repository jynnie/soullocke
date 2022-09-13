import { Button, Input, Modal } from "antd";
import { useLocationNotes } from "hooks/useLocationNotes";
import { PlaceName } from "models";
import React, { useEffect } from "react";
import { cleanName } from "utils/utils";

function NotesModal({
  visible = false,
  location,
  onCancel,
}: {
  visible: boolean;
  location: PlaceName;
  onCancel: () => void;
}) {
  const existingNotes = useLocationNotes(location);
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
      title={`${cleanName(location)} Notes`}
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
