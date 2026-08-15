# Portfolio inspiration & implementation backlog

Reference sites (study, don’t copy):

- [Akshay Ram Chavan](https://akshay-chavan-portfolio.vercel.app/) — system map, capability layers, project filters, lifecycle diagram, case studies
- [Krishna H](https://krishnahonnikhere.vercel.app/) — hero proof, project metrics, GitHub activity, certifications, research row
- [mayank (moonbucks.me)](https://moonbucks.me/) — numbered sections, boot loader, horizontal project rail, marquee titles, minimal menu

---

## What you already have

| Feature | Status |
|--------|--------|
| Terminal + ⌘K | ✅ |
| Live GitHub Pulse + contribution graph | ✅ |
| Project spotlights + iframe/screenshot previews | ✅ |
| Paper spotlight (COLM) | ✅ |
| Recruiter packet + `/hire` + `/compare` | ✅ |
| Campaign `?ref=` + analytics `/views` | ✅ |
| Paper mode (session-only, dark default) | ✅ |
| Interactive architecture (TatvaOps, SuperAGI) | ✅ |
| Sound + Konami + speed run | ✅ |
| Ask Tejas chat | 🔶 built locally, not deployed |

Your edge vs those sites: **recruiter tooling**, **live GitHub data**, **terminal**, **research spotlight**. Gaps are mostly **structure + polish**, not missing core features.

---

## Tier 1 — High impact (do these first)

### 1. Numbered section labels — Moonbucks-inspired

**What:** `(01) About`, `(02) Experience`, … on section eyebrows and optionally mobile nav.

**Why:** Editorial rhythm; makes long page scannable for recruiters.

**How:**
- Extend `SectionHeading` in `src/App.jsx` with optional `index` prop
- Map `sectionIds` to indices 01–07
- Keep existing mint line + typography

**Effort:** 1–2 hours  
**Files:** `src/App.jsx`, maybe `src/index.css`

---

### 2. Hero stat strip — Akshay-inspired

**What:** Row of live counters under hero bio, e.g.:

- `15+` production PRs  
- `1` COLM 2026 poster  
- `8` shipped projects  
- `1,144+` GitHub contributions (from pulse event)

**Why:** Proof at a glance; Akshay uses animated zeros until wired — you can use real data.

**How:**
- New `src/components/HeroStats.jsx`
- Listen for `github-pulse-loaded` for contrib total
- Static constants for PRs/projects/paper; optional count-up animation

**Effort:** 2–4 hours  
**Files:** `HeroStats.jsx`, wire in hero in `App.jsx`

---

### 3. Project filter chips — Akshay-inspired

**What:** Filter bar above projects: **All · Production · Agents · ML · Full stack**

**Why:** Recruiters hiring for ML vs full-stack can self-serve.

**How:**
- Add `category: "production" | "agents" | "ml" | "fullstack"` to each item in `src/data/projects.js`
- `useState` filter in `App.jsx` projects section
- Empty state: “No projects in this layer”

**Effort:** 3–4 hours  
**Files:** `projects.js`, `App.jsx`

**Suggested categories:**

| Project | Category |
|---------|----------|
| TatvaOps Vantage | production |
| Vendor Profile | production |
| AI Trip Planner | agents |
| Medical Image / RAG | ml |
| Crop / Car / Churn / Speech | ml |

---

### 4. Project metric badges — Krishna-inspired

**What:** One-line proof on project rows, e.g. `7 APIs · LangGraph`, `Live embed · Streamlit`, `SEO CMS · production users`

**Why:** Krishna’s `R² 0.85` badges — honest shipped metrics, not vanity.

**How:**
- Optional `metric: string` on each project in `projects.js`
- Render under title in project list + spotlight header

**Effort:** ~2 hours  
**Files:** `projects.js`, `App.jsx`, `ProjectSpotlight.jsx`

---

### 5. Open-to-work pill — Moonbucks-inspired

**What:** Compact pill in hero or nav: `● Open to opportunities · Bengaluru · HH:MM IST`

**Why:** You have status lines scattered; one persistent pill reads cleaner.

**How:**
- Reuse existing `localTime` IST effect in `App.jsx`
- Styled pill next to hero CTAs or under nav on desktop

**Effort:** ~1 hour  
**Files:** `App.jsx`

---

### 6. Brief boot screen (first visit only) — Akshay + Moonbucks-inspired

**What:** 1–2s splash: `initializing tejas.portfolio → systems online`, then fade to hero.

**Why:** Memorable first impression; Moonbucks goes heavy — keep yours light.

**How:**
- `src/components/BootScreen.jsx`
- `sessionStorage` key `portfolio_boot_seen`
- Skip link + `prefers-reduced-motion: skip entirely`

**Effort:** 2–3 hours  
**Files:** new component, `App.jsx`, CSS

---

## Tier 2 — Narrative & depth

### 7. Capability map — Akshay “One engineer, multiple layers”

**What:** Replace or augment Skills with 4 cards:

- **ML systems** — PyTorch, RAG, agents, calibration research  
- **Full stack** — React, Go, Rails, FastAPI  
- **Infrastructure** — CI/CD, Kafka, Redis, Vercel  
- **Product** — SEO CMS, analytics, shipped to real users  

Each card: 2–3 tags + one sentence “how I use this layer.”

**Effort:** 4–6 hours  
**Files:** `src/data/capabilities.js`, new section or refactor skills in `App.jsx`

---

### 8. Request → outcome diagram — Akshay-inspired

**What:** One generic flow (not per-project clone):

`User → React SPA → API → RAG / LLM router → Response`

**Why:** Shows systems thinking for ML-heavy roles.

**How:** Reuse `InteractiveArchitecture` + new entry in `architectureFlows.js` (`portfolio-stack`).

**Effort:** ~4 hours  

---

### 9. Horizontal project rail — Moonbucks-inspired

**What:** Top 4 projects in a sideways scroll strip (snap); full list remains below.

**Why:** Visual “gallery” moment without losing your list detail.

**How:** CSS `scroll-snap-x`, cards open existing spotlight on click.

**Effort:** 6–8 hours  
**Files:** `ProjectRail.jsx` or section in `App.jsx`

---

### 10. Hero dual marquee — Krishna + Moonbucks

**What:** Continuous ticker under name (you have `TypingHero` + `SkillsMarquee` — optional second line repeating roles louder).

**Effort:** 2–3 hours  
**Note:** Don’t over-marquee; one strong motion is enough.

---

### 11. Testimonials — Akshay “Trusted in the details”

**What:** 2–4 quote cards from collaborators / professors / teammates.

**Needs:** Real quotes + permission.

**Effort:** 4 hours + content gathering  
**Files:** `src/data/testimonials.js`, carousel component

---

### 12. Certifications & research row — Krishna-inspired

**What:** Horizontal cards: COLM 2026 poster, arXiv, relevant courses/certs.

**Effort:** ~3 hours  
**Files:** `src/data/certifications.js`, section in `App.jsx` or under Research

---

### 13. Styled 404 — Akshay-inspired

**What:** `/404` route with terminal-style recovery: “route not found” + links home, projects, contact.

**Effort:** 2–3 hours  
**Files:** `src/pages/NotFound.jsx`, `main.jsx`

---

### 14. Dedicated case study routes — Akshay

**What:** `/projects/vantage`, `/projects/trip-planner` — long-form case study (problem, stack, outcome, architecture).

**Why:** SEO + recruiters who want depth beyond modal.

**Effort:** 8–12 hours **per** project  
**Note:** Spotlight modal is 80% there; extract content to pages later.

---

## Tier 3 — Optional / later

| Item | Notes | Effort |
|------|--------|--------|
| Command palette lite | Lighter ⌘K menu vs full terminal — optional | 6–8h |
| Ask Tejas deploy | Biggest AI flex; needs `GROQ_API_KEY` on Vercel | 2–4h |
| LeetCode / practice strip | Only if number is accurate and you want it | 1h |
| Full Moonbucks loader + GSAP scroll | High brand, high perf risk | 8h+ |
| EmailJS vs FormSubmit | Only if you need templates | 2–4h |

---

## What NOT to copy

| Pattern | Reason |
|---------|--------|
| Clone Akshay’s exact copy / layout | Keep your terminal + pulse identity |
| Krishna-style TatvaOps-heavy hero | You intentionally keep hero GitHub + LinkedIn only |
| Loader on every visit | Once per session max |
| Fake GitHub stats | You have live pulse — use it |
| Too many scroll-jacking sites | Hurts accessibility and mobile |

---

## Suggested order for tomorrow

**Session 1 (~3h)**  
1. Numbered sections  
2. Open-to-work pill  
3. Project metric badges  

**Session 2 (~4h)**  
4. Hero stat strip (wire pulse)  
5. Project filter chips  

**Session 3 (~4h)**  
6. Capability map OR boot screen (pick one)  

**Later sprints**  
- Horizontal project rail  
- 404 page  
- Case study routes  
- Testimonials when you have quotes  
- Deploy Ask Tejas  

---

## Git / deploy reminders

- Commits use repo-local email: `173387493+Tejasdagr8@users.noreply.github.com` (shows on contribution graph)
- Dark mode is default; paper mode is session-only (sun icon)
- Don’t commit `.env`, Ask Tejas unless you explicitly want it live
- Push to `Tejasdagr8/Portfolio` → Vercel auto-deploys

---

## File cheat sheet

| Area | Primary files |
|------|----------------|
| Layout / sections | `src/App.jsx` |
| Projects data | `src/data/projects.js` |
| Experience | `src/data/experience.js` |
| Architecture diagrams | `src/data/architectureFlows.js`, `InteractiveArchitecture.jsx` |
| GitHub pulse | `src/components/GitHubPulse.jsx`, `api/github-pulse.js` |
| Theme | `src/index.css`, `PaperModeToggle.jsx` |
| Routes | `src/main.jsx` |
| Terminal | `src/components/Terminal.jsx` |

---

*Last updated: Aug 2026 — after inspiration review of Akshay, Krishna, and Moonbucks portfolios.*
