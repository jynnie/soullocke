import { ContentLayout } from "components/ContentLayout";
import Head from "next/head";
import React from "react";
import styles from "styles/Content.module.css";

export default function TrackerTipsGuide() {
  return (
    <>
      <Head>
        <title>Tracker Tips & Tricks (Hidden UI Features) | Guides</title>
        <meta
          name="description"
          content="Hidden features of the Soullocke tracker: double-click editing, custom locations, recording missed encounters, what auto-propagates to linked Pokémon (and what doesn't), and more."
        />
      </Head>
      <ContentLayout
        title="Tracker Tips & Tricks"
        description="The tracker keeps its interface minimal, which means some of its best features hide behind a double-click or a checkbox. Here's the full list of things players tend to discover by accident."
      >
        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>Everything is live</h2>
          <p className={styles.body}>
            Every change syncs instantly to everyone with the run link — there
            is no save button, and there&apos;s no undo either, so the link is
            the password. Share accordingly.
          </p>
        </section>

        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>Double-click to edit</h2>
          <p className={styles.body}>
            Three different things are edited by double-clicking, with no
            visible edit button:
          </p>
          <ul className={styles.list}>
            <li>
              <strong>Double-click a nickname or species</strong> in a
              Pokémon&apos;s detail card to edit it — typo&apos;d nicknames
              and wrong species picks are fixable anytime.
            </li>
            <li>
              <strong>Double-click an event</strong> in a Pokémon&apos;s
              history to edit or delete it (there&apos;s also a small pencil
              icon).
            </li>
            <li>
              <strong>Double-click a badge</strong> in the Summary tab to
              toggle it earned/unearned.
            </li>
          </ul>
        </section>

        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>
            How to mark a Pokémon as evolved
          </h2>
          <p className={styles.body}>
            The most-asked question. From the <strong>Timeline</strong> tab:
          </p>
          <ul className={styles.list}>
            <li>
              1. Click the Pokémon&apos;s icon in its row — its detail card
              opens.
            </li>
            <li>
              2. Click <strong>&quot;Add Event&quot;</strong>.
            </li>
            <li>
              3. Set <strong>&quot;We:&quot;</strong> to{" "}
              <strong>evolved</strong>, and pick the new species under{" "}
              <strong>&quot;Into:&quot;</strong>.
            </li>
            <li>
              4. <strong>Add.</strong> Its sprite updates across the app
              (check the Summary tab!).
            </li>
          </ul>
        </section>

        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>Recording a missed encounter</h2>
          <p className={styles.body}>
            When you fail a catch (it fainted, it fled, you&apos;re weeping),
            still log it: click <strong>+</strong> on that location like
            normal, but <strong>uncheck &quot;Caught&quot;</strong> before
            adding. The tracker records the miss, sends the entry to the
            grave, and automatically marks the miss for your soul-linked
            partner too — because a missed link is missed for everyone.
          </p>
        </section>

        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>
            Custom locations: not just the preset routes
          </h2>
          <p className={styles.body}>
            Both the Timeline&apos;s &quot;Add Location or Badge&quot; select
            and the Box view&apos;s &quot;+&quot; form accept{" "}
            <strong>typed custom names</strong>. Use this for:
          </p>
          <ul className={styles.list}>
            <li>Romhacks and randomizers with non-standard areas</li>
            <li>
              Splitting big areas (&quot;Mt. Coronet 1F&quot;, &quot;Mt.
              Coronet Summit&quot;) if your rules treat them as separate
              encounter zones
            </li>
            <li>
              House-rule slots like &quot;Game Corner&quot; or
              &quot;Trade&quot;
            </li>
          </ul>
        </section>

        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>
            What&apos;s automatic, and what isn&apos;t
          </h2>
          <p className={styles.body}>
            The tracker understands soul links, so the big actions cascade on
            their own:
          </p>
          <ul className={styles.list}>
            <li>
              <strong>Moving</strong> a Pokémon (team/box/daycare/grave) moves
              its linked partner(s).
            </li>
            <li>
              <strong>Marking a death</strong> sends the whole link to the
              grave.
            </li>
            <li>
              <strong>Logging a miss</strong> marks the miss for all trainers.
            </li>
            <li>
              <strong>Everyone caught at a location?</strong> It offers to
              move the new link to your teams immediately — including picking
              a pair to swap out if you&apos;re full.
            </li>
          </ul>
          <p className={styles.body}>
            The one exception:{" "}
            <strong>editing or deleting a past event</strong> only touches
            that one Pokémon. Corrections don&apos;t cascade, so if you fix
            history on one side of a link, fix the other side too.
          </p>
        </section>

        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>Small things worth knowing</h2>
          <ul className={styles.list}>
            <li>
              <strong>Per-location notes</strong> live behind the
              &quot;Notes&quot; button on each timeline row — encounter-tile
              reminders, level-cap math, eulogies.
            </li>
            <li>
              <strong>Deleting a location deletes its Pokémon too</strong> (it
              warns you). Same for un-toggling a badge, which removes its
              timeline row.
            </li>
            <li>
              <strong>Drag timeline rows</strong> to fix out-of-order logging.
            </li>
            <li>
              <strong>Your tab choice is remembered</strong> per browser, so
              you always come back to the view you use most.
            </li>
            <li>
              <strong>The floating &quot;?&quot; button</strong> opens
              What&apos;s New — release notes plus links to report bugs and
              suggest features.
            </li>
          </ul>
        </section>
      </ContentLayout>
    </>
  );
}
