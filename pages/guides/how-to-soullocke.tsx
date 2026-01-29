import { ContentLayout } from "components/ContentLayout";
import Head from "next/head";
import Link from "next/link";
import React from "react";
import styles from "styles/Content.module.css";

export default function HowToSoullockeGuide() {
  return (
    <>
      <Head>
        <title>How to run a Soullocke with a friend | Guides</title>
        <meta
          name="description"
          content="Plan a soul-linked Nuzlocke: pick games, agree on rules, and get tips for a smooth co-op Soullocke run with a friend."
        />
      </Head>
      <ContentLayout
        title="How to run a Soullocke with a friend"
        description="Planning and running a soul-linked Nuzlocke from start to finish."
      >
        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>Pick your game(s)</h2>
          <p className={styles.body}>
            Soullockes work with any mainline Pokémon game. Common setups:
          </p>
          <ul className={styles.list}>
            <li>
              <strong>Same game, two players:</strong> Both play the same
              version (e.g. Emerald) on separate devices. Same regions and
              routes, so linking is straightforward.
            </li>
            <li>
              <strong>Paired versions:</strong> One plays Ruby, the other
              Sapphire (or Diamond/Pearl, Black/White, etc.). Routes are
              equivalent; you link by &quot;same&quot; area (e.g. Route 101 in
              both).
            </li>
            <li>
              <strong>Different generations:</strong> Some groups run different
              games (e.g. FireRed + Emerald) and link by badge or story
              milestone. This requires more agreement on what counts as
              &quot;same&quot; progress.
            </li>
          </ul>
        </section>

        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>
            Agree on rules before you start
          </h2>
          <p className={styles.body}>
            Besides the core Soullocke rules, decide together:
          </p>
          <ul className={styles.list}>
            <li>
              Dupes clause: can you skip duplicate species for a new encounter?
            </li>
            <li>
              Shiny clause: are shinies free catches and/or immune to death?
            </li>
            <li>Static/gift Pokémon: one per area or none?</li>
            <li>
              Level caps: e.g. don&apos;t exceed the next gym leader&apos;s
              highest level.
            </li>
            <li>
              Items in battle: none, or limited (e.g. no healing in battle).
            </li>
          </ul>
          <p className={styles.body}>
            Write them down or keep the <Link href="/rules">rules summary</Link>{" "}
            open so you both stay on the same page.
          </p>
        </section>

        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>Stay in sync</h2>
          <p className={styles.body}>
            The trickiest part of a Soullocke is keeping encounters and team/box
            decisions aligned. Use the Soullocke tracker so both of you log
            catches and moves in one place. Check the timeline and box view
            before making big decisions (e.g. switching team) so you don&apos;t
            accidentally leave a linked partner in the PC while the other is on
            the team.
          </p>
        </section>

        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>
            When one of you misses an encounter
          </h2>
          <p className={styles.body}>
            If Trainer A has no valid catch in an area (e.g. first encounter
            fled, or dupes clause used and nothing new found), Trainer B also
            doesn&apos;t get a catch for that area—the link is
            &quot;skipped.&quot; It keeps the run fair and the link meaningful.
            Some groups allow &quot;catch-up&quot; rules (e.g. one free solo
            catch per game), but that&apos;s optional and something to agree on
            upfront.
          </p>
        </section>

        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>Have fun</h2>
          <p className={styles.body}>
            Soullockes are about shared highs and lows—when a linked pair
            clutches a gym or when you lose both to one crit. Communicate with
            your partner, update the tracker regularly, and enjoy the run. Ready
            to start? <Link href="/">Create a run</Link> and share the link.
          </p>
        </section>
      </ContentLayout>
    </>
  );
}
