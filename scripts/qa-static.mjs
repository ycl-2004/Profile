import { existsSync, readFileSync, readdirSync, statSync } from 'node:fs';
import { extname, join, resolve } from 'node:path';
import { spawnSync } from 'node:child_process';

const root = resolve(import.meta.dirname, '..');
const failures = [];
const warnings = [];

function check(condition, message) {
    if (!condition) failures.push(message);
}

function walk(directory) {
    return readdirSync(directory).flatMap((entry) => {
        const path = join(directory, entry);
        return statSync(path).isDirectory() ? walk(path) : [path];
    });
}

const index = readFileSync(join(root, 'index.html'), 'utf8');
const cards = readFileSync(join(root, 'assets/scripts/templates/cards.js'), 'utf8');
const modals = readFileSync(join(root, 'assets/scripts/data/modal-data.js'), 'utf8');
const portfolioItems = readFileSync(join(root, 'assets/scripts/data/portfolio-items.js'), 'utf8');
const terminal = readFileSync(join(root, 'assets/scripts/templates/terminal.js'), 'utf8');
const terminalEntry = readFileSync(join(root, 'assets/scripts/features/terminal-entry.js'), 'utf8');
const canvasTools = readFileSync(join(root, 'assets/scripts/features/canvas-tools.js'), 'utf8');
const layout = readFileSync(join(root, 'assets/scripts/features/layout.js'), 'utf8');
const connections = readFileSync(join(root, 'assets/scripts/data/connections.js'), 'utf8');
const views = readFileSync(join(root, 'assets/scripts/features/views.js'), 'utf8');
const animations = readFileSync(join(root, 'assets/scripts/features/animations.js'), 'utf8');
const topBar = readFileSync(join(root, 'assets/scripts/templates/top-bar.js'), 'utf8');
const topActions = readFileSync(join(root, 'assets/scripts/features/top-actions.js'), 'utf8');
const preferences = readFileSync(join(root, 'assets/scripts/features/preferences.js'), 'utf8');
const profileActions = readFileSync(join(root, 'assets/scripts/features/profile-actions.js'), 'utf8');
const layoutStyles = readFileSync(join(root, 'assets/styles/layout.css'), 'utf8');
const favicon = readFileSync(join(root, 'assets/favicon.svg'), 'utf8');
const watchScriptPath = join(root, 'scripts/check-github-updates.mjs');
const watchScript = readFileSync(watchScriptPath, 'utf8');
const watchWorkflow = readFileSync(join(root, '.github/workflows/check-github-updates.yml'), 'utf8');
const watchBaseline = JSON.parse(readFileSync(join(root, '.github/github-watch-baseline.json'), 'utf8'));

