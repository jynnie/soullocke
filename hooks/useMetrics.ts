import mixpanel from "mixpanel-browser";
import React from "react";

export function useMetrics(componentName: string, requiredKey: any, data: any) {
  React.useEffect(() => {
    if (componentName && requiredKey) {
      mixpanel.time_event(componentName);
      mixpanel.track("Start Run Session", data);
    }

    function trackEvent() {
      if (componentName && requiredKey) {
        if (data) mixpanel.track(componentName, data);
        if (!data) mixpanel.track(componentName);
        mixpanel.track("End Run Session", data);
      }
    }

    window.addEventListener("unload", trackEvent);

    return () => {
      window.removeEventListener("unload", trackEvent);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [requiredKey]);
}
