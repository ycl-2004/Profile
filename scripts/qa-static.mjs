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
const legacy = readFileSync(join(root, 'yichen-canvas-v2.html'), 'utf8');

check(index.includes('<link rel="canonical" href="https://ycl-2004.github.io/Profile/">'), 'index.html must declare the production canonical URL.');
check(legacy.includes('window.location.replace(\'./\')'), 'Legacy HTML must redirect to the canonical root.');
check(!cards.includes('236-777') && !modals.includes('236-777'), 'Public pages must not expose the private phone number.');
check(!modals.includes('github.com/ycl-2004/ForYourResume'), 'Private Resume Tailor repository must not link to a public 404.');
check(!index.includes('onclick=') && !cards.includes('onclick='), 'Inline click handlers are not allowed.');
check(![cards, modals, portfolioItems, terminal].some((source) => source.includes('Dec 2027')), 'Expected graduation must not use the outdated Dec 2027 date.');
check([cards, modals, portfolioItems, terminal].every((source) => source.includes('May 2027')), 'Every resume surface must show the expected graduation date as May 2027.');
check((cards.match(/class="quick-link-row"/g) || []).length === 4, 'Canvas must expose exactly four Quick Links.');
check((cards.match(/<(?:button|a) class="quick-link-row"/g) || []).length === 4, 'Every Quick Link must be a real button or link.');

const expectedMainProjects = [
    'project-orbit',
    'project-notype',
    'project-todo',
    'project-browser-organizer',
    'project-sharememory',
    'project-yc-cast'
];
const expectedSystems = ['project-open-source', 'education'];

for (const id of [...expectedMainProjects, ...expectedSystems]) {
    check(cards.includes(`data-card="${id}"`), `Curated Canvas is missing ${id}.`);
    check(modals.includes(`'${id}':`), `Modal data is missing ${id}.`);
}

const mainProjectIds = [...cards.matchAll(/data-card="([^"]+)" data-curated-group="main-projects"/g)].map((match) => match[1]);
check(mainProjectIds.length === expectedMainProjects.length, `Main Projects must contain exactly ${expectedMainProjects.length} cards.`);
check(expectedMainProjects.every((id) => mainProjectIds.includes(id)), 'Main Projects contains an unexpected or missing curated project.');

const systemsIds = [...cards.matchAll(/data-card="([^"]+)" data-curated-group="systems-foundations"/g)].map((match) => match[1]);
check(systemsIds.length === expectedSystems.length, `Systems & Foundations must contain exactly ${expectedSystems.length} cards.`);
check(expectedSystems.every((id) => systemsIds.includes(id)), 'Systems & Foundations contains an unexpected or missing curated card.');
check(cards.includes('data-card="project-yc-brand-systems" data-layer="self" data-section="self"'), 'What I Build must visibly include the combined YC Brand Systems card.');
check(layout.includes("'project-yc-brand-systems'") && layout.includes("'project-open-source'"), 'Layout must place YC Brand Systems under What I Build and Open-Source Maintenance in Systems & Foundations.');
check(!cards.includes('data-card="project-yc-obsidian" data-curated-group="systems-foundations"'), 'YC Obsidian must not remain in the curated Systems & Foundations Canvas group.');
check(!connections.includes("project-yc-obsidian") && !connections.includes("project-ycapikit") && !connections.includes("project-lawdesk"), 'Canvas connections must not target removed or replaced curated cards.');
check(cards.includes('Open-Source Maintenance') && cards.includes('larger upstream AI and developer-tool projects'), 'Open-Source Maintenance card must explain the larger upstream contribution scope.');

check(cards.includes('<strong>28</strong><span>Public Repos</span>'), 'Stats Snapshot must use the current 28 public repositories count.');
check(terminal.includes('<dt>Public repositories</dt>\n                            <dd>28</dd>'), 'Entry proof must use the current 28 public repositories count.');
check(portfolioItems.includes("id: 'project-yc-brand-systems'"), 'Evidence Bank must include the combined YC Brand Systems record.');
check(modals.includes("'project-yc-brand-systems':"), 'Modal data must include the combined YC Brand Systems record.');
check(modals.includes('https://github.com/ycl-2004/YC_IP') && modals.includes('https://github.com/ycl-2004/YC_Design'), 'YC Brand Systems must link to the current YC_IP and YC_Design repositories.');
check(modals.includes('https://github.com/ycl-2004/Unity-Game-Design'), 'Unity evidence must link to the current consolidated Unity repository.');
check(modals.includes('The source repository is private') && modals.includes('The coursework source archive is private'), 'Private evidence records must state their availability clearly.');
check(modals.includes("subtitle: 'Private cross-platform reminder system") && modals.includes("subtitle: 'Private JD-tailored resume intelligence engine"), 'Private project subtitles must remain visible in the Evidence Bank.');
check(modals.includes("subtitle: 'Private coursework control system") && modals.includes("subtitle: 'Private coursework sensing system") && modals.includes("subtitle: 'Private coursework team project"), 'Private coursework subtitles must remain visible in the Evidence Bank.');
check(!cards.includes('10 merged PRs across BLE connectivity'), 'Delta card must lead with real contribution areas instead of a PR-count summary.');
check(!modals.includes('Shipped 10 merged pull requests in the team repository'), 'Delta modal must lead with the actual work contribution instead of a PR-count bullet.');

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
for (const script of scripts) {
    const result = spawnSync(process.execPath, ['--check', script], { encoding: 'utf8' });
    check(result.status === 0, `JavaScript syntax failed for ${script.replace(`${root}/`, '')}: ${result.stderr.trim()}`);
}

const portfolioIds = [...portfolioItems.matchAll(/\bid: '([^']+)'/g)].map((match) => match[1]);
for (const id of portfolioIds) {
    check(modals.includes(`'${id}':`) || ['work-delta', 'work-joychime', 'education'].includes(id), `Portfolio item is missing modal data: ${id}`);
}

for (const match of portfolioItems.matchAll(/items: \[([^\]]*)\]/g)) {
    for (const id of match[1].matchAll(/'([^']+)'/g)) {
        check(portfolioIds.includes(id[1]), `Timeline references a missing portfolio item: ${id[1]}`);
    }
}

check(!portfolioItems.includes("id: 'project-ycapikit'") && !modals.includes("'project-ycapikit':"), 'Removed YCAPIKit must not remain in visible portfolio data.');
check(!portfolioItems.includes("id: 'project-lawdesk'") && !modals.includes("'project-lawdesk':"), 'Removed LawDesk project must not remain in visible portfolio data.');
check(!portfolioItems.includes("id: 'project-crypto'") && !modals.includes("'project-crypto':"), 'Removed CryptoPulse project must not remain in visible portfolio data.');

if (index.includes('yichen-canvas-v2.html')) {
    warnings.push('Canonical page should not link visitors back to the legacy redirect.');
}

if (failures.length) {
    console.error(`Static QA failed (${failures.length}):`);
    failures.forEach((failure) => console.error(`- ${failure}`));
    process.exit(1);
}

console.log(`Static QA passed: ${scripts.length} scripts parsed, canonical entry and public-safety rules verified.`);
warnings.forEach((warning) => console.warn(`Warning: ${warning}`));
