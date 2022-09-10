import { Button, Input, Modal } from "antd";
import { cleanName } from "lib/utils";
import { PlaceName } from "models";
import { RunContext } from "pages/run/[id]";
import React from "react";

function NotesModal({
  visible = false,
  location,
  onCancel,
}: {
  visible: boolean;
  location: PlaceName;
  onCancel: () => void;
}) {
  const { RUN } = React.useContext(RunContext);
  const [notes, setNotes] = React.useState<string>("");

  const existingNotes = RUN?.getLocationNotes(location);

  React.useEffect(() => {
    setNotes(existingNotes ?? "");
  }, [existingNotes]);

  const handleChange: React.ChangeEventHandler<HTMLTextAreaElement> = (evt) => {
    setNotes(evt.target.value);
  };

  const handleSave = () => {
    RUN?.saveLocationNotes(location, notes);
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
    <Modal title={`${cleanName(location)} Notes`} {...{ visible, footer }}>
      <Input.TextArea
        placeholder="Place notes..."
        value={notes}
        onChange={handleChange}
      />
    </Modal>
  );
}

export default NotesModal;
