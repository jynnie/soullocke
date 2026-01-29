import { ContentLayout } from "components/ContentLayout";
import Head from "next/head";
import Link from "next/link";
import React from "react";
import styles from "styles/Content.module.css";

const guides = [
  {
    slug: "getting-started",
    title: "Getting Started",
    excerpt:
      "Create a run, add locations and Pokémon, and share the link with your co-op partner.",
  },
  {
    slug: "how-to-soullocke",
    title: "How to Run a Soullocke with a Friend",
    excerpt:
      "Planning a soul-linked run: what you need, how to agree on rules, and tips for a smooth co-op experience.",
  },
];

export default function GuidesIndex() {
  return (
    <>
      <Head>
        <title>Guides | Soullocke – Soul-linked Nuzlocke Tracker</title>
        <meta
          name="description"
          content="Guides for using the Soullocke tracker and running soul-linked Nuzlocke challenges with friends."
        />
      </Head>
      <ContentLayout
        title="Guides"
        description="Step-by-step guides for using the tracker and running soul-linked Nuzlocke runs."
      >
        <ul className={styles.guideList}>
          {guides.map((guide) => (
            <li key={guide.slug} className={styles.guideItem}>
              <Link href={`/guides/${guide.slug}`} className={styles.guideLink}>
                {guide.title}
              </Link>
              <p className={styles.guideExcerpt}>{guide.excerpt}</p>
            </li>
          ))}
        </ul>
      </ContentLayout>
    </>
  );
}
