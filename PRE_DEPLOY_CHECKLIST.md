# Pre-deployment review series — jaskirat-portfolio

Ordered review passes to run before deploying. Work through them top to bottom;
each pass has a goal, concrete steps, and the known hot spots in THIS codebase.
Status notes dated 2026-07-14.

---

## Pass 0 — Known issues to fix first (found during review)

- [ ] **LinkedIn link is still a placeholder** (`https://www.linkedin.com/` in `app/page.jsx` socials). Put the real profile URL in.
- [ ] **Stray lockfile confuses Turbopack**: delete `/Users/jaskiratsingh/package-lock.json` (in your home directory, not the repo) or set `turbopack.root` in `next.config` — silences the workspace-root warning in every build.
- [ ] **THREE.Clock is deprecated** (`app/components/BackgroundScene.jsx:108`) — migrate to `THREE.Timer` before a future three.js upgrade breaks it.
- [ ] **Delete unused starter assets** in `/public`: `file.svg`, `globe.svg`, `next.svg`, `vercel.svg`, `window.svg`.
- [ ] **Unused components on disk** (`HeroScene.jsx`, `CustomCursor.jsx`): harmless (not imported, not bundled), but delete them if you want a clean tree.
- [ ] **No OG image**: `layout.js` metadata declares OpenGraph but there's no 1200×630 image. Recruiters sharing your link on LinkedIn/WhatsApp will get a bare card. Add `/public/og.png` (espresso bg, serif headline, orange LED dot) and reference it in `metadata.openGraph.images`.

## Pass 1 — Build & hosting

Goal: the exact thing you deploy builds clean and runs on Netlify.

- [x] `npm run build` passes — verified 2026-07-14: 11 routes, all static/SSG, zero errors.
- [ ] Serve the production build locally and click through everything: `npm run build && npm start` (kill the dev server first — they share `.next`). **All performance judgments below must be made on this, not on `npm run dev`** — dev mode is 3–10× slower.
- [ ] Pin Node for Netlify: add `NODE_VERSION=22` in Netlify env (or a `.nvmrc` with `22`). Your local default Node 18 fails this build — Netlify's default may too.
- [ ] Confirm the Netlify Next.js runtime picks up SSG routes: deploy a **preview** (not production) and open `/projects/warehouse-optimizer` directly by URL (hard refresh, not client navigation).
- [ ] Open `/projects/does-not-exist` → should 404, not crash.

## Pass 2 — Performance / no-lag (the big one)

Goal: 60fps scroll on mid hardware, fast first load.

Setup: production build, Chrome DevTools → Performance panel, and the site's
built-in FPS readout: open `http://localhost:3000/?debug` (bottom-left HUD shows
FPS · TIER · SCROLL% · TRACE%).

- [ ] **Scroll the full page at 4× CPU throttle** (DevTools → Performance → CPU 4×). Watch the `?debug` FPS. It should hold ≥50fps everywhere; note WHERE it dips — the likely suspects in this repo:
  - `BackgroundScene` (always-on WebGL: 1500 stars + 8 polyhedra + 3 torus rings + 3 point lights). If it's the bottleneck: lower star count to ~600, drop to 2 lights, or clamp DPR to 1.5 instead of 2. There's a ready-made `detectTier()` in `app/lib/useReducedMotion.js` that is currently **not used** by BackgroundScene — wire it: tier B → half the particles, tier C → skip WebGL entirely and keep only the CSS glow orbs.
  - The **grain overlay** (200%-sized fixed element, `mix-blend-mode: overlay`, stepped keyframes). Toggle it off in DevTools (`display:none` on `.grain`) and compare FPS — blend modes over a WebGL canvas can force expensive compositing. If it costs >5fps, reduce opacity/size or drop the flicker animation.
  - The **project rail scrub** re-renders React state on scroll (`useScrollProgress` quantizes to 0.1% — verify no long tasks appear in the Performance flame chart while scrolling the rail).
- [ ] **Record a Performance trace of one full scroll** — look for: long tasks >50ms, layout thrash (purple "Recalculate style/Layout" storms), and dropped frames during SlideDock entrances.
- [ ] **Lighthouse (mobile) on the production build** — target: Performance ≥ 90, CLS = 0, LCP < 2.5s. Repo-specific risks:
  - **LCP**: the boot preloader covers first paint and the hero text starts at opacity 0 until `js:boot-done`. If Lighthouse punishes this, cap boot even tighter for first paint or exempt the subhead from scatter.
  - **Bundle**: three.js loads in the initial bundle (BackgroundScene is imported eagerly by `page.jsx` AND LoadingGate by `layout.js`). If the initial JS is heavy, `next/dynamic(..., { ssr: false })` the BackgroundScene.
