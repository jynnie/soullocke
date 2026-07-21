import { ContentLayout } from "components/ContentLayout";
import Head from "next/head";
import React from "react";
import styles from "styles/Content.module.css";

export default function TimelineGuide() {
  return (
    <>
      <Head>
        <title>Timeline View Explainer | Guides</title>
        <meta
          name="description"
          content="How the Soullocke timeline works: logging encounters per location, recording missed catches, adding badges, reordering rows, and what the tracker does automatically for linked Pokémon."
        />
      </Head>
      <ContentLayout
        title="Timeline View Explainer"
        description="The Timeline is the heart of your run: one row per location (or badge), one column per trainer. Each row is a soul link — the Pokémon caught at the same spot, side by side."
      >
        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>Reading the table</h2>
          <ul className={styles.list}>
            <li>
              <strong>Origin</strong> — the route, cave, or area name.
            </li>
            <li>
              <strong>One column per trainer</strong> — the Pokémon each of
              you caught there.
            </li>
            <li>
              <strong>Nicknames</strong> and <strong>Location</strong> — where
              the linked pair currently lives: team, box, daycare, or grave.
            </li>
            <li>
              The rightmost column holds each row&apos;s actions:{" "}
              <strong>Notes</strong>, <strong>Move</strong>, and{" "}
              <strong>Delete</strong>.
            </li>
          </ul>
        </section>

        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>Logging an encounter</h2>
          <p className={styles.body}>
            Click the <strong>+</strong> in your column on the location&apos;s
            row, pick the species, and give it a nickname.
          </p>
          <p className={styles.body}>
            <strong>Missed the encounter?</strong> Uncheck the{" "}
            <strong>&quot;Caught&quot;</strong> checkbox before adding. The
            tracker records a missed encounter for you — and automatically
            marks the link as missed for every other trainer too, since a
            skipped link is skipped for everyone.
          </p>
          <p className={styles.body}>
            <strong>Caught by everyone?</strong> The moment the last trainer
            logs their catch, the tracker automatically asks if you want to
            move the new pair to your teams — and if your teams are full, it
            asks which pair to swap out.
          </p>
        </section>

        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>Adding locations and badges</h2>
          <p className={styles.body}>
            At the bottom of the timeline, the{" "}
            <strong>&quot;Add Location or Badge&quot;</strong> select lists
            every location and badge for your region. Two things people miss:
          </p>
          <ul className={styles.list}>
            <li>
              <strong>You can type a custom name.</strong> Playing a romhack,
              or want to split a cave into per-floor encounters? Just type the
              name — you&apos;re not limited to the preset list.
            </li>
            <li>
              <strong>Badges are timeline rows too.</strong> Adding a badge
              drops it into the timeline as a milestone marker. (You can also
              toggle badges by double-clicking them in the Summary tab.)
            </li>
          </ul>
        </section>

        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>
            Reordering, filtering, searching
          </h2>
          <ul className={styles.list}>
            <li>
              <strong>Drag any row</strong> to reorder the timeline — useful
              when you logged something out of order. You&apos;ll see
              &quot;Timeline order change saved&quot; when it sticks.
            </li>
            <li>
              The filter bar has a <strong>search box</strong> (matches
              Pokémon names, nicknames, and locations) and five checkboxes —{" "}
              <strong>Badge, Team, Box, Daycare, Grave</strong> — to hide
              categories of rows while you focus.
            </li>
          </ul>
        </section>

        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>Row actions</h2>
          <ul className={styles.list}>
            <li>
              <strong>Notes</strong> — every location has its own notes. Great
              for &quot;Shiny Feebas&quot; or death eulogies.
            </li>
            <li>
              <strong>Move</strong> — move the linked pair somewhere else
              (team, box, daycare, grave). Moves always apply to the whole
              link across all trainers.
            </li>
            <li>
              <strong>Delete</strong> — removes the row{" "}
              <em>and the Pokémon caught there</em> (it asks first).
            </li>
          </ul>
        </section>

        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>
            Recording events: evolutions, deaths, moves
          </h2>
          <p className={styles.body}>
            Click a Pokémon&apos;s icon in the timeline to open its detail
            card. You&apos;ll see its full event history — caught, moved,
            evolved, defeated — and an <strong>&quot;Add Event&quot;</strong>{" "}
            button while it&apos;s alive:
          </p>
          <ul className={styles.list}>
            <li>
              <strong>Evolved</strong> — pick what it evolved into. Its
              picture updates everywhere.
            </li>
            <li>
              <strong>Defeated</strong> — marks it dead and moves it to the
              grave, and the tracker automatically sends its soul-linked
              partner(s) to the grave with it.
            </li>
            <li>
              <strong>Moved</strong> — logs a manual move (e.g. to the
              daycare).
            </li>
          </ul>
          <p className={styles.body}>
            One warning worth repeating from the app:{" "}
            <em>editing or deleting a past event</em> only affects that one
            Pokémon — unlike the live actions above, corrections don&apos;t
            cascade to linked partners, so fix both sides if you fix one.
          </p>
        </section>
      </ContentLayout>
    </>
  );
}
