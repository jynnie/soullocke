import classNames from "classnames";
import { Button } from "components/ui-library/Button";
import { SearchableSelect } from "components/ui-library/SearchableSelect";
import type { MapLocation } from "models";
import React from "react";
import { Plus } from "react-feather";
import { capitalize, cleanName } from "utils/utils";

function AddToTimelineForm({
  allLocations,
  allBadges,
  onFinish,
}: {
  allLocations: MapLocation[];
  allBadges: string[];
  onFinish?: (location: string) => void;
}) {
  const [location, setLocation] = React.useState<string | undefined>(undefined);

  const handleFinish = () => {
    if (location) onFinish?.(location);
    setLocation(undefined);
  };

  const handleChange = (value?: string) => {
    setLocation(value);
  };

  return (
    <form className="flex gap-2 my-4 items-center" method="dialog">
      <SearchableSelect
        className="subtle"
        options={[
          ...allLocations?.map((l) => ({
            value: l.name,
            label: capitalize(cleanName(l.name)),
          })),
          ...allBadges?.map((b) => ({
            value: b,
            label: capitalize(cleanName(b)),
          })),
        ]}
        value={location}
        onChange={handleChange}
        placeholder="Add Location or Badge"
        allowCustom
      />

      <Button
        className={classNames("icon", { text: !location })}
        icon={<Plus />}
        onClick={handleFinish}
        disabled={!location}
      />
    </form>
  );
}

export default AddToTimelineForm;
