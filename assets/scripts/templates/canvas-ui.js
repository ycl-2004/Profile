(function () {
    const app = window.PortfolioApp;

    app.templates.canvasUi = `
        <div class="canvas-view-header">
            <div class="canvas-view-copy">
                <div class="canvas-view-title">Portfolio Canvas</div>
                <div class="canvas-view-subtitle">Explore my journey, projects, and ideas</div>
            </div>
            <div class="canvas-view-actions">
                <div class="view-switch seg" role="group" aria-label="Portfolio view">
                    <button class="view-tab is-active" type="button" data-view-target="canvas" aria-pressed="true">Canvas</button>
                    <button class="view-tab" type="button" data-view-target="timeline" aria-pressed="false">Timeline</button>
                    <button class="view-tab" type="button" data-view-target="list" aria-pressed="false">List</button>
                </div>
                <div class="chrome-island">
                    <button class="icon-btn view-expand" id="zoom-fit" type="button" aria-label="Fit canvas to view" title="Fit canvas to view">
                        <svg viewBox="0 0 20 20" aria-hidden="true"><path d="M8 3H3v5M17 8V3h-5M12 17h5v-5M3 12v5h5"/></svg>
                    </button>
                </div>
            </div>
        </div>
        <main class="portfolio-view-shell" id="portfolio-view-shell" aria-live="polite"></main>
        <div class="chrome-island canvas-dock">
            <button class="icon-btn" id="zoom-in" type="button" aria-label="Zoom in" title="Zoom in">
                <svg viewBox="0 0 20 20" aria-hidden="true"><path d="M10 5v10M5 10h10"/></svg>
            </button>
            <div class="zoom-level" id="zoom-level" role="status" aria-live="off" aria-label="Zoom level">100%</div>
            <button class="icon-btn" id="zoom-out" type="button" aria-label="Zoom out" title="Zoom out">
                <svg viewBox="0 0 20 20" aria-hidden="true"><path d="M5 10h10"/></svg>
            </button>
            <div class="canvas-dock-divider" aria-hidden="true"></div>
            <button class="icon-btn theme-cycle" id="theme-cycle" type="button" data-theme-cycle data-theme-state="light" aria-label="Theme: Light. Switch to Dark" title="Theme: Light">
                <svg class="theme-glyph-light" viewBox="0 0 20 20" aria-hidden="true"><circle cx="10" cy="10" r="3.6"/><path d="M10 2v2M10 16v2M2 10h2M16 10h2M4.4 4.4l1.4 1.4M14.2 14.2l1.4 1.4M15.6 4.4l-1.4 1.4M5.8 14.2l-1.4 1.4"/></svg>
                <svg class="theme-glyph-dark" viewBox="0 0 20 20" aria-hidden="true"><path d="M16 11.7A6.6 6.6 0 0 1 8.3 4a6.6 6.6 0 1 0 7.7 7.7Z"/></svg>
                <svg class="theme-glyph-auto" viewBox="0 0 20 20" aria-hidden="true"><circle cx="10" cy="10" r="6.6"/><path d="M10 3.4a6.6 6.6 0 0 1 0 13.2Z" fill="currentColor" stroke="none"/></svg>
            </button>
        </div>
        <div class="chrome-island bottom-hint" role="toolbar" aria-label="Canvas tools">
            <button class="hint-item is-active" type="button" data-canvas-tool="select" aria-label="Clear selection and signals" aria-pressed="true" title="Clear selection">
                <svg viewBox="0 0 20 20" aria-hidden="true"><circle cx="10" cy="10" r="2"/><circle cx="10" cy="10" r="6"/><path d="M10 1.5v3M10 15.5v3M1.5 10h3M15.5 10h3"/></svg>
            </button>
            <button class="hint-item" type="button" data-canvas-tool="overview" aria-label="Return to canvas overview" aria-pressed="false" title="Canvas overview">
                <svg viewBox="0 0 20 20" aria-hidden="true"><rect x="2.5" y="2.5" width="6" height="6" rx="1.6"/><rect x="11.5" y="2.5" width="6" height="6" rx="1.6"/><rect x="2.5" y="11.5" width="6" height="6" rx="1.6"/><rect x="11.5" y="11.5" width="6" height="6" rx="1.6"/></svg>
            </button>
            <button class="hint-item" type="button" data-canvas-tool="search" aria-label="Open searchable list" aria-pressed="false" title="Search everything">
                <svg viewBox="0 0 20 20" aria-hidden="true"><circle cx="8.8" cy="8.8" r="5.3"/><path d="m12.7 12.7 4 4"/></svg>
            </button>
            <button class="hint-item" type="button" data-canvas-tool="details" aria-label="Open selected card details" aria-pressed="false" title="Open selected details">
                <svg viewBox="0 0 20 20" aria-hidden="true"><rect x="2.5" y="4.5" width="11" height="11" rx="2"/><path d="M6.5 4.5v-2h11v11h-2"/></svg>
            </button>
            <div class="tool-status" id="canvas-tool-status" role="status" aria-live="polite"></div>
        </div>
    `;
})();
