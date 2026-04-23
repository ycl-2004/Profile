(function () {
    const app = window.PortfolioApp;

    app.bindCardDragging = function bindCardDragging() {
        document.querySelectorAll('.card').forEach((card) => {
            card.addEventListener('mousedown', (event) => {
                if (event.button !== 0) return;

                const rect = card.getBoundingClientRect();

                app.state.draggedCard = card;
                app.state.dragOffsetX = event.clientX - rect.left;
                app.state.dragOffsetY = event.clientY - rect.top;

                card.classList.add('dragging');
                event.stopPropagation();
            });
        });

        document.addEventListener('mousemove', (event) => {
            if (app.state.draggedCard) {
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
                app.state.draggedCard.classList.remove('dragging');
                app.state.draggedCard = null;
                // 拖拽结束后做一次全量同步，确保连线完全正确
                app.updateConnections();
            }
        });
    };
})();
