# Portfolio inspiration roadmap

Reference sites (inspiration only — do not copy):
- [Akshay Ram Chavan](https://akshay-chavan-portfolio.vercel.app/) — system map, capability layers, project filters, case studies, boot sequence, testimonials
- [Krishna H](https://krishnahonnikhere.vercel.app/) — metric badges on projects, GitHub contributions, certifications, strong hero tagline
- [mayank (moonbucks.me)](https://moonbucks.me/) — numbered sections, boot loader, horizontal project scroll, open-to-work pill, creative marquee

Live site: https://tejas-melkote.vercel.app/  
Repo: `Tejasdagr8/Portfolio` on `main`

---

## Already shipped (don't redo)

- Profile photo (mirror selfie, portrait frame)
- GitHub Pulse + live contribution graph (auto-sync every 5 min, localStorage cache)
- Project spotlights + live previews (Vantage screenshot, vendor iframe, Streamlit embed)
- Paper spotlight modal (Sci-FM, 15.9% finding, arXiv/code links)
- Recruiter packet modal, `/compare`, `/hire`, `/views` analytics
- TatvaOps in Experience (May 2026 – Present, on-site); SuperAGI (Jan – May 2026)
- Interactive architecture (TatvaOps + SuperAGI flows)
- Terminal ⌘K with packet/compare commands; window controls (close/minimize/maximize)
- Ref-aware OG (`middleware.js` + `ogMeta.js`) for social crawlers
- Paper mode (session-only, dark default)
- Contact: email schedule + form with theme-aware `.form-input`
- Contact footer: GitHub + LinkedIn (TatvaOps removed from footer; not in hero social bar)
- Proof points card (replaced gamified achievements)
- Git commit email: `173387493+Tejasdagr8@users.noreply.github.com` (repo-local) for contribution graph

**Not deployed / untracked:** Ask Tejas (`AskTejas.jsx`, `api/chat.js`, `api/_lib/knowledge.js`) — only deploy if user asks.

---

## Tier 1 — Do first (best ROI)

### 1. Numbered section labels
**Inspired by:** moonbucks `(01)`, `(02)`…  
**What:** Extend `SectionHeading` in `src/App.jsx` with optional index: `(01) about`, `(02) experience`, etc.  
**Files:** `src/App.jsx`  
**Effort:** ~1–2h

### 2. Hero stat strip (live numbers)
**Inspired by:** Akshay stat counters  
**What:** Row under hero: `15+ PRs` · `COLM 2026` · `8 projects` · contrib from `github-pulse-loaded` event  
**Files:** new `src/components/StatStrip.jsx`, wire in `App.jsx`  
**Effort:** ~2–4h

### 3. Project filter chips
**Inspired by:** Akshay project filters  
**What:** Add `category` to each item in `src/data/projects.js` (`production` | `agents` | `ml` | `fullstack`). Filter UI above project list.  
**Files:** `projects.js`, `App.jsx` projects section  
**Effort:** ~3–4h

### 4. Project metric badges
**Inspired by:** Krishna `R² 0.85` style  
**What:** Optional `metric` string per project on cards, e.g. `7 APIs · LangGraph`, `Live on Vercel`  
**Files:** `projects.js`, project card in `App.jsx`  
**Effort:** ~2h

### 5. Open-to-work pill (hero/nav)
**Inspired by:** moonbucks  
**What:** Fixed or hero pill: `● Open to opportunities · Bengaluru · {IST time}` (partially exists in contact; consolidate)  
**Files:** `App.jsx` hero  
**Effort:** ~1h

### 6. Brief boot screen (first visit per session)
**Inspired by:** Akshay + moonbucks  
**What:** 1–2s skip-able overlay: `initializing → ready`. Use `sessionStorage`, respect `prefers-reduced-motion`.  
**Files:** new `src/components/BootScreen.jsx`, `App.jsx`  
**Effort:** ~2–3h

---

## Tier 2 — Narrative & polish

### 7. Capability map (reframe Skills)
**Inspired by:** Akshay capability map  
**What:** Replace or augment skills grid with 4 cards: ML · Full stack · Infra · Product — each with one-line philosophy + tags. Reuse content from `skillCategories` in `App.jsx`.  
**Files:** `App.jsx` or `src/data/capabilities.js`  
**Effort:** ~4–6h

### 8. Request → outcome diagram
**Inspired by:** Akshay production lifecycle  
**What:** One generic flow: User → React → API → RAG/LLM → Response. Reuse `InteractiveArchitecture` / `architectureFlows.js` pattern.  
**Files:** `architectureFlows.js`, new section in `App.jsx`  
**Effort:** ~4h

### 9. Hero dual marquee (optional)
**Inspired by:** moonbucks + Krishna skill ticker  
**What:** Extend or duplicate marquee under hero titles (you have `TypingHero` + `SkillsMarquee`).  
**Files:** `TypingHero.jsx` or `SkillsMarquee.jsx`  
**Effort:** ~2–3h

### 10. Horizontal project rail (top 4)
**Inspired by:** moonbucks scroll projects  
**What:** Desktop scroll-snap strip for flagship projects; full list remains below.  
**Files:** new component or projects section in `App.jsx`  
**Effort:** ~6–8h

### 11. Testimonials carousel
**Inspired by:** Akshay social proof  
**What:** 2–4 real quotes — **needs copy from collaborators first**  
**Files:** `src/data/testimonials.js`, new component  
**Effort:** ~4h + content

### 12. Certifications / research row
**Inspired by:** Krishna  
**What:** Horizontal cards: COLM poster, courses, etc.  
**Files:** `src/data/certifications.js`, section in `App.jsx`  
**Effort:** ~3h

### 13. Styled 404
**Inspired by:** Akshay  
**What:** Route in `main.jsx`, terminal-style “route not found” with link home  
**Files:** `src/pages/NotFound.jsx`, `main.jsx`  
**Effort:** ~2–3h

---

## Tier 3 — Later / optional

### 14. Dedicated case study routes
`/projects/vantage`, `/projects/trip-planner` — long-form; spotlight modal is 80% there.  
**Effort:** ~8–12h each

### 15. Command palette lite
Lighter ⌘K menu (sections, packet, resume) — or keep terminal as the palette.  
**Effort:** ~6–8h

### 16. Ask Tejas deploy
Set `GROQ_API_KEY` on Vercel, wire `AskTejas.jsx`, add FAB.  
**Effort:** ~2h after user approval

### 17. Full Moonbucks-style loader
Heavy brand moment — only if you want bold first impression.  
**Effort:** ~8h+

---

## Do NOT copy (keep your identity)

- Akshay’s exact “system map” wording — you’re ML + paper + production seam
- TatvaOps in hero social bar (user preference: GitHub + LinkedIn + Email only)
- Loader on every visit (use session-only max)
- Fake GitHub stats (you have real pulse)
- GSAP-heavy scroll clones (your terminal + gradient field is the differentiator)

---

## Suggested order for tomorrow

**Session A (~3h)**  
1. Numbered sections  
2. Open-to-work pill  
3. Project metric badges  

**Session B (~3h)**  
4. Project filters  
5. Hero stat strip  

**Session C (~3h)**  
6. Boot screen  
7. Capability map OR 404 page  

---

## Key files reference

| Area | Path |
|------|------|
| Main page | `src/App.jsx` |
| Projects data | `src/data/projects.js` |
| Experience | `src/data/experience.js` |
| Architecture flows | `src/data/architectureFlows.js` |
| Theme / paper mode | `src/index.css`, `src/components/PaperModeToggle.jsx` |
| Terminal | `src/components/Terminal.jsx` |
| GitHub pulse | `src/components/GitHubPulse.jsx`, `api/github-pulse.js` |
| Routes | `src/main.jsx` |
| OG middleware | `middleware.js`, `ogMeta.js` |

---

## Git / deploy notes

- Push from **Tejasdagr8**; repo-local git email: `173387493+Tejasdagr8@users.noreply.github.com`
- `coooltejasdagr@gmail.com` is on another GitHub account — old commits won’t count on graph
- Only commit/push when ready; user prefers explicit ask
- Latest known commit on main: `ee3c02c` (terminal window controls)

---

## Build & verify

```bash
npm run build
npm run dev   # local check
```

Check paper mode + dark mode after any CSS changes.
