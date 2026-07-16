# Jaskirat Singh — Portfolio v2 Build Spec · **THE TRACE**

> A build brief for an **award-winning, motion-rich** personal portfolio for Jaskirat Singh.
> You'll build this in Claude Code on top of the **existing repo** (https://github.com/Jaskirat314276/PORTFOLIO)
> — this doc is the blueprint: positioning, visual system, section-by-section copy, the centerpiece
> **Project Rail** (case-file dossiers that **slide in from the sides**), the motion system, and a build plan.
> **The site already exists and is live** — v2 is an in-place upgrade, not a rewrite. All content in
> `app/projects/data.js` and `app/page.jsx` stays the source of truth.

---

## 0. TL;DR — what you're building

A one-page portfolio that makes a recruiter feel: *"this person ships — and has taste."* One warm-dark canvas in the **Claude design language** (warm espresso black, ivory text, a single terracotta accent, editorial serif), with **paper-cream project dossiers** that slide in laterally like case files dealt onto a desk. The connective idea: **THE TRACE** — a terracotta PCB-style signal line that is born in a power-on preloader, runs the entire page with 45° circuit bends, docks every project into itself, and terminates as a blinking LED in the footer. Code *and* hardware — because that's literally who Jaskirat is.

**Positioning line:** *Engineer at the intersection of code & hardware — full-stack web, GenAI, data, and power electronics, with shipped proof in every column.*

---

## 1. Positioning & narrative

| | |
|---|---|
| **Person** | Jaskirat Singh — final-year B.Tech (EEE), BIT Mesra, class of 2026 |
| **Category** | Engineering portfolio (SDE + Data + GenAI + Core Electrical) |
| **One-liner** | Hi, I'm Jaskirat Singh — I build things. |
| **Who it's for** | Recruiters & hiring managers skimming in 60–90 seconds; peers who scroll deeper |
| **Core promise** | Every claim maps to a shipped artifact: a repo, a live demo, a tested board, or a resume they can download in one click. |
| **Tone** | Confident, calm, a little editorial. **Not** loud. "Quiet luxury" for an engineer's case file. |

**Four pillars (the spine of the whole page):**
1. **Full-stack** — React/Next.js apps, REST APIs, real internship shipping (Productimate AI Solutions).
2. **GenAI & Data** — LangChain/RAG, LLaMA 3.2, SARIMA forecasting, Power BI; live Streamlit demos.
3. **Hardware** — EV charger PCB tested to 300V, PFC simulation, EBAJA SAEINDIA powertrain lead.
4. **Proof** — 6 documented projects, 300+ LeetCode, 200+ students mentored, 3 role-targeted resumes.

**The metaphor (execute relentlessly):** the page is a **circuit-board case file**. Sections are modules, projects are paper dossiers that dock onto a central trace, the scroll is the signal, and the footer LED is the power indicator that never turns off.

---

## 2. Visual system (Claude design language, warm-dark)

Borrowed from Claude's brand feel — warm neutrals, ivory, one terracotta accent, serif display — tuned dark so the existing site's identity survives the re-skin.

**Palette (warm-dark + terracotta + paper):**
```
bg          #1a1815   (warm espresso near-black)
surface     #23211d
surfaceHi   #2c2925
border      #38342d
borderHi    #4a443a
text        #f0eee5   (Claude ivory)
textDim     #b0aa9c
textMuted   #7a7466
accent      #d97757   (Claude terracotta — the one hero color)
accentDim   #a8593c
accentSoft  rgba(217,119,87,0.13)
paper       #faf9f5   (paper-cream — project dossiers & detail pages)
paperInk    #1f1e1d   (ink on paper)
paperLine   #e8e5db   (hairlines on paper)
success     #7d9b76   (muted sage)
danger      #c45a4a   (muted red)
info        #6a8fae   (muted blue)
```

**Type:**
```
Display  'Instrument Serif'      — big editorial headlines + italic accent words (already in the repo — keep)
Body     'Bricolage Grotesque'   — 300–700 (already in the repo — keep)
Mono     'JetBrains Mono'        — eyebrows, labels, REF designators, stats, HUD (UPPERCASE, 0.14em tracking) — ADD
```
Load all three via **`next/font/google`** in `app/layout.js` (kill the `@import url(...)` inside `<style>` tags — it blocks render).

