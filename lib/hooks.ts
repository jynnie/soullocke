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

    function trackEvent() {
      if (componentName && requiredKey) {
        if (data) mixpanel.track(componentName, data);
        if (!data) mixpanel.track(componentName);
      }
    }

    window.addEventListener("unload", trackEvent);

    return () => {
      window.removeEventListener("unload", trackEvent);
    };
  }, [requiredKey]);
}
