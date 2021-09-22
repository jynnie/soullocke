import React from "react";
import mixpanel from "mixpanel-browser";

export const useToUpdate = (value) => {
  const [, setUpdater] = React.useState(Math.random());

  React.useEffect(() => {
    setUpdater(Math.random());
  }, [value]);
};

export function useMetrics(componentName: string, requiredKey: any, data: any) {
  React.useEffect(() => {
    if (componentName && requiredKey) {
      mixpanel.time_event(componentName);
    }

    return () => {
      if (componentName && data) mixpanel.track(componentName, data);
      if (componentName && !data) mixpanel.track(componentName);
    };
  }, [requiredKey]);
}
