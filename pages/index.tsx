import { Button } from "components/ui-library/Button";
import Head from "next/head";
import Link from "next/link";
import React from "react";
import styles from "styles/Home.module.css";

function Home() {
  const [showRules, setShowRules] = React.useState<boolean>(false);

  return (
    <div className={styles.container}>
      <Head>
        <title>Soullocke</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>Soullocke</h1>
        <p className={styles.description}>
          A tracker for your{" "}
          <a href="#whatsASoullocke" onClick={() => setShowRules(!showRules)}>
            soul-linked Pokémon Nuzlocke
          </a>{" "}
          runs. Track Pokémon caught across two (or more) trainers.
        </p>

        <div className="flex center">
          {/* <Button children="View" /> */}
          <Link href="/newRun">
            <Button>Start</Button>
          </Link>
        </div>
      </main>

      <section className={styles.section}>
        <h3 id="whatsASoullocke">🔗 What{"'"}s a Soullocke?</h3>
        <p className={styles.description}>
          A Soullocke follows roughly the same rules as a Nuzlocke; but instead
          of playing alone, two or more trainers play together.
        </p>
        <p className={styles.description}>
          Pokémon caught in the same area/route are {`"`}linked{`"`}. They go to
          the team together, to the box together, and to the grave together. If
          one trainer misses a Pokémon on a route, the other trainers too can
          {"'"}t catch.
        </p>
      </section>

      <section className={styles.section}>
        <h3>🤝 Can I Share my Run?</h3>
        <p className={styles.description}>
          Yes! Every run has a unique URL. You can share it with anyone you want
          to collaborate with. Anyone with the URL can edit.
        </p>
      </section>

      <section className={styles.section}>
        <h3>💬 Feedback?</h3>
        <p className={styles.description}>
          This is my passion project and I{"'"}d love to hear any feedback you
          have. You can post suggestions here on{" "}
          <a
            href="https://github.com/jynnie/soullocke/discussions"
            target="_blank"
            rel="noopener noreferrer"
          >
            Github
          </a>
          . This site is also open source, if you{"'"}re interested in
          contributing.
        </p>
      </section>

      <section className={styles.section}>
        <h3>🍀 More Pokémon?</h3>
        <p className={styles.description}>
          Try out my interactive{" "}
          <a
            href="https://typesmart.vercel.app/"
            target="_blank"
            rel="noopener noreferrer"
          >
            Typechart
          </a>
          .
        </p>
      </section>

      <footer className={styles.footer}>
        <span style={{ marginRight: "5px" }}>Made with {"<3"} by </span>
        <a href="https://github.com/jynnie/soullocke">jynnie</a>
      </footer>
    </div>
  );
}

export default Home;
