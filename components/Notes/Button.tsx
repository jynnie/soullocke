import { Button } from "antd";
import React from "react";
import styles from "styles/Location.module.scss";

function NotesButton({ onClick }: { onClick?: () => void }) {
  return (
    <Button
      className={styles.listingNotesButton}
      type="text"
      size="small"
      {...{ onClick }}
    >
      Notes
    </Button>
  );
}

export default NotesButton;
