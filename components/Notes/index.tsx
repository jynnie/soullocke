import React from "react";
import { PlaceName, UseState } from "models";

import Button from "./Button";
import Modal from "./Modal";

function Notes({ location }: { location: PlaceName }) {
  const [showNotes, setShowNotes]: UseState<boolean> = React.useState(null);

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
