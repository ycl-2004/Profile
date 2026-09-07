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
        }
    };
})();
