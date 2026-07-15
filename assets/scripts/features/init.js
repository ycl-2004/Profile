(function () {
    const app = window.PortfolioApp;

    function applyEntryView() {
        if (typeof app.zoomToOverview === 'function') {
            app.zoomToOverview();
        } else if (typeof app.zoomToScale === 'function') {
            app.zoomToScale(0.58);
        } else if (typeof app.zoomToFit === 'function') {
            app.zoomToFit();
        } else {
            app.state.panX = 80;
            app.state.panY = 60;
            app.state.scale = 0.72;
            app.updateTransform();
        }
    }

    app.initCanvas = function initCanvas() {
        const canvasApp = document.getElementById('canvas-app');
        if (canvasApp) {
            canvasApp.inert = false;
            canvasApp.setAttribute('aria-hidden', 'false');
        }
        if (typeof app.applyDefaultLayout === 'function') {
            app.applyDefaultLayout();
        }
        app.initMinimap();
        applyEntryView();

        app.state.canvasReady = true;
        app.updateConnections();
        app.updateMinimap();
    };

    app.bindWindowEvents = function bindWindowEvents() {
        window.addEventListener('load', () => {
            app.updateConnections();
        });

        window.addEventListener('resize', () => {
            if (app.state.currentView && app.state.currentView !== 'canvas') {
                if (typeof app.renderActivePortfolioView === 'function') {
                    app.renderActivePortfolioView();
                }
                return;
            }

            if (typeof app.applyDefaultLayout === 'function') {
                app.applyDefaultLayout();
            }
            applyEntryView();
        });
    };
})();
