import { ContentLayout } from "components/ContentLayout";
import Head from "next/head";
import React from "react";
import styles from "styles/Content.module.css";

export default function About() {
  return (
    <>
      <Head>
        <title>About | Soullocke – Soul-linked Nuzlocke Tracker</title>
        <meta
          name="description"
          content="About Soullocke: a free tracker for soul-linked Pokémon Nuzlocke runs. Track encounters, teams, and progress across two or more trainers."
        />
      </Head>
      <ContentLayout
        title="About Soullocke"
        description="Soullocke is a free web app for tracking soul-linked Nuzlocke runs with a friend (or more)."
      >
        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>What is Soullocke?</h2>
          <p className={styles.body}>
            A <strong>Soullocke</strong> (or soul-linked Nuzlocke) is a
            cooperative twist on the classic Nuzlocke challenge. Instead of
            playing alone, two or more trainers play through the same Pokémon
            game (or paired games) with their catches &quot;soul-linked.&quot;
            Pokémon caught on the same route or area are linked: they join the
            team together, get boxed together, and if one faints, the linked
            partner is lost too.
          </p>
          <p className={styles.body}>
            Soullocke the app helps you run these challenges by tracking every
            encounter, team change, and event in one shared place. Everyone with
            the run link can view and edit in real time—no accounts required.
          </p>
        </section>

        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>Features</h2>
          <ul className={styles.list}>
            <li>Track Pokémon caught per route/area for each trainer</li>
            <li>Timeline view of soul-linked teams and catches</li>
            <li>Box management: move Pokémon between team and PC</li>
            <li>Event log: badge wins, deaths, key story moments</li>
            <li>Filter and search your Pokémon</li>
            <li>Works on all mainline games (Kanto through Paldea)</li>
          </ul>
        </section>

        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>Who made this?</h2>
          <p className={styles.body}>
            Soullocke is a passion project by{" "}
            <a
              href="https://github.com/jynnie"
              target="_blank"
              rel="noopener noreferrer"
            >
              jynnie
            </a>
            . It&apos;s built with Next.js and Firebase, and uses{" "}
            <a
              href="https://pokeapi.co/"
              target="_blank"
              rel="noopener noreferrer"
            >
              PokéAPI
            </a>{" "}
            for Pokémon data. The app is free to use. If you enjoy it, you can{" "}
            <a
              href="https://ko-fi.com/jynnie"
              target="_blank"
              rel="noopener noreferrer"
            >
              buy me a coffee on Ko-fi
            </a>{" "}
            or share feedback and ideas on{" "}
            <a
              href="https://github.com/jynnie/soullocke/discussions"
              target="_blank"
              rel="noopener noreferrer"
            >
              GitHub Discussions
            </a>
            .
          </p>
        </section>

        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>More from the creator</h2>
          <p className={styles.body}>
            If you like Pokémon tools, check out{" "}
            <a
              href="https://typesmart.vercel.app/"
              target="_blank"
              rel="noopener noreferrer"
            >
              TypeSmart
            </a>
            —an interactive type chart for planning matchups.
          </p>
        </section>
      </ContentLayout>
    </>
  );
}
