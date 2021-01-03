import React from "react";
import Head from "next/head";
import firebase from "firebase";
import firebaseConfig from "firebaseConfig";

import "antd/dist/antd.css";
import "../styles/globals.scss";

//- Firebase Setup
let db;
try {
  firebase.initializeApp(firebaseConfig);
  db = firebase.database();
} catch (error) {
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
  db: firebase.database.Database;
}> = React.createContext(null);

function MyApp({ Component, pageProps }) {
  return (
    <>
      <Head>
        <script src="https://www.gstatic.com/firebasejs/7.12.0/firebase-app.js"></script>
        <script src="https://www.gstatic.com/firebasejs/7.12.0/firebase-analytics.js"></script>
      </Head>
      <FirebaseContext.Provider value={{ db }}>
        <Component {...pageProps} />
      </FirebaseContext.Provider>
    </>
  );
}

export default MyApp;
