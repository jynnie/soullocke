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

  const handleBadge = (e?: React.ChangeEvent<HTMLInputElement>) => {
    const newVal = !!e ? !e.target.checked : !hideBadge;
    setHideBadge(newVal);
    handleChange({ hideBadge: newVal });
  };
  const handleTeam = (e?: React.ChangeEvent<HTMLInputElement>) => {
    const newVal = !!e ? !e.target.checked : !hideTeam;
    setHideTeam(newVal);
    handleChange({ hideTeam: newVal });
  };
  const handleBox = (e?: React.ChangeEvent<HTMLInputElement>) => {
    const newVal = !!e ? !e.target.checked : !hideBox;
    setHideBox(newVal);
    handleChange({ hideBox: newVal });
  };
  const handleDaycare = (e?: React.ChangeEvent<HTMLInputElement>) => {
    const newVal = !!e ? !e.target.checked : !hideDaycare;
    setHideDaycare(newVal);
    handleChange({ hideDaycare: newVal });
  };
  const handleGrave = (e?: React.ChangeEvent<HTMLInputElement>) => {
    const newVal = !!e ? !e.target.checked : !hideGrave;
    setHideGrave(newVal);
    handleChange({ hideGrave: newVal });
  };

  return (
    <Box className="flex justify-between" width="100%" marginBottom={8}>
      <div>
        <input
          type="text"
          placeholder="Search"
          value={inputVal}
          onChange={handleSearch}
        />
      </div>

      <div className="flex gap-2">
        <div className="flex center gap-1">
          <input
            className="cursor-pointer"
            type="checkbox"
            checked={!hideBadge}
            onChange={handleBadge}
          />
          <label className="cursor-pointer" onClick={() => handleBadge()}>
            Badge
          </label>
        </div>

        <div className="flex center gap-1">
          <input
            className="cursor-pointer"
            type="checkbox"
            checked={!hideTeam}
            onChange={handleTeam}
          />
          <label className="cursor-pointer" onClick={() => handleTeam()}>
            Team
          </label>
        </div>

        <div className="flex center gap-1">
          <input
            className="cursor-pointer"
            type="checkbox"
            checked={!hideBox}
            onChange={handleBox}
          />
          <label className="cursor-pointer" onClick={() => handleBox()}>
            Box
          </label>
        </div>

        <div className="flex center gap-1">
          <input
            className="cursor-pointer"
            type="checkbox"
            checked={!hideDaycare}
            onChange={handleDaycare}
          />
          <label className="cursor-pointer" onClick={() => handleDaycare()}>
            Daycare
          </label>
        </div>

        <div className="flex center gap-1">
          <input
            className="cursor-pointer"
            type="checkbox"
            checked={!hideGrave}
            onChange={handleGrave}
          />
          <label className="cursor-pointer" onClick={() => handleGrave()}>
            Grave
          </label>
        </div>
      </div>
    </Box>
  );
}

export default TimelineFilters;
