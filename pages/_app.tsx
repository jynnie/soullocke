import "react-toastify/dist/ReactToastify.css";

import "../styles/globals.scss";
import "../styles/juniper.scss";

import firebase from "firebase";
import firebaseConfig from "firebaseConfig";
import mixpanel from "mixpanel-browser";
import type { AppProps } from "next/app";
import Head from "next/head";
import { useRouter } from "next/router";
import posthog from "posthog-js";
import { PostHogProvider } from "posthog-js/react";
import React from "react";

import { Analytics } from "@vercel/analytics/react";

// Check that PostHog is client-side (used to handle Next.js SSR)
if (typeof window !== "undefined") {
  posthog.init(process.env.NEXT_PUBLIC_POSTHOG_KEY || "", {
    api_host: process.env.NEXT_PUBLIC_POSTHOG_HOST || "https://app.posthog.com",
    // Enable debug mode in development
    loaded: (posthog) => {
      if (process.env.NODE_ENV === "development") posthog.debug();
    },
  });
}

//- Firebase Setup
let db: firebase.database.Database;
try {
  firebase.initializeApp(firebaseConfig);
  db = firebase.database();

  // Point to the RTDB emulator running on localhost.
  if (window.location.hostname === "localhost") {
    db.useEmulator("localhost", 9000);
  }
} catch (error: any) {
  /*
   * We skip the "already exists" message which is
   * not an actual error when we're hot-reloading.
   */
  if (!/already exists/u.test(error.message)) {
    // eslint-disable-next-line no-console
    console.error("Firebase admin initialization error", error.stack);
  }
}
export const FirebaseContext: React.Context<{
  db?: firebase.database.Database;
}> = React.createContext({});

function MyApp({ Component, pageProps }: AppProps | any) {
  React.useEffect(() => {
    mixpanel.init("669064492edee6f09aca23f2ece2beed");
    mixpanel.track("Visit site");
  }, []);

  const router = useRouter();
  React.useEffect(() => {
    // Send this page view
    posthog.capture("$pageview");

    // Track page views
    const handleRouteChange = () => posthog?.capture("$pageview");
    router.events.on("routeChangeComplete", handleRouteChange);

    return () => {
      router.events.off("routeChangeComplete", handleRouteChange);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <PostHogProvider client={posthog}>
        <FirebaseContext.Provider value={{ db }}>
          <Component {...pageProps} />
        </FirebaseContext.Provider>
        <Analytics />
      </PostHogProvider>
    </>
  );
}

export default MyApp;
