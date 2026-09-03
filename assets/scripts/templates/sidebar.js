(function () {
    const app = window.PortfolioApp;

    const LAYER_GLYPH = {
        all: '<circle cx="10" cy="10" r="6.5"/><circle cx="10" cy="10" r="2.4"/>',
        self: '<circle cx="10" cy="7" r="3.2"/><path d="M4.2 16.5c.7-3 3-4.6 5.8-4.6s5.1 1.6 5.8 4.6"/>',
        general: '<circle cx="10" cy="10" r="7"/><path d="m12.8 7.2-1.6 4-4 1.6 1.6-4 4-1.6Z"/>',
        experience: '<path d="M7.4 4.6 4 8l3.4 3.4"/><path d="M13.4 8.6 16.8 12l-3.4 3.4"/><path d="M11.6 4.2 8.8 15.8"/>',
        projects: '<rect x="3" y="5.2" width="14" height="10.6" rx="2.2"/><path d="M7.4 5.2V3.6h5.2v1.6M3 9.4h14"/>',
        contact: '<rect x="3" y="5" width="14" height="10" rx="2.2"/><path d="m4 7.2 6 4 6-4"/>'
    };

    const LAYERS = [
        { key: 'all', layer: '__all__', label: 'All', tone: 'blush' },
        { key: 'self', layer: 'self', label: 'Self', tone: 'amber' },
        { key: 'general', layer: 'general', label: 'General', tone: 'lilac' },
        { key: 'experience', layer: 'experience', label: 'Experience', tone: 'blush' },
        { key: 'projects', layer: 'projects', label: 'Projects', tone: 'mint' },
        { key: 'contact', layer: 'contact', label: 'Contact', tone: 'sky' }
    ];

    const layerItems = LAYERS.map(({ key, layer, label, tone }, index) => `
                <button class="layer-item${index === 0 ? ' active' : ''}" type="button" data-layer="${layer}" aria-pressed="${index === 0}">
                    <span class="layer-icon layer-tone-${tone}" aria-hidden="true"><svg viewBox="0 0 20 20">${LAYER_GLYPH[key]}</svg></span>
                    <span class="layer-label">${label}</span>
                </button>`).join('');

    app.templates.sidebar = `
        <div class="sidebar-scrim" id="sidebar-scrim" aria-hidden="true"></div>
        <div class="sidebar" id="sidebar">
            <section class="sidebar-section">
                <div class="sidebar-header">
                    <h2 class="sidebar-title" id="layers-title">Layers</h2>
                    <button class="sidebar-close" id="sidebar-close" aria-label="Close Layers"><svg class="ui-icon" viewBox="0 0 20 20" aria-hidden="true"><path d="m6 6 8 8M14 6l-8 8"/></svg></button>
                </div>
                <nav class="layer-list" aria-labelledby="layers-title">${layerItems}
                </nav>
            </section>

            <section class="sidebar-section">
                <div class="sidebar-console-card">
                    <div class="sidebar-console-line">$ whoami</div>
                    <div class="sidebar-console-name">Yi-Chen Lin</div>
                    <div class="sidebar-console-role">AI-Focused Engineer</div>
                    <div class="sidebar-console-role">Systems Builder</div>
                    <div class="sidebar-console-line">$ cat motto.txt</div>
                    <div class="sidebar-console-quote">"Turn ambiguity into systems people can actually use."</div>
                    <div class="sidebar-console-line">$ open evidence-bank</div>
                    <button class="sidebar-console-link" type="button" data-profile-action="evidence">Open Evidence ↗</button>
                </div>
            </section>

            <section class="sidebar-section sidebar-footer">
                <h2 class="sidebar-title minimap-title">Canvas Map</h2>
                <div class="minimap">
                    <div class="minimap-content" id="minimap-content"></div>
                </div>
            </section>
        </div>
    `;
})();