- [ ] **Memory/leak check**: navigate home → detail page → home 5×, then DevTools → Memory → check detached canvases / growing heap. (All three.js effects have dispose cleanups — verify they actually run.)
- [ ] **Leave the tab and return** (document.hidden) — animations should pause (they do by design; confirm CPU drops to ~0 in Task Manager while hidden).
- [ ] **Boot preloader**: hard-refresh with cleared sessionStorage — boot must cap ≤2.4s, any click/keypress skips it, and it never plays twice per session.

## Pass 3 — Motion walkthrough (jank + correctness per section)

Goal: every choreographed moment fires once, in order, and reverses cleanly.

Scroll slowly top → bottom, then bottom → top, checking:

- [ ] Hero scatter converges fully (no letter stuck offscreen); name underline draws AFTER the letters land; CTAs rise last.
- [ ] Intersection beat: CODE/HARDWARE lines cross under the italic word "intersection", merged line continues down.
- [ ] Stats odometers roll once; the 300 ticks to 301 with the flash.
- [ ] Experience: each card slides from the right, via lights + spark fires once, date stamp lands; scrolling back does NOT re-deal cards.
- [ ] Project rail: 6 dossiers dock alternating sides; pulse rides the rail; HUD ticks FILE 0X/06; scrolling back dims files but stamps stay.
- [ ] Marquee: speeds up/reverses with scroll velocity, drag nudges it, solid word advances.
- [ ] Fast-scroll test: hold PgDn / flick to the bottom instantly — nothing should stay invisible (the IO "rescue clause" should snap everything in). Then reload mid-page (browser scroll restoration) and confirm the same.
- [ ] Footer LED pulses 3×, then rests.

## Pass 4 — Mobile & cross-browser

- [ ] **360px width** (DevTools responsive): no horizontal scrollbar anywhere (the lateral entrances are the risk — sections have `overflow-x: clip`, verify it holds through hero scatter and marquee).
- [ ] Rail on mobile: spine at the left margin, all dossiers full-width from the right, rail HUD hidden.
- [ ] Real phone test over LAN: `http://192.168.x.x:3000` — scroll smoothness with the WebGL background is THE thing to feel here; if a mid-range phone stutters, that's the trigger for the tier-gating in Pass 2.
- [ ] Touch: TiltCard/Magnetic are mouse-only — confirm they don't eat taps (cards and links must tap-navigate on first touch).
- [ ] **Safari** (real or via a friend): `backdrop-filter` (nav), `-webkit-text-stroke` (marquee/ghost numerals), sticky HUD, font rendering of Instrument Serif italics.
- [ ] Firefox: check the grain blend mode and the odometer roll.
- [ ] Notched phones: `viewportFit: cover` is set — check the nav doesn't sit under the notch in landscape.

## Pass 5 — Content & links

- [ ] Click every link: 6 project GitHub repos, live demo links, HireFlow repo, LeetCode, GFG, `tel:`, `mailto:`, and the 3 resume PDFs (they exist in `/public` — verified — but confirm they download with the right filename and open uncorrupted).
- [ ] Every dossier opens its `/projects/[slug]` page; "Back to the rail" returns to `#projects`.
- [ ] Proofread: stray copy like `AWS(Amazon Web Service` (missing paren) and `Structured Query Language(SQL)` (missing space) in the skills data.
- [ ] Nav scrollspy highlights the right section for all five links; "Hire me" opens mail.

## Pass 6 — Accessibility & reduced motion

- [ ] DevTools → Rendering → **Emulate prefers-reduced-motion** → reload: no boot, everything visible in place, page still looks designed (no half-states).
- [ ] Keyboard-only pass: Tab reaches nav, CTAs, resume dropdown (opens/closes, items reachable), every card link, socials; focus ring visible on the dark bg AND on paper dossiers.
- [ ] Skip link ("Skip to content") appears on first Tab and jumps to `#main`.
- [ ] Exactly one `<h1>` (the hero). Decorative motion (traces, sparks, ghost numerals, marquee) is `aria-hidden` — spot-check with the accessibility tree.
- [ ] Contrast: `--text-dim` on `--bg` and the mono muted labels ≥ 4.5:1 (check the paper dossier date labels too).

## Pass 7 — SEO & meta

- [ ] `metadataBase` URL matches the real Netlify domain (currently `jaskirat-portfolio.netlify.app` in `layout.js`).
- [ ] Title/description render (view-source), canonical + robots present, favicon shows in the tab.
- [ ] OG image from Pass 0 renders: test with an OG preview tool after deploy.

## Pass 8 — Final pre-flight

- [ ] Read the full diff once (`git diff` + untracked files) — per your own rule: **one commit at the very end**, written by you.
- [ ] Deploy to a **Netlify preview** first; re-run Lighthouse against the preview URL (real CDN, real compression).
- [ ] After production deploy: hard-refresh test on your phone over cellular (not wifi), and click one resume + one project.

---

**Suggested order of attack for "no lag" specifically:** Pass 1 (prod build) → Pass 2 with `?debug` → fix whatever the FPS readout blames (90% likely: tier-gate BackgroundScene, grain overlay) → Pass 4 on a real phone → everything else.
