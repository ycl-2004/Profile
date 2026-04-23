(function () {
    const app = window.PortfolioApp;
    const MOBILE_BP = 900;

    app.initCanvas = function initCanvas() {
        // 先应用默认布局，避免重叠导致“有些卡片看不到”
        if (typeof app.applyDefaultLayout === 'function') {
            app.applyDefaultLayout();
        }
        app.initMinimap();

        // 首次进入：桌面端默认 52%（你截图里想要的视觉）
        // 小屏（手机/平板）优先“完整可见”，避免一进来只看到局部
        const preferFit = window.innerWidth <= MOBILE_BP;
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
            app.updateTransform();
        });
    };
})();
