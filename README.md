# ARSHU. — Minecraft Developer & SysAdmin Portfolio

A premium, production-ready personal portfolio for **Arshu** (`ArshuPremium` on
Minecraft, `adminx.in` on Discord). Dark futuristic workstation aesthetics,
subtle Minecraft identity, and a **real-time 3D render of the owner's current
Minecraft skin** fetched live from Mojang's public API.

> "A Minecraft player opened a futuristic developer workstation."

---

## Tech stack

| Layer      | Choice                                                        |
| ---------- | ------------------------------------------------------------- |
| Framework  | Next.js 14 (App Router) + TypeScript                          |
| Styling    | Tailwind CSS (custom dark design system, CSS 3D transforms)   |
| 3D         | Three.js via `skinview3d` — live skin/cape, idle + turntable    |
| Icons      | lucide-react + inline SVG brand marks                         |
| Animation  | Hand-rolled CSS/JS (reveal, tilt, parallax, typing) — zero extra deps |
| Fonts      | Space Grotesk (display) · Inter (body) · JetBrains Mono (code)|

No UI kit, no animation library bloat: everything is hand-built for
performance, accessibility, and maintainability.

## Quick start

```bash
npm install
npm run dev        # http://localhost:3000
```

Production:

```bash
npm run build
npm start          # serves on 0.0.0.0:3000
```

## Editing the portfolio — one file

**All content lives in [`lib/config.ts`](lib/config.ts).** Update services,
skills, projects, experience domains, terminal commands, infrastructure demo
data, contact links, SEO copy, and the footer without touching a single
component.

```ts
export const portfolioConfig = {
  name: "Arshu",
  minecraftUsername: "ArshuPremium",
  discord: "adminx.in",
  availability: "Available for Paid Work",
  services: [ /* … */ ],
  projects: [ /* … */ ],
  // …
}
```

Set your production domain via environment (used for canonical URLs, sitemap,
OG metadata):

```bash
# .env.local
NEXT_PUBLIC_SITE_URL=https://your-domain.example
```

## Minecraft skin pipeline

1. Client asks **our own server** — `GET /api/minecraft/profile?username=…`
2. The route (`app/api/minecraft/profile`) resolves username → UUID via
   `api.mojang.com`, then textures via `sessionserver.mojang.com`, decodes the
   base64 texture payload, upgrades texture URLs to **https**, and caches the
   result in memory for 10 minutes (stale-on-error).
3. `GET /api/minecraft/skin` (and `?part=cape`) proxies the raw PNG with strong
   cache headers — same-origin for WebGL, no CORS or mixed-content issues.
4. `components/MinecraftPlayer.tsx` renders the live skin in 3D with
   `skinview3d`: slim/default model respected, cape loaded when present, idle
   animation, slow turntable, drag-to-rotate, pointer sway, off-screen render
   pausing, and reduced-motion support.
5. If Mojang is unreachable, the hero shows a graceful fallback card with a
   **Retry** button; the rest of the site is unaffected. The 2D head renders
   (`SkinHead`) fall back to a neutral pixel placeholder — never a hardcoded
   unrelated skin.

No API keys are required or exposed. `MINECRAFT_API_KEY=` in `.env.example` is
a reserved server-side placeholder for future paid providers.

## Sections

`Hero → About → Skills → Services → Selected Work → Experience → Behind the
Terminal (interactive) → Infrastructure & Pterodactyl (labeled demo) → Discord
& Status → Contact → Footer`

## Content honesty policy

- No fake clients, revenue, uptime %, user counts, awards, or certifications.
- The Pterodactyl/infrastructure dashboard is explicitly labeled
  **"concept · demo data"**; the log stream and sparklines are labeled
  **simulated**.
- The status board distinguishes **live** data (Minecraft profile resolved via
  Mojang) from static **profile** data.
- The terminal is a visual element — nothing executes on the visitor's device.

## Performance & accessibility

- Three.js is code-split (`next/dynamic`, `ssr: false`) and pauses rendering
  off-screen; particles/grid are cheap canvas/CSS layers.
- `prefers-reduced-motion` is respected everywhere (CSS overrides + JS hooks).
- Semantic landmarks, skip link, visible focus states, ARIA labels, `aria-live`
  terminal output, keyboard-operable mobile nav and 3D stage.
- SEO: metadata API, Open Graph + Twitter cards (dynamic OG image via
  `next/og`), `robots.txt`, `sitemap.xml`, JSON-LD `Person`/`WebSite`, SVG
  favicon, web manifest.

## Deployment

Works out of the box on Vercel, or any Node host:

```bash
npm run build && npm start
```

For Docker/Node hosts set `NEXT_PUBLIC_SITE_URL` at **build** time so metadata
and sitemap carry the right domain.

## Project structure

```
app/
  layout.tsx            fonts, metadata, JSON-LD, shell
  page.tsx              section composition
  globals.css           design system (tokens, panels, reveal, reduced motion)
  opengraph-image.tsx   dynamic OG card (bundled fonts, no network at runtime)
  icon.svg · robots.ts · sitemap.ts · manifest.ts
  api/minecraft/
    profile/route.ts    username → uuid → textures (cached, server-side)
    skin/route.ts       skin/cape PNG proxy (https, cache headers)
components/
  Hero · MinecraftPlayer · SkinHead · FloatingWidgets · About · Skills ·
  Services · Projects · ProjectVisual · Experience · TerminalSection ·
  Infrastructure · Connect · Contact · Navbar · Footer · Background ·
  ScrollProgress · ui/* (Reveal, TiltCard, SectionHeading, CopyButton, …)
lib/
  config.ts             ★ single source of truth for all content
  minecraft-server.ts   Mojang fetching + caching (server-only)
  minecraft-client.ts   cached client accessors + React hook
  hooks.ts              reduced-motion, in-view, scroll, scroll-spy
  utils.ts              cn(), clipboard, uuid formatting
```