check(index.includes('<link rel="canonical" href="https://ycl-2004.github.io/Profile/">'), 'index.html must declare the production canonical URL.');
check(index.includes("connect-src 'self'"), 'The static website must keep network connections same-origin; GitHub monitoring belongs in Actions.');
check(!index.includes('api.github.com') && !index.includes('github-sync'), 'The website must not live-sync GitHub data before human approval.');
check(index.includes('base.css?v=deep-link') && index.includes('layout.css?v=deep-link') && index.includes('top-bar.js?v=deep-link'), 'Orbit popover assets must be cache-busted together so new markup never loads with stale styles.');
check(topBar.includes('audio-pulse') && topBar.includes('settings-glyph') && (topBar.match(/<svg/g) || []).length >= 15, 'Top-bar and popover actions must use the custom Orbit monoline SVG icon system.');
check(!/[🔇🔊⚙☰⌖◎◖]/u.test(topBar), 'Top-bar controls must not regress to emoji, OS-default, or Unicode stand-in icons.');
check(favicon.includes('#bdf1ff') && favicon.includes('#8fb6ff') && favicon.includes('<ellipse'), 'Favicon must retain the Orbit cyan-to-periwinkle identity and orbit geometry.');
check(layoutStyles.includes('max-height: calc(100dvh - 92px)') && layoutStyles.includes('overflow-y: auto'), 'Mobile popovers must stay within the dynamic viewport and scroll internally on short screens.');
check(topBar.includes('data-panel-close') && topActions.includes("querySelectorAll('[data-panel-close]')"), 'Both top-bar popovers must expose a working close affordance.');
check(preferences.includes("icon.dataset.state = enabled ? 'on' : 'off'"), 'The custom audio pulse must reflect the persisted sound state without swapping in emoji.');
check(index.includes('profile-actions.js?v=deep-link'), 'Résumé action code must be cache-busted when its destination changes.');
check(profileActions.includes('https://ycl-2004.github.io/Resume/YC-Resume.pdf') && !profileActions.includes('window.print()'), 'Résumé actions must open the canonical YC Resume PDF instead of printing the current page.');
check(topBar.includes('Open résumé PDF') && cards.includes('Official YC Resume PDF') && !cards.includes('Save a clean PDF from the browser'), 'Résumé labels must explain that the official PDF opens directly.');
check(layoutStyles.includes('.settings-panel') && layoutStyles.includes('.settings-row') && layoutStyles.includes('padding: 7px 0'), 'Settings panel must use the clean row-based layout pass.');
check(!cards.includes('236-777') && !modals.includes('236-777'), 'Public pages must not expose the private phone number.');
check(!modals.includes('github.com/ycl-2004/ForYourResume'), 'Private Resume Tailor repository must not link to a public 404.');
check(!modals.includes('Mac_to_Ipad') && !cards.includes('YC Cast'), 'Screen Bridge must use its current public repository name, not the renamed Mac_to_Ipad path.');
check(modals.includes('https://github.com/ycl-2004/Screen-Bridge'), 'Screen Bridge evidence must link to the current public repository.');
check(modals.includes('https://github.com/ycl-2004/AI-Agent-Projects'), 'AI Agent Systems must link to its public repository.');
check(modals.includes('https://github.com/LearnPrompt/ai-news-radar'), 'The Aiwoici role must link to the verifiable upstream project.');
check(modals.includes('https://github.com/LearnPrompt/ai-news-radar/pull/15'), 'Aiwoici evidence must link to the concrete merged pull request.');
check(modals.includes('https://github.com/LearnPrompt/afu-llm-todo/pull/1') && modals.includes('https://github.com/LearnPrompt/partner-skill/pull/1'), 'Open-source maintenance must link to all three concrete merged pull requests.');
check(!modals.includes('?tab=pullrequests'), 'Profile pull-request tabs are not evidence links and must not be used.');
check(!modals.includes('pull request is active') && !portfolioItems.includes('1 active PR'), 'Open-Source Maintenance must not claim an open upstream pull request that was closed unmerged.');
check(!portfolioItems.includes('above internal standards by 10%'), 'Joychime copy must match the resume and drop the unverifiable quality claim.');
check(portfolioItems.includes("id: 'work-ai-warts'") && cards.includes('data-card="work-ai-warts"'), 'The Aiwoici role must appear in both the Evidence Bank and the Canvas Work Experience group.');
check(portfolioItems.includes("id: 'writing-technical'") && modals.includes("'writing-technical':"), 'The technical-writing record must appear in the Evidence Bank.');

// Evidence Bank is a selected portfolio narrative, not a mirror of every public
// repository. These are intentional public evidence anchors; other repositories
// remain discoverable through GitHub without each taking a Timeline/List row.
const publicRepoCoverage = [
    ['goodcaseai', 'project-goodcase'],
    ['YC', 'project-yc-site'],
    ['Always', 'project-always'],
    ['AI-Agent-Projects', 'project-ai-agents'],
    ['Screen-Bridge', 'project-screen-bridge']
];
for (const [repo, id] of publicRepoCoverage) {
    check(portfolioItems.includes(`id: '${id}'`), `Evidence Bank is missing the record for public repository ${repo}.`);
    check(modals.includes(`https://github.com/ycl-2004/${repo}`), `Record ${id} must link its public repository ${repo}.`);
}

