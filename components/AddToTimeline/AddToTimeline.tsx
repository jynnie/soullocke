import React from "react";
import Box from "ui-box";
import { RunContext } from "pages/run/[id]";
import { UseState, MapLocation, PlaceName } from "models";

import styles from "styles/Home.module.css";
import { Popover, Button, Tooltip } from "antd";
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
  const [showForm, setShowForm]: UseState<boolean> = React.useState(null);

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
