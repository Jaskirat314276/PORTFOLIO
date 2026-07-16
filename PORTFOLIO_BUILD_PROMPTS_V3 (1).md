# Jaskirat Portfolio — Claude Code Build Prompts · **THE TRACE — FULL POWER EDITION (v3)**

A sequenced set of copy-paste prompts for upgrading the live portfolio (https://github.com/Jaskirat314276/PORTFOLIO) in Claude Code — from "solid dark portfolio" to **the site an Awwwards jury screenshots for their own moodboard**. This file **supersedes THE TRACE EDITION (v2)** — use this file only; do not mix prompts across the two.

Everything sacred in v2 stays sacred: every project, stat, and line of copy in `app/projects/data.js` / `app/page.jsx` verbatim, static before motion, transform/opacity only, `prefers-reduced-motion` honored everywhere, 60fps or it doesn't ship, **no commits between prompts**. What changes: **THE TRACE stops being a drawing and becomes a machine.** The line doesn't just travel the page — it powers each section on as it arrives, the board senses your cursor, the paper has weight, clicking a dossier *morphs it into* its detail page, and the site is fully drivable from the keyboard. Maximal motion, zero noise.

**⚠️ WORKFLOW NOTE (owner's rule, unchanged):** **No commits between prompts.** Every prompt ends with a *Done when* checklist you verify in `npm run dev` — Claude Code must NEVER run `git commit`. You review everything locally and make **one commit at the very end** (Prompt 13 prepares the review package and suggested commit message).

**What's new in v3 (v2 → v3 delta):**

| v2 (THE TRACE) | v3 (FULL POWER) |
|---|---|
| Dossiers slide in and dock | **PHYSICALITY** — the dossiers are *heavy paper*: a desk shadow that lags the card by one beat, a counter-flex settle on landing, a light sheen that sweeps on hover, folded corners, and stamps that land with an expanding ink halo |
| Detail pages fade to paper | **OPEN-FILE** — the dossier you click *becomes* its detail page (View Transitions shared-element morph: file number, title, and stamp fly to their new positions; graceful fade fallback) |
| Trace draws with scroll | **POWER-ON LIGHTING** — the trace *energizes* each section as it passes: ghost numerals and REF plates warm up, and the word "intersection" blooms at the exact frame the CODE × HARDWARE lines cross |
| Static board, moving cursor | **PROXIMITY** — the board senses you (tier A): the hero name's letters lean toward the cursor, via rings warm within reach, the nav LED brightens as you approach |
| Marquee reacts to scroll velocity | **VELOCITY BUS** — one shared scroll-velocity signal drives the marquee's speed *and* skew, the cursor's stretch, the rail pulse's tail length, and the depth field's dust streaks — the whole page answers your hand with one voice |
| Background WebGL deleted, hero WebGL separate | **THE DEPTH FIELD** — hero + background unify into ONE WebGL scene: the camera actually travels through the polyhedra field as you scroll (shapes recycle behind you, solder-dust streaks with scroll velocity) — the whole site becomes one continuous fly-through, still ≤1 context |
| Cursor labels VIEW/OPEN/DRAG/PRESS | **Cursor v3** — labels + velocity stretch, a solder-point trail on fast moves, difference-blend over paper, magnetic bias near primary CTAs |
| Odometer count-ups | **Hardware odometer** — ghost-blur frames while digits roll, terracotta flash on settle, the 300 → 301 gag intact |
| Mouse-first rail | **KEYBOARD GRAMMAR** — J/K (and ↑/↓) walk the rail file-by-file, focus choreography on route changes, back-navigation lands on the exact dossier you left |
| Default Next.js 404 | **A crafted 404** — the trace draws, then breaks mid-path: `ERR 404 — OPEN CIRCUIT`. *This trace leads nowhere.* |
| Meta basics | **Chrome delights** — JSON-LD Person schema, per-route `theme-color`, tab-title + favicon dim when you leave, a console sign-off, a print stylesheet that outputs the case file as actual paper |

**The eight named systems (referenced by name in every prompt):**

1. **THE TRACE** — the page-long terracotta circuit line, born in the boot, dead-ending in the footer LED. Unchanged as the one big idea; everything below serves it.
2. **THE LATERAL DOCTRINE** — objects enter from the sides and dock onto the trace. Unchanged, now with weight (see 3).
3. **PHYSICALITY** — paper behaves like paper: lagging shadows, settle flex, ink halos, sheen. The difference between "a div slid in" and "a file was dealt onto a desk."
4. **POWER-ON LIGHTING** — sections are dark modules until the trace reaches them; segment completion flips a `data-powered` state that warms the section's dressing. Moving things are the light sources — now literally.
5. **PROXIMITY** (tier A) — one shared cursor-distance system; the board leans toward your hand. Subtle: ≤3px of travel, ever.
6. **VELOCITY BUS** — one shared, lerped scroll-velocity value; every velocity-reactive element consumes the same signal so the page reacts as one organism.
7. **OPEN-FILE + KEYBOARD GRAMMAR** — routes morph instead of cut (View Transitions with fallback), and everything is drivable without a mouse: J/K on the rail, focus choreography, scroll restoration.
8. **THE DEPTH FIELD** (tier A) — hero and background unified into one WebGL scene the camera flies through with scroll. Atmosphere, never spectacle: it sits behind the trace at ≤12% visual weight, spawns away from the text measure, renders on demand, and is the first thing the fps watchdog kills.

**Stack (final):** existing Next.js 16 + React 19 + Tailwind v4 + three.js (kept, lazy) **+ `motion` (Framer Motion for React 19) + GSAP (ScrollTrigger + Observer) + Lenis**. Upgrade in place — **do not re-scaffold**.

---

## Two ways to use this

- **Option A — the step-by-step series (Prompts 0–13 below).** Most control, easiest to review, best result. Recommended.
- **Option B — the one-shot master prompt (right here).** Paste once, let Claude Code build the whole thing, then review the full diff.

### Option B — one-shot master prompt

```
Upgrade my existing portfolio (this repo — Next.js 16 App Router, React 19, Tailwind v4, three.js) into an award-winning (Awwwards-SOTD-calibre), fully animated single-page portfolio. PORTFOLIO_PAGE.md in this repo is the source of truth for sections, copy, and the base design/motion system — follow it exactly; where this prompt goes further, this prompt wins. UPGRADE IN PLACE: keep app/projects/data.js and all /projects/[slug] routes, keep every real word of copy, do NOT re-scaffold, and do NOT invent new content (the only invented artifacts are labels on real things: stamps, REF designators, HUD text, chrome).

CRITICAL WORKFLOW RULE: never run `git commit`, `git add`, or any git write command. Leave every change uncommitted in the working tree — I review locally and commit once myself at the end. Maintain V3_CHANGELOG.md, appending a short summary of each work stage so I can review.

DESIGN SYSTEM (Claude design language, warm-dark — match exactly, one accent only):
- Palette: bg #1a1815 · surface #23211d · surfaceHi #2c2925 · border #38342d · borderHi #4a443a · text #f0eee5 · textDim #b0aa9c · textMuted #7a7466 · accent #d97757 · accentDim #a8593c · accentSoft rgba(217,119,87,0.13) · paper #faf9f5 · paperInk #1f1e1d · paperLine #e8e5db · success #7d9b76 · danger #c45a4a · info #6a8fae. Kill ALL v1 colors (#ff6b3d, #5b9eff, per-category skill colors). danger is reserved for the 404's broken circuit; info/success stay unused unless semantically true.
- Type via next/font/google: Instrument Serif (display + italic accent words), Bricolage Grotesque (body), JetBrains Mono (eyebrows/labels/REF designators/HUD — UPPERCASE, 0.14em tracking).
- Texture: film grain 3–5% flickering ~10fps (stepped) · ghost section numerals 01–08 (Instrument Serif, 12–16vw, transparent fill, 1px borderHi text-stroke, aria-hidden, slight parallax drift) · PCB dressing (hairline traces with 45° bends, via rings, mono REF plates like "FIG. 04 — THE RAIL", corner ticks) · paper dossiers (paper bg, paperInk text, terracotta rubber stamps rotated −8°, a folded top corner, 2% fiber grain) · soft terracotta glows 8–12% behind hero/rail/contact · ::selection accentSoft/accent (inverted variant on paper) · thin scrollbar · 2px accent focus-visible rings (accentDim on paper).

MOTION DOCTRINE:
- transform + opacity only (exceptions: SVG pathLength/dashoffset, short one-shot clip-paths, View Transitions). 60fps.
- Tokens (single source app/lib/motion.js): reveal 450–650ms expo-out [0.16,1,0.3,1] · slideDock 650ms expo-out, x ±96px desktop / ±24px mobile, rotate 1.5°→0 with a back-out counter-flex on the last 15% · shadowLag spring {stiffness:380,damping:28} starting 40ms after its card · inkHalo 420ms ease-out (ring scale 1→1.9, opacity .45→0) · maskLine 700ms [0.65,0,0.35,1], 90ms line stagger · scramble 900ms (mono eyebrows) · stamp/flip 500ms back-out [0.34,1.56,0.64,1] · vtOpen 480ms [0.7,0,0.3,1] (route morph) · powerOn 400ms ease (section energize) · proximity spring {stiffness:300,damping:24}, radius 96px, max 3px translate / 2° rotate · spring {stiffness:500,damping:30} · hover 180ms · scrub = scroll-tied · ambient loops 6–10s · marquee 40s velocity-reactive · sibling stagger 70ms.
- THE LATERAL DOCTRINE (the owner's signature request): objects enter FROM THE SIDES — project dossiers alternate left/right, experience cards from the right, achievements alternate, contact socials alternate. Text may rise from masks; OBJECTS travel laterally and "dock" onto the trace with a spark. Never cause horizontal overflow (overflow-x: clip on sections).
- PHYSICALITY: every dossier carries a separate desk-shadow layer that lags its card via the shadowLag spring (shadow larger/softer mid-flight, tightens on landing); stamps land with an inkHalo ring; hovering paper sweeps a 6%-opacity light sheen across it once (600ms, translated gradient layer); paper cards carry a static folded corner + fiber grain. Heavy paper, careful hand.
- VELOCITY BUS (app/lib/velocity.js): ONE rAF lerps scroll velocity (lerp 0.12, clamped); consumers only read it — marquee timeScale [−3,3] + skewX ≤4°, cursor stretch ≤1.35×, rail pulse tail 6→10 particles, depth-field dust streaks ≤2×. Never a second velocity tracker.
- PROXIMITY (app/lib/useProximity.js, tier A only): ONE pointermove listener, rAF-batched; subscribers get distance to cursor. Used by: hero name per-char lean (≤3px/2°), via rings warming within 80px, nav LED brightening on approach, primary-CTA magnetic bias. Reduced motion or tier B/C: system not loaded.
- One hero per moment; every loop pauses offscreen + on document.hidden; moving things are the only light sources.
- prefers-reduced-motion: no preloader, native cursor, trace pre-drawn, all sections pre-powered, depth field frozen to one static frame, dossiers in place, odometer static, marquee static, route changes instant. The reduced page must still look deliberately designed.

THE TRACE (the one big idea): a single terracotta circuit trace with 45° PCB bends travels the whole page — born in the boot preloader → powers the nav LED (id="nav-led") → hero scroll-cue drop → two hairlines labeled CODE and HARDWARE draw from opposite sides and CROSS exactly under the italic word "intersection" in the About headline (the word BLOOMS with a soft accentSoft glow at the crossing frame), merging into one line → skills margin run → experience timeline spine (via ring per role) → IS the Project Rail → achievements/education pass → converges into the contact email underline → terminates as the footer LED (id="footer-led") which pulses three times and rests. Per-section SVG segments that visually read as one continuous line, each segment's pathLength scrubbed to scroll. POWER-ON LIGHTING: when a segment completes its window, its section gets data-powered — ghost numeral stroke opacity .04→.09, REF plates textMuted→textDim, via rings lit (400ms ease, one-shot toggle, never per-frame). ?debug HUD shows FPS · TIER · SCROLL% · TRACE%.

SET PIECES (build all — base details and exact copy in PORTFOLIO_PAGE.md §4–§6):
1. BOOT PRELOADER (rework components/LoadingGate.jsx, keep its voxel-"JS" three.js assembly but re-color terracotta/ivory): mono POST log (BOOT · PSU OK · CLK 60FPS · LOAD PORTFOLIO) + JetBrains Mono counter 000→100 with three stutter-stalls (037/061/089) and glyph-scramble digits → the final dot flies to the nav and lights #nav-led (the trace is born). ≤2.4s hard cap, any click/keypress skips, sessionStorage "js-boot" so it plays once per session, reduced-motion skips entirely.
2. CURSOR v3 (upgrade existing dot+ring; fine pointers + tier A only): mono labels VIEW (links) / OPEN (dossiers) / DRAG (marquee) / PRESS (buttons); ring expands on targets; dot stretches along its motion vector at speed (velocity bus, clamp 1.35×); 4 pooled solder-point trail dots appear only on fast moves; mix-blend-mode: difference over [data-surface="paper"]; subtle magnetic bias within 24px of primary CTAs. Tiers B/C + reduced: native cursor, module not loaded.
3. THE DEPTH FIELD + HERO (one WebGL scene, total — this scene IS the context allowance): merge BackgroundScene and the hero 3D into ONE fixed full-viewport canvas (tier A, lazy dynamic import ssr:false, mounted only after the boot loader fully disposes). The field: 40–60 low-poly wireframe polyhedra as InstancedMesh (2 geometries → 2 draw calls), tinted terracotta/ivory/borderHi at 12–30% opacity, sunk in espresso fog; spawn distribution AVOIDS the central text measure so copy never sits on a bright wireframe. THE FLY-THROUGH: the camera travels forward through the field mapped to page scroll (lerped 0.08–0.12, scrub feel, no inertia fight with Lenis); shapes passing behind the camera RECYCLE ahead of it (allocation-free, infinite corridor); a sparse solder-dust layer STREAKS along the travel axis with the velocity bus (clamp 2×) — the whole site reads as one continuous journey through warm air above the board. Render on demand (full rate only while camera/velocity active, half-rate idle drift, pause on document.hidden), DPR clamp 1.5, ≤12% visual weight — if the field ever competes with the trace, dim the field. The existing icosahedron becomes the field's FLAGSHIP node framed to the hero's right column (re-projected on resize, never per frame): mesh terracotta (metalness 0.6, roughness 0.3), inner wire ivory 0.5, outer wire borderHi 0.2, particles terracotta↔ivory ramp (kill every blue value), vertex-noise wobble easing up 180ms on pointer enter — and the camera's first travel move is PAST it as you leave the hero. Tier B: no WebGL — static composed poster + CSS glow orbs (GlowField). Tier C/reduced: glows / one static field frame. Kinetic type: eyebrow "AVAILABLE FOR OPPORTUNITIES · 2026" scramble-decrypts; headline mask-rises; "Jaskirat Singh" (Instrument Serif italic terracotta) gets per-char rotate-in + a trace underline drawing 800ms later; THE LIVING NAME (tier A, after assembly): pointer-enter ripples a WAVE through the chars (−6px translateY each on a spring, 24ms stagger running in from the entry side, 600ms cooldown) and the chars hold the subtle PROXIMITY lean while hovered; magnetic "See my work" CTA; the 3-resume Download dropdown (real PDFs in /public) springs open with 60ms item stagger, full keyboard support.
4. THE PROJECT RAIL (centerpiece — spend the most time): a central vertical trace with 45° bends; the SIX dossiers from data.js as PAPER cards (paper bg, ink text, serif file numbers 01–06, tag chips, arrow, folded corner) DEAL IN from alternating sides (odd left, even right; mobile all-right ±24px) with full PHYSICALITY (lagging desk shadow, counter-flex settle), dock onto stub traces with a via-light + 6-particle spark, then a terracotta rubber stamp slams on 200ms later WITH an ink halo: 01 "FLAGSHIP · 2026" · 02 "SHIPPED" · 03 "LIVE DEMO" · 04 "LIVE DEMO" · 05 "HARDWARE · 300V TESTED" · 06 "SIMULATION". A glowing signal pulse with a velocity-reactive particle tail rides the rail scrubbed to scroll; docked files sit lit, undocked at 0.55 opacity; sticky mono HUD ticks "FILE 03/06 — AI LINKEDIN POST GENERATOR · 048%" and, on tier A desktop, appends "J/K — FILES". KEYBOARD GRAMMAR: while the rail is in view, J/K and ↑/↓ move focus + smooth-scroll dossier to dossier. Cards link to the existing /projects/[slug] routes; hover = 4px lift + 1° tilt + sheen sweep + cursor OPEN. Scrub drives only rail/pulse/lighting/HUD (cards dock once via whileInView, never un-deal). Reduced motion: rail drawn, all lit, static stamps, no keyboard hijack beyond native tab.
5. OPEN-FILE — PAPER DETAIL PAGES: /projects/[slug] flips to full paper mode (paper bg, ink text, terracotta accents, same nav adapting to light, "← Back to the rail"). Route transition = View Transitions shared-element morph (480ms [0.7,0,0.3,1]): the clicked dossier's file number, title, and stamp fly to their detail-page positions while the canvas crossfades dark→paper. Implement via document.startViewTransition around router navigation (or Next's viewTransition support if this version ships it — check node_modules/next/dist/docs first per AGENTS.md); feature-detect and fall back to a 280ms fade. Assign view-transition-name to the 3 shared elements ONLY on click. Back-navigation restores scroll to the exact dossier; focus moves to the h1 on route entry. Highlights render as a checked list whose ticks draw in 400ms apart.
6. SUPPORTING CAST: stats odometer (6+ · 300+ · 2+ · 200+, digit columns roll with ghost-blur frames — two aria-hidden copies at ±0.45em, 12% opacity, only while rolling — then a terracotta settle flash; 1.2s later the 300 ticks to 301, caption flickers to "LEETCODE PROBLEMS (STILL COUNTING)" for 1.5s, once per visit) · skills as 8 IC-package cards (pin stubs, REF designators U1–U8, pins glow in a 30ms chase toward the chip on hover, chips cascade) · experience spine (via per role sparks as each card slides in from the right, bullets cascade, date chip stamps) · giant outlined-serif velocity marquee "CODE · CIRCUITS · DATA · GENAI ·" (velocity bus: timeScale [−3,3] + skewX ≤4°) with a thin counter-marquee of real stack keywords · achievements cards from alternating sides, icons stamp in · education = calm rest beat — rows fade+rise and each serif grade (CGPA 7.15 / 95% / 91%) FLIPS IN LAST with the stamp token 150ms after its row settles, the section's only beat · "CURRENTLY SHIPPING" strip teasing HireFlow AI (link https://github.com/Jaskirat314276/AI_EMAIL_SENDER-HIREFLOW-AI-, mono IN DEVELOPMENT tag with scanline sheen, an envelope-dot launches along a bezier every ~6s) · contact: serif "Let's build something together.", magnetic email jaskiratsingh314276@gmail.com — CLICK COPIES the address and a mono "COPIED ✓" chip stamps in beside the cursor (aria-live polite; the arrow glyph stays a mailto link), three faint trace lines converge into the email underline, social pills dock from alternating sides WITH REAL LINKS (GitHub https://github.com/Jaskirat314276 · LinkedIn TODO-marked · LeetCode https://leetcode.com/Jaskirat-singh · GeeksforGeeks https://www.geeksforgeeks.org/user/jaskiratsi2k1r · tel:+918340361891) · footer: LED pulses three times then rests + a mono local-time chip "RANCHI, IN · 18:42 IST" (client-mounted, updates each minute); EASTER EGG: triple-click the LED (or type "jas") → it blinks "HIRE ME" in Morse, console.log("ok, you found it. now go hire jaskirat. — the trace"), once per session.
7. NAV: hide on fast scroll-down / spring back up; scrolled = surface/85 + blur + hairline; scrollspy terracotta dot slides between links (layoutId) with URL hash kept in sync (throttled replaceState); links get a 2px magnetic pull (tier A); mobile menu = full-screen overlay, oversized serif links mask-rise 60ms stagger.
8. THE 404 (app/not-found.jsx): dark board; a lone trace draws from the top, snaps mid-path with a two-frame flicker at the break (exposed pad + three debris ticks, danger-tinted); mono "ERR 404 — OPEN CIRCUIT"; serif "This trace leads nowhere."; link "← Back to the board" → /. Reduced motion: broken trace pre-drawn.

PERFORMANCE & A11Y (non-negotiable): device tiers A/B/C (pointer+cores+saveData) with an fps watchdog (three 2s windows <48fps → drop a tier live); initial route JS ≤160KB gz with three.js lazy; CLS 0; INP <200ms; content-visibility below the fold; semantic landmarks, one h1, skip link, 2px accent focus rings, aria-hidden on all decorative motion, keyboard walkthrough incl. the dropdown and the J/K rail; contrast ≥4.5:1; hit targets ≥44px on touch; forced-colors mode keeps trace/LED/stamps legible via system-color fallbacks; no horizontal overflow 360→1920. Lenis smooth scroll on tier A/B only, disabled for reduced motion, never fighting native back/forward scroll restoration.

META & CHROME: title "Jaskirat Singh — Engineer at the intersection of code & hardware.", description from the hero subhead, OG image 1200×630 (espresso bg, serif headline, terracotta LED dot), favicon = terracotta dot on #1a1815 that swaps to a dimmed frame on visibilitychange while document.title dims to "⏻ jaskirat singh", JSON-LD Person (real data + real profile URLs only; omit LinkedIn until confirmed), per-route theme-color (espresso / paper), a @media print stylesheet that renders the page as a clean paper case file (chrome/motion hidden, URLs printed after links), a one-time styled console sign-off line, robots/canonical, npm run build clean for Netlify (Node 20).

ORDER OF WORK (verify each stage in dev before the next; append each stage to V3_CHANGELOG.md; NO COMMITS):
1 theme re-skin (zero motion) → 2 static v3 layout everything (incl. 404 + paper craft) → 3 reveal/slide-dock/velocity-bus/proximity systems + Lenis → 4 the trace + power-on lighting → 5 preloader/cursor v3/nav → 6 depth field + hero → 7 rail docking + physicality → 8 rail scrub + HUD + keyboard grammar → 9 OPEN-FILE morph + paper pages + 404 alive → 10 odometer/skills/experience → 11 marquee/achievements/now-building/contact/footer+egg → 12 perf/a11y/responsive audit → 13 meta + chrome + build check + final review summary.

THE BAR: a recruiter scrolls once and remembers — heavy paper case files dealt in from the sides onto one terracotta trace that powers the page on as it goes, from boot to the footer LED; they click a file and it opens in their hands. Maximal motion, every move on-brand, on-easing, 60fps. If a flourish fights the trace, cut the flourish.
```

---

## How to use this (Option A)

1. **Put `PORTFOLIO_PAGE.md` in the repo root** — it stays the source of truth for copy, sections, and the base design system. Where it and these prompts conflict, **these prompts win** (v3 goes further than the spec in named, deliberate ways).
2. **Start on a branch:** `git checkout -b v3-trace`. Since you're not committing between prompts, the branch plus your final review is your safety net. If a single prompt goes sideways, tell Claude Code exactly which step to revert — don't `git checkout .` (that would wipe *all* prompts).
3. **Add the working-rules file first** (Prompt 0). It keeps palette, tokens, the eight systems, and the **no-commit rule** in context for every later prompt. If a `V2_RULES.md` from the earlier edition exists, Prompt 0 replaces it.
4. **Paste prompts one at a time, in order.** Let each finish, run `npm run dev`, and clear its *Done when* checklist before moving on. **Do not commit** — Claude Code appends a summary of each prompt to `V3_CHANGELOG.md` instead, so nothing is lost for your final review.
5. **Static before motion — still the law.** Prompts 1–2 re-skin and re-lay the entire page with zero new motion. 80% of the award-winning look is spacing and type; the motion only lands if the static page already looks expensive.
6. **Trust the *Feels right when* lines.** Most prompts now carry one — it's the taste bar, not the feature list. If a beat clears *Done when* but fails *Feels right when*, tune duration/easing ±15% and distance before adding anything new. Adding is never the fix.
7. **Test like a judge.** After every motion prompt: (a) scroll the whole page watching the `?debug` FPS readout, (b) DevTools → Rendering → *Emulate prefers-reduced-motion* and re-scroll, (c) 4× CPU throttle and confirm the tier watchdog degrades gracefully, (d) tab through with the keyboard, (e) after Prompt 9: click a dossier, hit back, and confirm the morph runs both ways and you land on the same file, (f) after Prompt 13: check print preview and Windows High Contrast (forced-colors).
8. **One hero per moment.** If two things animate at once and compete, cut or delay one. The trace always wins ties.
9. **At the very end** (after Prompt 13's review package): read `V3_CHANGELOG.md`, skim `git diff --stat`, click through everything once more, then make **your one commit**.

---

## Prompt 0 — Drop in the working rules (paste once, don't run as a task)

Create `V3_RULES.md` at the repo root with exactly this content, and append the single line `@V3_RULES.md` to the existing `AGENTS.md` (below its Next.js block — do not delete anything in it). If `V2_RULES.md` exists from an earlier attempt, delete it and remove its `@V2_RULES.md` reference; if `V2_CHANGELOG.md` exists, keep it but start fresh entries in `V3_CHANGELOG.md`:

```
# Jaskirat Portfolio v3 — working rules (THE TRACE · FULL POWER)

Full brief: PORTFOLIO_PAGE.md (sections, copy, base design system). This file is the always-on cheat sheet; where they conflict, this file wins.

## Non-negotiables
- NEVER run git commit / git add / any git write command. The owner reviews locally and commits once at the end. After each work stage, append a 3–6 line summary to V3_CHANGELOG.md (create it if missing) instead.
- UPGRADE IN PLACE. This is a live Next.js 16 App Router site. Keep app/projects/data.js verbatim, keep all /projects/[slug] routes, keep every real word of copy. Never re-scaffold, never invent content, never add placeholder text. The only invented artifacts are labels on real things (stamps, REF designators, HUD, chrome).
- This Next.js version may differ from training data — read the relevant guide in node_modules/next/dist/docs/ before structural changes (per AGENTS.md).
- Animate transform + opacity ONLY (exceptions: SVG pathLength/stroke-dashoffset, short one-shot clip-paths, View Transitions). 60fps or it doesn't ship.
- prefers-reduced-motion honored in EVERY component: no preloader, native cursor, trace pre-drawn, all sections pre-powered, depth field frozen to one static frame, dossiers/toys at end states, odometer/marquee static, route changes instant. The reduced page must still look deliberately designed.
- Every loop/rAF pauses offscreen (IntersectionObserver) and on document.hidden. ONE WebGL context max, lazy-loaded. ONE velocity tracker, ONE proximity listener, ONE Lenis instance — shared systems, never per-component copies.
- Semantic HTML: header/nav/main/section/footer, exactly ONE h1 (hero), skip link, focus-visible rings (2px accent, 2px offset; accentDim on paper), aria-hidden on ALL decorative motion (trace, numerals, particles, grain, HUD, marquee, cursor, sparks, halos).
- Voice: confident, calm, editorial. The MOTION is maximal; the COPY never changes.

## Palette (Claude design language, warm-dark, ONE accent — do not invent colors)
bg #1a1815 · surface #23211d · surfaceHi #2c2925 · border #38342d · borderHi #4a443a
text #f0eee5 · textDim #b0aa9c · textMuted #7a7466
accent #d97757 · accentDim #a8593c · accentSoft rgba(217,119,87,0.13)
paper #faf9f5 · paperInk #1f1e1d · paperLine #e8e5db
success #7d9b76 · danger #c45a4a (404 broken circuit only) · info #6a8fae
Kill all v1 colors on sight: #ff6b3d, #5b9eff, and the per-category skill colors.

## Type (via next/font/google — no @import in <style>)
Display 'Instrument Serif' — huge editorial headlines + italic accent words (+ ghost numerals via 1px borderHi text-stroke)
Body    'Bricolage Grotesque' 300–700
Mono    'JetBrains Mono' — eyebrows/labels/REF designators/stats/HUD, UPPERCASE, letter-spacing 0.14em

## Motion tokens (single source: app/lib/motion.js — use these names, no magic numbers)
reveal     450–650ms · expo-out [0.16,1,0.3,1]
slideDock  650ms · expo-out · x ±96px desktop / ±24px mobile · rotate 1.5°→0 with back-out counter-flex on the last 15% (THE lateral entrance)
shadowLag  spring {stiffness:380,damping:28}, starts 40ms after its card — the desk shadow that gives paper its weight
inkHalo    420ms ease-out · ring scale 1→1.9 · opacity 0.45→0 (fires as a stamp lands)
sheen      600ms linear, once per hover — a 6%-opacity light band sweeps across paper
wave       per-char ripple — −6px translateY on a spring · 24ms char stagger from the entry side · 600ms cooldown (hero name hover, tier A)
maskLine   700ms · [0.65,0,0.35,1] · 90ms line stagger
scramble   900ms — mono decrypt from glyph soup (▓▒░#$%), eyebrows only
stamp      500ms · back-out [0.34,1.56,0.64,1] — rubber stamps, chips, ticks, digit settles
vtOpen     480ms · [0.7,0,0.3,1] — OPEN-FILE route morph (View Transitions)
powerOn    400ms ease — section energize toggle (data-powered)
proximity  spring {stiffness:300,damping:24} · radius 96px · max 3px translate / 2° rotate
spring     { stiffness: 500, damping: 30 }
hover      180ms ease-out
scrub      scroll-tied, no duration (GSAP scrub 0.8–1.2 where used)
loop       6–10s ease-in-out infinite (ambient only; LED pulse 2.4s)
stagger    70ms siblings · 90ms headline lines · 30ms chips

## THE EIGHT SYSTEMS (every prompt speaks this language)
1 THE TRACE — one terracotta circuit trace, 45° PCB bends, travels the whole page: boot → nav LED (#nav-led) → hero scroll-cue → CODE × HARDWARE crossing under "intersection" (the word blooms at the crossing frame) → skills margin → experience spine → IS the Project Rail → pass-through → contact email underline → footer LED (#footer-led, pulses 3×, rests). Per-section SVG segments that read as ONE line. When in doubt, spend effort here.
2 THE LATERAL DOCTRINE — objects enter FROM THE SIDES and dock onto the trace: dossiers alternate left/right (mobile: all from right, ±24px), experience cards from the right, achievements alternate, contact socials alternate. Text rises from masks; OBJECTS travel laterally. Docking = stub trace draws + via lights + 6-particle spark. overflow-x: clip on every section.
3 PHYSICALITY — paper has mass: shadowLag under every dossier, counter-flex settle, inkHalo under every stamp, sheen on hover, folded corners + fiber grain (static). If an entrance reads as "a div slid in", fix the shadow before touching the card.
4 POWER-ON LIGHTING — sections are dark modules until the trace arrives: segment completion sets data-powered → ghost numeral stroke .04→.09, REF plates textMuted→textDim, vias lit (powerOn token, one-shot class toggle — NEVER per-frame style writes).
5 PROXIMITY (tier A only) — one shared pointermove system; the board leans toward the hand: hero name chars, via rings within 80px, nav LED, primary-CTA magnetic bias. Ceiling: 3px / 2°. Below tier A: not loaded.
6 VELOCITY BUS — one lerped scroll-velocity value (lib/velocity.js); consumers: marquee timeScale [−3,3] + skewX ≤4°, cursor stretch ≤1.35×, pulse tail 6→10, depth-field dust streaks ≤2×. One organism, one signal.
7 OPEN-FILE + KEYBOARD GRAMMAR — dossier → detail page is a View Transitions shared-element morph (file number, title, stamp; 480ms; feature-detected, 280ms fade fallback); J/K + ↑/↓ walk the rail; back restores scroll to the exact dossier; focus moves to h1 on route entry.
8 THE DEPTH FIELD (tier A) — hero + background as ONE WebGL scene: the camera travels through a recycling low-poly polyhedra field mapped to scroll; solder-dust streaks with the velocity bus; spawn avoids the central text measure; ≤12% visual weight; renders on demand; the hero ico is the field's flagship node. First thing the watchdog kills. NEVER a second context.

## Choreography rules
1. Nothing enters alone — parent first, children staggered 70ms.
2. One hero per moment — while the Rail scrubs, nothing else on screen moves.
3. Moving things are the light sources — the pulse, the cursor, the trace carry glow; static UI never glows (except the 3 section glows). POWER-ON is the codification: dark until the trace arrives.
4. Stamps land AFTER their card docks (200ms later), always back-out, always slightly rotated, always with an inkHalo.
5. Exit animations are half the duration of entrances.
6. The reduced-motion page is a DESIGN TARGET, not a fallback: pre-powered, pre-drawn, calm, editorial.

## Performance budget & tier ladder
Budget: 60fps scroll · CLS 0 · INP <200ms · initial route JS ≤160KB gz (three.js and GSAP-heavy scenes lazy-loaded) · ≤1 WebGL context · DPR clamp 1.5 · will-change only while animating.
Tiers (app/lib/tier.js, decided once at boot, with setTier() for the watchdog):
  A — pointer:fine + hardwareConcurrency ≥8 + no reduced-motion + no saveData → everything (depth field, proximity, cursor v3, wobble, sheen, trail).
  B — mid → no WebGL at all (depth field + hero replaced by a static composed poster + CSS glows), pulse tail 4 particles, no tilt/velocity FX, no proximity, native-ish cursor (labels off).
  C — touch/weak/saveData → CSS glows only, native cursor, no particles, static marquee, no Lenis.
Watchdog: rAF-sampled fps in 2s windows; 3 consecutive <48fps → drop one tier live (console.info it).
Debug: ?debug renders a fixed mono HUD — FPS · TIER · SCROLL% · TRACE%.

## Texture
Film grain 3–5% flickering ~10fps (stepped). Ghost numerals 01–08 behind section heads (slight parallax drift, scrub). PCB dressing: hairline traces (45° bends), via rings, corner ticks, mono plates ("FIG. 04 — THE RAIL"). Paper dossiers: terracotta rubber stamps at −8°, folded top corner, 2% fiber grain. ::selection accentSoft/accent (paper pages: accentSoft bg / paperInk text). Thin scrollbar (borderHi thumb → accentDim hover).
```

---

## Prompt 1 — Theme swap: tokens + fonts + libs + tier system + debug HUD

```
Re-skin the entire existing site to the v3 design system from V3_RULES.md — ZERO layout or motion changes in this prompt. The site must look fully re-branded and build clean. Do not commit; append a summary to V3_CHANGELOG.md.

Do:
- npm i motion gsap lenis (motion = Framer Motion for React 19).
- app/theme.js: export the full palette + font stacks as tokens; expose them as CSS custom properties (:root vars in globals.css) so both Tailwind v4 and the existing inline styles can consume them.
- app/lib/motion.js: export EVERY motion token from V3_RULES.md by name (ease arrays, durations, springs, stagger, slideDock distances, shadowLag, inkHalo, sheen, wave, vtOpen, powerOn, proximity) — every later component imports identical values, no magic numbers anywhere.
- app/lib/tier.js (compute once at boot: A/B/C per V3_RULES.md ladder + setTier() escape hatch + a subscribe() so components react to live tier drops) and app/lib/useReducedMotion.js (single shared hook).
- Fonts: migrate to next/font/google in app/layout.js — Bricolage_Grotesque, Instrument_Serif, JetBrains_Mono as CSS variables; DELETE the @import url(...) lines inside the <style> tags of app/page.jsx and app/projects/[slug]/page.jsx.
- Sweep EVERY file and replace v1 colors with tokens: #ff6b3d → accent, #5b9eff → (nothing — remove/replace with borderHi or textDim), #08080a → bg, #f5f1ea → text, rgba(245,241,234,…) → token equivalents, per-category skill colors → single accent. Includes Nav, LoadingGate, BackgroundScene, Reveal, TiltCard, Magnetic, CustomCursor, both pages, and the ambient orbs (both become terracotta at 8–12%).
- GrainOverlay: extract the inline grain div into components/GrainOverlay.jsx; make it FLICKER by stepping an oversized grain layer through 4–6 offset positions at ~10fps via a steps() CSS animation (transform only; reduced motion → static frame).
- Base CSS: ::selection (accentSoft bg / accent text) + a paper-surface variant (accentSoft bg / paperInk text, scoped to [data-surface="paper"]), thin scrollbar (borderHi thumb → accentDim hover), global focus-visible ring (2px accent, 2px offset; 2px accentDim on paper surfaces), html { color-scheme: dark }, scroll-margin-top on section anchors (nav height + 24px).
- Viewport/meta groundwork: theme-color = #1a1815 (per-route paper value lands in Prompt 13); check node_modules/next/dist/docs for whether this Next version wants it in the viewport export or metadata export.
- Debug HUD: when location.search includes "debug", render a fixed bottom-left mono panel showing FPS (rAF-sampled) · TIER (live, updates on watchdog drops) · SCROLL% · TRACE% (stub 0). aria-hidden.

Done when: npm run dev shows the same site fully re-branded (warm espresso + ivory + terracotta only — zero orange/blue remnants anywhere, check the loader too), fonts load via next/font with no FOUT, grain flickers, ?debug shows live FPS/TIER, npm run build passes, and V3_CHANGELOG.md has the Prompt 1 entry.
```

---

## Prompt 2 — Static v3 pass: extract sections + editorial/PCB/paper dressing + every slot reserved

```
Rebuild the page as STATIC v3 layout — real copy verbatim, premium spacing, zero new motion. This is where the award is won: if this static pass looks expensive, every later prompt compounds it; if it looks cheap, no animation will save it. Do not commit; append to V3_CHANGELOG.md.

Do:
- Extract app/page.jsx into app/sections/: Hero, About, Skills, Experience, ProjectRail, Marquee, Achievements, Education, NowBuilding, Contact, Footer — page.jsx becomes composition + shared chrome. Keep the existing responsive class names working (globals.css overrides) or migrate them carefully — no mobile regressions.
- Ghost numerals 01–08 (Instrument Serif, 12–16vw, transparent fill, 1px borderHi text-stroke at 4% opacity — the "unpowered" state; POWER-ON raises it later, absolute behind each section heading, aria-hidden, overflow-clipped): About 01 · Skills 02 · Experience 03 · Projects 04 · Achievements 05 · Education 06 · Now Building 07 · Contact 08.
- Eyebrows become mono chips (JetBrains Mono, uppercase, 0.14em, hairline border, 4px radius): "ABOUT ME", "SKILLS & TOOLS", "EXPERIENCE", "SELECTED WORK — 6 FILES", "ACHIEVEMENTS", "EDUCATION", "CURRENTLY SHIPPING", "GET IN TOUCH".
- Nav: add the terracotta LED dot next to the wordmark (id="nav-led", currently just statically lit) and a reserved slot under the links for the scrollspy dot (Prompt 5).
- Hero: keep the grid; under the CTAs add the mono microline "FULL-STACK · GENAI · DATA · HARDWARE"; add the scroll cue at the hero's bottom center — a 48px vertical hairline ending in a small terracotta dot (the trace's origin, static for now).
- About: set the headline so the italic word "intersection" is wrapped in a span with id="ix-word" (plus an aria-hidden sibling glow layer, opacity 0 — the Prompt 4 bloom slot); behind the headline reserve a wide shallow <svg> slot for the CODE × HARDWARE crossing (Prompt 4). Build the stats row with each numeral as stacked digit columns inside overflow:hidden slots, static at final values (6+ · 300+ · 2+ · 200+) — Prompt 10 turns them into odometers.
- Skills: restyle the 8 category cards as IC packages — tiny hairline pin stubs on the left/right card edges, mono REF designator top-right (U1…U8, textMuted — the unpowered state), serif category name, chips inside. ONE accent color (drop the per-category colors; keep the lucide icons).
- Experience: add the vertical spine slot down the left margin with a via ring (small hairline circle) per role; cards to its right. Static.
- ProjectRail: the centerpiece's STATIC layout. A central vertical hairline rail (SVG slot, 45° bends between file slots); the 6 dossiers from data.js as PAPER cards with FULL PAPER CRAFT — paper bg, paperInk text, paperLine rules, a slight lift shadow AS ITS OWN sibling layer (the Prompt 7 shadowLag element — position it now so there is zero CLS later), a folded top-right corner (14px CSS triangle in paperLine), a 2% fiber-grain overlay, serif file number 01–06, title, date, first-sentence desc (full desc stays on detail pages), mono tag chips, ArrowUpRight. data-surface="paper" on every paper card. Alternate cards left/right of the rail (stack right-of-margin-rail on mobile). Each card: a static terracotta rubber stamp (rotated −8°, 1.5px accent border, mono): 01 FLAGSHIP · 2026 / 02 SHIPPED / 03 LIVE DEMO / 04 LIVE DEMO / 05 HARDWARE · 300V TESTED / 06 SIMULATION. Short stub trace + via ring connecting each card to the rail. Blueprint dressing: corner ticks, mono plate "FIG. 04 — THE RAIL", a reserved top-right slot for the HUD (Prompt 8). Cards keep their Link to /projects/[slug].
- Marquee band (NEW, between ProjectRail and Achievements): giant outlined Instrument Serif "CODE · CIRCUITS · DATA · GENAI · " repeated (transparent fill, 1px borderHi text-stroke, ~10vw), one word per repetition solid accent; beneath it a thin mono row of real stack keywords (FASTAPI · YOLOV8 · SARIMA · LANGCHAIN · REACT · DOCKER · MATLAB · POWER BI …) at 0.35 opacity. Duplicate content 2× inside overflow:hidden containers, static.
- Achievements: 2-column masonry of the 6 real cards, icon in a stamp-styled ring. Education: keep rows, grade in Instrument Serif. NowBuilding (NEW): eyebrow chip CURRENTLY SHIPPING + mono tag IN DEVELOPMENT; serif "Now building: HireFlow AI — a job-outreach copilot."; one-liner "Turns a spreadsheet of recruiters into personalized, paced, tracked cold email — extraction to inbox to interview."; small envelope icon; link the card to https://github.com/Jaskirat314276/AI_EMAIL_SENDER-HIREFLOW-AI-.
- Contact: keep serif headline + magnetic email; add an empty underline <svg> slot beneath the email, a reserved inline slot beside it for the Prompt 11 "COPIED ✓" chip, and three faint edge line-slots (left/right/bottom) for the Prompt 11 convergence; social pills stay (links fixed in Prompt 11). Footer: dead-center above the copyright row, an 8px terracotta dot (id="footer-led", statically glowing) at the end of a short vertical hairline slot, plus a mono local-time chip slot ("RANCHI, IN" static for now — the live clock mounts in Prompt 11 client-side to stay hydration-safe).
- app/not-found.jsx STATIC: dark board, a vertical hairline trace that visibly BREAKS mid-path (a gap with an exposed hollow pad + three tiny debris ticks, danger-tinted), mono "ERR 404 — OPEN CIRCUIT", serif "This trace leads nowhere.", link "← Back to the board" → /. Same nav-less minimal chrome, same grain. (Prompt 9 animates the break.)
- Give every section position:relative + overflow-x:clip (lateral entrances must never scroll the page sideways) + an id for anchor links.

Done when: the ENTIRE page reads as a re-designed premium static site at 360/768/1440px with zero console errors and zero CLS-risk (every future animation, shadow, halo, chip, and HUD has a reserved slot), the dossiers look like real paper documents on a dark desk (folded corner, fiber grain, resting shadow), /definitely-not-a-route shows the broken-circuit 404, ghost numerals read as texture not clutter, and V3_CHANGELOG.md is updated.

Feels right when: with all motion still absent, you'd already show this page to a recruiter.
```

---

## Prompt 3 — Motion systems: Reveal v2 + MaskLines + SlideDock (physicality core) + velocity bus + proximity + Lenis

```
Site-wide motion primitives and the three shared signals everything later consumes. Import all timings from app/lib/motion.js — no magic numbers. Every component consults useReducedMotion() and tier. Do not commit; append to V3_CHANGELOG.md.

- components/Reveal.jsx (v2): rewrite on motion/react — whileInView fade 0→1 + rise 20px→0, reveal token, viewport once:true margin "-10% 0px", optional stagger prop (70ms children). Keep the same component API so existing usages keep working.
- components/MaskLines.jsx: splits headline text into lines (resize-safe re-split), wraps each in overflow:hidden, lines rise 110%→0 with maskLine token at 90ms stagger. Keep intact text accessible; animate an aria-hidden visual copy. Apply to EVERY serif section headline.
- components/SlideDock.jsx (THE signature primitive — build carefully, this is the site): props side ("left"|"right"), distance (default 96, 24 on mobile via matchMedia), dockDelay. whileInView once: x ±distance→0 with slideDock's expo-out; rotate 1.5°→0 runs on a back-out curve so the card lands with a ~0.4° counter-flex (per-property transitions — the travel is smooth, the LANDING has mass). PHYSICALITY built in: SlideDock owns the card's sibling shadow layer — the shadow translates/settles on the shadowLag spring starting 40ms after the card, slightly larger + softer mid-flight (opacity 0.26), tightening to rest (0.16) on landing. Optional onDocked callback (fires at animation complete — Prompts 7/10/11 hook sparks/stamps to it). Reduced motion: plain fade, resting shadow.
- components/Stamp.jsx: a terracotta rubber-stamp chip that enters with the stamp token (scale 1.4→1, rotate to −8°, opacity 0→1) when triggered, AND fires its inkHalo — an aria-hidden ring behind it scaling 1→1.9 while fading 0.45→0 (inkHalo token). Reduced motion: static stamp, no halo.
- app/lib/velocity.js — THE VELOCITY BUS: a module-singleton that lerps scroll velocity in ONE rAF (lerp 0.12, clamped ±4000px/s), exposed via a tiny subscribe/get API (no React re-renders — consumers read inside their own animation frames). Consumers arrive in later prompts (marquee, cursor, pulse tail, depth-field streaks); build the bus + a ?debug readout now. The rAF idles (cancels) when velocity has settled to ~0 and no subscribers are animating.
- app/lib/useProximity.js — PROXIMITY (tier A only): ONE window pointermove listener, rAF-batched; components register an element + radius (default 96px) and receive normalized distance/vector via callback (again, no re-renders). Ships with the two cheapest consumers to prove the API: the nav LED brightens (opacity 0.7→1) as the cursor nears, and via rings warm 8% within 80px. Max output anywhere: 3px translate / 2° rotate — enforce the clamp IN the hook. Tier B/C or reduced motion: hook returns inert, listener never attached.
- Lenis (tier A/B, skipped for reduced motion and tier C): 1.0–1.1 lerp subtle smoothing, wired into the existing rAF; anchor clicks use lenis.scrollTo with the nav offset; keep native scroll restoration working (lenis must not fight popstate — on back/forward, jump immediate). Scrollspy hash sync: as sections cross the viewport midline, history.replaceState the hash (throttled ≥300ms, never pushState).
- Scroll progress hairline: 2px accent bar fixed at the very top, scaleX = page scroll progress (transform-origin left), ending in a 2px brighter head-dot — a micro-echo of the rail pulse (reduced motion: hidden).
- Wire the primitives site-wide NOW with restraint: headlines via MaskLines; body/cards via Reveal; NOTHING uses SlideDock yet except one test — the About stat cards may slide from alternating sides as a first taste. The heavy lateral choreography lands in Prompts 7/10/11.

Done when: every serif headline rises from masks, sections reveal with staggered children exactly once, the top hairline tracks scroll with its head-dot, SlideDock docks its test cards WITH a visibly lagging shadow (slow it 10× in dev to verify the lag reads), Stamp fires its ink halo, the velocity bus and proximity hook show live values in ?debug, Lenis smooths tier A/B scroll without breaking back/forward or anchors, reduced motion = plain fades + no Lenis, 60fps in ?debug.

Feels right when: the SlideDock test card lands like a dealt card — you see the shadow catch up. If it reads as "a div with a shadow", increase the lag 20ms before touching anything else.
```

---

## Prompt 4 — THE TRACE + POWER-ON LIGHTING

```
The signature system. A single terracotta circuit line that travels the whole page as per-section SVG segments reading as ONE continuous trace — and now it carries power: sections sit dark until the trace reaches them. Do not commit; append to V3_CHANGELOG.md.

- components/Trace.jsx: a registry-based system — sections register a SEGMENT (SVG path ref + the scroll window [start,end] over which it draws). Trace.jsx maps each segment's pathLength/stroke-dashoffset to its window (motion useScroll + useTransform, or GSAP scrub 1 — pick ONE engine and use it for all segments). Styling: stroke accent, 1.5px, round caps, 45° PCB bends (no curves — this is a circuit, not a thread), a subtle drop-shadow glow, vector-effect non-scaling-stroke. All aria-hidden.
- POWER-ON LIGHTING (the v3 addition — cheap and transformative): when a segment's draw completes its window, set data-powered on its section (and unset if the user scrubs back above the window — hysteresis of ~5% so it never flickers). CSS transitions (powerOn token, 400ms) respond: ghost numeral stroke opacity .04→.09 · REF plates and mono labels textMuted→textDim · via rings borderHi→accent at 60% · the section's corner ticks fade in. ONE class toggle per section — never per-frame style writes. The page now visibly boots section by section as you scroll.
- Ghost numeral parallax: each numeral drifts −6% translateY across its section's scroll window (scrub, transform only, tier A/B). Subtle depth, nothing more.
- Segments to wire NOW (align x-positions pixel-close so consecutive segments read as ONE line):
  s1 hero: from the scroll-cue dot, a short vertical drop drawing as you leave the hero.
  s2 about — THE INTERSECTION BEAT: two hairlines, mono-labeled CODE (from the left) and HARDWARE (from the right), draw toward each other and CROSS exactly under the #ix-word span ("intersection"), then merge into one line exiting the section bottom. Scrubbed across the section's scroll range. AT THE CROSSING FRAME: the word's pre-reserved glow layer blooms in (opacity 0→1 over 320ms, accentSoft text-glow) and STAYS — the thesis of the portfolio gets its spotlight at the exact moment the two disciplines meet. This is the single most important frame on the page — tune the crossing x/y until it is pixel-perfect under the italic word at 360/768/1440.
  s3 skills: a margin run down the section's left edge with two 45° jogs.
  s4 experience: the timeline spine — the line draws down through the three via rings (vias light terracotta as the line passes; the spark-on-dock comes in Prompt 10).
  s5 project rail: RESERVED — Prompt 8 registers the Rail's own path here so the trace flows straight through the centerpiece.
  s6 pass-through: achievements → education → now-building margin line.
  s7 contact: on section enter, the underline beneath the email draws (600–800ms, expo-out, once) — plus the three convergence lines in Prompt 11.
  s8 footer: short vertical drop into #footer-led; when it completes, the LED scales in with the stamp token (its pulse choreography comes in Prompt 11).
- Wire TRACE% into the ?debug HUD (total drawn length / total length).
- Reduced motion: all segments render fully drawn and static; EVERY section pre-powered (data-powered set at mount); vias lit; the ix-word bloom on at rest.

Done when: scrolling draws one continuous terracotta trace down the page — hero drop → CODE×HARDWARE crossing under "intersection" (the word blooms exactly at the crossing) → skills margin → experience spine (vias lighting) → [rail gap] → pass-through → email underline → footer LED — with each section visibly powering on as the line arrives, pixel-close handoffs between segments, TRACE% ticking in ?debug, and reduced motion showing everything pre-drawn and pre-powered.

Feels right when: scrolling feels like walking down a dark corridor flipping breakers — light follows the line, never precedes it.
```

---

## Prompt 5 — Boot preloader + cursor v3 + nav choreography

```
The cinematic entry and the pointer. All timings from motion.js; everything consults useReducedMotion() and useTier(). Do not commit; append to V3_CHANGELOG.md.

Boot preloader (rework components/LoadingGate.jsx → components/BootLoader.jsx — KEEP its voxel-"JS" three.js assembly, it's good; first visit per session only, ≤2.4s hard cap, sessionStorage "js-boot", any click/keypress skips instantly):
1. Re-color the voxel scene to v3 (voxels accent/accentDim, edges ivory, kill all blue) and clamp DPR 1.5.
2. Overlay, bottom-left, a JetBrains Mono POST log typing at ~24ms/char: "JS-CORE BOOT v3.0" → "PSU OK · 5V RAIL STABLE" → "CLK 60FPS" → "LOADING PORTFOLIO…". Bottom-right: a counter 000→100 over ~1200ms with THREE stutter-stalls (037, 061, 089) and glyph-scramble flicker on changing digits (▓▒░#$%).
3. At 100: log prints "POWER ON", the scene fades, and a small terracotta dot flies from the loader to the nav and lights #nav-led (coordinated FLIP/layout animation — the eye must read: the boot BECAME the nav LED; the trace is born).
4. Hero MaskLines start at handoff 60%, so content is already rising as the loader exits.
- Reduced motion or repeat visit: no loader at all, #nav-led simply lit.

Cursor v3 (upgrade components/CustomCursor.jsx; fine pointers + tier A only — current touch guards stay):
- Keep the dot + lerping ring; add a mono label that swaps with the stamp token per data-cursor attribute: links/nav VIEW · project dossiers OPEN · marquee DRAG · buttons/CTAs PRESS. Ring expands 1.6× on targets, fills accentSoft on primary CTAs.
- VELOCITY STRETCH: the dot subtly scales along its motion vector (velocity bus; clamp 1.35×, lerp back at rest) — the cursor is a signal, and signals have momentum.
- SOLDER TRAIL: 4 pooled 2px dots that only appear above a speed threshold, trailing the dot's recent positions and fading in 240ms — molten points off a moving iron. Pooled, aria-hidden, zero allocation per frame.
- PAPER BLEND: over [data-surface="paper"] elements the cursor layer flips to mix-blend-mode: difference so it stays crisp on cream (swap via the same delegation, no per-frame checks).
- MAGNETIC BIAS: within 24px of a primary CTA the dot eases 2–3px toward the target center (proximity system) — a lean, not a snap.
- Replace the querySelectorAll listener wiring with event delegation on pointerover/pointerout reading data-cursor from the composed path, so dynamically mounted sections (all of them, now) just work.
- Hide the native cursor only while active; restore on window blur. Text remains selectable — never suppress the I-beam expectation over prose. Tiers B/C + reduced motion: native cursor, module not loaded.

Nav choreography:
- Scrolled state: past 24px, fade in surface/85 + backdrop-blur + hairline (opacity/transform of a backdrop layer — no layout animation).
- Hide on fast scroll-down (>80px/s → y:-110%, spring token); any scroll-up springs it back.
- Scrollspy: IntersectionObserver (rootMargin -40%) sets the active link; a small terracotta dot SLIDES between links (motion layoutId "nav-active"); hash stays in sync via the Prompt 3 replaceState wiring.
- Links get a 2px magnetic pull toward the cursor (proximity, tier A) — barely there, but the nav feels machined.
- Mobile menu: full-screen surface overlay; oversized serif links (clamp 40–72px) mask-rise at 60ms stagger; button morphs to X (two lines rotate, transform only); body scroll locked (Lenis stop/start).

Done when: first load plays voxels+POST+counter→POWER ON→LED handoff in ≤2.4s and never again this session; Esc/click skips; cursor labels read VIEW/OPEN/DRAG/PRESS over the right targets, the dot stretches on fast moves and drops solder points, flips to difference over paper cards, and never lags; nav hides/springs, the active dot glides between links, and links lean toward the pointer; mobile menu mask-rises; reduced motion = no loader, native cursor, static nav states.

Feels right when: the boot reads as a machine waking up, not a progress bar; the cursor feels like the hot tip of the trace.
```

---

## Prompt 6 — THE DEPTH FIELD + hero: the one-scene fly-through + kinetic type + the living name

```
The page stops sitting in front of a background and starts TRAVELING through one. Merge the hero 3D and BackgroundScene into ONE WebGL scene — a warm depth field the camera flies through as you scroll — while the hero type comes alive. The hero must feel alive within 1 second of the boot handoff. Do not commit; append to V3_CHANGELOG.md.

THE DEPTH FIELD (ONE WebGL context total — this scene IS the entire allowance):
- Rework BackgroundScene into components/DepthField.jsx: one fixed, full-viewport canvas behind all content (pointer-events:none, aria-hidden), lazy-loaded (next/dynamic ssr:false), mounted only AFTER the boot loader fully disposes its context — never two contexts, verify with the ?debug context count.
- The field: 40–60 low-poly wireframe polyhedra (icosa/octahedra) as InstancedMesh (2 geometries → 2 draw calls), tinted terracotta/ivory/borderHi at 12–30% opacity, sunk in espresso fog (#1a1815) so depth reads as warm air above the board, not outer space. Spawn distribution AVOIDS the central text measure (keep a clear corridor ±30% of viewport width in the middle band) — copy must never sit on a bright wireframe.
- THE FLY-THROUGH: camera z travels a long corridor mapped to page scroll progress (lerp 0.08–0.12 for a scrub feel that never fights Lenis); shapes that pass behind the camera + fog margin RECYCLE ahead of it (re-seed position/rotation/tint — infinite corridor, zero allocation per frame). A gentle idle drift (loop token) breathes when scroll rests.
- VELOCITY STREAKS: a sparse solder-dust layer (~80 points) stretches along the travel axis with the VELOCITY BUS (scale clamp 2×, opacity rising with speed) — flick the wheel and the air moves; stop and it settles. Same signal as the marquee, cursor, and pulse tail: one organism.
- Render on demand: full rate only while the camera is easing or velocity is non-zero; half-rate during idle drift; full pause on document.hidden; watchdog pressure drops idle drift first, then the whole field (poster swap). DPR clamp 1.5.
- Restraint law: the field is ATMOSPHERE — ≤12% visual weight. If a judge's eye ever goes to the background instead of the trace, dim the background. The trace wins every tie.

The hero flagship (inside the same scene):
- The existing icosahedron becomes the field's FLAGSHIP node, framed to the hero's right column — project the column's DOM rect to a world position on mount/resize only, never per frame (mobile: centered high behind the headline at ~40% opacity). Re-theme: mesh accent terracotta (metalness 0.6, roughness 0.3), inner wireframe ivory at 0.5, outer wireframe borderHi at 0.2, particles a terracotta↔ivory color ramp (kill every blue value). Skeleton: an accentSoft glow while the chunk loads (zero CLS).
- Tier A refinements: (1) a vertex-noise WOBBLE in the mesh shader — time-uniform driven, amplitude 0.03 idle easing to 0.12 over 180ms on pointer-enter of the hero column; alive under the hand, zero extra draw calls. (2) THE DEPARTURE — as you scroll out of the hero, the camera's first travel move is PAST the flagship: it grows, slides off-frame, and the corridor opens ahead. Boot → hero → journey must read as one continuous power-on.
- Tier B: no WebGL at all — a static composed "poster" (pre-rendered CSS/SVG isometric + glow) + components/GlowField.jsx (two fixed CSS radial glows, terracotta 8–12%, at the existing orb positions). Tier C: glows only. Reduced motion: one static field frame (or the poster), no travel, no streaks, no wobble.
- Remove the three.js import from the old BackgroundScene path so the bundle sheds it outside the lazy chunk.

Kinetic type:
- Eyebrow AVAILABLE FOR OPPORTUNITIES · 2026 scramble-decrypts (900ms) after the boot handoff.
- Headline: MaskLines rise (wired) + ONLY the italic "Jaskirat Singh" gets per-char rotate-in from −6° (18ms/char), then its terracotta underline draws as a trace mini-segment 800ms later.
- THE LIVING NAME (tier A, after the intro settles): pointer-enter ripples a WAVE through the chars — each translateY −6px→0 on a spring, 24ms stagger running in from the side you entered (wave token), 600ms cooldown so it never machine-guns; while the pointer stays near, the chars hold the subtle PROXIMITY lean (≤3px/2°, 96px radius); on leave, everything springs home. Chars are aria-hidden copies; the real text stays intact and selectable. Do not per-char anything else; restraint reads expensive.
- Subhead + CTAs + mono microline: Reveal stagger (70ms) after the headline.

CTAs:
- "See my work": existing Magnetic + hover bloom (accentSoft box-glow via opacity pseudo-layer, 180ms) + cursor PRESS; smooth-scrolls to #projects (Lenis offset-aware).
- Resume dropdown: menu springs open (spring token, transform-origin top-left), items stagger 60ms with the Download icons nudging 2px right on hover; focus-trapped, Esc closes, arrow keys navigate (it's a real menu — role=menu is already there, finish the keyboard support).
- Scroll cue: the hairline+dot pulses gently (loop token); it is trace s1's origin — verify the visual handoff into the About crossing is seamless.

Done when: within 1s of the boot handoff the terracotta flagship is turning with ivory wireframes and the field breathes behind it; scrolling the page flies the camera through the corridor — shapes recycle invisibly, dust streaks on fast flicks, and the flagship slides past as you leave the hero; text stays perfectly legible everywhere (spawn keep-out verified at 360/768/1440); ONLY one WebGL context ever exists (?debug count: boot disposes → field mounts); the eyebrow decrypts, lines rise, the name spins in, underlines, then ripples and leans under the pointer; the dropdown is fully keyboard-operable; ?debug holds ~60fps mid-flight; tier B shows the poster + glows; reduced motion = one static frame + plain fades + inert name.

Feels right when: scrolling feels like drifting forward through warm air above the board — and when you stop, the world rests. If it reads as a parallax gimmick, slow the camera lerp and dim the field; the trace still wins every tie.
```

---

## Prompt 7 — THE PROJECT RAIL part A: lateral docking with full physicality (the owner's signature)

```
The centerpiece, stage one: the six paper dossiers DEAL IN FROM THE SIDES and dock onto the rail — and in v3 they have MASS. This prompt is the whole reason the site exists; the lateral entrances must feel like heavy paper dealt onto a desk by a careful hand, not like a CSS demo. Do not commit; append to V3_CHANGELOG.md.

- Wrap each dossier in SlideDock: odd files (01/03/05) from the LEFT, even (02/04/06) from the RIGHT; distance 96px desktop / 24px mobile (mobile: ALL from the right); rotate settle 1.5°→0 with the counter-flex landing and the rotation sign matching the entry side; 650ms expo-out; viewport margin "-15% 0px", once:true.
- PHYSICALITY (this is what separates v3 from every other portfolio with slide-ins):
  a. The desk shadow (the sibling layer from Prompt 2) rides the shadowLag spring — 40ms behind the card, larger and softer mid-flight (opacity 0.26, y +6px), tightening to rest (0.16, y +3px) as the card lands. The eye reads weight without knowing why.
  b. On landing, the card's counter-flex (~0.4° opposite rotation, from SlideDock) sells the settle.
  c. Hover sweeps the SHEEN once — a 6%-opacity ivory band translating across the paper at 45° (sheen token, 600ms, gradient layer, transform only) — light catching stock as it lifts.
- Docking choreography per card (sequenced off SlideDock's onDocked):
  1. Its stub trace draws from the rail to the card edge (120ms, pathLength).
  2. The via ring at the junction lights terracotta (stamp token) + a 6-particle spark fires (pooled canvas or 6 absolutely-positioned motion dots — 500ms life, slight gravity, aria-hidden).
  3. 200ms later the rubber Stamp lands WITH its inkHalo (FLAGSHIP · 2026 / SHIPPED / LIVE DEMO / LIVE DEMO / HARDWARE · 300V TESTED / SIMULATION).
  4. The serif file number counts up its two digits with a tiny roll (01…06, 300ms).
- Card interactions: hover = 4px lift + 1° tilt toward cursor (reuse TiltCard at low intensity) + shadow deepens + sheen sweep + the stub trace brightens; cursor label OPEN; whole card remains a Link to /projects/[slug]. Keyboard focus shows the same lifted state via focus-visible.
- Stagger safety: if two cards are in view simultaneously (short viewports), stagger their docks 120ms so sparks never fire in sync (nothing enters alone, but one hero per moment).
- The rail itself stays static this prompt (hairline at 0.4 opacity). Verify overflow-x: clip holds at 360px — side entrances must never cause horizontal scroll.
- Reduced motion: cards in place, resting shadows, stamps static, vias lit, no sparks, no sheen.

Done when: scrolling the section deals each paper file in from its side with a lagging shadow and a felt settle, stub→via→spark→stamp(+halo)→number reads as one 1-second choreography per card, hover/focus lift + sheen feels tactile, mobile (all-from-right, ±24px) is clean with zero horizontal overflow, and reduced motion shows the finished dossier wall.

Feels right when: slow the entrance 10× in DevTools — the shadow should visibly chase and catch the card. At full speed you shouldn't SEE it; you should FEEL the weight. If a card still reads weightless, add 20ms of shadow lag — never more distance.
```

---

## Prompt 8 — THE PROJECT RAIL part B: scrubbed signal pulse + HUD + keyboard grammar

```
Stage two: the rail comes alive with scroll — and becomes drivable from the keyboard. Do not commit; append to V3_CHANGELOG.md.

The scrubbed rail:
- Replace the static rail hairline with one SVG path (45° PCB bends, vector-effect non-scaling-stroke) spanning the section; register it as trace segment s5 so the page-long trace flows straight through the centerpiece (check the s4→s5 and s5→s6 handoffs pixel-close, and that POWER-ON fires for the section when s5 completes).
- GSAP ScrollTrigger on the section (scrub 1, NO pin — the page keeps its natural flow): rail pathLength 0→1; a SIGNAL PULSE (glowing 6px accent dot, soft shadow) rides the path via getPointAtLength, with a 6–10 particle tail sampled from recent path points (ring buffer; tier B: 4 particles). Tail length stretches with the VELOCITY BUS (the same signal the marquee and cursor read — clamp 2×).
- Lighting states driven by pulse progress: files whose dock-threshold the pulse has passed sit fully lit; upcoming files at 0.55 opacity + slight desaturation (CSS filter on a wrapper is fine here — it's not animated per-frame, it toggles). Thresholds ≈ 0.08/0.24/0.40/0.56/0.72/0.88. Scrolling back dims files again but NEVER un-deals the cards (Prompt 7's whileInView stays once:true).
- HUD (the reserved top-right slot; mono, textDim, aria-hidden): "FILE 03/06 — AI LINKEDIN POST GENERATOR · 048%" — name flips with the stamp token at each threshold, percent ticks with scroll. On tier A desktop it appends a second line: "J/K — FILES". Position: sticky within the section. Mobile: a slim bottom bar (no keyboard line).
- KEYBOARD GRAMMAR: while the rail section is intersecting, J/K and ↑/↓ move between dossiers — focus moves to the target card's link AND the page smooth-scrolls it to center (Lenis-aware; block if a modifier key is held; never trap — Tab still walks naturally; disabled under reduced motion beyond instant jumps). This is a real a11y feature wearing a power-user costume: keyboard users can walk the entire body of work without hunting.
- A traveling light: a radial accentSoft mask moves with the pulse illuminating the next ~160px of rail (upcoming rail at 0.25 opacity vs 0.08 unlit).
- One hero per moment: while the pulse is mid-rail, the marquee (Prompt 11) holds base speed and no other section-level loops run in-viewport.
- Reduced motion: rail fully drawn, all files lit, no pulse, no HUD, J/K jumps are instant scrollIntoView.

Done when: scrolling scrubs the pulse down the rail with its tail stretching on fast flicks (same breath as the cursor and marquee — one velocity, one organism), files light exactly at their thresholds and dim cleanly on scroll-back, the HUD ticks file names and percent and advertises J/K on desktop, pressing J/K walks focus card to card with the page gliding along, and 60fps holds through the whole section in ?debug.

Feels right when: J/K makes the rail feel like a machine you're operating — flick through all six files hands-on-keyboard and it reads like flipping through a case binder.
```

---

## Prompt 9 — OPEN-FILE: the dossier→page morph + paper detail pages + the 404 comes alive

```
The route transition is where almost every portfolio dies — the page cuts, the spell breaks. In v3, clicking a dossier OPENS THE FILE: the card you were holding becomes the document. Do not commit; append to V3_CHANGELOG.md.

OPEN-FILE morph (View Transitions, feature-detected, graceful):
- First, per AGENTS.md, read node_modules/next/dist/docs for this Next version's view-transition support. Prefer the framework's own mechanism if it ships one; otherwise wrap router navigation in document.startViewTransition yourself (App Router client nav is same-document, so this works). If neither is viable, ship the fallback below and note it in V3_CHANGELOG.md — no hacks, no experimental churn.
- Shared elements (exactly THREE — more reads as chaos): the dossier's serif file number → the detail page's giant file number; the title → the detail h1; the stamp → the detail stamp. Assign each its view-transition-name ON CLICK ONLY (never at rest — dozens of persistently named elements hurt paint). Everything else crossfades dark→paper underneath. vtOpen token: 480ms, [0.7,0,0.3,1].
- ::view-transition-old/new defaults are replaced with transform/opacity keyframes only. prefers-reduced-motion or unsupported browsers: 280ms crossfade. Back-navigation runs the morph in reverse (the file returns to the rail).
- Scroll + focus choreography: on entry, focus moves to the detail h1 (tabindex="-1", no visible jump); on back, scroll restoration lands on the exact dossier you opened (verify Lenis doesn't fight popstate — restoration jumps immediate, then Lenis resumes). Dossier links prefetch on hover/focus (verify Next's Link defaults cover it).

Paper detail pages (/projects/[slug]/page.jsx — "you opened the file"):
- Flip the route to PAPER MODE: paper bg, paperInk text, paperLine hairlines, terracotta accents, data-surface="paper" on the shell (the cursor's difference-blend and paper selection/focus styles pick this up for free), same Nav (its scrolled state adapts to light: paper/85 + blur + ink hairline). Back link: "← Back to the rail" → /#projects.
- Layout: giant serif file number, title, date + stamp (same stamp as the rail), full desc, highlights as a checked list (ticks draw in on load, 400ms apart, pathLength), tag chips, GitHub/demo buttons (magnetic, ink borders). Keep generateStaticParams + per-project metadata exactly as they are.
- Entry (non-morph parts): content mask-rises as the morph settles — reads as a document unfolding. Reduced: instant.

The 404 comes alive (app/not-found.jsx from Prompt 2):
- On mount, the lone trace draws downward (800ms, expo-out) and SNAPS at 55%: a two-frame opacity flicker at the break point, the line stops dead at an exposed hollow pad, the three debris ticks scatter 4–6px outward (one-shot, 300ms), and the mono line types on: "ERR 404 — OPEN CIRCUIT". Serif "This trace leads nowhere." mask-rises beneath; "← Back to the board" gets cursor VIEW and a magnetic pull. danger tint only at the break — everything else stays in-palette. Reduced motion: broken trace pre-drawn, text static.

Done when: clicking any dossier morphs its number, title, and stamp into the detail page while the canvas flips dark→paper; back reverses the morph and lands you on the same file at the same scroll position with focus sane; unsupported browsers and reduced-motion get a clean fade with zero errors; detail pages read as beautiful paper documents with drawing ticks; the 404's circuit visibly breaks; and V3_CHANGELOG.md records which VT mechanism was used (framework / startViewTransition / fallback).

Feels right when: opening a file feels like the card never left your hands — nothing "navigates", the document simply unfolds. If any fourth element draws attention mid-morph, remove its name; three is the number.
```

---

## Prompt 10 — Stats odometer (hardware-grade) + IC skill cards + experience spine + education grade flip

```
The supporting instrumentation — numbers roll like hardware, chips power on, the timeline sparks, and the rest beat gets its one quiet detail. Do not commit; append to V3_CHANGELOG.md.

Stats odometer (About section):
- On first whileInView: each digit column rolls vertically to its target (900ms, expo-out, 60ms stagger right→left), terracotta flash on settle, "+" pops last with the stamp token. Values stay real: 6+ · 300+ · 2+ · 200+.
- GHOST-BLUR (the v3 upgrade that makes it read mechanical): while a column is rolling above a velocity threshold, two aria-hidden ghost copies of the column render at ±0.45em translateY at 12% opacity — fake motion blur in pure transform/opacity. They vanish the frame the roll settles, replaced by the flash. Slow it 10× to verify the ghosts track perfectly.
- THE GAG: 1.2s after the 300 settles, the last column rolls once more to 301 with a tiny flash and the caption flickers to "LEETCODE PROBLEMS (STILL COUNTING)" for 1.5s, then back. Once per visit. Reduced motion: final numbers immediately, no ghosts, no gag.

IC skill cards (Skills section):
- Cards rise with Reveal stagger; on each card's entrance its pin stubs draw in (scaleX from the card edge, 20ms stagger) and the REF designator (U1…U8) types on. (If the section is already data-powered when cards enter, pins draw in the lit state — check both orders.)
- Chips cascade in 30ms apart. Hover (tier A): the PIN CHASE — pins light terracotta in a 30ms sequence from the card's edges inward toward the chip, like a signal entering the package; the card "seats" 1px down with a soft click of shadow; cursor VIEW. Keep TiltCard at low intensity.
- The section's s3 trace margin-run should visually pass behind the card grid (check z-order).

Experience spine (Experience section):
- Each card slides in FROM THE RIGHT (SlideDock side="right", 96px — full physicality: lagging shadow, counter-flex) as the spine's via ring lights + fires the 6-particle spark on onDocked (same choreography language as the rail — the site has ONE docking grammar).
- Inside each docked card: date chip stamps on (stamp token + inkHalo), bullet points cascade 60ms apart with their 8px terracotta dash drawing in, stack chips rise last.
- The spine (trace s4) draws with scroll between vias, so the line "reaches" each role just as its card docks. Tune the segment window so this sync reads clearly.

Education grade flip (the rest beat's single detail):
- Education rows keep their calm Reveal fade+rise — this section stays quiet on purpose. The ONE addition: 150ms after each row settles, its serif grade (CGPA: 7.15 · 95% · 91% — real values, verbatim) FLIPS IN with the stamp token (scale 1.3→1, slight rotate settle, back-out) like a seal pressed onto a quiet page. Nothing else in the section moves. Reduced motion: grades static.

Done when: the odometer rolls with visible motion-smear and lands with a flash, the 301 gag fires once, skill cards read as a component library powering on (pins drawing, REFs typing, hover signals entering the chip), every experience card docks from the right with a spark exactly as the spine reaches its via, each education grade flips in as its row's quiet full stop, and reduced motion shows final numbers + static seated cards + static grades.

Feels right when: the odometer could be filmed and mistaken for a macro shot of real hardware; the pin chase makes you hover every card once; education still feels like a rest — one seal per row, nothing more.
```

---

## Prompt 11 — Marquee kinetics + achievements stamps + now-building + contact convergence + footer LED, clock & Morse egg

```
The back half comes alive. Six beats. Do not commit; append to V3_CHANGELOG.md.

Marquee kinetics:
- The giant outlined-serif marquee scrolls infinitely (duplicated track, translateX loop, 40s base). It reads the VELOCITY BUS: timeScale clamped [−3,3] lerping back to 1 — scroll fast and it races, scroll up and it reverses — AND the track skews with the same signal (skewX up to 4°, lerp 0.1): at speed the letters lean into the motion like they're printed on a spinning cylinder. The solid-accent word advances to the next word each loop.
- The thin mono stack-keyword row drifts the opposite way (60s). Pause both offscreen; hold base speed while the rail pulse is mid-section (one hero per moment). Cursor label DRAG + click-drag nudges it (Observer). Reduced motion: static rows, zero skew.

Achievements:
- Cards dock from ALTERNATING sides (SlideDock 72px, physicality on), 70ms stagger down the masonry; each icon STAMPS in (stamp token + a small inkHalo, −6°) 150ms after its card lands; hover jiggles the stamp 1° (180ms). Reduced: static grid.

Now Building (HireFlow teaser):
- The strip slides in from the LEFT; the IN DEVELOPMENT chip gets a slow scanline sheen (3s loop, translate a gradient layer). Every ~6s while in view, an envelope-dot launches off the card along a small bezier and fades (pooled, aria-hidden, pauses offscreen). Card links out to the HireFlow repo (https://github.com/Jaskirat314276/AI_EMAIL_SENDER-HIREFLOW-AI-); cursor VIEW.

Contact convergence:
- On section enter: THREE faint hairlines draw in from the left edge, right edge, and bottom (600ms, 120ms stagger, expo-out), converging into the email underline as trace s7 draws it — the biggest glow on the page "sunrises" (translates up ~40px + brightens across the section's scroll range, scrubbed).
- COPY UX: clicking the email COPIES it (navigator.clipboard, execCommand fallback) — a mono "COPIED ✓" chip stamps in beside the pointer (stamp token, 1.6s life, aria-live="polite" announcement "Email copied"), and the underline flashes accentSoft once. The trailing arrow glyph remains a true mailto link (both behaviors, no modal, no form). Email stays Magnetic; hover draws its underline glow; cursor PRESS.
- Social pills dock from ALTERNATING sides (60ms stagger) — and FIX THE LINKS while touching them: GitHub → https://github.com/Jaskirat314276 · LinkedIn → https://www.linkedin.com/in/TODO-JASKIRAT (add a "// TODO: confirm LinkedIn URL" comment) · LeetCode → https://leetcode.com/Jaskirat-singh · GeeksforGeeks → https://www.geeksforgeeks.org/user/jaskiratsi2k1r · keep tel:+918340361891. All external links target=_blank rel=noreferrer.

Footer sign-off:
- Trace s8 draws down into #footer-led; on completion the LED pulses THREE times (scale 1→1.6 with a fading halo ring each pulse, 2.4s total) then rests at a faint steady glow — the board stays powered.
- LOCAL TIME CHIP: the reserved mono chip mounts client-side and reads "RANCHI, IN · 18:42 IST" (Asia/Kolkata via Intl.DateTimeFormat, updates each minute, interval cleared on document.hidden; SSR renders "RANCHI, IN" so hydration never mismatches). Small, textMuted, real.
- EASTER EGG: triple-click the LED, or type "j a s" anywhere → the LED blinks "HIRE ME" in Morse (···· ·· ·−· · / −− ·, dot 140ms / dash 420ms / gap 140ms, letter gap 420ms) then console.log("ok, you found it. now go hire jaskirat. — the trace"). Once per session (sessionStorage "js-egg"). aria-hidden decorative.

Done when: the marquee answers your scroll with speed AND lean (same breath as the cursor stretch and pulse tail — verify all three respond to one flick in unison), achievement stamps land in a satisfying cascade of halos, the envelope launches read as "shipping right now", the three contact lines converge into a glowing underline, clicking the email copies it with a stamped confirmation a screen reader also hears, every social link points at the real profile (LinkedIn clearly TODO-flagged), the footer shows real local time, and the LED ends the trace with three pulses — with the Morse egg firing exactly once per session.

Feels right when: one fast flick of the wheel makes the marquee lean, the cursor stretch, and the pulse's tail lengthen TOGETHER — the page moves like one animal.
```

---

## Prompt 12 — Performance tiering + fps watchdog + a11y + responsive audit

```
The pass that separates "animated" from "award-winning". Work through ALL of it; fix what you find. Do not commit; append findings + fixes to V3_CHANGELOG.md.

Performance:
- fps watchdog in lib/tier.js: rAF-sample fps in 2s windows; 3 consecutive <48fps → setTier(current−1) LIVE + console.info. Cascades: A→B kills the depth-field scene entirely (poster + CSS glows swap — the field is the FIRST casualty), pulse tail →4, disables tilt/velocity FX/proximity/cursor embellishments (labels off, stretch off, trail off); B→C stops Lenis, native cursor, static marquee, CSS glows only. Verify subscribers actually react live (drop the tier from the console and watch the page calmly simplify).
- ONE of each shared system: exactly one velocity-bus rAF (idle when settled), one proximity pointermove listener (absent below tier A), one Lenis instance, one WebGL context at any time (boot loader disposes fully before the depth field mounts — verify with a context count in ?debug).
- Verify EVERY loop/rAF/timeline pauses offscreen AND on document.hidden: grain flicker, THE DEPTH FIELD (render-on-demand verified — the rAF rate visibly drops to idle when scroll settles, full pause on document.hidden), rail pulse, marquee ×2, envelope launcher, LED pulse, scanline sheen, clock interval, odometer (no loops after settle), solder-trail pool.
- DPR clamp 1.5 everywhere. will-change only while animating (grep for stray permanent will-change).
- content-visibility:auto + contain-intrinsic-size on below-the-fold sections. three.js only inside lazy chunks (hero, boot) — verify with next build output; initial route JS ≤160KB gz. Tree-shake GSAP (core + ScrollTrigger + Observer only).
- Grep animated styles for width/height/top/left/margin — replace with transforms. CLS 0 (all slots were pre-reserved — verify with DevTools, including the dossier shadows, COPIED chip, HUD, and clock chip).
- INP: click a dossier, the email, J/K, and the resume dropdown under 4× CPU throttle — every interaction <200ms to first visual response (the VT morph may RUN longer; it must START fast).
- Record a full slow scroll + a fast flick in the Performance panel: no long tasks >50ms during the rail scrub; ?debug ≥55fps on 4× CPU throttle at tier B.

Reduced motion (emulate, then walk the ENTIRE page):
- No boot loader; native cursor; static grain; trace fully drawn with ALL sections pre-powered and vias lit; ix-word bloom resting on; dossiers/stamps/odometer/marquee/HUD at end states; no pulse; no proximity; route changes instant; 404 pre-broken. The page must read as a beautiful editorial site, not a disabled one.

Accessibility:
- Landmarks: header/nav/main/section/footer; exactly ONE h1 per route (hero / detail title / 404); logical h2/h3; skip-to-content link.
- Keyboard: tab through nav (incl. mobile menu), both CTAs, the resume dropdown (arrow keys + Esc), every dossier link, J/K rail walk (verify it never traps and Tab always escapes), detail-page buttons, the copy-email control (Enter copies, announcement fires), social pills, footer links, 404 back link. Focus rings visible everywhere on dark AND paper surfaces (2px accent / 2px accentDim on paper). Focus lands on the h1 after route changes, and back returns focus context sanely.
- aria-hidden on ALL decorative motion (trace, numerals, sparks, halos, pulse, HUD, marquee, grain, dust, cursor, LED, ghosts, sheen, solder trail). Meaningful images/SVGs labeled; dossier links' accessible name = project title (not "01"); the COPIED confirmation is aria-live polite and fires once per copy.
- Contrast: body text ≥4.5:1 on both surfaces; textMuted never on body-size copy; terracotta only for accents/labels ≥14px; check stamp text on paper and HUD text on dark.
- forced-colors (Windows High Contrast): trace/LED/stamps/pins get system-color fallbacks (forced-color-adjust where appropriate); the page must remain readable and navigable with all decorative color stripped.
- Touch: hit targets ≥44px (social pills, nav links, dossier tap areas); hover-only affordances (sheen, pin chase, proximity) must not gate any information.
- The custom cursor must never suppress the I-beam expectation: text remains selectable and inputs (none today) would show native cursor.

Responsive: 360 / 390 / 768 / 1024 / 1440 / 1920 — dossiers stack cleanly (all-from-right ±24px, shadows intact), rail hugs the left margin on mobile, HUD becomes the slim bottom bar, marquee ~14vw with overflow clipped, ghost numerals never overflow, hero 3D column collapses under the headline (existing breakpoints preserved), the VT morph is sane at every width, no horizontal scroll ANYWHERE (test with the lateral entrances mid-animation).

Done when: a 4×-throttled machine still scrolls smooth at its degraded tier (console shows the watchdog working and the page visibly simplifying without breaking), reduced-motion mode looks intentionally designed, a keyboard-only user can reach and operate EVERYTHING with visible focus (including walking the rail), decorative motion is invisible to screen readers, forced-colors mode survives, every breakpoint is overflow-free with CLS 0, and V3_CHANGELOG.md lists what the audit found and fixed.
```

---

## Prompt 13 — Meta + OG + favicon + chrome delights + build check → FINAL REVIEW PACKAGE (then you commit)

```
Ship-readiness and the last 2% of polish nobody else does — then prepare my review, since nothing has been committed. Do NOT run any git write command.

Meta:
- Metadata in app/layout.js: title "Jaskirat Singh — Engineer at the intersection of code & hardware." · description "Final-year EEE @ BIT Mesra. Full-stack web, GenAI, data, and power electronics — 6 shipped projects, 300+ LeetCode, 3 role-targeted resumes." Per-project metadata on detail pages stays.
- OG image 1200×630 as a static asset: espresso #1a1815 bg, Instrument Serif "Hi, I'm Jaskirat Singh — I build things." with the name in italic terracotta, a small terracotta LED dot, mono plate JASKIRAT.DEV-style label, film grain. Wire og:/twitter: meta.
- JSON-LD Person schema in layout: real data ONLY — name, alumniOf (BIT Mesra), email, telephone, sameAs [GitHub, LeetCode, GeeksforGeeks profile URLs]; OMIT LinkedIn until the URL is confirmed (mirror the code TODO).
- Per-route theme-color: espresso #1a1815 on dark routes, paper #faf9f5 on /projects/[slug] — mobile browser chrome follows the paper flip.
- robots + canonical; verify next/font display swap (no FOUT) and preconnects.

Chrome delights (small, real, memorable):
- Favicon: terracotta dot on #1a1815 (SVG + PNG fallbacks, replace app/favicon.ico usage). On visibilitychange hidden: swap to a dimmed-dot SVG frame AND document.title → "⏻ jaskirat singh"; restore both on return. The board dims when you leave the room.
- Console sign-off (once per session, alongside the egg's log): a single styled console.log — terracotta "THE TRACE" label + "signal acquired — you read consoles. so does jaskirat: jaskiratsingh314276@gmail.com". One line, no ASCII wall.
- @media print stylesheet — "the case file prints": hide nav/cursor/HUD/marquee/grain/3D/glows/eggs; paper bg + paperInk text throughout; the trace collapses to a 0.5pt rule down the left margin; dossiers print as a clean list with visible URLs (a[href]::after content in the projects + contact sections); sensible page-break rules per section. A recruiter who hits Ctrl+P gets a beautiful paper dossier — the metaphor completes itself.

Build:
- npm run lint → clean. npm run build → clean, verify the netlify.toml build still applies (Node 20). Check route sizes in the build output against the ≤160KB gz initial budget. Run Lighthouse on next start: Performance ≥90 mobile, A11y ≥95, Best Practices ≥95 — fix regressions.

FINAL REVIEW PACKAGE: finish V3_CHANGELOG.md with (a) a complete list of changed/added/deleted files grouped by prompt, (b) anything intentionally left TODO (the LinkedIn URL, and which View Transition mechanism shipped), (c) a manual QA checklist for me (boot, depth-field fly-through + velocity streaks + text legibility over the field, cursor labels + stretch + trail, name wave, rail dock physicality, rail scrub + scroll-back, J/K walk, OPEN-FILE morph both directions, copy-email, education grade flips, 404, Morse egg, reduced motion, forced-colors, print preview, 360px pass), and (d) a suggested single commit message like: "v3: THE TRACE, FULL POWER — depth-field fly-through, physicality, power-on lighting, open-file morph, keyboard grammar, a11y/perf tiers". Print the package summary to the console at the end. Leave the working tree uncommitted for my review.

Done when: build and Lighthouse are clean, meta/OG/favicon/JSON-LD/theme-color are in place, leaving the tab dims the board and print preview outputs a credible paper case file, V3_CHANGELOG.md is a complete reviewable record, and the ONLY thing left for a human is: read, click around, and make the one commit.
```

---

## Motion inventory (review checklist)

Every animation, where it lives, and its reduced-motion twin. **NEW** marks v3 additions over THE TRACE EDITION. Use as the final QA sweep.

| # | Beat | Where | Trigger | Reduced-motion fallback | Prompt |
|---|---|---|---|---|---|
| 1 | Grain flicker (10fps steps) | Site-wide | Always (paused offscreen/hidden) | Static grain | 1 |
| 2 | Boot: voxel JS + POST log + 000→100 → nav-LED handoff | Entry | Once per session, ≤2.4s, skippable | Skipped, LED lit | 5 |
| 3 | Cursor labels VIEW/OPEN/DRAG/PRESS + ring states | Site-wide, tier A | Pointer | Native cursor | 5 |
| 4 | **NEW** Cursor velocity stretch + solder trail + paper difference-blend + magnetic bias | Site-wide, tier A | Pointer speed / proximity | Native cursor | 5 |
| 5 | Nav hide/spring + scrollspy sliding dot + blur state + **NEW** magnetic links + LED proximity | Nav | Scroll / pointer | Static states | 5 |
| 6 | Mobile menu serif mask-rise | Nav | Menu open | Plain fade | 5 |
| 7 | Scroll progress hairline + **NEW** head-dot | Top edge | Scroll | Hidden | 3 |
| 8 | THE TRACE s1–s8 draws page-long, 45° bends | All sections | Scroll-scrubbed | Fully drawn | 4, 8 |
| 9 | CODE × HARDWARE crossing + **NEW** "intersection" bloom at the crossing frame | About | Scroll-scrubbed | Drawn, bloom resting on | 4 |
| 10 | **NEW** POWER-ON LIGHTING (sections energize as the trace arrives) + ghost-numeral parallax | All sections | Segment completion / scrub | All pre-powered, static numerals | 4 |
| 11 | MaskLines headline rises | Every section | whileInView once | Plain fade | 3 |
| 12 | Reveal fade+rise 70ms stagger | Every section | whileInView once | Plain fade | 3 |
| 13 | **NEW** THE DEPTH FIELD — camera flies through the recycling polyhedra field with scroll, solder-dust streaks with velocity; the hero ico is its flagship node (vertex wobble + camera departure) — one unified WebGL scene | Page-wide, tier A | Scroll-tied + velocity bus | Static frame/poster + glows, no travel | 6 |
| 14 | Eyebrow scramble + name per-char + trace underline + **NEW** hover wave ripple + proximity lean | Hero | After boot handoff / pointer | Plain text, static underline, inert name | 6 |
| 15 | Magnetic CTAs + resume dropdown spring/stagger | Hero | Hover/open | Plain hover, instant menu | 6 |
| 16 | **Dossiers deal in from alternating sides** + stub→via→spark→stamp + **NEW** lagging desk shadow, counter-flex settle, ink halo, hover sheen | Project Rail | whileInView once | In place, resting shadows, static stamps | 7 |
| 17 | Signal pulse + particle tail (**NEW** fed by the velocity bus) + traveling light + file lighting | Project Rail | Scroll-scrubbed | No pulse, all lit | 8 |
| 18 | Rail HUD "FILE 03/06 · 048%" + **NEW** J/K keyboard rail walk | Project Rail | Scroll-scrubbed / keys | Hidden; J/K = instant jumps | 8 |
| 19 | **NEW** OPEN-FILE morph (file number + title + stamp fly dossier→page, reverse on back) | Route change | Dossier click | 280ms crossfade | 9 |
| 20 | Paper detail page (mask-rise + ticks draw) + scroll/focus restoration | /projects/[slug] | Route entry | Instant | 9 |
| 21 | **NEW** 404 broken circuit (trace snaps, debris, "OPEN CIRCUIT" types on) | not-found | Mount | Pre-broken, static | 9 |
| 22 | Stats odometer + **NEW** ghost-blur frames + 300→301 gag | About | whileInView once | Final numbers | 10 |
| 23 | IC cards: pins draw, REF types, chips cascade + **NEW** hover pin-chase | Skills | whileInView / hover | Static cards | 10 |
| 24 | Experience cards SlideDock from right (+physicality) + via sparks + date stamps | Experience | whileInView + trace sync | In place, vias lit | 10 |
| 25 | Outlined-serif marquee, velocity ±3× + **NEW** velocity skew ≤4° + counter-row | Marquee band | Velocity bus (paused offscreen) | Static rows | 11 |
| 26 | Achievement cards from alternating sides + icon stamps (+halos) | Achievements | whileInView once | Static grid | 11 |
| 27 | Education rows calm fade (rest beat) + **NEW** serif grade flips in last (stamp token, one seal per row) | Education | whileInView once | Plain fade, static grades | 3, 10 |
| 28 | HireFlow strip: scanline chip + envelope bezier launches | Now Building | In-view loop ~6s | Static card | 11 |
| 29 | Contact 3-line convergence + sunrise glow + magnetic email + **NEW** copy-email stamped "COPIED ✓" (aria-live) | Contact | Enter/scrub/hover/click | Pre-drawn, static glow; copy still works | 11 |
| 30 | Footer LED triple pulse + **NEW** live local-time chip | Footer | Trace completion / clock | Static glowing LED, static chip | 11 |
| 31 | Morse "HIRE ME" easter egg (triple-click / "jas") | Footer | User secret | Disabled | 11 |
| 32 | **NEW** Chrome: tab-title + favicon dim on leave, console sign-off, print-as-case-file | Browser chrome | visibilitychange / print | n/a (no motion) | 13 |

---

## Coverage map (spec → prompt)

| Source | Prompt |
|---|---|
| PORTFOLIO_PAGE.md §2 visual system + §8 stack (tokens, fonts, tiers, debug HUD) | 0, 1 |
| §4 all sections static + PCB/paper dressing + slots (+ v3 paper craft, 404 static) | 2 |
| §3 motion primitives (Reveal v2, MaskLines, **SlideDock**) + v3 shared signals (velocity bus, proximity, Lenis) | 3 |
| THE TRACE (§2/§3 signature + §4.3 intersection beat) + v3 POWER-ON LIGHTING + bloom | 4 |
| Boot preloader + cursor (§4.1) + v3 cursor physics + nav choreography | 5 |
| §4.2 hero + §6 hero animation + v3 THE DEPTH FIELD one-scene fly-through (one-WebGL rule preserved) + the living name (wave + lean) | 6 |
| §5 Project Rail — lateral docking + v3 PHYSICALITY | 7 |
| §5 Project Rail — scrubbed pulse + HUD + v3 KEYBOARD GRAMMAR | 8 |
| §8 detail pages + v3 OPEN-FILE morph + crafted 404 | 9 |
| §4.3 stats · §4.4 skills · §4.5 experience motion · §4.9 education grade flip (+ v3 ghost-blur, pin-chase) | 10 |
| §4.7–§4.12 marquee/achievements/now-building/contact/footer + egg (+ v3 skew, copy UX, clock) | 11 |
| §10 a11y + perf + responsive (+ v3 forced-colors, INP, shared-system audit) | 12 |
| §9 step 10 meta + build + v3 chrome delights + **final review package** | 13 |

Build order still follows the law: re-skin → **static everything** → systems (reveal + slide-dock + shared signals) → trace + power-on → entry (boot/cursor/nav) → hero → rail (dock, then scrub, then open-file) → instrumentation → back-half beats → hard polish → ship-readiness → **your one commit**.

---

*Compatibility note: `app/projects/data.js` and all `/projects/[slug]` routes need no edits — every project, stat, date, and link on the page is used verbatim. The three resume PDFs in `/public` are kept. Known fixes baked into the prompts: placeholder GitHub/LinkedIn hrefs in the contact section (Prompt 11), the render-blocking font `@import` (Prompt 1), and the doubled always-on WebGL contexts (Prompt 6 — hero + background now unify into ONE depth-field scene instead of two contexts). Every v3 addition degrades by design: below tier A the proximity/cursor/wobble systems simply never load, the OPEN-FILE morph feature-detects down to a clean fade, and under reduced motion the whole site renders as the pre-powered, pre-drawn editorial page. The only invented artifacts are labels on real things — stamps, REF designators, the HUD, chrome text — and the `IN DEVELOPMENT` HireFlow teaser, which links to the real repo and stays clearly marked as in progress.*



