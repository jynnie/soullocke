import { ContentLayout } from "components/ContentLayout";
import Head from "next/head";
import Link from "next/link";
import React from "react";
import styles from "styles/Content.module.css";

export default function SoullockeTipsGuide() {
  return (
    <>
      <Head>
        <title>Soullocke Best Practices: Tips & Tricks | Guides</title>
        <meta
          name="description"
          content="Practical tips for surviving a soul-linked Nuzlocke: planning your pairs, pacing with your partner, battle safety, and the mistakes that end runs early."
        />
      </Head>
      <ContentLayout
        title="Soullocke Best Practices: Tips & Tricks"
        description="Soullockes fail differently than solo Nuzlockes. It's rarely one bad crit — it's two trainers slowly drifting out of sync until someone takes a risk the other didn't sign up for. These tips come from the community's collective scar tissue."
      >
        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>Before you start</h2>
          <ul className={styles.list}>
            <li>
              <strong>Write your rules down.</strong> Not &quot;we basically
              know them&quot; — actually written. Dupes clause, shiny clause,
              gifts and statics, level caps, items in battle. Ninety percent
              of mid-run arguments are really &quot;we never agreed on
              that.&quot; Our <Link href="/rules">rules page</Link> is a good
              base to point at.
            </li>
            <li>
              <strong>Agree on what counts as an encounter zone.</strong> Is
              Granite Cave one encounter or one per floor? Does fishing count
              separately from surfing? Decide before it matters. You can use
              the locations defined in the Soullocke app as a definition.
            </li>
            <li>
              <strong>Pick a pace you can both keep.</strong> The run works
              best when you play at the same table (or on call) and stop at
              the same milestone. Decide your &quot;pause points&quot; — most
              groups stop right before each gym.
            </li>
            <li>
              <strong>Play together</strong> on a voice call or in person. The
              best way to stay in sync on where each trainer is going or
              doing, is to play together. Communicate and move from location
              to location together.
            </li>
          </ul>
        </section>

        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>Think in pairs, not Pokémon</h2>
          <ul className={styles.list}>
            <li>
              <strong>A pair is only as safe as its frailest member.</strong>{" "}
              Linking your ace to a Magikarp means your ace is one
              Magikarp-crit from the grave. When choosing which links go on
              the team, judge the <em>pair&apos;s</em> weakest moment, not the
              best Pokémon in it.
            </li>
            <li>
              <strong>Spread your types across pairs.</strong> If both halves
              of a link are weak to Ground, one Earthquake ends the pair. When
              you can choose (starters, gifts), pick complementary types.
            </li>
            <li>
              <strong>Keep a bench.</strong> Solo Nuzlockers can limp along
              with three Pokémon; soullocke deaths come in twos, so a thin
              bench collapses fast. Box depth is life insurance.
            </li>
          </ul>
        </section>

        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>During battles</h2>
          <ul className={styles.list}>
            <li>
              <strong>Do the sacrifice math twice.</strong>{" "}
              &quot;Sacking&quot; a Pokémon to get a safe switch costs the
              other trainer a team member too. What&apos;s a fair trade in a
              solo run is a double loss here — always ask your partner before
              sacrificing anything.
            </li>
            <li>
              <strong>Fear double battles.</strong> One spread move
              (Earthquake, Surf, Explosion) can hit both your Pokémon in one
              turn — which can mean <em>four</em> Pokémon across the link.
              Enter every double battle with a plan.
            </li>
            <li>
              <strong>Respect priority and status.</strong> Most run-ending
              turns start with &quot;it&apos;s slower than me, we&apos;re
              fine.&quot; Quick Attack, Sucker Punch, and a bad sleep roll
              disagree.
            </li>
            <li>
              <strong>Call out risk before you click.</strong> &quot;I&apos;m
              staying in on a possible crit range, okay?&quot; is the single
              highest-value habit in a soullocke. Your risk is their risk.
            </li>
          </ul>
        </section>

        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>Between battles</h2>
          <ul className={styles.list}>
            <li>
              <strong>Stay level-synced.</strong> Agree on level caps (the
              next gym leader&apos;s ace is the usual cap) and check in on
              levels at every pause point. One trainer overleveling quietly
              breaks the difficulty for both.
            </li>
            <li>
              <strong>Log encounters immediately.</strong> Track catches the
              moment they happen — in the heat of a session it&apos;s easy to
              forget which route linked what, and retroactive &quot;wait, who
              was linked to my Zubat?&quot; debugging is miserable. (This is{" "}
              <Link href="/guides/getting-started">
                what this tracker is for
              </Link>
              .)
            </li>
            <li>
              <strong>Save before statics and gifts.</strong> Not to re-roll
              outcomes — that&apos;s against the spirit — but because rulings
              on gifts/statics are the most commonly disputed, and it&apos;s
              easier to resolve before anyone&apos;s committed.
            </li>
          </ul>
        </section>

        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>When things go wrong</h2>
          <ul className={styles.list}>
            <li>
              <strong>Losses come in pairs; grief accordingly.</strong> Losing
              a link hurts twice as much and that&apos;s the point. Take a
              break after a bad wipe instead of revenge-playing into a second
              one.
            </li>
            <li>
              <strong>Agree on a wipe rule upfront.</strong> Is the run over
              when one trainer whites out, or both? Most groups play &quot;one
              whiteout ends the run for everyone&quot; — but decide before it
              happens, not during.
            </li>
            <li>
              <strong>It&apos;s a co-op game.</strong> The challenge is the
              game; the point is playing it together. When in doubt, pick the
              ruling that keeps the run fun for both of you.
            </li>
          </ul>
        </section>

        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>Further reading</h2>
          <ul className={styles.list}>
            <li>
              <Link href="/guides/how-to-soullocke">
                How to run a Soullocke with a friend
              </Link>{" "}
              — setup and planning
            </li>
            <li>
              <Link href="/rules">Rules &amp; variants</Link> — the baseline
              ruleset
            </li>
            <li>
              <a
                href="https://nuzlockeuniversity.ca/nuzlocke-variants/soul-link-nuzlocke-rules/"
                target="_blank"
                rel="noopener noreferrer"
              >
                Soul Link rules at Nuzlocke University
              </a>{" "}
              — a widely-referenced community ruleset
            </li>
          </ul>
        </section>
      </ContentLayout>
    </>
  );
}
