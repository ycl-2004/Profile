(function () {
    const app = window.PortfolioApp;

    app.templates.cards = `
        <div class="card card-hub sticky-blue" style="left:80px;top:70px;width:170px;animation-delay:0.04s;" data-card="self-hub" data-layer="self" data-section="self">
            <div class="hub-label">Section 01</div>
            <div class="sticky-title">👤 Self</div>
            <div class="sticky-body">Who I am and how I introduce myself.</div>
        </div>

        <div class="card" style="left:80px;top:150px;width:360px;animation-delay:0.08s;" data-card="profile" data-layer="self" data-section="self">
            <div class="card-header"><div class="card-avatar">👨‍💻</div><div><div class="card-title">Yi-Chen Lin</div><div class="card-subtitle">AI-Native Product Engineer · Full-Stack Builder</div></div></div>
            <div class="card-body"><p>Hands-on builder across web, desktop, and AI-powered product workflows.</p><p>I turn messy ideas into structured, working systems.</p><p style="color:var(--pink-dark);font-weight:600;">Focus: shipping useful products with speed, clarity, and end-to-end ownership.</p></div>
            <div class="card-footer"><span class="tag blue">AI-Native</span><span class="tag green">Workflow Design</span><span class="tag pink">Product Sense</span></div>
        </div>

        <div class="card" style="left:80px;top:330px;width:360px;animation-delay:0.12s;" data-card="ai-partner" data-layer="self" data-section="self">
            <div class="card-title" style="margin-bottom:12px;display:flex;align-items:center;gap:8px;color:var(--lavender-dark);">🧠 AI Work Philosophy</div>
            <div class="card-body"><p style="font-weight:600;color:var(--text);">I design workflows where AI handles execution, iteration, and scaling.</p><p>My role is structure, direction, and product decisions.</p><p style="color:var(--text-muted);">AI is not a tool in my workflow, but a core collaborator.</p></div>
        </div>

        <div class="card card-sticky sticky-purple" style="left:80px;top:510px;width:170px;animation-delay:0.16s;" data-card="sticky-agent-native" data-layer="self" data-section="self">
            <div class="sticky-title">🤖 Agent-Native</div>
            <div class="sticky-body">Structure work for delegation, execution, and verification.</div>
        </div>

        <div class="card card-sticky sticky-pink" style="left:270px;top:510px;width:170px;animation-delay:0.2s;" data-card="sticky-agent" data-layer="self" data-section="self">
            <div class="sticky-title">🛠 Builder Mode</div>
            <div class="sticky-body">Scope down fast. Ship early. Improve from real use.</div>
        </div>

        <div class="card card-quote" style="left:80px;top:630px;width:360px;animation-delay:0.24s;" data-card="narrative" data-layer="self" data-section="self">
            <div class="sticky-title" style="color:var(--peach-dark);">🧠 My Approach</div>
            <div class="quote-text">“Turn ambiguity into useful systems.”</div>
            <div class="quote-author">— Yi-Chen Lin</div>
        </div>

        <div class="card" style="left:80px;top:810px;width:360px;animation-delay:0.28s;" data-card="ai-tooling" data-layer="self" data-section="self">
            <div class="card-title" style="margin-bottom:12px;display:flex;align-items:center;gap:8px;color:var(--pink-dark);">⚙️ AI Tooling</div>
            <div class="card-body"><p>LLMs for coding, reasoning, and system design.</p><p>Workflow tools and automation pipelines for rapid iteration.</p><p style="color:var(--text-muted);">Built for real product development, not just prompting.</p></div>
        </div>

        <div class="card card-sticky sticky-yellow" style="left:80px;top:980px;width:170px;animation-delay:0.32s;" data-card="sticky-intj" data-layer="self" data-section="self">
            <div class="sticky-title">🧩 Working Style</div>
            <div class="sticky-body">Structured, independent, and systems-oriented.</div>
        </div>

        <div class="card card-sticky sticky-blue" style="left:270px;top:980px;width:170px;animation-delay:0.36s;" data-card="motto" data-layer="self" data-section="self">
            <div class="sticky-title">💬 Motto</div>
            <div class="sticky-body">"Build fast, learn faster."<br><br><span style="font-size:11px;color:var(--text-muted);">Clarity comes from shipping.</span></div>
        </div>

        <div class="card card-hub sticky-purple" style="left:490px;top:70px;width:180px;animation-delay:0.08s;" data-card="general-hub" data-layer="general" data-section="general">
            <div class="hub-label">Section 02</div>
            <div class="sticky-title">🧭 General</div>
            <div class="sticky-body">How I grew and how I developed my thinking.</div>
        </div>

        <div class="card card-timeline" style="left:490px;top:150px;width:420px;animation-delay:0.12s;" data-card="timeline" data-layer="general" data-section="general">
            <div class="card-title" style="margin-bottom:18px;display:flex;align-items:center;gap:8px;color:var(--pink-dark);">🧭 Growth Timeline</div>
            <div class="timeline-item"><div class="timeline-dot"></div><div class="timeline-content"><div class="timeline-date">2022</div><div class="timeline-title">Engineering foundations</div><div class="timeline-desc">Started in Electrical Engineering → learned systems thinking and hardware constraints → built a model for how systems behave.</div></div></div>
            <div class="timeline-item"><div class="timeline-dot" style="background:var(--mint-dark);box-shadow:0 0 0 2px var(--mint-dark);"></div><div class="timeline-content"><div class="timeline-date">2023</div><div class="timeline-title">Transition to software</div><div class="timeline-desc">Chose software for faster iteration and broader impact → learned React and TypeScript → shifted from understanding systems to building them.</div></div></div>
            <div class="timeline-item"><div class="timeline-dot" style="background:var(--peach-dark);box-shadow:0 0 0 2px var(--peach-dark);"></div><div class="timeline-content"><div class="timeline-date">2024</div><div class="timeline-title">Building for users</div><div class="timeline-desc">Focused on usability and product thinking → built apps with UI, workflows, and user interaction → learned that users define value.</div></div></div>
            <div class="timeline-item"><div class="timeline-dot" style="background:var(--lavender-dark);box-shadow:0 0 0 2px var(--lavender-dark);"></div><div class="timeline-content"><div class="timeline-date">2025</div><div class="timeline-title">Systems & infra thinking</div><div class="timeline-desc">Explored APIs, backend logic, and automation → connected services and workflows → moved from features to systems that scale.</div></div></div>
            <div class="timeline-item"><div class="timeline-dot" style="background:var(--rose-dark);box-shadow:0 0 0 2px var(--rose-dark);"></div><div class="timeline-content"><div class="timeline-date">2025 → now</div><div class="timeline-title">AI-native builder</div><div class="timeline-desc">Integrated AI into development and research → designed agent-based workflows → now operate like 1 person + AI = a scalable builder.</div></div></div>
        </div>

        <div class="card card-skills" style="left:490px;top:520px;width:420px;animation-delay:0.16s;" data-card="skills" data-layer="general" data-section="general">
            <div class="card-title" style="margin-bottom:18px;display:flex;align-items:center;gap:8px;color:var(--pink-dark);">⚔️ Skills & Capabilities</div>
            <div class="card-body general-groups">
                <div class="general-group"><div class="general-group-title">Frontend & UI</div><div class="general-group-desc">React · TypeScript · Dashboard UI · Interaction Design</div></div>
                <div class="general-group"><div class="general-group-title">Full-Stack Systems</div><div class="general-group-desc">Supabase · APIs · Data Flow · Backend Logic</div></div>
                <div class="general-group"><div class="general-group-title">AI Integration</div><div class="general-group-desc">LLM workflows · Prompt design · AI-assisted development</div></div>
                <div class="general-group"><div class="general-group-title">Product & Workflow Thinking</div><div class="general-group-desc">User flows · Feature design · Rapid prototyping</div></div>
                <div class="general-group"><div class="general-group-title">Tools</div><div class="general-group-desc">Git · Cursor · Codex · Claude Code · NotebookLM · Gemini</div></div>
            </div>
        </div>

        <div class="card" style="left:490px;top:710px;width:420px;animation-delay:0.2s;" data-card="content" data-layer="general" data-section="general">
            <div class="card-title" style="margin-bottom:14px;display:flex;align-items:center;gap:8px;color:var(--sky-dark);">✍️ Content Systems</div>
            <div class="card-body">
                <p style="font-weight:700;color:var(--text);font-size:14px;">Focus: Web3 & AI (beginner-friendly insights)</p>
                <p style="margin-top:10px;">• Simplify complex concepts into structured, practical content</p>
                <p>• Document workflows and learning systems in SOP-style formats</p>
                <p>• Share insights on X / Xiaohongshu — combining tech and personal thinking</p>
                <p style="color:var(--text-muted);">Goal: turn knowledge into reusable systems and scalable content.</p>
            </div>
            <div class="card-footer"><span class="tag blue">Structured Writing</span><span class="tag green">Workflow Docs</span><span class="tag purple">Reusable Knowledge</span></div>
        </div>

        <div class="card" style="left:490px;top:900px;width:420px;animation-delay:0.24s;" data-card="opinion" data-layer="general" data-section="general">
            <div class="card-title" style="margin-bottom:12px;display:flex;align-items:center;gap:8px;color:var(--peach-dark);">🧠 Insight Framework</div>
            <div class="card-body">
                <p>• AI is shifting execution; humans should own structure and decisions.</p>
                <p>• SOPs are increasingly written for agents, not just for people.</p>
                <p>• Individual builders can now operate like small teams with AI.</p>
                <p style="font-size:12px;color:var(--text-muted);">Exploring how AI reshapes learning, building, and individual productivity.</p>
            </div>
            <div class="card-footer"><span class="tag orange">AI Worldview</span><span class="tag pink">Workflow Thinking</span><span class="tag cyan">Builder Leverage</span></div>
        </div>

        <div class="card card-hub sticky-pink" style="left:1340px;top:70px;width:190px;animation-delay:0.12s;" data-card="experience-hub" data-layer="experience" data-section="experience">
            <div class="hub-label">Section 03</div>
            <div class="sticky-title">🛠 Experience</div>
            <div class="sticky-body">What kinds of problems I turned into products and systems.</div>
        </div>

        <div class="card card-hub card-subhub sticky-yellow" style="left:960px;top:160px;width:170px;animation-delay:0.16s;" data-card="work-hub" data-layer="experience" data-section="experience" data-group="work">
            <div class="hub-label">Work</div>
            <div class="sticky-title">💼 Work Experience</div>
            <div class="sticky-body">Real constraints, delivery, and operations.</div>
        </div>

        <div class="card card-hub card-subhub sticky-purple" style="left:1320px;top:160px;width:180px;animation-delay:0.18s;" data-card="independent-hub" data-layer="experience" data-section="experience" data-group="independent">
            <div class="hub-label">Independent</div>
            <div class="sticky-title">🚀 Independent Projects</div>
            <div class="sticky-body">AI-native product systems built end-to-end.</div>
        </div>

        <div class="card card-hub card-subhub sticky-blue" style="left:1680px;top:160px;width:170px;animation-delay:0.2s;" data-card="research-hub" data-layer="experience" data-section="experience" data-group="research">
            <div class="hub-label">Research</div>
            <div class="sticky-title">🔬 Explorations</div>
            <div class="sticky-body">Data, governance, and workflow experiments.</div>
        </div>

        <div class="card card-project" style="left:960px;top:240px;width:340px;animation-delay:0.22s;" data-card="work-delta" data-layer="experience" data-section="experience" data-group="work">
            <div class="project-header"><div class="project-icon" style="background:linear-gradient(135deg,#43e97b,#38f9d7);">🏢</div><div><div class="project-name">Delta Controls</div><div class="project-link">HVAC Air Balancing App</div></div></div>
            <div class="project-summary">Industrial monitoring tool for real-time HVAC field workflows.</div>
            <div class="project-points">
                <div class="project-point"><span class="project-label">Problem</span>Field engineers need clearer visibility into live device states.</div>
                <div class="project-point"><span class="project-label">Approach</span>Built a hybrid interface for device sync, monitoring, and connection workflows.</div>
            </div>
            <div class="project-tags"><span class="project-tag">Industrial UI</span><span class="project-tag">Device Sync</span><span class="project-tag">React</span><span class="project-tag">BLE/IP</span></div>
        </div>

        <div class="card card-project" style="left:960px;top:430px;width:340px;animation-delay:0.24s;" data-card="work-joychime" data-layer="experience" data-section="experience" data-group="work">
            <div class="project-header"><div class="project-icon" style="background:linear-gradient(135deg,#f6d365,#fda085);">⚙️</div><div><div class="project-name">Joychime Industrial</div><div class="project-link">Junior Electrical Assistant · May 2024 - Aug 2024</div></div></div>
            <div class="project-summary">Operations support inside a real manufacturing environment.</div>
            <div class="project-points">
                <div class="project-point"><span class="project-label">Problem</span>Production continuity depends on stable inspection and fast exception handling.</div>
                <div class="project-point"><span class="project-label">Approach</span>Supported wiring, assembly, documentation, and on-site troubleshooting.</div>
            </div>
            <div class="project-tags"><span class="project-tag">Operations</span><span class="project-tag">Troubleshooting</span><span class="project-tag">Documentation</span><span class="project-tag">Assembly</span></div>
        </div>

        <div class="card card-project" style="left:1320px;top:240px;width:340px;animation-delay:0.26s;" data-card="project-family-care" data-layer="experience" data-section="experience" data-group="independent">
            <div class="project-header"><div class="project-icon" style="background:linear-gradient(135deg,#ff9a9e,#fad0c4);">💗</div><div><div class="project-name">Family Care Reminder</div><div class="project-link">Reminder product for seniors</div></div></div>
            <div class="project-summary">Reminder product for elderly users and family coordination.</div>
            <div class="project-points">
                <div class="project-point"><span class="project-label">Problem</span>Missed reminders often come from complexity, not intent.</div>
                <div class="project-point"><span class="project-label">Approach</span>Designed low-friction daily flows and a reliable notification lifecycle.</div>
            </div>
            <div class="project-tags"><span class="project-tag">Reliability</span><span class="project-tag">User Flows</span><span class="project-tag">Flutter</span><span class="project-tag">Supabase</span></div>
        </div>

        <div class="card card-project" style="left:1320px;top:430px;width:340px;animation-delay:0.28s;" data-card="project-ycapikit" data-layer="experience" data-section="experience" data-group="independent">
            <div class="project-header"><div class="project-icon" style="background:linear-gradient(135deg,#00c6ff,#0072ff);">🧩</div><div><div class="project-name">YCAPIKit</div><div class="project-link">Multi-model AI runtime for SwiftUI</div></div></div>
            <div class="project-summary">Reusable AI runtime for multi-provider Swift applications.</div>
            <div class="project-points">
                <div class="project-point"><span class="project-label">Problem</span>AI integrations are fragmented and hard to maintain across providers.</div>
                <div class="project-point"><span class="project-label">Approach</span>Unified routing, structured output, fallback logic, and observability.</div>
            </div>
            <div class="project-tags"><span class="project-tag">AI Infra</span><span class="project-tag">Multi-Provider</span><span class="project-tag">Swift</span><span class="project-tag">Observability</span></div>
        </div>

        <div class="card card-project" style="left:1680px;top:240px;width:340px;animation-delay:0.3s;" data-card="project-dao" data-layer="experience" data-section="experience" data-group="research">
            <div class="project-header"><div class="project-icon" style="background:linear-gradient(135deg,#667eea,#764ba2);">🏛</div><div><div class="project-name">Future DAO</div><div class="project-link">Governance and smart contract system</div></div></div>
            <div class="project-summary">Governance workflow system from proposal to execution.</div>
            <div class="project-points">
                <div class="project-point"><span class="project-label">Problem</span>On-chain governance is powerful but difficult to use clearly.</div>
                <div class="project-point"><span class="project-label">Approach</span>Turned proposal, voting, and execution into an interactive product flow.</div>
            </div>
            <div class="project-tags"><span class="project-tag">Governance UX</span><span class="project-tag">Smart Contracts</span><span class="project-tag">Solidity</span><span class="project-tag">React</span></div>
        </div>

        <div class="card card-project" style="left:1680px;top:430px;width:340px;animation-delay:0.32s;" data-card="project-crypto" data-layer="experience" data-section="experience" data-group="research">
            <div class="project-header"><div class="project-icon" style="background:linear-gradient(135deg,#f093fb,#f5576c);">📊</div><div><div class="project-name">CryptoPulse</div><div class="project-link">Full-stack crypto analytics dashboard</div></div></div>
            <div class="project-summary">Real-time analytics dashboard for faster market reading.</div>
            <div class="project-points">
                <div class="project-point"><span class="project-label">Problem</span>Crypto market data is fragmented and hard to interpret quickly.</div>
                <div class="project-point"><span class="project-label">Approach</span>Designed trend-focused views with real-time API syncing.</div>
            </div>
            <div class="project-tags"><span class="project-tag">Data Product</span><span class="project-tag">API Sync</span><span class="project-tag">Dashboard</span><span class="project-tag">React</span></div>
        </div>

        <div class="card card-project" style="left:1320px;top:620px;width:340px;animation-delay:0.34s;" data-card="project-todo" data-layer="experience" data-section="experience" data-group="independent">
            <div class="project-header"><div class="project-icon" style="background:linear-gradient(135deg,#4facfe,#00f2fe);">✅</div><div><div class="project-name">YC Todo</div><div class="project-link">macOS menubar productivity tool</div></div></div>
            <div class="project-summary">Minimal menubar task manager with local-first speed.</div>
            <div class="project-points">
                <div class="project-point"><span class="project-label">Problem</span>Many task tools feel bloated for quick personal capture.</div>
                <div class="project-point"><span class="project-label">Approach</span>Built a lightweight always-available workflow around fast input.</div>
            </div>
            <div class="project-tags"><span class="project-tag">Desktop UX</span><span class="project-tag">Local-First</span><span class="project-tag">Tauri</span><span class="project-tag">React</span></div>
        </div>

        <div class="card card-project" style="left:1680px;top:620px;width:340px;animation-delay:0.36s;" data-card="project-edu-analysis" data-layer="experience" data-section="experience" data-group="research">
            <div class="project-header"><div class="project-icon" style="background:linear-gradient(135deg,#43e97b,#38f9d7);">📈</div><div><div class="project-name">Education Excel Analysis</div><div class="project-link">Streamlit grade analytics dashboard</div></div></div>
            <div class="project-summary">Teacher-facing spreadsheet-to-insight workflow tool.</div>
            <div class="project-points">
                <div class="project-point"><span class="project-label">Problem</span>Raw grade spreadsheets are tedious to analyze manually.</div>
                <div class="project-point"><span class="project-label">Approach</span>Built upload, mapping, analysis, and export into one flow.</div>
            </div>
            <div class="project-tags"><span class="project-tag">Workflow Tool</span><span class="project-tag">Data Analysis</span><span class="project-tag">Streamlit</span><span class="project-tag">Python</span></div>
        </div>

        <div class="card card-hub card-subhub sticky-pink" style="left:960px;top:820px;width:180px;animation-delay:0.36s;" data-card="academic-hub" data-layer="experience" data-section="experience" data-group="academic">
            <div class="hub-label">Academic</div>
            <div class="sticky-title">🎓 Academic Projects</div>
            <div class="sticky-body">Engineering foundations behind later product work.</div>
        </div>

        <div class="card" style="left:960px;top:900px;width:340px;animation-delay:0.38s;" data-card="education" data-layer="experience" data-section="experience" data-group="academic">
            <div class="card-title" style="margin-bottom:14px;display:flex;align-items:center;gap:8px;color:var(--rose-dark);">🎓 Engineering Foundation</div>
            <div class="card-body">
                <p style="font-weight:700;color:var(--text);font-size:14px;">University of British Columbia</p>
                <p>Vancouver, Canada</p>
                <p>BASc · Electrical Engineering</p>
                <p style="margin-top:10px;">Built my foundation in systems, control, and hardware-software reasoning.</p>
                <p style="margin-top:10px;color:var(--pink-dark);font-weight:600;">Dean's Honour List (2022–2025)</p>
                <p style="color:var(--text-muted);">Expected graduation: 2027</p>
            </div>
        </div>

        <div class="card card-project" style="left:1320px;top:900px;width:340px;animation-delay:0.4s;" data-card="project-unity" data-layer="experience" data-section="experience" data-group="academic">
            <div class="project-header"><div class="project-icon" style="background:linear-gradient(135deg,#f6d365,#fda085);">🎮</div><div><div class="project-name">Unity Games (2D/3D)</div><div class="project-link">Interaction systems and UI behavior</div></div></div>
            <div class="project-summary">Playable interaction prototypes for feedback and UI behavior.</div>
            <div class="project-points">
                <div class="project-point"><span class="project-label">Problem</span>Good interaction design needs real-time player feedback.</div>
                <div class="project-point"><span class="project-label">Approach</span>Built 2D/3D systems for controls, physics, animation, and UI loops.</div>
            </div>
            <div class="project-tags"><span class="project-tag">Interaction</span><span class="project-tag">Gameplay</span><span class="project-tag">Unity</span><span class="project-tag">C#</span></div>
        </div>

        <div class="card card-project" style="left:1680px;top:900px;width:340px;animation-delay:0.42s;" data-card="project-sailbot" data-layer="experience" data-section="experience" data-group="academic">
            <div class="project-header"><div class="project-icon" style="background:linear-gradient(135deg,#89f7fe,#66a6ff);">⛵</div><div><div class="project-name">UBC Sailbot</div><div class="project-link">Electrical Power Team</div></div></div>
            <div class="project-summary">Team-based power integration for an autonomous sailbot.</div>
            <div class="project-points">
                <div class="project-point"><span class="project-label">Problem</span>Multi-system hardware projects need reliable power distribution and testing.</div>
                <div class="project-point"><span class="project-label">Approach</span>Supported circuit integration, diagnostics, and team coordination.</div>
            </div>
            <div class="project-tags"><span class="project-tag">Integration</span><span class="project-tag">Power Systems</span><span class="project-tag">Testing</span><span class="project-tag">Teamwork</span></div>
        </div>

        <div class="card card-project" style="left:960px;top:1090px;width:340px;animation-delay:0.44s;" data-card="project-balance-bot" data-layer="experience" data-section="experience" data-group="academic">
            <div class="project-header"><div class="project-icon" style="background:linear-gradient(135deg,#a18cd1,#fbc2eb);">🤖</div><div><div class="project-name">Self-Balancing Robot</div><div class="project-link">PID + hardware-software control loop</div></div></div>
            <div class="project-summary">Closed-loop control system for real-time balance tuning.</div>
            <div class="project-points">
                <div class="project-point"><span class="project-label">Problem</span>Balancing behavior is unstable without fast feedback and tuning.</div>
                <div class="project-point"><span class="project-label">Approach</span>Built PID control with sensor feedback and live parameter adjustment.</div>
            </div>
            <div class="project-tags"><span class="project-tag">Control Systems</span><span class="project-tag">PID</span><span class="project-tag">Bluetooth</span><span class="project-tag">Arduino</span></div>
        </div>

        <div class="card card-project" style="left:1320px;top:1090px;width:340px;animation-delay:0.46s;" data-card="project-metal-detector" data-layer="experience" data-section="experience" data-group="academic">
            <div class="project-header"><div class="project-icon" style="background:linear-gradient(135deg,#ffecd2,#fcb69f);">🧲</div><div><div class="project-name">Metal Detector Robot</div><div class="project-link">Circuit optimization + MCU programming</div></div></div>
            <div class="project-summary">Embedded sensing system optimized for reliable detection.</div>
            <div class="project-points">
                <div class="project-point"><span class="project-label">Problem</span>Detection quality drops when circuits and tuning are unstable.</div>
                <div class="project-point"><span class="project-label">Approach</span>Improved circuit design, MCU logic, and calibration workflow.</div>
            </div>
            <div class="project-tags"><span class="project-tag">Embedded</span><span class="project-tag">Calibration</span><span class="project-tag">MCU</span><span class="project-tag">Circuits</span></div>
        </div>

        <div class="card card-hub sticky-yellow" style="left:1680px;top:1090px;width:170px;animation-delay:0.48s;" data-card="contact-hub" data-layer="contact" data-section="contact">
            <div class="hub-label">Section 04</div>
            <div class="sticky-title">📮 Contact</div>
            <div class="sticky-body">The final place to reach out.</div>
        </div>

        <div class="card" style="left:1680px;top:1180px;width:340px;animation-delay:0.5s;" data-card="contact" data-layer="contact" data-section="contact">
            <div class="card-title" style="margin-bottom:14px;color:var(--pink-dark);">📮 Contact Me</div>
            <div class="card-body">
                <p>📧 yichen.lin.2004@gmail.com</p>
                <p>📱 +1 236-777-6823</p>
                <p>💼 LinkedIn: https://www.linkedin.com/in/yichenlin-lyc/</p>
                <p>🐙 GitHub: https://github.com/ycl-2004</p>
                <p>🎮 Portfolio: https://ycl-2004.github.io/Profile/</p>
            </div>
            <div class="card-footer"><span class="tag pink">Open to Opportunities</span><span class="tag green">Happy to Connect</span></div>
        </div>
    `;
})();
