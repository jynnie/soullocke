import Head from "next/head";
import styles from "styles/Home.module.css";

function Home() {
  return (
    <div className={styles.container}>
      <Head>
        <title>Soullocke</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>Soullocke</h1>
      </main>

      <footer className={styles.footer}>Made with {"<3"} by jynnie</footer>
    </div>
  );
}

export default Home;
