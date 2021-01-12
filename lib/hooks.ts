import React from "react";

export const useToUpdate = (value) => {
  const [, setUpdater] = React.useState(Math.random());

  React.useEffect(() => {
    setUpdater(Math.random());
  }, [value]);
};
