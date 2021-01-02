import React from "react";
import Head from "next/head";
import { useRouter } from "next/router";

import styles from "styles/Home.module.css";

import { FirebaseContext } from "pages/_app";

function Run() {
  const router = useRouter();
  const { id } = router.query;

  const { db } = React.useContext(FirebaseContext);

  db?.ref(id)
    .once("value")
    .then((s) => console.log(s.val()));

  return (
    <div className={styles.container}>
      <Head>
        <title>Soullocke</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h2>Run</h2>
      </main>
    </div>
  );
}

export default Run;
