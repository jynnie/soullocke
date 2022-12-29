import "../styles/globals.scss";
import "../styles/juniper.scss";

import firebase from "firebase";
import firebaseConfig from "firebaseConfig";
import mixpanel from "mixpanel-browser";
import type { AppProps } from "next/app";
import Head from "next/head";
import React from "react";

//- Firebase Setup
let db: firebase.database.Database;
try {
  firebase.initializeApp(firebaseConfig);
  db = firebase.database();
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

  return (
    <>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <FirebaseContext.Provider value={{ db }}>
        <Component {...pageProps} />
      </FirebaseContext.Provider>
    </>
  );
}

export default MyApp;
