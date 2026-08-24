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
            <div class="mini-card-copy">I build local-first apps, industrial interfaces, AI systems, and public brand systems that turn messy work into clear action.</div>
        </div>

        <div class="card card-mini" data-card="project-yc-brand-systems" data-layer="self" data-section="self">
            <div class="card-pill-icon tone-pink">✦</div>
            <div class="mini-card-title">YC Brand Systems</div>
            <div class="mini-card-copy">YC Design + YC IP: my public personal branding systems for reusable frontend, illustration, and visual communication.</div>
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
                <li>Technical writing: 311K cumulative reads across co-authored AI explainers</li>
                <li>Open-Source Maintenance: contributions to larger upstream AI and developer-tool projects</li>
                <li>YC Design + YC IP: reusable design and illustration systems</li>
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
                    <div class="project-link">Software Developer · Jan 2026 - Aug 2026</div>
                </div>
            </div>
            <div class="project-summary">Kotlin/Jetpack Compose Android field app that cut on-site HVAC balancing time by 35%, over an eight-month UBC ECE industry capstone.</div>
            <div class="project-tags"><span class="project-tag">Kotlin</span><span class="project-tag">BLE</span><span class="project-tag">OpenAI API</span></div>
        </div>

        <div class="card card-project card-project-compact" data-card="work-ai-warts" data-layer="experience" data-section="experience">
            <div class="project-header">
                <div class="project-icon" style="background:linear-gradient(135deg,#e4d7ff,#a98fff);">📡</div>
                <div>
                    <div class="project-name">AI Warts</div>
                    <div class="project-link">AI Technical Content Engineer · Jun 2026 - Present</div>
                </div>
            </div>
            <div class="project-summary">Crawlers and ranking signals shipped into AI News Radar, a 1.7K-star open-source project, plus benchmarking across 20+ partner companies.</div>
            <div class="project-tags"><span class="project-tag">Python</span><span class="project-tag">Open Source</span></div>
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

        <div class="card card-micro-label" data-card="experience-ai-label" data-layer="projects" data-section="projects">
            <div class="micro-label-text">AI &amp; LLM Systems</div>
        </div>

        <div class="card card-project card-project-compact" data-card="project-rag-system" data-curated-group="ai-systems" data-layer="projects" data-section="projects">
            <div class="project-header">
                <div class="project-icon" style="background:linear-gradient(135deg,#c9e4ff,#7aa7ff);">🔍</div>
                <div>
                    <div class="project-name">Production RAG System</div>
                    <div class="project-link">Hybrid retrieval at production latency</div>
                </div>
            </div>
            <div class="project-summary">20K vectors indexed in 15.5 s; vector-search P95 cut 27.5 ms → 1.76 ms; bge-base/BM25 hybrid with RRF lifted recall 6.0% and NDCG 9.5%.</div>
            <div class="project-tags"><span class="project-tag">FastAPI</span><span class="project-tag">pgvector</span></div>
        </div>

        <div class="card card-project card-project-compact" data-card="project-media-ops" data-curated-group="ai-systems" data-layer="projects" data-section="projects">
            <div class="project-header">
                <div class="project-icon" style="background:linear-gradient(135deg,#e6d8ff,#ab8fff);">🕸</div>
                <div>
                    <div class="project-name">Media Content Ops</div>
                    <div class="project-link">Client project · agent orchestration</div>
                </div>
            </div>
            <div class="project-summary">Multi-branch LangGraph workflows with MySQL checkpointing resume across 3 paths; 5-stage FastAPI service with row-level locking.</div>
            <div class="project-tags"><span class="project-tag">LangGraph</span><span class="project-tag">MySQL</span></div>
        </div>

        <div class="card card-project card-project-compact" data-card="project-ai-agents" data-curated-group="ai-systems" data-layer="projects" data-section="projects">
            <div class="project-header">
                <div class="project-icon" style="background:linear-gradient(135deg,#ccffe4,#57dfa6);">🧩</div>
                <div>
                    <div class="project-name">AI Agent Systems</div>
                    <div class="project-link">Public LangGraph project library</div>
                </div>
            </div>
            <div class="project-summary">State-machine agent architectures with human-in-the-loop gates, reflective self-healing loops, and 100% real external APIs.</div>
            <div class="project-tags"><span class="project-tag">LangGraph</span><span class="project-tag">MCP</span></div>
        </div>

        <div class="card card-micro-label" data-card="experience-main-label" data-layer="projects" data-section="projects">
            <div class="micro-label-text">Main Projects</div>
        </div>

        <div class="card card-project card-project-compact" data-card="project-orbit" data-curated-group="main-projects" data-layer="projects" data-section="projects">
            <div class="project-header">
                <div class="project-icon" style="background:linear-gradient(135deg,#bdf1ff,#8fb6ff);">🪐</div>
                <div>
                    <div class="project-name">Orbit</div>
                    <div class="project-link">Native macOS radial app switcher</div>
                </div>
            </div>
            <div class="project-summary">Gesture-first app switching that puts the next window around the cursor.</div>
            <div class="project-tags"><span class="project-tag">Swift</span><span class="project-tag">macOS</span></div>
        </div>

        <div class="card card-project card-project-compact" data-card="project-notype" data-curated-group="main-projects" data-layer="projects" data-section="projects">
            <div class="project-header">
                <div class="project-icon" style="background:linear-gradient(135deg,#d5ffe5,#75d7ff);">🎙️</div>
                <div>
                    <div class="project-name">NoType</div>
                    <div class="project-link">Private, local macOS dictation</div>
                </div>
            </div>
            <div class="project-summary">Mixed Chinese-English speech becomes text and returns to the focused field.</div>
            <div class="project-tags"><span class="project-tag">Swift</span><span class="project-tag">WhisperKit</span></div>
        </div>

        <div class="card card-project card-project-compact" data-card="project-todo" data-curated-group="main-projects" data-layer="projects" data-section="projects">
            <div class="project-header">
                <div class="project-icon" style="background:linear-gradient(135deg,#bfffd7,#4fe7a1);">✅</div>
                <div>
                    <div class="project-name">YC Todo</div>
                    <div class="project-link">Calm macOS menu-bar task app</div>
                </div>
            </div>
            <div class="project-summary">Tasks, notes, and focus timing stay one click away without leaving the current workflow.</div>
            <div class="project-tags"><span class="project-tag">Tauri</span><span class="project-tag">Local-First</span></div>
        </div>

        <div class="card card-project card-project-compact" data-card="project-browser-organizer" data-curated-group="main-projects" data-layer="projects" data-section="projects">
            <div class="project-header">
                <div class="project-icon" style="background:linear-gradient(135deg,#ffd3e0,#ff8fab);">🗂️</div>
                <div>
                    <div class="project-name">Browser Organizer</div>
                    <div class="project-link">Local-first Chrome workspace</div>
                </div>
            </div>
            <div class="project-summary">Favorites, daily planning, open tabs, and saved sessions in one quiet new tab.</div>
            <div class="project-tags"><span class="project-tag">Chrome</span><span class="project-tag">JavaScript</span></div>
        </div>

        <div class="card card-project card-project-compact" data-card="project-sharememory" data-curated-group="main-projects" data-layer="projects" data-section="projects">
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

        <div class="card card-project card-project-compact" data-card="project-screen-bridge" data-curated-group="main-projects" data-layer="projects" data-section="projects">
            <div class="project-header">
                <div class="project-icon" style="background:linear-gradient(135deg,#b7f0ff,#7ac7ff);">📱</div>
                <div>
                    <div class="project-name">Screen Bridge</div>
                    <div class="project-link">Mac-to-iPad extended display</div>
                </div>
            </div>
            <div class="project-summary">Authenticated local streaming that turns an iPad into a Mac extended display. Public v1.1.1 Universal Mac build.</div>
            <div class="project-tags"><span class="project-tag">Swift</span><span class="project-tag">iPadOS</span></div>
        </div>

        <div class="card card-micro-label" data-card="experience-side-label" data-layer="projects" data-section="projects">
            <div class="micro-label-text">Systems &amp; Foundations</div>
        </div>

        <div class="card card-project card-project-compact" data-card="project-open-source" data-curated-group="systems-foundations" data-layer="projects" data-section="projects">
            <div class="project-header">
                <div class="project-icon" style="background:linear-gradient(135deg,#c9f4ff,#7ac7ff);">↗</div>
                <div>
                    <div class="project-name">Open-Source Maintenance</div>
                    <div class="project-link">Contributions to larger upstream projects</div>
                </div>
            </div>
            <div class="project-summary">Contributed to larger upstream AI and developer-tool projects while keeping original ownership explicit.</div>
            <div class="project-tags"><span class="project-tag">Open Source</span><span class="project-tag">Upstream PRs</span></div>
        </div>

        <div class="card card-project card-project-compact" data-card="education" data-curated-group="systems-foundations" data-layer="projects" data-section="projects">
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
                <div class="stat-block"><strong>120+</strong><span>GitHub Stars</span></div>
                <div class="stat-block"><strong>3</strong><span>Upstream PRs Merged</span></div>
                <div class="stat-block"><strong>29</strong><span>Public Repos</span></div>
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
            <button class="quick-link-row" type="button" data-profile-action="print"><span><strong>Open Résumé PDF</strong><small>Official YC Resume PDF</small></span><em>→</em></button>
        </div>

        <div class="card card-tech-card" data-card="explore-tech" data-layer="contact" data-section="explore">
            <div class="card-heading">Featured Tech</div>
            <div class="skill-pill-row">
                <span class="tag green">Python</span>
                <span class="tag pink">RAG</span>
                <span class="tag purple">LangGraph</span>
                <span class="tag red">FastAPI</span>
                <span class="tag cyan">pgvector</span>
                <span class="tag orange">Kotlin</span>
                <span class="tag purple">SwiftUI</span>
                <span class="tag blue">TypeScript</span>
                <span class="tag blue">PyTorch</span>
            </div>
        </div>

        <div class="card card-terminal-note" data-card="explore-current" data-layer="contact" data-section="explore">
            <div class="terminal-note-title">Currently Building</div>
            <div class="terminal-note-line">> RAG pipelines and LangGraph agent orchestration</div>
            <div class="terminal-note-line">> Industrial field software that technicians actually use</div>
            <div class="terminal-note-line">> Native macOS and local-first tools, shipped publicly</div>
        </div>
    `;
})();
