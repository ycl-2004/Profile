(function () {
    const app = window.PortfolioApp;

    app.initCanvas = function initCanvas() {
        app.initMinimap();
        // 默认进入时自动适配并居中到内容区域（避免一进来就看到大片空白 / 卡片重叠）
        if (typeof app.zoomToFit === 'function') {
            app.zoomToFit();
        } else {
            app.state.panX = 80;
            app.state.panY = 60;
            app.state.scale = 0.7;
            app.updateTransform();
        }

        app.updateConnections();
        app.updateMinimap();
    };

    app.bindWindowEvents = function bindWindowEvents() {
        window.addEventListener('load', () => {
            app.updateConnections();
        });

        window.addEventListener('resize', () => {
            // 视窗变化时保持在可视范围内，并更新 minimap
            app.updateTransform();
        });
    };
})();
