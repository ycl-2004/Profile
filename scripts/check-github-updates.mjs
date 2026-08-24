import { readFileSync, writeFileSync } from 'node:fs';
import { join, resolve } from 'node:path';

const root = resolve(import.meta.dirname, '..');
const baselinePath = join(root, '.github/github-watch-baseline.json');
const accept = process.argv.includes('--accept');
const githubOutput = process.argv.includes('--github-output');
const baseline = JSON.parse(readFileSync(baselinePath, 'utf8'));
const apiBaseUrl = 'https://api.github.com';
const apiVersion = '2026-03-10';

async function fetchJson(url) {
    const headers = {
        Accept: 'application/vnd.github+json',
        'User-Agent': 'ycl-2004-profile-watch',
        'X-GitHub-Api-Version': apiVersion
    };
    if (process.env.GITHUB_TOKEN) headers.Authorization = `Bearer ${process.env.GITHUB_TOKEN}`;

    const response = await fetch(url, { headers });
    if (!response.ok) throw new Error(`GitHub API ${response.status} for ${url}`);
    return response.json();
}

async function fetchRepositories(login) {
    const repositories = [];
    for (let page = 1; ; page += 1) {
        const batch = await fetchJson(`${apiBaseUrl}/users/${login}/repos?per_page=100&type=public&sort=full_name&page=${page}`);
        repositories.push(...batch);
        if (batch.length < 100) return repositories;
    }
}

function normalizeRepositories(repositories) {
    return repositories
        .map((repository) => ({
            name: repository.name,
            fork: !!repository.fork,
            archived: !!repository.archived,
            stars: Number(repository.stargazers_count || 0)
        }))
        .sort((a, b) => a.name.localeCompare(b.name));
}

function buildReport(previous, current) {
    const previousByName = new Map(previous.repositories.map((repository) => [repository.name, repository]));
    const currentByName = new Map(current.repositories.map((repository) => [repository.name, repository]));
    const newRepositories = current.repositories.filter((repository) => !previousByName.has(repository.name));
    const removedRepositories = previous.repositories.filter((repository) => !currentByName.has(repository.name));
    const starChanges = current.repositories
        .filter((repository) => previousByName.has(repository.name))
        .map((repository) => ({
            name: repository.name,
            before: previousByName.get(repository.name).stars,
            after: repository.stars
        }))
        .filter((change) => change.before !== change.after);
    const stateChanges = current.repositories
        .filter((repository) => previousByName.has(repository.name))
        .map((repository) => ({
            name: repository.name,
            before: previousByName.get(repository.name),
            after: repository
        }))
        .filter((change) => change.before.fork !== change.after.fork || change.before.archived !== change.after.archived);

    return {
        changed: !!(newRepositories.length || removedRepositories.length || starChanges.length || stateChanges.length),
        newRepositories,
        removedRepositories,
        starChanges,
        stateChanges
    };
}

function formatReport(report, baseline, current) {
    const lines = [
        '# GitHub profile change detected',
        '',
        `Baseline confirmed: ${baseline.confirmedAt}`,
        `Current check: ${current.confirmedAt}`,
        '',
        `Public repositories: ${baseline.publicRepoCount} → ${current.publicRepoCount}`,
        `Public stars: ${baseline.publicStars} → ${current.publicStars}`,
        ''
    ];

    if (report.newRepositories.length) {
        lines.push('## New public repositories', '', ...report.newRepositories.map((repository) => `- [${repository.name}](https://github.com/${baseline.login}/${repository.name})`), '');
    }
    if (report.removedRepositories.length) {
        lines.push('## Removed or renamed repositories', '', ...report.removedRepositories.map((repository) => `- ${repository.name}`), '');
    }
    if (report.starChanges.length) {
        lines.push('## Star changes', '', ...report.starChanges.map((change) => `- ${change.name}: ${change.before} → ${change.after}`), '');
    }
    if (report.stateChanges.length) {
        lines.push('## Visibility-state changes', '', ...report.stateChanges.map((change) => `- ${change.name}: fork ${change.before.fork} → ${change.after.fork}; archived ${change.before.archived} → ${change.after.archived}`), '');
    }

    lines.push('No website content or baseline was changed. Review the difference, decide what belongs in the curated Profile, then update it manually.');
    return `${lines.join('\n')}\n`;
}

function writeGithubOutput(changed, reportPath) {
    const outputPath = process.env.GITHUB_OUTPUT;
    if (!outputPath) throw new Error('GITHUB_OUTPUT is required with --github-output.');
    writeFileSync(outputPath, `changed=${changed}\nreport_path=${reportPath}\n`, { flag: 'a' });
}

const user = await fetchJson(`${apiBaseUrl}/users/${baseline.login}`);
const repositories = normalizeRepositories(await fetchRepositories(baseline.login));
const current = {
    schemaVersion: baseline.schemaVersion,
    login: baseline.login,
    confirmedAt: new Date().toISOString(),
    publicRepoCount: repositories.length,
    publicStars: repositories.reduce((total, repository) => total + repository.stars, 0),
    repositories
};

if (current.publicRepoCount !== user.public_repos) {
    throw new Error(`GitHub count mismatch: user API=${user.public_repos}, repository list=${current.publicRepoCount}`);
}

const report = buildReport(baseline, current);
const markdown = formatReport(report, baseline, current);

if (accept) {
    writeFileSync(baselinePath, `${JSON.stringify(current, null, 2)}\n`);
}

let reportPath = '';
if (githubOutput) {
    reportPath = join(process.env.RUNNER_TEMP || root, 'profile-github-watch.md');
    writeFileSync(reportPath, markdown);
    if (process.env.GITHUB_STEP_SUMMARY) writeFileSync(process.env.GITHUB_STEP_SUMMARY, markdown, { flag: 'a' });
    writeGithubOutput(report.changed, reportPath);
}

console.log(JSON.stringify({
    ok: true,
    changed: report.changed,
    accepted: accept,
    publicRepoCount: current.publicRepoCount,
    publicStars: current.publicStars,
    newRepositories: report.newRepositories.map((repository) => repository.name),
    removedRepositories: report.removedRepositories.map((repository) => repository.name),
    starChanges: report.starChanges,
    stateChanges: report.stateChanges.map((change) => change.name)
}, null, 2));

if (report.changed && !accept && !githubOutput) process.exitCode = 1;
