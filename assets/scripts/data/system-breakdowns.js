(function () {
    const app = window.PortfolioApp;

    // Authored copy, not user input: these strings are inserted as HTML so a
    // node description can carry <code> for a real API name.
    app.data.systemBreakdowns = {
        'project-orbit': {
            label: 'System Breakdown',
            thesis: 'Global input → radial selection → exact-window activation.',
            frame: 'Orbit is a gesture, not a list. Everything below exists so that one hold-and-flick lands on the exact window you meant — while staying inside the permissions macOS is willing to hand a menu-bar app.',
            map: {
                entry: 'Hold ⌥ anywhere on macOS',
                stages: [
                    ['trigger'],
                    ['gate'],
                    ['composition'],
                    ['pointer', 'keyboard'],
                    ['resolver'],
                    ['app-target', 'window-target'],
                    ['os']
                ]
            },
            nodes: {
                trigger: {
                    title: 'Global Trigger Monitor',
                    kind: 'input',
                    meta: 'hold ⌥ · system-wide event tap',
                    source: 'Services/TriggerMonitor.swift',
                    flags: [{ label: 'Constraint', tone: 'constraint' }],
                    role: 'The only way into the product, and the part macOS is least willing to give away.',
                    detail: [
                        { label: 'What it does', text: 'Watches modifier flags across the whole system, so the ring can be summoned from inside any app instead of from a window Orbit owns.' },
                        { label: 'The constraint', text: 'macOS will not tell a background app that you are holding a key outside its own windows unless Accessibility is granted. The permission is not a feature toggle — it is the precondition for the product existing.' },
                        { label: 'Consequence', text: 'That permission has to be earned in the first thirty seconds, which is why it is requested by the welcome flow rather than buried in a settings screen.' }
                    ]
                },
                gate: {
                    title: 'Summon Gate',
                    kind: 'core',
                    meta: 'idle → pending → open',
                    source: 'Services/TriggerMonitor.swift · OrbitWindowController.swift',
                    flags: [{ label: 'Failure → fix', tone: 'failure' }],
                    role: 'Decides whether a held modifier is a shortcut or a request.',
                    detail: [
                        { label: 'What it does', text: 'A long-press threshold separates “holding Option as part of a keyboard shortcut” from “asking for the ring.”' },
                        { label: 'The hard part', text: 'Duration is not intent. Fast typing satisfies a hold threshold on its own, and the ring opened mid-sentence.' },
                        { label: 'Decision', text: 'A pending summon is cancelled the moment another key, mouse button, or scroll gesture arrives. The ring opens only when the hold is the <em>only</em> thing happening.' }
                    ]
                },
                composition: {
                    title: 'Ring Composition',
                    kind: 'core',
                    meta: 'running apps × activation history × window filter',
                    source: 'Services/RunningAppCatalog.swift · AppActivationHistory.swift · WindowServerInspector.swift',
                    flags: [{ label: 'ADR-003', tone: 'ref' }, { label: 'ADR-004', tone: 'ref' }],
                    role: 'Chooses which apps become cards, and where they sit around the cursor.',
                    detail: [
                        { label: 'Membership', text: 'Recent activation history, not the full running-app list. A radial layout gets worse as it gets more crowded, so recency is the mechanism that keeps the ring small enough to stay radial.' },
                        { label: 'Ordering', text: 'Recently used or alphabetical, chosen by the user — because spatial muscle memory only forms if positions are allowed to stay still.' },
                        { label: 'The hard part', text: 'An app can be “running” while owning no window at all. Those cards looked identical to real ones right up until activating one put nothing on screen.' },
                        { label: 'Reliability rule', text: 'A window-server query that <em>fails</em> and one that legitimately returns nothing are different answers, and the filter now represents both. See the failure log.' }
                    ]
                },
                pointer: {
                    title: 'Radial Pointer & Center',
                    kind: 'branch',
                    meta: 'hover · drag · drop lifecycle',
                    source: 'OrbitRingView.swift · Models/DropLifecycle.swift',
                    flags: [{ label: 'ADR-001', tone: 'ref' }],
                    role: 'The spatial half of selection, plus the most reachable pixel on screen.',
                    detail: [
                        { label: 'What it does', text: 'Flick toward a card and release. The center stays under the cursor as a live target whose meaning changes with what you are holding: Cancel, Confirm, Quit, AirDrop, or Trash.' },
                        { label: 'Decision', text: 'Selection and activation are separate states. Hover selects, release or Enter activates, and only an explicit drag into the center can quit an app.' },
                        { label: 'Trade-off', text: 'A one-state model would make an accidental hover destructive. Splitting the states costs a state machine and buys the ability to put “quit” where the cursor already is.' }
                    ]
                },
                keyboard: {
                    title: 'Keyboard Selection',
                    kind: 'branch',
                    meta: 'arrows by default · letters and numbers opt-in',
                    source: 'Config/ShortcutKey.swift · Settings/SettingsModel.swift',
                    flags: [{ label: 'ADR-002', tone: 'ref' }],
                    role: 'The same ring, traversed without moving the cursor.',
                    detail: [
                        { label: 'What it does', text: 'Arrows and Tab walk the ring in MRU order. With previews on, left and right pick the exact window of the selected app before you release.' },
                        { label: 'Decision', text: 'Letter matching and number keys are off by default and independently enableable. Hints render only the shortcut styles that are actually on, and disabled commands are ignored by both the event tap and the ring model.' },
                        { label: 'Why', text: 'Every visible shortcut is also an accidental key path. The default is chosen for the person who never opens Settings.' }
                    ]
                },
                resolver: {
                    title: 'Target Resolver',
                    kind: 'core',
                    meta: 'stable 12 o’clock · MRU traversal',
                    flags: [{ label: 'Key decision', tone: 'decision' }],
                    role: 'Turns “the selection” into a concrete destination before anything is activated.',
                    detail: [
                        { label: 'The anchor rule', text: '12 o’clock is the current app’s most recent <em>other</em> window when one exists, otherwise the previous app. That target does not move when the card count or the preview setting changes.' },
                        { label: 'Why it matters', text: 'The first keyboard target is the one people stop looking at. If it drifts with configuration, the gesture stops being muscle memory and goes back to being a decision.' },
                        { label: 'Trade-off', text: 'A rule that has to be re-derived on every summon, and tested, instead of just taking index zero.' }
                    ]
                },
                'app-target': {
                    title: 'App Activation',
                    kind: 'branch',
                    meta: 'the common path',
                    role: 'What almost every switch actually does.',
                    detail: [
                        { label: 'What it does', text: 'Brings the chosen application forward. It needs nothing beyond the Accessibility grant the trigger already requires.' },
                        { label: 'Design rule', text: 'The easy path has to stay easy. Every reliability mechanism on the branch beside it is scoped so it never taxes this case.' }
                    ]
                },
                'window-target': {
                    title: 'Exact Window Activation',
                    kind: 'branch',
                    meta: 'AX raise → Window menu → Apple Events',
                    source: 'Services/ScriptedWindowFocus.swift · WindowPreviewService.swift',
                    flags: [{ label: 'Hard problem', tone: 'hard' }, { label: 'ADR-007', tone: 'ref' }],
                    role: 'The part that is genuinely difficult.',
                    detail: [
                        { label: 'The problem', text: 'Switching to an app is easy. Switching to the exact browser window you had in mind is not — every app exposes its windows differently, and windows on other Spaces may not be listed at all.' },
                        { label: 'The ladder', text: 'Raise the exact Accessibility window. If that cannot complete, press the matching item in the app’s own Window menu through Accessibility. Only then ask the app to reorder the window through Apple Events.' },
                        { label: 'Trade-off', text: 'Three code paths instead of one, and a permission prompt that can appear mid-gesture. In exchange, declining that prompt degrades to “open the app normally” rather than failing.' }
                    ]
                },
                os: {
                    title: 'macOS Integration',
                    kind: 'edge',
                    meta: 'Accessibility · Screen Recording · Apple Events',
                    flags: [{ label: 'Constraint', tone: 'constraint' }],
                    role: 'The boundary. Orbit owns none of it — it only decides how much to require, and when to ask.',
                    detail: [
                        { label: 'Accessibility', text: 'Required. Without it there is no global trigger and no window raising.' },
                        { label: 'Screen Recording', text: 'Optional, requested only when window previews are turned on, and macOS forces an app restart after granting. It also unlocks window <em>titles</em>, which is what makes the Window-menu path and cross-Space targets work at all.' },
                        { label: 'Apple Events', text: 'Never requested up front. Asked for at the moment the fallback runs, for the one app that needs it.' }
                    ]
                }
            },
            build: {
                graph: {
                    summary: 'Arrows point from consumer to dependency, so the bottom row is what everything rests on. <code>Config/</code> depends on nothing and is referenced by everyone; <code>Ring/</code> depends on everything and is referenced by nothing. That shape is the architecture — a layer that started pointing back upward would show here immediately.',
                    nodes: [
                        { id: 'ring', label: 'Ring surface', kind: 'core', meta: '7 files · 4,068 lines', note: 'The app shell, the window controller, and the ring itself. Nothing imports it.' },
                        { id: 'settings', label: 'Settings/', kind: 'branch', meta: '3 files · 990 lines', note: 'The preferences surface and its palette.' },
                        { id: 'effects', label: 'Effects/', kind: 'branch', meta: '1 file · 147 lines', note: 'Reusable motion, kept out of the 2,293-line view.' },
                        { id: 'services', label: 'Services/', kind: 'edge', meta: '7 files · 2,044 lines', note: 'Every call macOS can refuse lives here.' },
                        { id: 'models', label: 'Models/', kind: 'input', meta: '2 files · 234 lines', note: 'The two shapes that travel between layers.' },
                        { id: 'config', label: 'Config/', kind: 'core', meta: '4 files · 989 lines', note: 'Tunables and contracts. Depends on nothing.' }
                    ],
                    edges: [
                        { from: 'ring', to: 'config', label: '80', weight: 80 },
                        { from: 'ring', to: 'settings', label: '53', weight: 53 },
                        { from: 'ring', to: 'services', label: '49', weight: 49 },
                        { from: 'ring', to: 'models', label: '16', weight: 16 },
                        { from: 'ring', to: 'effects', label: '', weight: 4 },
                        { from: 'settings', to: 'config', label: '90', weight: 90 },
                        { from: 'settings', to: 'services', label: '10', weight: 10 },
                        { from: 'effects', to: 'config', label: '', weight: 1 },
                        { from: 'services', to: 'config', label: '23', weight: 23 },
                        { from: 'services', to: 'models', label: '11', weight: 11 },
                        { from: 'models', to: 'config', label: '', weight: 1 }
                    ]
                },
                drill: {
                    ring: {
                        title: 'Ring surface',
                        summary: '<code>ApplicationShell</code> is the entry point: it owns the delegate, opens Settings, and starts <code>TriggerMonitor</code>. Everything below it is presentation — and <code>OrbitRingView</code> at 2,293 lines is the one genuine concentration in the tree.',
                        nodes: [
                            { id: 'shell', label: 'ApplicationShell', kind: 'input', meta: '282 lines', note: 'Entry point. Sets the system-wide AX messaging timeout to 0.4s.' },
                            { id: 'onboard', label: 'OnboardingWindowController', kind: 'branch', meta: '256 lines', note: 'First-launch welcome and permission ask.' },
                            { id: 'wc', label: 'OrbitWindowController', kind: 'core', meta: '689 lines', note: 'Summon state, panel lifecycle, target activation.' },
                            { id: 'ringview', label: 'OrbitRingView', kind: 'core', meta: '2,294 lines', note: 'Cards, centre control, preview panel, keyboard model.' },
                            { id: 'scrim', label: 'OrbitScrim', kind: 'branch', meta: '311 lines', note: 'Backdrop blur and dimming behind the ring.' },
                            { id: 'trail', label: 'OrbitTrail', kind: 'branch', meta: '123 lines', note: 'The cursor trail drawn during a summon.' },
                            { id: 'backdrop', label: 'OrbitRingBackdrop', kind: 'branch', meta: '113 lines', note: 'The ring track the cards sit on.' }
                        ],
                        edges: [
                            { from: 'shell', to: 'wc', label: 'owns' },
                            { from: 'shell', to: 'onboard', label: 'first launch' },
                            { from: 'wc', to: 'ringview', label: '5' },
                            { from: 'ringview', to: 'scrim', label: '' },
                            { from: 'ringview', to: 'trail', label: '' },
                            { from: 'ringview', to: 'backdrop', label: '' }
                        ]
                    },
                    services: {
                        title: 'Services/',
                        summary: 'The permission surface, readable as one folder. <code>WindowPreviewService</code> is the hub — both <code>ScriptedWindowFocus</code> and <code>WindowServerInspector</code> reach into it four times each, because window titles and window geometry both come from the capture path that Screen Recording gates.',
                        nodes: [
                            { id: 'trigger', label: 'TriggerMonitor', kind: 'input', meta: '273 lines', note: 'The global modifier tap. Needs Accessibility.' },
                            { id: 'catalog', label: 'RunningAppCatalog', kind: 'core', meta: '167 lines', note: 'Builds the visible app set for the ring.' },
                            { id: 'history', label: 'AppActivationHistory', kind: 'core', meta: '148 lines', note: 'Recent activation order — the ring membership rule.' },
                            { id: 'inspector', label: 'WindowServerInspector', kind: 'core', meta: '351 lines', note: 'The optional-PID-set window query from ADR-004.' },
                            { id: 'preview', label: 'WindowPreviewService', kind: 'edge', meta: '788 lines', note: 'Screen capture and window titles. Needs Screen Recording.' },
                            { id: 'focus', label: 'ScriptedWindowFocus', kind: 'edge', meta: '272 lines', note: 'The Apple Events fallback from ADR-007.' },
                            { id: 'login', label: 'LoginItemService', kind: 'branch', meta: '45 lines', note: 'Launch at login, via SMAppService.' }
                        ],
                        edges: [
                            { from: 'catalog', to: 'history', label: 'ordering' },
                            { from: 'catalog', to: 'inspector', label: 'window filter' },
                            { from: 'history', to: 'inspector', label: '' },
                            { from: 'focus', to: 'preview', label: '4' },
                            { from: 'inspector', to: 'preview', label: '4' }
                        ]
                    },
                    settings: {
                        title: 'Settings/',
                        summary: '<code>SettingsModel</code> names <code>OrbitPreferences</code> 73 times — it is almost entirely a typed view onto the preference store, which is exactly what the &ldquo;no inline literals&rdquo; rule produces. It also reaches two services directly: <code>LoginItemService</code> to toggle launch-at-login, and <code>WindowPreviewService</code> to check Screen Recording before offering previews.',
                        nodes: [
                            { id: 'view', label: 'SettingsView', kind: 'input', meta: '592 lines', note: 'General, Appearance, Shortcuts, and Permissions panes.' },
                            { id: 'model', label: 'SettingsModel', kind: 'core', meta: '262 lines', note: 'The observable bridge to OrbitPreferences.' },
                            { id: 'palette', label: 'OrbitPalette', kind: 'branch', meta: '136 lines', note: 'Colour and radius tokens, shared with the ring.' }
                        ],
                        edges: [
                            { from: 'view', to: 'model', label: '7' },
                            { from: 'view', to: 'palette', label: '6' }
                        ]
                    },
                    config: {
                        title: 'Config/',
                        summary: 'The bottom of the graph. <code>OrbitPreferences</code> is 794 lines holding 59 named constants — every timing threshold, size, and default in the product — because CONTRIBUTING forbids inline literals for tunable values. It is the only file here with an outgoing edge.',
                        nodes: [
                            { id: 'prefs', label: 'OrbitPreferences', kind: 'core', meta: '794 lines · 59 constants', note: 'Every tunable value in the app, named.' },
                            { id: 'shortcut', label: 'ShortcutKey', kind: 'branch', meta: '100 lines', note: 'Trigger and clear-selection key definitions.' },
                            { id: 'lang', label: 'AppLanguage', kind: 'branch', meta: '54 lines', note: 'The eleven bundled locales and Follow System.' },
                            { id: 'notif', label: 'OrbitNotifications', kind: 'branch', meta: '41 lines', note: 'Internal notification names and keyboard commands.' }
                        ],
                        edges: [
                            { from: 'prefs', to: 'shortcut', label: '4' }
                        ]
                    },
                    models: {
                        title: 'Models/',
                        summary: 'Deliberately the smallest folder. Two value types move between layers: <code>AppRecord</code>, which is what a ring card is, and <code>DropLifecycle</code>, which is what the centre target is currently doing. A models folder that grows is usually a services folder that leaked.',
                        nodes: [
                            { id: 'app', label: 'RunningApp', kind: 'core', meta: '205 lines', note: 'AppRecord — one card on the ring.' },
                            { id: 'drop', label: 'DropLifecycle', kind: 'core', meta: '29 lines', note: 'Cancel / Confirm / Quit / AirDrop / Trash state.' }
                        ],
                        edges: []
                    },
                    effects: {
                        title: 'Effects/',
                        summary: 'One file, one reason: the pixel-dissolve that plays when an app card is dragged into the centre to quit it. It lives here rather than inside <code>OrbitRingView</code> because a 2,293-line view does not need a particle system inside it — and because motion that is reusable should be findable.',
                        nodes: [
                            { id: 'scatter', label: 'CardScatter', kind: 'core', meta: '147 lines', note: 'ScatterSequence, Shard, and the View modifier that drives them.' }
                        ],
                        edges: []
                    }
                },
                practice: [
                    {
                        title: 'The rule the graph is enforcing',
                        text: '<strong>Nothing that can be refused at runtime lives in a view.</strong> Every call needing a permission — Accessibility, the window server, Apple Events, screen capture — sits in <code>Services/</code>. The views reach AppKit only for things that cannot fail, like <code>accessibilityDisplayShouldReduceTransparency</code>. That is why the permission surface is auditable by opening one folder, and why <code>Services/</code> has no arrow pointing back up.'
                    },
                    {
                        title: 'Tunables live in one file, so the graph stays readable',
                        text: '<code>OrbitPreferences</code> holds 59 named constants because CONTRIBUTING requires tunable values there rather than as inline literals. The visible consequence is in the numbers on the arrows: <code>SettingsModel</code> names it 73 times and <code>OrbitRingView</code> 65 times. A timing or sizing question is answered by reading one file instead of grepping six.'
                    },
                    {
                        title: 'An ADR is required for some changes and forbidden for others',
                        text: 'Interaction semantics, permission requirements, and how Orbit is built or distributed need a record in <code>docs/decisions/</code>. Ordinary bug fixes and refactors explicitly do not. CONTRIBUTING names ADR-003 as the standard — <em>state what was rejected and why, not just what was chosen</em>.'
                    },
                    {
                        title: 'The metadata check exists because drift actually happened',
                        text: '<code>scripts/ci_validate.sh</code> keeps the Xcode version, README, and CHANGELOG in step and verifies the test counts. Its own comment records why: <em>two commits in a row changed the suite without touching this file, which is exactly the drift the check exists to catch.</em> So its failure message names the file to edit rather than only the number it expected.'
                    },
                    {
                        title: 'Comments explain the constraint, never the code',
                        text: 'A comment records <em>why</em> a non-obvious constraint exists — a system quirk, permission behaviour, a timing requirement — rather than restating the line. <code>ApplicationShell</code> sets <code>AXUIElementSetMessagingTimeout</code> to 0.4s with a note that the API is documented as per-object; that comment is worth more than the call above it.'
                    },
                    {
                        title: 'One logical change per PR, and no dependencies',
                        text: 'Branch off <code>main</code>, keep commit messages lowercase and specific, never mix a refactor into a bug fix. The dependency rule is absolute: no third-party packages, none added without discussion — which is what the zero-dependency claim in the README actually rests on.'
                    }
                ]
            },
            decisions: [
                {
                    ref: 'ADR-001',
                    title: 'Selection is not activation',
                    context: 'A card can be selected without activating its app, and the center target has to distinguish cancelling from an intentional quit.',
                    decision: 'Three explicit states: nothing selected and the center is Cancel; an app selected, where hover changes selection and Enter or trigger-release confirms; an app dragged into the center, where the center becomes Quit.',
                    tradeoff: 'A larger state machine, and one more thing that has to stay correct under test.',
                    result: 'The most reachable point on screen can safely hold a destructive action.'
                },
                {
                    ref: 'ADR-005',
                    title: 'Recent membership, user-chosen order',
                    context: 'An alphabetical ring is predictable but can omit the app you just left. A purely recent ring keeps moving where things are.',
                    decision: 'Membership comes from recent activation history; ordering inside that set is a user setting rather than a fixed rule.',
                    tradeoff: 'Two behaviors to explain instead of one.',
                    result: 'The ring stays small enough for a radial layout without giving up stable positions.'
                },
                {
                    ref: 'ADR-002',
                    title: 'Arrow-first, shortcuts opt-in',
                    context: 'Letter and number shortcuts help power users and clutter the ring for everyone else.',
                    decision: 'Arrows by default. Letters and numbers are independent opt-ins, hints show only what is enabled, and disabled commands are ignored by both the event tap and the ring model.',
                    tradeoff: 'Power users have to visit Settings once.',
                    result: 'No accidental key paths for the people who never open Settings.'
                },
                {
                    ref: 'ADR-004',
                    title: 'An empty window list is an answer, not a failure',
                    context: '<code>CGWindowListCopyWindowInfo</code> returns an empty array when nothing matches and <code>NULL</code> when the window server is unavailable. Collapsing both into an empty <code>Set</code> made a real result indistinguishable from a failed query.',
                    decision: 'Return an optional PID set. Empty is authoritative; <code>nil</code> means the query failed, and the unfiltered app list is preserved as a safe degraded result.',
                    tradeoff: 'An optional to thread through every call site.',
                    result: 'The filter stopped silently disabling itself in exactly the case it was written for.'
                },
                {
                    ref: 'ADR-007',
                    title: 'Ask for Automation only inside the fallback',
                    context: 'Settings used to scan running apps that might need the Apple Events path and show Allowed / Declined / Not requested for each, which made an optional recovery path read as required setup.',
                    decision: 'Remove the pre-scan. Request Automation at the moment the fallback actually runs, for the single app it needs.',
                    tradeoff: 'A permission prompt can appear in the middle of a gesture.',
                    result: 'People can decline every app and still switch, because the Window-menu path usually completes first.'
                },
                {
                    ref: 'ADR-008',
                    title: 'Instant ring is opt-in',
                    context: 'The deployment animation gives the ring a sense of origin, but it also delays the moment the complete set of targets becomes readable.',
                    decision: 'A “Show the ring instantly” toggle, off by default. When on, the scrim, trail, cards, center control, and preview container render in their final opening state; the hold threshold, selection, collapse, and thumbnail loading are untouched.',
                    tradeoff: 'A second rendering path to keep in sync with the first.',
                    result: 'Speed users get speed, and existing installs do not change under them.'
                },
                {
                    ref: 'ADR-006',
                    title: 'Source-available, not open source',
                    context: 'A public repository is how the project gets found, reviewed, and reported against. A permissive license would also allow a rebranded redistribution of the product itself.',
                    decision: 'Public source for transparency and reference; the compiled app free for personal use, including on a work machine; organizational deployment and derivative distribution need written permission.',
                    tradeoff: 'It is not OSI open source, and saying so plainly costs some goodwill.',
                    result: 'The repository can stay completely public without pretending that visibility prevents copying.'
                }
            ],
            constraints: [
                { title: 'Accessibility is the precondition', text: 'macOS will not report a modifier hold outside Orbit’s own windows without it. No permission, no product — so onboarding, not settings, is where it is asked for.' },
                { title: 'Previews are screen content', text: 'Live window thumbnails require Screen Recording, and macOS demands an app restart after it is granted.' },
                { title: 'Window titles are gated by the same permission', text: 'Screen Recording is also what makes titles readable, and titles are what the Window-menu path and cross-Space targets depend on. Without it, exact-window switching in browsers reaches the Apple Events fallback more often.' },
                { title: 'Every app exposes windows differently', text: 'There is no single API that reliably reaches a specific window inside an arbitrary application, which is why activation is a ladder rather than a call.' },
                { title: 'A summon must never interrupt typing', text: 'The trigger is a modifier key people already hold for other reasons, so the gate has to be able to change its mind.' },
                { title: 'Nothing leaves the Mac', text: 'No accounts, no analytics, no network calls, and zero third-party packages. AirDrop transfers are handed to macOS and never touch a server Orbit controls.' },
                { title: 'Ad-hoc signed, not notarized', text: 'Gatekeeper blocks a plain double-click on first launch, so the download path has to teach Control-click → Open. Notarization is on the roadmap, not in the build.' }
            ],
            failures: [
                {
                    title: 'The ring opened while typing',
                    observed: 'A hold that satisfied the long-press threshold during fast typing summoned the ring mid-sentence.',
                    cause: 'The gate measured how long the modifier was held. That is duration, not intent.',
                    fix: 'Cancel a pending summon when any other key, mouse button, or scroll gesture arrives before the hold completes.'
                },
                {
                    title: 'Cards that did nothing',
                    observed: 'Apps with no open window appeared as ordinary cards. Selecting one activated a process that put nothing on screen, and the preview panel said “No windows to preview.”',
                    cause: 'The ring was built from <code>activationPolicy == .regular</code> — the same test the Dock uses for its running indicator, which counts a process as present with zero windows.',
                    fix: 'Require at least one real window, decided by window layer, opacity, and a minimum size.',
                    ref: 'ADR-003'
                },
                {
                    title: 'The fix silently switched itself off',
                    observed: 'After the window filter shipped, windowless cards came back — precisely when there were no real windows to show.',
                    cause: 'A failed window-server query and a legitimately empty result were both returned as an empty <code>Set</code>, so the filter fell through to the unfiltered list.',
                    fix: 'Make the failure representable. Empty means empty; <code>nil</code> means the query failed and the app list is preserved.',
                    ref: 'ADR-004'
                },
                {
                    title: 'Optional permissions that read as required',
                    observed: 'General Settings listed running apps with Allowed / Declined / Not requested for Automation, so setup looked incomplete for everyone who had not answered every prompt.',
                    cause: 'A best-effort recovery path had been surfaced as configuration.',
                    fix: 'Drop the pre-scan and ask only when the fallback runs.',
                    ref: 'ADR-007'
                }
            ],
            evidence: {
                stats: [
                    { value: '140+', label: 'GitHub stars', note: 'Orbit alone' },
                    { value: '64', label: 'Unit tests', note: 'run on every push' },
                    { value: 'v1.7.0', label: 'Shipped release', note: 'build 8' },
                    { value: 'Universal 2', label: 'Release artifact', note: 'arm64 + x86_64' },
                    { value: '0', label: 'Third-party packages', note: 'SwiftUI and AppKit only' },
                    { value: '0', label: 'Network calls', note: 'no accounts, no telemetry' },
                    { value: '11', label: 'Interface languages', note: 'shipped in-app' },
                    { value: '8', label: 'Decision records', note: 'written before the code' }
                ],
                note: '<strong>Provenance.</strong> The radial concept came from <em>yuzeguitarist/Orbit</em> by Yuze Pan. I asked before starting; they declined source reuse and welcomed an independent take. This implementation was written from scratch on exactly those terms.',
                links: [
                    { label: 'Repository', href: 'https://github.com/ycl-2004/Orbit', text: 'github.com/ycl-2004/Orbit' },
                    { label: 'Releases', href: 'https://github.com/ycl-2004/Orbit/releases', text: 'Universal macOS build' },
                    { label: 'Decision records', href: 'https://github.com/ycl-2004/Orbit/tree/main/docs/decisions', text: 'docs/decisions' },
                    { label: 'Privacy policy', href: 'https://github.com/ycl-2004/Orbit/blob/main/PRIVACY.md', text: 'what Orbit reads and keeps' }
                ]
            }
        },
        'project-wisp': {
            label: 'System Breakdown',
            thesis: 'Capture before the panel → a context packet that admits what it missed → the provider you own.',
            frame: 'The hard part of Wisp is not calling a model. It is assembling an honest, bounded picture of what you are looking at — before Wisp&rsquo;s own window becomes the thing on screen — and then handing that to an endpoint the user controls rather than one Wisp owns.',
            map: {
                entry: 'Press ⌃⌥Space in any app',
                stages: [
                    ['shortcut'],
                    ['frontmost'],
                    ['screen', 'browser'],
                    ['packet'],
                    ['budget'],
                    ['cloud', 'cli'],
                    ['boundary']
                ]
            },
            nodes: {
                shortcut: {
                    title: 'Global Shortcut',
                    kind: 'input',
                    meta: '⌃⌥Space · standard or enhanced mode',
                    source: 'Support/AdvancedShortcut.swift',
                    flags: [{ label: 'Constraint', tone: 'constraint' }],
                    role: 'One key press has to work from inside whatever app you are already in.',
                    detail: [
                        { label: 'What it does', text: '<code>⌃⌥Space</code> by default, changeable in Settings. Enhanced mode additionally records Shift, Globe/Fn, modifier-only shortcuts, and double- or triple-tap sequences.' },
                        { label: 'The split', text: 'The standard shortcut needs no Accessibility permission. Enhanced mode has to observe keys while another app is frontmost, and that does.' },
                        { label: 'Decision', text: 'The permission is attached to the mode that needs it, not to the app. Someone who never wants a modifier-only shortcut never grants Accessibility.' }
                    ]
                },
                frontmost: {
                    title: 'Frontmost App Snapshot',
                    kind: 'core',
                    meta: 'recorded before the panel appears',
                    source: 'Capture/ContextCapture.swift',
                    flags: [{ label: 'Key decision', tone: 'decision' }],
                    role: 'The ordering decision the whole product depends on.',
                    detail: [
                        { label: 'The problem', text: 'An assistant panel that opens before it records its target becomes the subject of its own screenshot.' },
                        { label: 'Decision', text: 'Record the frontmost application first, then show the panel. The capture target is fixed before Wisp is anywhere on screen.' },
                        { label: 'Refresh policy', text: 'Context is refreshed at exactly three points: when the panel is shown, when the frontmost app changes while it is open, and before sending if the previous capture is older than 20 seconds or you have left the panel. Never while a response is generating.' },
                        { label: 'Why not always-on', text: 'The persistent island tracks the current app but does not continuously record the screen or run browser scripts. Capture is a thing you ask for.' }
                    ]
                },
                screen: {
                    title: 'Window Capture',
                    kind: 'branch',
                    meta: 'JPEG · memory by default',
                    source: 'Capture/ScreenCapturer.swift',
                    flags: [{ label: 'Constraint', tone: 'constraint' }],
                    role: 'The picture half of the context.',
                    detail: [
                        { label: 'What it does', text: 'Captures the frontmost application&rsquo;s window on the display where it lives, as JPEG.' },
                        { label: 'Constraint', text: 'A window screenshot is screen content, so this requires Screen Recording — and because releases are ad-hoc signed, each new build is a different code identity to macOS, which re-asks.' },
                        { label: 'Where the bytes go', text: 'Memory only for cloud and Ollama; the image is never written into the conversation file. A local CLI needs a file on disk, so it goes to a private per-request temporary directory that Wisp removes when the command ends.' }
                    ]
                },
                browser: {
                    title: 'Browser Text Extraction',
                    kind: 'branch',
                    meta: 'Apple Events + injected JavaScript',
                    source: 'Capture/BrowserTextExtractor.swift · PageTextScript.swift · ScrollDriver.swift',
                    flags: [{ label: 'Hard problem', tone: 'hard' }],
                    role: 'The genuinely difficult half — and the one with measurements behind it.',
                    detail: [
                        { label: 'What it does', text: 'For supported browsers — Chrome, Brave, Edge, Vivaldi, Yandex, Opera, Safari, Arc — reads the URL, title, selected text, and page body through Apple Events and injected JavaScript.' },
                        { label: 'The hard part', text: 'A virtually scrolled document only renders what is on screen. Measured on a Feishu doc: driving <code>scrollTop</code> from 0 to 3726 in JavaScript left the rendered rows at 12 and the body at 541 characters. A synthesised <code>WheelEvent</code> did nothing either — Chrome treats it as untrusted input.' },
                        { label: 'What worked', text: 'Real system scroll events injected through <code>CGEvent</code> on <code>.cghidEventTap</code>. The same document went from 10 rendered rows to 14, and from 697 characters to 1,227, over six scrolls — and collection could then reach the end.' },
                        { label: 'Trade-off', text: 'That path needs Accessibility and briefly borrows the pointer (returned where it was). So it is a setting, <code>captureMode</code>, and it is off by default.' }
                    ]
                },
                packet: {
                    title: 'Context Packet',
                    kind: 'core',
                    meta: 'what was read, and what was not',
                    source: 'Capture/ContextPacket.swift',
                    flags: [{ label: 'Key decision', tone: 'decision' }],
                    role: 'One value describing a single request — including its own gaps.',
                    detail: [
                        { label: 'What it carries', text: 'App name, bundle id, window title, URL, page title, page text, selected text, cross-origin iframe URLs, and the in-memory screenshot.' },
                        { label: 'The part that matters', text: 'It also carries what was <em>not</em> read. <code>pageTextIsPartial</code> — a virtual list that was not collected to the end — is a separate field from truncation by character limit. Both can be true at once, and conflating them would have made an incomplete page look like a merely long one.' },
                        { label: 'Typed, not phrased', text: 'A capture note carries a <code>needsUserAction</code> flag set by the code that produced it. The header does not decide urgency by keyword-matching a message, which would break silently in every language added afterwards.' },
                        { label: 'Why it is visible', text: 'The panel header shows the current app, browser info, screenshot and page-text status, and conversation count. The request boundary is something you can read before you send.' }
                    ]
                },
                budget: {
                    title: 'Prompt Budget',
                    kind: 'core',
                    meta: 'estimate → cut the longest section → re-measure',
                    source: 'LLM/ChatProvider.swift · Support/AppSettings.swift',
                    role: 'Fitting an unbounded page into a bounded context window without lying about it.',
                    detail: [
                        { label: 'Two caps, not one', text: 'Page text is limited to 60,000 characters by default. Each provider then declares its own token budget — 150,000 for Claude Code, 56,000 for AGY — measured against the real CLI rather than assumed.' },
                        { label: 'The fitting rule', text: 'Cut whichever section is currently longest, re-measure, repeat. If a round removes nothing, stop — so it never spins on content that cannot be cut further.' },
                        { label: 'Why head and tail', text: 'Truncation keeps the first 75% and the last 25%. The user&rsquo;s question sits at the end of a section and the context labels at the start, so the elision lands in the middle where it costs least.' },
                        { label: 'The estimate is deliberately high', text: 'CJK is counted one character per token, everything else four characters per token. Over-estimating means trimming visibly; under-estimating means a CLI drops content silently.' }
                    ]
                },
                cloud: {
                    title: 'Cloud & Ollama',
                    kind: 'branch',
                    meta: 'chat/completions · SSE · image_url',
                    source: 'LLM/OpenAICompatibleProvider.swift · CloudProvider.swift · OllamaSupport.swift',
                    role: 'The HTTP path, pointed wherever the user points it.',
                    detail: [
                        { label: 'What it does', text: 'Sends <code>chat/completions</code> with SSE streaming and <code>image_url</code> data URLs. OpenRouter, Google Gemini, OpenAI, Anthropic, Zhipu GLM, or any other compatible address. Ollama defaults to <code>localhost:11434/v1</code>, reads its model list, and marks the models that appear to support vision.' },
                        { label: 'Decision', text: 'One API key per provider, stored in the macOS Keychain rather than in the conversation JSON — so several providers stay configured side by side and switching never loses one.' },
                        { label: 'Errors are specific', text: 'A 429 distinguishes an upstream provider being full from your own rate limit, because the two need different advice and only one of them is your fault.' }
                    ]
                },
                cli: {
                    title: 'Local Agent CLI',
                    kind: 'branch',
                    meta: 'Codex · Antigravity · Claude Code',
                    source: 'LLM/CodexCLIProvider.swift · AgyCLIProvider.swift · ClaudeCodeCLIProvider.swift',
                    flags: [{ label: 'Hard problem', tone: 'hard' }],
                    role: 'Reusing a login the Mac already has, without handing it the Mac.',
                    detail: [
                        { label: 'What it does', text: 'Runs the CLI already installed and authenticated locally, so there is no second API key to manage.' },
                        { label: 'Isolation', text: 'Each runs in its own temporary working directory. Codex uses <code>--ephemeral</code> with a read-only sandbox; Claude Code runs <code>--restricted --tools Read --no-session-persistence</code>, so its file tool can only reach the screenshot Wisp placed in that workspace. None of them writes session files into Wisp&rsquo;s conversation directory.' },
                        { label: 'Only one streams', text: 'Claude Code returns <code>text_delta</code> events and the answer is shown as it is written; Codex and AGY return one finished block. <code>thinking_delta</code>, <code>signature_delta</code>, and <code>input_json_delta</code> are dropped, so reasoning and tool arguments never reach the answer.' },
                        { label: 'Testing costs nothing', text: '<code>claude auth status</code> answers both &ldquo;installed&rdquo; and &ldquo;signed in&rdquo; in about a fifth of a second and spends no model quota. A missing login gets its own error instead of surfacing as a failed first question.' }
                    ]
                },
                boundary: {
                    title: 'Trust Boundary',
                    kind: 'edge',
                    meta: 'network · Keychain · local JSON',
                    source: 'Store/ConversationStore.swift · Store/KeychainStore.swift',
                    flags: [{ label: 'Constraint', tone: 'constraint' }],
                    role: 'The line Wisp does not get to move, stated rather than implied.',
                    detail: [
                        { label: 'What leaves', text: 'With a cloud provider, the page text you captured and the current window screenshot go to the Base URL you configured. That service&rsquo;s logging and retention are outside Wisp&rsquo;s control, and the exclusion list takes bundle identifiers — it is per app, not per site.' },
                        { label: 'What is stored', text: 'Conversations are readable JSON under Application Support. API keys live in the Keychain, outside that directory. Screenshots are never written into the conversation file.' },
                        { label: 'What is guarded', text: 'A conversation file written by a newer version of Wisp is refused rather than overwritten, and a damaged record costs you that record instead of the whole history.' },
                        { label: 'What does not exist', text: 'No account system, no sync service, no analytics SDK, no crash-reporting SDK, no background recording. The optional update check asks GitHub once per launch for a release tag, downloads nothing, and can be switched off entirely.' }
                    ]
                }
            },
            build: {
                graph: {
                    summary: 'Arrows point from consumer to dependency; the number is how many times the target is named in the source. <code>LLM/</code> sits at the bottom because the provider types are what everything else is written in terms of — including <code>Support/AppSettings</code> and <code>Store/KeychainStore</code>, which is the &ldquo;one key per provider&rdquo; decision showing up as a dependency rather than a claim.',
                    nodes: [
                        { id: 'app', label: 'App/', kind: 'input', meta: '2 files · 275 lines', note: 'Entry point and the menu-bar delegate. 275 lines total.' },
                        { id: 'ui', label: 'UI/', kind: 'core', meta: '15 files · 5,186 lines', note: 'Panel, island, chat, settings. Over half the codebase.' },
                        { id: 'capture', label: 'Capture/', kind: 'edge', meta: '7 files · 1,473 lines', note: 'Screenshot, browser text, and the context packet.' },
                        { id: 'store', label: 'Store/', kind: 'branch', meta: '3 files · 575 lines', note: 'Conversation JSON and the Keychain.' },
                        { id: 'support', label: 'Support/', kind: 'branch', meta: '5 files · 1,141 lines', note: 'Settings, shortcuts, permissions, lifecycle.' },
                        { id: 'llm', label: 'LLM/', kind: 'core', meta: '11 files · 2,219 lines', note: 'Five providers behind one protocol. Nothing here reaches upward.' }
                    ],
                    edges: [
                        { from: 'app', to: 'ui', label: '13', weight: 13 },
                        { from: 'app', to: 'support', label: '12', weight: 12 },
                        { from: 'app', to: 'store', label: '4', weight: 4 },
                        { from: 'ui', to: 'support', label: '38', weight: 38 },
                        { from: 'ui', to: 'llm', label: '33', weight: 33 },
                        { from: 'ui', to: 'store', label: '16', weight: 16 },
                        { from: 'ui', to: 'capture', label: '13', weight: 13 },
                        { from: 'capture', to: 'support', label: '9', weight: 9 },
                        { from: 'store', to: 'support', label: '13', weight: 13 },
                        { from: 'store', to: 'llm', label: '6', weight: 6 },
                        { from: 'support', to: 'llm', label: '14', weight: 14 }
                    ]
                },
                drill: {
                    llm: {
                        title: 'LLM/',
                        summary: 'One protocol, five implementations. <code>ChatProvider</code> is named 22, 23, 19, and 14 times by the four providers that conform to it — the abstraction is load-bearing, not decorative. <code>ChatProvider</code> also holds the shared <code>fit()</code> truncation and token estimate, which is why every provider gets the same trimming behaviour for free.',
                        nodes: [
                            { id: 'proto', label: 'ChatProvider', kind: 'core', meta: '311 lines', note: 'The protocol, the error enum, and the shared prompt-fitting.' },
                            { id: 'claude', label: 'ClaudeCodeCLIProvider', kind: 'branch', meta: '400 lines', note: 'The only streaming provider. Drops thinking and tool deltas.' },
                            { id: 'agy', label: 'AgyCLIProvider', kind: 'branch', meta: '394 lines', note: 'Antigravity headless JSON. 56,000-token budget.' },
                            { id: 'codex', label: 'CodexCLIProvider', kind: 'branch', meta: '324 lines', note: 'codex exec --json --ephemeral --sandbox read-only.' },
                            { id: 'openai', label: 'OpenAICompatibleProvider', kind: 'branch', meta: '189 lines', note: 'chat/completions with SSE and image_url.' },
                            { id: 'cloud', label: 'CloudProvider', kind: 'edge', meta: '189 lines', note: 'The named endpoints Settings offers.' },
                            { id: 'catalog', label: 'ModelCatalog', kind: 'edge', meta: '69 lines', note: 'Model lists per provider.' },
                            { id: 'sse', label: 'SSEParser', kind: 'edge', meta: '57 lines', note: 'Server-sent event framing.' },
                            { id: 'kind', label: 'ProviderKind', kind: 'edge', meta: '62 lines', note: 'The identity Settings and the Keychain key off.' }
                        ],
                        edges: [
                            { from: 'claude', to: 'proto', label: '22' },
                            { from: 'agy', to: 'proto', label: '23' },
                            { from: 'codex', to: 'proto', label: '19' },
                            { from: 'openai', to: 'proto', label: '14' },
                            { from: 'openai', to: 'sse', label: '2' },
                            { from: 'agy', to: 'catalog', label: '4' },
                            { from: 'catalog', to: 'cloud', label: '2' },
                            { from: 'openai', to: 'kind', label: '1' }
                        ]
                    },
                    capture: {
                        title: 'Capture/',
                        summary: '<code>ContextCapture</code> orchestrates; <code>BrowserTextExtractor</code> does the hard part and reaches three ways — the injected page script, the Chrome profile inspector, and <code>ScrollDriver</code>, the trusted-event path that exists because JavaScript scrolling could not make a virtual list render more of itself. Everything converges on <code>ContextPacket</code>, which is the only thing that leaves this folder.',
                        nodes: [
                            { id: 'capturer', label: 'ContextCapture', kind: 'input', meta: '298 lines', note: 'Records the frontmost app, then assembles one packet.' },
                            { id: 'browser', label: 'BrowserTextExtractor', kind: 'core', meta: '465 lines', note: 'Apple Events plus injected JavaScript, per browser.' },
                            { id: 'script', label: 'PageTextScript', kind: 'branch', meta: '244 lines', note: 'The JavaScript that reads title, selection, body, iframes.' },
                            { id: 'scroll', label: 'ScrollDriver', kind: 'edge', meta: '104 lines', note: 'CGEvent scrolls on .cghidEventTap. Off by default.' },
                            { id: 'chrome', label: 'ChromeProfileInspector', kind: 'branch', meta: '112 lines', note: 'Finds the profile whose JavaScript switch matters.' },
                            { id: 'screen', label: 'ScreenCapturer', kind: 'edge', meta: '130 lines', note: 'The window screenshot. Needs Screen Recording.' },
                            { id: 'packet', label: 'ContextPacket', kind: 'core', meta: '120 lines', note: 'What was read — and, separately, what was not.' }
                        ],
                        edges: [
                            { from: 'capturer', to: 'browser', label: '8' },
                            { from: 'capturer', to: 'screen', label: '1' },
                            { from: 'capturer', to: 'packet', label: '6' },
                            { from: 'browser', to: 'script', label: '7' },
                            { from: 'browser', to: 'scroll', label: '6' },
                            { from: 'browser', to: 'chrome', label: '2' },
                            { from: 'browser', to: 'packet', label: '8' }
                        ]
                    },
                    ui: {
                        title: 'UI/',
                        summary: 'The island and the panel are separate controllers over a shared layout: <code>IslandLayout</code> is named 15, 11, 9, 6, and 5 times across five files, which is what keeps a draggable island and a resizable panel from drifting apart. <code>SettingsView</code> at 1,411 lines is the largest file in the project.',
                        nodes: [
                            { id: 'panel', label: 'PanelController', kind: 'input', meta: '309 lines', note: 'The floating assistant panel window.' },
                            { id: 'islandc', label: 'IslandController', kind: 'input', meta: '244 lines', note: 'The persistent island — drag, notch, restore.' },
                            { id: 'assistant', label: 'AssistantModel', kind: 'core', meta: '443 lines', note: 'Request state, streaming, and the current context.' },
                            { id: 'chat', label: 'ChatView', kind: 'branch', meta: '507 lines', note: 'The conversation surface.' },
                            { id: 'settings', label: 'SettingsView', kind: 'branch', meta: '1,411 lines', note: 'Model, permissions, shortcuts, general.' },
                            { id: 'header', label: 'ContextHeaderView', kind: 'branch', meta: '217 lines', note: 'What was captured for this request.' },
                            { id: 'design', label: 'DesignKit', kind: 'edge', meta: '228 lines', note: 'Tokens. Named 32, 20, 19, 12 times by the views.' },
                            { id: 'layout', label: 'IslandLayout', kind: 'edge', meta: '105 lines', note: 'Geometry shared by island and panel.' }
                        ],
                        edges: [
                            { from: 'panel', to: 'assistant', label: '12' },
                            { from: 'panel', to: 'islandc', label: '3' },
                            { from: 'islandc', to: 'layout', label: '15' },
                            { from: 'chat', to: 'design', label: '32' },
                            { from: 'chat', to: 'assistant', label: '3' },
                            { from: 'chat', to: 'layout', label: '6' },
                            { from: 'header', to: 'design', label: '20' },
                            { from: 'settings', to: 'layout', label: '9' },
                            { from: 'design', to: 'layout', label: '4' }
                        ]
                    },
                    store: {
                        title: 'Store/',
                        summary: 'Three files, three separate storage promises: conversations as readable JSON, API keys in the Keychain, and never the two mixed. <code>ConversationStore</code> names <code>Conversation</code> 14 times because the version probe and the tolerant decoder both work on the same shape.',
                        nodes: [
                            { id: 'cstore', label: 'ConversationStore', kind: 'core', meta: '256 lines', note: 'Version probe, tolerant decode, refuse-newer-file.' },
                            { id: 'conv', label: 'Conversation', kind: 'branch', meta: '230 lines', note: 'The on-disk shape, with its schema version.' },
                            { id: 'keychain', label: 'KeychainStore', kind: 'edge', meta: '89 lines', note: 'One key per provider, outside the JSON.' }
                        ],
                        edges: [{ from: 'cstore', to: 'conv', label: '14' }]
                    },
                    support: {
                        title: 'Support/',
                        summary: '<code>AppSettings</code> is the file that reaches into <code>LLM/</code> — it names <code>CloudProvider</code> 7 times and <code>ProviderKind</code> 5 times, because a setting here is &ldquo;which provider, and its key&rdquo;. <code>AdvancedShortcut</code> is the larger file: modifier-only and multi-tap detection is more code than the standard shortcut it sits beside.',
                        nodes: [
                            { id: 'settings', label: 'AppSettings', kind: 'core', meta: '391 lines', note: 'Provider choice, limits, capture mode, page-text cap.' },
                            { id: 'shortcut', label: 'AdvancedShortcut', kind: 'branch', meta: '436 lines', note: 'Shift, Globe/Fn, modifier-only, double and triple tap.' },
                            { id: 'lifecycle', label: 'AppLifecycle', kind: 'branch', meta: '193 lines', note: 'Launch at login and restart prompts.' },
                            { id: 'geometry', label: 'ScreenGeometry', kind: 'edge', meta: '83 lines', note: 'Display and notch maths for island placement.' },
                            { id: 'perm', label: 'Permissions', kind: 'edge', meta: '38 lines', note: 'Screen Recording, Automation, Accessibility state.' }
                        ],
                        edges: [
                            { from: 'shortcut', to: 'settings', label: '2' },
                            { from: 'lifecycle', to: 'settings', label: '2' }
                        ]
                    }
                },
                practice: [
                    {
                        title: 'The provider protocol is the load-bearing abstraction',
                        text: 'Four providers name <code>ChatProvider</code> 22, 23, 19, and 14 times. Prompt fitting and the token estimate live on the protocol rather than in each implementation, so adding a fifth provider inherits the truncation behaviour instead of re-implementing it — and the CI tests that cover truncation cover all of them at once.'
                    },
                    {
                        title: 'CI gates the four things the UI cannot show',
                        text: 'GitHub Actions runs the XCTest target, builds both Release architectures, verifies the signature, and rejects any package carrying <code>com.apple.security.get-task-allow</code>. The tests cover Claude Code tool isolation, stream-result and auth parsing, prompt truncation, and private temporary-directory cleanup — the places where a regression would look identical to correct behaviour from the outside.'
                    },
                    {
                        title: 'Comments carry the measurement, not the description',
                        text: '<code>ScrollDriver</code>&rsquo;s header records the numbers that justify it existing: <code>scrollTop</code> 0 → 3726 left rendered rows at 12 and body text at 541 characters, while six real <code>CGEvent</code> scrolls took the same document to 14 rows and 1,227 characters. The permission cost is written in the same comment, which is why the feature ships off by default.'
                    },
                    {
                        title: 'One vendored dependency, named',
                        text: 'The project has exactly one third-party package — <code>KeyboardShortcuts 2.4.0</code> — and it is reproduced with its licence in <code>THIRD-PARTY-NOTICES.txt</code>. Everything else is SwiftUI, AppKit, and Foundation.'
                    }
                ]
            },
            decisions: [
                {
                    ref: 'Capture',
                    title: 'The panel opens after the capture, not before',
                    context: 'An assistant that screenshots the current window is competing with itself: the moment its panel appears, the panel is what is on screen.',
                    decision: 'Record the frontmost application on the shortcut, capture against that target, and only then present the panel.',
                    tradeoff: 'The capture cannot use anything the panel would have told it, so the target has to be resolved from system state alone.',
                    result: 'The screenshot is always of the thing you were looking at when you asked.'
                },
                {
                    ref: 'Semantics',
                    title: '“Not read” is a field, not a phrasing',
                    context: 'A page cut by the character cap and a page whose virtual list was never collected to the end are different facts, and a localized status string is not a place to encode either.',
                    decision: '<code>pageTextIsPartial</code> is separate from character truncation and both can be true at once; a capture note carries a <code>needsUserAction</code> flag set at the point it is created.',
                    tradeoff: 'More state to thread from the capture layer into the header.',
                    result: 'The model is told what it did not get, and the header cannot lose its urgency check to a new translation.'
                },
                {
                    ref: 'Scroll',
                    title: 'Trusted scroll events, off by default',
                    context: 'Virtually scrolled documents ignore untrusted input. Measured: JavaScript <code>scrollTop</code> and synthetic <code>WheelEvent</code> both left the rendered content unchanged.',
                    decision: 'Inject real <code>CGEvent</code> scrolls on <code>.cghidEventTap</code> to make the page render more of itself, behind an explicit <code>captureMode</code> setting.',
                    tradeoff: 'It needs Accessibility and briefly borrows the pointer, which is too much to take by default.',
                    result: 'People who need full page text from a virtual list can have it; everyone else is never asked for the permission.'
                },
                {
                    ref: 'Providers',
                    title: 'The model connection belongs to the user',
                    context: 'A desktop assistant can either resell a model or be a shell around one the user already has.',
                    decision: 'Support OpenAI-compatible HTTP, Ollama, and the Agent CLI logins already on the Mac — with one key per provider in the Keychain so several stay configured at once.',
                    tradeoff: 'Five provider paths to maintain, each with its own errors, streaming shape, and token budget.',
                    result: 'No account, no proxy, no key of Wisp&rsquo;s in the middle of your request.'
                },
                {
                    ref: 'Isolation',
                    title: 'A local CLI gets a workspace, not the disk',
                    context: 'Handing a screenshot to a local agent CLI means giving a process with file tools something to read.',
                    decision: 'Each CLI runs in its own temporary working directory with the narrowest flags it offers — <code>--ephemeral</code> and a read-only sandbox for Codex, <code>--restricted --tools Read --no-session-persistence</code> for Claude Code — and the directory is removed when the request ends.',
                    tradeoff: 'Claude Code refuses files outside its workspace, so the working directory has to be the screenshot directory rather than anywhere convenient.',
                    result: 'The only file the agent can reach is the one Wisp put there for this request.'
                },
                {
                    ref: 'Budget',
                    title: 'Over-estimate tokens on purpose',
                    context: 'A CLI that quietly drops the end of an over-long prompt produces an answer that looks complete and is not.',
                    decision: 'Estimate CJK at one character per token and everything else at four, then fit by cutting the longest section until it is under budget.',
                    tradeoff: 'Some prompts get trimmed that would in fact have fitted.',
                    result: 'Trimming is visible and ours; silent truncation downstream is not possible.'
                },
                {
                    ref: 'Storage',
                    title: 'Refuse a newer file rather than overwrite it',
                    context: 'Conversations are plain JSON on disk, which means a future version of Wisp — or a synced copy — can write a schema this build does not understand.',
                    decision: 'Probe the file version first. A newer file is refused and set aside rather than replaced, and decoding is tolerant enough that one damaged record costs only that record.',
                    tradeoff: 'A version probe and a tolerant decoder instead of one <code>JSONDecoder</code> call.',
                    result: 'Downgrading, or opening the same file twice, does not destroy history.'
                }
            ],
            constraints: [
                { title: 'Screen Recording gates every capture', text: 'A window screenshot is screen content. Without the permission there is no picture at all, only text context.' },
                { title: 'Page body needs Automation and a browser setting', text: 'Reading the page requires Automation permission plus the browser profile&rsquo;s <em>Allow JavaScript from Apple Events</em>. Chrome stores that setting per profile. Without both, the context degrades explicitly to URL and screenshot.' },
                { title: 'Cross-origin iframe text cannot be read', text: 'It is reported as unavailable rather than silently omitted, so the model does not assume the page was read whole.' },
                { title: 'Ad-hoc signing resets permissions on every update', text: 'Each build has a different code identity, and macOS binds Screen Recording, Automation, and Keychain access to that identity. This goes away only with Developer ID signing and notarization.' },
                { title: 'Exclusions are per bundle identifier', text: 'There is currently no way to exempt one URL or domain while still using Wisp in that browser.' },
                { title: 'Enhanced shortcuts need Accessibility', text: 'Observing Shift, Globe/Fn, modifier-only, or multi-tap keys while another app is active requires it. The standard shortcut does not, and that is why the two are separate modes.' },
                { title: 'A cloud provider sees the page and the screenshot', text: 'Its logs, retention, and privacy policy are outside Wisp&rsquo;s control, and the README says so on the first screen rather than in a footnote.' }
            ],
            failures: [
                {
                    title: 'JavaScript scrolling collected nothing',
                    observed: 'On a Feishu document, driving the scroll container&rsquo;s <code>scrollTop</code> from 0 to 3726 left the rendered rows at 12 and the body text at 541 characters. A synthesised <code>WheelEvent</code> was equally ineffective.',
                    cause: 'The virtual list only re-renders for input the browser considers trusted, and Chrome does not trust a synthesised wheel event.',
                    fix: 'Inject real system scrolls through <code>CGEvent</code> on <code>.cghidEventTap</code>. Six scrolls took the same document from 10 rendered rows to 14 and 697 characters to 1,227, and collection could reach the end.',
                    ref: 'measured'
                },
                {
                    title: 'A truncated page and an incomplete page looked identical',
                    observed: 'Page text that stopped early because a virtual list was never collected to the end presented exactly like page text cut by the character cap.',
                    cause: 'One flag was being asked to carry two different facts about the same string.',
                    fix: '<code>pageTextIsPartial</code> became its own field alongside character truncation, and both can be set at once.'
                },
                {
                    title: 'An update stopped capture and re-asked for permissions',
                    observed: 'After installing a new build, Screen Recording and Automation grants were gone and the saved API key prompted again.',
                    cause: 'Releases are ad-hoc signed, so every build has a different code identity, and macOS binds those grants and Keychain items to it.',
                    fix: 'Documented as its own FAQ entry with the re-grant path, and named honestly as a workaround: the actual fix is Developer ID signing and notarization, which has not shipped.'
                },
                {
                    title: 'A supported browser returned a screenshot and no text',
                    observed: 'The header showed a captured screenshot but no page body, on a browser that is on the supported list.',
                    cause: 'Automation not granted, the profile&rsquo;s <em>Allow JavaScript from Apple Events</em> switch off, or a browser-internal <code>chrome://</code> page.',
                    fix: 'Report the reason as a blocking capture note that the header can surface, and fall back explicitly to URL and screenshot context rather than sending an empty body as though the page were blank.'
                }
            ],
            evidence: {
                stats: [
                    { value: '30+', label: 'GitHub stars', note: 'first month public' },
                    { value: 'v0.3.0', label: 'Shipped release', note: 'build 5' },
                    { value: '5', label: 'Model providers', note: 'HTTP · Ollama · 3 CLIs' },
                    { value: '14', label: 'Regression tests', note: 'run in CI on push' },
                    { value: 'Universal 2', label: 'Release artifact', note: 'arm64 + x86_64' },
                    { value: '1', label: 'Third-party package', note: 'KeyboardShortcuts 2.4.0' },
                    { value: '2', label: 'Interface languages', note: 'follows system locale' },
                    { value: 'MIT', label: 'License', note: 'source and app' }
                ],
                note: '<strong>What CI actually gates.</strong> GitHub Actions runs the XCTest target, builds both Release architectures, verifies the signature, and rejects any package carrying <code>com.apple.security.get-task-allow</code>. The tests cover Claude Code tool isolation, stream-result and auth parsing, prompt truncation, and private temporary-directory cleanup — the four places where a regression would be invisible from the UI.',
                links: [
                    { label: 'Repository', href: 'https://github.com/ycl-2004/Wisp', text: 'github.com/ycl-2004/Wisp' },
                    { label: 'Releases', href: 'https://github.com/ycl-2004/Wisp/releases', text: 'Universal macOS build' },
                    { label: 'Release notes', href: 'https://github.com/ycl-2004/Wisp/blob/main/CHANGELOG.md', text: 'CHANGELOG.md' },
                    { label: 'Privacy policy', href: 'https://github.com/ycl-2004/Wisp/blob/main/PRIVACY.md', text: 'what leaves the Mac, and when' }
                ]
            }
        },
        'project-foldpeek': {
            label: 'System Breakdown',
            thesis: 'Finder selection → bounded read-only index → inert preview.',
            frame: 'FoldPeek renders bytes it did not choose, from files it was handed, inside a sandbox stricter than an app&rsquo;s. Almost every decision in it is about what <em>not</em> to do with those bytes.',
            map: {
                entry: 'Select a folder in Finder and press Space',
                stages: [
                    ['selection'],
                    ['scope'],
                    ['scanner'],
                    ['tree'],
                    ['inert', 'apple'],
                    ['paper'],
                    ['sandbox']
                ]
            },
            nodes: {
                selection: {
                    title: 'Finder Selection',
                    kind: 'input',
                    meta: 'public.folder + public.directory only',
                    source: 'FoldPeekPreviewExtension/Info.plist',
                    flags: [{ label: 'Constraint', tone: 'constraint' }],
                    role: 'The only entry point, and deliberately the narrowest one available.',
                    detail: [
                        { label: 'What it does', text: 'Finder hands the Quick Look extension a directory URL when you press Space on a folder.' },
                        { label: 'The registration', text: 'The extension registers <code>public.folder</code> and <code>public.directory</code> and nothing else. FoldPeek never becomes the previewer for a file type it did not ask for.' },
                        { label: 'Why it matters', text: 'Scope is the first security control. Every format FoldPeek later reads gets there because a person expanded a folder and clicked a row, not because the extension claimed the type.' }
                    ]
                },
                scope: {
                    title: 'Security-Scoped Access',
                    kind: 'core',
                    meta: 'held while the panel lives · released in deinit',
                    source: 'FoldPeekPreviewController.swift',
                    flags: [{ label: 'Key decision', tone: 'decision' }],
                    role: 'Holding permission for exactly as long as it is needed, and not one moment longer.',
                    detail: [
                        { label: 'Why it is not trivial', text: 'The reads that matter — subfolders, file bodies — happen <em>after</em> the initial preview request returns. Access therefore has to outlive that call, which is exactly the shape that tends to become &ldquo;hold it forever&rdquo;.' },
                        { label: 'Decision', text: 'Take security-scoped access when the panel appears and release it in <code>deinit</code>. The lifetime is the panel&rsquo;s, stated as an invariant in the development notes.' },
                        { label: 'Symbolic links', text: 'The selected root is refused when it is a symlink. Links inside the tree are shown as entries but never treated as traversable directories.' }
                    ]
                },
                scanner: {
                    title: 'Bounded Directory Scan',
                    kind: 'core',
                    meta: '2,000 per directory · 20,000 per panel · depth 8',
                    source: 'Shared/DirectoryScanner.swift',
                    flags: [{ label: 'Constraint', tone: 'constraint' }],
                    role: 'Reading a directory someone else made, on the assumption that they were not being kind.',
                    detail: [
                        { label: 'What it does', text: 'Enumerates exactly one directory level, skipping hidden files, package descendants, and subdirectory descendants. Recursion happens only through an explicit row expansion.' },
                        { label: 'Hard bounds', text: '2,000 entries per directory, 20,000 per preview panel, 8 levels of expansion — and every limit is a named constant next to the code that enforces it, not a number in a document.' },
                        { label: 'The framing', text: 'A folder with a million entries is not an edge case to handle later. It is the case, because the input is chosen by whoever made the folder.' }
                    ]
                },
                tree: {
                    title: 'Lazy Index & Filter',
                    kind: 'core',
                    meta: 'expand on click · the filter never reads disk',
                    source: 'FoldPeekPreviewExtension/FolderNode.swift',
                    flags: [{ label: 'Key decision', tone: 'decision' }],
                    role: 'A folder index that stays cheap no matter what you type into it.',
                    detail: [
                        { label: 'What it does', text: 'The first level appears immediately; a subfolder is read only when you expand its row. Entries are grouped by kind — folders, documents, sheets, slides, images, video, audio, code, text, data, archives — each under a headed rule in its own colour, with a legend strip that doubles as a jump target.' },
                        { label: 'The rule that matters', text: 'The filter operates only on nodes already in memory. A keystroke never reads a directory.' },
                        { label: 'Why', text: 'If search could walk the tree, one keystroke would bypass the depth cap and the item budget, and every bound above it would be decorative.' }
                    ]
                },
                inert: {
                    title: 'In-Process Inert Readers',
                    kind: 'branch',
                    meta: 'text · code · Markdown · PDF · images · workbooks',
                    source: 'Shared/FilePreviewLoader.swift · CodeHighlighter.swift · MarkdownRenderer.swift · ZipArchive.swift · XMLScanner.swift · WorkbookReader.swift',
                    flags: [{ label: 'Hard problem', tone: 'hard' }],
                    role: 'Everything FoldPeek parses itself, written so that parsing cannot become executing.',
                    detail: [
                        { label: 'What they are', text: 'Text through a bounded <code>FileHandle</code>; code and Markdown through forward-only scanners; images through ImageIO capped at 2,048 px; PDF through PDFKit; Office containers through a hand-written ZIP and XML reader that asks for entries by exact name.' },
                        { label: 'The invariant', text: 'A scanner may classify characters already held and style them. It may never hand the file to a document engine — <code>NSAttributedString(markdown:)</code> included — resolve a reference it finds, or use a regular expression whose backtracking a hostile file could drive.' },
                        { label: 'Never emitted', text: 'No <code>.link</code> attribute and no <code>NSTextAttachment</code>. A rendered link stays visible text and an image reference stays a placeholder, because loading either would mean following a path the file chose.' },
                        { label: 'The XML detail', text: '<code>XMLScanner</code> has no DTD support and defines no entities, so a declared entity is skipped rather than expanded. The expansion attacks a general parser must defend against have nothing here to work on.' },
                        { label: 'Why workbooks at all', text: 'A twenty-sheet file has nineteen sheets that no picture of the first will ever show. It is the one document kind the embedded page image cannot serve, so it earned its own bounded reader.' }
                    ]
                },
                apple: {
                    title: 'Apple’s Readers',
                    kind: 'branch',
                    meta: 'AppKit documents · system thumbnail service',
                    source: 'Shared/RichDocumentReader.swift · SystemPageRenderer.swift',
                    flags: [{ label: 'Hard problem', tone: 'hard' }, { label: 'Key decision', tone: 'decision' }],
                    role: 'Two readers this project does not own, and the rules that keep them from choosing for themselves.',
                    detail: [
                        { label: 'The control', text: 'Word, RTF, and OpenDocument files are read by <code>NSAttributedString</code> with <code>.documentType</code> stated explicitly from the file extension. This is the security control, not a convenience: without it, <code>NSAttributedString</code> infers the reader from the bytes and can select the WebKit-backed HTML reader, which loads remote resources.' },
                        { label: 'After reading', text: '<code>.link</code>, <code>.toolTip</code>, and <code>.cursor</code> attributes are stripped, the text is re-typed into the project&rsquo;s own faces, and attachment sizes are capped.' },
                        { label: 'Everything else', text: 'Handed to <code>QLThumbnailGenerator</code> as a URL — out of process, in Apple&rsquo;s own sandbox. Only <code>.thumbnail</code> is requested, never an icon representation, so a generic document icon is never shown as though it were content. The request is cancelled on timeout so a stuck service cannot hold the pane.' },
                        { label: 'PDF specifics', text: 'An encrypted document is refused rather than unlocked — FoldPeek never prompts for a password. Link clicks are swallowed by a dedicated delegate object, which is also why the view is not its own delegate: on current macOS, a PDFView reading its own weak delegate during a scale change crashes.' }
                    ]
                },
                paper: {
                    title: 'Paper Surface',
                    kind: 'core',
                    meta: 'fixed palette · colour carries a role',
                    source: 'PaperTheme.swift · PaperViews.swift · CodeTextView.swift',
                    role: 'A deliberate design system rather than a set of semantic system colours.',
                    detail: [
                        { label: 'What it is', text: 'Cream paper, wine identity accents, denim structure, serif prose, monospaced technical detail — a fixed light palette that deliberately does not follow Dark Mode.' },
                        { label: 'The rule', text: 'Colour carries a role, not a decoration: wine is identity and judgement, denim is structure and anything technical, ink is body. Wine never signals an error. A theme and system semantic colours are never mixed within one surface.' },
                        { label: 'Prose and source get opposite treatments', text: 'Source keeps the gutter, indent guides, and the ruled grain. Prose drops all three and is held to a reading width.' },
                        { label: 'A drawing detail worth the trouble', text: 'Block decorations are drawn, not coloured. A <code>.backgroundColor</code> attribute paints per glyph run and leaves a ragged edge on short lines, so fenced code panels, table rules, and quote bars are drawn from range attributes — and each marked span is expanded to its longest effective range first, because AppKit redraws in horizontal bands and would otherwise produce one shape per band instead of one per span.' }
                    ]
                },
                sandbox: {
                    title: 'Sandbox Boundary',
                    kind: 'edge',
                    meta: 'read-only · one named exception · no network',
                    source: 'FoldPeekApp.entitlements · FoldPeekPreviewExtension.entitlements',
                    flags: [{ label: 'Constraint', tone: 'constraint' }],
                    role: 'The entitlement list, kept short enough to read in one breath.',
                    detail: [
                        { label: 'Host app', text: '<code>com.apple.security.app-sandbox</code>. That is the entire list — the host exists only to explain how to enable the extension.' },
                        { label: 'Extension', text: 'The sandbox, plus <code>files.user-selected.read-only</code>, plus one temporary mach-lookup exception naming a single Apple service: <code>com.apple.quicklook.ThumbnailsAgent</code>.' },
                        { label: 'Why that exception exists', text: 'An app extension&rsquo;s sandbox is stricter than an app&rsquo;s and denies the XPC connection <code>QLThumbnailGenerator</code> requires. Every request failed with <code>NSXPCConnectionInvalid</code> (4099) before a file was ever considered. The exception names one service, grants no network access, and does not widen file access.' },
                        { label: 'What is not there', text: 'No network, Apple Events, automation, accessibility, broad filesystem access, login items, LaunchAgents, URL schemes, or shell-script build phases. A sandboxed Quick Look extension also cannot open a URL or launch an app — <code>NSExtensionContext.openURL</code> and <code>NSWorkspace.open</code> were both measured returning false and launching nothing.' }
                    ]
                }
            },
            build: {
                graph: {
                    summary: 'Two sandboxed targets and a shared reader layer. The host app has <strong>no edge at all</strong> — it shares zero code with the extension, which is the point: it is 50 lines whose only job is to explain how to enable the Quick Look extension. The one arrow back up, <code>Shared/</code> → the extension, is <code>RichDocumentReader</code> reaching for <code>PaperTheme</code>, because a Word file is re-typed into the project&rsquo;s own faces rather than keeping its own.',
                    nodes: [
                        { id: 'host', label: 'FoldPeekApp/', kind: 'input', meta: '2 files · 50 lines', row: 0, note: 'The host app. Sandbox entitlement only, and no code in common with the extension.' },
                        { id: 'ext', label: 'FoldPeekPreviewExtension/', kind: 'core', meta: '12 files · 3,940 lines', note: 'The Quick Look controller, the index, and the paper surface.' },
                        { id: 'shared', label: 'Shared/', kind: 'edge', meta: '11 files · 1,747 lines', note: 'Every reader that touches an untrusted byte.' }
                    ],
                    edges: [
                        { from: 'ext', to: 'shared', label: '31', weight: 31 },
                        { from: 'shared', to: 'ext', label: '8', weight: 8 }
                    ]
                },
                drill: {
                    ext: {
                        title: 'FoldPeekPreviewExtension/',
                        summary: '<code>PaperTheme</code> is named by ten of the twelve files here — 31, 29, 22, 13, 13, 13, 8, 8, 6, 3 times. That is what &ldquo;colour carries a role, not a decoration&rdquo; looks like in the dependency graph: there is one place a colour can come from, so wine cannot quietly start meaning error somewhere.',
                        nodes: [
                            { id: 'ctrl', label: 'FoldPeekPreviewController', kind: 'input', meta: '626 lines', note: 'Quick Look entry point, index pane, and search.' },
                            { id: 'node', label: 'FolderNode', kind: 'core', meta: '147 lines', note: 'Lazy tree, item budget, in-memory filter.' },
                            { id: 'pane', label: 'PreviewPaneView', kind: 'core', meta: '467 lines', note: 'Title, preview card, metadata.' },
                            { id: 'md', label: 'MarkdownRenderer', kind: 'branch', meta: '636 lines', note: 'Forward-only scanner. No links, no attachments.' },
                            { id: 'code', label: 'CodeTextView', kind: 'branch', meta: '334 lines', note: 'Gutter, indent guides, drawn block decorations.' },
                            { id: 'hl', label: 'CodeHighlighter', kind: 'branch', meta: '370 lines', note: 'Single-pass token scanner, capped at 200,000 chars.' },
                            { id: 'wb', label: 'WorkbookBarView', kind: 'branch', meta: '220 lines', note: 'Sheet tabs and the page/table toggle.' },
                            { id: 'views', label: 'PaperViews', kind: 'edge', meta: '521 lines', note: 'Card grain, diamond divider, index rows, badges.' },
                            { id: 'theme', label: 'PaperTheme', kind: 'core', meta: '149 lines', note: 'The only source of colour and type in the extension.' }
                        ],
                        edges: [
                            { from: 'ctrl', to: 'node', label: '24' },
                            { from: 'ctrl', to: 'views', label: '8' },
                            { from: 'ctrl', to: 'pane', label: '1' },
                            { from: 'pane', to: 'code', label: '3' },
                            { from: 'pane', to: 'md', label: '2' },
                            { from: 'md', to: 'theme', label: '31' },
                            { from: 'views', to: 'theme', label: '29' },
                            { from: 'ctrl', to: 'theme', label: '22' },
                            { from: 'code', to: 'theme', label: '13' },
                            { from: 'hl', to: 'theme', label: '8' },
                            { from: 'wb', to: 'theme', label: '6' }
                        ]
                    },
                    shared: {
                        title: 'Shared/',
                        summary: 'The whole attack surface, in one folder. <code>FilePreviewLoader</code> is the gate: only regular files get past it, and it dispatches to a reader that is bounded on every dimension the file controls. <code>XMLScanner</code> and <code>ZipArchive</code> are hand-written because a general parser would have to defend against entity expansion that this one cannot perform by construction.',
                        nodes: [
                            { id: 'scan', label: 'DirectoryScanner', kind: 'input', meta: '95 lines', note: 'One level. 2,000 per directory, 20,000 per panel, depth 8.' },
                            { id: 'loader', label: 'FilePreviewLoader', kind: 'core', meta: '327 lines', note: 'Type gate and bounded reads. Refuses non-regular files.' },
                            { id: 'rich', label: 'RichDocumentReader', kind: 'branch', meta: '156 lines', note: 'States .documentType so bytes cannot pick the HTML reader.' },
                            { id: 'container', label: 'ContainerPreviewReader', kind: 'branch', meta: '74 lines', note: 'The embedded first-page picture, by exact name.' },
                            { id: 'wbr', label: 'WorkbookReader', kind: 'branch', meta: '279 lines', note: 'Four entries by exact name. No formula is evaluated.' },
                            { id: 'zip', label: 'ZipArchive', kind: 'edge', meta: '220 lines', note: '8 MB directory, 8,192 entries, 32 MB inflated.' },
                            { id: 'xml', label: 'XMLScanner', kind: 'edge', meta: '283 lines', note: 'Forward-only. No DTD, defines no entities.' },
                            { id: 'sysr', label: 'SystemPageRenderer', kind: 'edge', meta: '55 lines', note: 'QLThumbnailGenerator, out of process, 8s timeout.' },
                            { id: 'entry', label: 'IndexedEntry', kind: 'core', meta: '60 lines', note: 'The minimal metadata every row carries.' },
                            { id: 'cat', label: 'FileCategory', kind: 'branch', meta: '168 lines', note: 'The eleven kinds the index groups by.' }
                        ],
                        edges: [
                            { from: 'scan', to: 'entry', label: '3' },
                            { from: 'loader', to: 'wbr', label: '3' },
                            { from: 'loader', to: 'container', label: '2' },
                            { from: 'loader', to: 'rich', label: '2' },
                            { from: 'wbr', to: 'xml', label: '4' },
                            { from: 'wbr', to: 'zip', label: '1' },
                            { from: 'container', to: 'zip', label: '1' },
                            { from: 'cat', to: 'entry', label: '1' }
                        ]
                    }
                },
                practice: [
                    {
                        title: 'The entitlement file is the architecture document',
                        text: 'The host carries <code>com.apple.security.app-sandbox</code> and nothing else. The extension adds <code>files.user-selected.read-only</code> and one temporary mach-lookup exception naming a single Apple service. Both files fit on a screen, which is the property being defended — an architecture you cannot read in one sitting cannot be audited in one either.'
                    },
                    {
                        title: 'Every bound is a named constant, next to what enforces it',
                        text: 'Twenty limits — <code>DirectoryScanner.maximumItemCount</code>, <code>FolderNode.maximumDepth</code>, <code>ZipArchive.maximumEntryCount</code>, <code>WorkbookReader.maximumRows</code> — live on the type that applies them rather than in a document. That is what lets the security audit&rsquo;s table be checked against source instead of trusted.'
                    },
                    {
                        title: 'Adding a renderer is treated as a new threat model',
                        text: 'The development notes state it directly: a scanner may classify characters it already holds and style them, and may never hand the file to a document engine, resolve a reference, or use a regular expression whose backtracking a hostile file could drive. A feature that conflicts with an invariant gets a separate target, not an exception.'
                    },
                    {
                        title: 'A rejected approach is documented, not deleted quietly',
                        text: 'Lending the thumbnail service a hard link, then a copy-on-write clone, was implemented and instrumented. The clone succeeded and the render still failed with the same 4099. That result — and the fact that the code was removed along with the security cost it would have carried — is in <code>SECURITY_AUDIT.md</code> under its own heading.'
                    },
                    {
                        title: 'Verification is stated, including what is missing',
                        text: 'There is no automated test target. The audit lists that under residual risks alongside the paths that do exist: a Release build with signing disabled, Xcode static analysis, the packaging script&rsquo;s entitlement-count gate, and a written checklist.'
                    }
                ]
            },
            decisions: [
                {
                    ref: 'Scope',
                    title: 'Read-only by construction, not by policy',
                    context: 'A folder browser that can rename, move, or delete is a file manager, and a file manager inside Quick Look is a much larger thing to get right.',
                    decision: 'Give the extension user-selected read-only file access and write no rename, delete, move, clipboard, or file-launch path at all.',
                    tradeoff: 'Actions people will reasonably expect from a folder view are simply absent.',
                    result: 'There is no destructive code path to audit, because there is no destructive code path.'
                },
                {
                    ref: 'Bounds',
                    title: 'Every limit lives next to the code that enforces it',
                    context: 'Bounds written in a document drift from the bounds in the binary, and the document is what gets reviewed.',
                    decision: 'Twenty limits — directory entries, tree size, preview bytes, image edge, PDF and document size, container entries, workbook rows and cells, highlighting and Markdown characters, render timeout — are named constants on the type that enforces them.',
                    tradeoff: 'Changing a limit means changing code and re-reading its call sites.',
                    result: 'The security audit&rsquo;s table can be checked against source rather than trusted.'
                },
                {
                    ref: 'Search',
                    title: 'The filter may not read the disk',
                    context: 'Search that walks the tree is the obvious implementation and the one that quietly defeats the depth cap and item budget.',
                    decision: 'Filtering narrows and expands only nodes already loaded into the current panel.',
                    tradeoff: 'Files inside folders you have not opened do not appear in results, which surprises people who expect Spotlight.',
                    result: 'A keystroke can never cause unbounded disk activity, and the budgets stay real.'
                },
                {
                    ref: 'Readers',
                    title: 'Name the reader; never let the bytes choose it',
                    context: '<code>NSAttributedString</code> will infer a document reader from file content, and one of the readers it can infer is WebKit-backed HTML, which loads remote resources.',
                    decision: 'State <code>.documentType</code> from the file extension for Word, RTF, and OpenDocument, then strip links, tooltips, and cursors from the result.',
                    tradeoff: 'A misnamed file gets read as its extension claims, or refused, rather than as what it is.',
                    result: 'No file can steer itself into a networked rendering path.'
                },
                {
                    ref: 'Thumbnails',
                    title: 'Hand the unknown formats to Apple, out of process',
                    context: 'PowerPoint, legacy Office, and Keynote files with no embedded picture would each need another parser, and every parser is another attack surface in this process.',
                    decision: 'Render them with <code>QLThumbnailGenerator</code>, requesting only <code>.thumbnail</code>, with a size cap and an 8-second timeout.',
                    tradeoff: 'Those formats get a picture rather than content, and a third-party generator registered on the machine is still what parses them.',
                    result: 'The formats FoldPeek cannot safely parse are not parsed here at all — and the residual risk is written down rather than omitted.'
                },
                {
                    ref: 'Rejected',
                    title: 'The hard link that bought nothing',
                    context: '<code>QLThumbnailGenerator</code> failed with <code>NSXPCConnectionInvalid</code> (4099) inside the extension. The obvious reading was that the service could not reach the file.',
                    decision: 'Lending the service a hard link — then a copy-on-write clone — inside the extension&rsquo;s own container was implemented and instrumented.',
                    tradeoff: 'It would have meant copying user files into this extension&rsquo;s container, which is a real security cost.',
                    result: 'The clone succeeded and the render still failed with the same 4099: the barrier was never file access. The code was deleted, and one named mach-lookup exception replaced it.'
                },
                {
                    ref: 'Palette',
                    title: 'A fixed light palette on purpose',
                    context: 'Automatic Dark Mode means every colour becomes two, and a design where colour carries meaning has to keep that meaning in both.',
                    decision: 'Ship one deliberate paper palette and state that it does not follow Dark Mode.',
                    tradeoff: 'A bright panel at night, and a known complaint.',
                    result: 'Wine, denim, and ink keep their roles in every context, and the theme is never mixed with system semantic colours.'
                }
            ],
            constraints: [
                { title: 'An extension&rsquo;s sandbox is stricter than an app&rsquo;s', text: 'It cannot reach <code>QLThumbnailGenerator</code> at all without a named mach-lookup exception — every request fails with 4099 before a file is considered.' },
                { title: 'Every byte is untrusted input', text: 'Names, metadata, text, images, Markdown, PDF pages, and document bodies all come from a file someone else wrote. The UI may display them and must never treat them as commands, URLs to follow, or paths to open.' },
                { title: 'Finder owns the arrow keys', text: 'While its Quick Look panel is active, arrow keys change the Finder selection. The index has to be navigable by pointer.' },
                { title: 'Search cannot be allowed to read the disk', text: 'The moment filtering walks the tree, the depth cap and the item budget stop being bounds.' },
                { title: 'Symbolic links must be shown but never followed', text: 'In the tree and in the preview pane. The selected root is refused outright when it is a link.' },
                { title: 'A sandboxed extension cannot open a URL or launch an app', text: '<code>NSExtensionContext.openURL</code> and <code>NSWorkspace.open</code> were both measured returning false and launching nothing — useful as defence in depth, not as the only defence.' },
                { title: 'Ad-hoc signed, not notarized', text: 'Clearing quarantine is an explicit trust decision, so <code>INSTALL.md</code> states what that means before it shows the command.' },
                { title: 'There is no automated test target', text: 'The available verification paths are a Release build with signing disabled, Xcode static analysis, the packaging script&rsquo;s entitlement-count gate, and the audit checklist. That is written down rather than implied.' }
            ],
            failures: [
                {
                    title: 'The thumbnail service refused every file',
                    observed: '<code>QLThumbnailGenerator</code> returned <code>NSXPCConnectionInvalid</code> (4099) for every request, before any file was considered.',
                    cause: 'An app extension&rsquo;s sandbox denies the XPC connection the generator requires. It reads like a file-access failure and is not one.',
                    fix: 'One temporary mach-lookup exception naming <code>com.apple.quicklook.ThumbnailsAgent</code> — arrived at only after a hard-link and copy-on-write approach was implemented, measured as ineffective, and deleted.',
                    ref: 'Rejected'
                },
                {
                    title: 'PDFView crashed while resizing',
                    observed: 'A crash during a scale change in the PDF pane.',
                    cause: 'On current macOS, a <code>PDFView</code> reading its own weak delegate during a scale change crashes — and the view had been made its own delegate.',
                    fix: 'A dedicated delegate object instead, which is also where <code>pdfView(_:clickedLink:)</code> is implemented as an empty method — the thing that actually stops PDFKit opening a link annotation.'
                },
                {
                    title: 'Block backgrounds came out ragged and repeated',
                    observed: 'Fenced code panels, table rules, and quote bars had ragged edges on short lines, and a tall block drew as several stacked shapes instead of one.',
                    cause: 'A <code>.backgroundColor</code> attribute paints per glyph run, and AppKit redraws in horizontal bands — visiting a tall span once per band with a clipped range.',
                    fix: 'Draw block decorations from range attributes in <code>CodeTextView</code>, expanding each marked span to its longest effective range before drawing it.'
                },
                {
                    title: 'A Word file could choose its own reader',
                    observed: 'Reading a document without stating its type lets <code>NSAttributedString</code> infer one from the bytes — and the HTML reader it can select is WebKit-backed and loads remote resources.',
                    cause: 'Convenience API defaulting to inference on untrusted input, in a target with no network entitlement and therefore no expectation of a network fetch.',
                    fix: 'State <code>.documentType</code> from the extension, then strip <code>.link</code>, <code>.toolTip</code>, and <code>.cursor</code> from the result and cap attachment sizes.'
                }
            ],
            evidence: {
                stats: [
                    { value: 'v1.0.0', label: 'First public release', note: 'built from 1.0 (build 1)' },
                    { value: 'Universal 2', label: 'Host + extension', note: 'arm64 + x86_64' },
                    { value: '20', label: 'Enforced bounds', note: 'named constants in source' },
                    { value: '2', label: 'Extension entitlements', note: '+ one named exception' },
                    { value: '0', label: 'Third-party packages', note: 'AppKit and Foundation only' },
                    { value: '0', label: 'Network entitlements', note: 'no runtime network path' },
                    { value: '1', label: 'Security audit', note: 'boundaries and residual risks' },
                    { value: '13.0+', label: 'macOS supported', note: 'Quick Look extension' }
                ],
                note: '<strong>How this is verified.</strong> The repository has no automated test target, and the audit says so under residual risks rather than leaving it out. The available paths are a Release build with signing disabled, Xcode static analysis, the packaging script&rsquo;s entitlement-count gate, and the checklist in <code>docs/SECURITY_AUDIT.md</code> — which also lists what remains risky: ImageIO, PDFKit and AppKit document parsing all run in process, and the hand-written ZIP, XML, and workbook readers are parser code carrying a parser&rsquo;s risk.',
                links: [
                    { label: 'Repository', href: 'https://github.com/ycl-2004/FoldPeek', text: 'github.com/ycl-2004/FoldPeek' },
                    { label: 'Releases', href: 'https://github.com/ycl-2004/FoldPeek/releases', text: 'Universal macOS build' },
                    { label: 'Security audit', href: 'https://github.com/ycl-2004/FoldPeek/blob/main/docs/SECURITY_AUDIT.md', text: 'docs/SECURITY_AUDIT.md' },
                    { label: 'Development notes', href: 'https://github.com/ycl-2004/FoldPeek/blob/main/docs/DEVELOPMENT.md', text: 'invariants and bounds' }
                ]
            }
        },
        'project-notype': {
            label: 'System Breakdown',
            thesis: 'Speech → the engine that can actually handle it → back into the field you were typing in.',
            frame: 'NoType&rsquo;s real problem is not transcription. It is routing: two engines with opposite strengths, one of which cannot tell which language you are speaking — and returning the text to a target that may have moved while you were talking.',
            map: {
                entry: 'Double-tap ⌘ anywhere on macOS',
                stages: [
                    ['hotkey'],
                    ['capture'],
                    ['router'],
                    ['apple', 'whisper'],
                    ['post'],
                    ['insert', 'clipboard'],
                    ['os']
                ]
            },
            nodes: {
                hotkey: {
                    title: 'Shortcut Layer',
                    kind: 'input',
                    meta: 'double-modifier tap · cancels on other input',
                    source: 'Hotkey/ModifierDoubleTapMonitor.swift · GlobalHotkeyManager.swift',
                    flags: [{ label: 'ADR-001', tone: 'ref' }],
                    role: 'Starting dictation without stealing a shortcut somebody else already owns.',
                    detail: [
                        { label: 'What it does', text: 'Dictation defaults to <code>Double Command</code>; recognition-mode cycling defaults to <code>⌘⌥Y</code>. Each is an independent, persisted choice with a real <code>Disabled</code> option, and each unregisters and re-registers on its own.' },
                        { label: 'The hard part', text: 'A double-tap detector sees the same keystrokes as every ordinary ⌘-shortcut in the system.' },
                        { label: 'Decision', text: 'The detector cancels a pending tap sequence the moment another keyboard or mouse input arrives, so ⌘C followed by ⌘V is never read as a dictation tap. Ordinary key combinations stay on Carbon hotkey registration; only the modifier taps use AppKit event monitors.' },
                        { label: 'Rejected', text: 'An arbitrary shortcut recorder — it needs a capture UI, validation, conflict presentation, and key-code serialization. Curated choices plus <code>Disabled</code> solved the known collisions with far less failure surface.' }
                    ]
                },
                capture: {
                    title: 'Audio Capture',
                    kind: 'core',
                    meta: 'clip to disk · deleted after use',
                    source: 'Audio/AudioRecorder.swift · RecordedAudioClip.swift',
                    role: 'Recording a clip, and making sure it cannot outlive its purpose.',
                    detail: [
                        { label: 'What it does', text: 'Records the microphone to a WAV clip in a dedicated subdirectory, hands it to the engine, and deletes it after the attempt. Orphans from a crashed session are cleared at launch.' },
                        { label: 'Two guards on the session', text: 'A clip under 0.3 seconds skips transcription entirely — that is a mistrigger, not speech. Recording stops itself after five minutes, so a forgotten session cannot run all afternoon.' },
                        { label: 'Why it matters', text: 'The privacy claim is &ldquo;your voice stays on your Mac.&rdquo; That is only true if the temporary files are actually removed, which is why deletion is on the same path as the transcript, not a cleanup task.' }
                    ]
                },
                router: {
                    title: 'Engine Router',
                    kind: 'core',
                    meta: 'per dictation, not per session',
                    source: 'Transcription/RoutingTranscriptionEngine.swift · Domain/TranscriptionEngineChoice.swift',
                    flags: [{ label: 'Key decision', tone: 'decision' }, { label: 'ADR-004', tone: 'ref' }],
                    role: 'The decision the whole product turns on.',
                    detail: [
                        { label: 'What it does', text: '<code>resolvedEngine(for:)</code> picks an engine for each individual dictation. The user&rsquo;s preference is honoured for <code>中文优先</code> and <code>英文优先</code>.' },
                        { label: 'The override', text: '<code>Auto (中英混说)</code> <em>always</em> uses Whisper, whatever the preference says, because only Whisper detects the spoken language. macOS 15 has no <code>SpeechAnalyzer</code> at all, so there the choice is disabled and everything uses the bundled model.' },
                        { label: 'Stated, not hidden', text: 'When Auto overrides the preference, the menu reads <code>Engine: macOS Speech (fast) → Bundled Whisper</code>. A silent override would look like the setting was ignored.' },
                        { label: 'Why lazy construction matters', text: '<code>RoutingTranscriptionEngine</code> builds each engine on first use. Someone who stays on macOS Speech never loads the bundled model — which is what makes the fast path worth having, because loading Whisper costs seconds and gigabytes.' }
                    ]
                },
                apple: {
                    title: 'macOS Speech',
                    kind: 'branch',
                    meta: 'SpeechAnalyzer · exactly one locale',
                    source: 'Transcription/AppleSpeechTranscriptionEngine.swift',
                    flags: [{ label: 'Hard problem', tone: 'hard' }],
                    role: 'An order of magnitude faster, and structurally unable to do the default mode.',
                    detail: [
                        { label: 'Measured', text: 'On the same 10.6-second Chinese clip: <code>SpeechTranscriber</code> waited 0.083s after speech ended and spent 0.27s computing; <code>DictationTranscriber</code> took 0.35s and 1.40s; the bundled Whisper <code>large-v3_turbo</code> needed about a second.' },
                        { label: 'What it also fixes', text: 'It does not translate instead of transcribing, ships its own voice-activity detection, does not emit subtitle sign-off hallucinations, and reports results progressively rather than only in a batch — four separately tracked defects, gone.' },
                        { label: 'The disqualifying limit', text: 'A transcriber is constructed for exactly one locale and <code>selectedLocales</code> accepts a single entry. <strong>The engine cannot detect which language is being spoken.</strong> That detection is the entire basis of <code>Auto</code>.' },
                        { label: 'Residual cost', text: 'A proper noun spoken inside another language is transliterated by the locked locale — <code>GitHub</code> came back as <code>Gthob</code>, <code>Whisper</code> as <code>画师</code>. <code>AnalysisContext.contextualStrings</code> is the intended fix and is not implemented yet.' }
                    ]
                },
                whisper: {
                    title: 'Bundled Whisper',
                    kind: 'branch',
                    meta: 'large-v3 · detects the language',
                    source: 'Transcription/WhisperKitTranscriptionEngine.swift · LocalWhisperPaths.swift · WhisperModelInstaller.swift',
                    flags: [{ label: 'ADR-002', tone: 'ref' }, { label: 'ADR-005', tone: 'ref' }],
                    role: 'Slower, larger, and the only one that can handle a sentence that switches language halfway.',
                    detail: [
                        { label: 'What it does', text: 'Runs the multilingual WhisperKit / Core ML <code>large-v3</code> model on-device, detecting the spoken language rather than being told it.' },
                        { label: 'Where the model lives', text: 'Install locations are searched <em>before</em> the app bundle — <code>~/Documents/huggingface/…</code> first, then <code>~/Library/Application Support/NoType/…</code>, then the bundle. The path is recomputed rather than cached, so a model downloaded during a launch is visible to the load that follows.' },
                        { label: 'Why that order', text: 'Core ML specialization is cached per model path. A path inside the bundle moves on every rebuild, and the cache dies with it. Measured on one machine: 4m13s to load after a rebuild moved the path, versus 2–4s from a fixed location that did not move.' },
                        { label: 'A missing model is a prompt', text: '1.5 GB must not land somewhere the user did not choose, so <code>WhisperModelInstaller</code> presents both install locations with their trade-offs and a <code>Not Now</code> option before calling <code>WhisperKit.download(downloadBase:)</code>.' },
                        { label: 'Readiness is honest', text: 'A four-state machine — Waiting, Preparing, Ready, Failed — published from the same <code>loadPipeline()</code> path used by both prewarming and real transcription. No percentage, because Core ML does not expose one for every stage and a synthetic bar would imply precision the app does not have.' }
                    ]
                },
                post: {
                    title: 'Transcript Post-Processing',
                    kind: 'core',
                    meta: 'hallucination filters · conditional filler removal',
                    source: 'Transcription/TranscriptPostProcessor.swift',
                    role: 'Deciding what a model produced that a person did not say.',
                    detail: [
                        { label: 'What it does', text: 'Strips subtitle sign-off hallucinations, collapses repetitions, and removes conversational fillers before the transcript reaches an input field.' },
                        { label: 'The precision problem', text: '<code>like</code>, <code>you know</code>, and <code>i mean</code> were being removed unconditionally, which also deleted them when they were the sentence. They are now removed only with a pause on both sides, or trailing for the latter two.' },
                        { label: 'Still open', text: 'Repetition detection only compares adjacent single tokens, a transcript consisting solely of a hallucination is still inserted, and there is no custom vocabulary. All three are written down in <code>docs/known-issues.md</code> rather than left to be discovered.' }
                    ]
                },
                insert: {
                    title: 'Focused-Field Insertion',
                    kind: 'branch',
                    meta: 'the target must still be the target',
                    source: 'Accessibility/FocusedTextInserter.swift · AccessibilityTextInserter.swift',
                    flags: [{ label: 'Key decision', tone: 'decision' }],
                    role: 'Putting the text back where the work already is.',
                    detail: [
                        { label: 'What it does', text: 'Remembers the focused input where dictation began and inserts the transcript there through Accessibility, so the normal typing flow is never interrupted by a window.' },
                        { label: 'The rule', text: 'If the focused element changed while you were speaking, NoType does <em>not</em> insert. Writing a paragraph into the wrong field is worse than not writing it at all.' },
                        { label: 'Constraint', text: 'Inserting into another application&rsquo;s text field requires Accessibility permission. There is no version of this feature without it.' }
                    ]
                },
                clipboard: {
                    title: 'Clipboard Fallback',
                    kind: 'branch',
                    meta: 'when the field moved or refused',
                    source: 'Accessibility/ClipboardPasteFallback.swift · ClipboardStore.swift',
                    role: 'The path that keeps a failed insertion from being a lost transcript.',
                    detail: [
                        { label: 'What it does', text: 'When the target cannot accept direct input, or is no longer the target, the transcript goes to the clipboard and the status says so.' },
                        { label: 'What it must not do', text: 'An empty transcript used to overwrite the clipboard, destroying whatever was there in exchange for nothing. Empty transcripts now end the session without touching it.' },
                        { label: 'Why a fallback at all', text: 'Accessibility insertion depends on the target app exposing a writable text element. Plenty do not, and &ldquo;it silently did nothing&rdquo; is the worst possible outcome for a dictation tool.' }
                    ]
                },
                os: {
                    title: 'macOS Integration',
                    kind: 'edge',
                    meta: 'Microphone · Speech Recognition · Accessibility',
                    flags: [{ label: 'Constraint', tone: 'constraint' }],
                    role: 'Three permissions, each attached to the feature that actually needs it.',
                    detail: [
                        { label: 'Microphone', text: 'Always required. Without it there is nothing to transcribe.' },
                        { label: 'Speech Recognition', text: 'Required only on macOS 26, and only for the system engine. Recognition is still on-device — the permission gates the system recognizer, not a network call.' },
                        { label: 'Accessibility', text: 'Required to insert into another app&rsquo;s focused field, and to observe the global modifier taps.' },
                        { label: 'What is absent', text: 'No network requests, no accounts, no remote transcription API. Both engines run on-device and the temporary recordings are deleted after each attempt.' }
                    ]
                }
            },
            build: {
                graph: {
                    summary: '<code>Domain/</code> is nine small files — 368 lines total — and it is what everything is written in terms of: <code>Transcription/</code> names it 43 times, <code>App/</code> 35. The engine choice, the recognition language, the readiness state, and the install location are all types before they are behaviour, which is why routing per dictation is a switch over a value rather than a chain of booleans.',
                    nodes: [
                        { id: 'app', label: 'App/', kind: 'input', meta: '4 files · 874 lines', note: 'Menu bar, app state, delegate, icon rendering.' },
                        { id: 'coord', label: 'Coordinator/', kind: 'core', meta: '1 file · 366 lines', note: 'DictationCoordinator — the one file that runs a dictation end to end.' },
                        { id: 'trans', label: 'Transcription/', kind: 'core', meta: '8 files · 1,309 lines', note: 'Two engines, the router, the model installer, post-processing.' },
                        { id: 'audio', label: 'Audio/', kind: 'branch', meta: '3 files · 134 lines', note: 'Recorder, clip, session errors.' },
                        { id: 'access', label: 'Accessibility/', kind: 'edge', meta: '6 files · 359 lines', note: 'Focused-field insertion and the clipboard fallback.' },
                        { id: 'hotkey', label: 'Hotkey/', kind: 'edge', meta: '4 files · 400 lines', note: 'Carbon hotkeys and the double-tap monitor.' },
                        { id: 'perm', label: 'Permissions/', kind: 'edge', meta: '3 files · 69 lines', note: 'Microphone state and the Settings deep link.' },
                        { id: 'domain', label: 'Domain/', kind: 'core', meta: '9 files · 368 lines', note: 'The vocabulary. Nine types, no behaviour.' },
                        { id: 'support', label: 'Support/', kind: 'branch', meta: '1 file · 28 lines', note: 'AppLogger. Named 32 times by the coordinator alone.' }
                    ],
                    edges: [
                        { from: 'app', to: 'domain', label: '35', weight: 35 },
                        { from: 'app', to: 'hotkey', label: '20', weight: 20 },
                        { from: 'app', to: 'perm', label: '8', weight: 8 },
                        { from: 'app', to: 'coord', label: '4', weight: 4 },
                        { from: 'app', to: 'access', label: '4', weight: 4 },
                        { from: 'coord', to: 'support', label: '32', weight: 32 },
                        { from: 'coord', to: 'access', label: '19', weight: 19 },
                        { from: 'coord', to: 'trans', label: '5', weight: 5 },
                        { from: 'coord', to: 'audio', label: '5', weight: 5 },
                        { from: 'coord', to: 'perm', label: '3', weight: 3 },
                        { from: 'trans', to: 'domain', label: '43', weight: 43 },
                        { from: 'trans', to: 'support', label: '27', weight: 27 },
                        { from: 'trans', to: 'audio', label: '5', weight: 5 },
                        { from: 'audio', to: 'support', label: '7', weight: 7 },
                        { from: 'access', to: 'support', label: '3', weight: 3 }
                    ]
                },
                drill: {
                    trans: {
                        title: 'Transcription/',
                        summary: '<code>RoutingTranscriptionEngine</code> is 94 lines and names the <code>TranscriptionEngine</code> protocol 11 times — it is a router, not an engine. Both real engines conform to the same protocol, so <code>Auto</code> overriding the user&rsquo;s preference is a single decision in one small file rather than a condition spread through the pipeline.',
                        nodes: [
                            { id: 'router', label: 'RoutingTranscriptionEngine', kind: 'input', meta: '94 lines', note: 'Picks per dictation. Builds each engine on first use.' },
                            { id: 'proto', label: 'TranscriptionEngine', kind: 'core', meta: '22 lines', note: 'The protocol both engines conform to.' },
                            { id: 'whisper', label: 'WhisperKitTranscriptionEngine', kind: 'branch', meta: '582 lines', note: 'Detects the spoken language. The only Auto path.' },
                            { id: 'apple', label: 'AppleSpeechTranscriptionEngine', kind: 'branch', meta: '249 lines', note: 'SpeechAnalyzer. One locale, an order of magnitude faster.' },
                            { id: 'paths', label: 'LocalWhisperPaths', kind: 'edge', meta: '96 lines', note: 'Install locations searched before the app bundle.' },
                            { id: 'installer', label: 'WhisperModelInstaller', kind: 'edge', meta: '131 lines', note: 'Asks where 1.5 GB should land before downloading it.' },
                            { id: 'post', label: 'TranscriptPostProcessor', kind: 'branch', meta: '127 lines', note: 'Hallucination filters and conditional filler removal.' },
                            { id: 'err', label: 'TranscriptionError', kind: 'core', meta: '8 lines', note: 'Named 8 and 4 times — both engines fail the same way.' }
                        ],
                        edges: [
                            { from: 'router', to: 'proto', label: '11' },
                            { from: 'router', to: 'whisper', label: '1' },
                            { from: 'router', to: 'apple', label: '1' },
                            { from: 'whisper', to: 'proto', label: '2' },
                            { from: 'apple', to: 'proto', label: '2' },
                            { from: 'whisper', to: 'err', label: '8' },
                            { from: 'apple', to: 'err', label: '4' },
                            { from: 'whisper', to: 'paths', label: '5' },
                            { from: 'whisper', to: 'installer', label: '3' },
                            { from: 'installer', to: 'paths', label: '2' },
                            { from: 'apple', to: 'post', label: '1' }
                        ]
                    },
                    domain: {
                        title: 'Domain/',
                        summary: 'Nine files, 368 lines, no behaviour — the largest is 63 lines. Every state the product can be in has a name here before any code branches on it: which engine, which language, whether the model is ready, where it was installed, what a finished dictation produced.',
                        nodes: [
                            { id: 'choice', label: 'TranscriptionEngineChoice', kind: 'core', meta: '57 lines', note: 'Holds resolvedEngine(for:) — where Auto overrides.' },
                            { id: 'lang', label: 'DictationRecognitionLanguage', kind: 'core', meta: '63 lines', note: 'Auto, Chinese-first, English-first.' },
                            { id: 'install', label: 'ModelInstallLocation', kind: 'branch', meta: '63 lines', note: 'The two directories the installer offers.' },
                            { id: 'script', label: 'ChineseScriptPreference', kind: 'branch', meta: '54 lines', note: 'Simplified or Traditional output.' },
                            { id: 'ready', label: 'LocalModelReadiness', kind: 'branch', meta: '51 lines', note: 'Waiting, Preparing, Ready, Failed. No percentage.' },
                            { id: 'state', label: 'DictationState', kind: 'edge', meta: '8 lines', note: 'Idle, recording, transcribing, inserting.' },
                            { id: 'result', label: 'TranscriptResult', kind: 'edge', meta: '12 lines', note: 'What a finished dictation produced.' },
                            { id: 'err', label: 'DictationError', kind: 'edge', meta: '30 lines', note: 'Aligned across both engines after they diverged once.' }
                        ],
                        edges: [
                            { from: 'choice', to: 'lang', label: '1' },
                            { from: 'script', to: 'lang', label: '1' },
                            { from: 'state', to: 'err', label: '1' }
                        ]
                    },
                    access: {
                        title: 'Accessibility/',
                        summary: 'Six files and 359 lines to answer one question: is the field the transcript is going into still the field dictation started in? <code>InsertionError</code> is 9 lines and named by three of them, because &ldquo;the target moved&rdquo; and &ldquo;the target refused&rdquo; both have to reach the clipboard fallback as data rather than as a silent no-op.',
                        nodes: [
                            { id: 'ax', label: 'AccessibilityTextInserter', kind: 'core', meta: '185 lines', note: 'The Accessibility write into another app&rsquo;s field.' },
                            { id: 'focus', label: 'FocusedTextInserter', kind: 'core', meta: '31 lines', note: 'The protocol — insertion has more than one implementation.' },
                            { id: 'fallback', label: 'ClipboardPasteFallback', kind: 'branch', meta: '46 lines', note: 'Where a refused or moved target ends up.' },
                            { id: 'clip', label: 'ClipboardStore', kind: 'branch', meta: '68 lines', note: 'The store an empty transcript must not touch.' },
                            { id: 'perm', label: 'AccessibilityPermissionManager', kind: 'edge', meta: '20 lines', note: 'Whether insertion is possible at all.' },
                            { id: 'err', label: 'InsertionError', kind: 'core', meta: '9 lines', note: 'Nine lines, named by three files.' }
                        ],
                        edges: [
                            { from: 'ax', to: 'focus', label: '4' },
                            { from: 'ax', to: 'err', label: '3' },
                            { from: 'fallback', to: 'clip', label: '3' },
                            { from: 'fallback', to: 'err', label: '2' },
                            { from: 'fallback', to: 'focus', label: '1' },
                            { from: 'clip', to: 'err', label: '2' }
                        ]
                    },
                    hotkey: {
                        title: 'Hotkey/',
                        summary: 'Two mechanisms, kept apart. <code>GlobalHotkeyManager</code> registers ordinary Carbon hotkeys; <code>ModifierDoubleTapMonitor</code> uses AppKit event monitors because a double tap is a timing question, not a key combination. Both read <code>KeyCombination</code>, so a shortcut change reaches one or the other without either knowing about the other.',
                        nodes: [
                            { id: 'mgr', label: 'GlobalHotkeyManager', kind: 'core', meta: '157 lines', note: 'Carbon registration for ordinary combinations.' },
                            { id: 'tap', label: 'ModifierDoubleTapMonitor', kind: 'core', meta: '132 lines', note: 'Cancels a pending sequence on any other input.' },
                            { id: 'conf', label: 'ShortcutConfiguration', kind: 'branch', meta: '84 lines', note: 'The curated choices, including a real Disabled.' },
                            { id: 'combo', label: 'KeyCombination', kind: 'edge', meta: '27 lines', note: 'The shape both paths agree on.' }
                        ],
                        edges: [
                            { from: 'mgr', to: 'combo', label: '2' },
                            { from: 'tap', to: 'conf', label: '2' },
                            { from: 'conf', to: 'combo', label: '2' }
                        ]
                    }
                },
                practice: [
                    {
                        title: 'A protocol is what makes routing a one-file decision',
                        text: 'Both engines conform to <code>TranscriptionEngine</code>, so <code>RoutingTranscriptionEngine</code> is 94 lines that pick one. When ADR-004 added the rule that <code>Auto</code> always uses Whisper regardless of preference, it changed one function — not a condition threaded through the recording, transcription, and insertion paths.'
                    },
                    {
                        title: 'Types before behaviour',
                        text: '<code>Domain/</code> is nine files and 368 lines with almost no logic, and it is the most-referenced folder in the project. Readiness is a four-case enum, not a pair of booleans; engine choice is a value, not a string. That is why &ldquo;Preparing&rdquo; could be made an honest indeterminate state without inventing a percentage.'
                    },
                    {
                        title: 'Five ADRs, each carrying its measurement',
                        text: 'The decision records here are unusual in that most of them contain a table. ADR-004 has the engine timings on a 10.6-second clip; ADR-005 has 4m13s versus 2–4s for the model path; ADR-002 has the 7.4 MB app against the 1.5 GB model. A decision with a number in it can be re-checked later.'
                    },
                    {
                        title: 'The known-issues file is maintained, not written once',
                        text: '<code>docs/known-issues.md</code> lists ten open items and, below them, a table of what the same review resolved — attempts that all ran to completion, WAV files never deleted, fillers removed unconditionally, an empty transcript overwriting the clipboard. Keeping both halves in one file is what makes the resolved column believable.'
                    }
                ]
            },
            decisions: [
                {
                    ref: 'ADR-004',
                    title: 'Route each dictation, and let Auto override the preference',
                    context: 'macOS 26&rsquo;s <code>SpeechTranscriber</code> is roughly an order of magnitude faster and fixes four tracked defects — but it is constructed for exactly one locale and cannot detect the spoken language, which is the entire basis of the default <code>Auto</code> mode.',
                    decision: 'Keep both engines and choose per dictation. Honour the preference for the language-biased modes; make <code>Auto</code> always use Whisper regardless of the preference, and show the override in the menu.',
                    tradeoff: 'Two engines mean two sets of behaviour to keep aligned — one divergence already shipped, where silence made the Apple engine throw an error while Whisper reported &ldquo;nothing to insert&rdquo;.',
                    result: 'Single-language dictation got an order of magnitude faster on macOS 26 without giving up mixed-language input or macOS 15 support.'
                },
                {
                    ref: 'ADR-005',
                    title: 'Search install locations before the app bundle',
                    context: 'Core ML specialization is cached per model path, so a model inside the app bundle is re-specialized every time the bundle is replaced. A snapshot of one machine found six copies of the same 1.5 GB model — 9 GB of duplicates.',
                    decision: 'Resolve the model from a stable shared location first, recompute the path rather than caching it, and derive it from <code>homeDirectoryForCurrentUser</code> instead of a hardcoded developer path.',
                    tradeoff: 'A bundling release still carries a copy that is ignored whenever an install location already has one — redundant disk in exchange for never moving the path.',
                    result: 'Rebuilds stopped discarding the Core ML cache, load time went from 4m13s to 2–4s, and a 10 MB lightweight build became viable.'
                },
                {
                    ref: 'ADR-003',
                    title: 'Show the real loading lifecycle, not a fake percentage',
                    context: 'First-time Core ML specialization can take one to two minutes, and the only evidence was a debug log line. Users assumed a hang and restarted, interrupting specialization and leaving large temporary caches behind.',
                    decision: 'A four-state readiness machine — Waiting, Preparing, Ready, Failed with the actual reason — published from the same <code>loadPipeline()</code> path as real transcription, rendered in Diagnostics with first-launch guidance and a retry.',
                    tradeoff: 'No progress bar. <code>Preparing</code> is an honest indeterminate state.',
                    result: 'Core ML does not expose a reliable percentage for every stage, so a bar would have been a number the app made up.'
                },
                {
                    ref: 'ADR-001',
                    title: 'Curated shortcuts with a cancelling double-tap detector',
                    context: 'Two fixed Carbon hotkeys collided with other apps and could not express a low-friction modifier double tap. A naive double-tap detector would read ordinary ⌘-shortcuts as dictation triggers.',
                    decision: 'Two independent persisted choices with a real <code>Disabled</code> option, AppKit event monitors for the taps, and cancellation of a pending sequence when any other keyboard or mouse input arrives.',
                    tradeoff: 'Not an arbitrary key recorder, so an unlisted combination is simply unavailable.',
                    result: 'The known collisions are solvable by the user without a capture UI, validation layer, and conflict-resolution surface.'
                },
                {
                    ref: 'ADR-002',
                    title: 'Ship the model inside the first public release',
                    context: 'The development build pointed at an absolute path under the original developer&rsquo;s home directory. A friend downloading the 7.4 MB app would launch successfully and then fail when transcription tried to load a 1.5 GB model that was not there.',
                    decision: 'Bundle the converted WhisperKit model and tokenizer into the release app and ship it as a ZIP release asset, keeping the model out of Git history.',
                    tradeoff: 'A 1.4 GB download for the first release.',
                    result: 'A non-developer got an offline-capable first run with no setup script, no Hugging Face cache, and no first-run download state machine.'
                },
                {
                    ref: 'Attempts',
                    title: 'Stop transcribing as soon as the answer is conclusive',
                    context: 'Every dictation ran all three transcription attempts to completion, whether or not the first one had already produced a usable result.',
                    decision: 'Attempts stop as soon as a result is conclusive, and the model is loaded in the background at launch with in-flight de-duplication rather than lazily on first use.',
                    tradeoff: 'Launch does background work the user did not ask for.',
                    result: 'Measured about 5s down to about 1s per dictation, and the first dictation no longer stalls for roughly two seconds.'
                },
                {
                    ref: 'Cleanup',
                    title: 'Temporary audio has an owner and a deadline',
                    context: 'Recorded WAV files were never deleted, mistriggers produced fractional-second clips that still ran the full pipeline, and a forgotten session could record indefinitely.',
                    decision: 'Write clips to a dedicated subdirectory and delete after use, clear orphans at launch, skip transcription for clips under 0.3s, and stop recording automatically after five minutes.',
                    tradeoff: 'A genuinely long dictation is cut at five minutes.',
                    result: 'The privacy claim about on-device audio is backed by the file lifecycle rather than by intent.'
                }
            ],
            constraints: [
                { title: 'Accessibility is required to insert anywhere useful', text: 'Writing into another application&rsquo;s focused field has no permission-free path on macOS.' },
                { title: 'The system engine is locked to one locale', text: '<code>selectedLocales</code> accepts a single entry, so <code>SpeechTranscriber</code> cannot detect which language is being spoken — and a proper noun inside another language gets transliterated by the locked locale.' },
                { title: 'macOS 15 has no SpeechAnalyzer', text: 'There is no fast path to route to, so the engine choice is disabled and everything uses the bundled model.' },
                { title: 'Core ML specialization is cached per model path', text: 'Moving the model — which replacing an app bundle does — throws the cache away and costs minutes on the next load.' },
                { title: 'The model is about 1.5 GB', text: 'It cannot be committed to Git, cannot be silently downloaded somewhere the user did not choose, and duplicates across builds add up fast.' },
                { title: 'The focused field can move while you speak', text: 'The target that existed when dictation started may not be the target when the transcript arrives, so insertion has to be able to refuse.' },
                { title: 'Ad-hoc signed, not notarized', text: 'First launch needs the Control-click → Open path, and permission grants are bound to a code identity that changes with each build.' }
            ],
            failures: [
                {
                    title: 'Auto produced pinyin instead of Chinese',
                    observed: 'With the system&rsquo;s preferred language set to <code>en-CA</code>, running a Chinese recording through <code>Auto</code> on <code>SpeechTranscriber</code> returned <code>,,,,,,,,,,,,,, Fang Hui, hai, shi, fang Hui, di, wu, shi, fang, Hui, shi.</code>',
                    cause: 'The first implementation mapped <code>Auto</code> to the system&rsquo;s preferred language. An English model transliterating Chinese is silent, total degradation — it returns confident text that is entirely wrong.',
                    fix: '<code>Auto</code> always routes to Whisper, whatever engine preference is selected, because only Whisper detects the spoken language. The override is displayed rather than hidden.',
                    ref: 'ADR-004'
                },
                {
                    title: 'A rebuild turned a two-second load into four minutes',
                    observed: 'After one rebuild the app sat at <code>Local Model: Preparing…</code> for 4m13s — and was reported as a hang, which is exactly what it looks like.',
                    cause: 'The model was resolved from inside the app bundle, so replacing the bundle moved the path, and Core ML&rsquo;s per-path specialization cache was discarded. A separate snapshot found six copies of the same model on one machine: 9 GB of duplicates.',
                    fix: 'Search stable install locations before the bundle and recompute rather than cache the path. Load time returned to 2–4s, and a development machine keeps one copy instead of one per build.',
                    ref: 'ADR-005'
                },
                {
                    title: 'Every dictation ran all three attempts',
                    observed: 'A single dictation took roughly five seconds even when the first attempt had already produced a usable transcript.',
                    cause: 'The pipeline ran the full attempt sequence unconditionally instead of stopping at a conclusive result — and the model was loaded lazily, adding another two-second stall to the first dictation of a session.',
                    fix: 'Stop as soon as a result is conclusive, and preload the model in the background at launch with in-flight de-duplication. Measured about 5s down to about 1s.'
                },
                {
                    title: 'An empty transcript overwrote the clipboard',
                    observed: 'A dictation that produced nothing still ran the clipboard fallback, destroying whatever the user had copied earlier in exchange for an empty string.',
                    cause: 'The fallback path treated &ldquo;insertion did not happen&rdquo; as the trigger, without asking whether there was anything to insert.',
                    fix: 'Empty transcripts end the session without touching the clipboard — and the two engines were aligned so that silence means the same thing on both paths.'
                }
            ],
            evidence: {
                stats: [
                    { value: 'v0.3.0', label: 'Shipped release', note: 'Universal 2' },
                    { value: '2', label: 'Transcription engines', note: 'routed per dictation' },
                    { value: '0.27s', label: 'macOS Speech compute', note: 'on a 10.6s clip' },
                    { value: '5', label: 'Decision records', note: 'written with measurements' },
                    { value: '10 MB', label: 'Lightweight build', note: 'vs 1.5 GB bundling' },
                    { value: '0', label: 'Network calls', note: 'both engines on-device' },
                    { value: '10', label: 'Tracked known issues', note: 'published, not hidden' },
                    { value: '14.0+', label: 'macOS supported', note: 'macOS 26 for the fast path' }
                ],
                note: '<strong>The known-issues file is part of the product.</strong> <code>docs/known-issues.md</code> lists ten open items — a decoder prompt that is written but never reaches the model, repetition detection that only sees adjacent tokens, no custom vocabulary, a test run that writes into the real debug log — alongside a table of what the same review resolved. Publishing the open list is what makes the resolved one worth reading.',
                links: [
                    { label: 'Repository', href: 'https://github.com/ycl-2004/NoType', text: 'github.com/ycl-2004/NoType' },
                    { label: 'Releases', href: 'https://github.com/ycl-2004/NoType/releases', text: 'Universal macOS build' },
                    { label: 'Decision records', href: 'https://github.com/ycl-2004/NoType/tree/main/docs/decisions', text: 'five ADRs with measurements' },
                    { label: 'Known issues', href: 'https://github.com/ycl-2004/NoType/blob/main/docs/known-issues.md', text: 'what is still open' }
                ]
            }
        },
        'project-sharememory': {
            label: 'System Breakdown',
            thesis: 'Two agents, one project memory → an advisory lock that heals itself → lint before anything becomes durable.',
            frame: 'The question is not where AI agents keep notes. It is what happens when two of them write the same files — and what you can actually enforce when the only enforcement layer available is a prompt.',
            map: {
                entry: 'An agent starts work in a project with AI_MEMORY/',
                stages: [
                    ['boot'],
                    ['lock'],
                    ['verify'],
                    ['durable', 'sync'],
                    ['lint'],
                    ['git', 'archive'],
                    ['limit']
                ]
            },
            nodes: {
                boot: {
                    title: 'Tiered Startup Read',
                    kind: 'input',
                    meta: 'a receipt, not a gate',
                    source: 'scripts/memory_lock.sh boot',
                    role: 'Making &ldquo;did the agent actually read the memory?&rdquo; observable.',
                    detail: [
                        { label: 'What it does', text: '<code>memory_lock.sh boot &lt;AGENT&gt;</code> stamps a timestamped receipt that the tiered startup read happened. <code>status</code> and the lint then flag it when <code>SYNC_LOG.md</code> has changed since that receipt.' },
                        { label: 'What it deliberately is not', text: 'It is visibility, not enforcement. Nothing here can stop an agent from skipping the read — the receipt just means a resuming agent notices it is acting on a stale view.' },
                        { label: 'Why that distinction matters', text: 'Every other design in this system follows the same rule: build the signal you can actually produce, and say plainly that it is a signal rather than a guarantee.' }
                    ]
                },
                lock: {
                    title: 'Advisory Write Lock',
                    kind: 'core',
                    meta: 'mkdir · TTL reclaim · fails closed',
                    source: 'scripts/memory_lock.sh acquire / release',
                    flags: [{ label: 'Key decision', tone: 'decision' }, { label: 'Hard problem', tone: 'hard' }],
                    role: 'The only thing standing between two agents and a lost write.',
                    detail: [
                        { label: 'What it does', text: '<code>mkdir .write.lock</code> is atomic, so acquisition is a real primitive rather than a check-then-act race. An owner file records who holds it.' },
                        { label: 'The failure it was built for', text: 'Release used to depend on the agent remembering to <code>rm</code> the directory. A crashed or interrupted session left an orphan lock that blocked the other agent until a human deleted it.' },
                        { label: 'Self-healing, with a floor', text: 'A well-formed lock older than the TTL is auto-reclaimed on the next acquire. Missing or malformed owner metadata fails closed and requires explicit repair — the helper never guesses a lock&rsquo;s age or deletes one it cannot identify.' },
                        { label: 'No PID check, on purpose', text: 'The holder is an LLM agent issuing short, separate bash calls — not a long-lived process. A PID would be dead the instant it was written, so age is the only staleness signal that means anything here.' }
                    ]
                },
                verify: {
                    title: 'Pre-Write Re-Check',
                    kind: 'core',
                    meta: 'is the lock still yours?',
                    source: 'scripts/memory_lock.sh verify',
                    flags: [{ label: 'Failure → fix', tone: 'failure' }],
                    role: 'Closing the one race that TTL reclaim creates.',
                    detail: [
                        { label: 'The race', text: 'TTL auto-reclaim can hit a holder that is genuinely still working past the TTL. The reclaim and the original holder&rsquo;s writes then interleave, and an update is silently lost.' },
                        { label: 'What it does', text: 'A cheap re-check immediately before the final write and before the lint: confirm the lock still carries your name. Exit 1 means it was reclaimed or gone.' },
                        { label: 'What it cannot do', text: 'It does not catch an agent that skips the lock entirely. That failure mode has no enforcement layer, by design, and is written down in <code>KnownRisk.txt</code> rather than papered over.' }
                    ]
                },
                durable: {
                    title: 'Durable Memory Files',
                    kind: 'branch',
                    meta: 'PROJECT · DECISIONS · TASKS · LEARNINGS · max 5',
                    source: 'AI_MEMORY/',
                    role: 'The distilled state the next agent actually reads.',
                    detail: [
                        { label: 'What goes where', text: 'Decisions and dependency changes to <code>DECISIONS.md</code>; direction, architecture, and workflow to <code>PROJECT.md</code>; handoff-critical task state to <code>TASKS.md</code>; confirmed reusable lessons to <code>LEARNINGS.md</code>. Every durable entry is signed <code>[YYYY-MM-DD HH:MM] [Claude|Codex]</code> with real system time.' },
                        { label: 'The admission test', text: 'If it would not change what the next agent does, it does not become durable memory. That single rule is what keeps this from turning into a chat log.' },
                        { label: 'Caps over accumulation', text: 'Five entries per file, with overflow pushed to <code>archive/</code>. A memory file that grows without bound stops being read, which makes it worse than no memory at all.' },
                        { label: 'What is banned', text: 'No raw reasoning, chat dumps, verbose logs, secrets, tokens, or private URLs.' }
                    ]
                },
                sync: {
                    title: 'Daily Sync Log',
                    kind: 'branch',
                    meta: 'one compact block per date · max 7',
                    source: 'AI_MEMORY/SYNC_LOG.md',
                    role: 'How the two agents see each other without a per-write audit trail.',
                    detail: [
                        { label: 'What it does', text: 'Every write session appends to today&rsquo;s block. At most one block per date, at most seven dates retained; the rest moves to the archive.' },
                        { label: 'Why daily blocks', text: 'A per-write log is noise the next agent has to skim past. A dated handoff block is the unit an agent actually needs to answer &ldquo;what happened since I last worked here?&rdquo;' },
                        { label: 'It is also the drift signal', text: 'Because <code>SYNC_LOG.md</code> changes on every write session, comparing it against the boot receipt is what tells a resuming agent that its startup read is stale.' }
                    ]
                },
                lint: {
                    title: 'Post-Write Lint',
                    kind: 'core',
                    meta: 'eight checks · exits 1 on violation',
                    source: 'scripts/check_memory.sh',
                    flags: [{ label: 'Key decision', tone: 'decision' }],
                    role: 'The part that runs after the agent, not instead of it.',
                    detail: [
                        { label: 'What it checks', text: 'Protocol version match against <code>CONFIG.md</code>, required files present, per-file entry caps, the <code>TASKS.md</code> Done cap, sync-log block rules, entry header format, a secrets scan, and the long-term-memory size budget.' },
                        { label: 'Secrets', text: 'A regex sweep for API-key and password assignment shapes plus known token prefixes — <code>sk-</code>, <code>ghp_</code>, <code>AKIA</code>, private-key headers. Any hit is an error, not a warning.' },
                        { label: 'Informational versus fatal', text: 'A stale write lock and boot-receipt drift are reported but do not fail the run, because the lock helper reclaims the first on the next acquire and the second is a hint about staleness, not a violation.' },
                        { label: 'The honest limit', text: 'The secret scan is a regex, and the marker lint checks structure and protocol version — it does not hash-verify block contents.' }
                    ]
                },
                git: {
                    title: 'Git Recovery Layer',
                    kind: 'branch',
                    meta: 'optional · asked for · never auto-run',
                    role: 'Overwrite recovery, offered rather than assumed.',
                    detail: [
                        { label: 'What it does', text: 'When enabled, <code>AI_MEMORY/</code> history gives you a way back from an overwrite. The choice is recorded in <code>CONFIG.md</code>.' },
                        { label: 'The rule', text: 'The skill never auto-installs software and only ever runs <code>git init</code> with explicit permission. During init it asks; without git everything still works and you lose overwrite recovery.' },
                        { label: 'What it is not', text: 'A nested repository is local recovery, not off-machine backup. That distinction is stated in the risk list rather than left for someone to discover after a disk failure.' }
                    ]
                },
                archive: {
                    title: 'Overflow Archive',
                    kind: 'branch',
                    meta: 'where the caps send things',
                    source: 'AI_MEMORY/archive/',
                    role: 'The pressure valve that lets the caps be strict.',
                    detail: [
                        { label: 'What it does', text: 'Entries pushed out by the five-per-file cap and sync-log blocks past the seven-day window land here instead of being deleted.' },
                        { label: 'Why it exists', text: 'A cap without an archive is data loss, and an archive without a cap is an unbounded file. The pair is what makes &ldquo;distilled current state&rdquo; a workable contract.' },
                        { label: 'The accepted cost', text: 'Distillation is lossy. Detail does get lost, and that is listed as an unresolved risk rather than described as a feature.' }
                    ]
                },
                limit: {
                    title: 'What Cannot Be Enforced',
                    kind: 'edge',
                    meta: 'the prompt is the protocol',
                    source: 'docs/KnownRisk.txt',
                    flags: [{ label: 'Constraint', tone: 'constraint' }],
                    role: 'The boundary the whole design is organised around.',
                    detail: [
                        { label: 'The core admission', text: 'Quick reference, on-demand protocol, and lint all reduce drift. None of them can force an agent to read the memory, write to it, or run the check. The protocol lives in a prompt, and a prompt is not a runtime.' },
                        { label: 'What follows from it', text: 'Every mechanism here is chosen to be observable rather than mandatory — a boot receipt instead of a gate, a lint that runs after the write, a lock that protects agents which use it and cannot see agents which do not.' },
                        { label: 'Sequential, not concurrent', text: 'The lock is a single-machine advisory lock. It prevents accidental overlap between two agents working in turn; it is not a cross-machine or concurrent-write solution, and both agents should not run on the same project at once.' },
                        { label: 'Why say it out loud', text: 'A coordination tool that implies guarantees it cannot keep is more dangerous than one that states its boundary, because people stop checking.' }
                    ]
                }
            },
            build: {
                graph: {
                    summary: 'This is not a call graph — there is no program. It is an instantiation graph: <code>SKILL.md</code> is what an agent reads, and <code>init</code> copies the <code>templates/</code> tree into a target project, where two bash scripts then guard six Markdown files. The whole product is 275 lines of protocol plus two scripts, which is why the constraint that a prompt cannot be enforced matters so much.',
                    nodes: [
                        { id: 'skill', label: 'SKILL.md', kind: 'input', meta: '90 lines', note: 'The entry an agent loads. Everything else is referenced from here.' },
                        { id: 'ops', label: 'references/operations.md', kind: 'branch', meta: 'loaded on demand', note: 'The long-form procedures, kept out of the always-loaded file.' },
                        { id: 'tproject', label: 'templates/project/', kind: 'core', meta: '3 docs + 2 scripts', note: 'What init copies: protocol, boot rules, and the two guards.' },
                        { id: 'tmemory', label: 'templates/memory/', kind: 'core', meta: '6 files', note: 'The AI_MEMORY/ skeleton: CONFIG, PROJECT, DECISIONS, TASKS, LEARNINGS, SYNC_LOG.' },
                        { id: 'protocol', label: 'MEMORY_PROTOCOL.md', kind: 'branch', meta: '143 lines', note: 'The rule set both agents follow, versioned as v1.3.' },
                        { id: 'lock', label: 'memory_lock.sh', kind: 'edge', meta: 'acquire · release · verify · boot · status', note: 'mkdir lock, TTL reclaim, fail-closed owner check.' },
                        { id: 'lint', label: 'check_memory.sh', kind: 'edge', meta: '8 checks · exits 1', note: 'Protocol version, caps, header format, secrets, size budget.' },
                        { id: 'memory', label: 'AI_MEMORY/', kind: 'core', meta: 'in the target project', note: 'What the two agents actually read and write.' }
                    ],
                    edges: [
                        { from: 'skill', to: 'ops', label: 'on demand', weight: 2 },
                        { from: 'skill', to: 'tproject', label: 'init copies', weight: 5 },
                        { from: 'skill', to: 'tmemory', label: 'init copies', weight: 6 },
                        { from: 'tproject', to: 'protocol', label: '', weight: 1 },
                        { from: 'tproject', to: 'lock', label: '', weight: 1 },
                        { from: 'tproject', to: 'lint', label: '', weight: 1 },
                        { from: 'tmemory', to: 'memory', label: 'becomes', weight: 6 },
                        { from: 'lock', to: 'memory', label: 'guards', weight: 1 },
                        { from: 'lint', to: 'memory', label: 'validates', weight: 8 },
                        { from: 'protocol', to: 'memory', label: 'governs', weight: 1 }
                    ]
                },
                practice: [
                    {
                        title: 'The always-loaded file is 90 lines',
                        text: '<code>SKILL.md</code> is what an agent reads on every session, so the long procedures live in <code>references/operations.md</code> and are pulled in only when a specific operation runs. A protocol that costs context on every turn gets skipped; keeping the entry short is what makes it survivable to actually load.'
                    },
                    {
                        title: 'Templates, not generated files',
                        text: '<code>init</code> copies <code>templates/</code> and nothing else — no package installation, no code generation, no network. That is why the dependency list is bash and coreutils, and why every file in a target project can be read and edited by hand afterwards.'
                    },
                    {
                        title: 'The two scripts guard opposite ends',
                        text: '<code>memory_lock.sh</code> runs before a write and <code>check_memory.sh</code> runs after it. Neither can compel an agent to call it. That is the reason the lock is advisory and self-healing rather than strict, and the reason the lint exits 1 instead of trying to prevent the write.'
                    },
                    {
                        title: 'The protocol carries a version, so migration is a real operation',
                        text: '<code>CONFIG.md</code> records the protocol version and <code>check_memory.sh</code> fails when it does not match what the script expects — with a message telling you to run migrate. Downstream copies do not auto-update, so a version mismatch has to be loud.'
                    },
                    {
                        title: 'CI replays the demo',
                        text: 'The pipeline gates the template and boot contract, protocol-version failures, lock ownership, the secrets scan, and a replay of <code>assets/demo.sh</code> — a real project being initialised and linted. For a product made of Markdown, running the instructions is the only meaningful test.'
                    }
                ]
            },
            decisions: [
                {
                    ref: 'Lock',
                    title: 'Make the lock self-healing instead of trusting release',
                    context: '<code>mkdir</code> gives atomic acquisition, but release depended on the agent remembering to remove the directory. A crashed session left an orphan that blocked the other agent until a human intervened.',
                    decision: 'A well-formed lock older than the TTL is auto-reclaimed on the next acquire; missing or malformed owner metadata fails closed and requires explicit repair.',
                    tradeoff: 'A holder working past the TTL can be reclaimed out from under itself — which is exactly why <code>verify</code> exists.',
                    result: 'An interrupted agent no longer needs a human to unblock the other one.'
                },
                {
                    ref: 'NoPID',
                    title: 'No PID or liveness check, deliberately',
                    context: 'The obvious way to detect a stale lock is to check whether the holding process is alive.',
                    decision: 'Record no PID. The holder is an LLM agent issuing short, separate bash calls rather than a long-lived process, so age is the only reliable staleness signal.',
                    tradeoff: 'Staleness is decided by a timer rather than by evidence, so the TTL has to be chosen conservatively and memory writes have to stay short.',
                    result: 'The system does not ship a liveness check that would have been wrong essentially every time it ran.'
                },
                {
                    ref: 'Verify',
                    title: 'Re-check ownership immediately before the write',
                    context: 'TTL reclaim can race a holder that is genuinely still working, and the two write paths then interleave and silently lose an update.',
                    decision: 'A cheap <code>verify</code> right before the final write and before the lint, confirming the lock still carries your name.',
                    tradeoff: 'One more call in every write sequence, and it narrows exactly one race rather than providing general concurrency safety.',
                    result: 'The failure mode the TTL introduced is closed for agents that use the lock — and the remaining gap is documented rather than implied away.'
                },
                {
                    ref: 'Boot',
                    title: 'A startup receipt, not a startup gate',
                    context: 'Nothing in a prompt-defined protocol can force an agent to read the memory before acting.',
                    decision: 'Stamp a timestamped receipt when the tiered read happens, and have <code>status</code> and the lint flag it when the sync log has moved since.',
                    tradeoff: 'It detects a stale view after the fact instead of preventing one.',
                    result: 'Startup compliance became observable, which is the strongest honest claim available at this layer.'
                },
                {
                    ref: 'Caps',
                    title: 'Five entries per file, and an archive underneath',
                    context: 'Agent memory that accumulates stops being read, and a file nobody reads is worse than no file at all.',
                    decision: 'Hard caps per durable file with overflow moved to <code>archive/</code>, plus a size budget on the distilled long-term memory block.',
                    tradeoff: 'Distillation is lossy, and detail genuinely disappears from the working set.',
                    result: 'The memory stays short enough that reading it is cheaper than re-deriving the state.'
                },
                {
                    ref: 'Lint',
                    title: 'Enforce after the write, since you cannot enforce before it',
                    context: 'The protocol cannot compel an agent to follow it, but a script can refuse to accept the result.',
                    decision: 'A post-write lint with eight checks that exits 1 — protocol version, required files, caps, header format, secrets, and size budget — with stale-lock and boot drift reported as informational.',
                    tradeoff: 'A violation is caught after it is on disk rather than prevented.',
                    result: 'CI can gate the template and boot contract, protocol-version failures, lock ownership, secrets, and a demo replay.'
                },
                {
                    ref: 'NoInstall',
                    title: 'No runtime package installation, ever',
                    context: 'A memory skill that installs software is a memory skill that can break a project it was only supposed to read.',
                    decision: 'Plain Markdown plus two bash helpers; <code>init</code> only copies template files. Git is asked about and recorded in <code>CONFIG.md</code>; <code>git init</code> runs only with explicit permission.',
                    tradeoff: 'Windows needs WSL or Git Bash, and the npx install path is optional rather than the default.',
                    result: 'The dependency list is bash and coreutils — everything else degrades to a missing feature rather than a failed install.'
                }
            ],
            constraints: [
                { title: 'The prompt is the protocol', text: 'Quick reference, on-demand protocol, and lint reduce drift but cannot force an agent to read, write, or run the check. This is the constraint every other decision is shaped around.' },
                { title: 'Sequential collaboration only', text: 'The write lock is a single-machine advisory lock. It prevents accidental overlap between agents working in turn — it is not cross-machine, and not a concurrent-write solution.' },
                { title: 'Corrupt owner metadata needs a human', text: 'A lock with missing or malformed owner data fails closed. The helper will not guess its age or delete it, because guessing here loses writes.' },
                { title: 'An agent that skips the lock is invisible', text: 'Nothing in the system can detect a writer that never acquired the lock. <code>verify</code> protects agents that participate; it cannot see the ones that do not.' },
                { title: 'Downstream copies upgrade manually', text: '<code>--copy</code> installs, clones, and already-initialized projects do not auto-update; they need a pull or reinstall and an explicit migrate.' },
                { title: 'Long-term memory is lossy', text: 'The five-entry caps and distillation lose detail by design, and the nested git layer is local recovery rather than off-machine backup.' },
                { title: 'Validation is bounded', text: 'The secret scan is a regex, and the marker lint checks structure and protocol version rather than hashing full block contents.' }
            ],
            failures: [
                {
                    title: 'An orphan lock blocked the other agent',
                    observed: 'A crashed or interrupted session left <code>.write.lock</code> in place, and the other agent stayed blocked until a human deleted the directory.',
                    cause: 'Acquisition was atomic, but release depended on the agent remembering to run it — which a crash guarantees it will not.',
                    fix: 'Well-formed locks became self-healing: a lock older than the TTL is auto-reclaimed on the next acquire, while malformed owner metadata still fails closed.'
                },
                {
                    title: 'The obvious staleness check would have been wrong every time',
                    observed: 'A PID-based liveness check — the standard way to identify a dead lock holder — reports the holder as dead almost immediately after the lock is taken.',
                    cause: 'The holder is an LLM agent issuing short, separate bash calls, not a long-lived process. The recorded PID has already exited by the time anyone reads it.',
                    fix: 'No PID is recorded at all. Age is the only staleness signal that carries information here, and the reasoning is written into the script header so it is not &ldquo;fixed&rdquo; later by someone adding a liveness check.'
                },
                {
                    title: 'TTL reclaim raced a holder that was still working',
                    observed: 'A holder working past the TTL could have its lock reclaimed mid-session, after which the reclaim and the original writes interleaved and an update disappeared.',
                    cause: 'Self-healing solved the orphan problem by introducing a timer that cannot distinguish &ldquo;crashed&rdquo; from &ldquo;slow&rdquo;.',
                    fix: '<code>verify</code> re-checks lock ownership immediately before the final write. It narrows this one race and explicitly does not claim to be general concurrency control.'
                },
                {
                    title: 'A resuming agent could act on a stale view',
                    observed: 'An agent that resumed work could read memory that had already been superseded by the other agent&rsquo;s session, with nothing indicating the view was old.',
                    cause: 'Startup reads left no trace, so there was no way to compare what an agent had read against what had since changed.',
                    fix: '<code>boot</code> records a timestamped receipt, and <code>status</code> plus the lint flag it when <code>SYNC_LOG.md</code> has moved since — visibility rather than an enforced gate, which is the most this layer can honestly provide.'
                }
            ],
            evidence: {
                stats: [
                    { value: 'v1.3', label: 'Memory protocol', note: 'versioned and migratable' },
                    { value: '2', label: 'Agents supported', note: 'Codex + Claude Code' },
                    { value: '8', label: 'Lint checks', note: 'exits 1 on violation' },
                    { value: '2', label: 'Bash helpers', note: 'lock + lint, nothing else' },
                    { value: '0', label: 'Runtime installs', note: 'init only copies templates' },
                    { value: '5', label: 'Entries per file', note: 'overflow goes to archive' },
                    { value: '7', label: 'Durable memory files', note: 'plus a dated sync log' },
                    { value: 'MIT', label: 'License', note: 'skill and templates' }
                ],
                note: '<strong>The risk file is the point.</strong> <code>docs/KnownRisk.txt</code> keeps only the risks that are still open or knowingly accepted, and it leads with the biggest one: the protocol lives in a prompt, so nothing can compel an agent to follow it. Every mechanism in the system — the receipt, the post-write lint, the advisory lock — is shaped by that admission rather than pretending around it.',
                links: [
                    { label: 'Repository', href: 'https://github.com/ycl-2004/ShareMemory', text: 'github.com/ycl-2004/ShareMemory' },
                    { label: 'Memory protocol', href: 'https://github.com/ycl-2004/ShareMemory/blob/main/MEMORY_PROTOCOL.md', text: 'the rule set both agents follow' },
                    { label: 'Design analysis', href: 'https://github.com/ycl-2004/ShareMemory/blob/main/PROJECT_DETAILS.md', text: 'capability boundaries and risks' },
                    { label: 'Chinese README', href: 'https://github.com/ycl-2004/ShareMemory/blob/main/README.zh.md', text: 'README.zh.md' }
                ]
            }
        },
        'project-screen-bridge': {
            label: 'System Breakdown',
            thesis: 'Authenticated pairing → a route that can prove what it is → a real virtual display the iPad only renders.',
            frame: 'This product needs the heavy permissions: Screen Recording to capture a display, and once it did, Accessibility to inject input. Most of the decisions below either remove a permission from that list or prove that the path the UI claims is the path the stream is actually using.',
            map: {
                entry: 'Mac and iPad on the same local network',
                stages: [
                    ['discovery'],
                    ['route'],
                    ['auth'],
                    ['session'],
                    ['video', 'audio'],
                    ['health'],
                    ['boundary']
                ]
            },
            nodes: {
                discovery: {
                    title: 'Bonjour Discovery',
                    kind: 'input',
                    meta: '_yc-cast._tcp · interfaces retained',
                    role: 'Finding the iPad, and keeping the evidence of how it was found.',
                    detail: [
                        { label: 'What it does', text: 'The Mac browses for the receiver on <code>_yc-cast._tcp</code> and keeps <code>NWBrowser.Result.interfaces</code> rather than discarding it.' },
                        { label: 'Why that detail matters', text: 'Those interfaces are the only trustworthy statement about how a peer is reachable. Discarding them is what forced the old code to guess the active interface from <code>NWPath.availableInterfaces.first</code> — a list of what is available to the path, not what the path is using.' },
                        { label: 'Consequence', text: 'Discovery results become an ordered reachability plan instead of a single address, which is what makes strict routes expressible at all.' }
                    ]
                },
                route: {
                    title: 'Strict Network Route',
                    kind: 'core',
                    meta: 'Auto · Cable · AWDL · Wi-Fi · no silent fallback',
                    source: 'BetterCastShared/ConnectionRetryPolicy.swift',
                    flags: [{ label: 'Key decision', tone: 'decision' }, { label: 'ADR-006', tone: 'ref' }],
                    role: 'Claiming only what Network.framework can actually prove.',
                    detail: [
                        { label: 'What it does', text: 'Auto walks the receiver&rsquo;s Bonjour interfaces as an ordered plan — wired first, then infrastructure Wi-Fi, then AWDL, then one unscoped attempt for compatibility. A failed candidate keeps the same per-device connection reservation and advances instead of starting a competing dial chain.' },
                        { label: 'Strict means strict', text: 'Require Cable accepts only Bonjour results carrying a wired interface and sets that exact interface as <code>NWParameters.requiredInterface</code>. AWDL and Wi-Fi do the same for their own interface types. A strict selection that cannot be satisfied fails; it does not quietly become something else.' },
                        { label: 'The constraint behind it', text: 'Sidecar&rsquo;s USB transport is a private system feature, not a reusable third-party protocol. Screen Bridge can only express what Apple&rsquo;s public Network.framework APIs let it require and observe — so the UI reports both the path it requested and the interface Bonjour actually observed.' }
                    ]
                },
                auth: {
                    title: 'Pairing Handshake',
                    kind: 'core',
                    meta: 'nonce · HMAC-SHA256 · Keychain',
                    source: 'BetterCastShared/PairingAuthenticator.swift · PairingSecretStore.swift',
                    flags: [{ label: 'ADR-001', tone: 'ref' }],
                    role: 'The gate that has to close before any capture starts.',
                    detail: [
                        { label: 'What it does', text: 'A pairing code establishes a shared secret stored in the Keychain on both devices. A nonce-based HMAC-SHA256 handshake runs before the Mac creates the capture pipeline, so an unauthenticated peer never causes a screen to be recorded.' },
                        { label: 'Why it is not optional', text: 'Screen Recording cannot be removed while preserving the product, so the authentication gate is the compensating control. It is ordered before pipeline creation for exactly that reason.' },
                        { label: 'Both directions', text: 'Receiver→sender control messages travel inside an <code>AuthenticatedEnvelope</code> — an HMAC over a monotonic sequence number — using a key derived from the pairing secret.' },
                        { label: 'Reset means reset', text: 'Resetting the pairing code stops listeners and cancels pending <em>and</em> already-authenticated transports, rather than leaving live sessions running under a secret the user just revoked.' }
                    ]
                },
                session: {
                    title: 'One Logical Session',
                    kind: 'core',
                    meta: 'session UUID · audio must join it',
                    source: 'BetterCastShared/ReceiverSessionPolicy.swift · BackgroundDisplayHoldPolicy.swift',
                    flags: [{ label: 'ADR-003', tone: 'ref' }, { label: 'ADR-009', tone: 'ref' }],
                    role: 'Two TCP connections that have to behave like one thing.',
                    detail: [
                        { label: 'What it does', text: 'The <code>mediaControl</code> handshake creates a receiver-generated session UUID. An <code>audio</code> handshake must present that UUID and may only join the currently active media session. Only the media/control connection drives receiver UI state, watchdog teardown, heartbeats, keyframe requests, and screen-info commands.' },
                        { label: 'Ordering fix', text: 'The receiver now sends its pixel dimensions in <code>ReceiverHello</code>, <em>before</em> the sender creates its virtual display. Previously Best Fit built a default display, then destroyed and replaced it when the dimensions arrived over a later control message.' },
                        { label: 'Backgrounding holds the display, not the connection', text: 'When the iPad backgrounds, a pipeline whose grace window is open parks its <code>VirtualDisplayManager</code> in a device-keyed hold carrying the display ID, its exact geometry, and a deadline. The next authenticated session for that device <em>adopts</em> the held display.' },
                        { label: 'Why adoption is mandatory', text: 'WindowServer publishes at most one of these private virtual displays at a time, so adopting is not an optimization — creating a second one is not available as a fallback.' }
                    ]
                },
                video: {
                    title: 'Virtual Display & Video',
                    kind: 'branch',
                    meta: 'ScreenCaptureKit → H.264 → bounded delivery',
                    source: 'BetterCastSender/VirtualDisplayManager.swift · ScreenRecorder.swift · VideoEncoder.swift',
                    role: 'A real extended desktop, not a mirror.',
                    detail: [
                        { label: 'What it does', text: 'Creates a Mac virtual display placed right, left, above, or below the main one, with HiDPI presets including a larger-text 1024×768 option. Mac windows can be dragged onto it, which is what separates an extended display from screen mirroring.' },
                        { label: 'Bounded delivery', text: 'P2P and wired writes previously accumulated without completion backpressure. Those routes are usually fast, but a transient receiver stall could grow Network.framework&rsquo;s queue and turn a short interruption into seconds of latency. Delivery is now bounded, with adaptive bitrate and keyframe recovery on top.' },
                        { label: 'Input stays home', text: 'The iPad does not register touch-control gestures on the video renderer and does not forward local touch to the Mac. Authenticated receiver commands remain in scope for connection health, keyframe requests, and screen-size updates only.' }
                    ]
                },
                audio: {
                    title: 'Per-App Audio Routing',
                    kind: 'branch',
                    meta: 'Core Audio process taps · one destination each',
                    source: 'BetterCastSender/ProcessAudioTapCapture.swift · AudioApplicationCatalog.swift',
                    flags: [{ label: 'Hard problem', tone: 'hard' }, { label: 'ADR-010', tone: 'ref' }],
                    role: 'Mapping process object IDs onto the app names people actually recognise.',
                    detail: [
                        { label: 'The problem', text: 'Core Audio process taps operate on process object IDs, not user-facing app identities. Chromium moves output through helper processes; Safari can surface a shared <code>com.apple.WebKit.GPU</code> XPC process. Process object IDs also change whenever an app relaunches.' },
                        { label: 'What it does', text: 'A dynamic catalog is built from Core Audio&rsquo;s process list, bundle ID, PID, and running-output properties. Helpers are grouped under a stable identity — first by their outer <code>.app</code>, then by a localized host-app name for shared XPC services, then by the longest matching regular-app bundle-ID prefix.' },
                        { label: 'One destination per app', text: 'Each application is either <code>This Mac</code> or exactly one canonical receiver device ID. Assignments persist across launches and stay visible while the app or receiver is offline.' },
                        { label: 'Timing', text: 'The Core Audio input timestamp is passed through the tap callback and converted onto the 48 kHz packet timeline, with the synthetic packet counter kept only as a compatibility fallback. The encoder uses a reusable byte ring buffer instead of repeated <code>Data</code> prefix removal.' }
                    ]
                },
                health: {
                    title: 'Independent Health Signals',
                    kind: 'core',
                    meta: 'heartbeat · arrival · decode · render, separately',
                    source: 'BetterCastShared/VideoFlightWindowPolicy.swift · PipelineUpdatePolicy.swift',
                    flags: [{ label: 'Key decision', tone: 'decision' }, { label: 'ADR-004', tone: 'ref' }],
                    role: 'Knowing which stage is broken, rather than that something is.',
                    detail: [
                        { label: 'The old model', text: 'Any received byte counted as proof the picture was healthy — so audio or heartbeat traffic could hide a stalled video decoder or renderer.' },
                        { label: 'The opposite trap', text: 'ScreenCaptureKit may emit no new complete frame while a desktop is visually static, so treating frame arrival alone as liveness reports a perfectly healthy still screen as disconnected.' },
                        { label: 'What it does', text: 'The sender emits an explicit media heartbeat independently of changed frames. The receiver tracks heartbeat, video access-unit arrival, successful decode, and successful renderer enqueue as four separate timestamps, and a session fails with a specific transport, first-frame, decoder, or renderer reason.' },
                        { label: 'Startup is special-cased', text: 'Decoder and renderer stall detection becomes eligible only after that stage has completed at least one frame. During startup the first-frame deadline is authoritative, so <code>.distantPast</code> initialization sentinels cannot turn the normal first handoff into an immediate false stall.' }
                    ]
                },
                boundary: {
                    title: 'Permission & Trust Boundary',
                    kind: 'edge',
                    meta: 'Screen Recording · local network · no telemetry',
                    flags: [{ label: 'Constraint', tone: 'constraint' }],
                    role: 'What this product requires, and what it deliberately gave up to require less.',
                    detail: [
                        { label: 'Required', text: 'Screen Recording, to capture a display. There is no version of the product without it.' },
                        { label: 'Given up', text: 'Accessibility. The display-only decision removed iPad-originated input injection, and with it the second sensitive permission — the sender no longer exposes the toggle and clears the legacy <code>iPadInputEnabled</code> default.' },
                        { label: 'Not claimed', text: 'Video and audio are intended for trusted local networks and are not independently encrypted end to end. The README says so under Known limitations rather than leaving &ldquo;authenticated&rdquo; to imply it.' },
                        { label: 'Absent by design', text: 'No automatic update check and no external issue-report upload path in the app.' }
                    ]
                }
            },
            build: {
                graph: {
                    summary: 'Two independent apps — a macOS sender and an iPadOS receiver — that agree on a wire protocol without sharing a runtime. <code>BetterCastShared/</code> is what they both name: 59 references from the receiver, 58 from the sender, almost perfectly balanced. Nine of its eleven files end in <code>Policy</code>, which is why 136 tests can cover the behaviour that matters without either app being launched.',
                    nodes: [
                        { id: 'receiver', label: 'BetterCastReceiverIOS/', kind: 'input', meta: '10 files · 3,336 lines', note: 'The iPad app: listener, decoder, renderer, audio.' },
                        { id: 'sender', label: 'BetterCastSender/', kind: 'core', meta: '11 files · 8,565 lines', note: 'The Mac app: virtual display, capture, encode, send.' },
                        { id: 'audiocat', label: 'BetterCastSenderSupport/', kind: 'branch', meta: '1 file · 430 lines', note: 'The Core Audio process catalogue, sender-only.' },
                        { id: 'shared', label: 'BetterCastShared/', kind: 'edge', meta: '11 files · 1,396 lines', note: 'The protocol and the policies. Both sides depend on it; it depends on neither.' }
                    ],
                    edges: [
                        { from: 'receiver', to: 'shared', label: '59', weight: 59 },
                        { from: 'sender', to: 'shared', label: '58', weight: 58 },
                        { from: 'sender', to: 'audiocat', label: '17', weight: 17 }
                    ]
                },
                drill: {
                    shared: {
                        title: 'BetterCastShared/',
                        summary: 'Nine of these eleven files are named <code>*Policy</code>. They hold the decisions — when a session is unhealthy, when to reconnect, when to drop bitrate, how long a backgrounded display is held — as pure logic with no network and no AVFoundation in sight. That is the reason <code>swift test</code> can run 136 tests over the parts most likely to be wrong.',
                        nodes: [
                            { id: 'auth', label: 'PairingAuthenticator', kind: 'core', meta: '300 lines', note: 'Nonce, HMAC-SHA256, and the authenticated envelope.' },
                            { id: 'secret', label: 'PairingSecretStore', kind: 'edge', meta: '85 lines', note: 'The pairing secret, in the Keychain on both devices.' },
                            { id: 'framing', label: 'StreamFraming', kind: 'core', meta: '247 lines', note: 'Length-prefixed type bytes. Protocol v4 lives here.' },
                            { id: 'session', label: 'ReceiverSessionPolicy', kind: 'branch', meta: '21 lines', note: 'One logical session; audio must present its UUID.' },
                            { id: 'flight', label: 'VideoFlightWindowPolicy', kind: 'branch', meta: '45 lines', note: 'Bounded delivery — the backpressure ADR-004 added.' },
                            { id: 'health', label: 'PipelineUpdatePolicy', kind: 'branch', meta: '56 lines', note: 'Heartbeat, arrival, decode, render as four signals.' },
                            { id: 'retry', label: 'ConnectionRetryPolicy', kind: 'branch', meta: '90 lines', note: 'The ordered reachability plan behind Auto.' },
                            { id: 'bitrate', label: 'AdaptiveBitratePolicy', kind: 'branch', meta: '47 lines', note: 'What to give up first when the link narrows.' },
                            { id: 'hold', label: 'BackgroundDisplayHoldPolicy', kind: 'branch', meta: '76 lines', note: 'The display hold from ADR-009, keyed by device.' },
                            { id: 'audio', label: 'AudioStreamingPolicy', kind: 'branch', meta: '413 lines', note: 'Timed AAC packets, bounded queue, rebuffering.' },
                            { id: 'const', label: 'PrivateBetterCastConstants', kind: 'edge', meta: '16 lines', note: 'Service names and identifiers, kept for compatibility.' }
                        ],
                        edges: [
                            { from: 'auth', to: 'const', label: '2' },
                            { from: 'secret', to: 'const', label: '2' },
                            { from: 'session', to: 'auth', label: '1' }
                        ]
                    },
                    sender: {
                        title: 'BetterCastSender/',
                        summary: '<code>BetterCastSenderApp</code> is 5,994 lines — the single largest file across every project here, and the honest structural problem in this repository. It names <code>VirtualDisplayManager</code> 23 times because display creation, adoption, and teardown are all coordinated from it. The media path below it is properly separated: capture, encode, and send are three files that do not know about each other.',
                        nodes: [
                            { id: 'app', label: 'BetterCastSenderApp', kind: 'input', meta: '5,994 lines', note: 'The Mac UI and every coordination path. The known concentration.' },
                            { id: 'display', label: 'VirtualDisplayManager', kind: 'core', meta: '469 lines', note: 'Creates, holds, and adopts the private virtual display.' },
                            { id: 'recorder', label: 'ScreenRecorder', kind: 'core', meta: '274 lines', note: 'ScreenCaptureKit on the virtual display.' },
                            { id: 'venc', label: 'VideoEncoder', kind: 'branch', meta: '494 lines', note: 'H.264 with keyframe recovery.' },
                            { id: 'aenc', label: 'AudioEncoder', kind: 'branch', meta: '444 lines', note: 'AAC with a reusable ring buffer, not Data prefix removal.' },
                            { id: 'tap', label: 'ProcessAudioTapCapture', kind: 'edge', meta: '398 lines', note: 'Core Audio process taps, per application.' },
                            { id: 'apkt', label: 'AudioPacketSender', kind: 'branch', meta: '203 lines', note: 'The second authenticated transport.' },
                            { id: 'input', label: 'InputHandler', kind: 'edge', meta: '36 lines', note: '36 lines, because ADR-002 deleted the rest of it.' }
                        ],
                        edges: [
                            { from: 'app', to: 'display', label: '23' },
                            { from: 'app', to: 'input', label: '7' },
                            { from: 'app', to: 'recorder', label: '5' },
                            { from: 'app', to: 'venc', label: '4' },
                            { from: 'recorder', to: 'venc', label: '2' },
                            { from: 'recorder', to: 'aenc', label: '1' },
                            { from: 'apkt', to: 'aenc', label: '2' }
                        ]
                    },
                    receiver: {
                        title: 'BetterCastReceiverIOS/',
                        summary: 'The iPad side is a third the size of the Mac side, and its two big files split cleanly: <code>NetworkListenerIOS</code> owns the transport and the health signals, <code>ViewController</code> owns what you see. <code>InputEvent</code> is still here at 50 lines — the type survived ADR-002 even though nothing sends one any more.',
                        nodes: [
                            { id: 'vc', label: 'ViewController', kind: 'input', meta: '1,008 lines', note: 'Pairing, connection state, and the rendering surface.' },
                            { id: 'listener', label: 'NetworkListenerIOS', kind: 'core', meta: '1,061 lines', note: 'Bonjour, both transports, and the four health timestamps.' },
                            { id: 'decoder', label: 'VideoDecoder', kind: 'branch', meta: '445 lines', note: 'H.264 decode with keyframe requests on error.' },
                            { id: 'renderer', label: 'VideoRendererViewIOS', kind: 'branch', meta: '163 lines', note: 'The layer the decoded frames are enqueued into.' },
                            { id: 'audio', label: 'AudioPlayerIOS', kind: 'branch', meta: '432 lines', note: 'Rebuffering playback for the timed AAC stream.' },
                            { id: 'delegate', label: 'AppDelegate', kind: 'edge', meta: '75 lines', note: 'Backgrounding — which is what starts the display hold.' }
                        ],
                        edges: [
                            { from: 'delegate', to: 'vc', label: '1' },
                            { from: 'vc', to: 'listener', label: '6' },
                            { from: 'vc', to: 'decoder', label: '2' },
                            { from: 'vc', to: 'renderer', label: '2' },
                            { from: 'listener', to: 'decoder', label: '3' },
                            { from: 'listener', to: 'renderer', label: '2' },
                            { from: 'listener', to: 'audio', label: '2' }
                        ]
                    }
                },
                practice: [
                    {
                        title: 'Decisions live in a Policy type, so they can be tested',
                        text: 'Nine files in the shared layer are named <code>*Policy</code> and contain no networking, no AVFoundation, and no UI. Session validity, retry order, bitrate adaptation, health classification, and the background display hold are all pure functions over state — which is how <code>swift test</code> reaches 136 tests on a product whose real behaviour needs two devices and a network.'
                    },
                    {
                        title: 'A protocol change bumps the version and fails the handshake early',
                        text: 'ADR-008 moved sender control frames inside an authenticated envelope and went v3 → v4. The version check makes an old peer fail the handshake with an actionable message — &ldquo;check that both devices run the same app version&rdquo; — instead of failing later on framing, where the symptom would have been a blank screen.'
                    },
                    {
                        title: 'The rename kept every identifier',
                        text: 'The product became Screen Bridge, but <code>BetterCast</code> module names, bundle identifiers, Keychain identifiers, and the <code>_yc-cast._tcp</code> Bonjour service were all preserved as compatibility identifiers. The folder names in this graph are the visible cost of that decision, and ADR-005 says so.'
                    },
                    {
                        title: 'A red historical tag is left red',
                        text: 'The published <code>v1.1.0</code> tag surfaced Swift 6.3 strict-concurrency errors in the Core Audio/GCD path. <code>main</code> now passes <code>-strict-concurrency=complete -warnings-as-errors</code> for both architectures, and the historical tag was left unchanged rather than quietly rebuilt — the README states which one is which.'
                    },
                    {
                        title: 'Ten decision records, one per protocol-visible change',
                        text: 'Every change that alters what goes over the wire, which permission is required, or how a session is identified has an ADR with a Context, a Decision, and Alternatives Considered. That is why the failure log for this project reads as a sequence rather than a list of bugs.'
                    }
                ]
            },
            decisions: [
                {
                    ref: 'ADR-002',
                    title: 'Make the product display-only and drop a permission',
                    context: 'Authenticated iPad touch, pointer, scroll, and keyboard input were injected into macOS through Accessibility. iPadOS system gestures stayed local anyway, and Mac control was most predictable when the user kept using the Mac&rsquo;s own keyboard and trackpad.',
                    decision: 'Remove the iPad Control path entirely: no toggle, no touch gestures registered on the renderer, no local touch forwarded. Authenticated receiver commands remain for health, keyframes, and screen size.',
                    tradeoff: 'A genuine capability was deleted, and anyone who wanted iPad-as-input-device lost it.',
                    result: 'Accessibility is no longer required for the shipping workflow, which is a permanent reduction in what the app has to be trusted with.'
                },
                {
                    ref: 'ADR-008',
                    title: 'Authenticate the sender direction too',
                    context: 'A security review of protocol v3 found the sender&rsquo;s media heartbeat (<code>0x04</code>) and disconnect notice (<code>0x03</code>) were bare single type bytes on the wire, while every receiver→sender message already travelled inside an HMAC envelope.',
                    decision: 'Bump the protocol to v4 and carry those two commands inside an <code>AuthenticatedEnvelope</code> under a new type byte, with a version check that fails the handshake early and actionably.',
                    tradeoff: 'Sender and receiver must both be updated; old peers cannot connect.',
                    result: 'On a shared LAN, an on-path attacker could previously forge <code>0x03</code> to tear down live sessions or forge <code>0x04</code> to keep zombie sessions alive past their liveness timeouts. Both are closed.'
                },
                {
                    ref: 'ADR-006',
                    title: 'Express only what the network APIs can prove',
                    context: 'The old cable preference prohibited Wi-Fi for one dial and then silently retried without restrictions, while the UI kept presenting the user&rsquo;s cable choice. Discovery also discarded interface evidence and inferred the active interface from a list of available ones.',
                    decision: 'Four explicit modes. Auto uses the receiver&rsquo;s Bonjour interfaces as an ordered plan; each strict mode accepts only matching results and sets that exact interface as required.',
                    tradeoff: 'A strict selection can simply fail where the old code would have connected over something else.',
                    result: 'The route shown in the UI is the route being used, which is the only version of that claim worth making.'
                },
                {
                    ref: 'ADR-004',
                    title: 'Track four health signals, not one',
                    context: 'Any received byte proved the picture was healthy, so audio could mask a stalled decoder — and frame arrival alone would report a static desktop as dead.',
                    decision: 'An explicit heartbeat independent of frame changes, plus separate timestamps for arrival, decode, and render, each producing a specific failure reason.',
                    tradeoff: 'Four signals and a startup special case instead of one timeout.',
                    result: 'A failure names the stage that broke, and an unchanged desktop stays healthy.'
                },
                {
                    ref: 'ADR-003',
                    title: 'One logical session across two transports',
                    context: 'Video/control and Chrome audio opened separate TCP connections that the iPad stored in one array. Any connection could publish global UI state, so an auxiliary audio timeout made a healthy video session look disconnected.',
                    decision: 'A receiver-generated session UUID created by the media/control handshake, which the audio handshake must present. Only media/control drives UI state, watchdogs, and control commands.',
                    tradeoff: 'A session identity to generate, carry, and validate on every auxiliary connection.',
                    result: 'A new authenticated media connection atomically replaces the old session and its audio transport, instead of leaving orphans alive.'
                },
                {
                    ref: 'ADR-009',
                    title: 'The grace period holds a display, not a connection',
                    context: 'The receiver announced backgrounding, and the sender paused sends and swapped a 15-second heartbeat timeout for a 5-minute deadline, intending to keep the extended desktop alive across a quick app switch. A real-device log showed the intent was never reached.',
                    decision: 'Park the <code>VirtualDisplayManager</code> in a device-keyed hold carrying the display ID, its exact geometry, and a deadline; the next authenticated session for that device adopts it.',
                    tradeoff: 'A held display is state that outlives its session and has to be reclaimed correctly.',
                    result: 'Mac windows stay where they were across a brief iPad backgrounding — and adoption is mandatory, because WindowServer publishes only one such display at a time.'
                },
                {
                    ref: 'ADR-005',
                    title: 'Rename the product, keep the identifiers',
                    context: 'The project presented as YC Cast, but &ldquo;cast&rdquo; suggests mirroring, and the product is a true second display. The repository also carried historical BetterCast module names, bundle identifiers, Keychain identifiers, and a <code>_yc-cast._tcp</code> service.',
                    decision: 'Adopt Screen Bridge for everything user-facing — app names, packaging, permission text, UI copy, docs — and preserve the internal identifiers as compatibility identifiers.',
                    tradeoff: 'Source module names no longer match the product name, which reads as inconsistency to a new reader.',
                    result: 'The rename cost nothing in pairing compatibility, Keychain access, or Bonjour discovery, because none of those identifiers moved.'
                }
            ],
            constraints: [
                { title: 'Screen Recording cannot be removed', text: 'Capturing a display requires it, so the compensating control is that authentication completes before the capture pipeline is ever created.' },
                { title: 'Sidecar&rsquo;s USB transport is not a public protocol', text: 'It is a private system feature, so Screen Bridge can only express what Network.framework can require and observe — which is why routes report both the requested path and the observed interface.' },
                { title: 'WindowServer publishes one private virtual display at a time', text: 'A reconnecting session must adopt the held display; creating a second one is not available as a fallback.' },
                { title: 'Core Audio taps address processes, not apps', text: 'Process object IDs change on relaunch, and helper processes hide the real app identity, so a stable user-facing name has to be reconstructed.' },
                { title: 'A static desktop produces no new frames', text: 'ScreenCaptureKit may emit nothing while the screen is visually unchanged, so frame arrival can never be the only liveness signal.' },
                { title: 'The stream is not end-to-end encrypted', text: 'Video and audio are intended for trusted local networks. Authentication gates who may connect; it does not encrypt the media.' },
                { title: 'No public iPad build', text: 'The receiver must be built with your own Xcode team, and the Mac ZIP is ad-hoc signed — macOS Local Network permission identity may not survive a rebuild.' }
            ],
            failures: [
                {
                    title: 'The UI said cable while the stream used Wi-Fi',
                    observed: 'A user selecting the cable preference saw that choice reflected in the interface while the established stream ran over router Wi-Fi.',
                    cause: 'The preference prohibited Wi-Fi for one dial and then silently retried without restrictions. Discovery also discarded <code>NWBrowser.Result.interfaces</code>, and diagnostics read <code>NWPath.availableInterfaces.first</code> as the active interface — a list of what is available, not what is in use.',
                    fix: 'Keep the Bonjour interface evidence, set the exact interface as <code>NWParameters.requiredInterface</code> for strict modes, and let a strict selection fail rather than become something else.',
                    ref: 'ADR-006'
                },
                {
                    title: 'Sender control frames were forgeable',
                    observed: 'A security review of protocol v3 found the media heartbeat and disconnect notice travelling as bare single type bytes, with no integrity protection at all, on a plaintext LAN transport.',
                    cause: 'The receiver→sender direction had been wrapped in an HMAC envelope; the sender→receiver direction had never been given the same treatment.',
                    fix: 'Protocol v4 carries both commands inside an <code>AuthenticatedEnvelope</code>. Before that, an on-path attacker could forge a disconnect to tear down live sessions, or forge a heartbeat to keep zombie sessions past liveness timeouts.',
                    ref: 'ADR-008'
                },
                {
                    title: 'Audio traffic hid a stalled picture',
                    observed: 'A session with a dead video decoder or renderer continued to report itself healthy, because audio and heartbeat bytes were still arriving.',
                    cause: 'Any received byte was treated as proof the picture was fine — one signal standing in for four different stages.',
                    fix: 'Separate timestamps for heartbeat, access-unit arrival, decode, and renderer enqueue, each able to fail the session with its own reason. Stall detection for a stage only becomes eligible after that stage has completed one frame.',
                    ref: 'ADR-004'
                },
                {
                    title: 'The grace period never actually held the display',
                    observed: 'The sender logged that it was starting a 300-second grace period and keeping the virtual display — and a real-device log showed the display was torn down anyway, moving Mac windows home.',
                    cause: 'The grace window was expressed as a held <em>connection</em> with a longer heartbeat deadline. Teardown still destroyed the <code>VirtualDisplayManager</code>, so nothing the grace period did protected the thing it existed to protect.',
                    fix: 'Express the grace period as a display hold: park the manager in a device-keyed hold with its ID, geometry, and deadline, and have the next authenticated session for that device adopt it.',
                    ref: 'ADR-009'
                }
            ],
            evidence: {
                stats: [
                    { value: '136', label: 'Tests passing', note: 'swift test, 0 failures' },
                    { value: 'v1.1.1', label: 'Shipped release', note: 'build 3, Universal 2' },
                    { value: '10', label: 'Decision records', note: 'one per protocol change' },
                    { value: 'v4', label: 'Wire protocol', note: 'both directions authenticated' },
                    { value: '4', label: 'Network routes', note: 'strict, no silent fallback' },
                    { value: '1', label: 'Sensitive permission', note: 'down from two' },
                    { value: '0', label: 'Telemetry or auto-update', note: 'no upload path in the app' },
                    { value: 'MIT', label: 'License', note: 'source available' }
                ],
                note: '<strong>Verification, including what failed.</strong> <code>v1.1.1</code> was verified on macOS 26.6.1 with Swift 6.3.3: 136 tests, a Universal Release build for both architectures, an ad-hoc signature checked with <code>codesign --verify --deep --strict</code>, and an independently extracted app that retained both slices. The published <code>v1.1.0</code> tag surfaced Swift 6.3 strict-concurrency errors in the Core Audio/GCD path; <code>main</code> now passes <code>-strict-concurrency=complete -warnings-as-errors</code> and the historical tag was left unchanged rather than quietly rebuilt.',
                links: [
                    { label: 'Repository', href: 'https://github.com/ycl-2004/Screen-Bridge', text: 'github.com/ycl-2004/Screen-Bridge' },
                    { label: 'Releases', href: 'https://github.com/ycl-2004/Screen-Bridge/releases', text: 'v1.1.1 Universal Mac build' },
                    { label: 'Decision records', href: 'https://github.com/ycl-2004/Screen-Bridge/tree/main/docs/decisions', text: 'ten ADRs' },
                    { label: 'Code health audit', href: 'https://github.com/ycl-2004/Screen-Bridge/tree/main/docs/audits', text: 'docs/audits' }
                ]
            }
        },
        'project-todo': {
            label: 'System Breakdown',
            thesis: 'A global shortcut → a native popover wrapping a web UI → local state where every destructive action is reversible.',
            frame: 'YC Todo is small on purpose. The engineering is in the seam between a WebView and a native macOS popover — where the interesting failures are sizing, focus, and what a sandbox entitlement quietly breaks.',
            map: {
                entry: 'Press the shortcut, or click the menu-bar icon',
                stages: [
                    ['shortcut'],
                    ['popover'],
                    ['webview'],
                    ['tasks', 'timer'],
                    ['store'],
                    ['undo', 'io'],
                    ['packaging']
                ]
            },
            nodes: {
                shortcut: {
                    title: 'Global Shortcut',
                    kind: 'input',
                    meta: 'configurable · opens without a Dock window',
                    role: 'Getting to the list without leaving what you were doing.',
                    detail: [
                        { label: 'What it does', text: 'Configurable global shortcuts open YC Todo and drive common focus actions, so capture never requires switching apps or finding a window.' },
                        { label: 'Why menu-bar-first', text: 'The whole product thesis is that a task tool competing for screen space stops getting used. There is no normal Dock window; status, tasks, and the timer live in one popover.' },
                        { label: 'Keyboard all the way down', text: 'Row navigation, completion, editing, starting a task, and expanding a note all have keyboard paths, because a popover you have to aim at is barely faster than an app.' }
                    ]
                },
                popover: {
                    title: 'Native NSPopover Shell',
                    kind: 'core',
                    meta: 'vendored Tauri plugin · 386 × 546',
                    source: 'src-tauri/vendor/tauri-plugin-nspopover/',
                    flags: [{ label: 'Hard problem', tone: 'hard' }, { label: 'ADR-0002', tone: 'ref' }],
                    role: 'The AppKit surface, and the reason a dependency had to be forked.',
                    detail: [
                        { label: 'What it does', text: 'A real <code>NSPopover</code> anchored to the menu-bar status item, hosting the web UI. <code>tauri-plugin-nspopover</code> provides the integration.' },
                        { label: 'Why it is vendored', text: 'The checked-in Rust source is not upstream: it carries local status-item access and window-level behaviour the app needs. A diff against upstream commit <code>b571e0e</code> measured 49 insertions and 17 deletions across two Rust files, and that provenance is documented rather than left as a mystery fork.' },
                        { label: 'The sizing trap', text: 'Two configurations both fail. A 360×520 full-size window shrinks the entire surface; a 386×546 non-full-size popover adds a 13-point AppKit inset and leaves the content at the same cramped 360×520. Only 386×546 <em>with</em> <code>is_fullsize_content</code> gives the web content the whole popover.' },
                        { label: 'Why not track upstream', text: 'Taking the current upstream Git dependency would discard verified local behaviour and could change popover positioning or visibility — a regression in the one thing this layer exists to get right.' }
                    ]
                },
                webview: {
                    title: 'WebView UI Layer',
                    kind: 'core',
                    meta: 'React + Vite inside Tauri',
                    source: 'src/App.jsx · src/components/',
                    role: 'Web rendering held to native interaction expectations.',
                    detail: [
                        { label: 'What it does', text: 'The interface is React and Vite, rendered by the system WebView inside the popover. Tauri sits underneath at <code>src-tauri/</code>, matching the official project structure.' },
                        { label: 'The interaction bar is native', text: 'A web UI in a native shell is judged as a native app. That means visible keyboard focus, correct ARIA states, reduced-motion behaviour, and hit targets that do not fight each other.' },
                        { label: 'Progressive disclosure', text: 'Actions are a rail rather than a row: Start stays visible while Edit and Delete reveal on hover or keyboard focus. The list reads as a list, not as a control panel.' },
                        { label: 'Previews only when needed', text: 'A truncated title gets a preview anchored to its own row — and only when the title is actually truncated. The earlier full-width hover overlay covered the list to solve a problem one row had.' }
                    ]
                },
                tasks: {
                    title: 'Task & Note Model',
                    kind: 'branch',
                    meta: 'tags · reorder · notes that stay notes',
                    role: 'The data shape, kept narrow enough to stay fast.',
                    detail: [
                        { label: 'What it does', text: 'Create, edit, reorder, tag, complete, restore, and delete tasks; filter by type, tag, or text search. Notes expand in place and are deliberately not timers.' },
                        { label: 'The restraint', text: 'Many simple task tools become slow by absorbing every adjacent feature. Notes not pretending to be tasks is a scope decision that keeps the model — and the popover — small.' },
                        { label: 'Import and export', text: 'Data moves as JSON through macOS file pickers, so leaving is possible without an account or an export service.' }
                    ]
                },
                timer: {
                    title: 'Focus Timer',
                    kind: 'branch',
                    meta: 'one active task · Free or Strict',
                    role: 'Focus that lives on the task instead of in another app.',
                    detail: [
                        { label: 'What it does', text: 'Each task can carry a duration and become the active menu-bar timer. Exactly one runs at a time, with pause, resume, and finish from the popover.' },
                        { label: 'Two modes, stated', text: '<code>Free</code> starts any task; <code>Strict</code> works in order. The mode is an explicit menu choice rather than a hidden preference, because the two produce very different behaviour when you click Start.' },
                        { label: 'Notifications', text: 'Quiet notifications, the default sound, or a user-selected alarm file — which is copied into the app&rsquo;s local container so it cannot break when the original moves.' }
                    ]
                },
                store: {
                    title: 'Local Persistence',
                    kind: 'core',
                    meta: 'tasks · tags · focus · appearance · shortcuts',
                    role: 'Everything the app knows, on this Mac only.',
                    detail: [
                        { label: 'What it does', text: 'Tasks, tags, focus state, appearance, notification settings, and shortcuts are all stored locally, with immediate UI updates rather than a round trip.' },
                        { label: 'What is absent', text: 'No accounts, analytics, advertising, telemetry, or runtime network requests. There is no server to be down and no sync to conflict.' },
                        { label: 'File access is explicit', text: 'Import, export, and alarm selection happen only after a macOS file-picker action — the app never reaches into the filesystem on its own.' }
                    ]
                },
                undo: {
                    title: 'Reversible Actions',
                    kind: 'branch',
                    meta: 'five-second Undo',
                    flags: [{ label: 'Key decision', tone: 'decision' }],
                    role: 'The safety net that lets deletion stay one click.',
                    detail: [
                        { label: 'What it does', text: 'A deleted task and a cleared Completed list both offer five seconds of Undo.' },
                        { label: 'Why not a confirmation dialog', text: 'A confirm step taxes every correct deletion to protect against the rare wrong one. Undo taxes none of them and covers more cases — including the ones a dialog would have been dismissed through anyway.' },
                        { label: 'The trade', text: 'Five seconds is a real window, not an infinite one. Recovery after that is the JSON export, which is why export exists as a first-class action rather than a settings-screen afterthought.' }
                    ]
                },
                io: {
                    title: 'JSON Import & Export',
                    kind: 'branch',
                    meta: 'the exit, and the backup',
                    role: 'A local-only app&rsquo;s substitute for sync.',
                    detail: [
                        { label: 'What it does', text: 'Full data export and import as JSON through macOS file pickers.' },
                        { label: 'Why it matters more here', text: 'With no account and no cloud, export <em>is</em> the migration path, the backup, and the recovery beyond the Undo window. Treating it as a core feature rather than a settings toggle follows from that.' },
                        { label: 'A related packaging consequence', text: 'The historical App Sandbox read-only file entitlement does not match this export behaviour, which is one of two reasons the sandbox is not enabled on the GitHub release path.' }
                    ]
                },
                packaging: {
                    title: 'Signing & Distribution',
                    kind: 'edge',
                    meta: 'Universal 2 · ad-hoc · one stable filename',
                    flags: [{ label: 'Constraint', tone: 'constraint' }, { label: 'ADR-0003', tone: 'ref' }],
                    role: 'The boundary between a build and something a friend can open.',
                    detail: [
                        { label: 'What it does', text: 'Tauri&rsquo;s <code>universal-apple-darwin</code> target merges <code>arm64</code> and <code>x86_64</code> into one executable, published as <code>YC-Todo-macOS-universal.zip</code> plus a SHA-256 checksum. The stable filename keeps the GitHub latest-release URL valid across versions.' },
                        { label: 'Why the sandbox is off', text: 'Enabling App Sandbox prevents the WebKit child process from loading the UI at all, and the stored read-only file entitlement does not match JSON export behaviour. Both are stated in the ADR rather than left as an unexplained absence.' },
                        { label: 'Signing', text: 'Built with <code>--no-sign</code>, then the finished bundle is signed — ad-hoc by default, with <code>CODESIGN_IDENTITY</code> and a reviewed <code>CODESIGN_ENTITLEMENTS</code> available to a release operator.' },
                        { label: 'Baseline', text: 'macOS 12.0, chosen as one practical baseline for both architectures and the modern WebView interface.' }
                    ]
                }
            },
            build: {
                graph: {
                    summary: 'A Tauri app is two programs. The Rust side owns the window and the vendored popover plugin; the web side is a React tree whose entire state lives in one component. The arrow weights here are ES module imports, and they show the honest problem: <code>TodoWrapper.jsx</code> is 3,455 lines and everything below it is a leaf.',
                    nodes: [
                        { id: 'tauri', label: 'src-tauri/', kind: 'edge', meta: 'Rust · window + plugin', row: 0, note: 'Owns the NSPopover, the vendored plugin, and the 386×546 window.' },
                        { id: 'main', label: 'main.jsx', kind: 'input', meta: '10 lines', note: 'Mounts App. The whole web entry point.' },
                        { id: 'appjsx', label: 'App.jsx', kind: 'core', meta: '9 lines', note: 'Nine lines: it renders TodoWrapper.' },
                        { id: 'wrapper', label: 'TodoWrapper.jsx', kind: 'core', meta: '3,455 lines', note: 'Tasks, tags, timer, filters, undo, import/export. All of it.' },
                        { id: 'todo', label: 'Todo.jsx', kind: 'branch', meta: '500 lines', note: 'One row: the progressive action rail.' },
                        { id: 'create', label: 'CreateForm.jsx', kind: 'branch', meta: '176 lines', note: 'Capture, with a duration and tags.' },
                        { id: 'tagmgr', label: 'TagManager.jsx', kind: 'branch', meta: '499 lines', note: 'Tag creation, colours, and deletion.' },
                        { id: 'edit', label: 'EditForm.jsx', kind: 'branch', meta: '128 lines', note: 'In-place edit of a task.' },
                        { id: 'hover', label: 'HoverCard.jsx', kind: 'edge', meta: '225 lines', note: 'The row-anchored preview for truncated titles.' },
                        { id: 'minute', label: 'MinuteSelect.jsx', kind: 'edge', meta: '365 lines', note: 'Duration picker, shared by create and edit.' },
                        { id: 'tagsel', label: 'TagSelect.jsx', kind: 'edge', meta: '70 lines', note: 'Tag chooser inside the forms.' },
                        { id: 'tip', label: 'TipButton.jsx', kind: 'edge', meta: '63 lines', note: 'The affordance that opens a HoverCard.' }
                    ],
                    edges: [
                        { from: 'main', to: 'appjsx', label: '', weight: 1 },
                        { from: 'appjsx', to: 'wrapper', label: '', weight: 1 },
                        { from: 'wrapper', to: 'create', label: '', weight: 1 },
                        { from: 'wrapper', to: 'todo', label: '', weight: 1 },
                        { from: 'wrapper', to: 'tagmgr', label: '', weight: 1 },
                        { from: 'todo', to: 'edit', label: '', weight: 1 },
                        { from: 'todo', to: 'hover', label: '', weight: 1 },
                        { from: 'todo', to: 'tip', label: '', weight: 1 },
                        { from: 'create', to: 'minute', label: '', weight: 1 },
                        { from: 'create', to: 'tagsel', label: '', weight: 1 },
                        { from: 'edit', to: 'minute', label: '', weight: 1 },
                        { from: 'tip', to: 'hover', label: '', weight: 1 }
                    ]
                },
                practice: [
                    {
                        title: 'The concentration is real and it is named',
                        text: '<code>TodoWrapper.jsx</code> holds 3,455 of the project&rsquo;s roughly 5,700 lines of JSX. Every child in this graph is a leaf or near-leaf, which means state was never lifted anywhere — it was simply never pushed down. This is the structural debt in YC Todo, and it is the reason the graph is a fan rather than a layered stack like the Swift projects here.'
                    },
                    {
                        title: 'The seam between the two programs is one Rust crate',
                        text: '<code>tauri-plugin-nspopover</code> is vendored under <code>src-tauri/vendor/</code> with 49 insertions and 17 deletions against upstream commit <code>b571e0e</code>, and the upstream licence is kept with it. The whole native surface of the app is that fork plus the window configuration — which is also why the sizing trade-off could be solved without touching product CSS.'
                    },
                    {
                        title: 'Shared leaves are the only reuse',
                        text: '<code>MinuteSelect</code> is imported by both <code>CreateForm</code> and <code>EditForm</code>; <code>HoverCard</code> by both <code>Todo</code> and <code>TipButton</code>. Those two edges are the entire component-reuse story, and they are the parts that behave identically in creation and editing because they are literally the same file.'
                    },
                    {
                        title: 'Three ADRs, all about the repository rather than the features',
                        text: 'Starting from a clean application-only repository, vendoring the popover plugin, and publishing one Universal archive without App Sandbox. None of them is about tasks or timers — they are about what the project <em>is</em>, which is the part that was hard to reverse later.'
                    }
                ]
            },
            decisions: [
                {
                    ref: 'ADR-0002',
                    title: 'Vendor the popover plugin instead of tracking upstream',
                    context: 'The menu-bar popover needs local status-item access and window-level behaviour that upstream <code>tauri-plugin-nspopover</code> does not provide. A diff against upstream commit <code>b571e0e</code> measured 49 insertions and 17 deletions across two Rust files.',
                    decision: 'Keep the customized crate under <code>src-tauri/vendor/</code> with the upstream license and documented provenance, excluding the demo app and build sources the Cargo path dependency does not need.',
                    tradeoff: 'Upstream fixes have to be merged by hand, and the fork has to be justified to anyone reading the tree.',
                    result: 'Verified popover positioning and visibility behaviour is preserved instead of being re-litigated on every dependency bump.'
                },
                {
                    ref: 'Sizing',
                    title: '386 × 546 with full-size content, and no other combination',
                    context: 'Two obvious configurations both regress: a 360×520 full-size window shrinks the whole surface, and a 386×546 non-full-size popover adds a 13-point AppKit inset that leaves the content at the same cramped 360×520.',
                    decision: 'Keep <code>is_fullsize_content</code> enabled and configure the window at 386×546.',
                    tradeoff: 'The size is fixed rather than user-adjustable.',
                    result: 'Both regressions are avoided without changing a single line of product CSS.'
                },
                {
                    ref: 'ADR-0003',
                    title: 'One Universal archive, ad-hoc signed, no sandbox',
                    context: 'The download has to work on Apple Silicon and Intel without asking the user to pick, and the repository has no Developer ID or notarization credentials.',
                    decision: 'Publish one <code>universal-apple-darwin</code> build under a stable filename with a checksum; build unsigned then ad-hoc sign the finished bundle; leave App Sandbox off for this release path.',
                    tradeoff: 'Gatekeeper needs the Control-click → Open path, and there is no App Store route from this artifact.',
                    result: 'The latest-release URL stays valid across versions, and the two concrete sandbox blockers are recorded rather than rediscovered.'
                },
                {
                    ref: 'ADR-0001',
                    title: 'Start from a clean application-only repository',
                    context: 'The previous repository mixed the runnable app with personal learning notes, App Store working notes, generated macOS metadata, and an experimental directory name, on a history of temporary commit messages. It had no releases, forks, or stars to preserve.',
                    decision: 'Create a new repository containing only the application, source assets, accurate documentation, verification scripts, and decisions — without importing the old history, and leaving the previous repository untouched.',
                    tradeoff: 'The development history is gone, and the project looks younger than it is.',
                    result: 'Rewriting history was rejected as destructive and cleaning in place was rejected because removed notes stay visible in the log; a fresh repository was the only option that actually removed them.'
                },
                {
                    ref: 'Undo',
                    title: 'Undo instead of a confirmation dialog',
                    context: 'Deleting a task and clearing Completed are both destructive and both frequent.',
                    decision: 'Perform the action immediately and offer five seconds of Undo, rather than interrupting with a confirm step.',
                    tradeoff: 'Recovery is time-boxed; after five seconds the JSON export is the fallback.',
                    result: 'Correct deletions cost nothing, and the mistake is still recoverable — which a dismissed dialog would not have been.'
                },
                {
                    ref: 'Rail',
                    title: 'Start stays; Edit and Delete reveal',
                    context: 'Showing every action on every row turns a task list into a control panel, but hiding all of them makes the primary action a guess.',
                    decision: 'A progressive action rail: Start is always visible, while Edit and Delete appear on hover or keyboard focus.',
                    tradeoff: 'Two actions need a hover or a focus step to reach.',
                    result: 'The frequent action is one click and the rare destructive ones are deliberate, with a keyboard path that matches the pointer path.'
                },
                {
                    ref: 'Preview',
                    title: 'Anchor the preview to the row that needs it',
                    context: 'A full-width hover overlay was showing truncated titles, covering the surrounding list to solve a problem belonging to one row.',
                    decision: 'A compact preview attached to its source task, rendered only when the title is genuinely truncated.',
                    tradeoff: 'A truncation check on hover instead of an unconditional overlay.',
                    result: 'The list stays readable while a long title is being inspected, and rows that fit never trigger anything at all.'
                }
            ],
            constraints: [
                { title: 'The popover is AppKit; the UI is a WebView', text: 'Two sizing models that disagree, which is why only one window configuration gives the content the full surface.' },
                { title: 'App Sandbox breaks the WebView', text: 'Enabling it prevents the WebKit child process from loading the UI at all — the app launches to nothing.' },
                { title: 'The historical read-only entitlement contradicts export', text: 'A stored read-only file entitlement does not match JSON export behaviour, so it cannot simply be re-enabled.' },
                { title: 'No Apple Developer signing identity', text: 'Builds are ad-hoc signed and not notarized, so first launch needs the Control-click → Open path.' },
                { title: 'Universal means macOS, not cross-platform', text: 'The native popover integration is macOS-only; Universal refers to Apple Silicon and Intel.' },
                { title: 'There is no automatic updater', text: 'New versions are installed manually, which is why the release filename is stable across versions.' },
                { title: 'No open-source license has been selected', text: 'Public source availability does not grant permission to copy, modify, redistribute, rebrand, or sell — and the README says so directly.' }
            ],
            failures: [
                {
                    title: 'Two window configurations, two different regressions',
                    observed: 'A 360×520 full-size window made the entire popover surface smaller. Switching to 386×546 without full-size content added a 13-point AppKit inset and left the content at the same cramped 360×520.',
                    cause: 'The native popover and the WebView measure the same window differently, so the size and the full-size-content flag are not independent knobs.',
                    fix: '386×546 <em>with</em> <code>is_fullsize_content</code> enabled — the one combination that gives the web content the whole popover, reached without changing product CSS.',
                    ref: 'ADR-0002'
                },
                {
                    title: 'Sandboxing launched the app to a blank window',
                    observed: 'With the historical App Sandbox entitlement enabled, the app started but the interface never appeared.',
                    cause: 'The sandbox prevents the WebKit child process from loading the UI, and separately the stored read-only file entitlement does not match what JSON export actually does.',
                    fix: 'Ship the GitHub release path without App Sandbox and record both blockers in the ADR, so re-enabling it is a decision with known prerequisites rather than a retry.',
                    ref: 'ADR-0003'
                },
                {
                    title: 'Drag handling swallowed buttons and checkboxes',
                    observed: 'Clicking a checkbox or an action button inside a task row could be intercepted by the row&rsquo;s drag-to-reorder handling instead of activating the control.',
                    cause: 'Reordering was attached at the row level, which is also where every interactive control lives.',
                    fix: 'Task-row drag handling no longer intercepts buttons and checkboxes, and the same pass tightened reduced-motion behaviour and visible keyboard focus.'
                },
                {
                    title: 'A hover preview covered the list it belonged to',
                    observed: 'Hovering a task showed a full-width overlay, obscuring surrounding rows — including on tasks whose titles were not truncated at all.',
                    cause: 'The preview was unconditional and sized to the container rather than to the row that needed it.',
                    fix: 'A compact preview anchored to its source row, rendered only when the title is actually truncated.'
                }
            ],
            evidence: {
                stats: [
                    { value: 'v0.2.0', label: 'Shipped release', note: 'first Universal build' },
                    { value: '3', label: 'Decision records', note: 'repo, plugin, packaging' },
                    { value: '49 / 17', label: 'Plugin diff vs upstream', note: 'insertions / deletions' },
                    { value: '386×546', label: 'Popover geometry', note: 'the one working config' },
                    { value: '5s', label: 'Undo window', note: 'delete and clear-completed' },
                    { value: 'Universal 2', label: 'Release artifact', note: 'arm64 + x86_64' },
                    { value: '0', label: 'Network requests', note: 'no accounts, no telemetry' },
                    { value: '12.0+', label: 'macOS supported', note: 'one baseline, both arches' }
                ],
                note: '<strong>Licensing, stated plainly.</strong> No open-source license has been selected. The source is public for review and reference, and the README says that public availability does not grant permission to copy, modify, redistribute, rebrand, or sell — the same position Orbit takes, written down rather than left ambiguous.',
                links: [
                    { label: 'Repository', href: 'https://github.com/ycl-2004/YC_Todo', text: 'github.com/ycl-2004/YC_Todo' },
                    { label: 'Releases', href: 'https://github.com/ycl-2004/YC_Todo/releases', text: 'Universal macOS build' },
                    { label: 'Decision records', href: 'https://github.com/ycl-2004/YC_Todo/tree/main/docs/decisions', text: 'docs/decisions' },
                    { label: 'Changelog', href: 'https://github.com/ycl-2004/YC_Todo/blob/main/CHANGELOG.md', text: 'shipped user-facing changes' }
                ]
            }
        },
        'project-browser-organizer': {
            label: 'System Breakdown',
            thesis: 'New tab override → three local columns → four named hosts, and nothing else.',
            frame: 'A new tab page runs on every new tab, inside a browser profile full of the user&rsquo;s data, with permissions most extensions never ask for. The design question is how much of that has to leave the machine — and the answer is written into the manifest as a list you can read in ten seconds.',
            leads: {
                decisions: 'Browser Organizer has no written decision records. These are the choices the manifest, the file layout, and the README make visible.'
            },
            map: {
                entry: 'Open a new tab in Chrome',
                stages: [
                    ['newtab'],
                    ['worker'],
                    ['storage'],
                    ['favorites', 'tabs'],
                    ['planner'],
                    ['backup', 'native'],
                    ['csp']
                ]
            },
            nodes: {
                newtab: {
                    title: 'New Tab Override',
                    kind: 'input',
                    meta: 'chrome_url_overrides · runs on every tab',
                    source: 'extension/manifest.json · index.html',
                    flags: [{ label: 'Constraint', tone: 'constraint' }],
                    role: 'The most frequently executed surface a browser extension can claim.',
                    detail: [
                        { label: 'What it does', text: '<code>chrome_url_overrides.newtab</code> replaces Chrome&rsquo;s blank new tab with a three-column dashboard: favorites on the left, today&rsquo;s focus in the centre, live open tabs on the right.' },
                        { label: 'The constraint that shapes everything', text: 'This page runs every single time a tab opens. Whatever it costs on load is paid constantly, which is why there is no framework, no bundler, and no build step between the source and what runs.' },
                        { label: 'What that buys', text: 'Editing a file and clicking reload in <code>chrome://extensions</code> is the entire development loop, and the shipped code is the code in the repository — reviewable without a source map.' }
                    ]
                },
                worker: {
                    title: 'MV3 Service Worker',
                    kind: 'core',
                    meta: 'context menus · no persistent page',
                    source: 'extension/background.js',
                    role: 'The background half, under Manifest V3 rules.',
                    detail: [
                        { label: 'What it does', text: 'Registers the right-click &ldquo;add this page or link to Browser Organizer&rdquo; context menus and handles the events the new tab page cannot.' },
                        { label: 'The MV3 constraint', text: 'There is no persistent background page. The service worker can be terminated at any time and restarted on the next event, so nothing durable may live in its memory.' },
                        { label: 'Consequence', text: 'All state belongs to <code>chrome.storage.local</code>, and the worker stays a thin event handler rather than a coordinator — the shape MV3 actually rewards.' }
                    ]
                },
                storage: {
                    title: 'chrome.storage.local',
                    kind: 'core',
                    meta: 'profile-scoped · no account',
                    source: 'extension/storage.js',
                    flags: [{ label: 'Key decision', tone: 'decision' }],
                    role: 'The whole persistence story, deliberately.',
                    detail: [
                        { label: 'What it holds', text: 'Favorites, sections, tasks, themes, language, saved sessions, and cached favicon images — all for the current Chrome profile.' },
                        { label: 'What does not exist', text: 'No account, no OAuth, no analytics, no advertising, no cloud sync. There is no server that can be down and no credential that can leak.' },
                        { label: 'The cost of that choice', text: 'Two Chrome profiles are two independent datasets. Moving between them is an explicit Export/Import, which is why backup is a top-bar control rather than a settings-screen afterthought.' },
                        { label: 'Favicons are cached, not fetched every time', text: 'A favicon is fetched once and stored locally after the first successful load, so a page that runs on every new tab does not re-request dozens of icons each time.' }
                    ]
                },
                favorites: {
                    title: 'Favorites & Sections',
                    kind: 'branch',
                    meta: 'the long-term half',
                    source: 'extension/favorites.js',
                    role: 'Links that outlive the current browsing session.',
                    detail: [
                        { label: 'What it does', text: 'Unlimited links in named, collapsible sections — drag to reorder, edit from a hover menu, and custom logos by upload or paste.' },
                        { label: 'Why sections', text: 'A flat favorites list becomes unscannable at exactly the size where it starts being useful. Named sections are the cheapest structure that keeps a long list readable.' },
                        { label: 'The Chrome profile is also visible', text: 'Native Bookmarks and the Reading List are surfaced read-only alongside these, so the dashboard does not pretend Chrome&rsquo;s own storage does not exist.' }
                    ]
                },
                tabs: {
                    title: 'Live Tab Surface',
                    kind: 'branch',
                    meta: 'group · dedupe · triage in place',
                    source: 'extension/tabs.js',
                    role: 'The short-term half, and the one that changes every second.',
                    detail: [
                        { label: 'What it does', text: 'Groups open tabs by domain or by status with pinned tabs on top. Each tab chip can be marked Later or Important, favorited, pinned, turned into a task, or closed.' },
                        { label: 'Duplicate detection', text: 'Duplicate URLs are detected and the extras close in one click — the specific failure mode of long browsing sessions, handled directly instead of left to manual scanning.' },
                        { label: 'Batch and sessions', text: 'Multiple tabs can be selected for batch actions, and a set of tabs can be saved as a named session — which is what lets closing tabs stop feeling like losing them.' }
                    ]
                },
                planner: {
                    title: 'Focus & Planner',
                    kind: 'core',
                    meta: 'today · recurring · overdue carry-forward',
                    source: 'extension/planner.js · hero.js',
                    role: 'The centre column, and the reason the page is not just a link grid.',
                    detail: [
                        { label: 'What it does', text: 'A Today Task list with tags, recurring tasks, drag-to-reorder, and overdue carry-forward, plus a Daily Planner calendar for planning ahead.' },
                        { label: 'Carry-forward is the point', text: 'An undone task that silently disappears at midnight trains people to distrust the list. Carrying it forward is what makes the centre column worth looking at on a new tab.' },
                        { label: 'Editable identity', text: 'Greeting, hero title, subtitle, and avatar are editable, and optional local weather and location can be shown — the surface is a personal page rather than a fixed dashboard.' }
                    ]
                },
                backup: {
                    title: 'JSON Export & Import',
                    kind: 'branch',
                    meta: 'the migration path',
                    source: 'extension/backup.js',
                    role: 'What replaces sync in a no-account product.',
                    detail: [
                        { label: 'What it does', text: 'Exports and imports favorites, sections, tasks, hero copy, avatar, and theme as a JSON file.' },
                        { label: 'Why it is a top-bar control', text: 'With profile-scoped storage and no cloud, Export is the only way to move between Chrome profiles or machines — so it is placed where a frequent action belongs, not buried in settings.' },
                        { label: 'Explicit, always', text: 'Both directions are local file operations the user initiates. Nothing is uploaded and nothing is written without an action.' }
                    ]
                },
                native: {
                    title: 'Optional Native Host',
                    kind: 'branch',
                    meta: 'same-machine profile sync · off unless installed',
                    source: 'native-host/sync_host.py',
                    role: 'The one capability that leaves the extension sandbox, and it is opt-in.',
                    detail: [
                        { label: 'What it does', text: 'A macOS Native Messaging helper can mirror selected data between Chrome profiles on the same machine, writing to a local file.' },
                        { label: 'Why it is separate', text: 'Native messaging is the largest capability in the manifest. Keeping it in its own directory with its own installer means the normal extension does not require it and does not have it.' },
                        { label: 'Failure mode', text: 'With the helper not installed, the feature is simply absent — no error state, no half-working sync, and no prompt asking the user to install something.' }
                    ]
                },
                csp: {
                    title: 'Network Boundary',
                    kind: 'edge',
                    meta: 'four allowlisted hosts',
                    source: 'extension/manifest.json',
                    flags: [{ label: 'Constraint', tone: 'constraint' }],
                    role: 'The claim &ldquo;local-first&rdquo; has to cash, written where anyone can check it.',
                    detail: [
                        { label: 'What it does', text: 'The extension-pages CSP sets <code>script-src &#39;self&#39;</code> and <code>object-src &#39;self&#39;</code>, and enumerates <code>connect-src</code> exactly: <code>ipapi.co</code>, <code>get.geojs.io</code>, <code>api.open-meteo.com</code>, and <code>suggestqueries.google.com</code>.' },
                        { label: 'What each one is for', text: 'Location, location fallback, weather, and search suggestions — every one attached to a visible feature, and each reached only when that feature is used.' },
                        { label: 'Why enumerate at all', text: 'A four-line allowlist is a claim someone can verify in the manifest. &ldquo;We do not send your data anywhere&rdquo; in a README is not.' },
                        { label: 'The honest counterweight', text: '<code>host_permissions</code> is <code>&lt;all_urls&gt;</code> and the permission list includes <code>tabs</code>, <code>bookmarks</code>, <code>readingList</code>, <code>history</code>, and <code>nativeMessaging</code>. This extension is trusted with a great deal; the CSP is what bounds where any of it can go.' }
                    ]
                }
            },
            build: {
                graph: {
                    summary: 'No modules, no bundler — twelve scripts loaded in a fixed order by <code>index.html</code>, so the load order <em>is</em> the dependency declaration. Arrows are cross-file function calls counted in the source. <code>app.js</code> is last in that list and calls into everything: 69 calls into <code>helpers</code>, 44 into <code>planner</code>, 30 into <code>favorites</code>.',
                    nodes: [
                        { id: 'app', label: 'app.js', kind: 'input', meta: '3,170 lines', note: 'Loaded last. Wires the three columns together.' },
                        { id: 'backup', label: 'backup.js', kind: 'core', meta: '364 lines', note: 'Export/import — the only file that touches every other domain.' },
                        { id: 'planner', label: 'planner.js', kind: 'core', meta: '532 lines', note: 'Today tasks, recurring, overdue carry-forward, calendar.' },
                        { id: 'favorites', label: 'favorites.js', kind: 'core', meta: '348 lines', note: 'Links, sections, drag-reorder, custom logos.' },
                        { id: 'hero', label: 'hero.js', kind: 'branch', meta: '133 lines', note: 'Greeting, title, avatar, weather.' },
                        { id: 'storage', label: 'storage.js', kind: 'branch', meta: '319 lines', note: 'chrome.storage.local. Loaded second, right after config.' },
                        { id: 'helpers', label: 'helpers.js', kind: 'edge', meta: '735 lines', note: 'Called 69 times by app.js alone.' },
                        { id: 'tabs', label: 'tabs.js', kind: 'edge', meta: '203 lines', note: 'Grouping, dedupe, sessions.' },
                        { id: 'i18n', label: 'i18n.js', kind: 'edge', meta: '254 lines', note: 'English and Chinese strings.' },
                        { id: 'theme', label: 'theme.js', kind: 'edge', meta: '202 lines', note: 'Six themes, no cross-file calls.' },
                        { id: 'sync', label: 'sync.js', kind: 'edge', meta: '195 lines', note: 'The optional native-messaging bridge.' },
                        { id: 'background', label: 'background.js', kind: 'edge', meta: '269 lines', note: 'The MV3 service worker. Calls nothing here — separate context.' }
                    ],
                    edges: [
                        { from: 'app', to: 'helpers', label: '69', weight: 69 },
                        { from: 'app', to: 'planner', label: '44', weight: 44 },
                        { from: 'app', to: 'favorites', label: '30', weight: 30 },
                        { from: 'app', to: 'i18n', label: '23', weight: 23 },
                        { from: 'app', to: 'hero', label: '14', weight: 14 },
                        { from: 'app', to: 'tabs', label: '10', weight: 10 },
                        { from: 'backup', to: 'favorites', label: '7', weight: 7 },
                        { from: 'backup', to: 'planner', label: '7', weight: 7 },
                        { from: 'backup', to: 'hero', label: '6', weight: 6 },
                        { from: 'backup', to: 'helpers', label: '4', weight: 4 },
                        { from: 'planner', to: 'i18n', label: '3', weight: 3 },
                        { from: 'planner', to: 'favorites', label: '2', weight: 2 },
                        { from: 'storage', to: 'favorites', label: '4', weight: 4 },
                        { from: 'favorites', to: 'helpers', label: '1', weight: 1 },
                        { from: 'hero', to: 'helpers', label: '2', weight: 2 }
                    ]
                },
                practice: [
                    {
                        title: 'The manifest is the only place the network is described',
                        text: '<code>script-src &#39;self&#39;</code>, <code>object-src &#39;self&#39;</code>, and a <code>connect-src</code> naming exactly four hosts: <code>ipapi.co</code>, <code>get.geojs.io</code>, <code>api.open-meteo.com</code>, <code>suggestqueries.google.com</code>. Adding a networked feature means editing that line, which is a much smaller thing to review than a codebase.'
                    },
                    {
                        title: 'Load order instead of a module graph',
                        text: '<code>index.html</code> loads <code>config.local</code>, <code>storage</code>, <code>sync</code>, <code>i18n</code>, <code>theme</code>, <code>tabs</code>, <code>helpers</code>, <code>favorites</code>, <code>planner</code>, <code>hero</code>, <code>backup</code>, then <code>app</code>. That sequence is the dependency contract — no bundler resolves it, so getting it wrong fails immediately and visibly rather than at build time.'
                    },
                    {
                        title: 'The service worker shares nothing',
                        text: '<code>background.js</code> has no edge in this graph because MV3 runs it in a separate context that cannot see the page&rsquo;s globals. It handles context menus and events, and everything durable goes through <code>chrome.storage.local</code> — which is the shape MV3 forces and the reason the worker being killed at any moment is survivable.'
                    },
                    {
                        title: 'Forked, and the licence still says so',
                        text: 'Browser Organizer began as <em>tab-out</em> by Zara Zhang. The MIT <code>LICENSE</code> keeps the original copyright line unchanged and the README credits the author in its own section, so what was inherited and what was added stay distinguishable.'
                    },
                    {
                        title: 'No decision records, and that is visible here',
                        text: 'Unlike the native projects, this repository has no ADRs and no failure log. The choices above are reconstructed from what the manifest, the load order, and the README actually commit to — which is why this project shows no Failures tab rather than a padded one.'
                    }
                ]
            },
            decisions: [
                {
                    ref: 'NoBuild',
                    title: 'No build step, no Node.js, no bundler',
                    context: 'This page executes on every new tab, and a new tab is the most latency-sensitive surface in a browser.',
                    decision: 'Ship plain Manifest V3 files — about 6,700 lines of JavaScript across a dozen modules, loaded directly with no compilation.',
                    tradeoff: 'No TypeScript, no tree-shaking, and no module bundling; <code>app.js</code> has grown past three thousand lines.',
                    result: 'Nothing is parsed, transformed, or downloaded before the page runs, and the shipped code is byte-for-byte the code in the repository.'
                },
                {
                    ref: 'CSP',
                    title: 'Name every external host in the manifest',
                    context: 'Location, weather, and search suggestions each need a third-party service, and a default extension CSP would allow far more than those.',
                    decision: 'Set <code>script-src &#39;self&#39;</code> and enumerate <code>connect-src</code> down to four exact hostnames.',
                    tradeoff: 'Adding any new networked feature requires a manifest change and a re-review.',
                    result: 'The network boundary is a four-line list a reviewer can read, rather than a sentence in a privacy section.'
                },
                {
                    ref: 'Local',
                    title: 'Profile-scoped storage instead of an account',
                    context: 'Cross-device sync is the obvious feature request for a dashboard, and it requires an account, a server, and a conflict story.',
                    decision: 'Keep everything in <code>chrome.storage.local</code> and treat explicit JSON export as the migration path.',
                    tradeoff: 'Two profiles are two datasets, and moving between them is manual.',
                    result: 'There is no account to breach, no server to run, and no sync conflict to resolve.'
                },
                {
                    ref: 'Native',
                    title: 'Cross-profile sync is a separate, optional helper',
                    context: 'Mirroring data between Chrome profiles on one machine genuinely needs native messaging, which is the broadest capability in the manifest.',
                    decision: 'Put it in <code>native-host/</code> with its own installer, disabled whenever the helper is not present.',
                    tradeoff: 'The feature requires a manual install step and only works on macOS.',
                    result: 'A normal installation never exercises native messaging, and its absence is silent rather than an error.'
                },
                {
                    ref: 'Cache',
                    title: 'Cache favicons after the first successful load',
                    context: 'A dashboard full of links would otherwise request dozens of icons on every single new tab.',
                    decision: 'Fetch a favicon once and store the image locally in extension storage.',
                    tradeoff: 'Storage grows with the favorites list, and a changed site icon persists until refetched.',
                    result: 'The most repeated action in the product stops generating repeated network traffic.'
                },
                {
                    ref: 'Fork',
                    title: 'Credit the upstream in the README and the license',
                    context: 'Browser Organizer began as a fork of <em>tab-out</em> by Zara Zhang and has since diverged substantially.',
                    decision: 'Keep the MIT license with the original copyright intact and state the fork and its author in the README&rsquo;s Credits section.',
                    tradeoff: 'The provenance is the first thing a reader learns about the project&rsquo;s origin.',
                    result: 'The parts that are inherited and the parts that are new are distinguishable, which is the only version of this that survives someone checking.'
                },
                {
                    ref: 'Distribution',
                    title: 'Say that Load unpacked is still required',
                    context: 'A downloadable ZIP is easy to produce, but Chrome will not install an extension from one without a Web Store listing.',
                    decision: 'Ship a release ZIP and state plainly, at the top of the README, that Chrome still requires a manual <em>Load unpacked</em> step unless the extension is published to the Web Store.',
                    tradeoff: 'The install instructions are longer and less impressive than a download button.',
                    result: 'Nobody downloads it expecting a one-click install that browsers do not permit.'
                }
            ],
            constraints: [
                { title: 'A new tab page runs on every new tab', text: 'Whatever this page costs on load is paid constantly, which rules out a framework, a bundler, and any startup work that is not strictly needed.' },
                { title: 'MV3 has no persistent background page', text: 'The service worker can be terminated at any moment, so nothing durable may live in its memory and all state belongs in storage.' },
                { title: '<code>chrome.storage.local</code> is profile-scoped', text: 'Two Chrome profiles are two separate datasets. There is no shared layer underneath them without an account or a native helper.' },
                { title: 'The permission list is genuinely broad', text: '<code>&lt;all_urls&gt;</code> plus <code>tabs</code>, <code>bookmarks</code>, <code>readingList</code>, <code>history</code>, and <code>nativeMessaging</code>. The enumerated <code>connect-src</code> is what bounds where any of that can travel.' },
                { title: 'Four features each reach a third party', text: 'Weather, location, favicon, and search suggestions call their respective services when used. They are named in the manifest rather than described in prose.' },
                { title: 'Chrome requires Load unpacked without a Web Store listing', text: 'A release ZIP cannot become a one-click install, and the README says so before the download link.' },
                { title: 'Native messaging needs an installed helper', text: 'Without it the cross-profile sync feature is absent — which is the intended default, not a degraded state.' }
            ],
            failures: [],
            evidence: {
                stats: [
                    { value: 'v1.0.0', label: 'Extension version', note: 'Manifest V3' },
                    { value: '4', label: 'Allowlisted hosts', note: 'enumerated in connect-src' },
                    { value: '0', label: 'Build steps', note: 'no Node.js, no bundler' },
                    { value: '~6.7K', label: 'Lines of JavaScript', note: 'across a dozen modules' },
                    { value: '0', label: 'Accounts or analytics', note: 'no OAuth, no telemetry' },
                    { value: '3', label: 'Dashboard columns', note: 'links · focus · live tabs' },
                    { value: '2', label: 'Interface languages', note: 'English and Chinese' },
                    { value: 'MIT', label: 'License', note: 'upstream copyright kept' }
                ],
                note: '<strong>Provenance.</strong> Browser Organizer is forked from <em>tab-out</em> by Zara Zhang and has diverged substantially since. The MIT license keeps the original copyright line intact and the README credits the author directly. <strong>No decision records.</strong> Unlike the native projects here, this one has no written ADRs and no failure log — the Decisions above are reconstructed from what the manifest, the file layout, and the README actually commit to, and no Failures tab is shown rather than inventing one.',
                links: [
                    { label: 'Repository', href: 'https://github.com/ycl-2004/Browser_Organizer', text: 'github.com/ycl-2004/Browser_Organizer' },
                    { label: 'Upstream project', href: 'https://github.com/zarazhangrui/tab-out', text: 'tab-out by Zara Zhang' }
                ]
            }
        }
    };
})();
