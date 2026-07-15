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
                    <button class="view-tab is-active" type="button" data-view-target="canvas" aria-pressed="true">Canvas View</button>
                    <button class="view-tab" type="button" data-view-target="timeline" aria-pressed="false">Timeline View</button>
                    <button class="view-tab" type="button" data-view-target="list" aria-pressed="false">List View</button>
                </div>
                <button class="view-expand" id="zoom-fit" type="button" aria-label="Fit canvas">⤢</button>
            </div>
        </div>
        <main class="portfolio-view-shell" id="portfolio-view-shell" aria-live="polite"></main>
        <div class="zoom-controls">
            <button class="zoom-btn" id="zoom-in" type="button" aria-label="Zoom in" title="Zoom in">+</button>
            <div class="zoom-level" id="zoom-level">100%</div>
            <button class="zoom-btn" id="zoom-out" type="button" aria-label="Zoom out" title="Zoom out">−</button>
        </div>
        <div class="bottom-hint" role="toolbar" aria-label="Canvas tools">
            <button class="hint-item hint-action is-active" type="button" data-canvas-tool="select" aria-label="Clear selection and signals" aria-pressed="true" title="Clear selection and signals">
                <span class="hint-icon" aria-hidden="true">⌖</span>
            </button>
            <button class="hint-item hint-action" type="button" data-canvas-tool="overview" aria-label="Return to canvas overview" aria-pressed="false" title="Return to canvas overview">
                <span class="hint-icon" aria-hidden="true">✥</span>
            </button>
            <button class="hint-item hint-action" type="button" data-canvas-tool="search" aria-label="Open searchable list" aria-pressed="false" title="Open searchable list">
                <span class="hint-icon" aria-hidden="true">⌕</span>
            </button>
            <button class="hint-item hint-action" type="button" data-canvas-tool="details" aria-label="Open selected card details" aria-pressed="false" title="Open selected card details">
                <span class="hint-icon" aria-hidden="true">⧉</span>
            </button>
            <div class="tool-status" id="canvas-tool-status" role="status" aria-live="polite"></div>
        </div>
        <div class="theme-toggle">
            <button class="theme-pill is-active" data-theme-option="light" type="button">☼ Light</button>
            <button class="theme-pill" data-theme-option="dark" type="button">☾ Dark</button>
            <button class="theme-pill" data-theme-option="auto" type="button">◐ Auto</button>
        </div>
    `;
})();
