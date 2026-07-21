import { ContentLayout } from "components/ContentLayout";
import Head from "next/head";
import React from "react";
import styles from "styles/Content.module.css";

export default function SummaryGuide() {
  return (
    <>
      <Head>
        <title>Summary View Explainer | Guides</title>
        <meta
          name="description"
          content="How the Soullocke Summary tab works: tracking gym badges with a double-click, viewing both trainers' teams side by side, and honoring the graveyard."
        />
      </Head>
      <ContentLayout
        title="Summary View Explainer"
        description="The Summary tab is your run at a glance — the screen you screenshot when the run ends, or when your linked pair finally clutches a gym. It reads top to bottom like a trophy shelf."
      >
        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>Badges: double-click to earn</h2>
          <p className={styles.body}>
            Every badge for your region lines the top of the Summary. Earned
            badges glow; unearned ones sit dimmed.
          </p>
          <ul className={styles.list}>
            <li>
              <strong>Double-click a badge to mark it earned.</strong> (Hover
              for a hint tooltip — it&apos;s a double-click, not a single
              click, which is easy to miss.)
            </li>
            <li>
              Earning a badge also adds it as a{" "}
              <strong>milestone row on your Timeline</strong>, so your badge
              history sits in chronological order alongside your catches.
            </li>
            <li>
              <strong>Double-click again to un-earn it</strong> — which also
              removes that timeline row.
            </li>
          </ul>
          <p className={styles.body}>
            You can also add badges from the Timeline&apos;s &quot;Add
            Location or Badge&quot; select; both surfaces stay in sync because
            a badge <em>is</em> a timeline row.
          </p>
        </section>

        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>Teams, face to face</h2>
          <p className={styles.body}>
            Below the badges, each trainer&apos;s current team lines up facing
            the other — sprites and nicknames, linked pairs in formation.
            Sprites always show the <strong>latest evolution</strong>{" "}
            automatically: log an evolution event on the Timeline and the
            Summary updates itself.
          </p>
        </section>

        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>🪦 The graveyard</h2>
          <p className={styles.body}>
            The fallen, remembered forever, shown for each trainer. In a
            soullocke the graveyard fills two-by-two — every loss here is a
            pair.
          </p>
        </section>

        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>🖥 The box</h2>
          <p className={styles.body}>Everyone on the bench, per trainer.</p>
        </section>

        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>
            What Summary is (and isn&apos;t) for
          </h2>
          <p className={styles.body}>
            Summary is read-only by design, with one exception — badge
            toggling. To log catches, deaths, moves, or evolutions, use the{" "}
            <strong>Timeline</strong>; to rearrange teams, use the{" "}
            <strong>Box</strong> tab or the Timeline&apos;s Move flow. Summary
            is for seeing where the run stands, and for showing off.
          </p>
        </section>
      </ContentLayout>
    </>
  );
}
