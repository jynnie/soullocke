import { PlaceName } from "models";
import React from "react";

import Button from "./Button";
import Modal from "./Modal";

function Notes({ locationKey }: { locationKey: PlaceName }) {
  const [showNotes, setShowNotes] = React.useState<boolean>(false);

  return (
    <>
      <Button onClick={() => setShowNotes(true)} />
      <Modal
        visible={showNotes}
        {...{ locationKey, onCancel: () => setShowNotes(false) }}
      />
    </>
  );
}

export default Notes;
