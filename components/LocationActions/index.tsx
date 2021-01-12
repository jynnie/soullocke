import React from "react";
import cn from "classnames";
import { RunContext } from "pages/run/[id]";
import { PlaceName } from "models";

import styles from "styles/Location.module.scss";
import { Button, Popconfirm } from "antd";
import { DeleteOutlined } from "@ant-design/icons";

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

export function LocationListing({ location }: { location: PlaceName }) {
  const { RUN } = React.useContext(RunContext);

  const handleDelete = async () => {
    await RUN.deleteLocation(location);
  };

  return (
    <td>
      <Popconfirm
        title={<ConfirmTitle />}
        onConfirm={handleDelete}
        okText="Yes"
        cancelText="No"
      >
        <Button
          className={styles.listingDeleteButton}
          type="text"
          children="Delete"
          size="small"
        />
      </Popconfirm>
    </td>
  );
}

export default LocationListing;
