import Head from "next/head";
import Link from "next/link";
import styles from "styles/Home.module.css";

import { Button } from "antd";

function Home() {
  return (
    <div className={styles.container}>
      <Head>
        <title>Soullocke</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>Soullocke</h1>
        <div className="flex center">
          {/* <Button children="View" /> */}
          <Link href="/newRun">
            <Button type="primary" children="New" />
          </Link>
        </div>
      </main>

      <footer className={styles.footer}>Made with {"<3"} by jynnie</footer>
    </div>
  );
}

export default Home;
