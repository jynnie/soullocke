import React from "react";
import { cleanName } from "lib/utils";
import type { UseState, MapLocation } from "models";

import styles from "styles/Form.module.scss";
import { Select, Button, Tooltip } from "antd";
import { CloseOutlined, CheckOutlined } from "@ant-design/icons";
const { Option } = Select;

function AddToTimelineForm({
  allLocations,
  allBadges,
  onFinish,
  onCancel,
}: {
  allLocations: MapLocation[];
  allBadges: string[];
  onFinish?: (location: string) => void;
  onCancel?: () => void;
}) {
  const [location, setLocation]: UseState<string> = React.useState(null);

  const handleFinish = () => {
    if (onFinish) onFinish(location);
    setLocation(null);
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
        className={styles.select}
        showSearch
        value={location}
        onChange={handleChange}
        placeholder="Select Location"
      >
        <Option value="starter" className={styles.option}>
          Starter
        </Option>
        {allLocations?.map((l) => (
          <Option key={l.name} value={l.name} className={styles.option}>
            {cleanName(l.name)}
          </Option>
        ))}
        {allBadges?.map((b) => (
          <Option key={b} value={b} className={styles.option}>
            {cleanName(b)}
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
