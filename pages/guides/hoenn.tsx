import { ContentLayout } from "components/ContentLayout";
import Head from "next/head";
import Link from "next/link";
import React from "react";
import styles from "styles/Content.module.css";

export default function HoennGuide() {
  return (
    <>
      <Head>
        <title>Hoenn Soullocke Guide (Ruby, Sapphire & Emerald) | Guides</title>
        <meta
          name="description"
          content="Soullocke guide for Hoenn: notable first encounters, gift and static Pokémon rulings, version pairing tips for Ruby/Sapphire, and the fights that end runs."
        />
      </Head>
      <ContentLayout
        title="Hoenn Soullocke Guide"
        description="Encounter highlights, rulings to agree on, and danger spots for soul-linked runs of Ruby, Sapphire, Emerald, and ORAS."
      >
        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>Why Hoenn is great for Soullockes</h2>
          <p className={styles.body}>
            Hoenn is one of the most popular Soullocke regions for good reason:
            Ruby and Sapphire are natural paired versions, encounters are
            varied early on, and the long stretch of water routes at the end
            gives late runs a steady supply of new linked pairs. Emerald adds
            the Battle Frontier and some rebalanced gym fights, and ORAS works
            with the same route structure.
          </p>
        </section>

        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>Encounter highlights</h2>
          <p className={styles.body}>
            A few areas worth knowing before you commit your first encounter:
          </p>
          <ul className={styles.list}>
            <li>
              <strong>Routes 101–103:</strong> mostly Poochyena, Zigzagoon, and
              Wurmple. If you play with a dupes clause, decide upfront whether
              a dupe for <em>either</em> trainer lets both re-roll the
              encounter.
            </li>
            <li>
              <strong>Route 102:</strong> home of the rare Ralts, and your
              first version split—Seedot (Ruby) vs Lotad (Sapphire). Linked
              pairs across versions won&apos;t match species; that&apos;s part
              of the fun.
            </li>
            <li>
              <strong>Petalburg Woods:</strong> Shroomish and Slakoth—both
              excellent long-term picks if the link survives.
            </li>
            <li>
              <strong>Granite Cave:</strong> Aron and Makuhita, two of the
              strongest early-game catches in the region.
            </li>
            <li>
              <strong>Route 119:</strong> Tropius, and the infamous Feebas,
              which appears in only six random water tiles. Agree beforehand
              whether fishing for Feebas counts as your first water encounter.
            </li>
            <li>
              <strong>Route 120:</strong> Absol and Kecleon. Note the Kecleon
              blocking the bridge is a static encounter—see rulings below.
            </li>
            <li>
              <strong>Safari Zone:</strong> Safari mechanics (no weakening,
              flee-prone catches) make this the swingiest area in the game.
              Many groups rule it one encounter per trainer, fled = skipped
              link.
            </li>
            <li>
              <strong>Water routes 124–134:</strong> Tentacool and Wingull
              dupes everywhere. Diving areas (Seafloor Cavern approach) count
              as separate encounter zones if you want more late-game links.
            </li>
            <li>
              <strong>Shoal Cave:</strong> Spheal always, Snorunt only at low
              tide—worth timing your visit.
            </li>
          </ul>
        </section>

        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>
            Gifts, fossils, and statics: agree on rulings
          </h2>
          <p className={styles.body}>
            Hoenn has more freebies than most regions, and each one needs a
            ruling before someone picks it up:
          </p>
          <ul className={styles.list}>
            <li>
              <strong>Starters:</strong> the standard ruling is that starters
              are linked to each other and exempt from the Route 101 encounter.
            </li>
            <li>
              <strong>Castform</strong> (Weather Institute) and{" "}
              <strong>Beldum</strong> (Steven&apos;s house): gift Pokémon.
              Common ruling: gifts are allowed, linked to the other
              trainer&apos;s gift from the same spot, and count as that
              area&apos;s encounter.
            </li>
            <li>
              <strong>Fossils</strong> (Route 111 desert): Lileep or
              Anorith—you only get one, so trainers can end up with a
              cross-species link even in the same version.
            </li>
            <li>
              <strong>Wynaut egg</strong> (Lavaridge Town): decide if eggs
              count as the town&apos;s encounter or are banned.
            </li>
            <li>
              <strong>Statics:</strong> the bridge Kecleon, New Mauville
              Voltorb, and Aqua Hideout Electrode are catchable statics. The
              Regis, Rayquaza, and roaming Latios/Latias are usually banned or
              catch-only (usable for HMs, never battle).
            </li>
          </ul>
        </section>

        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>Fights that end runs</h2>
          <p className={styles.body}>
            The Hoenn fights that kill the most linked pairs, in order of
            appearance:
          </p>
          <ul className={styles.list}>
            <li>
              <strong>Wattson (Mauville Gym):</strong> Selfdestruct Voltorb
              takes out healthy team members without warning, and in Emerald
              his Manectric hits hard. Bring something Ground-type if you can.
            </li>
            <li>
              <strong>Flannery (Lavaridge Gym):</strong> Overheat Torkoal
              behind a White Herb. One turn of hesitation loses a pair.
            </li>
            <li>
              <strong>Norman (Petalburg Gym):</strong> the classic run-killer.
              Slaking&apos;s damage output is absurd; abuse Truant with Protect
              or a sacrifice-free stall plan, and respect Facade.
            </li>
            <li>
              <strong>Tate &amp; Liza (Mossdeep Gym):</strong> a double
              battle, which is uniquely dangerous in a Soullocke—one
              Earthquake or Explosion can cost each trainer a Pokémon in the
              same turn, wiping two full links.
            </li>
            <li>
              <strong>Wally (Victory Road):</strong> his Gardevoir is often
              the strongest single Pokémon you&apos;ve faced by that point.
              Don&apos;t treat it as a warm-up fight.
            </li>
          </ul>
          <p className={styles.body}>
            A common pace-setting rule is a level cap at each gym
            leader&apos;s strongest Pokémon. In Emerald that&apos;s roughly:
            Roxanne 15, Brawly 19, Wattson 24, Flannery 29, Norman 31, Winona
            33, Tate &amp; Liza 42, Juan 46. (Ruby/Sapphire differ slightly at
            a few gyms—double-check for your version.)
          </p>
        </section>

        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>Further reading</h2>
          <p className={styles.body}>
            For full route-by-route encounter tables and boss teams, these
            community resources go deeper than this overview:
          </p>
          <ul className={styles.list}>
            <li>
              <a
                href="https://nuzlockeuniversity.ca/game-specific-guides/emerald/"
                target="_blank"
                rel="noopener noreferrer"
              >
                Nuzlocke University&apos;s Emerald guide
              </a>{" "}
              — strategy-focused: repel tricks for targeting encounters in
              Granite Cave, Gabby &amp; Ty rematches for safe EXP, boss
              preparation.
            </li>
            <li>
              <a
                href="https://nuzlocketracker.org/guides/emerald"
                target="_blank"
                rel="noopener noreferrer"
              >
                Nuzlocke Tracker&apos;s Emerald guide
              </a>{" "}
              — full encounter tables (70 locations, 149 obtainable species),
              level caps, and gym teams.
            </li>
            <li>
              <a
                href="https://www.tcgstacked.com/pokemon/nuzlocke/emerald"
                target="_blank"
                rel="noopener noreferrer"
              >
                TCG Stacked&apos;s route-by-route encounter guide
              </a>{" "}
              — every route with encounter methods and level ranges.
            </li>
          </ul>
        </section>

        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>Tracking your Hoenn run</h2>
          <p className={styles.body}>
            When you <Link href="/newRun">create a run</Link> and pick Hoenn,
            the tracker loads the region&apos;s locations so you can log each
            area&apos;s encounter for every trainer, see which Pokémon are
            linked, and keep the timeline of badges and deaths in one shared
            view. New to the tracker? Start with the{" "}
            <Link href="/guides/getting-started">getting started guide</Link>.
          </p>
        </section>
      </ContentLayout>
    </>
  );
}
