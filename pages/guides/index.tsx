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
  {
    slug: "soullocke-tips",
    title: "Soullocke Best Practices: Tips & Tricks",
    excerpt:
      "Planning your pairs, pacing with your partner, battle safety, and the mistakes that end runs early.",
  },
  {
    slug: "rules-variants",
    title: "Soullocke Variants & Optional Rules",
    excerpt:
      "Hardcore rules, popular clauses and how they interact with links, and crossover variants like randomized soul links.",
  },
  {
    slug: "videos",
    title: "Cool Nuzlocke & Soullocke Videos to Watch",
    excerpt:
      "The soul link runs that made the format famous — Jaiden Animations and Alpharad's randomized soul link, and more.",
  },
  {
    slug: "hoenn",
    title: "Hoenn Soullocke Guide",
    excerpt:
      "Encounter highlights, gift and static Pokémon rulings, and the fights that end runs in Ruby, Sapphire, and Emerald.",
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
