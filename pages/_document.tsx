import Document, { Head, Html, Main, NextScript } from "next/document";

export default class MyDocument extends Document {
  render() {
    return (
      <Html lang="en">
        <Head>
          <meta
            name="og:title"
            property="og:title"
            content="Soullocke: Pokémon Soul-link Nuzlocke Tracker"
          />
          <meta property="og:url" content="https://soullocke.vercel.app/" />
          <meta
            name="og:description"
            content="Soullocke (or soul-linked Nuzlocke) Tracker for encounters and progress. All mainline Pokémon games (Sapphire, Emerald, Diamond, Pearl, Black, White, Sword, Shield, etc). Works best for two trainers, but can support any number in a run."
          />
          <meta property="og:image" content="/clip.png" />

          <meta name="twitter:card" content="summary" />
          <meta name="twitter:creator" content="@jynniit" />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}