const intentionallyRemovedEvidence = [
    'project-reactive-stop-order',
    'project-family-care',
    'project-trend-follower',
    'project-finance-hub',
    'project-linesticker',
    'project-beaufy-cam',
    'project-yc-obsidian'
];
for (const id of intentionallyRemovedEvidence) {
    check(!portfolioItems.includes(`id: '${id}'`), `Intentionally removed Timeline/List record returned: ${id}.`);
    check(!modals.includes(`'${id}':`), `Unreachable modal data returned for removed record: ${id}.`);
}
for (const id of ['project-yc-site', 'project-always', 'project-resume-tailor', 'writing-technical']) {
    check(portfolioItems.includes(`id: '${id}'`), `User-retained Timeline/List record is missing: ${id}.`);
    check(modals.includes(`'${id}':`), `User-retained record is missing modal data: ${id}.`);
}
check(!modals.includes('Tutor-Site'), 'Tutor-Site must not be linked: its GitHub Pages deployment publicly exposes an old resume with a home address and phone number.');
check(modals.includes('no public link is claimed here'), 'The technical-writing record must state that it has no public link rather than inventing one.');
check(!index.includes('onclick=') && !cards.includes('onclick='), 'Inline click handlers are not allowed.');
check(![cards, modals, portfolioItems, terminal].some((source) => source.includes('Dec 2027')), 'Expected graduation must not use the outdated Dec 2027 date.');
check([cards, modals, portfolioItems, terminal].every((source) => source.includes('May 2027')), 'Every resume surface must show the expected graduation date as May 2027.');
check(!existsSync(join(root, 'yichen-canvas-v2.html')), 'The legacy redirect was intentionally removed and must not return.');
check(terminal.includes('href="https://ycl-2004.github.io/Resume/YC-Resume.pdf"'), 'The entry page resume affordance must open the real resume PDF.');
check(!/entry-preview-caption[^>]*>\s*\d+ projects/.test(terminal), 'The entry preview caption must be derived from the Evidence Bank, not hand-written.');
check(terminalEntry.includes('projects and roles, mapped by how they connect'), 'Terminal entry must set the preview caption from the actual item count.');
check(!terminal.includes('terminal-skip-button') && !terminalEntry.includes('terminal-skip-button'), 'The resume affordance must not be re-wired back into List View.');
check(modals.includes('ycl-2004.github.io/Resume/YC-Resume.pdf'), 'Contact details must expose the canonical resume PDF.');
check((cards.match(/class="quick-link-row"/g) || []).length === 4, 'Canvas must expose exactly four Quick Links.');
check((cards.match(/<(?:button|a) class="quick-link-row"/g) || []).length === 4, 'Every Quick Link must be a real button or link.');

const expectedMainProjects = [
    'project-orbit',
    'project-notype',
    'project-todo',
    'project-browser-organizer',
    'project-sharememory',
    'project-screen-bridge'
];
const expectedSystems = ['project-open-source', 'education'];
const expectedAiSystems = ['project-rag-system', 'project-media-ops', 'project-ai-agents'];

for (const id of [...expectedMainProjects, ...expectedSystems, ...expectedAiSystems]) {
    check(cards.includes(`data-card="${id}"`), `Curated Canvas is missing ${id}.`);
    check(modals.includes(`'${id}':`), `Modal data is missing ${id}.`);
}

const mainProjectIds = [...cards.matchAll(/data-card="([^"]+)" data-curated-group="main-projects"/g)].map((match) => match[1]);
check(mainProjectIds.length === expectedMainProjects.length, `Main Projects must contain exactly ${expectedMainProjects.length} cards.`);
check(expectedMainProjects.every((id) => mainProjectIds.includes(id)), 'Main Projects contains an unexpected or missing curated project.');

const systemsIds = [...cards.matchAll(/data-card="([^"]+)" data-curated-group="systems-foundations"/g)].map((match) => match[1]);
check(systemsIds.length === expectedSystems.length, `Systems & Foundations must contain exactly ${expectedSystems.length} cards.`);
check(expectedSystems.every((id) => systemsIds.includes(id)), 'Systems & Foundations contains an unexpected or missing curated card.');
const aiSystemIds = [...cards.matchAll(/data-card="([^"]+)" data-curated-group="ai-systems"/g)].map((match) => match[1]);
check(aiSystemIds.length === expectedAiSystems.length, `AI & LLM Systems must contain exactly ${expectedAiSystems.length} cards.`);
check(expectedAiSystems.every((id) => aiSystemIds.includes(id)), 'AI & LLM Systems contains an unexpected or missing curated card.');
check(layout.includes("'project-rag-system'") && layout.includes("'project-ai-agents'"), 'Layout must place the AI & LLM Systems group on every breakpoint.');
check(cards.includes('data-card="project-yc-brand-systems" data-layer="self" data-section="self"'), 'What I Build must visibly include the combined YC Brand Systems card.');
check(layout.includes("'project-yc-brand-systems'") && layout.includes("'project-open-source'"), 'Layout must place YC Brand Systems under What I Build and Open-Source Maintenance in Systems & Foundations.');
check(!cards.includes('data-card="project-yc-obsidian" data-curated-group="systems-foundations"'), 'YC Obsidian must not remain in the curated Systems & Foundations Canvas group.');
check(!connections.includes("project-yc-obsidian") && !connections.includes("project-ycapikit") && !connections.includes("project-lawdesk"), 'Canvas connections must not target removed or replaced curated cards.');
check(cards.includes('Open-Source Maintenance') && cards.includes('larger upstream AI and developer-tool projects'), 'Open-Source Maintenance card must explain the larger upstream contribution scope.');

