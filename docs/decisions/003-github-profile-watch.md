# ADR-003: Notify on GitHub drift and require manual portfolio approval

## Status

Accepted

## Date

2026-08-24

## Context

The Canvas is deliberately curated, while Timeline and List are a broader evidence inventory. Public GitHub repositories and stars can change independently of the portfolio, but public visibility alone does not establish portfolio relevance, original ownership, or safe client disclosure.

The user does not want live API synchronization, automatic website edits, or a bot committing refreshed counts. The desired behavior is a low-frequency reminder: notice new/removed public repositories, star changes, or fork/archive state changes, then wait for explicit human approval before anything enters the website.

## Decision

- Store the last human-confirmed GitHub state in `.github/github-watch-baseline.json`.
- Run `.github/workflows/check-github-updates.yml` on the 1st and 15th of each month, plus manual `workflow_dispatch`.
- Compare only portfolio-relevant drift: repository additions/removals, stars, fork state, and archive state. Ordinary pushes and `updated_at` changes do not notify.
- When drift exists, create one open issue assigned to `ycl-2004`. The issue is the notification and contains the exact difference.
- Never edit website content, update the baseline, commit, push, or publish from the workflow.
- Avoid duplicate reminders while an open `[Profile Watch]` issue exists.
- After Yi-Chen reviews and approves the intended website changes, update the site manually and explicitly accept the new baseline with `node scripts/check-github-updates.mjs --accept`.

## Alternatives considered

### Runtime synchronization every six hours

Rejected by user preference. It would make public GitHub state alter the portfolio before editorial review and would add browser API/rate-limit failure modes.

### Scheduled workflow that commits a generated snapshot

Rejected by user preference. A bot commit is still an automatic source change, even when it only updates metadata.

### Automatically insert every new repository into Evidence Bank

Rejected. Repositories need ownership, privacy, relevance, naming, and narrative review before becoming portfolio claims.

### Notify on every repository push

Rejected as noise. The website does not need to mirror ordinary source activity; only public inventory and social-proof drift warrants a reminder.

## Consequences

- The website remains fully static and human-curated.
- GitHub drift can remain visible for up to roughly two weeks before the next check.
- One assigned GitHub issue provides a durable notification without duplicate reminders.
- Closing the reminder does not change the baseline; explicit `--accept` is required after manual review.
- Scheduled workflows can be delayed and may be disabled after 60 days without public-repository activity, so `workflow_dispatch` remains available as a manual fallback.

## Official references

- Scheduled workflows: https://docs.github.com/en/actions/reference/workflows-and-actions/events-that-trigger-workflows#schedule
- `GITHUB_TOKEN` permissions: https://docs.github.com/en/actions/tutorials/authenticate-with-github_token
- GitHub CLI issue creation: https://cli.github.com/manual/gh_issue_create
