# Cast Away: From Star Island to Industry Hub — IPL Ecosystem Map

**Live:** https://binyoun.github.io/cast-away/

An interactive scrollytelling artefact visualising the gap between design education and industry practice. A graduating student (Linh) meets a Creative Director (Tom) in a pitch room — the scenario plays out across three conflict zones, each requiring the reader to choose a structural intervention before the resolution unlocks.

Built for TCHE2694 Integrated Project Learning at RMIT University Vietnam. The scenario is grounded in situated learning (Lave & Wenger, 1991), activity theory (Leont'ev, 1978), and work-integrated learning (Billett, 2009).

---

## Stack

- Vite + React (single-page, no router)
- Modular CSS with custom properties (no Tailwind)
- Fonts: Space Grotesk · Outfit · JetBrains Mono
- Deployed via GitHub Pages from `main` branch `/docs` folder

---

## Build and deploy

```bash
# Install
npm install

# Dev server
npm run dev

# Build
npm run build

# Deploy — copy build output to docs/, then push to main
cp -r dist/* docs/
git add docs/
git commit -m "deploy"
git push origin main
```

GitHub Pages is configured to serve from the `main` branch `/docs` folder. No separate deployment branch needed.

---


*Bin Youn · RMIT University Vietnam · 2026*