check(cards.includes('<strong>29</strong><span>Public Repos</span>'), 'Stats Snapshot must use the current 29 public repositories count.');
check(terminal.includes('<dt>Public repositories</dt>\n                            <dd>29</dd>'), 'Entry proof must use the current 29 public repositories count.');
check(cards.includes('<strong>120+</strong><span>GitHub Stars</span>'), 'Stats Snapshot must state the star count as a floor, not an exact number that decays on every new star.');
check(terminal.includes('<dt>Public GitHub stars</dt>\n                            <dd>120+</dd>'), 'Entry proof must state the star count as a floor, not an exact number that decays on every new star.');

check(watchBaseline.login === 'ycl-2004', 'GitHub watcher baseline must target ycl-2004.');
check(watchBaseline.repositories.length === watchBaseline.publicRepoCount, 'GitHub watcher baseline repository count must match its repository list.');
check(new Set(watchBaseline.repositories.map((repository) => repository.name)).size === watchBaseline.repositories.length, 'GitHub watcher baseline repository names must be unique.');
check(watchBaseline.repositories.reduce((total, repository) => total + repository.stars, 0) === watchBaseline.publicStars, 'GitHub watcher baseline star total must match its repository rows.');
check(watchBaseline.publicRepoCount === 29 && watchBaseline.publicStars === 126, 'Displayed GitHub claims must remain anchored to the current human-confirmed 29 repositories and 126 stars.');
check(watchWorkflow.includes("cron: '17 7 1,15 * *'"), 'GitHub watcher must run only twice monthly, on the 1st and 15th.');
check(watchWorkflow.includes('issues: write') && watchWorkflow.includes('contents: read'), 'GitHub watcher needs read-only content access and issue notification access.');
check(watchWorkflow.includes('node scripts/check-github-updates.mjs --github-output'), 'GitHub watcher must compare the public profile with the confirmed baseline.');
check(watchWorkflow.includes('--assignee "ycl-2004"') && watchWorkflow.includes('startswith("[Profile Watch]")'), 'GitHub watcher must assign one deduplicated reminder issue to ycl-2004.');
check(!/(git commit|git push|--accept|sync-github)/.test(watchWorkflow), 'Scheduled GitHub watcher must never accept a baseline, commit, push, or run website synchronization.');
check(watchScript.includes("if (accept) {") && watchScript.includes('writeFileSync(baselinePath'), 'Baseline changes must require the explicit local --accept path.');
check(views.includes('token.startsWith(query)'), 'Short search terms must match token prefixes instead of arbitrary substrings such as stoRAGe.');
check(animations.includes("querySelector('.entry-orbit-ring')") && animations.includes('if (!orbitRing || !orbitLinks.length) return;'), 'Orbit motion must wait until its SVG targets exist before marking itself ready.');
check(animations.includes('if (app.state.canvasReady') && animations.includes("intro.eventCallback('onComplete'"), 'Canvas proximity motion must initialize after the Canvas intro so GSAP quickTo tweens remain valid.');
check(portfolioItems.includes("id: 'project-yc-brand-systems'"), 'Evidence Bank must include the combined YC Brand Systems record.');
check(modals.includes("'project-yc-brand-systems':"), 'Modal data must include the combined YC Brand Systems record.');
check(modals.includes('https://github.com/ycl-2004/YC_IP') && modals.includes('https://github.com/ycl-2004/YC_Design'), 'YC Brand Systems must link to the current YC_IP and YC_Design repositories.');
check(modals.includes('https://github.com/ycl-2004/Unity-Game-Design'), 'Unity evidence must link to the current consolidated Unity repository.');
check(modals.includes('The source repository is private') && modals.includes('The coursework source archive is private'), 'Private evidence records must state their availability clearly.');
check(modals.includes("subtitle: 'Private JD-tailored resume intelligence engine"), 'The retained private Resume Tailor subtitle must remain visible in the Evidence Bank.');
check(modals.includes("subtitle: 'Private coursework control system") && modals.includes("subtitle: 'Private coursework sensing system") && modals.includes("subtitle: 'Private coursework team project"), 'Private coursework subtitles must remain visible in the Evidence Bank.');
check(!cards.includes('10 merged PRs across BLE connectivity'), 'Delta card must lead with real contribution areas instead of a PR-count summary.');
check(!modals.includes('Shipped 10 merged pull requests in the team repository'), 'Delta modal must lead with the actual work contribution instead of a PR-count bullet.');
check(cards.includes('Software Developer · Jan 2026 - Aug 2026') && portfolioItems.includes("dateLabel: 'Jan 2026 - Aug 2026'"), 'Delta Controls must show the completed Jan 2026 - Aug 2026 capstone window.');
check(modals.includes('Kotlin / Jetpack Compose') && modals.includes('0.3 °C MAE'), 'Delta modal must carry the shipped Android app and the measured model accuracy.');

