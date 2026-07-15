# ADR-001: Keep one canonical static entry point

## Status

Accepted

## Date

2026-07-14

## Context

The repository previously exposed both `index.html` and `yichen-canvas-v2.html` with duplicated implementation. GitHub Pages serves `index.html` from the `main` branch root, but two editable copies made it unclear which file controlled production and allowed the URLs to drift.

The portfolio also needs graceful behavior when animation code is unavailable, without adding a build pipeline that makes a simple GitHub Pages site harder to maintain.

## Decision

- Treat `index.html` as the only implementation and production entry point.
- Keep `yichen-canvas-v2.html` temporarily as a no-index compatibility redirect, not a second source file.
- Keep the site build-free and dependency-free at runtime. Local JavaScript modules are loaded in explicit order; GSAP remains an optional local enhancement.
- Keep content data separate from the curated Canvas template so List/Timeline can remain comprehensive while Canvas stays readable.

## Alternatives considered

### Keep both HTML files synchronized

Rejected because synchronization is manual, creates review noise, and makes production ownership unclear.

### Delete the legacy file immediately

Deferred because external bookmarks may still target it. A redirect preserves those links while removing implementation drift. It can be deleted after link usage is checked and deletion is explicitly approved.

### Add a framework and build step

Rejected for now. The site does not need server rendering, routing, or package-managed production dependencies. A build system would add operational cost without solving the current interaction and content problems.

## Consequences

- Future edits belong in `index.html` and `assets/` only.
- Both known URLs reach the canonical portfolio without maintaining duplicate code.
- Core content remains usable if motion is reduced or GSAP fails.
- Publishing remains a simple GitHub Pages commit, but browser QA is still required because the experience is interaction-heavy.
