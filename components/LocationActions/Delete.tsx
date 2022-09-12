import { Button, Popconfirm } from "antd";
import cn from "classnames";
import { useDeleteLocation } from "hooks/useDeleteLocation";
import { PlaceName } from "models";
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
  const deleteLocation = useDeleteLocation(location);

  return (
    <Popconfirm
      title={<ConfirmTitle />}
      onConfirm={deleteLocation}
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
