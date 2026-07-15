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

for (const id of ['project-yc-obsidian', 'project-sharememory', 'project-always', 'project-open-source', 'project-lawdesk']) {
    check(cards.includes(`data-card="${id}"`), `Curated Canvas is missing ${id}.`);
    check(modals.includes(`'${id}':`), `Modal data is missing ${id}.`);
}

for (const match of index.matchAll(/(?:src|href)="(\.\/[^"?#]+)(?:[?#][^"]*)?"/g)) {
    const localPath = resolve(root, match[1]);
    check(existsSync(localPath), `Missing local asset referenced by index.html: ${match[1]}`);
}

const scripts = walk(join(root, 'assets/scripts')).filter((path) => extname(path) === '.js');
for (const script of scripts) {
    const result = spawnSync(process.execPath, ['--check', script], { encoding: 'utf8' });
    check(result.status === 0, `JavaScript syntax failed for ${script.replace(`${root}/`, '')}: ${result.stderr.trim()}`);
}

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
