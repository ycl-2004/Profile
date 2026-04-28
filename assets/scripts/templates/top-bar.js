(function () {
    const app = window.PortfolioApp;

    app.templates.topBar = `
        <div class="top-bar">
            <button class="sidebar-toggle" id="sidebar-toggle" aria-label="Open Layers">☰</button>
            <div class="logo">
                <div class="logo-icon">Y</div>
                <div class="logo-copy">
                    <span class="logo-title">Yi-Chen Canvas</span>
                    <span class="logo-subtitle">AI-Native Product Engineer</span>
                </div>
            </div>
            <div class="top-actions">
                <button class="btn btn-primary">Share</button>
                <button class="btn btn-avatar" type="button">YC</button>
                <button class="btn btn-icon" type="button" aria-label="Settings">⚙</button>
            </div>
        </div>
    `;
})();
