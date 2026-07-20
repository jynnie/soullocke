import { Button } from "components/ui-library/Button";
import mixpanel from "mixpanel-browser";
import Head from "next/head";
import Link from "next/link";
import React from "react";
import styles from "styles/Home.module.css";

function Home() {
  const [showRules, setShowRules] = React.useState<boolean>(false);

  return (
    <div className={styles.container}>
      <Head>
        <title>Soullocke – Soul-linked Pokémon Nuzlocke Tracker</title>
        <meta
          name="description"
          content="Free real-time tracker for soul-linked Pokémon Nuzlocke runs. Track encounters, linked Pokémon, teams, and deaths across two or more trainers—no account needed."
        />
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
          <Link href="/newRun">
            <Button className={styles.startButton}>Start Your Run</Button>
          </Link>
        </div>
      </main>

      <section className={styles.section}>
        <h3 id="whatsASoullocke">🔗 What{"'"}s a Soullocke?</h3>
        <p className={styles.description}>
          A Soullocke is a special variant of a Nuzlocke where two (or more) trainers play Pokémon simultaneously and their encounters are &quot;soul-linked&quot; together.
        </p>
        <p className={styles.description}>
          Pokémon caught in the same area/route are {`"`}linked{`"`}. They go to
          the team together, to the box together, and to the grave together. If
          one trainer misses a Pokémon on a route, the other trainers too can
          {"'"}t catch.
        </p>
        <p className={styles.description}>
          The perfect way to take your challenge run to the next level and play Pokémon with friends.
        </p>
        <p className={styles.description}>
          Read a <Link href="/rules">full rules guide here</Link> for more information.
        </p>
        <p className={styles.description}>
          Tracking which Pokémon are soul-linked together and their state can be tedious, but this tracker makes it easy. Just add Pokémon based on the encounter location and easily manage your teams and grave. Press start to begin your run.
        </p>
        <p className={styles.description}>
          Confused about how to use the tracker? Check out our <Link href="/guides">getting started guide</Link>.
        </p>
      </section>

      <section className={styles.section}>
        <h3>🤝 Can I Share my Run?</h3>
        <p className={styles.description}>
          Yes! Every run has a unique URL you can copy and share. Share it with anyone you want
          to collaborate with. Anyone with the URL can edit the run.
        </p>
        <p className={styles.description}>
          Your run information will be live-updated for all players. So you can manage your teams in real-time.
        </p>
      </section>

      <section className={styles.section}>
        <h3>💬 Feedback?</h3>
        <p className={styles.description}>
          This is my passion project and I{"'"}d love to hear any feedback you
          have. I am an avid soullocke player and can no longer play Pokémon any other way. Managing my runs with my friend was a pain, so I built this tracker to make it easier. I wanted it to be real-time, easy to use, minimalist, and free. Hope it can help you too!
        </p>
        <p className={styles.description}>
          You can post suggestions here on{" "}
          <a
            href="https://github.com/jynnie/soullocke/discussions"
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => mixpanel.track("Github button")}
          >
            Github
          </a>
          . If you&apos;re feeling generous, you can{" "}
          <a
            href="https://ko-fi.com/jynnie"
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => mixpanel.track("Coffee button")}
          >
            buy me a coffee
          </a>
          .
        </p>
      </section>

      <section className={styles.section}>
        <h3>🗞️ State of the Project</h3>
        <p className={styles.description}>
          The tracker is feature complete for now. I will be adding more features in the future, but for now, it is ready to use. Below are features slated for future development.
        </p>
        <ul className={styles.list}>
          <li>Mobile support</li>
          <li>Shiny tracking</li>
          <li>Option for shared type rule guidance</li>
          <li>Password lock for editing</li>
        </ul>
        <p className={styles.description}>
          You can follow the project on{" "}
          <a
            href="https://github.com/jynnie/soullocke/discussions"
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => mixpanel.track("Github button")}
          >
            Github
          </a>
          .
        </p>
      </section>

      <section className={styles.section}>
        <h3>📖 Rules & Guides</h3>
        <p className={styles.description}>
          Read the full rules and guides for more information about the Soullocke variant of the Nuzlocke challenge.
        </p>
        <p className={styles.description}>
          <Link href="/rules">Rules</Link>
          {" · "}
          <Link href="/about">About</Link>
          {" · "}
          <Link href="/guides/getting-started">Getting Started</Link>
          {" · "}
          <Link href="/guides">Guides</Link>
          {" · "}
          <Link href="/privacy">Privacy</Link>
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
        <span style={{ margin: "0 8px", opacity: 0.5 }}>·</span>
        <Link href="/privacy">Privacy</Link>
      </footer>
    </div>
  );
}

export default Home;
