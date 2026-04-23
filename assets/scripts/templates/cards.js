(function () {
    const app = window.PortfolioApp;

    app.templates.cards = `
        <div class="card" style="left:220px;top:100px;width:300px;animation-delay:0.1s;" data-card="profile" data-layer="profile">
            <div class="card-header"><div class="card-avatar">👨‍💻</div><div><div class="card-title">Yi-Chen Lin</div><div class="card-subtitle">在AI时代认真写代码的工程师</div></div></div>
            <div class="card-body"><p>INTJ / 跟AI搭档的第2年</p><p>UBC 电气工程 → 软件工程 → Web3 & AI</p><p style="color:var(--pink-dark);font-weight:600;">Engineer + AI = Future</p></div>
            <div class="card-footer"><span class="tag yellow">电气工程</span><span class="tag blue">Web3</span><span class="tag green">AI开发</span></div>
            <div class="card-click-hint">双击查看详情 ↗</div>
        </div>

        <div class="card card-timeline" style="left:600px;top:80px;width:340px;animation-delay:0.15s;" data-card="timeline" data-layer="timeline">
            <div class="card-title" style="margin-bottom:18px;display:flex;align-items:center;gap:8px;color:var(--pink-dark);">📍 经历时间线</div>
            <div class="timeline-item"><div class="timeline-dot"></div><div class="timeline-content"><div class="timeline-date">2026.01 – 至今</div><div class="timeline-title">Delta Control — Software Developer</div><div class="timeline-desc">React · TypeScript · Kotlin · BLE通信</div></div></div>
            <div class="timeline-item"><div class="timeline-dot" style="background:var(--mint-dark);box-shadow:0 0 0 2px var(--mint-dark);"></div><div class="timeline-content"><div class="timeline-date">2025.09 – 2025.12</div><div class="timeline-title">CryptoPulse — 全栈开发</div><div class="timeline-desc">加密货币分析平台 · API集成 · 响应式UI</div></div></div>
            <div class="timeline-item"><div class="timeline-dot" style="background:var(--peach-dark);box-shadow:0 0 0 2px var(--peach-dark);"></div><div class="timeline-content"><div class="timeline-date">2025.01 – 至今</div><div class="timeline-title">Future DAO — 智能合约开发</div><div class="timeline-desc">Solidity · 治理系统 · 代币投票</div></div></div>
            <div class="timeline-item"><div class="timeline-dot" style="background:var(--lavender-dark);box-shadow:0 0 0 2px var(--lavender-dark);"></div><div class="timeline-content"><div class="timeline-date">2024.05 – 2024.08</div><div class="timeline-title">Joychime Industrial — 电气助理</div><div class="timeline-desc">设备巡检 · 电气装配 · 文档管理</div></div></div>
            <div class="timeline-item"><div class="timeline-dot" style="background:var(--rose-dark);box-shadow:0 0 0 2px var(--rose-dark);"></div><div class="timeline-content"><div class="timeline-date">2022 – 2027</div><div class="timeline-title">UBC — 电气工程本科</div><div class="timeline-desc">Dean's Honour List · 预计2027年5月毕业</div></div></div>
            <div class="card-click-hint">双击查看详情 ↗</div>
        </div>

        <div class="card card-sticky sticky-purple" style="left:1000px;top:80px;width:200px;animation-delay:0.2s;" data-card="sticky-agent-native" data-layer="sticky-agent">
            <div class="sticky-title">🤖 Agent Native</div>
            <div class="sticky-body">不只是用AI，而是和AI一起生活</div>
        </div>

        <div class="card card-quote" style="left:220px;top:400px;width:320px;animation-delay:0.25s;" data-card="narrative" data-layer="narrative">
            <div class="sticky-title" style="color:var(--peach-dark);">💡 核心叙事</div>
            <div class="quote-text">"每一次都以为自己在走弯路，回头看才发现，都是在找同一件事——把代码变成秩序，然后点亮其他人。"</div>
            <div class="quote-author">— Yi-Chen Lin</div>
            <div class="card-click-hint">双击查看详情 ↗</div>
        </div>

        <div class="card" style="left:600px;top:480px;width:280px;animation-delay:0.3s;" data-card="ai-partner" data-layer="narrative">
            <div class="card-title" style="margin-bottom:12px;display:flex;align-items:center;gap:8px;color:var(--lavender-dark);">🤝 AI伙伴</div>
            <div class="card-body"><p style="font-weight:600;color:var(--text);">不是工具，是队友。</p><p>1 person + AI = 1 team</p><p style="color:var(--text-muted);">这不是口号，是日常。</p></div>
        </div>

        <div class="card card-skills" style="left:1000px;top:240px;width:380px;animation-delay:0.35s;" data-card="skills" data-layer="skills">
            <div class="card-title" style="margin-bottom:18px;display:flex;align-items:center;gap:8px;color:var(--pink-dark);">⚔️ 技能 & 能力</div>
            <div class="skills-grid">
                <span class="tag yellow">Solidity</span><span class="tag blue">React</span><span class="tag green">TypeScript</span><span class="tag pink">Python</span>
                <span class="tag orange">Web3</span><span class="tag purple">智能合约</span><span class="tag red">Kotlin</span><span class="tag cyan">Rust/Tauri</span>
                <span class="tag yellow">AI辅助开发</span><span class="tag blue">Git</span><span class="tag green">数据分析</span><span class="tag pink">系统思维</span>
                <span class="tag orange">快速学习</span><span class="tag purple">跨文化沟通</span>
            </div>
            <div class="card-click-hint">双击查看详情 ↗</div>
        </div>

        <div class="card card-project" style="left:1000px;top:480px;width:320px;animation-delay:0.4s;" data-card="project-dao" data-layer="projects">
            <div class="project-header"><div class="project-icon" style="background:linear-gradient(135deg,#667eea,#764ba2);">🏛</div><div><div class="project-name">Future DAO</div><div class="project-link">治理与智能合约系统</div></div></div>
            <div class="project-desc">构建完整的 DAO 治理基础设施，包括会员系统、效用代币、国库管理和提案执行流程。</div>
            <div class="project-tags"><span class="project-tag">Solidity</span><span class="project-tag">React</span><span class="project-tag">治理</span><span class="project-tag">代币投票</span></div>
            <div class="card-click-hint">双击查看详情 ↗</div>
        </div>

        <div class="card card-project" style="left:1380px;top:240px;width:320px;animation-delay:0.45s;" data-card="project-crypto" data-layer="projects">
            <div class="project-header"><div class="project-icon" style="background:linear-gradient(135deg,#f093fb,#f5576c);">📊</div><div><div class="project-name">CryptoPulse</div><div class="project-link">投资分析工具</div></div></div>
            <div class="project-desc">全栈加密货币实时追踪平台，自动化数据获取、价格更新和投资收益计算。</div>
            <div class="project-tags"><span class="project-tag">全栈</span><span class="project-tag">API集成</span><span class="project-tag">响应式UI</span><span class="project-tag">性能优化</span></div>
            <div class="card-click-hint">双击查看详情 ↗</div>
        </div>

        <div class="card card-project" style="left:1380px;top:480px;width:320px;animation-delay:0.5s;" data-card="project-todo" data-layer="projects">
            <div class="project-header"><div class="project-icon" style="background:linear-gradient(135deg,#4facfe,#00f2fe);">✅</div><div><div class="project-name">YC Todo</div><div class="project-link">macOS 菜单栏应用</div></div></div>
            <div class="project-desc">使用 Tauri(Rust) + React 构建的原生 macOS 应用，支持任务管理和本地存储。</div>
            <div class="project-tags"><span class="project-tag">Tauri</span><span class="project-tag">Rust</span><span class="project-tag">macOS</span><span class="project-tag">NSPopover</span></div>
            <div class="card-click-hint">双击查看详情 ↗</div>
        </div>

        <div class="card card-project" style="left:600px;top:680px;width:340px;animation-delay:0.55s;" data-card="work-delta" data-layer="work">
            <div class="project-header"><div class="project-icon" style="background:linear-gradient(135deg,#43e97b,#38f9d7);">🏢</div><div><div class="project-name">Delta Control</div><div class="project-link">Software Developer · Vancouver</div></div></div>
            <div class="project-desc">开发混合 HVAC 空气平衡应用，实现前端-原生通信、BLE/IP 传感器实时连接和状态持久化。</div>
            <div class="project-tags"><span class="project-tag">React</span><span class="project-tag">TypeScript</span><span class="project-tag">Kotlin</span><span class="project-tag">BLE</span><span class="project-tag">Android WebView</span></div>
            <div class="card-click-hint">双击查看详情 ↗</div>
        </div>

        <div class="card" style="left:1000px;top:720px;width:300px;animation-delay:0.6s;" data-card="education" data-layer="education">
            <div class="card-title" style="margin-bottom:14px;display:flex;align-items:center;gap:8px;color:var(--rose-dark);">🎓 教育背景</div>
            <div class="card-body">
                <p style="font-weight:700;color:var(--text);font-size:14px;">University of British Columbia</p>
                <p>加拿大 · Vancouver</p><p>Bachelor of Applied Science</p><p>Electrical Engineering</p>
                <p style="margin-top:10px;color:var(--pink-dark);font-weight:600;">Dean's Honour List, 2022–2025</p>
                <p style="color:var(--text-muted);">预计毕业: 2027年5月</p>
            </div>
            <div class="card-click-hint">双击查看详情 ↗</div>
        </div>

        <div class="card" style="left:220px;top:700px;width:300px;animation-delay:0.65s;" data-card="content" data-layer="content">
            <div class="card-title" style="margin-bottom:14px;display:flex;align-items:center;gap:8px;color:var(--sky-dark);">✍️ 内容创作</div>
            <div class="card-body">
                <p style="font-weight:700;color:var(--text);font-size:14px;">独立 Web3 & AI 内容研究员</p>
                <p style="margin-top:10px;">🔹 研究并撰写 Web3 入门内容、安全意识、区块链工具</p>
                <p>🔹 探索 AI 生产力与开发工具，记录功能、用例和工作流</p>
                <p>🔹 在 X 发布技术总结和短篇教育内容</p>
            </div>
            <div class="card-footer"><span class="tag blue">Web3教育</span><span class="tag green">AI工具</span><span class="tag purple">技术写作</span></div>
            <div class="card-click-hint">双击查看详情 ↗</div>
        </div>

        <div class="card" style="left:600px;top:920px;width:280px;animation-delay:0.7s;" data-card="opinion" data-layer="content">
            <div class="card-title" style="margin-bottom:12px;display:flex;align-items:center;gap:8px;color:var(--peach-dark);">✍️ 观点输出</div>
            <div class="card-body">
                <p style="font-weight:600;color:var(--text);margin-bottom:8px;">🎓 AI时代的实习生</p>
                <p style="font-size:12px;color:var(--text-muted);margin-bottom:12px;">小红书 · @YICHEN</p>
                <p style="font-weight:600;color:var(--text);margin-bottom:8px;">📋 AI时代的SOP都是写给Agent看的</p>
                <p style="font-size:12px;color:var(--text-muted);">小红书 · @YICHEN</p>
            </div>
        </div>

        <div class="card card-sticky sticky-blue" style="left:420px;top:920px;width:240px;animation-delay:0.75s;" data-card="motto" data-layer="motto">
            <div class="sticky-title">🎯 座右铭</div>
            <div class="sticky-body">"Stay hungry, stay foolish."<br><br><span style="font-size:11px;color:var(--text-muted);">— Steve Jobs</span></div>
        </div>

        <div class="card card-sticky sticky-yellow" style="left:60px;top:950px;width:180px;animation-delay:0.8s;" data-card="sticky-intj" data-layer="sticky-intj">
            <div class="sticky-title">🧠 INTJ</div>
            <div class="sticky-body">安静地建造东西</div>
        </div>

        <div class="card card-sticky sticky-pink" style="left:60px;top:1080px;width:200px;animation-delay:0.85s;" data-card="sticky-agent" data-layer="sticky-agent">
            <div class="sticky-title">🤖 Agent Native</div>
            <div class="sticky-body">不是用AI，而是和AI一起生活</div>
        </div>

        <div class="card" style="left:1000px;top:920px;width:300px;animation-delay:0.9s;" data-card="contact" data-layer="profile">
            <div class="card-title" style="margin-bottom:14px;color:var(--pink-dark);">📮 联系我</div>
            <div class="card-body">
                <p>📧 yichen.lin.2004@gmail.com</p>
                <p>📱 +1 236-777-6823</p>
                <p>💼 LinkedIn: Yi-Chen Lin</p>
                <p>🐦 X: @yichen_lin</p>
            </div>
            <div class="card-footer"><span class="tag pink">开放机会</span><span class="tag green">欢迎交流</span></div>
        </div>
    `;
})();
