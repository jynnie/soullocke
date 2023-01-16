import cn from "classnames";
import { Button } from "components/ui-library/Button";
import { TooltipContent } from "components/ui-library/TooltipContent";
import { useDeleteLocation } from "hooks/useDeleteLocation";
import React, { useState } from "react";
import { Info } from "react-feather";
import styles from "styles/Location.module.scss";

import Tippy from "@tippyjs/react";

export function DeleteLocation({
  locationKey,
  setIsMiniMenuOpen,
}: {
  locationKey: string;
  setIsMiniMenuOpen: (value: boolean) => void;
}) {
  const [isShow, setShow] = useState(false);
  const deleteLocation = useDeleteLocation(locationKey);

  const hide = () => {
    setShow(false);
    setIsMiniMenuOpen(false);
  };
  const show = () => {
    setShow(true);
    setIsMiniMenuOpen(true);
  };

  return (
    <Tippy
      content={
        <TooltipContent className={styles.deleteConfirm}>
          <div className="flex gap-1 py-1">
            <Info className="mt-1 flex-shrink-0" size="1rem" />

            <div className="flex flex-col gap-1">
              <p className="m-0">
                Are you sure you want to delete this location?
              </p>
              <p className="m-0 caption">
                (The Pokémon caught at this location will be deleted as well)
              </p>

              <div className="flex gap-1 justify-end mt-1">
                <Button className="outline" onClick={hide}>
                  No
                </Button>
                <Button
                  className="danger"
                  onClick={async () => {
                    await deleteLocation();
                    hide();
                  }}
                >
                  Yes
                </Button>
              </div>
            </div>
          </div>
        </TooltipContent>
      }
      visible={isShow}
      onClickOutside={hide}
      interactive
    >
      <span>
        <Button className={cn("text danger no-underline")} onClick={show}>
          Delete
        </Button>
      </span>
    </Tippy>
  );
}

export default DeleteLocation;
