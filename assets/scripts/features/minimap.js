(function () {
    const app = window.PortfolioApp;

    app.initMinimap = function initMinimap() {
        const minimapContent = app.dom.minimapContent;
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
        const minimapScale = Math.min(160 / boundsW, 100 / boundsH);

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

        const cards = document.querySelectorAll('.card');
        let minX = Infinity;
        let minY = Infinity;

        cards.forEach((card) => {
            minX = Math.min(minX, parseFloat(card.style.left));
            minY = Math.min(minY, parseFloat(card.style.top));
        });

        const padding = 100;
        const boundsW = 1800;
        const boundsH = 1300;
        const minimapScale = Math.min(160 / boundsW, 100 / boundsH);
        const state = app.state;

        indicator.style.left = ((-state.panX / state.scale - minX + padding) * minimapScale) + 'px';
        indicator.style.top = ((-state.panY / state.scale - minY + padding) * minimapScale) + 'px';
        indicator.style.width = ((window.innerWidth / state.scale) * minimapScale) + 'px';
        indicator.style.height = ((window.innerHeight / state.scale) * minimapScale) + 'px';
    };
})();
