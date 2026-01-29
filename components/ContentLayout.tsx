import Link from "next/link";
import React from "react";
import styles from "styles/Content.module.css";

type ContentLayoutProps = {
  children: React.ReactNode;
  title: string;
  description?: string;
};

export function ContentLayout({
  children,
  title,
  description,
}: ContentLayoutProps) {
  return (
    <div className={styles.container}>
      <nav className={styles.nav}>
        <Link href="/" className={styles.navLink}>
          Home
        </Link>
        <span className={styles.navLink} style={{ opacity: 0.5 }}>
          |
        </span>
        <Link href="/about" className={styles.navLink}>
          About
        </Link>
        <Link href="/rules" className={styles.navLink}>
          Rules
        </Link>
        <Link href="/guides" className={styles.navLink}>
          Guides
        </Link>
      </nav>

      <main className={styles.main}>
        <h2 className={styles.pageTitle}>{title}</h2>
        {description && (
          <p className={styles.body} style={{ marginBottom: "1.5rem" }}>
            {description}
          </p>
        )}
        {children}
      </main>

      <footer className={styles.footer}>
        <span>Made with {"<3"} by </span>
        <a
          href="https://github.com/jynnie/soullocke"
          target="_blank"
          rel="noopener noreferrer"
        >
          jynnie
        </a>
      </footer>
    </div>
  );
}
