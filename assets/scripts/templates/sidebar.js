(function () {
    const app = window.PortfolioApp;

    app.templates.sidebar = `
        <div class="sidebar-scrim" id="sidebar-scrim" aria-hidden="true"></div>
        <div class="sidebar" id="sidebar">
            <div class="sidebar-header">
                <div class="sidebar-title">Layers</div>
                <button class="sidebar-close" id="sidebar-close" aria-label="关闭 Layers">✕</button>
            </div>
            <div class="layer-item active" data-layer="__all__"><div class="layer-icon" style="background:rgba(0,0,0,0.06);">🌐</div><span>全部</span><span class="layer-eye">👁</span></div>
            <div class="layer-item" data-layer="profile"><div class="layer-icon" style="background:var(--cream);">👤</div><span>个人信息</span><span class="layer-eye">👁</span></div>
            <div class="layer-item" data-layer="timeline"><div class="layer-icon" style="background:var(--sky);">⏱</div><span>时间线</span><span class="layer-eye">👁</span></div>
            <div class="layer-item" data-layer="narrative"><div class="layer-icon" style="background:var(--lavender);">📌</div><span>核心叙事</span><span class="layer-eye">👁</span></div>
            <div class="layer-item" data-layer="skills"><div class="layer-icon" style="background:var(--mint);">🏷</div><span>技能标签</span><span class="layer-eye">👁</span></div>
            <div class="layer-item" data-layer="projects"><div class="layer-icon" style="background:var(--pink-light);">📝</div><span>项目经历</span><span class="layer-eye">👁</span></div>
            <div class="layer-item" data-layer="work"><div class="layer-icon" style="background:var(--peach);">💼</div><span>工作经历</span><span class="layer-eye">👁</span></div>
            <div class="layer-item" data-layer="education"><div class="layer-icon" style="background:var(--rose);">🎓</div><span>教育背景</span><span class="layer-eye">👁</span></div>
            <div class="layer-item" data-layer="content"><div class="layer-icon" style="background:#d4f1f9;">✍️</div><span>内容创作</span><span class="layer-eye">👁</span></div>
            <div class="sidebar-divider"></div>
            <div class="layer-item" data-layer="motto"><div class="layer-icon" style="background:var(--cream-dark);">🎯</div><span>座右铭</span><span class="layer-eye">👁</span></div>
            <div class="layer-item" data-layer="sticky-intj"><div class="layer-icon" style="background:var(--cream);">🏷</div><span>便签 — INTJ</span><span class="layer-eye">👁</span></div>
            <div class="layer-item" data-layer="sticky-agent"><div class="layer-icon" style="background:var(--pink-light);">🤖</div><span>便签 — Agent Native</span><span class="layer-eye">👁</span></div>
            <div style="margin-top:auto;padding-top:20px;"><div class="sidebar-title">Minimap</div></div>
        </div>
    `;
})();
