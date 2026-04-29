(function () {
    const app = window.PortfolioApp;

    app.templates.canvasUi = `
        <div class="canvas-view-header">
            <div class="canvas-view-copy">
                <div class="canvas-view-title">Portfolio Canvas</div>
                <div class="canvas-view-subtitle">Explore my journey, projects, and ideas</div>
            </div>
            <div class="canvas-view-actions">
                <div class="view-switch">
                    <button class="view-tab is-active" type="button" aria-pressed="true">Canvas View</button>
                    <button class="view-tab" type="button" aria-disabled="true" title="Timeline view coming soon">Timeline View</button>
                    <button class="view-tab" type="button" aria-disabled="true" title="List view coming soon">List View</button>
                </div>
                <button class="view-expand" id="zoom-fit" type="button" aria-label="Fit canvas">⤢</button>
            </div>
        </div>
        <div class="zoom-controls">
            <button class="zoom-btn" id="zoom-in" type="button" aria-label="Zoom in" title="Zoom in">+</button>
            <div class="zoom-level" id="zoom-level">100%</div>
            <button class="zoom-btn" id="zoom-out" type="button" aria-label="Zoom out" title="Zoom out">−</button>
        </div>
        <div class="bottom-hint">
            <div class="hint-item is-active" title="Select cards">
                <span class="hint-icon" aria-hidden="true">⌖</span>
            </div>
            <div class="hint-item" title="Scroll or drag to move canvas">
                <span class="hint-icon" aria-hidden="true">✥</span>
            </div>
            <div class="hint-item" title="Zoom canvas">
                <span class="hint-icon" aria-hidden="true">⌕</span>
            </div>
            <div class="hint-item" title="Double-click to open details">
                <span class="hint-icon" aria-hidden="true">⧉</span>
            </div>
        </div>
        <div class="theme-toggle">
            <button class="theme-pill is-active" data-theme-option="light" type="button" onclick="window.PortfolioApp.applyThemePreference('light')">☼ Light</button>
            <button class="theme-pill" data-theme-option="dark" type="button" onclick="window.PortfolioApp.applyThemePreference('dark')">☾ Dark</button>
            <button class="theme-pill" data-theme-option="auto" type="button" onclick="window.PortfolioApp.applyThemePreference('auto')">◐ Auto</button>
        </div>
    `;
})();
