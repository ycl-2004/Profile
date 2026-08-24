# Yi-Chen Canvas

A proof-first, static portfolio for Yi-Chen Lin. It keeps the original terminal-and-canvas identity while offering searchable timeline/list views, accessible details, optional sound, reduced-motion support, and a print-to-PDF résumé path.

The site positions Yi-Chen as an **AI-focused software engineer**: RAG pipelines and LangGraph agent orchestration first, then industrial field software, then the public line of native macOS and local-first tools.

Live site: <https://ycl-2004.github.io/Profile/>

## Source of truth

- `index.html` is the only GitHub Pages entry point. GitHub Pages serves the `main` branch from the repository root.
- `assets/scripts/data/portfolio-items.js` drives Timeline and List views.
- `assets/scripts/templates/cards.js` contains the curated Canvas view.
- `assets/scripts/data/modal-data.js` contains public-safe case-study details and verified external links.
- `.github/github-watch-baseline.json` stores the last GitHub state Yi-Chen explicitly reviewed.
- `.github/workflows/check-github-updates.yml` only notifies when that public state drifts; it never edits the website.

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

1. Enter and Space boot the Canvas; each Orbit node centers and highlights its matching evidence card; the entry page’s “Résumé (PDF)” link opens <https://ycl-2004.github.io/Resume/YC-Resume.pdf> in a new tab rather than jumping into List View.
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
- Counts such as public repositories, GitHub stars, and merged pull requests are time-sensitive and should be rechecked before future updates.

### Last measured — 2026-08-24

| Claim | Value | Source |
| --- | --- | --- |
| Public repositories | 29 | `GET /users/ycl-2004` |
| Cumulative public stars | 126, displayed as `120+` | sum of `stargazers_count` across public repos (Orbit 123, ShareMemory 2, YC_Obsidian 1). Displayed as a floor on purpose: an exact number goes stale on every new star. Raise the floor when it is comfortably passed. |
| Merged upstream PRs | 3 | `search/issues?q=type:pr+author:ycl-2004+is:merged`, LearnPrompt repos only |
| Open upstream PRs | 0 | the 4th ai-news-radar PR closed without merging |
| Evidence Bank items | 26 | `assets/scripts/data/portfolio-items.js` |

Coverage rule: **Canvas is the shortest narrative; Evidence Bank is a selected, searchable résumé—not a mirror of every public repository.** Public visibility alone does not earn a Timeline/List row. A record stays only when it adds meaningful evidence to the AI/software-engineering story; the complete public inventory remains on GitHub. Every retained Evidence Bank record must still be referenced by a timeline milestone or it becomes invisible in Timeline View. `scripts/qa-static.mjs` asserts the curated set and the user-confirmed exclusions.

The local static QA checks that the displayed claims and the human-confirmed baseline agree. The scheduled watcher separately re-measures GitHub; when public repositories, stars, fork state, or archive state change, it opens one assigned reminder issue. It does not update the site or baseline.

### GitHub change reminders

The `Check GitHub profile updates` Action runs on the 1st and 15th of each month and can also be started manually. It compares public repository additions/removals, per-repository stars, fork state, and archive state with `.github/github-watch-baseline.json`.

If anything changed, the Action creates one open `[Profile Watch]` issue assigned to `ycl-2004`, containing the exact difference. While that issue remains open, later checks do not create duplicates. The workflow has read-only content access and issue-write access; it does **not** edit website files, accept a new baseline, commit, push, deploy, or publish.

After reviewing the reminder and manually deciding what should appear on the website, update the curated content as needed and explicitly accept the reviewed GitHub state:

```bash
node scripts/check-github-updates.mjs --accept
```

See [ADR-003](docs/decisions/003-github-profile-watch.md) for the notification-only policy and manual approval boundary.

### Private case studies

Production RAG System, Media Content Operations Platform, Delta Controls, Resume Tailor, and the coursework projects have private or client-owned repositories. They are presented as case studies with public-safe detail and **no link**, never a link to a 404. Technical Writing remains a separate Evidence Bank record; its reach figures (311K cumulative reads, 45K top post) are self-reported from platform analytics and carry no public link.

### Deliberately not linked

`Tutor-Site` (2023) was deleted on 2026-08-24: its GitHub Pages deployment publicly served an old résumé containing a home address and phone number, in two copies — the PDF itself and a repo zip that also contained it. QA asserts the site never links it.

`YC-Studio` is public and is the Production RAG System's repository, but is intentionally left off the site; the RAG record is presented as a private case study instead.

### Renamed repositories

`Mac_to_Ipad` was renamed to `Screen-Bridge` upstream. The site uses the current name and links to `github.com/ycl-2004/Screen-Bridge` directly rather than relying on GitHub's rename redirect, which is not guaranteed to survive a future name reuse.

## Publishing boundary

Local edits and tests do not change the live site. Publishing requires an intentional commit and push to `main`; review the diff and rerun the static and browser checks first.

`yichen-canvas-v2.html` was removed on 2026-08-24 by explicit decision. It declared `noindex`, but old bookmarks or inbound links can still hit the now-404 URL. Recover it with `git show b60315e:yichen-canvas-v2.html` if compatibility is needed again.

See [ADR-001](docs/decisions/001-single-entry-static-site.md) for the entry-point and architecture decision.
