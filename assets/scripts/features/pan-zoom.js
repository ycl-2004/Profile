(function () {
    const app = window.PortfolioApp;

    app.updateTransform = function updateTransform() {
        const state = app.state;

        app.dom.viewport.style.transform = `translate(${state.panX}px,${state.panY}px) scale(${state.scale})`;
        app.dom.zoomLevelEl.textContent = Math.round(state.scale * 100) + '%';
        app.updateMinimap();
    };

    app.bindPanZoom = function bindPanZoom() {
        document.addEventListener('mousedown', (event) => {
            if (
                event.button === 1 ||
                (event.button === 0 &&
                    event.target.closest('#canvas-app') &&
                    !event.target.closest('.card') &&
                    !event.target.closest('.sidebar') &&
                    !event.target.closest('.top-bar'))
            ) {
                app.state.isPanning = true;
                app.state.startX = event.clientX - app.state.panX;
                app.state.startY = event.clientY - app.state.panY;
                event.preventDefault();
            }
        });

        document.addEventListener('mousemove', (event) => {
            if (app.state.isPanning) {
                app.state.panX = event.clientX - app.state.startX;
                app.state.panY = event.clientY - app.state.startY;
                app.updateTransform();
            }
        });

        document.addEventListener('mouseup', () => {
            app.state.isPanning = false;
        });

        document.addEventListener('wheel', (event) => {
            if (event.ctrlKey || event.metaKey) {
                event.preventDefault();

                const delta = event.deltaY > 0 ? 0.9 : 1.1;
                const newScale = Math.max(0.3, Math.min(3, app.state.scale * delta));
                const rect = app.dom.viewport.getBoundingClientRect();
                const mx = event.clientX - rect.left;
                const my = event.clientY - rect.top;

                app.state.panX = event.clientX - mx * (newScale / app.state.scale);
                app.state.panY = event.clientY - my * (newScale / app.state.scale);
                app.state.scale = newScale;
                app.updateTransform();
            }
        }, { passive: false });

        app.dom.zoomInButton.addEventListener('click', () => {
            app.state.scale = Math.min(3, app.state.scale * 1.2);
            app.updateTransform();
        });

        app.dom.zoomOutButton.addEventListener('click', () => {
            app.state.scale = Math.max(0.3, app.state.scale / 1.2);
            app.updateTransform();
        });

        app.dom.zoomFitButton.addEventListener('click', () => {
            app.state.scale = 0.6;
            app.state.panX = 100;
            app.state.panY = 50;
            app.updateTransform();
        });
    };
})();
