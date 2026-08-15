# ADR-002: Rebuild the entry page on YC brand and Orbit material

## Status

Accepted

## Date

2026-08-14

## Context

The entry page was a simulated macOS terminal window: a dark purple-black ground (`#24242e`), a pink-to-violet-to-blue gradient headline, monospace for every string on the page, window chrome with traffic-light dots and a "Proof Mode" badge, and a fake battery that charged for 720ms before admitting anyone.

Three problems, in order of cost:

1. **It did not belong to this brand.** YC branding is wine `#B23A48`, denim `#3B6EA5`, and warm paper `#FEFCF6`; Orbit, the macOS product in this portfolio, ships burgundy, ivory `#F7F2E8`, coral, and dusk `#2B1C1A`. The two are one family. A dark ground under a pink-violet gradient belongs to neither, and gradient display type is the most recognisable generated-template signature on the web.

2. **The entry said everything the canvas says.** It listed four "What I build" bullets, eight tech chips, three "Verified signals", and four metric tiles. A visitor who read all of it had no reason left to open the canvas, which is the actual product.

3. **There was no hierarchy, and a visible seam.** Uniform monospace gave every string the same weight, so nothing led the eye. The entry was dark and the canvas behind it is warm white `#faf8f5`, so entering read as arriving at a different site.

## Decision

- **Ground the entry in Orbit's material.** Ivory `#F7F2E8` paper by day, Orbit's dusk `#2B1C1A` at night, both defined as scoped tokens on `#terminal-entry`. The daytime ground is the same warm family as the canvas, so entering reads as walking further into one room.
- **One accent: wine.** Every action, marker, ring, and focus ring is wine. Denim carries system and connection meaning only, never an action. Fills keep the raw accent at night while anything that has to read as ink lifts toward white, following Orbit's own rule for dark grounds.
- **Two radii, no third.** 8px for controls, 20px for panels.
- **Split the type registers.** System sans carries the name and prose; monospace is reserved for numbers, so the evidence reads as data rather than as more styling.
- **Cut the entry to name, role, one sentence, three numbers, and one primary action.** Stack, philosophy, and project lists live on the canvas, where they already existed.
- **Replace the fake terminal window with a real preview.** The right column renders five actual `portfolioItems` records on Orbit's tilted ring, in the tones the canvas paints those cards with. Hovering a node lights its link; clicking a node carries its stable record id into the Canvas, centers the matching card, and reuses the Canvas selection and connection-focus states.
- **Keep every existing contract.** Element ids, `data-sound-toggle`, the `.terminal-nav-target` arrow-key graph, `.hidden` / `.is-launching` / `.is-immediate`, and the progress hooks are unchanged, so `preferences.js`, `theme.js`, `dom.js`, and the print styles keep working untouched.
- **Do not redesign the canvas.** The entry only calls the Canvas's existing selection and connection-focus behavior, plus a reusable centering helper; its layout and visual language remain unchanged.

## Alternatives considered

### Keep the dark entry and only swap the palette

Rejected. Recolouring would have fixed the brand mismatch and left the two structural problems: the entry still spends its whole surface repeating the canvas, and the light-to-dark seam at entry remains.

### Move the entry to Orbit's dusk and treat the seam as a curtain

A real option, and the reason dusk survives as the dark theme rather than a neutral black. Rejected as the default because the canvas is a daylight surface, the brand's resting state is paper, and a deliberate theme flip only pays for itself when the transition is the point.

### Draw the preview as an illustration

Rejected. A hand-drawn ring would be decoration, and decoration cannot go stale in a way anyone notices. Resolving nodes against `portfolioItems` means the preview breaks loudly rather than silently lying when a record is renamed or removed.

## Consequences

- The entry and the canvas are one continuous surface in both themes.
- Entry content is now a strict subset of canvas content, so a claim only has to be updated in `portfolio-items.js` and `modal-data.js`.
- `ORBIT_NODES` in `terminal-entry.js` names five record ids. If one is renamed, that node disappears from the preview rather than throwing; if all five go, the panel removes itself.
- Those ids must also resolve to curated Canvas cards. Static QA now checks the full `ORBIT_NODES` → `portfolioItems` → `data-card` chain so a future rename cannot silently turn a specific entry back into the generic overview.
- Four always-on ambient animations were removed. The entry keeps one: drift along the ring, which is what makes the preview read as a live system.
- Dead rules for the old shell were removed from `enhancements.css` and `animations.css`, including the `terminalAmbientSweep` and `terminalAmbientBorder` keyframes.
- The canvas top bar still uses the older pink gradient avatar. Aligning it to wine is a separate decision about the canvas visual system.
