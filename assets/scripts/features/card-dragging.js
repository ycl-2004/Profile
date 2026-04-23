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
                app.updateConnections();
            }
        });

        document.addEventListener('mouseup', () => {
            if (app.state.draggedCard) {
                app.state.draggedCard.classList.remove('dragging');
                app.state.draggedCard = null;
            }
        });
    };
})();
