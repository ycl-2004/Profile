(function () {
    const app = window.PortfolioApp;

    app.templates.cards = `
        <div class="card card-section-banner section-tone-sky" data-card="section-self" data-layer="self" data-section="self">
            <div class="section-index">01 Self</div>
            <div class="section-caption">How I create value</div>
        </div>

        <div class="card card-mini" data-card="self-philosophy" data-layer="self" data-section="self">
            <div class="card-pill-icon tone-pink">🧠</div>
            <div class="mini-card-title">AI Philosophy</div>
            <div class="mini-card-copy">I design systems where AI handles execution, iteration, and scale, while I focus on structure, decisions, and product direction.</div>
        </div>

        <div class="card card-mini" data-card="self-agent-native" data-layer="self" data-section="self">
            <div class="card-pill-icon tone-blue">🤖</div>
            <div class="mini-card-title">Agent-Native</div>
            <div class="mini-card-copy">I decompose problems into structured tasks AI agents can execute, review, and improve to create fast, scalable workflows.</div>
        </div>

        <div class="card card-mini" data-card="self-builder-mode" data-layer="self" data-section="self">
            <div class="card-pill-icon tone-peach">🛠</div>
            <div class="mini-card-title">Builder Mode</div>
            <div class="mini-card-copy">I turn ideas into real products fast, then prototype, test, and refine until the value is obvious to users.</div>
        </div>

        <div class="card card-mini" data-card="self-motto" data-layer="self" data-section="self">
            <div class="card-pill-icon tone-lavender">❝</div>
            <div class="mini-card-title">Motto</div>
            <div class="mini-card-copy">I turn ambiguity into systems people can actually use.</div>
        </div>

        <div class="card card-mini" data-card="self-what-i-build" data-layer="self" data-section="self">
            <div class="card-pill-icon tone-amber">✦</div>
            <div class="mini-card-title">What I Build</div>
            <div class="mini-card-copy">I build user-facing systems that solve real problems, from cross-platform apps to AI-powered tools and workflow products.</div>
        </div>

        <div class="card card-mini" data-card="self-ai-tooling" data-layer="self" data-section="self">
            <div class="card-pill-icon tone-mint">⚡</div>
            <div class="mini-card-title">AI Tooling</div>
            <div class="mini-card-copy">LLMs are integrated into my coding, reasoning, and system design workflows to support research, development, and iteration.</div>
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
            <div class="card-heading">Personal Tags</div>
            <div class="skill-pill-row">
                <span class="tag purple">ESFJ</span>
                <span class="tag blue">Systems Thinker</span>
                <span class="tag green">User-First</span>
                <span class="tag pink">Builder Energy</span>
                <span class="tag cyan">Follow-Through</span>
                <span class="tag purple">Fast Iteration</span>
                <span class="tag orange">Clear Communicator</span>
                <span class="tag blue">Calm Operator</span>
            </div>
        </div>

        <div class="card card-list" data-card="content" data-layer="general" data-section="general">
            <div class="card-heading">Content & Insights</div>
            <ul class="simple-list">
                <li>AI workflow playbooks and agent SOPs</li>
                <li>Builder notes on shipping, systems, and leverage</li>
                <li>Clear, beginner-friendly explainers across AI, product, and Web3</li>
            </ul>
        </div>

        <div class="card card-soft-quote" data-card="opinion" data-layer="general" data-section="general">
            <div class="card-heading">Insight Framework</div>
            <div class="quote-text">AI can multiply execution, but human empathy, taste, and decision-making still shape the product.</div>
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
            <div class="project-summary">Hybrid HVAC air balancing application for field-facing industrial workflows.</div>
            <div class="project-tags"><span class="project-tag">React</span><span class="project-tag">TypeScript</span></div>
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

        <div class="card card-project card-project-compact" data-card="project-family-care" data-layer="projects" data-section="projects">
            <div class="project-header">
                <div class="project-icon" style="background:linear-gradient(135deg,#ffd3e0,#ff8fab);">💗</div>
                <div>
                    <div class="project-name">Family Care Reminder</div>
                    <div class="project-link">Cross-platform reminder app</div>
                </div>
            </div>
            <div class="project-summary">Reminder product for elderly users and family coordination.</div>
            <div class="project-tags"><span class="project-tag">Flutter</span><span class="project-tag">Supabase</span></div>
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

        <div class="card card-project card-project-compact" data-card="project-crypto" data-layer="projects" data-section="projects">
            <div class="project-header">
                <div class="project-icon" style="background:linear-gradient(135deg,#ffd7ff,#91d2ff);">📊</div>
                <div>
                    <div class="project-name">CryptoPulse</div>
                    <div class="project-link">Realtime crypto dashboard</div>
                </div>
            </div>
            <div class="project-summary">Real-time crypto analytics dashboard and market signal views.</div>
            <div class="project-tags"><span class="project-tag">React</span><span class="project-tag">API</span></div>
        </div>

        <div class="card card-project card-project-compact" data-card="project-todo" data-layer="projects" data-section="projects">
            <div class="project-header">
                <div class="project-icon" style="background:linear-gradient(135deg,#bfffd7,#4fe7a1);">✅</div>
                <div>
                    <div class="project-name">YC Todo</div>
                    <div class="project-link">Minimal desktop task app</div>
                </div>
            </div>
            <div class="project-summary">Local-first task manager with an always-available workflow.</div>
            <div class="project-tags"><span class="project-tag">Tauri</span><span class="project-tag">React</span></div>
        </div>

        <div class="card card-project card-project-compact" data-card="project-edu-analysis" data-layer="projects" data-section="projects">
            <div class="project-header">
                <div class="project-icon" style="background:linear-gradient(135deg,#c5fff0,#7bd8ff);">📈</div>
                <div>
                    <div class="project-name">Excel Analysis</div>
                    <div class="project-link">Spreadsheet insight workflow</div>
                </div>
            </div>
            <div class="project-summary">Data analysis and classroom reporting workflow for teachers.</div>
            <div class="project-tags"><span class="project-tag">Python</span><span class="project-tag">Excel</span></div>
        </div>

        <div class="card card-micro-label" data-card="experience-side-label" data-layer="projects" data-section="projects">
            <div class="micro-label-text">Academic & Side Projects</div>
        </div>

        <div class="card card-project card-project-compact" data-card="project-balance-bot" data-layer="projects" data-section="projects">
            <div class="project-header">
                <div class="project-icon" style="background:linear-gradient(135deg,#d8c2ff,#fbc2eb);">🤖</div>
                <div>
                    <div class="project-name">Self-Balancing Robot</div>
                    <div class="project-link">PID control & sensors</div>
                </div>
            </div>
            <div class="project-summary">Closed-loop robot control system for real-time balance tuning.</div>
            <div class="project-tags"><span class="project-tag">Arduino</span><span class="project-tag">PID</span></div>
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

        <div class="card card-project card-project-compact" data-card="project-unity" data-layer="projects" data-section="projects">
            <div class="project-header">
                <div class="project-icon" style="background:linear-gradient(135deg,#ffe0b5,#ffae73);">🎮</div>
                <div>
                    <div class="project-name">Unity Games</div>
                    <div class="project-link">Interaction mechanics</div>
                </div>
            </div>
            <div class="project-summary">Game mechanics and UI behavior prototypes in Unity.</div>
            <div class="project-tags"><span class="project-tag">Unity</span><span class="project-tag">C#</span></div>
        </div>

        <div class="card card-project card-project-compact" data-card="project-sailbot" data-layer="projects" data-section="projects">
            <div class="project-header">
                <div class="project-icon" style="background:linear-gradient(135deg,#bdf1ff,#7fc1ff);">⛵</div>
                <div>
                    <div class="project-name">UBC Sailbot</div>
                    <div class="project-link">Power & circuit integration</div>
                </div>
            </div>
            <div class="project-summary">Power integration and testing support for an autonomous sailbot.</div>
            <div class="project-tags"><span class="project-tag">Circuits</span><span class="project-tag">Testing</span></div>
        </div>

        <div class="card card-section-banner section-tone-blush" data-card="section-connect" data-layer="contact" data-section="contact">
            <div class="section-index">04 Connect</div>
            <div class="section-caption">Let’s build together</div>
        </div>

        <div class="card card-contact-card" data-card="contact" data-layer="contact" data-section="contact">
            <div class="card-heading">Contact</div>
            <div class="contact-row"><span>✉</span><span>yichen.lin.2004@gmail.com</span></div>
            <div class="contact-row"><span>☎</span><span>+1 236-777-6823</span></div>
            <div class="contact-row"><span>in</span><span>linkedin.com/in/yichenlin-lyc/</span></div>
            <div class="contact-row"><span>⌘</span><span>github.com/ycl-2004</span></div>
            <div class="contact-row"><span>↗</span><span>ycl-2004.github.io/Profile</span></div>
        </div>

        <div class="card card-collab-card" data-card="connect-collab" data-layer="contact" data-section="contact">
            <div class="card-heading">Let’s Collaborate</div>
            <div class="mini-card-copy">Open to internships, thoughtful product teams, and projects where design, systems, and execution need to move together.</div>
            <div class="cta-row">
                <span class="tag green">Open to Work</span>
                <span class="tag pink">Let’s Talk</span>
            </div>
        </div>

        <div class="card card-stats-card" data-card="connect-stats" data-layer="contact" data-section="contact">
            <div class="card-heading">Stats Snapshot</div>
            <div class="stats-grid">
                <div class="stat-block"><strong>10+</strong><span>Projects Built</span></div>
                <div class="stat-block"><strong>5+</strong><span>Tech Stacks</span></div>
                <div class="stat-block"><strong>AI-Native</strong><span>Workflow</span></div>
                <div class="stat-block"><strong>1</strong><span>Builder + AI</span></div>
            </div>
        </div>

        <div class="card card-soft-quote card-soft-quote-center" data-card="connect-quote" data-layer="contact" data-section="contact">
            <div class="quote-text">“The best way to predict the future is to build it.”</div>
            <div class="quote-author">— Alan Kay</div>
        </div>

        <div class="card card-section-banner section-tone-blue" data-card="section-explore" data-layer="contact" data-section="explore">
            <div class="section-index">05 Explore</div>
            <div class="section-caption">Dive deeper</div>
        </div>

        <div class="card card-links-card" data-card="explore-links" data-layer="contact" data-section="explore">
            <div class="card-heading">Quick Links</div>
            <div class="quick-link-row"><div><strong>About Me</strong><span>What drives how I build</span></div><em>→</em></div>
            <div class="quick-link-row"><div><strong>All Projects</strong><span>From product apps to systems work</span></div><em>→</em></div>
            <div class="quick-link-row"><div><strong>Blog / Articles</strong><span>Notes on AI, workflows, and building</span></div><em>→</em></div>
            <div class="quick-link-row"><div><strong>Resume (PDF)</strong><span>Experience, projects, and strengths</span></div><em>→</em></div>
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
            <div class="terminal-note-line">> Human-centered AI workflows</div>
            <div class="terminal-note-line">> Useful products shipped fast</div>
            <div class="terminal-note-line">> Small systems, compounding leverage</div>
        </div>
    `;
})();
