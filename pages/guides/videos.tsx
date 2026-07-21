import { ContentLayout } from "components/ContentLayout";
import Head from "next/head";
import Link from "next/link";
import React from "react";
import styles from "styles/Content.module.css";

export default function VideosGuide() {
  return (
    <>
      <Head>
        <title>Cool Nuzlocke & Soullocke Videos to Watch | Guides</title>
        <meta
          name="description"
          content="The soul link Nuzlocke videos that made the format famous — Jaiden Animations and Alpharad's randomized soul link, plus more great challenge runs to watch before starting your own."
        />
      </Head>
      <ContentLayout
        title="Cool Nuzlocke & Soullocke Videos to Watch"
        description="Want to see what a soul-linked run actually feels like before starting one? These are the videos that made the format famous, plus a few favorites from the wider Nuzlocke community."
      >
        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>
            Jaiden Animations &amp; Alpharad — the randomized soul link
          </h2>
          <p className={styles.body}>
            The video that introduced millions of people to soul links: Jaiden
            and Alpharad ran a randomized Pokémon HeartGold/SoulSilver soul
            link, and each told the story from their own side.
          </p>
          <ul className={styles.list}>
            <li>
              <a
                href="https://www.youtube.com/watch?v=HePvLYiZVko"
                target="_blank"
                rel="noopener noreferrer"
              >
                I Attempted a Two Player Nuzlocke
              </a>{" "}
              — Jaiden&apos;s animated retelling (Dec 2021; it hit #1
              trending)
            </li>
            <li>
              <a
                href="https://www.youtube.com/watch?v=IZJdHi0lwVk"
                target="_blank"
                rel="noopener noreferrer"
              >
                Jaiden and I attempted a 2 Person Nuzlocke
              </a>{" "}
              — Alpharad&apos;s side of the same run
            </li>
          </ul>
          <p className={styles.body}>
            Watch both — half the fun is seeing the same deaths from two
            perspectives.
          </p>
        </section>

        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>
            Alpharad × PokémonChallenges
          </h2>
          <ul className={styles.list}>
            <li>
              <a
                href="https://www.youtube.com/watch?v=1SLixAV6xxc"
                target="_blank"
                rel="noopener noreferrer"
              >
                Attempting a SOUL LINK with PokémonChallenges...
              </a>{" "}
              — a casual YouTuber paired with one of the most experienced
              hardcore Nuzlockers alive. Great for seeing how much rule
              discipline matters.
            </li>
            <li>
              More runs on{" "}
              <a
                href="https://www.youtube.com/playlist?list=PLxFyf9PFwQ3wNp_Ftfo2Is3NsBh4GXE82"
                target="_blank"
                rel="noopener noreferrer"
              >
                Alpharad&apos;s Nuzlocke playlist
              </a>
              .
            </li>
          </ul>
        </section>

        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>PointCrow — the speedrun angle</h2>
          <ul className={styles.list}>
            <li>
              <a
                href="https://www.youtube.com/watch?v=WMk9noyqRvw"
                target="_blank"
                rel="noopener noreferrer"
              >
                Attempting a Two Player Nuzlocke Speedrun
              </a>{" "}
              — what happens when speedrunners apply race pace to a linked
              run.
            </li>
            <li>
              <a
                href="https://www.youtube.com/watch?v=dhetyAiBMf8"
                target="_blank"
                rel="noopener noreferrer"
              >
                PointCrow And I Did A Two Player Nuzlocke
              </a>{" "}
              — PokémonChallenges&apos; side of a PointCrow pairing.
            </li>
          </ul>
        </section>

        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>
            Great solo Nuzlockes (for the storytelling)
          </h2>
          <p className={styles.body}>
            Not soul links, but the videos that set the bar for Nuzlocke
            storytelling — and the best way to learn encounter discipline
            before dragging a friend in:
          </p>
          <ul className={styles.list}>
            <li>
              <a
                href="https://www.youtube.com/@jaidenanimations"
                target="_blank"
                rel="noopener noreferrer"
              >
                Jaiden Animations
              </a>{" "}
              — her animated solo runs, &quot;I Attempted my First Pokemon
              Nuzlocke&quot; (Ruby) and the Platinum hardcore Nuzlocke.
            </li>
            <li>
              The hardcore Nuzlocke community around{" "}
              <a
                href="https://www.youtube.com/@pChalTV"
                target="_blank"
                rel="noopener noreferrer"
              >
                PokémonChallenges
              </a>{" "}
              — long-form runs with deep strategy talk.
            </li>
          </ul>
        </section>

        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>Watching as homework</h2>
          <p className={styles.body}>
            If you&apos;re about to start your own run, watch for these things
            instead of just the jokes:
          </p>
          <ul className={styles.list}>
            <li>
              <strong>How they agree on rules upfront</strong> — and what
              happens when they didn&apos;t.
            </li>
            <li>
              <strong>When they choose to sacrifice</strong> — and how
              differently that math works when a partner loses a Pokémon too.
            </li>
            <li>
              <strong>How they track everything.</strong> Spreadsheets, notes,
              memory... (This is the part{" "}
              <Link href="/guides/getting-started">we can help with</Link>.)
            </li>
          </ul>
          <p className={styles.body}>
            Know a run that belongs on this list? Suggest it on{" "}
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
      </ContentLayout>
    </>
  );
}
