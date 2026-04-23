(function () {
    const app = window.PortfolioApp;
    const DRAG_THRESHOLD_PX = 6;

    app.bindCardDragging = function bindCardDragging() {
        document.querySelectorAll('.card').forEach((card) => {
            card.addEventListener('mousedown', (event) => {
                if (event.button !== 0) return;

                const rect = card.getBoundingClientRect();

                app.state.draggedCard = card;
                app.state.dragOffsetX = event.clientX - rect.left;
                app.state.dragOffsetY = event.clientY - rect.top;
                app.state.dragStartClientX = event.clientX;
                app.state.dragStartClientY = event.clientY;
                app.state.dragMoved = false;

                card.classList.add('dragging');
                event.stopPropagation();
            });
        });

        document.addEventListener('mousemove', (event) => {
            if (app.state.draggedCard) {
                const movedX = event.clientX - app.state.dragStartClientX;
                const movedY = event.clientY - app.state.dragStartClientY;
                if (!app.state.dragMoved && Math.hypot(movedX, movedY) > DRAG_THRESHOLD_PX) {
                    app.state.dragMoved = true;
                }

                const x = (event.clientX - app.state.dragOffsetX - app.state.panX) / app.state.scale;
                const y = (event.clientY - app.state.dragOffsetY - app.state.panY) / app.state.scale;

                app.state.draggedCard.style.left = x + 'px';
                app.state.draggedCard.style.top = y + 'px';

                // 连接线更新比较重：用 requestAnimationFrame + 只更新相关连线，减少拖拽卡顿
                if (!app.state.pendingConnRaf) {
                    app.state.pendingConnRaf = true;
                    requestAnimationFrame(() => {
                        app.state.pendingConnRaf = false;
                        if (!app.state.draggedCard) return;
                        const id = app.state.draggedCard.dataset.card;
                        if (typeof app.updateConnectionsForCard === 'function') {
                            app.updateConnectionsForCard(id);
                        } else {
                            app.updateConnections();
                        }
                    });
                }
            }
        });

        document.addEventListener('mouseup', () => {
            if (app.state.draggedCard) {
                const draggedCardId = app.state.draggedCard.dataset.card;
                app.state.draggedCard.classList.remove('dragging');
                app.state.draggedCard = null;
                if (app.state.dragMoved) {
                    app.state.justDraggedCardId = draggedCardId;
                    setTimeout(() => {
                        if (app.state.justDraggedCardId === draggedCardId) {
                            app.state.justDraggedCardId = null;
                        }
                    }, 0);
                }
                app.state.dragMoved = false;
                // 拖拽结束后做一次全量同步，确保连线完全正确
                app.updateConnections();
            }
        });
    };
})();
