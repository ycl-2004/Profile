(function () {
    const app = window.PortfolioApp;

    app.templates.sidebar = `
        <div class="sidebar-scrim" id="sidebar-scrim" aria-hidden="true"></div>
        <div class="sidebar" id="sidebar">
            <div class="sidebar-header">
                <div class="sidebar-title">Layers</div>
                <button class="sidebar-close" id="sidebar-close" aria-label="Close Layers">✕</button>
            </div>
            <div class="layer-item active" data-layer="__all__"><div class="layer-icon" style="background:rgba(255,143,171,0.12);">◎</div><span>All</span><span class="layer-eye">◌</span></div>
            <div class="layer-item" data-layer="self"><div class="layer-icon" style="background:var(--cream);">👤</div><span>Self</span><span class="layer-eye">◌</span></div>
            <div class="layer-item" data-layer="general"><div class="layer-icon" style="background:var(--lavender);">🧭</div><span>General</span><span class="layer-eye">◌</span></div>
            <div class="layer-item" data-layer="experience"><div class="layer-icon" style="background:var(--pink-light);">🛠</div><span>Experience</span><span class="layer-eye">◌</span></div>
            <div class="layer-item" data-layer="projects"><div class="layer-icon" style="background:var(--mint);">✂</div><span>Projects</span><span class="layer-eye">◌</span></div>
            <div class="layer-item" data-layer="contact"><div class="layer-icon" style="background:#d4f1f9;">📮</div><span>Contact</span><span class="layer-eye">◌</span></div>

            <div class="sidebar-console-card">
                <div class="sidebar-console-line">$ whoami</div>
                <div class="sidebar-console-name">Yi-Chen Lin</div>
                <div class="sidebar-console-role">AI-Native Product Engineer</div>
                <div class="sidebar-console-role">Full-Stack Builder</div>
                <div class="sidebar-console-line">$ cat motto.txt</div>
                <div class="sidebar-console-quote">"Turn ambiguity into systems people can actually use."</div>
                <div class="sidebar-console-line">$ open YC Profile.app</div>
                <button class="sidebar-console-link" type="button">Open Profile ↗</button>
            </div>

            <div class="sidebar-footer">
                <div class="sidebar-title">Minimap</div>
                <div class="sidebar-minimap-shell">
                    <div class="minimap">
                        <div class="minimap-content" id="minimap-content"></div>
                        <div class="minimap-title">Canvas Map</div>
                    </div>
                </div>
            </div>
        </div>
    `;
})();
