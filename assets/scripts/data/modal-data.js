(function () {
    const app = window.PortfolioApp;

    app.data.modalData = {
        'profile': {
            title: 'Yi-Chen Lin',
            subtitle: 'AI-Native Product Engineer · Full-Stack Builder',
            avatar: '👨‍💻',
            body: `
                <h3>🎯 Positioning</h3>
                <p><strong>AI-native product engineer</strong> with hands-on experience across web, desktop, and workflow-heavy systems.</p>
                <h3>🧠 What I do best</h3>
                <p>I turn messy ideas into structured, working systems by combining systems thinking, product judgment, and fast iteration.</p>
                <h3>🤝 How I work</h3>
                <p>I use AI to accelerate execution, but I keep ownership of structure, direction, and usability. The goal is not “more AI,” but better products and more reliable workflows.</p>
                <h3>📍 Location</h3>
                <p>Based in Vancouver, Canada. Open to remote work and on-site opportunities in Vancouver, Taiwan, or China.</p>
            `,
            tags: ['AI-Native', 'Workflow Design', 'Product Sense', 'Execution']
        },
        'ai-partner': {
            title: 'AI Work Philosophy',
            subtitle: 'AI handles execution; I hold the product line',
            avatar: '🧠',
            body: `
                <h3>🤝 Division of labor</h3>
                <p>I design workflows where AI handles execution, iteration, and scaling — while I focus on structure, direction, and product decisions.</p>
                <h3>⚙️ Why it works</h3>
                <p>This creates leverage without losing judgment: faster exploration, more iterations, and clearer handoffs inside a solo workflow.</p>
                <h3>🎯 What matters</h3>
                <p>AI is not just a tool I occasionally use; it is a core collaborator inside a deliberate system.</p>
            `,
            tags: ['AI Collaboration', 'Workflow Design', 'Product Judgment']
        },
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
                <p><strong>Turn ambiguity into useful systems.</strong></p>
                <h3>🧩 Step 1 — Structure the problem</h3>
                <p>I start by clarifying the goal, constraints, and workflow so the problem becomes something buildable.</p>
                <h3>🛠 Step 2 — Ship the useful version</h3>
                <p>I move quickly from concept to prototype to usable system, prioritizing clarity and real user value over polish theater.</p>
                <h3>🔁 Step 3 — Iterate from reality</h3>
                <p>Once something works, I refine it through feedback, edge cases, and stronger workflows.</p>
            `,
            tags: ['Structure', 'Execution', 'Iteration']
        },
        'skills': {
            title: 'Skills & Capabilities',
            subtitle: 'Organized by capability, not by a list of languages',
            avatar: '⚔️',
            body: `
                <h3>Frontend & UI</h3>
                <p>React · TypeScript · Dashboard UI · Interaction Design</p>
                <h3>Full-Stack Systems</h3>
                <p>Supabase · APIs · Data Flow · Backend Logic · Workflow Automation</p>
                <h3>AI Integration</h3>
                <p>LLM workflows · Prompt design · AI-assisted development · Agent-oriented task design</p>
                <h3>Product & Workflow Thinking</h3>
                <p>User flows · Feature design · Rapid prototyping · SOP-style systems</p>
                <h3>Tools</h3>
                <p>Git · Cursor · Codex · Claude Code · NotebookLM · Gemini</p>
                <p>NotebookLM and Gemini are especially useful in my workflow for research synthesis, data organization, and structured exploration.</p>
            `,
            tags: ['React', 'AI Integration', 'Codex', 'Claude Code', 'NotebookLM', 'Gemini']
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
            `,
            tags: ['Governance UX', 'Solidity', 'React', 'Smart Contracts']
        },
        'project-crypto': {
            title: 'CryptoPulse',
            subtitle: 'Real-time crypto analytics dashboard',
            avatar: '📊',
            body: `
                <h3>Problem</h3>
                <p>Crypto market data is fragmented and noisy, which makes it difficult to interpret quickly for monitoring or decision-making.</p>
                <h3>Approach</h3>
                <p>I designed a dashboard experience that prioritizes trend clarity, quick scanning, and interpretable market views over raw data volume.</p>
                <h3>System</h3>
                <ul>
                    <li>Integrated external APIs for live market data</li>
                    <li>Built data synchronization and update flows for more stable real-time behavior</li>
                    <li>Designed dashboard views around trends, portfolio context, and readability</li>
                </ul>
                <h3>Outcome</h3>
                <p>Improved my ability to turn complex data into a clearer product surface and to think more like a data-product builder.</p>
                <h3>Stack</h3>
                <p class="modal-stack-line">React · TypeScript · External APIs · Dashboard UI</p>
                <h3>Link</h3>
                <div class="modal-link-list">
                    <p><strong>Live:</strong> <a href="https://cryptopulse-production-a190.up.railway.app" target="_blank" rel="noopener">cryptopulse-production-a190.up.railway.app</a></p>
                </div>
            `,
            tags: ['Data Product', 'Dashboard UI', 'React', 'API Sync']
        },
        'project-todo': {
            title: 'YC Todo',
            subtitle: 'Minimal task manager with local-first design',
            avatar: '✅',
            body: `
                <h3>Problem</h3>
                <p>Many simple task tools become bloated and slow for the actual use case of quick capture and lightweight completion.</p>
                <h3>Approach</h3>
                <p>I designed a menubar-first workflow focused on being fast, local, and always available without unnecessary friction.</p>
                <h3>System</h3>
                <ul>
                    <li>Built with Tauri and React for a lightweight desktop architecture</li>
                    <li>Handled macOS-specific interaction details such as popover behavior, focus, and input flow</li>
                    <li>Implemented local task persistence and immediate UI updates</li>
                </ul>
                <h3>Outcome</h3>
                <p>Explored desktop app architecture and learned how product simplification can be a feature, not a compromise.</p>
                <h3>Stack</h3>
                <p class="modal-stack-line">Tauri · Rust · React · TypeScript · macOS Native API</p>
                <h3>Link</h3>
                <div class="modal-link-list">
                    <p><strong>Demo:</strong> <a href="https://drive.google.com/drive/folders/1l72JWhzAjmenkNoi_lEXS9KNUmsrSz11" target="_blank" rel="noopener">Google Drive Folder</a></p>
                </div>
            `,
            tags: ['Desktop UX', 'Local-First', 'Tauri', 'React']
        },
        'project-family-care': {
            title: 'Family Care Reminder App',
            subtitle: 'Cross-platform reminder system for family care routines',
            avatar: '💗',
            body: `
                <h3>Problem</h3>
                <p>Elderly users often miss reminders not because they do not care, but because reminder flows are noisy, fragile, or too complicated.</p>
                <h3>Approach</h3>
                <p>I designed a low-friction reminder product around clear daily flows, caregiver coordination, and reliability over feature bloat.</p>
                <h3>System</h3>
                <ul>
                    <li>Built with Flutter and Supabase for cross-platform delivery and synced state</li>
                    <li>Implemented recurring scheduling, notification rebuilds, and missed-occurrence handling</li>
                    <li>Designed lifecycle logic for enable, pause, delete, and reminder state transitions</li>
                </ul>
                <h3>Outcome</h3>
                <p>Turned a real-world family need into a usable product system and deepened my focus on reliability, clarity, and user-first workflow design.</p>
                <h3>Stack</h3>
                <p class="modal-stack-line">Flutter · Dart · Supabase · Local Notifications</p>
            `,
            tags: ['Reliability', 'Workflow UX', 'Flutter', 'Supabase']
        },
        'project-ycapikit': {
            title: 'YCAPIKit',
            subtitle: 'Multi-provider AI runtime abstraction for Swift applications',
            avatar: '🧩',
            body: `
                <h3>Problem</h3>
                <p>AI integration is fragmented across providers, which makes routing, structure, fallbacks, and observability difficult to manage app by app.</p>
                <h3>Approach</h3>
                <p>I designed a reusable runtime layer that abstracts provider differences while keeping routing and output handling explicit.</p>
                <h3>System</h3>
                <ul>
                    <li>Supports multiple providers including OpenAI, Gemini, Anthropic, NVIDIA, Mistral, and Zhipu AI</li>
                    <li>Implements retry, backoff, timeout, and fallback orchestration</li>
                    <li>Handles structured JSON generation, validation, extraction, and repair</li>
                    <li>Adds request-level observability for provider, model, retries, fallback path, latency, and outcome</li>
                </ul>
                <h3>Outcome</h3>
                <p>Built reusable infrastructure for AI-powered apps and moved from “using AI” to “building AI systems.”</p>
                <h3>Stack</h3>
                <p class="modal-stack-line">Swift · SwiftUI · Multi-Provider LLM APIs · JSON Parsing · Observability</p>
                <h3>Link</h3>
                <div class="modal-link-list">
                    <p><strong>GitHub:</strong> <a href="https://github.com/ycl-2004/YCAPIKit" target="_blank" rel="noopener">github.com/ycl-2004/YCAPIKit</a></p>
                </div>
            `,
            tags: ['AI Infra', 'Multi-Provider', 'Swift', 'Observability']
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
            subtitle: 'Closed-loop control system for real-time balance tuning',
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
                    <p><strong>Portfolio:</strong> <a href="https://ycl-2004.itch.io" target="_blank" rel="noopener">ycl-2004.itch.io</a></p>
                    <p><strong>2D Demo:</strong> <a href="https://play.unity.com/en/games/cae09d3a-0ee6-48dc-b80a-395419be1f65/collect-coins" target="_blank" rel="noopener">Unity Play</a></p>
                    <p><strong>3D Demo:</strong> <a href="https://ycl-2004.github.io/OverCook/" target="_blank" rel="noopener">OverCook Web Build</a></p>
                </div>
            `,
            tags: ['Interaction Design', 'Unity', 'C#', 'Gameplay']
        },
        'project-metal-detector': {
            title: 'Metal Detector Robot',
            subtitle: 'Embedded sensing system optimized for reliable detection',
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
            `,
            tags: ['Embedded Systems', 'Calibration', 'MCU', 'Circuits']
        },
        'project-sailbot': {
            title: 'UBC Sailbot',
            subtitle: 'Team-based power integration for an autonomous sailbot',
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
            `,
            tags: ['Integration', 'Power Systems', 'Testing', 'Team Engineering']
        },
        'work-delta': {
            title: 'Delta Controls',
            subtitle: 'Industrial monitoring tool for real-time HVAC field workflows',
            avatar: '🏢',
            body: `
                <h3>Problem</h3>
                <p>Field engineers need clearer real-time visibility into HVAC device states, communication status, and operational flow in industrial environments.</p>
                <h3>Approach</h3>
                <p>I designed and implemented a hybrid monitoring interface that bridges device communication with a more usable operator-facing workflow.</p>
                <h3>System</h3>
                <ul>
                    <li>Built with React, TypeScript, Kotlin, and Android WebView</li>
                    <li>Implemented communication between web and native layers, including state synchronization</li>
                    <li>Integrated BLE and IP communication for discovery, monitoring, connection management, and device interaction</li>
                </ul>
                <h3>Outcome</h3>
                <p>Bridged hardware systems with software interfaces and gained stronger experience working under real-world industrial constraints.</p>
                <h3>Stack</h3>
                <p class="modal-stack-line">React · TypeScript · Kotlin · Android WebView · BLE · IP Communication</p>
            `,
            tags: ['Industrial UI', 'Device Sync', 'React', 'BLE/IP']
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
                <p>Built practical experience with operational reliability, process clarity, and the discipline required to keep production environments running.</p>
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
                <p>Web3 & AI with beginner-friendly, structured insights.</p>
                <h3>What I create</h3>
                <ul>
                    <li>Simplify complex concepts into practical, usable explanations</li>
                    <li>Document workflows and learning systems in SOP-style formats</li>
                    <li>Combine tech insights with personal thinking on X / Xiaohongshu</li>
                </ul>
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
                    <li>AI is shifting execution — humans should focus more on structure and decisions</li>
                    <li>SOPs are no longer just for humans, but for AI agents to execute</li>
                    <li>Individual builders can now operate like small teams with AI</li>
                </ul>
                <h3>What I am exploring</h3>
                <p>How AI reshapes learning, building, and individual productivity.</p>
            `,
            tags: ['AI Worldview', 'Workflow Thinking', 'Individual Leverage']
        },
        'motto': {
            title: 'Personal Motto',
            subtitle: 'Execution first, clarity through building',
            avatar: '💬',
            body: `
                <h3>💬 Personal Motto</h3>
                <p><strong>Build fast, learn faster — clarity comes from shipping.</strong></p>
                <p>I prefer real feedback from something working over abstract confidence from overthinking.</p>
            `,
            tags: ['Shipping', 'Learning']
        },
        'sticky-intj': {
            title: 'Working Style',
            subtitle: 'Structured, independent, systems-oriented',
            avatar: '🧠',
            body: `
                <p>I prefer clear architectures, focused execution, and end-to-end ownership. Less noise, more structure.</p>
            `,
            tags: ['Systems Thinking', 'Architecture', 'Ownership']
        },
        'sticky-agent': {
            title: 'Builder Mode',
            subtitle: 'My default mode is to narrow scope first, then ship quickly',
            avatar: '🛠',
            body: `
                <h3>🛠 Default behavior</h3>
                <p>I reduce scope aggressively, ship the smallest useful version, and improve from real use.</p>
                <h3>🚀 Why it matters</h3>
                <p>This keeps momentum high and turns ambiguity into product feedback faster.</p>
                <h3>📌 Principle</h3>
                <p>Shipping is how I learn what matters.</p>
            `,
            tags: ['Execution', 'Iteration', 'Shipping']
        },
        'sticky-agent-native': {
            title: 'Agent-Native Approach',
            subtitle: 'Design work as tasks AI can execute reliably',
            avatar: '🤖',
            body: `
                <h3>🧠 What it means</h3>
                <p>I structure work so AI can execute it reliably: clear briefs, explicit checkpoints, and validation loops.</p>
                <h3>🔁 Focus areas</h3>
                <p>Task decomposition, delegation quality, and feedback systems.</p>
                <h3>📈 Why it matters</h3>
                <p>The value is not the label “AI-native” — it is reliable leverage.</p>
            `,
            tags: ['Task Design', 'Prompt Structure', 'Feedback Loops']
        },
        'ai-tooling': {
            title: 'AI Tooling',
            subtitle: 'Tool names matter less than integration quality',
            avatar: '⚙️',
            body: `
                <h3>⚙️ Core stack</h3>
                <p>LLMs (Claude / GPT / Gemini) power coding, reasoning, and system design.</p>
                <h3>🔧 Workflow layer</h3>
                <p>Cursor and automation pipelines support rapid iteration, validation, and higher engineering throughput.</p>
                <h3>🎯 Standard</h3>
                <p>I care less about tool names and more about whether AI is truly integrated into the product development workflow.</p>
            `,
            tags: ['Claude', 'GPT', 'Cursor', 'Automation']
        },
        'contact': {
            title: 'Contact Me',
            subtitle: 'Links',
            avatar: '📮',
            body: `
                <p><strong>Email:</strong> yichen.lin.2004@gmail.com</p>
                <p><strong>Phone:</strong> +1 236-777-6823</p>
                <p><strong>LinkedIn:</strong> <a href="https://www.linkedin.com/in/yichenlin-lyc/" target="_blank" rel="noopener">yichenlin-lyc</a></p>
                <p><strong>GitHub:</strong> <a href="https://github.com/ycl-2004" target="_blank" rel="noopener">github.com/ycl-2004</a></p>
                <p><strong>Portfolio:</strong> <a href="https://ycl-2004.github.io/Profile/" target="_blank" rel="noopener">ycl-2004.github.io/Profile/</a></p>
            `,
            tags: ['Open to Opportunities', 'Happy to Connect']
        }
    };
})();
