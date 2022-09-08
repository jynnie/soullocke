import { Button, Popover, Tooltip } from "antd";
import { MapLocation, PlaceName } from "models";
import { RunContext } from "pages/run/[id]";
import React from "react";
import styles from "styles/Home.module.css";
import Box from "ui-box";

import { PlusOutlined } from "@ant-design/icons";

import Form from "./Form";

export function AddToTimeline({
  allLocations,
  allBadges,
}: {
  allLocations: MapLocation[];
  allBadges: string[];
}) {
  const { RUN } = React.useContext(RunContext);
  const [showForm, setShowForm] = React.useState<boolean>(false);

  const toggleForm = () => setShowForm(!showForm);

  const onFinish = async (location: PlaceName) => {
    await RUN.addNewLocation(location);
    toggleForm();
  };
  const onCancel = () => {
    toggleForm();
  };

  return (
    <Box marginLeft={8} marginTop={12}>
      <Popover
        content={<Form {...{ allLocations, allBadges, onFinish, onCancel }} />}
        trigger="click"
        visible={showForm}
        onVisibleChange={(v) => setShowForm(v)}
      >
        <Tooltip title="Add Location" placement="right">
          <Button
            shape="circle"
            icon={<PlusOutlined />}
            className={styles.secondaryButton}
          />
        </Tooltip>
      </Popover>
    </Box>
  );
}

export default AddToTimeline;
