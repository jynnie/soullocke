import React from "react";
import { RunContext } from "pages/run/[id]";
import type { UseState, MapLocation, PlaceName } from "models";

import { Button, Tooltip } from "antd";
import { PlusOutlined } from "@ant-design/icons";

import Form from "./form";

function AddToTimeline({ allLocations }: { allLocations: MapLocation[] }) {
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
    <div>
      {!showForm && (
        <Tooltip title="Add Location">
          <Button shape="circle" icon={<PlusOutlined />} onClick={toggleForm} />
        </Tooltip>
      )}

      {showForm && <Form {...{ allLocations, onFinish, onCancel }} />}
    </div>
  );
}

export default AddToTimeline;
