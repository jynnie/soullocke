# Soullocke

**Soullocke** ([soullocke.vercel.app](https://soullocke.vercel.app)) is a tracker built specifically for tracking [soul-linked Nuzlocke](https://pastebin.com/Fg6hfDma) runs. Unlike other Nuzlocke trackers, Soullocke tracks the Pokémon across two trainers with quality of life features to help track which Pokémon are soul-linked.

![preview](/public/Preview.png)

## ✨ Features

Overview of main features. Currently used as a checklist while the project is in development.

- Easily track where Pokémon are caught and when they are boxed, swapped into your team, defeated, etc.
- Timeline view of soul-linked trainers' teams and catches.
- Filter and search tracked Pokémon.

Future features include password lock. Please leave feature requests as an [issue](https://github.com/jynnie/soullocke/issues).

### Open Questions

- Should we save changes automatically or require a manual button press?
  - Automatically for now
- Does this track Pokémon levels and moves?
  - No, decided against adding fine-grain tracking of these details for now

## 🔨 Development

Soullocke is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app); and data powered by [pokeapi.co](https://pokeapi.co/). Additional thanks to [PokéSprite](https://github.com/msikma/pokesprite) and [Nuzlocke Generator](nuzlocke-generator.herokuapp.com).

```
$ yarn install
```

```
$ yarn dev
```

## 📄 License

[MIT](https://github.com/jynnie/soullocke/blob/main/LICENSE) © [jynnie](https://github.com/jynnie)
