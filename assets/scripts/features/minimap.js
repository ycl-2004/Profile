(function () {
    const app = window.PortfolioApp;
    const MOBILE_BP = 900;

    app.initMinimap = function initMinimap() {
        const minimapContent = app.dom.minimapContent;
        const minimapContainer = minimapContent ? minimapContent.closest('.minimap') : null;
        const mw = minimapContainer ? minimapContainer.clientWidth : 160;
        const mh = minimapContainer ? minimapContainer.clientHeight : 100;
        const cards = document.querySelectorAll('.card');
        let minX = Infinity;
        let minY = Infinity;
        let maxX = 0;
        let maxY = 0;

        cards.forEach((card) => {
            const x = parseFloat(card.style.left);
            const y = parseFloat(card.style.top);
            const w = parseFloat(card.style.width);
            const h = card.offsetHeight || 200;

            minX = Math.min(minX, x);
            minY = Math.min(minY, y);
            maxX = Math.max(maxX, x + w);
            maxY = Math.max(maxY, y + h);
        });

        const padding = 100;
        const boundsW = maxX - minX + padding * 2;
        const boundsH = maxY - minY + padding * 2;
        const minimapScale = Math.min(mw / boundsW, mh / boundsH);

        minimapContent.innerHTML = '';

        cards.forEach((card) => {
            const x = parseFloat(card.style.left) - minX + padding;
            const y = parseFloat(card.style.top) - minY + padding;
            const w = parseFloat(card.style.width);
            const h = card.offsetHeight || 200;
            const div = document.createElement('div');

            div.className = 'minimap-card';
            div.style.left = (x * minimapScale) + 'px';
            div.style.top = (y * minimapScale) + 'px';
            div.style.width = (w * minimapScale) + 'px';
            div.style.height = (h * minimapScale) + 'px';

            minimapContent.appendChild(div);
        });

        const viewportIndicator = document.createElement('div');

        viewportIndicator.className = 'minimap-viewport';
        viewportIndicator.id = 'minimap-viewport';
        minimapContent.appendChild(viewportIndicator);
    };

    app.updateMinimap = function updateMinimap() {
        const indicator = document.getElementById('minimap-viewport');

        if (!indicator) return;
        const minimapContent = app.dom.minimapContent;
        const minimapContainer = minimapContent ? minimapContent.closest('.minimap') : null;
        const mw = minimapContainer ? minimapContainer.clientWidth : 160;
        const mh = minimapContainer ? minimapContainer.clientHeight : 100;

        const cards = document.querySelectorAll('.card');
        let minX = Infinity;
        let minY = Infinity;
        let maxX = -Infinity;
        let maxY = -Infinity;

        cards.forEach((card) => {
            const x = parseFloat(card.style.left) || 0;
            const y = parseFloat(card.style.top) || 0;
            const w = parseFloat(card.style.width) || card.offsetWidth || 0;
            const h = card.offsetHeight || 200;

            minX = Math.min(minX, x);
            minY = Math.min(minY, y);
            maxX = Math.max(maxX, x + w);
            maxY = Math.max(maxY, y + h);
        });

        if (!isFinite(minX) || !isFinite(minY) || !isFinite(maxX) || !isFinite(maxY)) return;

        const padding = 100;
        const boundsW = (maxX - minX) + padding * 2;
        const boundsH = (maxY - minY) + padding * 2;
        const minimapScale = Math.min(mw / boundsW, mh / boundsH);
        const state = app.state;

        // 可视区域（排除 sidebar / topbar 的遮挡）
        const sidebar = document.querySelector('.sidebar');
        const topBar = document.querySelector('.top-bar');
        const sidebarVisible =
            !!sidebar &&
            (!window.matchMedia(`(max-width:${MOBILE_BP}px)`).matches || document.body.classList.contains('sidebar-open'));
        const safeLeft = sidebarVisible ? sidebar.offsetWidth : 0;
        const safeTop = topBar ? topBar.offsetHeight : 0;
        const safeW = window.innerWidth - safeLeft;
        const safeH = window.innerHeight - safeTop;

        // safe 区域左上角对应的世界坐标
        const worldLeft = (safeLeft - state.panX) / state.scale;
        const worldTop = (safeTop - state.panY) / state.scale;

        indicator.style.left = ((worldLeft - minX + padding) * minimapScale) + 'px';
        indicator.style.top = ((worldTop - minY + padding) * minimapScale) + 'px';
        indicator.style.width = ((safeW / state.scale) * minimapScale) + 'px';
        indicator.style.height = ((safeH / state.scale) * minimapScale) + 'px';
    };
})();
