(function () {
    const app = window.PortfolioApp;

    app.data.modalData = {
        'profile': {
            title: 'Yi-Chen Lin',
            subtitle: '电气工程师 · Web3开发者 · AI辅助开发者',
            avatar: '👨‍💻',
            body: `
                <h3>🎯 关于我</h3>
                <p>我是一名在 UBC 就读电气工程的学生，同时对软件工程和 Web3 充满热情。我相信 AI 不是替代工程师的工具，而是让一个人能成为一个团队的伙伴。</p>
                <h3>📍 所在地</h3>
                <p>Vancouver, Canada</p>
                <h3>💡 个人标签</h3>
                <p>INTJ · Agent Native · 终身学习者 ·  Builder</p>
                <h3>🌐 社交</h3>
                <p>📧 yichen.lin.2004@gmail.com</p>
                <p>💼 LinkedIn: Yi-Chen Lin</p>
                <p>🐦 X: @yichen_lin</p>
            `,
            tags: ['电气工程', 'Web3', 'AI开发', 'INTJ', '终身学习']
        },
        'timeline': {
            title: '经历时间线',
            subtitle: '从电气工程到 Web3 的旅程',
            avatar: '⏱',
            body: `
                <h3>🏢 Delta Control — Software Developer</h3>
                <p><strong>2026.01 – 至今 · Vancouver</strong></p>
                <p>开发混合 HVAC 空气平衡应用，使用 React + TypeScript + Kotlin + Android WebView。实现前端-原生通信、BLE/IP 传感器实时连接。</p>

                <h3>📊 CryptoPulse — 全栈开发</h3>
                <p><strong>2025.09 – 2025.12</strong></p>
                <p>构建加密货币实时追踪平台，集成外部 API 自动化数据获取、价格更新和投资收益计算。设计响应式 UI 并优化性能。</p>

                <h3>🏛 Future DAO — 智能合约开发</h3>
                <p><strong>2025.01 – 至今</strong></p>
                <p>使用 Solidity 构建 DAO 治理系统，包括会员管理、效用代币、国库管理和提案执行。开发 React + TypeScript 前端进行合约交互。</p>

                <h3>⚡ Joychime Industrial — 电气助理</h3>
                <p><strong>2024.05 – 2024.08 · New Taipei</strong></p>
                <p>执行设备巡检和异常处理，协助电气装配，优化文档管理流程，减少 10% 的文书工作。</p>

                <h3>🎓 UBC — 电气工程本科</h3>
                <p><strong>2022 – 2027 · Vancouver</strong></p>
                <p>Bachelor of Applied Science in Electrical Engineering。Dean's Honour List (2022–2025)。预计 2027 年 5 月毕业。</p>
            `,
            tags: ['React', 'TypeScript', 'Solidity', 'Kotlin', 'BLE', 'Web3']
        },
        'narrative': {
            title: '核心叙事',
            subtitle: '我的故事',
            avatar: '💡',
            body: `
                <h3>🛤️ 我的路径</h3>
                <p>从电气工程到软件工程，再到 Web3 和 AI 辅助开发——每一次看似的"弯路"，其实都在指向同一个方向：用技术创造秩序，用代码点亮他人。</p>
                <h3>🤖 AI 伙伴哲学</h3>
                <p>"1 person + AI = 1 team" 这不是口号，是我的日常。我不把 AI 当作工具，而是当作队友。Cursor、Claude、ChatGPT 都是我的 co-pilot。</p>
                <h3>🎯 建造者心态</h3>
                <p>INTJ 的安静不是沉默，是在专注地建造。我相信最好的作品来自于深度专注和持续迭代。</p>
            `,
            tags: ['INTJ', 'Builder', 'AI伙伴', '终身学习']
        },
        'skills': {
            title: '技能 & 能力',
            subtitle: '技术栈与软技能',
            avatar: '⚔️',
            body: `
                <h3>💻 编程语言</h3>
                <p>Solidity · JavaScript · TypeScript · Python · Java · Kotlin · SQL · HTML · CSS · Rust</p>
                <h3>🛠️ 框架与工具</h3>
                <p>React · Vite · Foundry · Git · GitHub · MySQL · Arduino · Unity · Tauri</p>
                <h3>🤖 AI 工具</h3>
                <p>Cursor · Claude · ChatGPT · Midjourney · Gemini · Notion AI · Perplexity</p>
                <h3>⛓️ Web3 技术</h3>
                <p>Smart Contracts · DAO · DeFi · Blockchain · Tokenomics · EVM</p>
                <h3>🧠 软技能</h3>
                <p>Problem Solving · Data Analysis · Critical Thinking · Adaptability · Cross-cultural Communication</p>
            `,
            tags: ['Solidity', 'React', 'TypeScript', 'Python', 'Web3', 'AI工具']
        },
        'project-dao': {
            title: 'Future DAO',
            subtitle: '治理与智能合约系统',
            avatar: '🏛',
            body: `
                <h3>📋 项目概述</h3>
                <p>Future DAO 是一个去中心化自治组织的治理基础设施项目。我负责设计和实现完整的智能合约系统和前端交互界面。</p>
                <h3>🔧 技术实现</h3>
                <ul>
                    <li>使用 Solidity 编写会员管理合约、效用代币合约、国库管理合约</li>
                    <li>实现基于代币的投票机制和提案执行流程</li>
                    <li>开发 React + TypeScript 前端用于合约交互</li>
                    <li>使用 Foundry 进行合约测试和部署</li>
                </ul>
                <h3>🎯 成果</h3>
                <p>完成了从概念到原型的完整 DAO 治理系统，支持会员加入、提案创建、投票计数和资金分配。</p>
            `,
            tags: ['Solidity', 'React', 'TypeScript', 'DAO', '智能合约']
        },
        'project-crypto': {
            title: 'CryptoPulse',
            subtitle: '加密货币投资分析工具',
            avatar: '📊',
            body: `
                <h3>📋 项目概述</h3>
                <p>CryptoPulse 是一个全栈加密货币分析和投资追踪平台，帮助用户实时监控市场动态和计算投资收益。</p>
                <h3>🔧 技术实现</h3>
                <ul>
                    <li>集成多个加密货币 API 实现实时价格数据获取</li>
                    <li>自动化投资收益计算和资产组合分析</li>
                    <li>设计响应式 UI，适配桌面和移动端</li>
                    <li>优化应用性能和稳定性</li>
                </ul>
                <h3>🛠️ 技术栈</h3>
                <p>React · TypeScript · Node.js · REST API · Chart.js</p>
            `,
            tags: ['全栈', 'React', 'API集成', '数据分析', '响应式UI']
        },
        'project-todo': {
            title: 'YC Todo',
            subtitle: 'macOS 菜单栏任务管理应用',
            avatar: '✅',
            body: `
                <h3>📋 项目概述</h3>
                <p>YC Todo 是一个原生 macOS 菜单栏应用，使用 Tauri (Rust) 和 React 构建，提供轻量级的任务管理和本地存储功能。</p>
                <h3>🔧 技术亮点</h3>
                <ul>
                    <li>使用 Tauri (Rust) + React 构建跨平台桌面应用</li>
                    <li>自定义 NSPopover 插件解决 macOS UI 层级和输入问题</li>
                    <li>打包通用 ARM64/x86_64 macOS 二进制文件</li>
                    <li>集成音频反馈提升用户体验</li>
                </ul>
                <h3>🛠️ 技术栈</h3>
                <p>Tauri · Rust · React · TypeScript · macOS Native API</p>
            `,
            tags: ['Tauri', 'Rust', 'React', 'macOS', '桌面应用']
        },
        'work-delta': {
            title: 'Delta Control',
            subtitle: 'Software Developer · Vancouver',
            avatar: '🏢',
            body: `
                <h3>📋 工作描述</h3>
                <p>在 Delta Control 担任软件开发者，负责开发混合 HVAC（暖通空调）空气平衡应用程序。</p>
                <h3>🔧 主要职责</h3>
                <ul>
                    <li>使用 React、TypeScript、Kotlin 和 Android WebView 构建混合应用</li>
                    <li>实现前端与原生层之间的通信桥接和数据交换</li>
                    <li>集成 BLE（蓝牙低功耗）和 IP 通信实现实时传感器发现、监控和连接</li>
                    <li>设计状态持久化机制确保数据可靠性</li>
                </ul>
                <h3>🛠️ 技术栈</h3>
                <p>React · TypeScript · Kotlin · Android WebView · BLE · IP Communication</p>
            `,
            tags: ['React', 'TypeScript', 'Kotlin', 'BLE', 'IoT']
        },
        'education': {
            title: '教育背景',
            subtitle: 'University of British Columbia',
            avatar: '🎓',
            body: `
                <h3>🏫 学校信息</h3>
                <p><strong>University of British Columbia</strong></p>
                <p>加拿大 · Vancouver, BC</p>
                <h3>📚 学位</h3>
                <p>Bachelor of Applied Science — Electrical Engineering</p>
                <p>预计毕业: 2027年5月</p>
                <h3>🏆 荣誉</h3>
                <p>Dean's Honour List (2022–2025)</p>
                <p>持续保持优异的学术表现</p>
                <h3>📖 相关课程</h3>
                <p>控制系统 · 电路设计 · 信号处理 · 软件工程 · 数据结构</p>
            `,
            tags: ['电气工程', 'UBC', 'Dean\'s Honour List', '控制系统']
        },
        'content': {
            title: '内容创作',
            subtitle: 'Web3 & AI 技术内容',
            avatar: '✍️',
            body: `
                <h3>📝 创作方向</h3>
                <p>作为独立 Web3 和 AI 内容研究员，我专注于创作入门友好的技术内容。</p>
                <h3>🔹 Web3 内容</h3>
                <ul>
                    <li>Web3 概念入门教程</li>
                    <li>区块链安全意识教育</li>
                    <li>工具使用指南和最佳实践</li>
                </ul>
                <h3>🔹 AI 内容</h3>
                <ul>
                    <li>AI 生产力工具评测</li>
                    <li>开发工具工作流分享</li>
                    <li>AI 辅助编程技巧和案例</li>
                </ul>
                <h3>📱 发布平台</h3>
                <p>主要在 X (Twitter) 发布技术总结和短篇教育内容</p>
            `,
            tags: ['Web3教育', 'AI工具', '技术写作', '内容创作']
        }
    };
})();
