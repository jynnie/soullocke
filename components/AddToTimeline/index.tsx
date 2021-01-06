import React from "react";
import { RunContext } from "pages/run/[id]";
import type { UseState, MapLocation, PlaceName } from "models";

import { Popover, Button, Tooltip } from "antd";
import { PlusOutlined } from "@ant-design/icons";

import Form from "./Form";

const AddToTimeline = ({
  allLocations,
  allBadges,
}: {
  allLocations: MapLocation[];
  allBadges: string[];
}) => {
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
    <Popover
      content={<Form {...{ allLocations, allBadges, onFinish, onCancel }} />}
      trigger="click"
      visible={showForm}
      onVisibleChange={(v) => setShowForm(v)}
    >
      <Tooltip title="Add Location">
        <Button shape="circle" icon={<PlusOutlined />} />
      </Tooltip>
    </Popover>
  );
};

export default AddToTimeline;
