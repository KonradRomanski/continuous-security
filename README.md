# Continuous Security Navigator

A practical web app for DevSecOps process analysis and team improvement planning.

## Key capabilities

- English-first UI by default, with EN/PL language switch.
- Dark mode by default, with light mode switch.
- 8-stage process assessment on a 0-3 maturity scale.
- Weighted scoring and risk classification per stage and overall.
- Prioritized gaps (`MUST / SHOULD / COULD`) with owners and KPI targets.
- Clickable gap cards with a full cause -> effect -> action -> outcome view.
- Tool recommendations with working links to official documentation.
- Markdown report export.
- Local state persistence (`localStorage`).

## Quick start

Requirements:

- Node.js 18+

Run locally:

```bash
npm run dev
```

Open:

- `http://localhost:4173`

## Testing and validation

1. Validate data model and links:

```bash
npm run validate
```

2. Run logic tests:

```bash
npm test
```

3. Manual UX test checklist:

- start app with `npm run dev`
- verify default language is English
- verify default theme is Dark
- switch language to PL and confirm UI text updates
- switch theme to Light and confirm visual change
- complete a few stage answers and confirm results update
- click a gap card and verify detail view opens
- verify detail view includes cause/effect/action/outcome and links
- export report and verify generated `.md` content
- save locally, refresh page, verify state is restored

## How to use effectively with a team

1. Run the first assessment with 3 roles together: Tech Lead, Product, Security/DevOps.
2. Score current reality, not target state.
3. Pick 3-5 `MUST` items from roadmap for the next sprint.
4. Assign an owner and KPI for each selected item.
5. Re-assess every 2-4 weeks and track score/risk trend.
6. Use the exported report in sprint planning and quarterly review.

## Deployment

### GitHub Pages

Workflows are included:

- `.github/workflows/ci.yml`
- `.github/workflows/deploy-pages.yml`

Steps:

1. Push repository to GitHub on `main`.
2. Open `Settings -> Pages`.
3. Set `Source` to `GitHub Actions`.
4. Push to `main` (or run workflow manually).

### Vercel

1. Import repository in Vercel.
2. Use framework preset `Other` (static site).
3. Build command: empty.
4. Output directory: `.`
5. Deploy.

## Project structure

- `index.html` - application shell
- `styles.css` - styles, responsive layout, theme system
- `app.js` - UI logic, i18n/theme switch, interactions
- `lib/framework-data.mjs` - assessment model, bilingual content, links
- `lib/engine.mjs` - scoring, findings, roadmap, report generation
- `tests/engine.test.mjs` - analysis tests
- `scripts/dev-server.mjs` - local static dev server
- `scripts/validate-data.mjs` - data and URL consistency checks
