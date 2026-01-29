import { ContentLayout } from "components/ContentLayout";
import Head from "next/head";
import Link from "next/link";
import React from "react";
import styles from "styles/Content.module.css";

export default function Rules() {
  return (
    <>
      <Head>
        <title>Soullocke Rules | Soullocke</title>
        <meta
          name="description"
          content="Quick summary of Soullocke and Nuzlocke rules: encounter rules, fainting = death, soul-linking, and common variants."
        />
      </Head>
      <ContentLayout
        title="Soullocke Rules"
        description="A concise summary of the standard Nuzlocke and Soullocke (soul-linked) rules. Adjust to your group's preference."
      >
        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>Core Nuzlocke Rules</h2>
          <p className={styles.body}>
            The Nuzlocke challenge adds three main rules to a normal Pokémon
            playthrough:
          </p>
          <ul className={styles.list}>
            <li>
              <strong>One encounter per area:</strong> You may only catch the
              first Pokémon you encounter in each route, cave, or named area. If
              you knock it out or run, you get no catch for that area.
            </li>
            <li>
              <strong>Fainting = death:</strong> If a Pokémon faints, it is
              considered dead and must be released or permanently boxed. You
              cannot use it again. Revival methods are forbidden.
            </li>
            <li>
              <strong>Lose when no Pokémon remain:</strong> If the player runs out of living Pokémon, the run is considered lost and the challenge failed.
            </li>
          </ul>
          <p className={styles.body}>
            There are near universal rules that players add to the Nuzlocke challenge. These include:
          </p>
          <ul className={styles.list}>
            <li>
              <strong>Nickname everything:</strong> You must give every Pokémon a nickname.
            </li>
            <li>
              <strong>Gift Pokémon count as separate encounters:</strong>
              If a Pokémon is given to you as a gift from an NPC, it counts as a separate encounter that the one for that area.
            </li>
            <li>
              <strong>Full wipe:</strong>
              A black out or white out screen is considered game over, even if there are live Pokémon in the box.
            </li>
            <li>
              <strong>No outside trading:</strong>
              You cannot trade Pokémon with other players outside of the game or gain Pokémon through other means such as Mystery Gifts.
            </li>
            <li>
              <strong>No resets:</strong>
              You cannot reset the game or use any save states to undo progress.
            </li>
          </ul>
          <p className={styles.body}>
            Many players add additional optional rules (e.g. no
            overleveling the next gym leader, no items in battle). The Soullocke adds a cooperative layer on top of these.
          </p>
        </section>

        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>Soullocke (Soul-Linked) Rules</h2>
          <p className={styles.body}>
            A Soullocke is a collaborative Nuzlocke run. Two or more trainers play runs simultaneously and their encounters are &quot;soul-linked&quot; together. The link applies to encounters and fates:
          </p>
          <ul className={styles.list}>
            <li>
              <strong>Linked encounters:</strong> Each route/area has one
              &quot;slot&quot; per trainer. The first encounter in that area for
              Trainer A is linked to the first encounter in the same area for
              Trainer B (and C, etc.). Those Pokémon form a link.
            </li>
            <li>
              <strong>Same team, same box:</strong> Linked Pokémon must be
              treated the same. If one goes to the team, the other goes to the
              team. If one is boxed, the other is boxed. You can&apos;t use one
              linked Pokémon while the other sits in the PC.
            </li>
            <li>
              <strong>Shared fate:</strong> If a linked Pokémon faints, the
              linked partner(s) are also considered dead and must be released or
              permanently boxed.
            </li>
            <li>
              <strong>Missed encounters:</strong> If one trainer has no valid
              encounter in an area (e.g. already caught there, or first
              encounter fled), the other trainer(s) also cannot use that area
              for a catch—the link is skipped for that area.
            </li>
            <li>
              <strong>Play together:</strong> Players should generally progress through encounters together. One player should not be battling the gym leader while the other is catching Pokémon. This is to ensure that both players keep their Pokémon soul-linked.
            </li>
          </ul>
          <p className={styles.body}>
            Like Nuzlockes, Soullockes often have additional optional rules that players can agree on.
          </p>
          <ul className={styles.list}>
            <li>
              <strong>Dupes clause:</strong> If the first encounter is a species you already own, you may skip it and get one more encounter in that area (often until you get a new species).
            </li>
            <li>
              <strong>Primary type restriction:</strong> No Pokémon with the same primary type can be in the team at the same time.
            </li>
          </ul>
          <p className={styles.body}>
            I recommend playing with the dupes clause, but not the primary type restriction. I especially recommend omitting the primary type restiction if you are playing with more than two players.
          </p>
        </section>

        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>Track your run</h2>
          <p className={styles.body}>
            Use{" "}
            <Link href="/">Soullocke</Link> to track encounters, teams, and
            events for your soul-linked run. Share one link with your co-op
            partner and keep everything in sync. For a step-by-step, see our{" "}
            <Link href="/guides/getting-started">Getting started guide</Link>.
          </p>
        </section>
      </ContentLayout>
    </>
  );
}
