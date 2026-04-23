(function () {
    const app = window.PortfolioApp;

    function getCardEl(cardId) {
        app.state.cardEls = app.state.cardEls || {};
        if (!app.state.cardEls[cardId]) {
            app.state.cardEls[cardId] = document.querySelector(`[data-card="${cardId}"]`);
        }
        return app.state.cardEls[cardId];
    }

    function ensureConnectionsBuilt() {
        const svg = document.getElementById('connections');
        if (!svg) return null;

        if (app.state.connectionsBuilt) return svg;

        // Reset SVG with marker only once
        svg.innerHTML = app.templates.connectionMarker;

        app.state.connectionPaths = new Map();
        app.state.connectionAdj = {};

        const ns = 'http://www.w3.org/2000/svg';
        app.data.connections.forEach(([from, to]) => {
            const path = document.createElementNS(ns, 'path');
            path.dataset.from = from;
            path.dataset.to = to;
            svg.appendChild(path);

            const key = `${from}__${to}`;
            app.state.connectionPaths.set(key, path);
            (app.state.connectionAdj[from] ||= []).push(key);
            (app.state.connectionAdj[to] ||= []).push(key);
        });

        app.state.connectionsBuilt = true;
        return svg;
    }

    function updatePath(path) {
        const from = path.dataset.from;
        const to = path.dataset.to;
        const fromCard = getCardEl(from);
        const toCard = getCardEl(to);

        if (!fromCard || !toCard) return;

        const fromCenter = app.getCardCenter(fromCard);
        const toCenter = app.getCardCenter(toCard);
        path.setAttribute('d', app.createCurvedPath(fromCenter, toCenter));
        path.setAttribute('marker-end', 'url(#arrow)');
    }

    app.getCardCenter = function getCardCenter(card) {
        const x = parseFloat(card.style.left);
        const y = parseFloat(card.style.top);
        const w = parseFloat(card.style.width);
        const h = card.offsetHeight || 200;

        return { x: x + w / 2, y: y + h / 2 };
    };

    app.createCurvedPath = function createCurvedPath(from, to) {
        const dx = to.x - from.x;
        const dy = to.y - from.y;
        const midX = (from.x + to.x) / 2;
        const controlX = midX + (dy * 0.2);
        const controlY = (from.y + to.y) / 2 - (dx * 0.1);

        return `M ${from.x} ${from.y} Q ${controlX} ${controlY} ${to.x} ${to.y}`;
    };

    app.updateConnections = function updateConnections() {
        const svg = ensureConnectionsBuilt();
        if (!svg) return;

        // 全量更新（用于初始化/拖拽结束/缩放平移后）
        app.state.connectionPaths.forEach((path) => updatePath(path));
    };

    // 只更新某一张卡相关的连线：显著减少拖拽时的开销
    app.updateConnectionsForCard = function updateConnectionsForCard(cardId) {
        const svg = ensureConnectionsBuilt();
        if (!svg) return;
        const keys = app.state.connectionAdj?.[cardId];
        if (!keys || keys.length === 0) return;
        keys.forEach((key) => {
            const path = app.state.connectionPaths.get(key);
            if (path) updatePath(path);
        });
    };
})();
