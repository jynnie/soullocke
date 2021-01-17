import React from "react";

import styles from "styles/Location.module.scss";
import { Button } from "antd";

function NotesButton({ onClick }: { onClick?: () => void }) {
  return (
    <Button
      className={styles.listingNotesButton}
      type="text"
      children="Notes"
      size="small"
      {...{ onClick }}
    />
  );
}

export default NotesButton;
