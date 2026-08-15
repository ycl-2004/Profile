# Yi-Chen Canvas

A proof-first, static portfolio for Yi-Chen Lin. It keeps the original terminal-and-canvas identity while offering searchable timeline/list views, accessible details, optional sound, reduced-motion support, and a print-to-PDF résumé path.

Live site: <https://ycl-2004.github.io/Profile/>

## Source of truth

- `index.html` is the only GitHub Pages entry point. GitHub Pages serves the `main` branch from the repository root.
- `yichen-canvas-v2.html` is a legacy compatibility redirect to `./`; it contains no portfolio implementation. Remove it only after confirming that no external links still use the old URL.
- `assets/scripts/data/portfolio-items.js` drives Timeline and List views.
- `assets/scripts/templates/cards.js` contains the curated Canvas view.
- `assets/scripts/data/modal-data.js` contains public-safe case-study details and verified external links.

This separation is deliberate: Canvas is a curated narrative; Evidence Bank is the fuller résumé inventory.

## Local preview

No build step or package install is required.

```bash
python3 -m http.server 4173
```

Then open <http://127.0.0.1:4173/>. Do not validate through `file://`; clipboard, sharing, and browser security behavior differ from an HTTP origin.

## Verification

Run the dependency-free static audit:

```bash
node scripts/qa-static.mjs
```

Before publishing, also verify these browser paths at desktop, tablet, and mobile widths:

1. Enter and Space boot the Canvas; each Orbit node centers and highlights its matching evidence card; “Skip to searchable résumé” opens List View.
2. Every focusable Canvas card opens real details; decorative cards are not focusable.
3. Canvas, Timeline, and List views work, including search and filters.
4. Share, YC, sound, settings, layer, zoom, toolbar, quick-link, and modal controls all respond.
5. Reduced Effects enters immediately and leaves all content visible.
6. Blocking `assets/vendor/gsap/gsap.min.js` still leaves boot, views, and modal actions usable.
7. Print Résumé produces a clean List View document.

## Interaction and privacy contract

- Sound is off by default. Web Audio is created only after the visitor explicitly enables sound.
- Motion follows the visitor’s reduced-motion preference and can also be reduced in Settings.
- A failed or missing GSAP file removes enhancement only; content and core controls remain available.
- Modal focus is trapped while open and returned to its source on close.
- Public contact surfaces expose email, LinkedIn, and GitHub, not a phone number.
- Private repositories are described as private case studies and never linked to a public 404.

## Portfolio evidence rules

- Original projects and public systems are presented as owned work.
- LearnPrompt-derived repositories are labeled as forks/open-source maintenance; only Yi-Chen’s upstream contribution record is claimed.
- Work claims use public-safe themes and account-side pull-request verification, not proprietary implementation detail or anonymous links to access-restricted repositories.
- Counts such as public repositories and merged pull requests are time-sensitive and should be rechecked before future updates.

## Publishing boundary

Local edits and tests do not change the live site. Publishing requires an intentional commit and push to `main`; review the diff and rerun the static and browser checks first. Deleting the legacy redirect is a separate decision because old external links may still depend on it.

See [ADR-001](docs/decisions/001-single-entry-static-site.md) for the entry-point and architecture decision.
