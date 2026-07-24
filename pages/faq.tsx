import { ContentLayout } from "components/ContentLayout";
import Head from "next/head";
import Link from "next/link";
import React from "react";
import styles from "styles/Content.module.css";

export default function Faq() {
  return (
    <>
      <Head>
        <title>FAQ | Soullocke – Soul-linked Nuzlocke Tracker</title>
        <meta
          name="description"
          content="Frequently asked questions about the Soullocke tracker: saving, sharing, accounts, supported games, evolutions, and what soul-linking means."
        />
      </Head>
      <ContentLayout
        title="Frequently Asked Questions"
        description="Quick answers about the Soullocke tracker and how it works."
      >
        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>
            Are changes saved automatically?
          </h2>
          <p className={styles.body}>
            Yes! Changes are saved in real time, so you don&apos;t have to
            worry about losing your progress. Everyone with the run link sees
            the same changes and can edit live — there is no save button.
          </p>
        </section>

        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>Do I need an account?</h2>
          <p className={styles.body}>
            No. There are no accounts at all. Create a run and you get a
            unique URL; that URL is the only key to the run. Anyone who has it
            can view and edit, so only share it with your co-op partners.
          </p>
        </section>

        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>Which games does it support?</h2>
          <p className={styles.body}>
            All mainline Pokémon games — every region from Kanto through
            Paldea has its locations and badges built in. Playing a romhack or
            something unusual? You can type custom location names anywhere
            you&apos;d pick a preset one.
          </p>
        </section>

        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>
            How many players can join a run?
          </h2>
          <p className={styles.body}>
            Any number. Soullocke works best for two trainers, but three or
            more are fully supported — see{" "}
            <Link href="/guides/rules-variants">variants for 3+ trainers</Link>
            .
          </p>
        </section>

        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>
            Does this track Pokémon levels and moves?
          </h2>
          <p className={styles.body}>
            No — that&apos;s a deliberate choice. We&apos;re designed for
            simplicity: encounters, links, teams, deaths, badges.
          </p>
        </section>

        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>
            How do I mark a Pokémon as evolved?
          </h2>
          <p className={styles.body}>
            Click the Pokémon on the Timeline, then &quot;Add Event&quot; →
            &quot;evolved&quot; → pick the species. Full walkthrough in{" "}
            <Link href="/guides/tracker-tips">tracker tips</Link>.
          </p>
        </section>

        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>
            What happens when a Pokémon dies?
          </h2>
          <p className={styles.body}>
            Mark it &quot;defeated&quot; (or drag it to the Grave in Box view)
            and the tracker automatically sends its soul-linked partner(s) to
            the grave too — that&apos;s the soullocke rule, and the app
            enforces it for you.
          </p>
        </section>

        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>Can I undo a mistake?</h2>
          <p className={styles.body}>
            There&apos;s no undo button, but everything is editable:
            double-click nicknames, species, and events to fix them, drag
            Pokémon between sections, and delete timeline rows.
          </p>
        </section>

        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>
            What&apos;s a Soullocke, anyway?
          </h2>
          <p className={styles.body}>
            A cooperative variant of the Nuzlocke challenge where two or more
            trainers&apos; catches are &quot;soul-linked&quot; — same team
            together, same box together, same grave together. Start with{" "}
            <Link href="/rules">the rules</Link> and{" "}
            <Link href="/guides/how-to-soullocke">
              how to run one with a friend
            </Link>
            .
          </p>
        </section>

        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>Is Soullocke free?</h2>
          <p className={styles.body}>
            Yes, free and{" "}
            <a
              href="https://github.com/jynnie/soullocke"
              target="_blank"
              rel="noopener noreferrer"
            >
              open source
            </a>
            . If it made your run better, you can{" "}
            <a
              href="https://ko-fi.com/jynnie"
              target="_blank"
              rel="noopener noreferrer"
            >
              buy me a coffee
            </a>
            . Ads on the site help keep the lights on.
          </p>
        </section>

        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>
            I found a bug / I have a feature idea
          </h2>
          <p className={styles.body}>
            Please tell us! Post on{" "}
            <a
              href="https://github.com/jynnie/soullocke/discussions"
              target="_blank"
              rel="noopener noreferrer"
            >
              GitHub Discussions
            </a>{" "}
            or open an{" "}
            <a
              href="https://github.com/jynnie/soullocke/issues"
              target="_blank"
              rel="noopener noreferrer"
            >
              issue
            </a>
            .
          </p>
        </section>
      </ContentLayout>
    </>
  );
}
