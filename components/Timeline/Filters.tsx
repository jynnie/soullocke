import React from "react";
import Box from "ui-box";
import { UseState } from "models";

import { Input, Checkbox } from "antd";

export interface Filter {
  hideBadge: boolean;
  hideTeam: boolean;
  hideBox: boolean;
  hideDaycare: boolean;
  hideGrave: boolean;
  searchTerm: string;
}

function TimelineFilters({ onChange }: { onChange: (val: any) => void }) {
  const [hideBadge, setHideBadge]: UseState<boolean> = React.useState(null);
  const [hideTeam, setHideTeam]: UseState<boolean> = React.useState(null);
  const [hideBox, setHideBox]: UseState<boolean> = React.useState(null);
  const [hideDaycare, setHideDaycare]: UseState<boolean> = React.useState(null);
  const [hideGrave, setHideGrave]: UseState<boolean> = React.useState(null);
  const [inputVal, setInputVal]: UseState<string> = React.useState(null);

  const handleSearch = (e) => {
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

  const handleBadge = (e) => {
    setHideBadge(!e.target.checked);
    handleChange({ hideBadge: !e.target.checked });
  };
  const handleTeam = (e) => {
    setHideTeam(!e.target.checked);
    handleChange({ hideTeam: !e.target.checked });
  };
  const handleBox = (e) => {
    setHideBox(!e.target.checked);
    handleChange({ hideBox: !e.target.checked });
  };
  const handleDaycare = (e) => {
    setHideDaycare(!e.target.checked);
    handleChange({ hideDaycare: !e.target.checked });
  };
  const handleGrave = (e) => {
    setHideGrave(!e.target.checked);
    handleChange({ hideGrave: !e.target.checked });
  };

  return (
    <Box className="flex spaceBetween" width="100%" marginBottom={8}>
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
