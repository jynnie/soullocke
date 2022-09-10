import React from "react";

export function useToUpdate<T>(value: T) {
  const [, setUpdater] = React.useState(Math.random());

  React.useEffect(() => {
    setUpdater(Math.random());
  }, [value]);
}
