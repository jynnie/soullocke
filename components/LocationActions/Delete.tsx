import { Button, Popconfirm } from "antd";
import cn from "classnames";
import { PlaceName } from "models";
import { RunContext } from "pages/run/[id]";
import React from "react";
import styles from "styles/Location.module.scss";

function ConfirmTitle() {
  return (
    <>
      <p className={styles.deleteConfirm}>
        Are you sure to delete this location?
      </p>
      <p className={cn(styles.deleteConfirm, "caption")}>
        (The Pokémon caught at this location will be deleted as well)
      </p>
    </>
  );
}

export function DeleteLocation({ location }: { location: PlaceName }) {
  const { RUN } = React.useContext(RunContext);

  const handleDelete = async () => {
    await RUN?.deleteLocation(location);
  };

  return (
    <Popconfirm
      title={<ConfirmTitle />}
      onConfirm={handleDelete}
      okText="Yes"
      cancelText="No"
    >
      <Button className={styles.listingDeleteButton} type="text" size="small">
        Delete
      </Button>
    </Popconfirm>
  );
}

export default DeleteLocation;
