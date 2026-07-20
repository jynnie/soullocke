import { ContentLayout } from "components/ContentLayout";
import Head from "next/head";
import React from "react";
import styles from "styles/Content.module.css";

export default function Privacy() {
  return (
    <>
      <Head>
        <title>Privacy Policy | Soullocke – Soul-linked Nuzlocke Tracker</title>
        <meta
          name="description"
          content="Privacy policy for Soullocke: what data the app stores, how run links work, the analytics we use, and how advertising cookies are handled."
        />
      </Head>
      <ContentLayout
        title="Privacy Policy"
        description="Last updated: July 19, 2026"
      >
        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>The short version</h2>
          <p className={styles.body}>
            Soullocke doesn&apos;t have accounts, so we never collect your
            name, email, or password. The data you enter into a run (trainer
            names, Pokémon, events) is stored so it can be shared with anyone
            who has the run&apos;s link. Like most websites, we use analytics
            to understand how the app is used, and we may show ads to keep the
            app free.
          </p>
        </section>

        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>Run data</h2>
          <p className={styles.body}>
            When you create a run, everything you add to it—player names,
            Pokémon nicknames, locations, timeline events, and notes—is stored
            in Google Firebase Realtime Database so it can sync live between
            players. Runs are accessible to <strong>anyone who has the run
            URL</strong>, and anyone with the URL can edit the run. Please
            don&apos;t put personal or sensitive information in player names or
            notes.
          </p>
          <p className={styles.body}>
            If you want a run deleted, open an issue on{" "}
            <a
              href="https://github.com/jynnie/soullocke/issues"
              target="_blank"
              rel="noopener noreferrer"
            >
              GitHub
            </a>{" "}
            with the run link and we&apos;ll remove it.
          </p>
        </section>

        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>Analytics</h2>
          <p className={styles.body}>
            We use a few analytics services to understand how people use
            Soullocke—things like which pages are visited and which features
            get used. This helps us decide what to improve. These services may
            use cookies or similar technologies:
          </p>
          <ul className={styles.list}>
            <li>
              <a
                href="https://vercel.com/docs/analytics/privacy-policy"
                target="_blank"
                rel="noopener noreferrer"
              >
                Vercel Analytics
              </a>{" "}
              (also our hosting provider)
            </li>
            <li>
              <a
                href="https://posthog.com/privacy"
                target="_blank"
                rel="noopener noreferrer"
              >
                PostHog
              </a>
            </li>
            <li>
              <a
                href="https://mixpanel.com/legal/privacy-policy/"
                target="_blank"
                rel="noopener noreferrer"
              >
                Mixpanel
              </a>
            </li>
          </ul>
          <p className={styles.body}>
            We don&apos;t sell your data, and analytics data is used only to
            improve the app.
          </p>
        </section>

        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>Advertising</h2>
          <p className={styles.body}>
            We use Google AdSense to show ads on some pages, which helps keep
            Soullocke free. Third-party vendors, including Google, use cookies
            to serve ads based on your prior visits to this website or other
            websites. Google&apos;s use of advertising cookies enables it and
            its partners to serve ads based on your visits to this site and/or
            other sites on the Internet.
          </p>
          <p className={styles.body}>
            You can opt out of personalized advertising by visiting{" "}
            <a
              href="https://www.google.com/settings/ads"
              target="_blank"
              rel="noopener noreferrer"
            >
              Google Ads Settings
            </a>
            , or opt out of some third-party vendors&apos; cookies at{" "}
            <a
              href="https://www.aboutads.info/choices/"
              target="_blank"
              rel="noopener noreferrer"
            >
              www.aboutads.info
            </a>
            . Learn more about how Google uses data at{" "}
            <a
              href="https://policies.google.com/technologies/ads"
              target="_blank"
              rel="noopener noreferrer"
            >
              policies.google.com/technologies/ads
            </a>
            .
          </p>
          <p className={styles.body}>
            If you&apos;re visiting from the European Economic Area, the UK, or
            Switzerland, you&apos;ll be asked for consent before advertising
            cookies are used.
          </p>
        </section>

        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>Children</h2>
          <p className={styles.body}>
            Soullocke is a general-audience site and does not knowingly
            collect personal information from children.
          </p>
        </section>

        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>Changes to this policy</h2>
          <p className={styles.body}>
            If this policy changes, we&apos;ll update this page and the
            &quot;last updated&quot; date above.
          </p>
        </section>

        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>Contact</h2>
          <p className={styles.body}>
            Questions about privacy? Reach out on{" "}
            <a
              href="https://github.com/jynnie/soullocke/discussions"
              target="_blank"
              rel="noopener noreferrer"
            >
              GitHub Discussions
            </a>
            .
          </p>
        </section>
      </ContentLayout>
    </>
  );
}
