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

- Answers auto-save in `localStorage`; quiz position syncs to `?q=N`
- Results are shareable: answers are encoded in the URL hash (`#a=…`) — Copy Link / Copy Summary buttons on the results page
- JSON export / import of answers and results
- Each result card shows the top driving questions ("Driven by Q#…")
- Keyboard: `1–5` to answer, `Backspace` to go back
- Accessible: skip link, semantic `<progress>`, `aria-live`, focus management, `prefers-reduced-motion`, dark `color-scheme`
- Print stylesheet for results

## Tests

Scoring logic is pure and exported for Node:

```sh
node --test tests/scoring.test.js
```

## Files

- `index.html` — entry point
- `style.css` — all styling (dark theme, responsive, print)
- `app.js` — question bank, scoring engine, rendering, state
- `tests/scoring.test.js` — `node:test` suite for the scoring engine
