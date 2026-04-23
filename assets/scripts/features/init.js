(function () {
    const app = window.PortfolioApp;
    const TABLET_BP = 1365;

    app.initCanvas = function initCanvas() {
        // 先应用默认布局，避免重叠导致“有些卡片看不到”
        if (typeof app.applyDefaultLayout === 'function') {
            app.applyDefaultLayout();
        }
        app.initMinimap();

        // 桌面端保留原本的 canvas 感；平板/手机优先完整可见
        const preferFit = window.innerWidth < TABLET_BP;
        if (preferFit && typeof app.zoomToFit === 'function') {
            app.zoomToFit();
        } else if (typeof app.zoomToScale === 'function') {
            app.zoomToScale(0.52);
        } else if (typeof app.zoomToFit === 'function') {
            app.zoomToFit();
        } else {
            app.state.panX = 80;
            app.state.panY = 60;
            app.state.scale = 0.52;
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
            // 同时重新应用默认布局，避免不同屏幕尺寸导致挤压重叠
            if (typeof app.applyDefaultLayout === 'function') {
                app.applyDefaultLayout();
            }
            if (window.innerWidth < TABLET_BP && typeof app.zoomToFit === 'function') {
                app.zoomToFit();
            } else {
                app.updateTransform();
            }
        });
    };
})();
