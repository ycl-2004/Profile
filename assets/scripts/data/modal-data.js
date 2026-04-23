(function () {
    const app = window.PortfolioApp;

    app.data.modalData = {
        'profile': {
            title: 'Yi-Chen Lin',
            subtitle: 'Entry-level Software Engineer · Full-Stack Developer',
            avatar: '👨‍💻',
            body: `
                <h3>🎯 定位</h3>
                <p><strong>Hands-on builder</strong>：已经在 Web / Desktop / 工业软件 / Web3 等不同场景里做过可运行的系统，实现导向、能把 UI 和系统逻辑串起来。</p>
                <h3>🧭 核心叙事</h3>
                <p>从 Electrical Engineering 有意识转向软件工程：通过持续实现、迭代与系统思考，把复杂工作流做成可靠的产品体验。</p>
                <h3>🤖 AI 工作方式</h3>
                <p>我不把 AI 当作“替代”，而是当作队友：<strong>1 person + AI = 1 team</strong>。重点是把 AI 纳入可复用、可回退、可观测的工程化工作流。</p>
                <h3>📍 所在地</h3>
                <p>Vancouver, Canada（可 Remote；Vancouver / 台湾 / 中国可 On-site）</p>
            `,
            tags: ['Software Engineer', 'Full-Stack', 'React', 'TypeScript', 'AI工作流']
        },
        'timeline': {
            title: '经历时间线',
            subtitle: '从 Electrical Engineering 到软件工程：用项目证明',
            avatar: '⏱',
            body: `
                <h3>🏢 Delta Control — Software Developer</h3>
                <p><strong>2026.01 – 至今 · Vancouver</strong></p>
                <p>开发混合 HVAC 空气平衡应用：React + TypeScript + Kotlin + Android WebView。实现跨层通信与状态同步；集成 BLE / IP 设备发现、监控与交互。</p>

                <h3>💗 Family Care Reminder App — Full-Stack / Product</h3>
                <p><strong>2026.01 – 至今</strong></p>
                <p>面向家庭照护场景的提醒产品：循环提醒、通知重建、missed-occurrence 处理与低摩擦确认流程；强调清晰与可达性。</p>

                <h3>🧩 YCAPIKit — Swift / AI Infrastructure</h3>
                <p><strong>2026</strong></p>
                <p>可复用的 Hosted-LLM Runtime：多 Provider 集成、重试/回退编排、结构化 JSON 解析与修复、请求级可观测性。</p>

                <h3>📊 CryptoPulse — 全栈开发</h3>
                <p><strong>2025.09 – 2025.12</strong></p>
                <p>全栈加密货币分析平台：集成外部 API 实现实时数据更新；构建 dashboard 视图与数据流同步；把原始市场数据变成更清晰可用的用户界面。</p>

                <h3>🏛 Future DAO — 智能合约开发</h3>
                <p><strong>2025.01 – 至今</strong></p>
                <p>Solidity 治理合约 + React/TypeScript 前端：提案创建、投票、执行、权限与时间约束，端到端的链上工作流。</p>

                <h3>✅ YC Todo — Desktop App</h3>
                <p><strong>2025.12 – 2026.02</strong></p>
                <p>Tauri + React 的 macOS menubar app：任务管理、持久化与平台交互细节（NSPopover / focus / event）处理。</p>

                <h3>📈 Education Excel Analysis — Dashboard</h3>
                <p><strong>2025</strong></p>
                <p>Streamlit 成绩分析仪表板：Excel 上传、字段映射、统计分析、图表可视化与报告导出，贴近真实课堂工作流。</p>

                <h3>⚡ Joychime Industrial — 电气助理</h3>
                <p><strong>2024.05 – 2024.08 · New Taipei</strong></p>
                <p>设备巡检与异常处理、电气装配支持；优化文档流程与报告工作，减少约 30% 纸面工作量。</p>

                <h3>🎓 UBC — 电气工程本科</h3>
                <p><strong>2022 – 2027 · Vancouver</strong></p>
                <p>BASc in Electrical Engineering。Dean's Honour List (2022–2025)。预计毕业：2027。</p>
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
                <p>TypeScript · JavaScript · Python · Kotlin · Java · SQL · C/C++ · C# · Solidity</p>
                <h3>🛠️ 框架与工具</h3>
                <p>React · Vite · Tauri · Android WebView · Streamlit · Supabase · Git/GitHub</p>
                <h3>🤖 AI & 开发工作流</h3>
                <p>Cursor · Claude · ChatGPT · Gemini · Perplexity（用于拆解需求、快速迭代、生成与验证、以及工程化重构）</p>
                <h3>⛓️ Web3 技术</h3>
                <p>Solidity · Smart Contracts · DAO Governance · Ethers.js · Wallet Interaction</p>
                <h3>🧠 软技能</h3>
                <p>实现导向 · 工作流设计 · 可维护性 · 跨文化沟通 · 快速学习</p>
            `,
            tags: ['Solidity', 'React', 'TypeScript', 'Python', 'Web3', 'AI工具']
        },
        'project-dao': {
            title: 'Future DAO',
            subtitle: '治理与智能合约系统',
            avatar: '🏛',
            body: `
                <h3>📋 项目概述</h3>
                <p>一个面向治理工作流的 DAO 系统：把“提案 → 投票 → 执行”的链上逻辑，做成可用、可验证、可交互的产品流程。</p>
                <h3>🔧 技术实现</h3>
                <ul>
                    <li>Solidity：会员/权限、提案创建、投票、执行与状态机</li>
                    <li>时间约束、执行条件与权限规则，保证治理流程可预测</li>
                    <li>React + TypeScript + Ethers.js：钱包连接与合约交互体验</li>
                    <li>测试与迭代：关注正确性、可用性与端到端流程</li>
                </ul>
                <h3>🎯 成果</h3>
                <p>把抽象治理逻辑落到可运行系统：合约设计、前端交互、边界条件与执行路径。</p>
            `,
            tags: ['Solidity', 'Ethers.js', '治理工作流', '智能合约']
        },
        'project-crypto': {
            title: 'CryptoPulse',
            subtitle: '加密货币投资分析工具',
            avatar: '📊',
            body: `
                <h3>📋 项目概述</h3>
                <p>全栈加密货币分析平台：实时市场追踪、趋势可视化、组合/收益相关计算，把“原始市场数据”变成更可用的决策界面。</p>
                <p><strong>Live：</strong><a href="https://cryptopulse-production-a190.up.railway.app" target="_blank" rel="noopener">cryptopulse-production-a190.up.railway.app</a></p>
                <h3>🔧 技术实现</h3>
                <ul>
                    <li>集成多个加密货币 API 实现实时价格数据获取</li>
                    <li>数据流同步：更稳定的更新节奏与状态处理</li>
                    <li>Dashboard UI：趋势视图、可读性与信息层级</li>
                    <li>性能与稳定性：减少不必要渲染与更新开销</li>
                </ul>
                <h3>🛠️ 技术栈</h3>
                <p>React · TypeScript · 外部 API · Dashboard 组件</p>
            `,
            tags: ['全栈', 'React', 'API集成', '数据分析', '响应式UI']
        },
        'project-todo': {
            title: 'YC Todo',
            subtitle: 'macOS 菜单栏任务管理应用',
            avatar: '✅',
            body: `
                <h3>📋 项目概述</h3>
                <p>一个原生感的 macOS menubar 任务管理工具：强调“随时打开、快速记录、轻量完成”的交互体验。</p>
                <p><strong>Demo：</strong><a href="https://drive.google.com/drive/folders/1l72JWhzAjmenkNoi_lEXS9KNUmsrSz11" target="_blank" rel="noopener">Google Drive Folder</a></p>
                <h3>🔧 技术亮点</h3>
                <ul>
                    <li>使用 Tauri (Rust) + React 构建跨平台桌面应用</li>
                    <li>处理 macOS 特有交互：NSPopover、focus、事件与输入体验</li>
                    <li>本地任务管理逻辑：实时 UI 更新 + 状态持久化</li>
                    <li>打包 ARM64 / x86_64 双架构版本</li>
                </ul>
                <h3>🛠️ 技术栈</h3>
                <p>Tauri · Rust · React · TypeScript · macOS Native API</p>
            `,
            tags: ['Tauri', 'Rust', 'React', 'macOS', '桌面应用']
        },
        'project-family-care': {
            title: 'Family Care Reminder App',
            subtitle: '面向长辈/家庭协作的提醒产品',
            avatar: '💗',
            body: `
                <h3>📋 项目概述</h3>
                <p>一个以“长辈易用”和“家人远程协作设置”为核心的提醒应用：不是堆功能，而是把<strong>提醒可靠性</strong>和<strong>低摩擦完成</strong>做到位。</p>
                <h3>🔧 我做了什么</h3>
                <ul>
                    <li>循环提醒与用户特定的调度逻辑（recurring scheduling）</li>
                    <li>本地通知重建（notification rebuild）与 missed-occurrence 处理</li>
                    <li>围绕照护者协作的流程：轻量确认、同步行为与状态更新</li>
                    <li>产品取舍：清晰、可达性、情感可用性（不是通知轰炸）</li>
                </ul>
                <h3>🛠️ 技术栈</h3>
                <p>Flutter · Supabase · Local Notifications · Workflow Logic</p>
            `,
            tags: ['Flutter', 'Supabase', '提醒工作流', '可靠性', '产品思维']
        },
        'project-ycapikit': {
            title: 'YCAPIKit',
            subtitle: 'SwiftUI 的 Hosted-LLM Runtime（可复用基础设施）',
            avatar: '🧩',
            body: `
                <h3>📋 项目概述</h3>
                <p>把“多 Provider AI 接入、回退与结构化输出”做成一个可复用的 Runtime，减少每个 App 重复造轮子。</p>
                <h3>🔧 技术实现</h3>
                <ul>
                    <li>多 Provider 集成（OpenAI / Gemini / Anthropic / NVIDIA / Mistral / 智谱等）</li>
                    <li>可配置的 retry / backoff / timeout / fallback 编排</li>
                    <li>Route-based 模型选择：primary / chunk / polish / repair</li>
                    <li>结构化 JSON：解码、校验、code-fence 剥离、partial extraction、修复路径</li>
                    <li>请求级可观测性：provider、model、retry 次数、fallback path、latency、outcome</li>
                </ul>
                <h3>🔗 链接</h3>
                <p><a href="https://github.com/ycl-2004/YCAPIKit" target="_blank" rel="noopener">github.com/ycl-2004/YCAPIKit</a></p>
            `,
            tags: ['Swift', 'AI工具链', 'Fallback', '结构化输出', 'Observability']
        },
        'project-edu-analysis': {
            title: 'Education Excel Analysis',
            subtitle: 'Streamlit 成绩分析 Dashboard（上传到洞察）',
            avatar: '📈',
            body: `
                <h3>📋 项目概述</h3>
                <p>面向教师工作流的成绩分析工具：Excel 上传后，完成字段识别/映射、统计分析与可视化，并生成可导出的报告。</p>
                <h3>🔧 我做了什么</h3>
                <ul>
                    <li>Excel 上传 + 自动字段检测 + 手动映射（班级/科目/分数/题目维度）</li>
                    <li>统计：平均/中位数/标准差/及格率/班级与科目对比</li>
                    <li>可视化：直方图、箱线图、对比图表</li>
                    <li>隐私：匿名化、top/bottom 排名视图</li>
                    <li>导出：过滤后的数据与 Markdown 报告</li>
                </ul>
                <h3>🔗 链接</h3>
                <p><a href="https://github.com/ycl-2004/Education_Excel_Analysis" target="_blank" rel="noopener">github.com/ycl-2004/Education_Excel_Analysis</a></p>
            `,
            tags: ['Python', 'Streamlit', 'Pandas', '可视化', '报告导出']
        },
        'project-balance-bot': {
            title: 'Bluetooth Self-Balancing Robot',
            subtitle: 'PID 控制 + 软硬件闭环调试',
            avatar: '🤖',
            body: `
                <h3>📋 项目概述</h3>
                <p>把控制理论落到真实系统：用 PID 实现实时平衡，并通过蓝牙进行参数调试与迭代验证。</p>
                <h3>🔧 我做了什么</h3>
                <ul>
                    <li>PID 控制逻辑：稳定性与响应的权衡调参</li>
                    <li>Arduino + 传感器反馈：闭环控制系统搭建</li>
                    <li>移动端交互：远程控制与参数调试</li>
                    <li>迭代测试：通过验证与调整提升行为稳定性</li>
                </ul>
            `,
            tags: ['PID', 'Arduino', '控制系统', '硬件-软件集成']
        },
        'project-unity': {
            title: 'Unity Game Development',
            subtitle: '2D/3D 交互体验与 UI 行为',
            avatar: '🎮',
            body: `
                <h3>📋 项目概述</h3>
                <p>Unity + C# 的可试玩项目：实现玩家控制、物理交互、动画与 UI 行为，并发布可访问的 build。</p>
                <h3>🔗 作品集</h3>
                <p><a href="https://ycl-2004.itch.io" target="_blank" rel="noopener">ycl-2004.itch.io</a></p>
                <p><a href="https://play.unity.com/en/games/cae09d3a-0ee6-48dc-b80a-395419be1f65/collect-coins" target="_blank" rel="noopener">2D Game (Unity Play)</a></p>
                <p><a href="https://ycl-2004.github.io/OverCook/" target="_blank" rel="noopener">3D Game (Web)</a></p>
            `,
            tags: ['Unity', 'C#', '交互', 'UI', '发布']
        },
        'project-metal-detector': {
            title: 'Metal Detector Robot',
            subtitle: '电路优化 + MCU 编程 + 校准测试',
            avatar: '🧲',
            body: `
                <h3>📋 项目概述</h3>
                <p>偏硬件/嵌入式取向的实现项目：电路设计与优化、C/汇编编程、校准与实验室测试，用迭代方式提升稳定性。</p>
                <h3>🔧 我做了什么</h3>
                <ul>
                    <li>电路优化：提升检测准确性与响应</li>
                    <li>微控制器编程：C 与汇编</li>
                    <li>仪器测试：校准、调参、定位噪声与不稳定来源</li>
                </ul>
            `,
            tags: ['电路', 'C', '汇编', '测试', '调试']
        },
        'project-sailbot': {
            title: 'UBC Sailbot',
            subtitle: 'Electrical Power Team Member',
            avatar: '⛵',
            body: `
                <h3>📋 项目概述</h3>
                <p>多学科团队工程项目：参与供电分配与电路实现，负责电路搭建/测试以及集成阶段的问题定位与修复。</p>
                <h3>🔧 我做了什么</h3>
                <ul>
                    <li>供电分配系统设计/实现支持</li>
                    <li>电路搭建与安全/性能测试</li>
                    <li>集成阶段故障诊断与协作修复</li>
                </ul>
            `,
            tags: ['团队协作', '电路', '测试', '集成']
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
                    <li>实现前端与原生层之间的通信桥接、共享状态与跨层同步</li>
                    <li>集成 BLE 与 IP 通信：设备发现、监控、连接管理与交互</li>
                    <li>面向真实现场工作流：更稳定的交互与可靠性处理</li>
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
        },
        'opinion': {
            title: '观点输出',
            subtitle: '更偏“方法论 + 工作流”',
            avatar: '✍️',
            body: `
                <h3>🧠 方向</h3>
                <ul>
                    <li>AI 时代的工程师如何学习、协作与交付</li>
                    <li>把 SOP 写给 Agent：让流程可复用、可验证</li>
                    <li>从工具到系统：如何把 workflow 变成产品体验</li>
                </ul>
            `,
            tags: ['方法论', '工作流', 'AI协作']
        },
        'motto': {
            title: '座右铭',
            subtitle: '执行 + 迭代',
            avatar: '🎯',
            body: `
                <h3>一句话</h3>
                <p><strong>Stay hungry, stay foolish.</strong></p>
                <p>我更在乎“做出来 + 不断迭代”，而不是“想得很完美”。</p>
            `,
            tags: ['迭代', '执行']
        },
        'sticky-intj': {
            title: 'INTJ',
            subtitle: '安静地建造东西',
            avatar: '🧠',
            body: `
                <p>偏好系统化拆解问题，把复杂流程做成清晰可维护的结构。</p>
            `,
            tags: ['系统化', '专注']
        },
        'sticky-agent': {
            title: 'Agent Native',
            subtitle: '把 AI 纳入工程化流程',
            avatar: '🤖',
            body: `
                <p>重点不是“会不会用工具”，而是能不能把 AI 变成<strong>可复用的工作流</strong>：有结构、有回退、有验证。</p>
            `,
            tags: ['AI工作流', '可靠性', '可复用']
        },
        'sticky-agent-native': {
            title: 'Agent Native',
            subtitle: '把 AI 当队友',
            avatar: '🤖',
            body: `
                <p>AI 不是替代，而是队友：在需求拆解、生成、重构、验证、总结上形成闭环。</p>
            `,
            tags: ['Cursor', 'Claude', '工作流']
        },
        'contact': {
            title: '联系我',
            subtitle: 'Links',
            avatar: '📮',
            body: `
                <p><strong>Email：</strong>yichen.lin.2004@gmail.com</p>
                <p><strong>Phone：</strong>+1 236-777-6823</p>
                <p><strong>LinkedIn：</strong><a href="https://www.linkedin.com/in/yichenlin-lyc/" target="_blank" rel="noopener">yichenlin-lyc</a></p>
                <p><strong>GitHub：</strong><a href="https://github.com/ycl-2004" target="_blank" rel="noopener">github.com/ycl-2004</a></p>
                <p><strong>Portfolio：</strong><a href="https://ycl-2004.itch.io" target="_blank" rel="noopener">ycl-2004.itch.io</a></p>
            `,
            tags: ['开放机会', '欢迎交流']
        }
    };
})();
