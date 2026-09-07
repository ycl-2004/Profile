(function () {
    const app = window.PortfolioApp;
    const selfPhilosophy = {
        title: 'AI Philosophy',
        subtitle: 'AI handles execution, iteration, and scale; I direct the product',
        avatar: '🧠',
        body: `
            <h3>🧠 Division of labor</h3>
            <p>I design systems where AI handles execution, iteration, and scale — while I focus on structure, decisions, and product direction.</p>
            <h3>⚙️ Why it works</h3>
            <p>The leverage comes from pairing speed with judgment: more exploration, faster feedback loops, and clearer workflows without losing product quality.</p>
            <h3>🎯 What matters</h3>
            <p>I do not use AI as decoration. I build around it as an operating layer for shipping better products.</p>
        `,
        tags: ['AI Collaboration', 'Product Direction', 'Workflow Design']
    };
    const selfAgentNative = {
        title: 'Agent-Native Approach',
        subtitle: 'Decompose work so AI can execute it reliably',
        avatar: '🤖',
        body: `
            <h3>🤖 What it means</h3>
            <p>I decompose problems into structured tasks AI agents can execute, review, and improve — creating fast, scalable workflows.</p>
            <h3>🔁 Focus areas</h3>
            <p>Task structure, delegation quality, and feedback loops that keep output useful instead of noisy.</p>
            <h3>📈 Why it matters</h3>
            <p>The value is not “using agents.” The value is building repeatable systems that increase execution capacity.</p>
        `,
        tags: ['Task Design', 'Scalable Workflows', 'Feedback Loops']
    };
    const selfBuilderMode = {
        title: 'Builder Mode',
        subtitle: 'Turn ideas into working products fast',
        avatar: '🛠',
        body: `
            <h3>🛠 Default behavior</h3>
            <p>I turn ideas into real, working products fast. Prototype, test, refine — until the value becomes obvious to users.</p>
            <h3>🚀 Why it matters</h3>
            <p>Speed is useful when it creates learning. Shipping early helps me find signal, remove waste, and improve the product with real feedback.</p>
            <h3>📌 Principle</h3>
            <p>I trust working systems and user response more than abstract certainty.</p>
        `,
        tags: ['Execution', 'Iteration', 'Shipping']
    };
    const selfMotto = {
        title: 'Motto',
        subtitle: 'Clarity comes from building what people can use',
        avatar: '💬',
        body: `
            <h3>💬 Core line</h3>
            <p><strong>I turn ambiguity into systems people can actually use.</strong></p>
            <h3>🎯 What it means</h3>
            <p>The goal is not elegant description. The goal is a system that makes complexity clearer and more useful in the real world.</p>
        `,
        tags: ['Clarity', 'Usefulness', 'Execution']
    };
    const workingStyle = {
        title: 'Working Style',
        subtitle: 'Structured, reliable, and execution-focused',
        avatar: '🧠',
        body: `
            <h3>🤝 How I show up</h3>
            <p>I prioritize clarity, follow-through, and building systems that work in real use.</p>
            <h3>📌 What that looks like</h3>
            <p>I like clean structure, visible progress, and decisions that move the product forward instead of making the process louder.</p>
        `,
        tags: ['Clarity', 'Reliability', 'Execution']
    };
    const selfWhatIBuild = {
        title: 'What I Build',
        subtitle: 'User-facing systems that make complex work usable',
        avatar: '✦',
        body: `
            <h3>🧩 Product focus</h3>
            <p>I build local-first apps, industrial interfaces, AI systems, and reusable design systems that turn messy work into clear action.</p>
            <h3>⚙️ Typical formats</h3>
            <p>Dashboards, automation workflows, desktop tools, AI runtimes, and content systems that help people decide, act, and communicate faster.</p>
            <h3>🎨 Public brand systems</h3>
            <p><strong>YC Brand Systems</strong> combines YC Design and YC IP into a public personal branding layer for reusable frontend, illustration, and visual communication.</p>
            <h3>🎯 What matters</h3>
            <p>I am most useful where the challenge is turning complexity into clarity, structure, and reliable action.</p>
        `,
        tags: ['User-Facing Systems', 'Workflow Products', 'AI Tools', 'Brand Systems']
    };
    const selfAiTooling = {
        title: 'AI Tooling',
        subtitle: 'Capability matters more than tool names',
        avatar: '⚡',
        body: `
            <h3>⚙️ Workflow integration</h3>
            <p>LLMs such as Claude, GPT, and Gemini are integrated into my coding, reasoning, and system design workflows.</p>
            <h3>🔧 Daily use</h3>
            <p>I build workflows where AI supports research, development, review, and iteration instead of sitting outside the process as a one-off assistant.</p>
            <h3>🎯 Standard</h3>
            <p>I care less about which model is trending and more about whether the workflow produces better decisions and faster delivery.</p>
        `,
        tags: ['Claude', 'GPT', 'Gemini', 'Workflow Integration']
    };

    app.data.modalData = {
        'profile': {
            title: 'Yi-Chen Lin',
            subtitle: 'AI-Focused Software Engineer · Systems Builder',
            avatar: '👨‍💻',
            body: `
                <h3>🎯 Positioning</h3>
                <p><strong>AI-focused software engineer</strong> graduating May 2027 (BASc Electrical Engineering, UBC). I build end-to-end LLM applications — RAG pipelines, LangChain/LangGraph agent orchestration, and FastAPI services — alongside industrial field software and native macOS apps.</p>
                <h3>🧠 What I do best</h3>
                <p>I turn ambiguous problems into structured, working products by combining systems thinking, product judgment, and fast execution.</p>
                <h3>🤝 How I work</h3>
                <p>I use AI to increase execution speed, iteration depth, and scale — while keeping ownership of structure, decisions, and usability.</p>
                <h3>📍 Location</h3>
                <p>Based in Vancouver, Canada. Open to remote work and on-site opportunities in Vancouver, Taiwan, or China.</p>
            `,
            tags: ['RAG', 'LangGraph', 'FastAPI', 'Product Sense', 'Execution']
        },
        'consumption-logic': {
            title: 'YC — Personal System',
            subtitle: 'Systems for reducing noise and increasing leverage',
            avatar: 'YC',
            variant: 'logic',
            body: `
                <div class="logic-snapshot">
                    <span>Personal system</span>
                    <strong>I design systems to reduce noise and increase leverage.</strong>
                    <p>I started in electrical engineering, where I learned how systems behave. Now I build software, AI tools, and interfaces that improve how people think, decide, and execute.</p>
                </div>
                <h3>Currently building</h3>
                <ul>
                    <li>Reliable real-world reminder systems</li>
                    <li>Reusable AI runtime infrastructure</li>
                    <li>UI interaction and inspiration systems</li>
                </ul>
                <h3>Operating rule</h3>
                <p>I treat tools, content, and habits as system components. If they do not improve clarity, speed, or execution, they do not stay.</p>
                <h3>Principles</h3>
                <ul>
                    <li>Signal before desire</li>
                    <li>Invest in leverage</li>
                    <li>Test with small loops</li>
                    <li>Keep the system quiet</li>
                </ul>
                <div class="logic-rule-grid">
                    <div><span>Clarity</span><strong>Clarity &gt; motivation</strong></div>
                    <div><span>Structure</span><strong>Systems &gt; goals</strong></div>
                    <div><span>Output</span><strong>Build &gt; consume</strong></div>
                </div>
            `,
            tags: ['Personal System', 'Leverage', 'Clarity', 'Execution', 'Systems']
        },
        'ai-partner': selfPhilosophy,
        'timeline': {
            title: 'Growth Timeline',
            subtitle: 'From EE to AI-native builder: each step marked a capability upgrade',
            avatar: '🧭',
            body: `
                <h3>2022 — Engineering Foundations</h3>
                <p><strong>Identity:</strong> Started in Electrical Engineering.</p>
                <p><strong>What changed:</strong> Learned systems thinking, signal processing, and hardware constraints.</p>
                <p><strong>Outcome:</strong> Built a strong foundation in understanding how systems behave.</p>

                <h3>2023 — Transition to Software</h3>
                <p><strong>Trigger:</strong> Realized software enables faster iteration and broader impact.</p>
                <p><strong>What changed:</strong> Began learning React, TypeScript, and building simple tools.</p>
                <p><strong>Outcome:</strong> Shifted from understanding systems to building systems.</p>

                <h3>2024 — Building for Users</h3>
                <p><strong>Trigger:</strong> Started focusing on real-world usability and product thinking.</p>
                <p><strong>What changed:</strong> Built apps with UI, workflows, and actual user interaction.</p>
                <p><strong>Outcome:</strong> Learned that engineering alone does not define value; users do.</p>

                <h3>2025 — Systems & Infra Thinking</h3>
                <p><strong>Trigger:</strong> Explored backend systems, APIs, and data pipelines.</p>
                <p><strong>What changed:</strong> Built tools that connect services and automate workflows.</p>
                <p><strong>Outcome:</strong> Moved from thinking in features to thinking in systems that scale.</p>

                <h3>2025 → now — AI-Native Builder</h3>
                <p><strong>Trigger:</strong> Integrated AI into development workflows and product design.</p>
                <p><strong>What changed:</strong> Designed agent-based workflows and AI-assisted systems.</p>
                <p><strong>Outcome:</strong> Operating as <strong>1 person + AI = a scalable builder</strong>.</p>
            `,
            tags: ['Growth Logic', 'Systems Thinking', 'Product Shift', 'AI Native']
        },
        'narrative': {
            title: 'My Approach',
            subtitle: 'Turning ambiguity into usable systems',
            avatar: '🧠',
            body: `
                <h3>🧠 Core idea</h3>
                <p><strong>I turn ambiguity into systems people can actually use.</strong></p>
                <h3>🧩 Step 1 — Structure the problem</h3>
                <p>I start by clarifying the goal, constraints, and workflow so the problem becomes something buildable.</p>
                <h3>🛠 Step 2 — Ship the useful version</h3>
                <p>I move quickly from concept to usable product, prioritizing clarity, workflow quality, and real user value over surface polish.</p>
                <h3>🔁 Step 3 — Iterate from reality</h3>
                <p>Once something works, I refine it through feedback, edge cases, and stronger workflows.</p>
            `,
            tags: ['Structure', 'Execution', 'Iteration']
        },
        'skills': {
            title: 'Operating Strengths',
            subtitle: 'How I build and collaborate',
            avatar: '⚔️',
            body: `
                <h3>Core strengths</h3>
                <p class="modal-stack-line">Systems Thinker · User-First · Evidence-Driven · Clear Communicator</p>
                <h3>How I work with people</h3>
                <p class="modal-stack-line">Clear Communicator · Follow-Through · Low-Ego Collaboration · Human-Centered</p>
                <h3>How I move work forward</h3>
                <p class="modal-stack-line">Fast Iteration · Calm Operator · Product-Minded · Structure from Chaos</p>
                <h3>Why it matters</h3>
                <p>These are the softer signals behind how I ship: clear communication, dependable follow-through, and a strong instinct to turn messy problems into workable systems.</p>
            `,
            tags: ['Evidence-Driven', 'User-First', 'Follow-Through', 'Systems Thinker']
        },
        'explore-tech': {
            title: 'Featured Tech',
            subtitle: 'Technical labels for the systems and products I build',
            avatar: '🧩',
            body: `
                <h3>Frontend & apps</h3>
                <p class="modal-stack-line">React · TypeScript · Flutter · SwiftUI · Tauri</p>
                <h3>Backend & product systems</h3>
                <p class="modal-stack-line">Supabase · API Design · Python · Data Flow · Workflow Automation</p>
                <h3>AI & runtime work</h3>
                <p class="modal-stack-line">LLM Systems · Structured Outputs · Agent Workflows · Multi-Provider AI</p>
                <h3>Why this stack</h3>
                <p>I like tools that help me move from product idea to working system quickly, while still being strong enough for real-world reliability and iteration.</p>
            `,
            tags: ['React', 'TypeScript', 'Flutter', 'Supabase', 'LLM Systems', 'API Design']
        },
        'project-dao': {
            title: 'Future DAO',
            subtitle: 'Governance workflow system from proposal to execution',
            avatar: '🏛',
            body: `
                <h3>Problem</h3>
                <p>On-chain governance is powerful, but proposal, voting, and execution logic can feel abstract and difficult to use clearly.</p>
                <h3>Approach</h3>
                <p>I treated governance as a product workflow, not just a contract problem, and designed the full path from proposal creation to execution.</p>
                <h3>System</h3>
                <ul>
                    <li>Built Solidity contracts for membership, permissions, proposals, voting, execution, and state transitions</li>
                    <li>Handled time constraints and execution rules to keep governance behavior predictable</li>
                    <li>Built a React + TypeScript + Ethers.js interface for wallet connection and contract interaction</li>
                </ul>
                <h3>Outcome</h3>
                <p>Turned abstract governance logic into a usable system and strengthened my ability to connect protocol rules with product interaction.</p>
                <h3>Stack</h3>
                <p class="modal-stack-line">Solidity · React · TypeScript · Ethers.js · Smart Contracts</p>
                <h3>Link</h3>
                <div class="modal-link-list"><p><strong>GitHub:</strong> <a href="https://github.com/ycl-2004/Future" target="_blank" rel="noopener noreferrer">github.com/ycl-2004/Future</a></p></div>
            `,
            tags: ['Governance UX', 'Solidity', 'React', 'Smart Contracts']
        },
        'project-orbit': {
            title: 'Orbit',
            subtitle: 'Native macOS radial app switcher',
            avatar: '🪐',
            // Renders as an interactive system map; the body below is the fallback
            // if the breakdown data ever goes missing.
            variant: 'system',
            body: `
                <h3>Problem</h3>
                <p>App switching is fast only when the next window is easy to reach. Lists and repeated keyboard cycling make the interaction feel slower than it needs to be.</p>
                <h3>Approach</h3>
                <p>I built a gesture-first macOS switcher that puts running apps around the cursor and lets the user flick toward the next destination.</p>
                <h3>System</h3>
                <ul>
                    <li>Built a native SwiftUI and AppKit menu-bar app with no third-party runtime dependencies</li>
                    <li>Added radial navigation, keyboard fallback, recent-app ordering, and exact window targeting</li>
                    <li>Kept previews, quit, AirDrop, and Trash actions local to the Mac with no network calls</li>
                </ul>
                <h3>Outcome</h3>
                <p>Shipped a Universal macOS release that turns a common desktop action into a small, direct physical gesture.</p>
                <h3>Stack</h3>
                <p class="modal-stack-line">Swift · SwiftUI · AppKit · macOS · Local-First UX</p>
                <h3>Link</h3>
                <div class="modal-link-list"><p><strong>GitHub:</strong> <a href="https://github.com/ycl-2004/Orbit" target="_blank" rel="noopener noreferrer">github.com/ycl-2004/Orbit</a></p></div>
            `,
            tags: ['Native App', 'Swift', 'macOS', 'Gesture UX']
        },
        'project-wisp': {
            title: 'Wisp',
            subtitle: 'Screen-aware macOS assistant with a provider you own',
            avatar: '💬',
            // Renders as an interactive system map; the body below is the fallback
            // if the breakdown data ever goes missing.
            variant: 'system',
            body: `
                <h3>Problem</h3>
                <p>Asking a model about what is on your screen usually means copying context between apps, and trusting whoever wrote the assistant with both the page and the key.</p>
                <h3>Approach</h3>
                <p>I built a menu-bar shell that records the frontmost app before its own panel appears, assembles a bounded context packet, and sends it to an endpoint the user configures.</p>
                <h3>System</h3>
                <ul>
                    <li>Captures the current window and, for supported browsers, reads URL, title, selection, and page body through Apple Events and injected JavaScript</li>
                    <li>Reports what it could not read — partial virtual-list collection and cross-origin iframes are separate fields from character truncation</li>
                    <li>Supports OpenAI-compatible HTTP, Ollama, and the Codex, Antigravity, and Claude Code logins already on the Mac, each in its own sandboxed temporary workspace</li>
                    <li>Keeps conversations as readable local JSON and API keys in the Keychain, refusing to overwrite a file written by a newer version</li>
                </ul>
                <h3>Outcome</h3>
                <p>Shipped a Universal 2 macOS release with CI that gates tool isolation, prompt truncation, and temporary-directory cleanup on every push.</p>
                <h3>Stack</h3>
                <p class="modal-stack-line">Swift · SwiftUI · AppKit · Apple Events · Keychain · Local-First UX</p>
                <h3>Link</h3>
                <div class="modal-link-list"><p><strong>GitHub:</strong> <a href="https://github.com/ycl-2004/Wisp" target="_blank" rel="noopener noreferrer">github.com/ycl-2004/Wisp</a></p></div>
            `,
            tags: ['Native App', 'AI Product', 'Swift', 'Local-First']
        },
        'project-foldpeek': {
            title: 'FoldPeek',
            subtitle: 'Read-only folder browser inside Finder Quick Look',
            avatar: '📁',
            // Renders as an interactive system map; the body below is the fallback
            // if the breakdown data ever goes missing.
            variant: 'system',
            body: `
                <h3>Problem</h3>
                <p>Pressing Space on a folder in Finder shows almost nothing, and every richer preview means parsing files that somebody else wrote.</p>
                <h3>Approach</h3>
                <p>I built a Quick Look extension that indexes a folder read-only and bounded, treating every byte it renders as untrusted input.</p>
                <h3>System</h3>
                <ul>
                    <li>Enumerates one directory level at a time under hard caps of 2,000 entries per directory, 20,000 per panel, and eight levels of depth</li>
                    <li>Filters only nodes already in memory, so a keystroke can never walk the tree and defeat those budgets</li>
                    <li>Renders text, code, Markdown, PDF, images, and spreadsheets through forward-only scanners that emit no links and no attachments</li>
                    <li>States the document type for Word and RTF instead of letting the bytes select a WebKit-backed reader, and hands unknown formats to Apple’s out-of-process thumbnail service</li>
                </ul>
                <h3>Outcome</h3>
                <p>Shipped a Universal 2 v1.0.0 with a written security audit covering trust boundaries, twenty enforced bounds, a rejected approach, and the residual risks that remain.</p>
                <h3>Stack</h3>
                <p class="modal-stack-line">Swift · SwiftUI · AppKit · Quick Look · App Sandbox · PDFKit</p>
                <h3>Link</h3>
                <div class="modal-link-list"><p><strong>GitHub:</strong> <a href="https://github.com/ycl-2004/FoldPeek" target="_blank" rel="noopener noreferrer">github.com/ycl-2004/FoldPeek</a></p></div>
            `,
            tags: ['Native App', 'Security', 'Swift', 'macOS']
        },
        'project-notype': {
            title: 'NoType',
            subtitle: 'Private, local dictation for macOS',
            avatar: '🎙️',
            body: `
                <h3>Problem</h3>
                <p>Voice input is useful only when it can follow the user across apps without sending private audio to a remote transcription service.</p>
                <h3>Approach</h3>
                <p>NoType keeps the normal typing flow intact: focus a field, speak naturally, and receive the transcript back in the place where work already is.</p>
                <h3>System</h3>
                <ul>
                    <li>Runs multilingual WhisperKit and Core ML transcription locally on Apple Silicon</li>
                    <li>Supports Chinese-English mixed speech, global shortcuts, and configurable language bias</li>
                    <li>Uses Accessibility insertion with a clipboard fallback when a target field cannot accept direct input</li>
                </ul>
                <h3>Outcome</h3>
                <p>Built a privacy-first voice layer for everyday writing and coding without an account, remote API, or cloud transcription dependency.</p>
                <h3>Stack</h3>
                <p class="modal-stack-line">Swift · WhisperKit · Core ML · macOS · Accessibility APIs</p>
                <h3>Link</h3>
                <div class="modal-link-list"><p><strong>GitHub:</strong> <a href="https://github.com/ycl-2004/NoType" target="_blank" rel="noopener noreferrer">github.com/ycl-2004/NoType</a></p></div>
            `,
            tags: ['AI Product', 'On-Device', 'Swift', 'Privacy']
        },
        'project-browser-organizer': {
            title: 'Browser Organizer',
            subtitle: 'Local-first Chrome new tab workspace',
            avatar: '🗂️',
            body: `
                <h3>Problem</h3>
                <p>Bookmarks, open tabs, daily tasks, and saved sessions usually live in separate surfaces, so the browser becomes another source of noise.</p>
                <h3>Approach</h3>
                <p>I replaced the blank new tab with a local workspace that keeps the next task, long-term links, and current browser state visible together.</p>
                <h3>System</h3>
                <ul>
                    <li>Built a no-build Manifest V3 extension that stores workspace data in the Chrome profile</li>
                    <li>Added favorites, daily planning, live-tab grouping, duplicate detection, and saved sessions</li>
                    <li>Kept the product account-free and server-free while still supporting release ZIP installation</li>
                </ul>
                <h3>Outcome</h3>
                <p>Turned a familiar browser entry point into a calmer, local-first dashboard for deciding what to do next.</p>
                <h3>Stack</h3>
                <p class="modal-stack-line">JavaScript · Chrome Extensions · Manifest V3 · Local Storage · Responsive UI</p>
                <h3>Link</h3>
                <div class="modal-link-list"><p><strong>GitHub:</strong> <a href="https://github.com/ycl-2004/Browser_Organizer" target="_blank" rel="noopener noreferrer">github.com/ycl-2004/Browser_Organizer</a></p></div>
            `,
            tags: ['Browser Extension', 'Local-First', 'JavaScript', 'Product UX']
        },
        'project-todo': {
            title: 'YC Todo',
            subtitle: 'Minimal task manager with local-first design',
            avatar: '✅',
            body: `
                <h3>Problem</h3>
                <p>Many simple task tools become bloated and slow for the actual use case of quick capture and lightweight completion.</p>
                <h3>Approach</h3>
                <p>I designed a menu-bar-first workflow focused on fast capture, quiet focus, and local persistence without unnecessary friction.</p>
                <h3>System</h3>
                <ul>
                    <li>Built with Tauri and React for a lightweight desktop architecture</li>
                    <li>Handled macOS-specific interaction details such as popover behavior, focus, and input flow</li>
                    <li>Implemented tasks, notes, focus modes, import/export, and immediate local UI updates</li>
                </ul>
                <h3>Outcome</h3>
                <p>Shipped a small Universal 2 desktop product where task capture, focus timing, and recovery behavior share one calm surface.</p>
                <h3>Stack</h3>
                <p class="modal-stack-line">Tauri · Rust · React · TypeScript · macOS Native API</p>
                <h3>Link</h3>
                <div class="modal-link-list">
                    <p><strong>GitHub:</strong> <a href="https://github.com/ycl-2004/YC_Todo" target="_blank" rel="noopener noreferrer">github.com/ycl-2004/YC_Todo</a></p>
                </div>
            `,
            tags: ['Desktop UX', 'Local-First', 'Tauri', 'React']
        },
        'project-screen-bridge': {
            title: 'Screen Bridge',
            subtitle: 'Authenticated Mac-to-iPad extended display',
            avatar: '📱',
            body: `
                <h3>Problem</h3>
                <p>iPad-as-second-screen workflows need to feel local, responsive, and private while still handling sensitive Mac permissions like Screen Recording and Accessibility carefully.</p>
                <h3>Approach</h3>
                <p>I built the product path as a macOS sender plus an iPadOS receiver, with explicit pairing and transport choices instead of a trust-any-local-device model.</p>
                <h3>System</h3>
                <ul>
                    <li>Created Mac virtual display streaming to iPad over authenticated TCP</li>
                    <li>Added Network.framework modes for Auto, Apple P2P/AWDL, Router/WiFi, and USB or Thunderbolt-style wired paths</li>
                    <li>Implemented pairing-code authentication with Keychain storage, nonce-based HMAC proof, and session-key protected input events</li>
                    <li>Supported touch, pointer, scroll, keyboard input, device cleanup, disconnected states, and optional Chrome audio routing</li>
                </ul>
                <h3>Outcome</h3>
                <p>Shipped a public <strong>v1.1.1</strong> Universal Mac build (Apple silicon and Intel) that combines macOS permissions, iPad receiver UX, local networking, authentication, and real-time media behavior.</p>
                <h3>Distribution note</h3>
                <p>The Mac build is ad-hoc signed and not notarized, so it is published as a self-use preview rather than a general installer. The iPad receiver must be built with your own Xcode signing; no public IPA is shipped.</p>
                <h3>Stack</h3>
                <p class="modal-stack-line">Swift · macOS · iPadOS · Network.framework · Keychain · HMAC-SHA256</p>
                <h3>Link</h3>
                <div class="modal-link-list">
                    <p><strong>GitHub:</strong> <a href="https://github.com/ycl-2004/Screen-Bridge" target="_blank" rel="noopener noreferrer">github.com/ycl-2004/Screen-Bridge</a></p>
                    <p><strong>Releases:</strong> <a href="https://github.com/ycl-2004/Screen-Bridge/releases" target="_blank" rel="noopener noreferrer">Download the v1.1.1 Universal Mac build</a></p>
                </div>
            `,
            tags: ['Native App', 'Local Streaming', 'Security', 'Swift']
        },
        'project-resume-tailor': {
            title: 'Resume Tailor',
            subtitle: 'Private JD-tailored resume intelligence engine',
            avatar: '📄',
            body: `
                <h3>Problem</h3>
                <p>Tailoring a resume for each job is slow, repetitive, and easy to make inconsistent, especially when the resume needs to stay factual and fit on one page.</p>
                <h3>Approach</h3>
                <p>I designed a local Mac-first workflow that reads a job description and structured candidate evidence, then selects, ranks, rewrites, and lays out a targeted LaTeX resume with an explanation file.</p>
                <h3>System</h3>
                <ul>
                    <li>Built a one-command <code>start.sh</code> onboarding flow for friends using safe source bundles and sample job descriptions</li>
                    <li>Implemented JD signal extraction, career evidence selection, bullet density control, layout fit logic, and one-page LaTeX generation</li>
                    <li>Added guarded AI rewrite boundaries, saved AI provider profiles, deterministic fallback, and final feedback loops that recompile before accepting changes</li>
                    <li>Documented source-bundle schemas, setup, friend-test paths, AI usage, PDF fit behavior, and rewrite rules</li>
                </ul>
                <h3>Outcome</h3>
                <p>Turned a personal resume workflow into a reusable, privacy-aware local tool that can explain why it selected specific evidence and layout choices.</p>
                <h3>Stack</h3>
                <p class="modal-stack-line">Python · LaTeX · JSON Schema · AI Runtime · Unit Tests · CLI UX</p>
                <h3>Availability</h3>
                <p>The source repository is private. This case study describes only the public-safe product architecture and workflow.</p>
            `,
            tags: ['AI Tooling', 'Resume Engine', 'Python', 'LaTeX']
        },
        'project-edu-analysis': {
            title: 'Education Excel Analysis',
            subtitle: 'Teacher-facing spreadsheet-to-insight workflow tool',
            avatar: '📈',
            body: `
                <h3>Problem</h3>
                <p>Raw grade spreadsheets are time-consuming to interpret, especially when teachers need faster comparison, pattern finding, and reporting.</p>
                <h3>Approach</h3>
                <p>I designed an upload-to-report workflow that reduces manual analysis and makes educational data easier to act on.</p>
                <h3>System</h3>
                <ul>
                    <li>Supports Excel upload, field detection, and manual mapping</li>
                    <li>Generates statistics, comparisons, visualizations, and filtered reports</li>
                    <li>Includes privacy-aware views such as anonymization and ranking perspectives</li>
                </ul>
                <h3>Outcome</h3>
                <p>Improved my ability to build workflow tools around real user jobs-to-be-done rather than isolated analysis features.</p>
                <h3>Stack</h3>
                <p class="modal-stack-line">Python · Streamlit · Pandas · Excel Processing · Markdown Reports</p>
                <h3>Link</h3>
                <div class="modal-link-list">
                    <p><strong>GitHub:</strong> <a href="https://github.com/ycl-2004/Education_Excel_Analysis" target="_blank" rel="noopener">github.com/ycl-2004/Education_Excel_Analysis</a></p>
                </div>
            `,
            tags: ['Workflow Tool', 'Data Analysis', 'Streamlit', 'Python']
        },
        'project-balance-bot': {
            title: 'Bluetooth Self-Balancing Robot',
            subtitle: 'Private coursework control system for real-time balance tuning',
            avatar: '🤖',
            body: `
                <h3>Problem</h3>
                <p>Balancing behavior becomes unstable quickly without a tight control loop and fast tuning feedback.</p>
                <h3>Approach</h3>
                <p>I treated the project as a hardware-software feedback problem and iterated around stability, responsiveness, and live adjustment.</p>
                <h3>System</h3>
                <ul>
                    <li>Implemented PID control for real-time balance correction</li>
                    <li>Built an Arduino-based sensor feedback loop</li>
                    <li>Used Bluetooth for remote parameter tuning and testing</li>
                </ul>
                <h3>Outcome</h3>
                <p>Strengthened my understanding of closed-loop systems, real-time iteration, and how software decisions affect physical behavior.</p>
                <h3>Stack</h3>
                <p class="modal-stack-line">Arduino · PID Control · Bluetooth · Sensors</p>
                <h3>Availability</h3>
                <p>The coursework source archive is private; this case study summarizes the project without exposing a public repository link.</p>
            `,
            tags: ['Control Systems', 'PID', 'Bluetooth', 'Arduino']
        },
        'project-unity': {
            title: 'Unity Game Development',
            subtitle: 'Playable interaction prototypes for feedback and UI behavior',
            avatar: '🎮',
            body: `
                <h3>Problem</h3>
                <p>Interactive systems are hard to evaluate abstractly; they become meaningful only when users can actually feel timing, controls, and feedback loops.</p>
                <h3>Approach</h3>
                <p>I built playable 2D and 3D prototypes to learn through real interaction rather than static implementation.</p>
                <h3>System</h3>
                <ul>
                    <li>Implemented player controls, physics interactions, animation, and UI behavior in Unity</li>
                    <li>Published playable builds to test interaction feel and presentation</li>
                </ul>
                <h3>Outcome</h3>
                <p>Improved my intuition for interaction design, moment-to-moment feedback, and translating mechanics into usable UI behavior.</p>
                <h3>Stack</h3>
                <p class="modal-stack-line">Unity · C# · Physics · Animation · UI</p>
                <h3>Links</h3>
                <div class="modal-link-list">
                    <p><strong>Game Repository:</strong> <a href="https://github.com/ycl-2004/Unity-Game-Design" target="_blank" rel="noopener">Unity Game Design</a></p>
                    <p><strong>Portfolio:</strong> <a href="https://ycl-2004.itch.io" target="_blank" rel="noopener">ycl-2004.itch.io</a></p>
                    <p><strong>Collect Coins:</strong> <a href="https://ycl-2004.github.io/Unity-Game-Design/Collect-Coins/" target="_blank" rel="noopener">Play Web Build</a></p>
                    <p><strong>OverCook:</strong> <a href="https://ycl-2004.github.io/Unity-Game-Design/OverCook/" target="_blank" rel="noopener">Play Web Build</a></p>
                    <p><strong>Rocket Boost:</strong> <a href="https://ycl-2004.github.io/Unity-Game-Design/UnityGame_RocketBoost/Rocket_Web/" target="_blank" rel="noopener">Play Web Build</a></p>
                </div>
            `,
            tags: ['Interaction Design', 'Unity', 'C#', 'Gameplay']
        },
        'project-metal-detector': {
            title: 'Metal Detector Robot',
            subtitle: 'Private coursework sensing system optimized for reliable detection',
            avatar: '🧲',
            body: `
                <h3>Problem</h3>
                <p>Detection systems become unreliable when sensing, circuitry, and tuning are not stable enough in real conditions.</p>
                <h3>Approach</h3>
                <p>I improved the system through iterative circuit optimization, low-level programming, and repeated calibration.</p>
                <h3>System</h3>
                <ul>
                    <li>Designed and tuned the circuit for better detection behavior</li>
                    <li>Programmed the microcontroller in C and assembly</li>
                    <li>Used instrumentation and calibration to locate unstable or noisy behavior</li>
                </ul>
                <h3>Outcome</h3>
                <p>Built stronger embedded-systems instincts around debugging, measurement, and performance under hardware constraints.</p>
                <h3>Stack</h3>
                <p class="modal-stack-line">C · Assembly · Microcontroller · Circuit Design</p>
                <h3>Availability</h3>
                <p>The coursework source archive is private; this case study summarizes the project without exposing a public repository link.</p>
            `,
            tags: ['Embedded Systems', 'Calibration', 'MCU', 'Circuits']
        },
        'project-sailbot': {
            title: 'UBC Sailbot',
            subtitle: 'Private coursework team project for autonomous sailbot power integration',
            avatar: '⛵',
            body: `
                <h3>Problem</h3>
                <p>Multidisciplinary hardware projects depend on reliable power distribution, integration discipline, and strong debugging during team handoffs.</p>
                <h3>Approach</h3>
                <p>I contributed on the power side of the system, supporting implementation, testing, and integration troubleshooting.</p>
                <h3>System</h3>
                <ul>
                    <li>Supported power distribution design and circuit implementation</li>
                    <li>Helped with circuit assembly, safety checks, and testing</li>
                    <li>Worked through integration-stage failures with teammates</li>
                </ul>
                <h3>Outcome</h3>
                <p>Gained experience in multidisciplinary engineering collaboration and in keeping complex systems reliable under integration pressure.</p>
                <h3>Stack</h3>
                <p class="modal-stack-line">Power Systems · Circuit Integration · Testing · Diagnostics</p>
                <h3>Availability</h3>
                <p>The coursework source archive is private; this case study summarizes the project without exposing a public repository link.</p>
            `,
            tags: ['Integration', 'Power Systems', 'Testing', 'Team Engineering']
        },
        'project-goodcase': {
            title: 'GoodCase.ai',
            subtitle: 'Creator-first AI case platform',
            avatar: '🔎',
            body: `
                <h3>Problem</h3>
                <p>A striking AI result scrolls past and is gone. Three days later you want to reproduce it and the prompt is missing, the model is unknown, and there is no way to find what else that creator has made.</p>
                <h3>Approach</h3>
                <p>Put the work, the creator, the method, the original source, and the retest evidence back onto a single Case. Full prompts stay public and no account is required to read them.</p>
                <h3>What I built</h3>
                <ul>
                    <li>Discovery search and skill grouping so cases are findable by technique, not just by author</li>
                    <li>Creator tracking, to follow people who ship consistently rather than one-off viral posts</li>
                    <li>A cross-model stability lab for re-running a case against different models</li>
                    <li>Discovery governance and a publishing retest loop, delivered across four merged pull requests</li>
                </ul>
                <h3>Stack</h3>
                <p class="modal-stack-line">JavaScript · Product UX · Search · AI Evaluation</p>
                <h3>Scope note</h3>
                <p>GoodCase.ai is a product I work on rather than a solo project. This record describes my contribution and links the public repository and the live product.</p>
                <h3>Links</h3>
                <div class="modal-link-list">
                    <p><strong>Live product:</strong> <a href="https://goodcase.ai" target="_blank" rel="noopener noreferrer">goodcase.ai</a></p>
                    <p><strong>GitHub:</strong> <a href="https://github.com/ycl-2004/goodcaseai" target="_blank" rel="noopener noreferrer">github.com/ycl-2004/goodcaseai</a></p>
                </div>
            `,
            tags: ['AI Platform', 'Search', 'Product UX', 'Evaluation']
        },
        'project-yc-site': {
            title: 'YC Personal Website',
            subtitle: 'Public personal brand homepage',
            avatar: '🌱',
            body: `
                <h3>Why it exists</h3>
                <p>This portfolio proves what I build. The YC site is the other half: who I am, what I care about, and the world around the YC identity — warm and hand-made, deliberately not reading as AI-generated.</p>
                <h3>What is on it</h3>
                <ul>
                    <li><strong>Hero</strong> — introduction with rotating identity words</li>
                    <li><strong>About</strong> — the YC world and its character variants</li>
                    <li><strong>Now</strong> — what I am building, learning, and thinking about</li>
                    <li><strong>Work</strong> — five creative directions: AI, design, music, reading, and daily life</li>
                    <li><strong>Values</strong> — what I actually optimize for</li>
                </ul>
                <h3>Build</h3>
                <p>React, TypeScript, Vite, and Tailwind, split into per-section components so routing, a CMS, or new sections can be added later. Deployed on GitHub Pages.</p>
                <h3>Stack</h3>
                <p class="modal-stack-line">React · TypeScript · Vite · Tailwind · GitHub Pages</p>
                <h3>Links</h3>
                <div class="modal-link-list">
                    <p><strong>Live site:</strong> <a href="https://ycl-2004.github.io/YC/" target="_blank" rel="noopener noreferrer">ycl-2004.github.io/YC/</a></p>
                    <p><strong>GitHub:</strong> <a href="https://github.com/ycl-2004/YC" target="_blank" rel="noopener noreferrer">github.com/ycl-2004/YC</a></p>
                </div>
            `,
            tags: ['React', 'TypeScript', 'Personal Brand', 'Frontend']
        },
        'project-yc-brand-systems': {
            title: 'YC Brand Systems',
            subtitle: 'Public personal branding system — YC Design + YC IP',
            avatar: '✦',
            body: `
                <h3>Why it exists</h3>
                <p>Content, frontend surfaces, slides, and illustrations should feel like parts of one system instead of unrelated one-off outputs.</p>
                <h3>System</h3>
                <ul>
                    <li><strong>YC Design</strong> routes content intent into reusable HTML, landing pages, apps, cards, covers, slides, and visual QA.</li>
                    <li><strong>YC IP</strong> packages a reference-driven YC illustration workflow with character assets, scene modes, examples, and style checks.</li>
                    <li>Both repositories keep their templates, references, and delivery rules visible so the work can be reviewed and reused.</li>
                </ul>
                <h3>Why it belongs here</h3>
                <p>This is a public brand and content system, not a core product app. It shows how I turn identity and communication requirements into repeatable frontend and visual workflows.</p>
                <h3>Links</h3>
                <div class="modal-link-list">
                    <p><strong>YC Design:</strong> <a href="https://github.com/ycl-2004/YC_Design" target="_blank" rel="noopener noreferrer">github.com/ycl-2004/YC_Design</a></p>
                    <p><strong>YC IP:</strong> <a href="https://github.com/ycl-2004/YC_IP" target="_blank" rel="noopener noreferrer">github.com/ycl-2004/YC_IP</a></p>
                </div>
            `,
            tags: ['Design Systems', 'Frontend', 'Illustration Systems', 'QA']
        },
        'project-sharememory': {
            title: 'ShareMemory',
            subtitle: 'Durable project context shared across coding agents',
            avatar: '🧠',
            body: `
                <h3>Problem</h3>
                <p>Agent context is easy to lose between tools and sessions, which creates repeated discovery work and inconsistent project decisions.</p>
                <h3>System</h3>
                <ul>
                    <li>Uses one project-scoped <code>AI_MEMORY</code> directory as a transparent source of context</li>
                    <li>Supports Codex and Claude Code through a single reusable skill contract</li>
                    <li>Adds linting, safe writes, write locking, optional Git history, and CI checks</li>
                </ul>
                <h3>Outcome</h3>
                <p>Turned cross-agent memory into a reviewable file workflow instead of an opaque service dependency.</p>
                <h3>Link</h3>
                <div class="modal-link-list"><p><strong>GitHub:</strong> <a href="https://github.com/ycl-2004/ShareMemory" target="_blank" rel="noopener noreferrer">github.com/ycl-2004/ShareMemory</a></p></div>
            `,
            tags: ['Agent Tooling', 'Local-First', 'CI', 'Shared Context']
        },
        'project-always': {
            title: 'Always',
            subtitle: 'Private-by-default reusable prompts and snippets',
            avatar: '⌘',
            body: `
                <h3>Problem</h3>
                <p>High-value prompts and snippets become hard to reuse when they are scattered across applications, chat histories, and clipboard managers.</p>
                <h3>System</h3>
                <ul>
                    <li>Shares one local JSON store across Raycast, Codex, Claude, and CLI workflows</li>
                    <li>Provides a native macOS picker with search, selection, and safe paste behavior</li>
                    <li>Keeps data local, requires no cloud account or API key, and creates automatic backups</li>
                </ul>
                <h3>Link</h3>
                <div class="modal-link-list"><p><strong>GitHub:</strong> <a href="https://github.com/ycl-2004/Always" target="_blank" rel="noopener noreferrer">github.com/ycl-2004/Always</a></p></div>
            `,
            tags: ['macOS', 'Prompt Systems', 'Local-First', 'Raycast']
        },
        'project-open-source': {
            title: 'Open-Source Maintenance',
            subtitle: 'Contributions to larger upstream projects',
            avatar: '↗',
            body: `
                <h3>Contribution scope</h3>
                <p>I participate in larger upstream AI and developer-tool projects, contributing product UX and workflow improvements while keeping original ownership explicit.</p>
                <h3>Verified contribution record</h3>
                <p><strong>3 upstream pull requests merged</strong> into LearnPrompt repositories — AI News Radar, Afu LLM Todo, and Partner Skill. AI News Radar itself carries roughly 1.7K stars. A fourth AI News Radar pull request was opened and closed without merging; it is not counted here.</p>
                <h3>What I changed</h3>
                <ul>
                    <li>Improved source quality, dual-view product UX, and maintenance workflows in AI News Radar</li>
                    <li>Extended LLM task and workflow behavior in Afu LLM Todo</li>
                    <li>Strengthened the cross-agent Partner workflow and its execution layer</li>
                </ul>
                <h3>Ownership note</h3>
                <p>These repositories are forks of LearnPrompt projects. I present the upstream contribution record here, not the full repositories as original work.</p>
                <h3>Evidence</h3>
                <div class="modal-link-list">
                    <p><strong>AI News Radar:</strong> <a href="https://github.com/LearnPrompt/ai-news-radar/pull/15" target="_blank" rel="noopener noreferrer">Merged PR #15</a></p>
                    <p><strong>Afu LLM Todo:</strong> <a href="https://github.com/LearnPrompt/afu-llm-todo/pull/1" target="_blank" rel="noopener noreferrer">Merged PR #1</a></p>
                    <p><strong>Partner Skill:</strong> <a href="https://github.com/LearnPrompt/partner-skill/pull/1" target="_blank" rel="noopener noreferrer">Merged PR #1</a></p>
                </div>
            `,
            tags: ['Open Source', 'Upstream PRs', 'Product UX', 'Maintenance']
        },
        'work-delta': {
            title: 'Delta Controls',
            subtitle: 'Software Developer · UBC ECE Industry Capstone · Jan 2026 - Aug 2026',
            avatar: '🏢',
            body: `
                <h3>Product context</h3>
                <p>Delta Air Balance is a field-facing HVAC application designed to help technicians measure, adjust, and diagnose air-balancing work without repeatedly moving between equipment, controllers, and occupied spaces. I worked on it for eight months as a UBC ECE industry capstone.</p>
                <h3>My contribution</h3>
                <ul>
                    <li>Shipped a <strong>Kotlin / Jetpack Compose</strong> Android field app that cut on-site HVAC balancing time by <strong>35%</strong>.</li>
                    <li>Fit a physics-derived indoor-temperature model via <strong>L2-regularized regression</strong> on cleaned telemetry, reaching <strong>0.3 °C MAE</strong>.</li>
                    <li>Built the <strong>BLE pipeline</strong> streaming temperature, humidity, and pressure from field probes into live charts.</li>
                    <li>Designed the system prompts and <strong>tool-call routing</strong> for the app's OpenAI API voice assistant, with a rule-based fallback.</li>
                </ul>
                <h3>Workflow direction</h3>
                <p>The product direction is to combine BLE sensors, controller information, automated diagnostic tests, live charts, and thermal-model insights so technicians can monitor stabilization and review results from one place.</p>
                <h3>Scope note</h3>
                <p>This describes my contribution inside a team product. I am not claiming sole ownership of the full Delta Air Balance platform or every diagnostic model. The repository is private, so this case study presents only public-safe product and workflow detail.</p>
                <h3>Stack</h3>
                <p class="modal-stack-line">Kotlin · Jetpack Compose · BLE · L2-Regularized Regression · OpenAI API</p>
            `,
            tags: ['Kotlin', 'Jetpack Compose', 'BLE', 'Regression', 'OpenAI API']
        },
        'work-ai-warts': {
            title: 'Aiwoici (Zhuhai) Technology Co., Ltd.',
            subtitle: 'AI Technical Content Engineer · Remote · Jun 2026 - Present',
            avatar: '📡',
            body: `
                <h3>Company context</h3>
                <p>Aiwoici (Zhuhai) Technology Co., Ltd. is an AI media and education startup. The role sits between open-source engineering and written technical evaluation: I ship code into a public project and turn what I learn from it into evaluations other engineers can use.</p>
                <h3>What I do</h3>
                <ul>
                    <li>Contribute the Chinese social-media crawlers (Xiaohongshu, Douyin) to <strong>AI News Radar</strong>, a <strong>1.7K-star</strong> open-source project.</li>
                    <li>Rank crawled items by keyword extraction, recency decay, and engagement signals to surface trending AI news.</li>
                    <li>Benchmark AI models, products, and developer tools released by <strong>20+ partner companies</strong>.</li>
                    <li>Deliver written technical evaluations and hands-on walkthroughs of AI tooling and agent workflows.</li>
                </ul>
                <h3>Verified public evidence</h3>
                <p>My upstream contribution record is visible on GitHub: <strong>3 merged pull requests</strong> into LearnPrompt repositories, including AI News Radar itself.</p>
                <h3>Stack</h3>
                <p class="modal-stack-line">Python · Web Crawlers · Ranking Signals · Benchmarking · Technical Writing</p>
                <h3>Evidence</h3>
                <div class="modal-link-list">
                    <p><strong>Upstream project:</strong> <a href="https://github.com/LearnPrompt/ai-news-radar" target="_blank" rel="noopener noreferrer">github.com/LearnPrompt/ai-news-radar</a></p>
                    <p><strong>My merged contribution:</strong> <a href="https://github.com/LearnPrompt/ai-news-radar/pull/15" target="_blank" rel="noopener noreferrer">AI News Radar PR #15</a></p>
                </div>
            `,
            tags: ['Open Source', 'Crawlers', 'Ranking', 'Benchmarking', 'Technical Writing']
        },
        'project-rag-system': {
            title: 'Production RAG System',
            subtitle: 'Private hybrid-retrieval pipeline tuned for production latency',
            avatar: '🔍',
            body: `
                <h3>Problem</h3>
                <p>A retrieval system is only useful if it is fast enough to sit inside a real request path. Getting good recall is one problem; getting good recall at a latency a product can actually spend is a different one.</p>
                <h3>Approach</h3>
                <p>I built ingestion, retrieval, and caching as separately measurable stages, then optimized each against recorded numbers rather than impressions.</p>
                <h3>Measured results</h3>
                <ul>
                    <li>Built scalable RAG ingestion: indexed <strong>20K vectors in 15.5 s</strong>, cutting vector-search P95 from <strong>27.5 ms to 1.76 ms</strong>.</li>
                    <li>Implemented hybrid <strong>bge-base / BM25</strong> retrieval with RRF: lifted recall <strong>6.0%</strong> and NDCG <strong>9.5%</strong> at <strong>323.6 ms</strong> end-to-end P95.</li>
                    <li>Added TTL query-rewrite caching, dropping repeated rewrites from <strong>3.3 s and 465 tokens</strong> to zero.</li>
                </ul>
                <h3>Stack</h3>
                <p class="modal-stack-line">Python · FastAPI · bge-base · BM25 · pgvector · RRF</p>
                <h3>Availability</h3>
                <p>The source repository is private. This case study presents only public-safe architecture and measurement detail.</p>
            `,
            tags: ['RAG', 'FastAPI', 'pgvector', 'Latency', 'Retrieval Quality']
        },
        'project-media-ops': {
            title: 'Media Content Operations Platform',
            subtitle: 'Private client project · multi-branch agent orchestration',
            avatar: '🕸',
            body: `
                <h3>Problem</h3>
                <p>Content operations break down when a long agent workflow loses state halfway through, or when two runs touch the same record and quietly overwrite each other.</p>
                <h3>Approach</h3>
                <p>I treated the workflow as a durable state machine rather than a chain of calls, so a run can be interrupted, resumed, and safely serialized against other runs.</p>
                <h3>System</h3>
                <ul>
                    <li>Designed multi-branch <strong>LangGraph</strong> workflows with MySQL checkpointing, resuming across <strong>3 paths</strong> without state loss.</li>
                    <li>Engineered a <strong>5-stage FastAPI</strong> orchestration service with row-level locking to prevent conflicting agent runs.</li>
                    <li>Integrated <strong>3 Coze agents</strong> and publishing APIs, routing topic, copy, and delivery tasks to specialized agent calls.</li>
                </ul>
                <h3>Stack</h3>
                <p class="modal-stack-line">LangGraph · FastAPI · MySQL · Coze · Checkpointing · Row-Level Locking</p>
                <h3>Availability</h3>
                <p>This was delivered as a client project. The source repository is private and this case study presents only public-safe architecture detail.</p>
            `,
            tags: ['LangGraph', 'FastAPI', 'MySQL', 'Orchestration', 'Client Project']
        },
        'project-ai-agents': {
            title: 'AI Agent Systems',
            subtitle: 'Public LangGraph / LangChain agent project library',
            avatar: '🧩',
            body: `
                <h3>Why it exists</h3>
                <p>Most public agent examples are single-shot prompt demos. This repository is where I keep agent architectures built to industrial software standards instead: state-machine orchestration, human gates, and real external APIs.</p>
                <h3>What is in it</h3>
                <ul>
                    <li><strong>Deep Research &amp; Report System</strong> — LangGraph over arXiv, Wikipedia, and web search, with a fact-check reflection loop, human-in-the-loop outline review via <code>interrupt()</code> / <code>Command(resume=...)</code>, and long-form report generation.</li>
                    <li><strong>Omni-channel Ticket &amp; Service Agent</strong> — LangChain LCEL preprocessing, Pydantic v2 structured validation with self-healing retries, tool-calling closure for refund and logistics lookups, and invoke/batch/stream execution modes.</li>
                </ul>
                <h3>Engineering rules</h3>
                <p>Machine-readable boolean state drives routing while natural-language fields carry human intent, so the two never contaminate each other. Every project runs against real external APIs — no mocked data sources.</p>
                <h3>Stack</h3>
                <p class="modal-stack-line">Python · LangGraph · LangChain · MCP · FastAPI · Pydantic v2</p>
                <h3>Link</h3>
                <div class="modal-link-list"><p><strong>GitHub:</strong> <a href="https://github.com/ycl-2004/AI-Agent-Projects" target="_blank" rel="noopener noreferrer">github.com/ycl-2004/AI-Agent-Projects</a></p></div>
            `,
            tags: ['LangGraph', 'LangChain', 'MCP', 'Human-in-the-Loop', 'Open Source']
        },
        'writing-technical': {
            title: 'Technical Writing',
            subtitle: 'AI explainers and hands-on tooling walkthroughs',
            avatar: '✍️',
            body: `
                <h3>Focus</h3>
                <p>I co-author AI explainers and hands-on walkthroughs that translate agent workflows, model behavior, and developer tooling into something a working engineer can actually act on.</p>
                <h3>Reach</h3>
                <p><strong>311K cumulative reads</strong> across co-authored AI explainers, with a <strong>45K-read</strong> top post.</p>
                <h3>Why I do it</h3>
                <p>Writing an evaluation forces me to actually run the tool. The benchmark work behind these pieces is the same work that keeps my own engineering choices grounded in measurements rather than hype.</p>
                <h3>Availability</h3>
                <p>These pieces are published on partner and third-party platforms rather than a repository I own, so no public link is claimed here. Reach counts are self-reported from platform analytics.</p>
            `,
            tags: ['Technical Writing', 'AI Explainers', 'Benchmarking', 'Developer Tooling']
        },
        'work-joychime': {
            title: 'Joychime Industrial Corporation',
            subtitle: 'Manufacturing operations support in a real production environment',
            avatar: '⚙️',
            body: `
                <h3>Problem</h3>
                <p>Production continuity depends on stable inspections, reliable assembly work, and fast response when operational exceptions happen on the floor.</p>
                <h3>Approach</h3>
                <p>I supported the environment through hands-on inspection, wiring, documentation improvements, and troubleshooting under real manufacturing pressure.</p>
                <h3>System</h3>
                <ul>
                    <li>Performed plant inspections and helped handle operational exceptions</li>
                    <li>Supported electrical equipment assembly, wiring, and production workflows</li>
                    <li>Improved documentation and reporting clarity for daily operations</li>
                </ul>
                <h3>Outcome</h3>
                <p>Cut paperwork volume by <strong>30%</strong> with cleaner templates, and built practical experience with operational reliability, process clarity, and the discipline required to keep production environments running.</p>
                <h3>Stack</h3>
                <p class="modal-stack-line">Plant Inspection · Electrical Assembly · Wiring · Documentation Workflows · Troubleshooting</p>
            `,
            tags: ['Operations', 'Troubleshooting', 'Documentation', 'Assembly']
        },
        'education': {
            title: 'Education',
            subtitle: 'Engineering foundation behind my systems and product work',
            avatar: '🎓',
            body: `
                <h3>Foundation</h3>
                <p><strong>University of British Columbia</strong> · BASc in Electrical Engineering</p>
                <p>Expected graduation: May 2027</p>
                <h3>What it gave me</h3>
                <p>Training in control systems, circuit design, signal processing, and debugging discipline.</p>
                <h3>Why it matters now</h3>
                <p>This background is why I naturally think in systems, constraints, reliability, and hardware-software interaction when building products.</p>
                <h3>Recognition</h3>
                <p>Dean's Honour List (2022–2025)</p>
            `,
            tags: ['Engineering Foundation', 'Systems Thinking', 'UBC', 'Dean\'s Honour List']
        },
        'content': {
            title: 'Content Systems',
            subtitle: 'Turning knowledge into reusable, structured outputs',
            avatar: '✍️',
            body: `
                <h3>Focus</h3>
                <p>AI, product thinking, workflow design, and visual communication translated into clear, reusable outputs.</p>
                <h3>What I create</h3>
                <ul>
                    <li>YC Design: a public design and frontend delivery system for pages, apps, cards, covers, and slides</li>
                    <li>YC IP: a public, reference-driven illustration system built around the YC character and reusable scene rules</li>
                    <li>AI workflow playbooks and agent-ready SOPs</li>
                    <li>Builder notes on shipping, systems, and leverage</li>
                    <li>Beginner-friendly explainers that make technical ideas easier to use</li>
                </ul>
                <h3>Public evidence</h3>
                <div class="modal-link-list">
                    <p><strong>YC Design:</strong> <a href="https://github.com/ycl-2004/YC_Design" target="_blank" rel="noopener noreferrer">github.com/ycl-2004/YC_Design</a></p>
                    <p><strong>YC IP:</strong> <a href="https://github.com/ycl-2004/YC_IP" target="_blank" rel="noopener noreferrer">github.com/ycl-2004/YC_IP</a></p>
                </div>
                <h3>Goal</h3>
                <p>Turn knowledge into reusable systems and scalable content.</p>
            `,
            tags: ['Structured Content', 'Workflow Documentation', 'Reusable Knowledge']
        },
        'opinion': {
            title: 'Insight Framework',
            subtitle: 'My perspective on AI, learning, and individual productivity',
            avatar: '🧠',
            body: `
                <h3>Core ideas</h3>
                <ul>
                    <li>AI can multiply execution, but people still shape meaning, taste, and final decisions</li>
                    <li>SOPs are no longer just for humans, but for AI agents to execute</li>
                    <li>Individual builders can now operate like small teams with AI</li>
                </ul>
                <h3>What I am exploring</h3>
                <p>How AI reshapes learning, building, and individual productivity.</p>
            `,
            tags: ['AI Worldview', 'Workflow Thinking', 'Individual Leverage']
        },
        'motto': selfMotto,
        'sticky-intj': workingStyle,
        'sticky-agent': selfBuilderMode,
        'sticky-agent-native': selfAgentNative,
        'ai-tooling': selfAiTooling,
        'self-philosophy': selfPhilosophy,
        'self-agent-native': selfAgentNative,
        'self-builder-mode': selfBuilderMode,
        'self-motto': selfMotto,
        'self-what-i-build': selfWhatIBuild,
        'self-ai-tooling': selfAiTooling,
        'contact': {
            title: 'Contact Me',
            subtitle: 'Links',
            avatar: '📮',
            body: `
                <p><strong>Email:</strong> <a href="mailto:yichen.lin.2004@gmail.com">yichen.lin.2004@gmail.com</a></p>
                <p><strong>LinkedIn:</strong> <a href="https://www.linkedin.com/in/yichenlin-lyc/" target="_blank" rel="noopener noreferrer">yichenlin-lyc</a></p>
                <p><strong>GitHub:</strong> <a href="https://github.com/ycl-2004" target="_blank" rel="noopener noreferrer">github.com/ycl-2004</a></p>
                <p><strong>Portfolio:</strong> <a href="https://ycl-2004.github.io/Profile/" target="_blank" rel="noopener noreferrer">ycl-2004.github.io/Profile/</a></p>
                <p><strong>Résumé (PDF):</strong> <a href="https://ycl-2004.github.io/Resume/YC-Resume.pdf" target="_blank" rel="noopener noreferrer">ycl-2004.github.io/Resume/YC-Resume.pdf</a></p>
            `,
            tags: ['Open to Opportunities', 'Happy to Connect']
        }
    };
})();
