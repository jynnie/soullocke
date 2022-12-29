import { Checkbox, Input } from "antd";
import { CheckboxChangeEvent } from "antd/lib/checkbox";
import React from "react";
import Box from "ui-box";

export interface Filter {
  hideBadge: boolean;
  hideTeam: boolean;
  hideBox: boolean;
  hideDaycare: boolean;
  hideGrave: boolean;
  searchTerm: string;
}

function TimelineFilters({ onChange }: { onChange: (val: any) => void }) {
  const [hideBadge, setHideBadge] = React.useState<boolean>(false);
  const [hideTeam, setHideTeam] = React.useState<boolean>(false);
  const [hideBox, setHideBox] = React.useState<boolean>(false);
  const [hideDaycare, setHideDaycare] = React.useState<boolean>(false);
  const [hideGrave, setHideGrave] = React.useState<boolean>(false);
  const [inputVal, setInputVal] = React.useState<string>("");

  const handleSearch: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    setInputVal(e.target.value);
    handleChange({ searchTerm: e.target.value });
  };

  const handleChange = (override?: any) => {
    if (onChange)
      onChange({
        hideBadge,
        hideTeam,
        hideBox,
        hideDaycare,
        hideGrave,
        searchTerm: inputVal,
        ...(override || {}),
      });
  };

  const handleBadge = (e: CheckboxChangeEvent) => {
    setHideBadge(!e.target.checked);
    handleChange({ hideBadge: !e.target.checked });
  };
  const handleTeam = (e: CheckboxChangeEvent) => {
    setHideTeam(!e.target.checked);
    handleChange({ hideTeam: !e.target.checked });
  };
  const handleBox = (e: CheckboxChangeEvent) => {
    setHideBox(!e.target.checked);
    handleChange({ hideBox: !e.target.checked });
  };
  const handleDaycare = (e: CheckboxChangeEvent) => {
    setHideDaycare(!e.target.checked);
    handleChange({ hideDaycare: !e.target.checked });
  };
  const handleGrave = (e: CheckboxChangeEvent) => {
    setHideGrave(!e.target.checked);
    handleChange({ hideGrave: !e.target.checked });
  };

  return (
    <Box className="flex justify-between" width="100%" marginBottom={8}>
      <div>
        <Input placeholder="Search" value={inputVal} onChange={handleSearch} />
      </div>

      <div className="flex">
        <div className="flex center">
          <Checkbox checked={!hideBadge} onChange={handleBadge}>
            Badge
          </Checkbox>
        </div>

        <div className="flex center">
          <Checkbox checked={!hideTeam} onChange={handleTeam}>
            Team
          </Checkbox>
        </div>

        <div className="flex center">
          <Checkbox checked={!hideBox} onChange={handleBox}>
            Box
          </Checkbox>
        </div>

        <div className="flex center">
          <Checkbox checked={!hideDaycare} onChange={handleDaycare}>
            Daycare
          </Checkbox>
        </div>

        <div className="flex center">
          <Checkbox checked={!hideGrave} onChange={handleGrave}>
            Grave
          </Checkbox>
        </div>
      </div>
    </Box>
  );
}

export default TimelineFilters;
