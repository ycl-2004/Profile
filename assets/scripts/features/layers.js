(function () {
    const app = window.PortfolioApp;

    app.bindLayers = function bindLayers() {
        const MOBILE_BP = 900;

        const sidebar = document.getElementById('sidebar') || document.querySelector('.sidebar');
        const scrim = document.getElementById('sidebar-scrim');
        const toggleBtn = document.getElementById('sidebar-toggle');
        const closeBtn = document.getElementById('sidebar-close');

        function isMobileLayout() {
            return window.innerWidth <= MOBILE_BP;
        }

        function setSidebarOpen(open) {
            if (!sidebar) return;
            if (isMobileLayout()) {
                sidebar.classList.toggle('is-open', !!open);
                if (scrim) scrim.classList.toggle('is-open', !!open);
                document.body.classList.toggle('sidebar-open', !!open);
            } else {
                // 桌面端永远是“打开”的固定侧栏
                sidebar.classList.remove('is-open');
                if (scrim) scrim.classList.remove('is-open');
                document.body.classList.remove('sidebar-open');
            }

            // sidebar 的可见状态变化会影响 safe-area / minimap / constrainView
            if (typeof app.updateTransform === 'function') app.updateTransform();
        }

        function ensureSidebarInitialState() {
            if (isMobileLayout()) setSidebarOpen(false);
            else setSidebarOpen(true);
        }

        function setActiveLayer(layer) {
            app.state.activeLayer = layer;
            document.querySelectorAll('.layer-item').forEach((layerItem) => {
                layerItem.classList.toggle('active', layerItem.dataset.layer === layer);
            });
            if (typeof app.applyPortfolioLayerFilter === 'function') {
                app.applyPortfolioLayerFilter(layer);
            }
        }

        function resetCards() {
            document.querySelectorAll('.card').forEach((card) => {
                card.style.opacity = '1';
                card.style.filter = 'none';
            });
            resetConnections();
        }

        function filterCards(layer) {
            document.querySelectorAll('.card').forEach((card) => {
                if (card.dataset.layer === layer) {
                    card.style.opacity = '1';
                    card.style.filter = 'none';
                } else {
                    card.style.opacity = '0.28';
                    card.style.filter = 'grayscale(0.65)';
                }
            });
            filterConnections(layer);
        }

        function resetConnections() {
            const paths = app.state.connectionPaths;
            if (!paths) return;

            paths.forEach((path) => {
                path.style.opacity = '';
            });
        }

        function filterConnections(layer) {
            const paths = app.state.connectionPaths;
            if (!paths) return;

            paths.forEach((path) => {
                const fromCard = document.querySelector(`[data-card="${path.dataset.from}"]`);
                const toCard = document.querySelector(`[data-card="${path.dataset.to}"]`);
                const fromLayer = fromCard?.dataset.layer;
                const toLayer = toCard?.dataset.layer;
                path.style.opacity = fromLayer === layer && toLayer === layer ? '' : '0.04';
            });
        }

        // --- layer click (支持：再点一次回到“全局/全部”)
        document.querySelectorAll('.layer-item').forEach((item) => {
            item.addEventListener('click', () => {
                const layer = item.dataset.layer;
                const isActive = item.classList.contains('active');

                // 点击“全部” or 再点一次同一个 topic：回到全局
                if (layer === '__all__' || isActive) {
                    setActiveLayer('__all__');
                    resetCards();
                } else {
                    setActiveLayer(layer);
                    filterCards(layer);
                }

                // 手机端：选完自动收起，画布空间更大
                if (isMobileLayout()) setSidebarOpen(false);
            });
        });

        // --- sidebar toggle (手机/平板)
        if (toggleBtn) {
            toggleBtn.addEventListener('click', () => {
                const next = !(sidebar && sidebar.classList.contains('is-open'));
                setSidebarOpen(next);
            });
        }

        if (closeBtn) closeBtn.addEventListener('click', () => setSidebarOpen(false));
        if (scrim) scrim.addEventListener('click', () => setSidebarOpen(false));

        document.addEventListener('keydown', (event) => {
            if (event.key === 'Escape' && isMobileLayout()) setSidebarOpen(false);
        });

        window.addEventListener('resize', ensureSidebarInitialState);
        ensureSidebarInitialState();

        // 初次渲染：默认“全部”
        setActiveLayer('__all__');
        resetCards();
    };
})();
