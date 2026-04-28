(function () {
    const app = window.PortfolioApp;

    app.templates.sidebar = `
        <div class="sidebar-scrim" id="sidebar-scrim" aria-hidden="true"></div>
        <div class="sidebar" id="sidebar">
            <div class="sidebar-header">
                <div class="sidebar-title">Layers</div>
                <button class="sidebar-close" id="sidebar-close" aria-label="Close Layers">✕</button>
            </div>
            <div class="layer-item active" data-layer="__all__"><div class="layer-icon" style="background:rgba(0,0,0,0.06);">🌐</div><span>All</span><span class="layer-eye">👁</span></div>
            <div class="layer-item" data-layer="self"><div class="layer-icon" style="background:var(--cream);">👤</div><span>Self</span><span class="layer-eye">👁</span></div>
            <div class="layer-item" data-layer="general"><div class="layer-icon" style="background:var(--lavender);">🧭</div><span>General</span><span class="layer-eye">👁</span></div>
            <div class="layer-item" data-layer="experience"><div class="layer-icon" style="background:var(--pink-light);">🛠</div><span>Experience</span><span class="layer-eye">👁</span></div>
            <div class="layer-item" data-layer="contact"><div class="layer-icon" style="background:#d4f1f9;">📮</div><span>Contact</span><span class="layer-eye">👁</span></div>
            <div style="margin-top:auto;padding-top:20px;"><div class="sidebar-title">Minimap</div></div>
        </div>
    `;
})();
