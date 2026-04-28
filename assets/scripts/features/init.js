(function () {
    const app = window.PortfolioApp;
    const TABLET_BP = 1365;

    app.initCanvas = function initCanvas() {
        if (typeof app.applyDefaultLayout === 'function') {
            app.applyDefaultLayout();
        }
        app.initMinimap();

        const preferFit = window.innerWidth < TABLET_BP;
        if (preferFit && typeof app.zoomToFit === 'function') {
            app.zoomToFit();
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

        app.updateConnections();
        app.updateMinimap();
    };

    app.bindWindowEvents = function bindWindowEvents() {
        window.addEventListener('load', () => {
            app.updateConnections();
        });

        window.addEventListener('resize', () => {
            if (typeof app.applyDefaultLayout === 'function') {
                app.applyDefaultLayout();
            }
            if (window.innerWidth < TABLET_BP && typeof app.zoomToFit === 'function') {
                app.zoomToFit();
            } else if (typeof app.zoomToScale === 'function') {
                app.zoomToScale(0.58);
            } else if (typeof app.zoomToFit === 'function') {
                app.zoomToFit();
            } else {
                app.updateTransform();
            }
        });
    };
})();
