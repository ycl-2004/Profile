(function () {
    const app = window.PortfolioApp;

    app.render();
    app.cacheDom();
    document.documentElement.classList.add('js');
    const canvasApp = document.getElementById('canvas-app');
    if (canvasApp) {
        canvasApp.inert = true;
        canvasApp.setAttribute('aria-hidden', 'true');
    }
    if (typeof app.initTheme === 'function') {
        app.initTheme();
    }
    if (typeof app.initPreferences === 'function') {
        app.initPreferences();
    }
    if (typeof app.decorateProjectTags === 'function') {
        app.decorateProjectTags();
    }
    app.bindTerminalEntry();
    app.bindPanZoom();
    app.bindCardDragging();
    app.bindLayers();
    if (typeof app.bindPortfolioViews === 'function') {
        app.bindPortfolioViews();
    }
    if (typeof app.bindTopActions === 'function') {
        app.bindTopActions();
    }
    if (typeof app.bindProfileActions === 'function') {
        app.bindProfileActions();
    }
    if (typeof app.bindCanvasTools === 'function') {
        app.bindCanvasTools();
    }
    // 恢复“双击查看详情”（只读弹窗）
    app.bindModal();
    app.bindWindowEvents();

    if (typeof app.bindDeepLinks === 'function') {
        app.bindDeepLinks();
    }

    // Landing on #card-id is a request for that card, not for the boot sequence.
    const deepLinkTarget = typeof app.getDeepLinkTarget === 'function' ? app.getDeepLinkTarget() : null;
    if (deepLinkTarget) {
        app.enterCanvas({ targetCardId: deepLinkTarget, openDetails: true, immediate: true });
    }
})();
