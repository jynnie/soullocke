import { PlaceName } from "models";
import React from "react";

import Button from "./Button";
import Modal from "./Modal";

function Notes({ location }: { location: PlaceName }) {
  const [showNotes, setShowNotes] = React.useState<boolean>(false);

  return (
    <>
      <Button onClick={() => setShowNotes(true)} />
      <Modal
        visible={showNotes}
        {...{ location, onCancel: () => setShowNotes(false) }}
      />
    </>
  );
}

export default Notes;
