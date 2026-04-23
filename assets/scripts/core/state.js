(function () {
    const app = window.PortfolioApp;

    app.state = {
        scale: 1,
        panX: 0,
        panY: 0,
        isPanning: false,
        startX: 0,
        startY: 0,
        draggedCard: null,
        dragOffsetX: 0,
        dragOffsetY: 0,
        dragStartClientX: 0,
        dragStartClientY: 0,
        dragMoved: false,
        justDraggedCardId: null
    };
})();
