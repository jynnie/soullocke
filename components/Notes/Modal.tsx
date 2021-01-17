import React from "react";
import { RunContext } from "pages/run/[id]";
import { cleanName } from "lib/utils";
import { PlaceName, UseState } from "models";

import { Button, Modal, Input } from "antd";

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
  const [notes, setNotes]: UseState<string> = React.useState(null);

  const existingNotes = RUN.getLocationNotes(location);

  React.useEffect(() => {
    setNotes(existingNotes);
  }, [existingNotes]);

  const handleChange = (evt) => {
    setNotes(evt.target.value);
  };

  const handleSave = () => {
    RUN.saveLocationNotes(location, notes);
  };

  const footer = [
    <Button onClick={onCancel}>Cancel</Button>,
    <Button onClick={handleSave} type="primary">
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
