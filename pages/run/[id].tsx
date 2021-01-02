import Head from "next/head";
import useSWR from "swr";
import { useRouter } from "next/router";
import { useState } from "react";

import styles from "styles/Home.module.css";

function Run() {
  const router = useRouter();
  const { id } = router.query;

  const { data } = useSWR(`/api/run/${id}`, fetch);

  if (!data) return "loading";
  else if (data.status === 404) return "404";

  data.json().then(console.log);
  console.log(id);

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
