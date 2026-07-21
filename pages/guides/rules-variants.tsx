import { ContentLayout } from "components/ContentLayout";
import Head from "next/head";
import Link from "next/link";
import React from "react";
import styles from "styles/Content.module.css";

export default function RulesVariantsGuide() {
  return (
    <>
      <Head>
        <title>Soullocke Variants & Optional Rules | Guides</title>
        <meta
          name="description"
          content="Ways to remix your next soul-linked Nuzlocke: hardcore rules, popular clauses and how they interact with links, and crossover variants like randomized soul links and 3+ player runs."
        />
      </Head>
      <ContentLayout
        title="Soullocke Variants & Optional Rules"
        description="Once you've finished (or lost) a standard Soullocke, these are the popular ways groups change up the next run. The core rules stay the same; everything below layers on top."
      >
        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>Hardcore Soullocke</h2>
          <p className={styles.body}>
            The &quot;hardcore&quot; ruleset from the solo Nuzlocke community,
            applied to a linked run. All three at once:
          </p>
          <ul className={styles.list}>
            <li>
              <strong>Set battle style</strong> — no free switch when you
              knock out an opponent&apos;s Pokémon.
            </li>
            <li>
              <strong>No items in battle</strong> — held items are fine; using
              potions and revives from the bag mid-battle is not.
            </li>
            <li>
              <strong>Hard level caps</strong> — nothing on your team may
              exceed the next gym leader&apos;s strongest Pokémon. Overleveled
              Pokémon are benched (which in a soullocke benches their linked
              partner too — a uniquely painful twist).
            </li>
          </ul>
          <p className={styles.body}>
            Hardcore soullockes are dramatically harder than hardcore solo
            runs because sacrificing safely is nearly impossible: every sack
            costs the other trainer a Pokémon as well.
          </p>
        </section>

        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>First-attempt-only bosses</h2>
          <p className={styles.body}>
            No retrying gym leaders or Evil Team bosses after a loss
            &quot;just to see the team.&quot; A whiteout is a whiteout. Groups
            who find full run-over rules too brutal sometimes play &quot;a
            lost boss fight costs each trainer their highest level
            Pokémon&quot; instead.
          </p>
        </section>

        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>
            Clauses, and how links complicate them
          </h2>
          <p className={styles.body}>
            Clauses that are simple in a solo Nuzlocke get interesting when
            two trainers&apos; encounters are tied together:
          </p>
          <ul className={styles.list}>
            <li>
              <strong>Dupes clause.</strong> Re-roll encounters that are
              dupes. The soullocke question: if it&apos;s a dupe for{" "}
              <em>one</em> trainer, do both re-roll? (Most groups: yes — the
              link matters more than the individual catch.)
            </li>
            <li>
              <strong>Shiny clause.</strong> A shiny may always be caught,
              dupe or not. Decide whether a shiny catch also frees the linked
              partner from the &quot;first encounter only&quot; rule, and
              whether shinies are death-exempt.
            </li>
            <li>
              <strong>Species clause.</strong> No two links may share a
              species across <em>either</em> trainer&apos;s side — pushes team
              variety hard in early-route regions.
            </li>
            <li>
              <strong>Gift &amp; static clause.</strong> Gifts and statics
              count as their own linked slot: Trainer A&apos;s gift links to
              Trainer B&apos;s gift from the same source. Some groups ban
              statics entirely; others allow &quot;catch for the Pokédex,
              never battle.&quot;
            </li>
            <li>
              <strong>Catch-up clause (mercy rule).</strong> Once per run, a
              trainer with no valid encounter in an area may take a solo catch
              that links to the partner&apos;s catch from that area. Softens
              the harshest soullocke rule for casual runs.
            </li>
          </ul>
        </section>

        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>Crossover variants</h2>
          <p className={styles.body}>
            <strong>Randomized soul link.</strong> The format Jaiden
            Animations and Alpharad made famous: run a randomizer so wild
            encounters (and sometimes trainers) are shuffled, then soul-link
            the chaos. Kills route memorization completely — nobody can plan
            around &quot;Ralts is on 102.&quot; Best for experienced pairs
            who&apos;ve memorized their favorite region.
          </p>
          <p className={styles.body}>
            <strong>Monotype soullocke.</strong> Each trainer picks a type and
            may only use Pokémon of that type. Links where either side
            doesn&apos;t match a trainer&apos;s type are boxed on both sides.
            Pick complementary types (e.g. Water + Electric) or suffer.
          </p>
          <p className={styles.body}>
            <strong>Egglocke / Wonderlocke soul link.</strong> Every catch is
            swapped for a random egg (egglocke) or wonder-traded away
            (wonderlocke), then linked as usual. Requires games with the right
            features, and a high tolerance for receiving someone&apos;s level
            1 Bidoof.
          </p>
        </section>

        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>Three or more trainers</h2>
          <p className={styles.body}>
            Everything scales to N players — the tracker supports any number —
            but two rulings matter more as the group grows:
          </p>
          <ul className={styles.list}>
            <li>
              <strong>Full-chain fate:</strong> one faint kills the entire
              linked chain (standard, brutal at 4+ players), vs.{" "}
              <strong>pairwise fate:</strong> only adjacent links die. Almost
              everyone plays full-chain; know what you&apos;re signing up for.
            </li>
            <li>
              <strong>Skipped areas multiply.</strong> With 4 trainers, the
              odds <em>someone</em> has a dupe/fled encounter on a route gets
              high — the dupes clause and/or a catch-up clause is strongly
              recommended at 3+.
            </li>
          </ul>
        </section>

        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>Picking a variant</h2>
          <p className={styles.body}>
            Rough difficulty ladder, easiest to hardest: standard with dupes
            clause → standard, no clauses → randomized soul link → hardcore →
            hardcore monotype (good luck). Whatever you pick, write the
            ruleset down before you start — see{" "}
            <Link href="/guides/soullocke-tips">tips &amp; best practices</Link>
            .
          </p>
        </section>
      </ContentLayout>
    </>
  );
}
