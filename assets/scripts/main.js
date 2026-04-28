(function () {
    const app = window.PortfolioApp;

    app.render();
    app.cacheDom();
    if (typeof app.decorateProjectTags === 'function') {
        app.decorateProjectTags();
    }
    app.bindTerminalEntry();
    // 禁用访客侧的撤销（避免 Ctrl/Cmd+Z 改动页面状态）
    document.addEventListener('keydown', (event) => {
        const key = (event.key || '').toLowerCase();
        if ((event.ctrlKey || event.metaKey) && key === 'z') {
            event.preventDefault();
        }
    });
    app.bindPanZoom();
    app.bindCardDragging();
    app.bindLayers();
    // 恢复“双击查看详情”（只读弹窗）
    app.bindModal();
    app.bindWindowEvents();
})();
