# Jaskirat Portfolio — Claude Code Build Prompts · **THE TRACE EDITION**

A sequenced set of copy-paste prompts for upgrading the live portfolio (https://github.com/Jaskirat314276/PORTFOLIO) in Claude Code — from "solid dark portfolio" to **full award-show**. Same content (every project, stat, and line of copy in `app/projects/data.js` / `app/page.jsx` is kept verbatim), same discipline (static before motion, transform/opacity only, `prefers-reduced-motion` sacred, 60fps or it doesn't ship) — but the site gets one big idea executed relentlessly: **THE TRACE**, and a Projects centerpiece where **every dossier slides in from the sides** and docks onto it.

**⚠️ WORKFLOW NOTE (owner's rule):** **No commits between prompts.** Every prompt below ends with a *Done when* checklist you verify in `npm run dev` — Claude Code must NEVER run `git commit`. You review everything locally and make **one commit at the very end** (Prompt 12 prepares the review package and suggested commit message).

**What's new in v2:**

| v1 (live site) | v2 (this) |
|---|---|
| Dark `#08080a` + orange `#ff6b3d` + stray blue/purple/green accents | **Claude design language** — warm espresso `#1a1815`, ivory `#f0eee5`, ONE terracotta accent `#d97757`, paper-cream `#faf9f5` dossiers |
| Fonts via `@import` inside `<style>` | `next/font` — Bricolage Grotesque + Instrument Serif (kept) + **JetBrains Mono** (new, for eyebrows/labels/HUD) |
| Everything fades up from below | **THE LATERAL DOCTRINE** — projects, experience, achievements, socials **enter from the sides** and dock onto the trace |
| Sections float independently | **THE TRACE** — one terracotta PCB-style line born in the preloader, crossing `CODE × HARDWARE` under the word "intersection", running the whole page, ending as the footer LED |
| Projects = stacked rows | **THE PROJECT RAIL** — 6 paper case-file dossiers deal in from alternating sides, dock with a spark, get rubber-stamped (`FLAGSHIP · 2026`, `300V TESTED`…), while a signal pulse rides the rail and a mono HUD ticks `FILE 03/06` |
| Voxel-JS loader (kept!) | **Boot sequence** — same voxel "JS" assembly, re-colored, + POST log + 000→100 counter → powers on the nav LED |
| CountUp stats | **Slot-machine odometer** + the LeetCode counter ticking `300 → 301` while you watch |
| 2 always-on WebGL contexts (bg + hero) | **One** lazy WebGL context (hero only); background → CSS glows; fps watchdog + device tiers |
| Placeholder `github.com` / `linkedin.com` links | Real profile links fixed |
| — | Custom cursor labels (VIEW/OPEN/DRAG/PRESS), velocity marquee, paper detail pages, Morse-code LED easter egg |

**Stack (final):** existing Next.js 16 + React 19 + Tailwind v4 + three.js (kept, lazy) **+ `motion` (Framer Motion for React 19) + GSAP (ScrollTrigger + Observer) + Lenis (optional)**. Upgrade in place — **do not re-scaffold**.

---

## Two ways to use this

- **Option A — the step-by-step series (Prompts 0–12 below).** Most control, easiest to review, best result. Recommended.
- **Option B — the one-shot master prompt (right here).** Paste once, let Claude Code build the whole thing, then review the full diff.

### Option B — one-shot master prompt

```
Upgrade my existing portfolio (this repo — Next.js 16 App Router, React 19, Tailwind v4, three.js) into an award-winning (Awwwards-SOTD-calibre), fully animated single-page portfolio. PORTFOLIO_PAGE.md in this repo is the source of truth for sections, copy, and the design/motion system — follow it exactly. UPGRADE IN PLACE: keep app/projects/data.js and all /projects/[slug] routes, keep every real word of copy, do NOT re-scaffold, and do NOT invent new content.

CRITICAL WORKFLOW RULE: never run `git commit`, `git add`, or any git write command. Leave every change uncommitted in the working tree — I review locally and commit once myself at the end. Maintain V2_CHANGELOG.md, appending a short summary of each work stage so I can review.

DESIGN SYSTEM (Claude design language, warm-dark — match exactly, one accent only):
- Palette: bg #1a1815 · surface #23211d · surfaceHi #2c2925 · border #38342d · borderHi #4a443a · text #f0eee5 · textDim #b0aa9c · textMuted #7a7466 · accent #d97757 · accentDim #a8593c · accentSoft rgba(217,119,87,0.13) · paper #faf9f5 · paperInk #1f1e1d · paperLine #e8e5db · success #7d9b76 · danger #c45a4a · info #6a8fae. Kill ALL v1 colors (#ff6b3d, #5b9eff, per-category skill colors).
- Type via next/font/google: Instrument Serif (display + italic accent words), Bricolage Grotesque (body), JetBrains Mono (eyebrows/labels/REF designators/HUD — UPPERCASE, 0.14em tracking).
- Texture: film grain 3–5% flickering ~10fps (stepped) · ghost section numerals 01–08 (Instrument Serif, 12–16vw, transparent fill, 1px borderHi text-stroke, aria-hidden) · PCB dressing (hairline traces with 45° bends, via rings, mono REF plates like "FIG. 04 — THE RAIL", corner ticks) · paper dossiers (paper bg, paperInk text, terracotta rubber stamps rotated −8°) · soft terracotta glows 8–12% behind hero/rail/contact · ::selection accentSoft/accent · thin scrollbar · 2px accent focus-visible rings.

MOTION DOCTRINE:
- transform + opacity only (exceptions: SVG pathLength/dashoffset, short one-shot clip-paths). 60fps.
- Tokens: reveal 450–650ms expo-out [0.16,1,0.3,1] · slideDock 650ms expo-out, x ±96px desktop / ±24px mobile + rotate 1.5°→0 · maskLine 700ms [0.65,0,0.35,1], 90ms line stagger · scramble 900ms (mono eyebrows) · stamp/flip 500ms back-out [0.34,1.56,0.64,1] · spring {stiffness:500,damping:30} · hover 180ms · scrub = scroll-tied · ambient loops 6–10s · marquee 40s velocity-reactive · sibling stagger 70ms.
- THE LATERAL DOCTRINE (the owner's signature request): objects enter FROM THE SIDES — project dossiers alternate left/right, experience cards from the right, achievements alternate, contact socials alternate. Text may rise from masks; OBJECTS travel laterally and "dock" onto the trace with a spark. Never cause horizontal overflow (overflow-x: clip on sections).
- One hero per moment; every loop pauses offscreen + on document.hidden; moving things are the only light sources.
- prefers-reduced-motion: no preloader, native cursor, trace pre-drawn, dossiers in place, odometer static, marquee static. The reduced page must still look deliberately designed.

THE TRACE (the one big idea): a single terracotta circuit trace with 45° PCB bends travels the whole page — born in the boot preloader → powers the nav LED (id="nav-led") → hero scroll-cue drop → two hairlines labeled CODE and HARDWARE draw from opposite sides and CROSS exactly under the italic word "intersection" in the About headline, merging into one line → skills margin run → experience timeline spine (via ring per role) → IS the Project Rail → achievements/education pass → converges into the contact email underline → terminates as the footer LED (id="footer-led") which pulses three times and rests. Per-section SVG segments that visually read as one continuous line, each segment's pathLength scrubbed to scroll. ?debug HUD shows FPS · TIER · SCROLL% · TRACE%.

SET PIECES (build all — details and exact copy in PORTFOLIO_PAGE.md §4–§6):
1. BOOT PRELOADER (rework components/LoadingGate.jsx, keep its voxel-"JS" three.js assembly but re-color terracotta/ivory): mono POST log (BOOT · PSU OK · CLK 60FPS · LOAD PORTFOLIO) + JetBrains Mono counter 000→100 with three stutter-stalls and glyph-scramble digits → the final dot flies to the nav and lights #nav-led (the trace is born). ≤2.4s hard cap, any click/keypress skips, sessionStorage "js-boot" so it plays once per session, reduced-motion skips entirely.
2. CUSTOM CURSOR v2 (upgrade existing dot+ring): mono labels VIEW (links) / OPEN (dossiers) / DRAG (marquee) / PRESS (buttons); ring expands on targets; fine pointers + tier A only.
3. HERO: re-theme the existing three.js icosahedron (mesh terracotta, inner wire ivory, outer wire borderHi, particles terracotta↔ivory ramp — kill the blue), lazy dynamic import ssr:false, DPR clamp 1.5, pause offscreen; REPLACE BackgroundScene's WebGL with CSS glow orbs (one WebGL context max, total). Kinetic type: eyebrow "AVAILABLE FOR OPPORTUNITIES · 2026" scramble-decrypts; headline mask-rises; "Jaskirat Singh" (Instrument Serif italic terracotta) gets per-char rotate-in + a trace underline drawing 800ms later; magnetic "See my work" CTA; the 3-resume Download dropdown (real PDFs in /public) springs open with 60ms item stagger.
4. THE PROJECT RAIL (centerpiece — spend the most time): a central vertical trace with 45° bends; the SIX dossiers from data.js as PAPER cards (paper bg, ink text, serif file numbers 01–06, tag chips, arrow) DEAL IN from alternating sides (odd left, even right; mobile all-right ±24px), dock onto stub traces with a via-light + 6-particle spark, then a terracotta rubber stamp slams on 200ms later: 01 "FLAGSHIP · 2026" · 02 "SHIPPED" · 03 "LIVE DEMO" · 04 "LIVE DEMO" · 05 "HARDWARE · 300V TESTED" · 06 "SIMULATION". A glowing signal pulse with a particle tail rides the rail scrubbed to scroll; docked files sit lit, undocked at 0.55 opacity; sticky mono HUD ticks "FILE 03/06 — AI LINKEDIN POST GENERATOR · 048%". Cards link to the existing /projects/[slug] routes; hover = 4px lift + 1° tilt + cursor OPEN. Scrub drives only rail/pulse/lighting/HUD (cards dock once via whileInView, never un-deal). Reduced motion: rail drawn, all lit, static stamps.
5. PAPER DETAIL PAGES: /projects/[slug] flips to full paper mode (paper bg, ink text, terracotta accents, same nav, "← Back to the rail") — you opened the file.
6. SUPPORTING CAST: stats odometer (6+ · 300+ · 2+ · 200+, digit columns roll, then the 300 ticks to 301 with a flash) · skills as 8 IC-package cards (pin stubs, REF designators U1–U8, pins glow on hover, chips cascade) · experience spine (via per role sparks as each card slides in from the right, bullets cascade, date chip stamps) · giant outlined-serif velocity marquee "CODE · CIRCUITS · DATA · GENAI ·" with a thin counter-marquee of real stack keywords · achievements cards from alternating sides, icons stamp in · education = calm rest beat · "CURRENTLY SHIPPING" strip teasing HireFlow AI (link https://github.com/Jaskirat314276/AI_EMAIL_SENDER-HIREFLOW-AI-, mono IN DEVELOPMENT tag with scanline sheen, an envelope-dot launches along a bezier every ~6s) · contact: serif "Let's build something together.", magnetic email jaskiratsingh314276@gmail.com, three faint trace lines converge into the email underline, social pills dock from alternating sides WITH REAL LINKS (GitHub https://github.com/Jaskirat314276 · LinkedIn TODO-marked · LeetCode https://leetcode.com/Jaskirat-singh · GeeksforGeeks https://www.geeksforgeeks.org/user/jaskiratsi2k1r · tel:+918340361891) · footer LED pulses three times then rests; EASTER EGG: triple-click the LED (or type "jas") → it blinks "HIRE ME" in Morse, console.log("ok, you found it. now go hire jaskirat. — the trace"), once per session.
7. NAV: hide on fast scroll-down / spring back up; scrolled = surface/85 + blur + hairline; scrollspy terracotta dot slides between links (layoutId); mobile menu = full-screen overlay, oversized serif links mask-rise 60ms stagger.

PERFORMANCE & A11Y (non-negotiable): device tiers A/B/C (pointer+cores+saveData) with an fps watchdog (three 2s windows <48fps → drop a tier live); initial route JS ≤160KB gz with three.js lazy; CLS 0; content-visibility below the fold; semantic landmarks, one h1, skip link, 2px accent focus rings, aria-hidden on all decorative motion, keyboard walkthrough incl. the dropdown; contrast ≥4.5:1; no horizontal overflow 360→1920.

META: title "Jaskirat Singh — Engineer at the intersection of code & hardware.", description from the hero subhead, OG image 1200×630 (espresso bg, serif headline, terracotta LED dot), favicon = terracotta dot on #1a1815, robots/canonical, npm run build clean for Netlify.

ORDER OF WORK (verify each stage in dev before the next; append each stage to V2_CHANGELOG.md; NO COMMITS):
1 theme re-skin (zero motion) → 2 static v2 layout everything → 3 reveal/slide-dock systems → 4 the trace → 5 preloader/cursor/nav → 6 hero → 7 rail docking → 8 rail scrub + paper pages → 9 odometer/skills/experience → 10 marquee/achievements/now-building/contact/footer+egg → 11 perf/a11y/responsive audit → 12 meta + build check + final review summary.

THE BAR: a recruiter scrolls once and remembers — paper case files sliding in from the sides onto one terracotta trace, from power-on to the footer LED. Maximal motion, every move on-brand, on-easing, 60fps. If a flourish fights the trace, cut the flourish.
```

---

## How to use this (Option A)

1. **Put `PORTFOLIO_PAGE.md` in the repo root** — it is the source of truth for copy, sections, and the design system. Where it and these prompts conflict, these prompts win.
2. **Start on a branch:** `git checkout -b v2-trace`. Since you're not committing between prompts, the branch plus your final review is your safety net. If a single prompt goes sideways, tell Claude Code exactly which step to revert — don't `git checkout .` (that would wipe *all* prompts).
3. **Add the working-rules file first** (Prompt 0). It keeps palette, tokens, doctrine, and the **no-commit rule** in context for every later prompt.
4. **Paste prompts one at a time, in order.** Let each finish, run `npm run dev`, and clear its *Done when* checklist before moving on. **Do not commit** — Claude Code appends a summary of each prompt to `V2_CHANGELOG.md` instead, so nothing is lost for your final review.
5. **Static before motion — still the law.** Prompts 1–2 re-skin and re-lay the entire page with zero new motion. 80% of the award-winning look is spacing and type; the motion only lands if the static page already looks expensive.
6. **Test like a judge.** After every motion prompt: (a) scroll the whole page watching the `?debug` FPS readout, (b) DevTools → Rendering → *Emulate prefers-reduced-motion* and re-scroll, (c) 4× CPU throttle and confirm the tier watchdog degrades gracefully, (d) tab through with the keyboard.
7. **One hero per moment.** If two things animate at once and compete, cut or delay one. The trace always wins ties.
8. **At the very end** (after Prompt 12's review package): read `V2_CHANGELOG.md`, skim `git diff --stat`, click through everything once more, then make **your one commit**.

---

## Prompt 0 — Drop in the working rules (paste once, don't run as a task)

Create `V2_RULES.md` at the repo root with exactly this content, and append the single line `@V2_RULES.md` to the existing `AGENTS.md` (below its Next.js block — do not delete anything in it):

```
# Jaskirat Portfolio v2 — working rules (THE TRACE)

Full brief: PORTFOLIO_PAGE.md (sections, copy, design system). This file is the always-on cheat sheet.

## Non-negotiables
- NEVER run git commit / git add / any git write command. The owner reviews locally and commits once at the end. After each work stage, append a 3–6 line summary to V2_CHANGELOG.md (create it if missing) instead.
- UPGRADE IN PLACE. This is a live Next.js 16 App Router site. Keep app/projects/data.js verbatim, keep all /projects/[slug] routes, keep every real word of copy. Never re-scaffold, never invent content, never add placeholder text.
- This Next.js version may differ from training data — read the relevant guide in node_modules/next/dist/docs/ before structural changes (per AGENTS.md).
- Animate transform + opacity ONLY (exceptions: SVG pathLength/stroke-dashoffset, short one-shot clip-paths). 60fps or it doesn't ship.
- prefers-reduced-motion honored in EVERY component: no preloader, native cursor, trace pre-drawn, dossiers/toys at end states, odometer/marquee static. The reduced page must still look deliberately designed.
- Every loop/rAF pauses offscreen (IntersectionObserver) and on document.hidden. ONE WebGL context max, lazy-loaded.
- Semantic HTML: header/nav/main/section/footer, exactly ONE h1 (hero), skip link, focus-visible rings (2px accent, 2px offset), aria-hidden on ALL decorative motion (trace, numerals, particles, grain, HUD, marquee, cursor).
- Voice: confident, calm, editorial. The MOTION is maximal; the COPY never changes.

## Palette (Claude design language, warm-dark, ONE accent — do not invent colors)
bg #1a1815 · surface #23211d · surfaceHi #2c2925 · border #38342d · borderHi #4a443a
text #f0eee5 · textDim #b0aa9c · textMuted #7a7466
accent #d97757 · accentDim #a8593c · accentSoft rgba(217,119,87,0.13)
paper #faf9f5 · paperInk #1f1e1d · paperLine #e8e5db
success #7d9b76 · danger #c45a4a · info #6a8fae
Kill all v1 colors on sight: #ff6b3d, #5b9eff, and the per-category skill colors.

## Type (via next/font/google — no @import in <style>)
Display 'Instrument Serif' — huge editorial headlines + italic accent words (+ ghost numerals via 1px borderHi text-stroke)
Body    'Bricolage Grotesque' 300–700
Mono    'JetBrains Mono' — eyebrows/labels/REF designators/stats/HUD, UPPERCASE, letter-spacing 0.14em

## Motion tokens (single source: app/lib/motion.js — use these names)
reveal     450–650ms · expo-out [0.16,1,0.3,1]
slideDock  650ms · expo-out · x ±96px desktop / ±24px mobile · rotate 1.5°→0 (THE lateral entrance)
maskLine   700ms · [0.65,0,0.35,1] · 90ms line stagger
scramble   900ms — mono decrypt from glyph soup (▓▒░#$%), eyebrows only
stamp      500ms · back-out [0.34,1.56,0.64,1] — rubber stamps, chips, ticks, digit settles
spring     { stiffness: 500, damping: 30 }
hover      180ms ease-out
scrub      scroll-tied, no duration (GSAP scrub 0.8–1.2 where used)
loop       6–10s ease-in-out infinite (ambient only; LED pulse 2.4s)
stagger    70ms siblings · 90ms headline lines · 30ms chips

## THE TRACE (signature — the one big idea)
One terracotta circuit trace with 45° PCB bends travels the whole page: boot preloader → nav LED (#nav-led) → hero scroll-cue → CODE × HARDWARE hairlines crossing under the word "intersection" (About) → skills margin → experience spine (via per role) → IS the Project Rail → achievements/education pass → contact email underline convergence → footer LED (#footer-led, pulses 3×, rests). Per-section SVG segments that read as ONE line; each segment's pathLength maps to its scroll window. When in doubt, spend effort on the trace.

## THE LATERAL DOCTRINE (owner's signature request)
Objects enter FROM THE SIDES and dock onto the trace: project dossiers alternate left/right (mobile: all from right, ±24px), experience cards from the right, achievements alternate, contact socials alternate. Text rises from masks; OBJECTS travel laterally. Docking = stub trace draws + via lights + 6-particle spark. Sections get overflow-x: clip so entrances never cause horizontal scroll.

## Choreography rules
1. Nothing enters alone — parent first, children staggered 70ms.
2. One hero per moment — while the Rail scrubs, nothing else on screen moves.
3. Moving things are the light sources — the pulse, the cursor, the trace carry glow; static UI never glows (except the 3 section glows).
4. Stamps land AFTER their card docks (200ms later), always back-out, always slightly rotated.
5. Exit animations are half the duration of entrances.

## Performance budget & tier ladder
Budget: 60fps scroll · CLS 0 · initial route JS ≤160KB gz (three.js and GSAP-heavy scenes lazy-loaded) · ≤1 WebGL context · DPR clamp 1.5 · will-change only while animating.
Tiers (app/lib/tier.js, decided once at boot, with setTier() for the watchdog):
  A — pointer:fine + hardwareConcurrency ≥8 + no reduced-motion + no saveData → everything.
  B — mid → no WebGL hero (static composed poster + CSS glow), pulse tail 4 particles, no tilt/velocity FX.
  C — touch/weak/saveData → CSS glows only, native cursor, no particles, static marquee.
Watchdog: rAF-sampled fps in 2s windows; 3 consecutive <48fps → drop one tier live (console.info it).
Debug: ?debug renders a fixed mono HUD — FPS · TIER · SCROLL% · TRACE%.

## Texture
Film grain 3–5% flickering ~10fps (stepped). Ghost numerals 01–08 behind section heads. PCB dressing: hairline traces (45° bends), via rings, corner ticks, mono plates ("FIG. 04 — THE RAIL"). Paper dossiers with terracotta rubber stamps at −8°. ::selection accentSoft/accent. Thin scrollbar (borderHi thumb → accentDim hover).
```

---

## Prompt 1 — Theme swap: tokens + fonts + libs + tier system + debug HUD

```
Re-skin the entire existing site to the v2 design system from V2_RULES.md — ZERO layout or motion changes in this prompt. The site must look fully re-branded and build clean. Do not commit; append a summary to V2_CHANGELOG.md.

Do:
- npm i motion gsap lenis (motion = Framer Motion for React 19).
- app/theme.js: export the full palette + font stacks as tokens; expose them as CSS custom properties (:root vars in globals.css) so both Tailwind v4 and the existing inline styles can consume them.
- app/lib/motion.js: export every motion token from V2_RULES.md (ease arrays, durations, spring, stagger, slideDock distances) — every later component imports identical values, no magic numbers.
- app/lib/tier.js (compute once at boot: A/B/C per V2_RULES.md ladder + setTier() escape hatch) and app/lib/useReducedMotion.js (single shared hook).
- Fonts: migrate to next/font/google in app/layout.js — Bricolage_Grotesque, Instrument_Serif, JetBrains_Mono as CSS variables; DELETE the @import url(...) lines inside the <style> tags of app/page.jsx and app/projects/[slug]/page.jsx.
- Sweep EVERY file and replace v1 colors with tokens: #ff6b3d → accent, #5b9eff → (nothing — remove/replace with borderHi or textDim), #08080a → bg, #f5f1ea → text, rgba(245,241,234,…) → token equivalents, per-category skill colors → single accent. Includes Nav, LoadingGate, BackgroundScene, Reveal, TiltCard, Magnetic, CustomCursor, both pages, and the ambient orbs (both become terracotta at 8–12%).
- GrainOverlay: extract the inline grain div into components/GrainOverlay.jsx; make it FLICKER by stepping an oversized grain layer through 4–6 offset positions at ~10fps via a steps() CSS animation (transform only; reduced motion → static frame).
- Base CSS: ::selection (accentSoft bg / accent text), thin scrollbar (borderHi thumb → accentDim hover), global focus-visible ring (2px accent, 2px offset), html { color-scheme: dark }.
- Debug HUD: when location.search includes "debug", render a fixed bottom-left mono panel showing FPS (rAF-sampled) · TIER · SCROLL% · TRACE% (stub 0). aria-hidden.

Done when: npm run dev shows the same site fully re-branded (warm espresso + ivory + terracotta only — zero orange/blue remnants anywhere, check the loader too), fonts load via next/font with no FOUT, grain flickers, ?debug shows live FPS/TIER, npm run build passes, and V2_CHANGELOG.md has the Prompt 1 entry.
```

---

## Prompt 2 — Static v2 pass: extract sections + editorial/PCB dressing + all slots reserved

```
Rebuild the page as STATIC v2 layout — real copy verbatim, premium spacing, zero new motion. This is where the award is won. Do not commit; append to V2_CHANGELOG.md.

Do:
- Extract app/page.jsx into app/sections/: Hero, About, Skills, Experience, ProjectRail, Marquee, Achievements, Education, NowBuilding, Contact, Footer — page.jsx becomes composition + shared chrome. Keep the existing responsive class names working (globals.css overrides) or migrate them carefully — no mobile regressions.
- Ghost numerals 01–08 (Instrument Serif, 12–16vw, transparent fill, 1px borderHi text-stroke, absolute behind each section heading, aria-hidden, overflow-clipped): About 01 · Skills 02 · Experience 03 · Projects 04 · Achievements 05 · Education 06 · Now Building 07 · Contact 08.
- Eyebrows become mono chips (JetBrains Mono, uppercase, 0.14em, hairline border, 4px radius): "ABOUT ME", "SKILLS & TOOLS", "EXPERIENCE", "SELECTED WORK — 6 FILES", "ACHIEVEMENTS", "EDUCATION", "CURRENTLY SHIPPING", "GET IN TOUCH".
- Nav: add the terracotta LED dot next to the wordmark (id="nav-led", currently just statically lit) and a reserved slot under the links for the scrollspy dot (Prompt 5).
- Hero: keep the grid; under the CTAs add the mono microline "FULL-STACK · GENAI · DATA · HARDWARE"; add the scroll cue at the hero's bottom center — a 48px vertical hairline ending in a small terracotta dot (the trace's origin, static for now).
- About: set the headline so the italic word "intersection" is wrapped in a span with id="ix-word"; behind the headline reserve a wide shallow <svg> slot for the CODE × HARDWARE crossing (Prompt 4). Build the stats row with each numeral as stacked digit columns inside overflow:hidden slots, static at final values (6+ · 300+ · 2+ · 200+) — Prompt 9 turns them into odometers.
- Skills: restyle the 8 category cards as IC packages — tiny hairline pin stubs on the left/right card edges, mono REF designator top-right (U1…U8), serif category name, chips inside. ONE accent color (drop the per-category colors; keep the lucide icons).
- Experience: add the vertical spine slot down the left margin with a via ring (small hairline circle) per role; cards to its right. Static.
- ProjectRail: the centerpiece's STATIC layout. A central vertical hairline rail (SVG slot, 45° bends between file slots); the 6 dossiers from data.js as PAPER cards (paper bg, paperInk text, paperLine rules, slight lift shadow): serif file number 01–06, title, date, first-sentence desc (full desc stays on detail pages), mono tag chips, ArrowUpRight. Alternate cards left/right of the rail (stack right-of-margin-rail on mobile). Each card: a static terracotta rubber stamp (rotated −8°, 1.5px accent border, mono): 01 FLAGSHIP · 2026 / 02 SHIPPED / 03 LIVE DEMO / 04 LIVE DEMO / 05 HARDWARE · 300V TESTED / 06 SIMULATION. Short stub trace + via ring connecting each card to the rail. Blueprint dressing: corner ticks, mono plate "FIG. 04 — THE RAIL", a reserved top-right slot for the HUD (Prompt 8). Cards keep their Link to /projects/[slug].
- Marquee band (NEW, between ProjectRail and Achievements): giant outlined Instrument Serif "CODE · CIRCUITS · DATA · GENAI · " repeated (transparent fill, 1px borderHi text-stroke, ~10vw), one word per repetition solid accent; beneath it a thin mono row of real stack keywords (FASTAPI · YOLOV8 · SARIMA · LANGCHAIN · REACT · DOCKER · MATLAB · POWER BI …) at 0.35 opacity. Duplicate content 2× inside overflow:hidden containers, static.
- Achievements: 2-column masonry of the 6 real cards, icon in a stamp-styled ring. Education: keep rows, grade in Instrument Serif. NowBuilding (NEW): eyebrow chip CURRENTLY SHIPPING + mono tag IN DEVELOPMENT; serif "Now building: HireFlow AI — a job-outreach copilot."; one-liner "Turns a spreadsheet of recruiters into personalized, paced, tracked cold email — extraction to inbox to interview."; small envelope icon; link the card to https://github.com/Jaskirat314276/AI_EMAIL_SENDER-HIREFLOW-AI-.
- Contact: keep serif headline + magnetic email; add an empty underline <svg> slot beneath the email and three faint edge line-slots (left/right/bottom) for the Prompt 10 convergence; social pills stay (links fixed in Prompt 10). Footer: dead-center above the copyright row, an 8px terracotta dot (id="footer-led", statically glowing) at the end of a short vertical hairline slot.
- Give every section position:relative + overflow-x:clip (lateral entrances must never scroll the page sideways).

Done when: the ENTIRE page reads as a re-designed premium static site at 360/768/1440px with zero console errors and zero CLS-risk (every future animation has a reserved slot), the dossiers look like real paper documents on a dark desk, ghost numerals read as texture not clutter, and V2_CHANGELOG.md is updated.
```

---

## Prompt 3 — Motion systems: Reveal v2 + MaskLines + SlideDock + progress hairline

```
Site-wide motion primitives that everything later builds on. Import all timings from app/lib/motion.js — no magic numbers. Every component consults useReducedMotion(). Do not commit; append to V2_CHANGELOG.md.

- components/Reveal.jsx (v2): rewrite on motion/react — whileInView fade 0→1 + rise 20px→0, reveal token, viewport once:true margin "-10% 0px", optional stagger prop (70ms children). Keep the same component API so existing usages keep working.
- components/MaskLines.jsx: splits headline text into lines (resize-safe re-split), wraps each in overflow:hidden, lines rise 110%→0 with maskLine token at 90ms stagger. Keep intact text accessible; animate an aria-hidden visual copy. Apply to EVERY serif section headline.
- components/SlideDock.jsx (THE signature primitive — build carefully): props side ("left"|"right"), distance (default 96, 24 on mobile via matchMedia), dockDelay. whileInView once: x ±distance→0 + rotate 1.5°→0 (rotation sign follows side), slideDock token. Optional onDocked callback (fires at animation complete — Prompts 7/9/10 hook sparks/stamps to it). Reduced motion: plain fade.
- components/Stamp.jsx: a terracotta rubber-stamp chip that enters with the stamp token (scale 1.4→1, rotate to −8°, opacity 0→1) when triggered; reduced motion: static.
- Scroll progress hairline: 2px accent bar fixed at the very top, scaleX = page scroll progress (transform-origin left; reduced motion: hidden).
- Wire the primitives site-wide NOW with restraint: headlines via MaskLines; body/cards via Reveal; NOTHING uses SlideDock yet except one test — the About stat cards may slide from alternating sides as a first taste. The heavy lateral choreography lands in Prompts 7/9/10.

Done when: every serif headline rises from masks, sections reveal with staggered children exactly once, the top hairline tracks scroll, SlideDock/Stamp exist with clean APIs (+ a storybook-style test usage), reduced motion = plain fades, 60fps in ?debug.
```

---

## Prompt 4 — THE TRACE

```
The signature system. A single terracotta circuit line that travels the whole page as per-section SVG segments reading as ONE continuous trace. Do not commit; append to V2_CHANGELOG.md.

- components/Trace.jsx: a registry-based system — sections register a SEGMENT (SVG path ref + the scroll window [start,end] over which it draws). Trace.jsx maps each segment's pathLength/stroke-dashoffset to its window (motion useScroll + useTransform, or GSAP scrub 1 — pick ONE engine and use it for all segments). Styling: stroke accent, 1.5px, round caps, 45° PCB bends (no curves — this is a circuit, not a thread), a subtle drop-shadow glow, vector-effect non-scaling-stroke. All aria-hidden.
- Segments to wire NOW (align x-positions pixel-close so consecutive segments read as ONE line):
  s1 hero: from the scroll-cue dot, a short vertical drop drawing as you leave the hero.
  s2 about — THE INTERSECTION BEAT: two hairlines, mono-labeled CODE (from the left) and HARDWARE (from the right), draw toward each other and CROSS exactly under the #ix-word span ("intersection"), then merge into one line exiting the section bottom. Scrubbed across the section's scroll range. This is the thesis of the portfolio in one move.
  s3 skills: a margin run down the section's left edge with two 45° jogs.
  s4 experience: the timeline spine — the line draws down through the three via rings (vias light terracotta as the line passes; the spark-on-dock comes in Prompt 9).
  s5 project rail: RESERVED — Prompt 8 registers the Rail's own path here so the trace flows straight through the centerpiece.
  s6 pass-through: achievements → education → now-building margin line.
  s7 contact: on section enter, the underline beneath the email draws (600–800ms, expo-out, once) — plus the three convergence lines in Prompt 10.
  s8 footer: short vertical drop into #footer-led; when it completes, the LED scales in with the stamp token (its pulse choreography comes in Prompt 10).
- Wire TRACE% into the ?debug HUD (total drawn length / total length).
- Reduced motion: all segments render fully drawn and static; vias lit.

Done when: scrolling draws one continuous terracotta trace down the page — hero drop → CODE×HARDWARE crossing under "intersection" → skills margin → experience spine (vias lighting) → [rail gap] → pass-through → email underline → footer LED — with pixel-close handoffs between segments, TRACE% ticking in ?debug, and reduced motion showing everything pre-drawn.
```

---

## Prompt 5 — Boot preloader + custom cursor v2 + nav choreography

```
The cinematic entry and the pointer. All timings from motion.js; everything consults useReducedMotion() and useTier(). Do not commit; append to V2_CHANGELOG.md.

Boot preloader (rework components/LoadingGate.jsx → components/BootLoader.jsx — KEEP its voxel-"JS" three.js assembly, it's good; first visit per session only, ≤2.4s hard cap, sessionStorage "js-boot", any click/keypress skips instantly):
1. Re-color the voxel scene to v2 (voxels accent/accentDim, edges ivory, kill all blue) and clamp DPR 1.5.
2. Overlay, bottom-left, a JetBrains Mono POST log typing at ~24ms/char: "JS-CORE BOOT v2.0" → "PSU OK · 5V RAIL STABLE" → "CLK 60FPS" → "LOADING PORTFOLIO…". Bottom-right: a counter 000→100 over ~1200ms with THREE stutter-stalls (037, 061, 089) and glyph-scramble flicker on changing digits (▓▒░#$%).
3. At 100: log prints "POWER ON", the scene fades, and a small terracotta dot flies from the loader to the nav and lights #nav-led (coordinated FLIP/layout animation — the eye must read: the boot BECAME the nav LED; the trace is born).
4. Hero MaskLines start at handoff 60%, so content is already rising as the loader exits.
- Reduced motion or repeat visit: no loader at all, #nav-led simply lit.

Custom cursor v2 (upgrade components/CustomCursor.jsx; fine pointers + tier A only — current touch guards stay):
- Keep the dot + lerping ring; add a mono label that swaps with the stamp token per data-cursor attribute: links/nav VIEW · project dossiers OPEN · marquee DRAG · buttons/CTAs PRESS. Ring expands 1.6× on targets, fills accentSoft on primary CTAs.
- Replace the querySelectorAll listener wiring with event delegation on pointerover/pointerout reading data-cursor from the composed path, so dynamically mounted sections (all of them, now) just work.
- Hide the native cursor only while active; restore on window blur. Tiers B/C + reduced motion: native cursor, module not loaded.

Nav choreography:
- Scrolled state: past 24px, fade in surface/85 + backdrop-blur + hairline (opacity/transform of a backdrop layer — no layout animation).
- Hide on fast scroll-down (>80px/s → y:-110%, spring token); any scroll-up springs it back.
- Scrollspy: IntersectionObserver (rootMargin -40%) sets the active link; a small terracotta dot SLIDES between links (motion layoutId "nav-active").
- Mobile menu: full-screen surface overlay; oversized serif links (clamp 40–72px) mask-rise at 60ms stagger; button morphs to X (two lines rotate, transform only); body scroll locked (Lenis stop/start if Lenis is on).

Done when: first load plays voxels+POST+counter→POWER ON→LED handoff in ≤2.4s and never again this session; Esc/click skips; cursor labels read VIEW/OPEN/DRAG/PRESS over the right targets and never lag; nav hides/springs and the active dot glides between links; mobile menu mask-rises; reduced motion = no loader, native cursor, static nav states.
```

---

## Prompt 6 — Hero scene: re-themed 3D + one-WebGL rule + kinetic type

```
Bring the hero fully alive — it must feel alive within 1 second of the boot handoff. Do not commit; append to V2_CHANGELOG.md.

3D + background (ONE WebGL context total):
- HeroScene (existing icosahedron): re-theme — mesh accent terracotta (metalness 0.6, roughness 0.3), inner wireframe ivory at 0.5, outer wireframe borderHi at 0.2, particles a terracotta↔ivory color ramp (kill every blue value). Lazy-load with next/dynamic ssr:false + an accentSoft skeleton glow (zero CLS). DPR clamp 1.5. Pause the rAF when the hero is offscreen or document.hidden. Tier B: replace with a static "poster" (a pre-composed CSS/SVG isometric render + glow). Tier C/reduced: glow only.
- DELETE BackgroundScene's WebGL usage: replace with components/GlowField.jsx — two fixed CSS radial glows (terracotta 8–12%, the existing orb positions) + on tier A only, a sparse canvas dust of ~30 drifting 1px solder-point dots (pooled, pauses offscreen). Remove the three.js import from the old component so the bundle sheds it outside the hero chunk.

Kinetic type:
- Eyebrow AVAILABLE FOR OPPORTUNITIES · 2026 scramble-decrypts (900ms) after the boot handoff.
- Headline: MaskLines rise (wired) + ONLY the italic "Jaskirat Singh" gets per-char rotate-in from −6° (18ms/char), then its terracotta underline draws as a trace mini-segment 800ms later. Do not per-char anything else; restraint reads expensive.
- Subhead + CTAs + mono microline: Reveal stagger (70ms) after the headline.

CTAs:
- "See my work": existing Magnetic + hover bloom (accentSoft box-glow via opacity pseudo-layer, 180ms) + cursor PRESS; smooth-scrolls to #projects.
- Resume dropdown: menu springs open (spring token, transform-origin top-left), items stagger 60ms with the Download icons nudging 2px right on hover; focus-trapped, Esc closes, arrow keys navigate (it's a real menu — role=menu is already there, finish the keyboard support).
- Scroll cue: the hairline+dot pulses gently (loop token); it is trace s1's origin — verify the visual handoff into the About crossing is seamless.

Done when: within 1s of the boot handoff the terracotta ico is turning with ivory wireframes, the eyebrow decrypts, lines rise, the name spins in and gets underlined; ONLY one WebGL context exists (verify: the old BackgroundScene canvas is gone); the dropdown is fully keyboard-operable; ?debug holds ~60fps; tier B shows the poster; reduced motion = static glow + plain fades.
```

---

## Prompt 7 — THE PROJECT RAIL part A: lateral docking (the owner's signature)

```
The centerpiece, stage one: the six paper dossiers DEAL IN FROM THE SIDES and dock onto the rail. This prompt is the whole reason the site exists — the lateral entrances must feel like heavy paper sliding onto a desk, not like a CSS demo. Do not commit; append to V2_CHANGELOG.md.

- Wrap each dossier in SlideDock: odd files (01/03/05) from the LEFT, even (02/04/06) from the RIGHT; distance 96px desktop / 24px mobile (mobile: ALL from the right); rotate settle 1.5°→0 with the rotation sign matching the entry side; 650ms expo-out; viewport margin "-15% 0px", once:true.
- Docking choreography per card (sequenced off SlideDock's onDocked):
  1. Its stub trace draws from the rail to the card edge (120ms, pathLength).
  2. The via ring at the junction lights terracotta (stamp token) + a 6-particle spark fires (pooled canvas or 6 absolutely-positioned motion dots — 500ms life, slight gravity, aria-hidden).
  3. 200ms later the rubber Stamp lands (FLAGSHIP · 2026 / SHIPPED / LIVE DEMO / LIVE DEMO / HARDWARE · 300V TESTED / SIMULATION).
  4. The serif file number counts up its two digits with a tiny roll (01…06, 300ms).
- Card interactions: hover = 4px lift + 1° tilt toward cursor (reuse TiltCard at low intensity) + shadow deepens + the stub trace brightens; cursor label OPEN; whole card remains a Link to /projects/[slug]. Keyboard focus shows the same lifted state via focus-visible.
- Stagger safety: if two cards are in view simultaneously (short viewports), stagger their docks 120ms so sparks never fire in sync (nothing enters alone, but one hero per moment).
- The rail itself stays static this prompt (hairline at 0.4 opacity). Verify overflow-x: clip holds at 360px — side entrances must never cause horizontal scroll.
- Reduced motion: cards in place, stamps static, vias lit, no sparks.

Done when: scrolling the section deals each paper file in from its side with a physical settle, stub→via→spark→stamp→number reads as one 1-second choreography per card, hover/focus lift feels tactile, mobile (all-from-right, ±24px) is clean with zero horizontal overflow, and reduced motion shows the finished dossier wall.
```

---

## Prompt 8 — THE PROJECT RAIL part B: scrubbed signal pulse + HUD · paper detail pages

```
Stage two: the rail comes alive with scroll, and opening a file flips to paper. Do not commit; append to V2_CHANGELOG.md.

The scrubbed rail:
- Replace the static rail hairline with one SVG path (45° PCB bends, vector-effect non-scaling-stroke) spanning the section; register it as trace segment s5 so the page-long trace flows straight through the centerpiece (check the s4→s5 and s5→s6 handoffs pixel-close).
- GSAP ScrollTrigger on the section (scrub 1, NO pin — the page keeps its natural flow): rail pathLength 0→1; a SIGNAL PULSE (glowing 6px accent dot, soft shadow) rides the path via getPointAtLength, with a 6–10 particle tail sampled from recent path points (ring buffer; tier B: 4 particles). Tail length stretches with scrub velocity (clamp 2×).
- Lighting states driven by pulse progress: files whose dock-threshold the pulse has passed sit fully lit; upcoming files at 0.55 opacity + slight desaturation (CSS filter on a wrapper is fine here — it's not animated per-frame, it toggles). Thresholds ≈ 0.08/0.24/0.40/0.56/0.72/0.88. Scrolling back dims files again but NEVER un-deals the cards (Prompt 7's whileInView stays once:true).
- HUD (the reserved top-right slot; mono, textDim, aria-hidden): "FILE 03/06 — AI LINKEDIN POST GENERATOR · 048%" — name flips with the stamp token at each threshold, percent ticks with scroll. Position: sticky within the section. Mobile: a slim bottom bar.
- A traveling light: a radial accentSoft mask moves with the pulse illuminating the next ~160px of rail (upcoming rail at 0.25 opacity vs 0.08 unlit).
- One hero per moment: while the pulse is mid-rail, the marquee (Prompt 10) holds base speed and no other section-level loops run in-viewport.
- Reduced motion: rail fully drawn, all files lit, no pulse, no HUD.

Paper detail pages (/projects/[slug]/page.jsx — "you opened the file"):
- Flip the route to PAPER MODE: paper bg, paperInk text, paperLine hairlines, terracotta accents, same Nav (its scrolled state adapts to light: paper/85 + blur + ink hairline). Back link: "← Back to the rail" → /#projects.
- Layout: giant serif file number, title, date + stamp (same stamp as the rail), full desc, highlights as a checked list (ticks draw in on load, 400ms apart, pathLength), tag chips, GitHub/demo buttons (magnetic, ink borders). Keep generateStaticParams + per-project metadata exactly as they are.
- Entry: the page fades from bg to paper (280ms) with content mask-rising — reads as a document opening. Reduced: instant.

Done when: scrolling scrubs the pulse down the rail with its tail stretching on fast flicks, files light exactly at their thresholds and dim cleanly on scroll-back, the HUD ticks file names and percent, the trace reads continuous from experience through the rail to achievements, detail pages open as beautiful paper documents with drawing ticks, and 60fps holds through the whole section in ?debug.
```

---

## Prompt 9 — Stats odometer + IC skill cards + experience spine

```
The supporting instrumentation — numbers roll, chips seat, the timeline sparks. Do not commit; append to V2_CHANGELOG.md.

Stats odometer (About section):
- On first whileInView: each digit column rolls vertically to its target (900ms, expo-out, 60ms stagger right→left), terracotta flash on settle, "+" pops last with the stamp token. Values stay real: 6+ · 300+ · 2+ · 200+.
- THE GAG: 1.2s after the 300 settles, the last column rolls once more to 301 with a tiny flash and the caption flickers to "LEETCODE PROBLEMS (STILL COUNTING)" for 1.5s, then back. Once per visit. Reduced motion: final numbers immediately, no gag.

IC skill cards (Skills section):
- Cards rise with Reveal stagger; on each card's entrance its pin stubs draw in (scaleX from the card edge, 20ms stagger) and the REF designator (U1…U8) types on.
- Chips cascade in 30ms apart. Hover (tier A): pins glow terracotta, the card "seats" 1px down with a soft click of shadow, cursor VIEW. Keep TiltCard at low intensity.
- The section's s3 trace margin-run should visually pass behind the card grid (check z-order).

Experience spine (Experience section):
- Each card slides in FROM THE RIGHT (SlideDock side="right", 96px) as the spine's via ring lights + fires the 6-particle spark on onDocked (same choreography language as the rail — the site has ONE docking grammar).
- Inside each docked card: date chip stamps on (stamp token), bullet points cascade 60ms apart with their 8px terracotta dash drawing in, stack chips rise last.
- The spine (trace s4) draws with scroll between vias, so the line "reaches" each role just as its card docks. Tune the segment window so this sync reads clearly.

Done when: the odometer rolls like hardware and the 301 gag lands once, skill cards read as a component library coming online (pins drawing, REFs typing), every experience card docks from the right with a spark exactly as the spine reaches its via, and reduced motion shows final numbers + static seated cards.
```

---

## Prompt 10 — Marquee kinetics + achievements stamps + now-building + contact convergence + footer LED & Morse egg

```
The back half comes alive. Five beats. Do not commit; append to V2_CHANGELOG.md.

Marquee kinetics:
- The giant outlined-serif marquee scrolls infinitely (duplicated track, translateX loop, 40s base). GSAP Observer maps scroll VELOCITY to timeScale clamped [−3,3], lerping back to 1 — scroll fast and it races, scroll up and it reverses. The solid-accent word advances to the next word each loop.
- The thin mono stack-keyword row drifts the opposite way (60s). Pause both offscreen; hold base speed while the rail pulse is mid-section (one hero per moment). Cursor label DRAG + click-drag nudges it (Observer). Reduced motion: static rows.

Achievements:
- Cards dock from ALTERNATING sides (SlideDock 72px), 70ms stagger down the masonry; each icon STAMPS in (stamp token, −6°) 150ms after its card lands; hover jiggles the stamp 1° (180ms). Reduced: static grid.

Now Building (HireFlow teaser):
- The strip slides in from the LEFT; the IN DEVELOPMENT chip gets a slow scanline sheen (3s loop, translate a gradient layer). Every ~6s while in view, an envelope-dot launches off the card along a small bezier and fades (pooled, aria-hidden, pauses offscreen). Card links out to the HireFlow repo; cursor VIEW.

Contact convergence:
- On section enter: THREE faint hairlines draw in from the left edge, right edge, and bottom (600ms, 120ms stagger, expo-out), converging into the email underline as trace s7 draws it — the biggest glow on the page "sunrises" (translates up ~40px + brightens across the section's scroll range, scrubbed).
- Social pills dock from ALTERNATING sides (60ms stagger) — and FIX THE LINKS while touching them: GitHub → https://github.com/Jaskirat314276 · LinkedIn → https://www.linkedin.com/in/TODO-JASKIRAT (add a "// TODO: confirm LinkedIn URL" comment) · LeetCode → https://leetcode.com/Jaskirat-singh · GeeksforGeeks → https://www.geeksforgeeks.org/user/jaskiratsi2k1r · keep tel:+918340361891. All external links target=_blank rel=noreferrer.
- The email is Magnetic; hover draws its underline glow; cursor PRESS.

Footer sign-off:
- Trace s8 draws down into #footer-led; on completion the LED pulses THREE times (scale 1→1.6 with a fading halo ring each pulse, 2.4s total) then rests at a faint steady glow — the board stays powered.
- EASTER EGG: triple-click the LED, or type "j a s" anywhere → the LED blinks "HIRE ME" in Morse (···· ·· ·−· · / −− ·, dot 140ms / dash 420ms / gap 140ms, letter gap 420ms) then console.log("ok, you found it. now go hire jaskirat. — the trace"). Once per session (sessionStorage "js-egg"). aria-hidden decorative.

Done when: the marquee answers your scroll like it's alive, achievement stamps land in a satisfying cascade, the envelope launches read as "shipping right now", the three contact lines converge into a glowing underline, every social link points at the real profile (LinkedIn clearly TODO-flagged), and the footer LED ends the trace with three pulses — with the Morse egg firing exactly once per session.
```

---

## Prompt 11 — Performance tiering + fps watchdog + a11y + responsive audit

```
The pass that separates "animated" from "award-winning". Work through ALL of it; fix what you find. Do not commit; append findings + fixes to V2_CHANGELOG.md.

Performance:
- fps watchdog in lib/tier.js: rAF-sample fps in 2s windows; 3 consecutive <48fps → setTier(current−1) LIVE + console.info. Cascades: A→B kills the hero WebGL (poster swap), pulse tail →4, disables tilt/velocity FX/cursor embellishments; B→C stops Lenis, native cursor, static marquee, CSS glows only.
- Verify EVERY loop/rAF/timeline pauses offscreen AND on document.hidden: grain flicker, hero scene, glow dust, rail pulse, marquee ×2, envelope launcher, LED pulse, odometer (no loops after settle).
- ONE WebGL context max at any time (boot loader disposes fully before hero mounts — verify with a context count in ?debug). DPR clamp 1.5 everywhere. will-change only while animating.
- content-visibility:auto + contain-intrinsic-size on below-the-fold sections. three.js only inside lazy chunks (hero, boot) — verify with next build output; initial route JS ≤160KB gz. Tree-shake GSAP (core + ScrollTrigger + Observer only).
- Grep animated styles for width/height/top/left/margin — replace with transforms. CLS 0 (all slots were pre-reserved — verify with DevTools).
- Record a full slow scroll + a fast flick in the Performance panel: no long tasks >50ms during the rail scrub; ?debug ≥55fps on 4× CPU throttle at tier B.

Reduced motion (emulate, then walk the ENTIRE page):
- No boot loader; native cursor; static grain; trace fully drawn with vias lit; dossiers/stamps/odometer/marquee/HUD at end states; no pulse; detail pages instant. The page must read as a beautiful editorial site, not a disabled one.

Accessibility:
- Landmarks: header/nav/main/section/footer; exactly ONE h1 (hero); logical h2/h3; skip-to-content link.
- Keyboard: tab through nav (incl. mobile menu), both CTAs, the resume dropdown (arrow keys + Esc), every dossier link, detail-page buttons, social pills, footer links. Focus rings visible everywhere on both dark AND paper surfaces (2px accent / 2px accentDim on paper).
- aria-hidden on ALL decorative motion (trace, numerals, sparks, pulse, HUD, marquee, grain, dust, cursor, LED). Meaningful images/SVGs labeled; dossier links' accessible name = project title (not "01").
- Contrast: body text ≥4.5:1 on both surfaces; textMuted never on body-size copy; terracotta only for accents/labels ≥14px; check stamp text on paper.
- The custom cursor must never suppress the I-beam expectations: text remains selectable and inputs (none today) would show native cursor.

Responsive: 360 / 390 / 768 / 1024 / 1440 / 1920 — dossiers stack cleanly (all-from-right ±24px), rail hugs the left margin on mobile, marquee ~14vw with overflow clipped, ghost numerals never overflow, hero 3D column collapses under the headline (existing breakpoints preserved), no horizontal scroll ANYWHERE (test with the lateral entrances mid-animation).

Done when: a 4×-throttled machine still scrolls smooth at its degraded tier (console shows the watchdog working), reduced-motion mode looks intentionally designed, a keyboard-only user can reach everything with visible focus, decorative motion is invisible to screen readers, every breakpoint is overflow-free with CLS 0, and V2_CHANGELOG.md lists what the audit found and fixed.
```

---

## Prompt 12 — Meta + OG + favicon + build check → FINAL REVIEW PACKAGE (then you commit)

```
Ship-readiness — and prepare my review, since nothing has been committed. Do NOT run any git write command.

- Metadata in app/layout.js: title "Jaskirat Singh — Engineer at the intersection of code & hardware." · description "Final-year EEE @ BIT Mesra. Full-stack web, GenAI, data, and power electronics — 6 shipped projects, 300+ LeetCode, 3 role-targeted resumes." Per-project metadata on detail pages stays.
- OG image 1200×630 as a static asset: espresso #1a1815 bg, Instrument Serif "Hi, I'm Jaskirat Singh — I build things." with the name in italic terracotta, a small terracotta LED dot, mono plate JASKIRAT.DEV-style label, film grain. Wire og:/twitter: meta.
- Favicon: terracotta dot on #1a1815 (SVG + PNG fallbacks, replace app/favicon.ico usage). Bonus: swap to a dimmed-dot SVG frame on visibilitychange.
- robots + canonical; verify next/font display swap (no FOUT) and preconnects.
- npm run lint → clean. npm run build → clean, verify the netlify.toml build still applies (Node 20). Check route sizes in the build output against the ≤160KB gz initial budget. Run Lighthouse on next start: Performance ≥90 mobile, A11y ≥95, Best Practices ≥95 — fix regressions.
- FINAL REVIEW PACKAGE: finish V2_CHANGELOG.md with (a) a complete list of changed/added/deleted files grouped by prompt, (b) anything intentionally left TODO (the LinkedIn URL), (c) a manual QA checklist for me (boot, cursor labels, rail scrub + scroll-back, Morse egg, reduced motion, 360px pass), and (d) a suggested single commit message like: "v2: THE TRACE — Claude-warm redesign, lateral project rail, boot sequence, a11y/perf tiers". Print the package summary to the console at the end. Leave the working tree uncommitted for my review.

Done when: build and Lighthouse are clean, meta/OG/favicon are in place, V2_CHANGELOG.md is a complete reviewable record, and the ONLY thing left for a human is: read, click around, and make the one commit.
```

---

## Motion inventory (review checklist)

Every animation, where it lives, and its reduced-motion twin. Use as the final QA sweep.

| # | Beat | Where | Trigger | Reduced-motion fallback | Prompt |
|---|---|---|---|---|---|
| 1 | Grain flicker (10fps steps) | Site-wide | Always (paused offscreen/hidden) | Static grain | 1 |
| 2 | Boot: voxel JS + POST log + 000→100 → nav-LED handoff | Entry | Once per session, ≤2.4s, skippable | Skipped, LED lit | 5 |
| 3 | Cursor labels VIEW/OPEN/DRAG/PRESS + ring states | Site-wide, tier A | Pointer | Native cursor | 5 |
| 4 | Nav hide/spring + scrollspy sliding dot + blur state | Nav | Scroll | Static states | 5 |
| 5 | Mobile menu serif mask-rise | Nav | Menu open | Plain fade | 5 |
| 6 | Scroll progress hairline | Top edge | Scroll | Hidden | 3 |
| 7 | THE TRACE s1–s8 draws page-long, 45° bends | All sections | Scroll-scrubbed | Fully drawn | 4, 8 |
| 8 | CODE × HARDWARE crossing under "intersection" | About | Scroll-scrubbed | Drawn, static | 4 |
| 9 | MaskLines headline rises | Every section | whileInView once | Plain fade | 3 |
| 10 | Reveal fade+rise 70ms stagger | Every section | whileInView once | Plain fade | 3 |
| 11 | Hero ico re-themed, mouse parallax, pulse-scale | Hero, tier A | rAF while visible | Static poster/glow | 6 |
| 12 | Eyebrow scramble + name per-char + trace underline | Hero | After boot handoff | Plain text, static underline | 6 |
| 13 | Magnetic CTAs + resume dropdown spring/stagger | Hero | Hover/open | Plain hover, instant menu | 6 |
| 14 | Stats odometer + 300→301 gag | About | whileInView once | Final numbers | 9 |
| 15 | IC cards: pins draw, REF types, chips cascade, seat on hover | Skills | whileInView / hover | Static cards | 9 |
| 16 | Experience cards SlideDock from right + via sparks + date stamps | Experience | whileInView + trace sync | In place, vias lit | 9 |
| 17 | **Dossiers deal in from alternating sides** + stub→via→spark→stamp | Project Rail | whileInView once | In place, stamps static | 7 |
| 18 | Signal pulse + particle tail + traveling light + file lighting | Project Rail | Scroll-scrubbed | No pulse, all lit | 8 |
| 19 | Rail HUD "FILE 03/06 · 048%" | Project Rail | Scroll-scrubbed | Hidden | 8 |
| 20 | Paper detail page open (fade-to-paper + ticks draw) | /projects/[slug] | Route entry | Instant | 8 |
| 21 | Outlined-serif marquee, velocity ±3× + counter-row | Marquee band | Visible (paused offscreen) | Static rows | 10 |
| 22 | Achievement cards from alternating sides + icon stamps | Achievements | whileInView once | Static grid | 10 |
| 23 | Education rows calm fade (rest beat) | Education | whileInView once | Plain fade | 3 |
| 24 | HireFlow strip: scanline chip + envelope bezier launches | Now Building | In-view loop ~6s | Static card | 10 |
| 25 | Contact 3-line convergence + sunrise glow + magnetic email | Contact | Enter/scrub/hover | Pre-drawn, static glow | 10 |
| 26 | Footer LED triple pulse (trace full stop) | Footer | Trace completion | Static glowing LED | 10 |
| 27 | Morse "HIRE ME" easter egg (triple-click / "jas") | Footer | User secret | Disabled | 10 |

---

## Coverage map (spec → prompt)

| PORTFOLIO_PAGE.md | Prompt |
|---|---|
| §2 visual system + §8 stack (tokens, fonts, tiers, debug HUD) | 0, 1 |
| §4 all sections static + PCB/paper dressing + slots | 2 |
| §3 motion primitives (Reveal v2, MaskLines, **SlideDock**, progress) | 3 |
| THE TRACE (§2/§3 signature + §4.3 intersection beat) | 4 |
| Boot preloader + cursor + nav choreography (§4.1) | 5 |
| §4.2 hero + §6 hero animation (one-WebGL rule) | 6 |
| §5 Project Rail — lateral docking | 7 |
| §5 Project Rail — scrubbed pulse + HUD + paper detail pages | 8 |
| §4.3 stats · §4.4 skills · §4.5 experience motion | 9 |
| §4.7–§4.12 marquee/achievements/now-building/contact/footer + egg | 10 |
| §10 a11y + perf + responsive (+ link fixes verified) | 11 |
| §9 step 10 meta + build + **final review package** | 12 |

Build order still follows the law: re-skin → **static everything** → systems (reveal + slide-dock) → trace → entry (boot/cursor/nav) → hero → rail (dock, then scrub) → instrumentation → back-half beats → hard polish → ship-readiness → **your one commit**.

---

*Compatibility note: `app/projects/data.js` and all `/projects/[slug]` routes need no edits — every project, stat, date, and link on the page is used verbatim. The three resume PDFs in `/public` are kept. Known fixes baked into the prompts: placeholder GitHub/LinkedIn hrefs in the contact section (Prompt 10), the render-blocking font `@import` (Prompt 1), and the doubled always-on WebGL contexts (Prompt 6). The only invented artifacts are labels on real things — stamps, REF designators, the HUD — and the `IN DEVELOPMENT` HireFlow teaser, which links to the real repo and stays clearly marked as in progress.*
