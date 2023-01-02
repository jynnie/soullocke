import React from "react";
import { Search } from "react-feather";
import styles from "styles/Filters.module.scss";
import Box from "ui-box";

export function BoxFilters({ onChange }: { onChange: (val: any) => void }) {
  const [inputVal, setInputVal] = React.useState<string>("");

  const handleSearch: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    setInputVal(e.target.value);
    handleChange({ searchTerm: e.target.value });
  };

  const handleChange = (override?: any) => {
    if (onChange)
      onChange({
        searchTerm: inputVal,
        ...(override || {}),
      });
  };

  return (
    <Box className="flex justify-between" width="100%" marginBottom={8}>
      <div className={styles.search}>
        <Search size="1rem" />
        <input
          type="text"
          placeholder="Search"
          value={inputVal}
          onChange={handleSearch}
        />
      </div>
    </Box>
  );
}
