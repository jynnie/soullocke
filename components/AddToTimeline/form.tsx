import React from "react";
import type { UseState, MapLocation } from "models";

import { Select, Button, Tooltip } from "antd";
import { CloseOutlined, CheckOutlined } from "@ant-design/icons";
const { Option } = Select;

function AddToTimelineForm({
  allLocations,
  onFinish,
  onCancel,
}: {
  allLocations: MapLocation[];
  onFinish?: (location: string) => void;
  onCancel?: () => void;
}) {
  const [location, setLocation]: UseState<string> = React.useState(null);

  const handleFinish = () => {
    if (onFinish) onFinish(location);
  };

  const handleChange = (value) => {
    setLocation(value);
  };

  const handleCancel = () => {
    if (onCancel) onCancel();
    setLocation(null);
  };

  return (
    <div>
      <Select
        showSearch
        style={{ width: 200 }}
        onChange={handleChange}
        placeholder="Select Location"
      >
        {allLocations?.map((l) => (
          <Option key={l.name} value={l.name}>
            {l.name}
          </Option>
        ))}
      </Select>

      <Tooltip title="Cancel">
        <Button
          shape="circle"
          icon={<CloseOutlined />}
          onClick={handleCancel}
        />
      </Tooltip>

      <Tooltip title="Submit">
        <Button
          type="primary"
          shape="circle"
          icon={<CheckOutlined />}
          onClick={handleFinish}
        />
      </Tooltip>
    </div>
  );
}

export default AddToTimelineForm;
