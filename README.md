# All-in-One Personality Test

One **60-question** Likert quiz, scored simultaneously for six personality models:

| Model | Output |
|---|---|
| MBTI ×32 | 16 types + Assertive/Turbulent (e.g. `ESFJ-A`) |
| Big Five (OCEAN) | 5 trait scores as percentages |
| Enneagram | 9 types with wing (e.g. `4w5`) |
| Socionics | 16 types derived from MBTI |
| DISC | 4 workplace styles |
| SLOAN / RCIE | 5 team-profile styles |

## Run it

Zero dependencies, no build step — open `index.html` directly in a browser, or serve the folder:

```sh
npx serve .        # or: python -m http.server
```

## Features

- **Landing page** (`landing.html`) — a standalone marketing page explaining the six models, how it works, and where your data lives; links straight into the quiz
- Answers auto-save in `localStorage`; quiz position syncs to `?q=N`
- Results are shareable: answers are encoded in the URL hash (`#a=…`) — Copy Link / Copy Summary buttons on the results page (with a fallback for non-HTTPS contexts)
- Review Answers screen: jump to any question from the quiz or results and change it; results recompute live
- Results show how many questions were answered (partial runs are flagged), plus Print and JSON export
- Each result card shows the top driving questions ("Driven by Q#…") in an expandable, touch/screen-reader-friendly list
- Results open with an auto-generated **Overview** — a narrative summary, a strengths-vs-weaknesses read, four stat tiles (top trait, watch-out, work style, core drive), and concrete **Next Moves**
- A 2×2 **SWOT matrix** (Strengths / Weaknesses / Opportunities / Threats) derived from your six model scores, with a strength meter and a next step per item — included in Copy Summary, JSON export, and print
- Keyboard: `1–5` to answer, `Backspace` to go back
- Accessible: skip link, semantic `<progress>`, live-region announcements, focus management, `prefers-reduced-motion`, dark `color-scheme`
- Works offline after first load via a small service worker (`sw.js`)
- Print stylesheet for results

## Tests

Scoring logic is pure and exported for Node:

```sh
node --test tests/scoring.test.js
```

## Files

- `index.html` — quiz entry point
- `landing.html` / `landing.css` / `landing.js` — landing page
- `style.css` — all quiz styling (dark theme, responsive, print)
- `app.js` — question bank, scoring engine, rendering, state
- `sw.js` — offline cache
- `social-preview.png` — social share image
- `tests/scoring.test.js` — `node:test` suite for the scoring engine
