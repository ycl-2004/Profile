(function () {
    const app = window.PortfolioApp;

    app.initCanvas = function initCanvas() {
        app.state.panX = 80;
        app.state.panY = 60;
        app.state.scale = 0.7;
        app.updateTransform();
        app.updateConnections();
        app.initMinimap();
        app.updateMinimap();
    };

    app.bindWindowEvents = function bindWindowEvents() {
        window.addEventListener('load', () => {
            app.updateConnections();
        });

        window.addEventListener('resize', () => {
            app.updateMinimap();
        });
    };
})();
