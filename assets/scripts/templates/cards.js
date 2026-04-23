(function () {
    const app = window.PortfolioApp;

    app.templates.cards = `
        <div class="card card-hub sticky-blue" style="left:80px;top:70px;width:170px;animation-delay:0.04s;" data-card="self-hub" data-layer="self" data-section="self">
            <div class="hub-label">Section 01</div>
            <div class="sticky-title">👤 Self</div>
            <div class="sticky-body">我是谁，怎么介绍自己。</div>
        </div>

        <div class="card" style="left:80px;top:150px;width:330px;animation-delay:0.08s;" data-card="profile" data-layer="self" data-section="self">
            <div class="card-header"><div class="card-avatar">👨‍💻</div><div><div class="card-title">Yi-Chen Lin</div><div class="card-subtitle">Entry-level Software Engineer · Full-Stack Developer</div></div></div>
            <div class="card-body"><p>Hands-on builder · React/TypeScript · 跨 Web / Desktop / 工业 / Web3</p><p>从 Electrical Engineering 转向软件：用实现深度 + 产品思维把系统做出来</p><p style="color:var(--pink-dark);font-weight:600;">1 person + AI = 1 team</p></div>
            <div class="card-footer"><span class="tag blue">React</span><span class="tag green">TypeScript</span><span class="tag pink">AI工作流</span></div>
        </div>

        <div class="card card-quote" style="left:80px;top:330px;width:330px;animation-delay:0.12s;" data-card="narrative" data-layer="self" data-section="self">
            <div class="sticky-title" style="color:var(--peach-dark);">💡 核心叙事</div>
            <div class="quote-text">“用代码把混乱变成秩序，然后点亮别人。”</div>
            <div class="quote-author">— Yi-Chen Lin</div>
        </div>

        <div class="card" style="left:80px;top:510px;width:330px;animation-delay:0.16s;" data-card="ai-partner" data-layer="self" data-section="self">
            <div class="card-title" style="margin-bottom:12px;display:flex;align-items:center;gap:8px;color:var(--lavender-dark);">🤝 AI 工作哲学</div>
            <div class="card-body"><p style="font-weight:600;color:var(--text);">不是“用 AI”，是“和 AI 协作”。</p><p>Cursor · Claude · ChatGPT · Gemini · Perplexity</p><p style="color:var(--text-muted);">目标：更快迭代 + 更稳定交付 + 可复用的工程化流程</p></div>
        </div>

        <div class="card card-sticky sticky-purple" style="left:80px;top:660px;width:260px;animation-delay:0.2s;" data-card="sticky-agent-native" data-layer="self" data-section="self">
            <div class="sticky-title">🤖 Agent Native</div>
            <div class="sticky-body">把 AI 当队友：让工作流更快、更可靠、更可重复</div>
        </div>

        <div class="card card-sticky sticky-blue" style="left:80px;top:760px;width:330px;animation-delay:0.24s;" data-card="motto" data-layer="self" data-section="self">
            <div class="sticky-title">🎯 座右铭</div>
            <div class="sticky-body">"Stay hungry, stay foolish."<br><br><span style="font-size:11px;color:var(--text-muted);">— Steve Jobs</span></div>
        </div>

        <div class="card card-sticky sticky-yellow" style="left:80px;top:900px;width:200px;animation-delay:0.28s;" data-card="sticky-intj" data-layer="self" data-section="self">
            <div class="sticky-title">🧠 INTJ</div>
            <div class="sticky-body">安静地建造东西</div>
        </div>

        <div class="card card-sticky sticky-pink" style="left:300px;top:900px;width:240px;animation-delay:0.32s;" data-card="sticky-agent" data-layer="self" data-section="self">
            <div class="sticky-title">🤖 Builder Mode</div>
            <div class="sticky-body">用工作流把复杂事变简单</div>
        </div>

        <div class="card card-hub sticky-purple" style="left:470px;top:70px;width:180px;animation-delay:0.08s;" data-card="general-hub" data-layer="general" data-section="general">
            <div class="hub-label">Section 02</div>
            <div class="sticky-title">🧭 General</div>
            <div class="sticky-body">我怎么思考，怎么做事。</div>
        </div>

        <div class="card card-timeline" style="left:470px;top:150px;width:420px;animation-delay:0.12s;" data-card="timeline" data-layer="general" data-section="general">
            <div class="card-title" style="margin-bottom:18px;display:flex;align-items:center;gap:8px;color:var(--pink-dark);">🧭 思维 / 转向时间线</div>
            <div class="timeline-item"><div class="timeline-dot"></div><div class="timeline-content"><div class="timeline-date">2022</div><div class="timeline-title">EE foundation</div><div class="timeline-desc">先建立系统、控制、硬件与调试的底层直觉：怎么观察系统、定位问题、稳定迭代。</div></div></div>
            <div class="timeline-item"><div class="timeline-dot" style="background:var(--mint-dark);box-shadow:0 0 0 2px var(--mint-dark);"></div><div class="timeline-content"><div class="timeline-date">2023 → 2024</div><div class="timeline-title">Shift to software</div><div class="timeline-desc">开始把重心从“原理正确”转向“体验可用”，更在意把东西做成真正能跑、能被人用的产品。</div></div></div>
            <div class="timeline-item"><div class="timeline-dot" style="background:var(--peach-dark);box-shadow:0 0 0 2px var(--peach-dark);"></div><div class="timeline-content"><div class="timeline-date">2024 → 2025</div><div class="timeline-title">Build for users</div><div class="timeline-desc">从功能实现走向 workflow 设计：开始关心信息层级、交互摩擦、以及真实用户场景里的可达性。</div></div></div>
            <div class="timeline-item"><div class="timeline-dot" style="background:var(--lavender-dark);box-shadow:0 0 0 2px var(--lavender-dark);"></div><div class="timeline-content"><div class="timeline-date">2025</div><div class="timeline-title">Infra / Web3 / Analysis</div><div class="timeline-desc">继续向系统边界扩展：治理逻辑、数据分析、工具链与 runtime，让我更习惯从结构层面思考问题。</div></div></div>
            <div class="timeline-item"><div class="timeline-dot" style="background:var(--rose-dark);box-shadow:0 0 0 2px var(--rose-dark);"></div><div class="timeline-content"><div class="timeline-date">2025 → now</div><div class="timeline-title">AI-native collaboration</div><div class="timeline-desc">形成现在的工作方式：1 person + AI = 1 team，用可复用、可回退、可观测的流程放大个人产出。</div></div></div>
        </div>

        <div class="card card-skills" style="left:470px;top:520px;width:420px;animation-delay:0.16s;" data-card="skills" data-layer="general" data-section="general">
            <div class="card-title" style="margin-bottom:18px;display:flex;align-items:center;gap:8px;color:var(--pink-dark);">⚔️ 技能 & 能力</div>
            <div class="skills-grid">
                <span class="tag blue">React</span><span class="tag green">TypeScript</span><span class="tag pink">Python</span><span class="tag orange">API集成</span>
                <span class="tag cyan">Tauri</span><span class="tag red">Kotlin</span><span class="tag yellow">Flutter</span><span class="tag purple">Solidity</span>
                <span class="tag green">BLE/IP</span><span class="tag blue">Dashboard UI</span><span class="tag pink">结构化输出</span><span class="tag orange">可靠性/回退</span>
                <span class="tag purple">Git</span><span class="tag yellow">系统思维</span><span class="tag cyan">跨平台</span><span class="tag red">快速迭代</span>
            </div>
        </div>

        <div class="card" style="left:470px;top:710px;width:420px;animation-delay:0.2s;" data-card="content" data-layer="general" data-section="general">
            <div class="card-title" style="margin-bottom:14px;display:flex;align-items:center;gap:8px;color:var(--sky-dark);">✍️ 内容创作</div>
            <div class="card-body">
                <p style="font-weight:700;color:var(--text);font-size:14px;">Web3 & AI 技术内容</p>
                <p style="margin-top:10px;">🔹 入门友好：概念 → 用例 → 工作流</p>
                <p>🔹 关注安全意识、工具链、可复用的 SOP</p>
                <p>🔹 输出平台：X / 小红书（短内容 + 总结）</p>
            </div>
            <div class="card-footer"><span class="tag blue">Web3教育</span><span class="tag green">AI工具</span><span class="tag purple">技术写作</span></div>
        </div>

        <div class="card" style="left:470px;top:900px;width:420px;animation-delay:0.24s;" data-card="opinion" data-layer="general" data-section="general">
            <div class="card-title" style="margin-bottom:12px;display:flex;align-items:center;gap:8px;color:var(--peach-dark);">✍️ 观点输出</div>
            <div class="card-body">
                <p style="font-weight:600;color:var(--text);margin-bottom:8px;">🎓 AI时代的实习生</p>
                <p style="font-size:12px;color:var(--text-muted);margin-bottom:12px;">小红书 · @YICHEN</p>
                <p style="font-weight:600;color:var(--text);margin-bottom:8px;">📋 AI时代的SOP都是写给Agent看的</p>
                <p style="font-size:12px;color:var(--text-muted);">小红书 · @YICHEN</p>
            </div>
        </div>

        <div class="card card-hub sticky-pink" style="left:1340px;top:70px;width:190px;animation-delay:0.12s;" data-card="experience-hub" data-layer="experience" data-section="experience">
            <div class="hub-label">Section 03</div>
            <div class="sticky-title">🛠 Experience</div>
            <div class="sticky-body">我做过什么，如何把事做成。</div>
        </div>

        <div class="card card-hub card-subhub sticky-yellow" style="left:960px;top:160px;width:170px;animation-delay:0.16s;" data-card="work-hub" data-layer="experience" data-section="experience" data-group="work">
            <div class="hub-label">Work</div>
            <div class="sticky-title">💼 工作经历</div>
        </div>

        <div class="card card-hub card-subhub sticky-purple" style="left:1320px;top:160px;width:180px;animation-delay:0.18s;" data-card="independent-hub" data-layer="experience" data-section="experience" data-group="independent">
            <div class="hub-label">Independent</div>
            <div class="sticky-title">🚀 自主项目</div>
        </div>

        <div class="card card-hub card-subhub sticky-blue" style="left:1680px;top:160px;width:170px;animation-delay:0.2s;" data-card="research-hub" data-layer="experience" data-section="experience" data-group="research">
            <div class="hub-label">Research</div>
            <div class="sticky-title">🔬 探索研究</div>
        </div>

        <div class="card card-project" style="left:960px;top:240px;width:340px;animation-delay:0.22s;" data-card="work-delta" data-layer="experience" data-section="experience" data-group="work">
            <div class="project-header"><div class="project-icon" style="background:linear-gradient(135deg,#43e97b,#38f9d7);">🏢</div><div><div class="project-name">Delta Controls</div><div class="project-link">HVAC Air Balancing App</div></div></div>
            <div class="project-desc">工业现场工作流：混合应用跨层通信、状态同步、BLE/IP 设备交互与连接管理。</div>
            <div class="project-tags"><span class="project-tag">React</span><span class="project-tag">TypeScript</span><span class="project-tag">Kotlin</span><span class="project-tag">BLE/IP</span><span class="project-tag">WebView</span></div>
        </div>

        <div class="card card-project" style="left:960px;top:430px;width:340px;animation-delay:0.24s;" data-card="work-joychime" data-layer="experience" data-section="experience" data-group="work">
            <div class="project-header"><div class="project-icon" style="background:linear-gradient(135deg,#f6d365,#fda085);">⚙️</div><div><div class="project-name">Joychime Industrial</div><div class="project-link">Junior Electrical Assistant · May 2024 - Aug 2024</div></div></div>
            <div class="project-desc">New Taipei 制造环境中的现场巡检、配线装配、异常处理与文档流程优化，支撑生产连续性。</div>
            <div class="project-tags"><span class="project-tag">Plant Inspection</span><span class="project-tag">Wiring</span><span class="project-tag">Assembly</span><span class="project-tag">Troubleshooting</span></div>
        </div>

        <div class="card card-project" style="left:1320px;top:240px;width:340px;animation-delay:0.26s;" data-card="project-family-care" data-layer="experience" data-section="experience" data-group="independent">
            <div class="project-header"><div class="project-icon" style="background:linear-gradient(135deg,#ff9a9e,#fad0c4);">💗</div><div><div class="project-name">Family Care Reminder</div><div class="project-link">面向长辈的提醒产品</div></div></div>
            <div class="project-desc">可靠的循环提醒与通知重建：强调清晰、低摩擦、真实家庭协作场景。</div>
            <div class="project-tags"><span class="project-tag">Flutter</span><span class="project-tag">Dart</span><span class="project-tag">Supabase</span><span class="project-tag">Notifications</span></div>
        </div>

        <div class="card card-project" style="left:1320px;top:430px;width:340px;animation-delay:0.28s;" data-card="project-ycapikit" data-layer="experience" data-section="experience" data-group="independent">
            <div class="project-header"><div class="project-icon" style="background:linear-gradient(135deg,#00c6ff,#0072ff);">🧩</div><div><div class="project-name">YCAPIKit</div><div class="project-link">SwiftUI 的多模型 AI Runtime</div></div></div>
            <div class="project-desc">多 Provider 集成 + 重试/回退 + 结构化 JSON 解析与修复 + 请求级可观测性。</div>
            <div class="project-tags"><span class="project-tag">Swift</span><span class="project-tag">SwiftUI</span><span class="project-tag">JSON</span><span class="project-tag">Observability</span></div>
        </div>

        <div class="card card-project" style="left:1680px;top:240px;width:340px;animation-delay:0.3s;" data-card="project-dao" data-layer="experience" data-section="experience" data-group="research">
            <div class="project-header"><div class="project-icon" style="background:linear-gradient(135deg,#667eea,#764ba2);">🏛</div><div><div class="project-name">Future DAO</div><div class="project-link">治理 & 智能合约系统</div></div></div>
            <div class="project-desc">Solidity 合约 + 钱包交互：提案、投票、执行、权限与时间约束的完整治理流程。</div>
            <div class="project-tags"><span class="project-tag">Solidity</span><span class="project-tag">React</span><span class="project-tag">TypeScript</span><span class="project-tag">Ethers.js</span></div>
        </div>

        <div class="card card-project" style="left:1680px;top:430px;width:340px;animation-delay:0.32s;" data-card="project-crypto" data-layer="experience" data-section="experience" data-group="research">
            <div class="project-header"><div class="project-icon" style="background:linear-gradient(135deg,#f093fb,#f5576c);">📊</div><div><div class="project-name">CryptoPulse</div><div class="project-link">全栈加密分析 Dashboard</div></div></div>
            <div class="project-desc">实时市场追踪 + 投资可视化：外部 API 集成、数据流同步、趋势/组合视图。</div>
            <div class="project-tags"><span class="project-tag">React</span><span class="project-tag">TypeScript</span><span class="project-tag">API</span><span class="project-tag">Dashboard</span></div>
        </div>

        <div class="card card-project" style="left:1320px;top:620px;width:340px;animation-delay:0.34s;" data-card="project-todo" data-layer="experience" data-section="experience" data-group="independent">
            <div class="project-header"><div class="project-icon" style="background:linear-gradient(135deg,#4facfe,#00f2fe);">✅</div><div><div class="project-name">YC Todo</div><div class="project-link">macOS 菜单栏效率工具</div></div></div>
            <div class="project-desc">React + Tauri 的原生感 menubar app：任务管理、持久化、NSPopover 交互细节处理。</div>
            <div class="project-tags"><span class="project-tag">Tauri</span><span class="project-tag">Rust</span><span class="project-tag">React</span><span class="project-tag">TypeScript</span></div>
        </div>

        <div class="card card-project" style="left:1680px;top:620px;width:340px;animation-delay:0.36s;" data-card="project-edu-analysis" data-layer="experience" data-section="experience" data-group="research">
            <div class="project-header"><div class="project-icon" style="background:linear-gradient(135deg,#43e97b,#38f9d7);">📈</div><div><div class="project-name">Education Excel Analysis</div><div class="project-link">Streamlit 成绩分析 Dashboard</div></div></div>
            <div class="project-desc">Excel 上传 → 字段映射 → 统计分析/可视化 → 报告导出：面向真实教师工作流。</div>
            <div class="project-tags"><span class="project-tag">Python</span><span class="project-tag">Streamlit</span><span class="project-tag">Pandas</span><span class="project-tag">Excel</span></div>
        </div>

        <div class="card card-hub card-subhub sticky-pink" style="left:960px;top:820px;width:180px;animation-delay:0.36s;" data-card="academic-hub" data-layer="experience" data-section="experience" data-group="academic">
            <div class="hub-label">Academic</div>
            <div class="sticky-title">🎓 学校项目</div>
        </div>

        <div class="card" style="left:960px;top:900px;width:340px;animation-delay:0.38s;" data-card="education" data-layer="experience" data-section="experience" data-group="academic">
            <div class="card-title" style="margin-bottom:14px;display:flex;align-items:center;gap:8px;color:var(--rose-dark);">🎓 教育背景</div>
            <div class="card-body">
                <p style="font-weight:700;color:var(--text);font-size:14px;">University of British Columbia</p>
                <p>Vancouver, Canada</p><p>BASc · Electrical Engineering</p>
                <p style="margin-top:10px;color:var(--pink-dark);font-weight:600;">Dean's Honour List (2022–2025)</p>
                <p style="color:var(--text-muted);">预计毕业：2027 年</p>
            </div>
        </div>

        <div class="card card-project" style="left:1320px;top:900px;width:340px;animation-delay:0.4s;" data-card="project-unity" data-layer="experience" data-section="experience" data-group="academic">
            <div class="project-header"><div class="project-icon" style="background:linear-gradient(135deg,#f6d365,#fda085);">🎮</div><div><div class="project-name">Unity Games (2D/3D)</div><div class="project-link">交互系统 & UI 行为</div></div></div>
            <div class="project-desc">Unity + C#：玩家控制、物理、动画、UI 交互；发布可试玩版本。</div>
            <div class="project-tags"><span class="project-tag">Unity</span><span class="project-tag">C#</span><span class="project-tag">Physics</span><span class="project-tag">UI</span></div>
        </div>

        <div class="card card-project" style="left:1680px;top:900px;width:340px;animation-delay:0.42s;" data-card="project-sailbot" data-layer="experience" data-section="experience" data-group="academic">
            <div class="project-header"><div class="project-icon" style="background:linear-gradient(135deg,#89f7fe,#66a6ff);">⛵</div><div><div class="project-name">UBC Sailbot</div><div class="project-link">Electrical Power Team</div></div></div>
            <div class="project-desc">参与供电分配与电路搭建/测试，支持集成与故障定位（团队工程项目）。</div>
            <div class="project-tags"><span class="project-tag">Power</span><span class="project-tag">Circuits</span><span class="project-tag">Testing</span><span class="project-tag">Integration</span></div>
        </div>

        <div class="card card-project" style="left:960px;top:1090px;width:340px;animation-delay:0.44s;" data-card="project-balance-bot" data-layer="experience" data-section="experience" data-group="academic">
            <div class="project-header"><div class="project-icon" style="background:linear-gradient(135deg,#a18cd1,#fbc2eb);">🤖</div><div><div class="project-name">Self-Balancing Robot</div><div class="project-link">PID + 硬件-软件闭环</div></div></div>
            <div class="project-desc">Arduino + 传感器反馈：PID 控制、蓝牙调参、实时稳定性迭代测试。</div>
            <div class="project-tags"><span class="project-tag">Arduino</span><span class="project-tag">PID</span><span class="project-tag">Bluetooth</span><span class="project-tag">Sensors</span></div>
        </div>

        <div class="card card-project" style="left:1320px;top:1090px;width:340px;animation-delay:0.46s;" data-card="project-metal-detector" data-layer="experience" data-section="experience" data-group="academic">
            <div class="project-header"><div class="project-icon" style="background:linear-gradient(135deg,#ffecd2,#fcb69f);">🧲</div><div><div class="project-name">Metal Detector Robot</div><div class="project-link">电路优化 + MCU 编程</div></div></div>
            <div class="project-desc">电路设计/校准、C/汇编编程、实验仪器测试调参，提升检测稳定性。</div>
            <div class="project-tags"><span class="project-tag">C</span><span class="project-tag">Assembly</span><span class="project-tag">MCU</span><span class="project-tag">Circuits</span></div>
        </div>

        <div class="card card-hub sticky-yellow" style="left:1680px;top:1090px;width:170px;animation-delay:0.48s;" data-card="contact-hub" data-layer="contact" data-section="contact">
            <div class="hub-label">Section 04</div>
            <div class="sticky-title">📮 Contact</div>
            <div class="sticky-body">最后的行动出口。</div>
        </div>

        <div class="card" style="left:1680px;top:1180px;width:340px;animation-delay:0.5s;" data-card="contact" data-layer="contact" data-section="contact">
            <div class="card-title" style="margin-bottom:14px;color:var(--pink-dark);">📮 联系我</div>
            <div class="card-body">
                <p>📧 yichen.lin.2004@gmail.com</p>
                <p>📱 +1 236-777-6823</p>
                <p>💼 LinkedIn: https://www.linkedin.com/in/yichenlin-lyc/</p>
                <p>🐙 GitHub: https://github.com/ycl-2004</p>
                <p>🎮 Portfolio: https://ycl-2004.github.io/Profile/</p>
            </div>
            <div class="card-footer"><span class="tag pink">开放机会</span><span class="tag green">欢迎交流</span></div>
        </div>
    `;
})();