for (const id of expectedMainProjects) {
    check(terminalEntry.includes(`id: '${id}'`), `Terminal orbit is missing ${id}.`);
    check(portfolioItems.includes(`id: '${id}'`), `Terminal orbit target is missing from portfolio items: ${id}.`);
    check(cards.includes(`data-card="${id}"`), `Terminal orbit target is missing from the Canvas: ${id}.`);
}

check(terminalEntry.includes('app.enterCanvas({ targetCardId: node.id })'), 'Terminal orbit nodes must preserve their target card id.');
check(terminalEntry.includes('app.focusCanvasCard(targetCardId)'), 'Terminal launch must focus the requested Canvas card.');
check(canvasTools.includes('app.focusCanvasCard = focusCanvasCard'), 'Canvas must expose the shared card-focus behavior.');

for (const match of index.matchAll(/(?:src|href)="(\.\/[^"?#]+)(?:[?#][^"]*)?"/g)) {
    const localPath = resolve(root, match[1]);
    check(existsSync(localPath), `Missing local asset referenced by index.html: ${match[1]}`);
}

const scripts = walk(join(root, 'assets/scripts')).filter((path) => extname(path) === '.js');
for (const script of [...scripts, watchScriptPath]) {
    const result = spawnSync(process.execPath, ['--check', script], { encoding: 'utf8' });
    check(result.status === 0, `JavaScript syntax failed for ${script.replace(`${root}/`, '')}: ${result.stderr.trim()}`);
}

const portfolioIds = [...portfolioItems.matchAll(/\bid: '([^']+)'/g)].map((match) => match[1]);
for (const id of portfolioIds) {
    check(modals.includes(`'${id}':`) || ['work-delta', 'work-joychime', 'education'].includes(id), `Portfolio item is missing modal data: ${id}`);
}

const milestoneIds = new Set();
for (const match of portfolioItems.matchAll(/items: \[([^\]]*)\]/g)) {
    for (const id of match[1].matchAll(/'([^']+)'/g)) {
        check(portfolioIds.includes(id[1]), `Timeline references a missing portfolio item: ${id[1]}`);
        milestoneIds.add(id[1]);
    }
}

// Timeline View renders only what a milestone references, so an unreferenced record is invisible there.
for (const id of portfolioIds) {
    check(milestoneIds.has(id), `Portfolio item is invisible in Timeline View because no milestone references it: ${id}`);
}

check(!portfolioItems.includes("id: 'project-ycapikit'") && !modals.includes("'project-ycapikit':"), 'Removed YCAPIKit must not remain in visible portfolio data.');
check(!portfolioItems.includes("id: 'project-lawdesk'") && !modals.includes("'project-lawdesk':"), 'Removed LawDesk project must not remain in visible portfolio data.');
check(!portfolioItems.includes("id: 'project-crypto'") && !modals.includes("'project-crypto':"), 'Removed CryptoPulse project must not remain in visible portfolio data.');

check(portfolioIds.length === 26, `Evidence Bank must contain the user-curated 26 records, found ${portfolioIds.length}.`);

if (failures.length) {
    console.error(`Static QA failed (${failures.length}):`);
    failures.forEach((failure) => console.error(`- ${failure}`));
    process.exit(1);
}

console.log(`Static QA passed: ${scripts.length + 1} scripts parsed, canonical entry, notification-only GitHub watch, and public-safety rules verified.`);
warnings.forEach((warning) => console.warn(`Warning: ${warning}`));
