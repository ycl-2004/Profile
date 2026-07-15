(function () {
    const app = window.PortfolioApp;

    app.templates.cards = `
        <div class="card card-section-banner section-tone-sky" data-card="section-self" data-layer="self" data-section="self">
            <div class="section-index">01 Self</div>
            <div class="section-caption">How I create value</div>
        </div>

        <div class="card card-mini" data-card="self-philosophy" data-layer="self" data-section="self">
            <div class="card-pill-icon tone-pink">◎</div>
            <div class="mini-card-title">Evidence First</div>
            <div class="mini-card-copy">I turn ambiguous product problems into observable systems: working interfaces, testable workflows, and clear proof of what shipped.</div>
        </div>

        <div class="card card-mini" data-card="self-builder-mode" data-layer="self" data-section="self">
            <div class="card-pill-icon tone-peach">🛠</div>
            <div class="mini-card-title">Builder Mode</div>
            <div class="mini-card-copy">I turn ideas into real products fast, then prototype, test, and refine until the value is obvious to users.</div>
        </div>

        <div class="card card-mini" data-card="self-what-i-build" data-layer="self" data-section="self">
            <div class="card-pill-icon tone-amber">✦</div>
            <div class="mini-card-title">What I Build</div>
            <div class="mini-card-copy">I build user-facing systems that solve real problems, from cross-platform apps to AI-powered tools and workflow products.</div>
        </div>

        <div class="card card-section-banner section-tone-lilac" data-card="section-general" data-layer="general" data-section="general">
            <div class="section-index">02 General</div>
            <div class="section-caption">My growth journey</div>
        </div>

        <div class="card card-timeline card-timeline-compact" data-card="timeline" data-layer="general" data-section="general">
            <div class="card-heading">Growth Timeline</div>
            <div class="timeline-item">
                <div class="timeline-dot"></div>
                <div class="timeline-content">
                    <div class="timeline-date">2022</div>
                    <div class="timeline-title">EE Foundation</div>
                    <div class="timeline-desc">Built a strong foundation in systems and hardware.</div>
                </div>
            </div>
            <div class="timeline-item">
                <div class="timeline-dot" style="background:var(--lavender-dark);box-shadow:0 0 0 2px var(--lavender-dark);"></div>
                <div class="timeline-content">
                    <div class="timeline-date">2023</div>
                    <div class="timeline-title">Shift to Software</div>
                    <div class="timeline-desc">Discovered the power of software to create impact.</div>
                </div>
            </div>
            <div class="timeline-item">
                <div class="timeline-dot" style="background:var(--peach-dark);box-shadow:0 0 0 2px var(--peach-dark);"></div>
                <div class="timeline-content">
                    <div class="timeline-date">2024</div>
                    <div class="timeline-title">Build for Users</div>
                    <div class="timeline-desc">Focused on usability, product thinking, and real-world needs.</div>
                </div>
            </div>
            <div class="timeline-item">
                <div class="timeline-dot" style="background:var(--mint-dark);box-shadow:0 0 0 2px var(--mint-dark);"></div>
                <div class="timeline-content">
                    <div class="timeline-date">2025</div>
                    <div class="timeline-title">Infra & Systems</div>
                    <div class="timeline-desc">Explored backend, APIs, automation, and data pipelines.</div>
                </div>
            </div>
            <div class="timeline-item">
                <div class="timeline-dot" style="background:var(--pink-dark);box-shadow:0 0 0 2px var(--pink-dark);"></div>
                <div class="timeline-content">
                    <div class="timeline-date">2025+</div>
                    <div class="timeline-title">AI-Native Builder</div>
                    <div class="timeline-desc">Integrating AI into workflows, building faster and smarter.</div>
                </div>
            </div>
        </div>

        <div class="card card-skill-summary" data-card="skills" data-layer="general" data-section="general">
            <div class="card-heading">Operating Strengths</div>
            <div class="skill-pill-row">
                <span class="tag blue">Systems Thinker</span>
                <span class="tag green">User-First</span>
                <span class="tag cyan">Follow-Through</span>
                <span class="tag purple">Fast Iteration</span>
                <span class="tag orange">Clear Communicator</span>
                <span class="tag blue">Calm Operator</span>
                <span class="tag pink">Evidence-Driven</span>
            </div>
        </div>

        <div class="card card-list" data-card="content" data-layer="general" data-section="general">
            <div class="card-heading">Content & Insights</div>
            <ul class="simple-list">
                <li>A public, privacy-sanitized Obsidian Personal OS</li>
                <li>Reusable design, agent-memory, and prompt systems</li>
                <li>Builder notes that turn experiments into repeatable workflows</li>
            </ul>
        </div>

        <div class="card card-section-banner section-tone-peach" data-card="section-experience" data-layer="experience" data-section="experience">
            <div class="section-index">03 Experience</div>
            <div class="section-caption">What I’ve built</div>
        </div>

        <div class="card card-micro-label" data-card="experience-work-label" data-layer="experience" data-section="experience">
            <div class="micro-label-text">Work Experience</div>
        </div>

        <div class="card card-project card-project-compact" data-card="work-delta" data-layer="experience" data-section="experience">
            <div class="project-header">
                <div class="project-icon" style="background:linear-gradient(135deg,#b4ffde,#46d6a9);">🖥</div>
                <div>
                    <div class="project-name">Delta Controls</div>
                    <div class="project-link">Software Developer · Jan 2026 - Present</div>
                </div>
            </div>
            <div class="project-summary">10 merged PRs across BLE connectivity, live visualization, test tooling, and field-facing control workflows.</div>
            <div class="project-tags"><span class="project-tag">React</span><span class="project-tag">Kotlin</span><span class="project-tag">BLE</span></div>
        </div>

        <div class="card card-project card-project-compact" data-card="work-joychime" data-layer="experience" data-section="experience">
            <div class="project-header">
                <div class="project-icon" style="background:linear-gradient(135deg,#ffe0cc,#ffb48b);">⚙️</div>
                <div>
                    <div class="project-name">Joychime Industrial</div>
                    <div class="project-link">Junior Electrical Assistant · May-Aug 2024</div>
                </div>
            </div>
            <div class="project-summary">Manufacturing operations support across inspection, wiring, assembly, and documentation workflows.</div>
            <div class="project-tags"><span class="project-tag">Operations</span><span class="project-tag">Wiring</span></div>
        </div>

        <div class="card card-micro-label" data-card="experience-main-label" data-layer="projects" data-section="projects">
            <div class="micro-label-text">Main Projects</div>
        </div>

        <div class="card card-project card-project-compact" data-card="project-yc-obsidian" data-layer="projects" data-section="projects">
            <div class="project-header">
                <div class="project-icon" style="background:linear-gradient(135deg,#ffd3e0,#ff8fab);">🗂</div>
                <div>
                    <div class="project-name">YC Obsidian</div>
                    <div class="project-link">Public personal operating system</div>
                </div>
            </div>
            <div class="project-summary">Privacy-sanitized knowledge system from capture and understanding to action and review.</div>
            <div class="project-tags"><span class="project-tag">Obsidian</span><span class="project-tag">Automation</span></div>
        </div>

        <div class="card card-project card-project-compact" data-card="project-ycapikit" data-layer="projects" data-section="projects">
            <div class="project-header">
                <div class="project-icon" style="background:linear-gradient(135deg,#b7f0ff,#7ac7ff);">✨</div>
                <div>
                    <div class="project-name">YCAPIKit</div>
                    <div class="project-link">Multi-provider AI runtime</div>
                </div>
            </div>
            <div class="project-summary">AI runtime abstraction layer for Swift applications.</div>
            <div class="project-tags"><span class="project-tag">Swift</span><span class="project-tag">AI / LLM</span></div>
        </div>

        <div class="card card-project card-project-compact" data-card="project-yc-cast" data-layer="projects" data-section="projects">
            <div class="project-header">
                <div class="project-icon" style="background:linear-gradient(135deg,#bdf1ff,#8fb6ff);">📱</div>
                <div>
                    <div class="project-name">YC Cast</div>
                    <div class="project-link">Mac-to-iPad extended display</div>
                </div>
            </div>
            <div class="project-summary">Authenticated local streaming app that turns an iPad into a Mac extended display.</div>
            <div class="project-tags"><span class="project-tag">Swift</span><span class="project-tag">iPadOS</span></div>
        </div>

        <div class="card card-project card-project-compact" data-card="project-resume-tailor" data-layer="projects" data-section="projects">
            <div class="project-header">
                <div class="project-icon" style="background:linear-gradient(135deg,#d5ffe5,#75d7ff);">📄</div>
                <div>
                    <div class="project-name">Resume Tailor</div>
                    <div class="project-link">JD-tailored resume engine</div>
                </div>
            </div>
            <div class="project-summary">Local tool that turns job descriptions and career evidence into one-page LaTeX resumes.</div>
            <div class="project-tags"><span class="project-tag">Python</span><span class="project-tag">LaTeX</span></div>
        </div>

        <div class="card card-project card-project-compact" data-card="project-sharememory" data-layer="projects" data-section="projects">
            <div class="project-header">
                <div class="project-icon" style="background:linear-gradient(135deg,#ffd7ff,#91d2ff);">🧠</div>
                <div>
                    <div class="project-name">ShareMemory</div>
                    <div class="project-link">Shared context for coding agents</div>
                </div>
            </div>
            <div class="project-summary">Project-scoped, file-based memory shared across Codex and Claude Code workflows.</div>
            <div class="project-tags"><span class="project-tag">Agent Tooling</span><span class="project-tag">CI</span></div>
        </div>

        <div class="card card-project card-project-compact" data-card="project-always" data-layer="projects" data-section="projects">
            <div class="project-header">
                <div class="project-icon" style="background:linear-gradient(135deg,#bfffd7,#4fe7a1);">⌘</div>
                <div>
                    <div class="project-name">Always</div>
                    <div class="project-link">Local reusable prompt system</div>
                </div>
            </div>
            <div class="project-summary">Private-by-default prompt and snippet workflows across macOS, Codex, Claude, and CLI.</div>
            <div class="project-tags"><span class="project-tag">macOS</span><span class="project-tag">Local-First</span></div>
        </div>

        <div class="card card-project card-project-compact" data-card="project-open-source" data-layer="projects" data-section="projects">
            <div class="project-header">
                <div class="project-icon" style="background:linear-gradient(135deg,#c5fff0,#7bd8ff);">↗</div>
                <div>
                    <div class="project-name">Open-Source Work</div>
                    <div class="project-link">Upstream maintenance & product UX</div>
                </div>
            </div>
            <div class="project-summary">3 upstream PRs merged; one active PR improving dual-view UX and source quality.</div>
            <div class="project-tags"><span class="project-tag">Open Source</span><span class="project-tag">Full-Stack</span></div>
        </div>

        <div class="card card-micro-label" data-card="experience-side-label" data-layer="projects" data-section="projects">
            <div class="micro-label-text">Systems & Foundations</div>
        </div>

        <div class="card card-project card-project-compact" data-card="project-lawdesk" data-layer="projects" data-section="projects">
            <div class="project-header">
                <div class="project-icon" style="background:linear-gradient(135deg,#d8c2ff,#fbc2eb);">⚖</div>
                <div>
                    <div class="project-name">LawDesk Junior</div>
                    <div class="project-link">Evidence-first legal workflow</div>
                </div>
            </div>
            <div class="project-summary">Guardrailed extraction, deterministic calculations, RAG, and tested browser workflows.</div>
            <div class="project-tags"><span class="project-tag">FastAPI</span><span class="project-tag">RAG</span></div>
        </div>

        <div class="card card-project card-project-compact" data-card="education" data-layer="projects" data-section="projects">
            <div class="project-header">
                <div class="project-icon" style="background:linear-gradient(135deg,#ffd7cc,#ffb48b);">🎓</div>
                <div>
                    <div class="project-name">Engineering Foundation</div>
                    <div class="project-link">BASc in Electrical Engineering</div>
                </div>
            </div>
            <div class="project-summary">Systems, hardware, and control foundations behind later product work.</div>
            <div class="project-tags"><span class="project-tag">Education</span><span class="project-tag">UBC</span></div>
        </div>

        <div class="card card-section-banner section-tone-blush" data-card="section-connect" data-layer="contact" data-section="contact">
            <div class="section-index">04 Connect</div>
            <div class="section-caption">Let’s build together</div>
        </div>

        <div class="card card-contact-card" data-card="contact" data-layer="contact" data-section="contact">
            <div class="card-heading">Contact</div>
            <a class="contact-row" href="mailto:yichen.lin.2004@gmail.com"><span>✉</span><span>yichen.lin.2004@gmail.com</span></a>
            <a class="contact-row" href="https://www.linkedin.com/in/yichenlin-lyc/" target="_blank" rel="noopener noreferrer"><span>in</span><span>linkedin.com/in/yichenlin-lyc/</span></a>
            <a class="contact-row" href="https://github.com/ycl-2004" target="_blank" rel="noopener noreferrer"><span>⌘</span><span>github.com/ycl-2004</span></a>
        </div>

        <div class="card card-collab-card" data-card="connect-collab" data-layer="contact" data-section="contact">
            <div class="card-heading">Let’s Collaborate</div>
            <div class="mini-card-copy">Open to 2027 opportunities, thoughtful product teams, and collaborations where design, systems, and execution move together.</div>
            <div class="cta-row">
                <span class="tag green">Open to Work</span>
                <span class="tag pink">Let’s Talk</span>
            </div>
        </div>

        <div class="card card-stats-card" data-card="connect-stats" data-layer="contact" data-section="contact">
            <div class="card-heading">Stats Snapshot</div>
            <div class="stats-grid">
                <div class="stat-block"><strong>10</strong><span>Merged Work PRs</span></div>
                <div class="stat-block"><strong>3</strong><span>Upstream PRs</span></div>
                <div class="stat-block"><strong>31</strong><span>Public Repos</span></div>
                <div class="stat-block"><strong>May 2027</strong><span>Expected Graduation</span></div>
            </div>
        </div>

        <div class="card card-soft-quote card-soft-quote-center" data-card="connect-quote" data-layer="contact" data-section="contact">
            <div class="quote-text">“Turn ambiguity into systems people can actually use.”</div>
            <div class="quote-author">— Yi-Chen Lin</div>
        </div>

        <div class="card card-section-banner section-tone-blue" data-card="section-explore" data-layer="contact" data-section="explore">
            <div class="section-index">05 Explore</div>
            <div class="section-caption">Dive deeper</div>
        </div>

        <div class="card card-links-card" data-card="explore-links" data-layer="contact" data-section="explore">
            <div class="card-heading">Quick Links</div>
            <button class="quick-link-row" type="button" data-profile-action="about"><span><strong>About Me</strong><small>How I work and what I value</small></span><em>→</em></button>
            <button class="quick-link-row" type="button" data-profile-action="evidence"><span><strong>Evidence Bank</strong><small>Search all work and projects</small></span><em>→</em></button>
            <a class="quick-link-row" href="https://github.com/ycl-2004" target="_blank" rel="noopener noreferrer"><span><strong>GitHub</strong><small>Original work and open-source activity</small></span><em>↗</em></a>
            <button class="quick-link-row" type="button" data-profile-action="print"><span><strong>Print Résumé</strong><small>Save a clean PDF from the browser</small></span><em>→</em></button>
        </div>

        <div class="card card-tech-card" data-card="explore-tech" data-layer="contact" data-section="explore">
            <div class="card-heading">Featured Tech</div>
            <div class="skill-pill-row">
                <span class="tag blue">React</span>
                <span class="tag purple">TypeScript</span>
                <span class="tag purple">SwiftUI</span>
                <span class="tag cyan">Supabase</span>
                <span class="tag blue">Flutter</span>
                <span class="tag green">Python</span>
                <span class="tag pink">LLM Systems</span>
                <span class="tag orange">Tauri</span>
                <span class="tag red">API Design</span>
            </div>
        </div>

        <div class="card card-terminal-note" data-card="explore-current" data-layer="contact" data-section="explore">
            <div class="terminal-note-title">Currently Building</div>
            <div class="terminal-note-line">> Industrial software that works in the field</div>
            <div class="terminal-note-line">> Native apps and reusable AI infrastructure</div>
            <div class="terminal-note-line">> Public systems that compound knowledge</div>
        </div>
    `;
})();
