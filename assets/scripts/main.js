(function () {
    const app = window.PortfolioApp;

    app.render();
    app.cacheDom();
    app.bindTerminalEntry();
    app.bindPanZoom();
    app.bindCardDragging();
    app.bindLayers();
    app.bindModal();
    app.bindWindowEvents();
})();
