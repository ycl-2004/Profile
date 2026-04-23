(function () {
    const app = window.PortfolioApp;

    app.templates.topBar = `
        <div class="top-bar">
            <button class="sidebar-toggle" id="sidebar-toggle" aria-label="打开 Layers">☰</button>
            <div class="logo"><div class="logo-icon">Y</div><span>Yi-Chen Canvas</span></div>
            <div class="top-actions">
                <button class="btn btn-primary">分享</button>
            </div>
            <div class="user-avatar">YC</div>
        </div>
    `;
})();
