import { ContentLayout } from "components/ContentLayout";
import Head from "next/head";
import Link from "next/link";
import React from "react";
import styles from "styles/Content.module.css";

export default function GettingStartedGuide() {
  return (
    <>
      <Head>
        <title>Getting started with the Soullocke tracker | Guides</title>
        <meta
          name="description"
          content="Create a Soul Locke run, add locations and Pokémon, and share the link with your co-op partner. Step-by-step guide to the Soullocke tracker."
        />
      </Head>
      <ContentLayout
        title="Getting started with the Soullocke tracker"
        description="From creating a run to logging your first catches—here's how to use Soullocke for your soul-linked Nuzlocke."
      >
        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>1. Create a new run</h2>
          <p className={styles.body}>
            On the <Link href="/">home page</Link>, click <strong>Start</strong>
            .
          </p>
          <p className={styles.body}>
            You&apos;ll be asked to pick a game and names for your trainers—e.g.
            &quot;Red&quot; and &quot;Blue&quot;. The game you select will
            determine badge and location suggestions.
          </p>
          <p className={styles.body}>
            Once you create the run, you&apos;ll get a unique URL. That URL is
            your run. Anyone with the link can view and edit.
          </p>
        </section>

        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>2. Add encounters</h2>
          <p className={styles.body}>
            The tracker is organized by encounter locations (routes, towns,
            caves, etc.). As you progress in-game, add a new encounter when you
            reach a new area. You can name it to match your game (e.g.
            &quot;Route 1&quot;, &quot;Viridian Forest&quot;). Encounter
            locations show up on the timeline and in the box view so you can see
            where each Pokémon was caught.
          </p>
          <p className={styles.body}>
            Based on the game you selected, you will have a list of locations to
            choose from. You can always add a custom location too (useful if you
            are gifted a Pokémon from an NPC and want to track that as a
            separate encounter).
          </p>
          <p className={styles.body}>
            You can also log badges earned as a location.
          </p>
        </section>

        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>3. Log your catches</h2>
          <p className={styles.body}>
            When you encounter a Pokémon on a route, add it to that location in
            the tracker. You can log whether you missed the encounter or caught
            it.
          </p>
          <p className={styles.body}>
            Pick the species and which trainer caught it. Soul-linked Pokémon
            are caught in the same location by different trainers—so when your
            partner catches their first encounter on the same route, add that
            too. The app will link them automatically so you can see which
            Pokémon are paired.
          </p>
          <p className={styles.body}>
            You can enter the nicknames for the Pokémon too.
          </p>
        </section>

        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>4. Manage your team and box</h2>
          <p className={styles.body}>
            Linked Pokémon need to stay in sync: if one is on the team, the
            other must be on the team; if one is boxed, the other is boxed. Use
            the tracker to move Pokémon between your active team and the PC.
            When a linked Pokémon faints, mark it (and its partner) as dead so
            they&apos;re moved to the &quot;grave&quot; and no longer count as
            usable.
          </p>
          <p className={styles.body}>
            In the Timeline, do this by clicking &quot;Move&quot; button on the
            row. You can select at which location you made this change. Then
            choose whether you are moving to the team, the PC, the daycare, or
            the grave.
          </p>
          <p className={styles.body}>
            In the Box view, you can drag and drop Pokémon between the team, the
            box, the daycare, and the grave.
          </p>
        </section>

        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>5. Add events (optional)</h2>
          <p className={styles.body}>
            You can log events like earning a badge, beating a rival, or
            reaching a milestone. That helps you and your partner see progress
            on the timeline and keeps the run story in one place.
          </p>
          <p className={styles.body}>
            When your Pokémon evolve, you can log the evolution. The
            Pokémon&apos;s icon will change to match.
          </p>
        </section>

        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>Sharing and syncing</h2>
          <p className={styles.body}>
            All changes save in real time. Share the run URL with your co-op
            partner—they can open it on their phone or computer and add their
            catches, move Pokémon, and log events. No account is required. For a
            quick refresher on Soul Locke rules, see our{" "}
            <Link href="/rules">Rules summary</Link>.
          </p>
        </section>

        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>Try it yourself</h2>
          <p className={styles.body}>
            You can play with the tracker yourself in this{" "}
            <Link href="/run/ardavark">playground run</Link>. If someone else is
            also playing with it, you might see them make changes as well.
          </p>
        </section>
      </ContentLayout>
    </>
  );
}
