# Soullocke

**Soullocke** ([soullocke.vercel.app](https://soullocke.vercel.app)) is a tracker built specifically for tracking [soul-linked Nuzlocke](https://pastebin.com/Fg6hfDma) runs. Unlike other Nuzlocke trackers, Soullocke tracks the Pokémon across two trainers with quality of life features to help track which Pokémon are soul-linked.

![preview](/public/Preview.png)

## ⚠️ Notice

soullocke is now regularly hitting the max simultaneous connection limit. I will be looking into ways to deal with this issue, but if you want to support the project in the meantime, you can do so via [ko-fi](https://ko-fi.com/jynnie).

## ✨ Features

Overview of main features. Currently used as a checklist while the project is in development.

- Easily track where Pokémon are caught and when they are boxed, swapped into your team, defeated, etc.
- Timeline view of soul-linked trainers' teams and catches.
- Filter and search tracked Pokémon.

Future features include password lock. Please leave feature requests as an [issue](https://github.com/jynnie/soullocke/issues).

### FAQ

- Are changes saved automatically?
  - Yes! Changes are saved in real time, so you don't have to worry about losing your progress. Everyone at the link will see the same changes and can edit in real-time.
- Does this track Pokémon levels and moves?
  - No, decided against adding fine-grain tracking of these details. We're designed for simplicity. If you want that level of detail, we reccommend using a different tracker.

## 🔨 Development

Soullocke is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app); and data powered by [pokeapi.co](https://pokeapi.co/). Additional thanks to [PokéSprite](https://github.com/msikma/pokesprite) and [Nuzlocke Generator](nuzlocke-generator.herokuapp.com).

```
$ yarn install
```

Run locally:

```
$ yarn dev
$ yarn emulate
```

Dummy data is populated at [http://localhost:3000/run/nitrous-gerbil-65](http://localhost:3000/run/nitrous-gerbil-65).

## 📄 License

[MIT](https://github.com/jynnie/soullocke/blob/main/LICENSE) © [jynnie](https://github.com/jynnie)