**Texture & depth:**
- Film grain overlay 3–5% (exists — keep, add a ~10fps stepped flicker).
- Soft terracotta radial glows (8–12%) behind hero, the Project Rail, and contact.
- **PCB dressing:** hairline traces with 45° bends, via dots (small rings) at section junctions, mono REF designators (`U1`…`U8` on skill cards, `FIG. 01 — THE RAIL` plates), corner ticks on cards.
- **Paper dossiers:** `paper` background, `paperInk` text, 1px `paperLine` rules, a slight lift shadow, terracotta rubber stamps rotated −8°. On the dark canvas they read as physical documents.
- Ghost section numerals `01–08` (Instrument Serif, 12–16vw, transparent fill, 1px `borderHi` text-stroke, absolute behind section headings, aria-hidden).
- Cards on `surface`/`surfaceHi`, 1px `border`, 16–20px radius. Generous whitespace; let the serif breathe.

---

## 3. Motion system

**Principles**
- Motion *explains and rewards*, never decorates for its own sake. Transform + opacity only (exceptions: SVG `pathLength`/`stroke-dashoffset`, short one-shot clip-paths). 60fps or it doesn't ship.
- **THE LATERAL DOCTRINE (owner's request — make it the signature):** meaningful objects **enter from the sides**, not from below. Project dossiers slide in from alternating left/right and *dock onto the trace*; experience cards slide from the right along the timeline spine; contact socials dock from alternating sides. Vertical fade-rise is reserved for text; **objects travel laterally**. Entrances: x ±72–96px desktop (±24px mobile), 1.5° settle rotation, expo-out.
- One signature move repeated: **the trace** — a terracotta line that draws with scroll, with a signal pulse riding it.
- Respect `prefers-reduced-motion` everywhere: fades only, trace pre-drawn, no preloader, native cursor.

**Techniques (pick per section, don't stack)**
- **Slide-dock** (the lateral entrance + a connection spark when the object's edge meets the trace).
- **Scroll-scrubbed trace draw** (`pathLength` mapped to scroll) + a **signal pulse** whose position = scroll progress.
- **Mask-line reveals** for serif headlines (each line rises from an `overflow:hidden` mask).
- **Mono scramble-decrypt** for eyebrows (900ms, glyph soup ▓▒░#$%).
- **Odometer count-ups** for stats (slot-machine digit columns).
- **Rubber stamps** (scale 1.4→1, rotate −8°, back-out) for project status + achievement icons.
- **Magnetic CTAs** (exists — keep) + custom cursor states (VIEW / OPEN / DRAG / PRESS).
- **Velocity-reactive marquee** in giant outlined serif.

**Timing & easing (tokens — single source in `app/lib/motion.js`)**
```
reveal      450–650ms · expo-out [0.16, 1, 0.3, 1]
slideDock   650ms · expo-out, x ±72–96px + rotate 1.5°→0 (mobile ±24px)
maskLine    700ms · [0.65, 0, 0.35, 1], 90ms line stagger
scramble    900ms (mono eyebrows only)
stamp/flip  500ms · back-out [0.34, 1.56, 0.64, 1]
spring      { stiffness: 500, damping: 30 } (toasts, magnetic return, nav)
hover       180ms ease-out
scrub       scroll-tied (no fixed duration)
loop        6–10s ease-in-out infinite (ambient only; LED pulse 2.4s)
stagger     70ms siblings · 90ms headline lines
```

**Libraries:** Framer Motion (`motion` for React 19) for reveals/springs/layout + GSAP ScrollTrigger for the scrubbed Rail + Lenis (optional) for smooth scroll. **three.js already in the repo** — keep it for the hero and preloader only (lazy-loaded); replace the always-on `BackgroundScene` WebGL context with cheap CSS glows (one WebGL context max).

---

## 4. Page structure — sections, copy, motion

Order top → bottom. Copy is **verbatim from the live site** unless marked NEW — do not rewrite Jaskirat's voice.

### 4.1 Nav (sticky, minimal — exists, re-skin + choreograph)
- Left: wordmark **JS** / "Jaskirat Singh" + a small **terracotta LED dot** (`id="nav-led"` — a character in the story: the preloader powers it on).
- Right (mono, uppercase): `ABOUT · SKILLS · EXPERIENCE · PROJECTS · CONTACT` + **Resume** accent button.
- Behavior: transparent at top; scrolled = `surface/85` + blur + hairline. Hide on fast scroll-down, spring back on scroll-up. Active-section indicator: a small terracotta dot that *slides* between links (layoutId scrollspy).

### 4.2 Hero (exists — elevate)
- **Eyebrow (mono):** `AVAILABLE FOR OPPORTUNITIES · 2026` (decrypts on load).
- **Headline (serif+grotesque mix, huge — verbatim):**
  > Hi, I'm **Jaskirat Singh** — I build things.
  ("Jaskirat Singh" in Instrument Serif italic, terracotta, per-char rotate-in + a trace underline that draws 800ms later.)
- **Subhead (verbatim):** Final-year B.Tech student in Electrical & Electronics Engineering at BIT Mesra, with hands-on experience as a Software Developer Intern. I work across full-stack web, AI/ML, and power electronics.
- **CTAs:** primary **See my work** (magnetic, scrolls to #projects) · **Download Resume** dropdown (3 real PDFs: Software Development / Data Analyst / Core Electrical — keep, add spring + 60ms item stagger).
- **Right column:** the 3D scene (see §6). **Motion:** headline mask-rise; scroll cue at bottom = a hairline + terracotta dot — **the trace's origin** (s1).

### 4.3 About + Stats (exists — elevate; ghost numeral 01)
- **Serif line (verbatim):** *Engineer at the **intersection** of code & hardware.*
- Two-column: paragraphs (verbatim from the site) + chips `Ranchi, India · BIT Mesra · 2026 · Open to work`.
- **The intersection beat:** behind the headline, two faint hairlines — one labeled `CODE`, one labeled `HARDWARE` (mono, tiny) — draw in from opposite sides, **cross exactly under the italic word "intersection"**, and merge into the single trace that continues down the page. This is the thesis of the whole portfolio, told in one line of motion.
- **Stats (odometer digits, real numbers):** `6+ PROJECTS BUILT · 300+ LEETCODE PROBLEMS · 2+ YEARS CODING · 200+ STUDENTS MENTORED`. Punchline: after `300+` settles, it ticks to `301` with a tiny terracotta flash — *the counter is still running*.

### 4.4 Skills — "module library" (exists — re-dress; ghost numeral 02)
- **Serif (verbatim):** *The **toolkit** I work with.*
- 8 category cards restyled as **IC packages**: tiny hairline pin stubs on left/right edges, a mono REF designator top-right (`U1`–`U8`), serif category name, skill chips inside. Keep all 8 real categories & items (Frontend / Backend / Data & ML / GenAI & LLM / Databases / Cloud & DevOps / CS Fundamentals / Core Electrical).
- **Motion:** cards rise with 70ms stagger; on hover the pins glow terracotta and the chip "seats" (1px settle). Chips cascade in 30ms apart. Category color accents from the existing per-category colors are dropped — **one accent only** (terracotta); differentiate with icons.

### 4.5 Experience — the timeline spine (exists — re-choreograph; ghost numeral 03)
- **Serif (verbatim):** *Where I've **worked** & led.*
- The trace runs **vertically down the left margin** with a **via ring** per role. Three real entries (Productimate AI Solutions · EEESOC BIT Mesra · Team Aveon Racing), copy verbatim.
- **Motion (lateral doctrine):** each card **slides in from the right** and docks onto its via — the via lights terracotta with a 6-particle spark on contact; date chip stamps on; bullet points cascade 60ms apart.

### 4.6 THE PROJECT RAIL — centerpiece (ghost numeral 04, id="projects")
**This is the section that wins the award — full spec in §5.**
- **Eyebrow:** `SELECTED WORK — 6 FILES` · **Serif (verbatim):** *Things I've **built**.*
- Six paper dossiers dock in from alternating sides onto a central trace; a signal pulse rides the rail as you scroll; each dossier links to its existing detail route (`/projects/[slug]` — keep the routes).

### 4.7 Marquee (NEW — between projects and achievements)
- Giant outlined Instrument Serif: `CODE · CIRCUITS · DATA · GENAI · ` (transparent fill, 1px borderHi stroke, ~10vw, one word solid terracotta per cycle), 40s loop, scroll-velocity reactive (timeScale clamp [−3,3]).
- Beneath: a thin mono counter-marquee of real stack words at 0.35 opacity: `FASTAPI · YOLOV8 · SARIMA · LANGCHAIN · REACT · DOCKER · MATLAB · POWER BI · …`

### 4.8 Achievements (exists — re-dress; ghost numeral 05)
- **Serif (verbatim):** *Wins & **recognition**.* Six real cards (Rank 1 Summer Mentorship · CodeZilla 3rd/30+ teams · Bitotsav core team · Induction Project co-lead · 300+ LeetCode · EBAJA SAEINDIA 2025).
- **Motion:** cards enter from **alternating sides** in a 2-column masonry; each icon **stamps in** (back-out, −6°) as its card lands. Hover: the stamp jiggles 1°.

### 4.9 Education (exists — keep light; ghost numeral 06)
- **Serif (verbatim):** *My **academic** journey.* Three real rows (BIT Mesra CGPA 7.15 · Class XII 95% · Class X 91%). Rows fade+rise; the grade (serif) flips in last. Don't over-animate — this section is a rest beat.

### 4.10 Currently building (NEW — small strip; ghost numeral 07)
- **Eyebrow:** `CURRENTLY SHIPPING` + mono tag `IN DEVELOPMENT` (scanline sheen).
- **Serif:** *Now building: **HireFlow AI** — a job-outreach copilot.*
- One-liner: *Turns a spreadsheet of recruiters into personalized, paced, tracked cold email — extraction to inbox to interview.* Link → https://github.com/Jaskirat314276/AI_EMAIL_SENDER-HIREFLOW-AI-
- **Motion:** the card slides in from the left, an envelope-dot launches off it along a small bezier every ~6s. Shows momentum: *he's shipping right now.*

### 4.11 Contact (exists — elevate; ghost numeral 08)
- **Serif (verbatim, huge):** *Let's build something **together**.*
- Magnetic email: `jaskiratsingh314276@gmail.com →` (Instrument Serif, underline draws on hover).
- Social pills **dock from alternating sides** (final echo of the lateral motif): GitHub → `https://github.com/Jaskirat314276` · LinkedIn → **TODO: real URL** · LeetCode `Jaskirat-singh` · GeeksforGeeks `jaskiratsi2k1r` · Phone `+91 8340361891`. **(The live site has placeholder github.com/linkedin.com hrefs — v2 must fix them.)**
- **Motion:** three faint trace lines converge from the edges into the email underline; biggest glow on the page, "sunrise" as the section enters.

### 4.12 Footer (exists — give it the sign-off)
- Hairline top border; `© 2026 Jaskirat Singh` · `Crafted with passion · Ranchi, India` (verbatim).
- Dead-center: the trace's final segment drops into an **8px terracotta LED** (`id="footer-led"`) that pulses three times, then rests at a faint steady glow — *the board stays powered*.
- **EASTER EGG:** triple-click the LED (or type `j a s`) → it blinks **"HIRE ME" in Morse code** (···· ·· ·−· · / −− ·), then `console.log("ok, you found it. now go hire jaskirat. — the trace")`. Once per session.

---

## 5. Centerpiece spec — THE PROJECT RAIL

The single most important section. Goal: as the visitor scrolls, **six paper case files slide in from alternating sides and dock onto a central terracotta trace**, a signal pulse lighting each one as it connects — the visitor flips through Jaskirat's entire body of work in ~8 seconds of scrolling, and *the lateral entrances are the star* (owner's explicit request).

**Layout**
- Desktop: a central vertical trace (the rail) down the section's spine, with 45° PCB bends between files. Dossiers alternate left/right of the rail (odd files from the LEFT, even from the RIGHT), each connected by a short horizontal stub trace + via.
- Mobile: rail moves to the left margin; ALL dossiers dock from the right with reduced travel (±24px).

**The dossier (one per project — data verbatim from `app/projects/data.js`):**
- `paper` card, `paperInk` text: giant serif file number (`01`–`06`), title, date, one-line desc (truncate the long Warehouse desc to its first sentence on the card — full text lives on the detail page), tag chips (mono, ink on `paperLine`), arrow.
- A terracotta **rubber stamp** per file, landing 200ms after dock (back-out, −8°):
  `01 WAREHOUSE OPTIMIZER → "FLAGSHIP · 2026"` · `02 SMART SCHOOL ERP → "SHIPPED"` · `03 AI LINKEDIN POST GENERATOR → "LIVE DEMO"` · `04 FUTUREFLOW → "LIVE DEMO"` · `05 EV BATTERY CHARGER → "HARDWARE · 300V TESTED"` · `06 POWER FACTOR CORRECTION → "SIMULATION"`
- Whole card is a link to the existing `/projects/[slug]` route. Hover: card lifts 4px + 1° tilt toward cursor; cursor label **OPEN**; the connecting stub brightens.

**The docking motion (the signature move):**
1. As a dossier's slot enters the viewport, the card **slides in from its side** (x ±96px → 0, rotate 1.5° → 0, 650ms expo-out) — like a file dealt onto a desk.
2. On arrival, its **stub trace draws** from the rail to the card edge (120ms), the **via lights** terracotta, and a **6-particle spark** fires at the junction.
3. The **signal pulse** (a glowing 6px dot with a 6–10 particle tail) rides the rail, position mapped to scroll progress; docked files stay lit (full opacity), undocked sit at 0.55 opacity + slight desaturation.
4. A mono **HUD** (sticky top-right of the section): `FILE 03/06 — AI LINKEDIN POST GENERATOR · 048%`, flipping at each dock.

**Implementation notes**
- The rail is one SVG path (single artboard for the section, `vector-effect="non-scaling-stroke"`); `pathLength` scrubbed via GSAP ScrollTrigger (`scrub: 1`) or Framer `useScroll` — pick ONE engine here. Dock thresholds at progress ≈ 0.08 / 0.24 / 0.40 / 0.56 / 0.72 / 0.88.
- Cards animate with `whileInView` slide-dock; the *scrub* only drives the rail draw, pulse, vias, and HUD — so scrolling back dims files but never un-deals the cards (re-triggering full slides on reverse feels glitchy).
- Scrolling back: pulse and lighting reverse cleanly; stamps stay.
- **Reduced motion:** rail fully drawn, all files lit and in place, stamps static, no pulse, no HUD.

**Fallback if simpler first:** ship the slide-dock cards + static lit rail (no scrub), then upgrade to the scrubbed pulse. The lateral entrances are the non-negotiable part.

---

## 6. Hero animation — pick one

1. **Re-themed icosahedron (recommended — it exists):** keep the current three.js icosahedron + wireframe + particle field, re-colored — mesh `accent` terracotta, inner wireframe `text` ivory, outer wireframe `borderHi`, particles a terracotta↔ivory ramp (kill the blue). DPR clamp 1.5, pause offscreen/hidden, lazy `dynamic(import, { ssr:false })`. Cheapest path to premium.
2. **Circuit constellation:** a sparse canvas of via-dots and 45° trace segments self-routing toward the About section — ties the hero to the trace. More work, very on-metaphor.
3. **Static glow + type only:** kill the 3D column, go full editorial (fastest, safest, most "Claude").

Start with **#1**; keep #3 as tier-C fallback.

---

## 7. Copy bank (verbatim from the site — swap only if better)

**Headlines:** *Hi, I'm Jaskirat Singh — I build things.* / *Engineer at the intersection of code & hardware.* / *The toolkit I work with.* / *Where I've worked & led.* / *Things I've built.* / *Wins & recognition.* / *My academic journey.* / *Let's build something together.*

**Stats (odometer):** `6+` projects built · `300+` LeetCode problems (→ ticks to 301) · `2+` years coding · `200+` students mentored. Bonus mono factoids for dossiers: `<30s` image-to-inventory · `25+` REST endpoints · `300V` high-voltage tested · `30+` teams beaten (CodeZilla, 3rd).

**CTA microcopy:** `See my work` · `Download Resume` (dropdown: Software Development / Data Analyst / Core (Electrical)) · mono reassurance under contact: `EMAIL · LINKEDIN · GITHUB · LEETCODE — PICK A WIRE.`

**Marquee:** `CODE · CIRCUITS · DATA · GENAI ·` — counter-row: real stack keywords.

---

## 8. Tech stack & repo reality (upgrade in place — do NOT re-scaffold)

**Existing (keep):** Next.js 16 (App Router) · React 19 · Tailwind v4 (via PostCSS) · three.js · lucide-react · Netlify (`netlify.toml`, Node 20). Pages: `app/page.jsx` (all sections, inline styles) + `app/projects/[slug]/page.jsx` (static params) + `app/projects/data.js` (source of truth). Components: `Nav, LoadingGate (voxel-JS 3D loader), BackgroundScene, Reveal, TiltCard, Magnetic, CustomCursor`.

**Add:** `motion` (Framer Motion for React 19) · `gsap` (ScrollTrigger) · `lenis` (optional). **Remove/replace:** `BackgroundScene`'s always-on WebGL (→ CSS glows + optional canvas dust) so the page never runs 2+ WebGL contexts.

```
app/
  layout.js            # next/font (Bricolage + Instrument Serif + JetBrains Mono), metadata v2
  page.jsx             # thins out to section composition
  theme.js             # §2 palette as tokens + CSS vars
  globals.css          # keep responsive overrides; add vars, selection, scrollbar, focus rings
  lib/ motion.js  tier.js  useReducedMotion.js
  sections/ Hero  About  Skills  Experience  ProjectRail  Marquee
            Achievements  Education  NowBuilding  Contact  Footer
  components/ Nav  BootLoader (reworked LoadingGate)  Cursor  Trace
              Reveal (v2)  SlideDock  MaskLines  Magnetic  TiltCard
              Odometer  Stamp  GrainOverlay  Glow  HeroScene
  projects/ data.js  [slug]/page.jsx   # detail pages go PAPER mode (§ note below)
```

**Detail pages — "opening the file":** clicking a dossier routes to `/projects/[slug]`, which flips to **full paper mode** (paper bg, ink text, terracotta accents) — you literally opened the document. Same nav, back-link `← Back to the rail`.

---

## 9. Build plan (do it in this order in Claude Code)

1. **Theme swap** — tokens, next/font, palette re-skin of every existing component (site must look re-branded with zero motion changes).
2. **Static v2 pass** — extract sections, ghost numerals, PCB dressing, IC skill cards, paper dossiers, all trace/LED slots reserved (zero CLS later). *This static pass is where the award is won.*
3. **Motion systems** — Reveal v2 + MaskLines + **SlideDock** + scroll progress hairline.
4. **THE TRACE** — segment registry, scroll-scrubbed draw, the intersection beat, TRACE% in debug HUD.
5. **Entry & pointer** — boot preloader (rework LoadingGate), cursor v2 states, nav choreography.
6. **Hero scene** — re-themed ico (tiered), kinetic type, magnetic CTAs, resume dropdown polish.
7. **THE PROJECT RAIL** — slide-dock first, then the scrubbed pulse + HUD. Spend the most time here.
8. **Supporting cast** — odometer stats, experience spine, achievements stamps, marquee, now-building, contact convergence, footer LED + Morse egg. Paper detail pages.
9. **Hard polish** — perf tiers + fps watchdog, reduced-motion audit, a11y, responsive, fix placeholder social links.
10. **Meta** — title/description/OG/favicon (terracotta LED on espresso), Lighthouse, Netlify build check.

---

## 10. Accessibility & performance (non-negotiables)

- Honor `prefers-reduced-motion` everywhere (static fallbacks defined per section above).
- Semantic HTML (`header/nav/main/section/footer`, exactly one `h1`), skip link, real focus rings (2px accent, 2px offset — especially since the custom cursor hides the pointer), alt/aria on meaningful SVGs, `aria-hidden` on all decorative motion (trace, numerals, particles, grain, HUD, marquee).
- Animate only transform/opacity; one WebGL context max, lazy-loaded; every loop pauses offscreen + on `document.hidden`; DPR clamp 1.5; CLS 0 (slots pre-reserved); initial route JS ≤ 160KB gz with three.js as a lazy chunk.
- Contrast: `text` on `bg` and `paperInk` on `paper` pass easily; never `textMuted` on body copy; terracotta only for accents/labels ≥14px.
- **Lateral entrances must never cause horizontal scroll** — clip via `overflow-x: clip` on sections; travel ±24px on mobile.

---

## 11. The "award-winning" bar (what good looks like)

Restraint + one confident idea, executed relentlessly: **warm Claude neutrals, one terracotta accent, editorial serif, paper dossiers on a dark desk, and a single circuit trace that carries the visitor from power-on to the footer LED.** If a recruiter scrolls once and comes away with *"full-stack + GenAI + hardware, and everything is proven,"* it's working. If a flourish fights the trace, cut the flourish.

---

## 12. Out of scope (for now)

- No blog, no CMS, no contact form (mailto only), no analytics beyond what exists.
- No light/dark toggle — the only "light mode" is the paper detail pages (deliberate).
- The HireFlow teaser links out; it is **not** embedded. Clearly marked `IN DEVELOPMENT`.
- Sound layer — skip entirely (the Morse LED is the only easter egg).
