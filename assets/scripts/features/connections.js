(function () {
    const app = window.PortfolioApp;

    function normalizeEdge(edge) {
        if (Array.isArray(edge)) {
            return { from: edge[0], to: edge[1], kind: 'primary' };
        }
        return {
            from: edge.from,
            to: edge.to,
            kind: edge.kind || 'primary'
        };
    }

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
        app.data.connections.map(normalizeEdge).forEach(({ from, to, kind }) => {
            const path = document.createElementNS(ns, 'path');
            path.dataset.from = from;
            path.dataset.to = to;
            path.dataset.kind = kind;
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

        const fromBox = app.getCardBox(fromCard);
        const toBox = app.getCardBox(toCard);
        const anchors = app.getConnectionAnchors(fromBox, toBox);

        path.setAttribute('d', app.createFlowPath(anchors.from, anchors.to, anchors.orientation));
        path.removeAttribute('marker-end');
    }

    app.getCardBox = function getCardBox(card) {
        const x = parseFloat(card.style.left);
        const y = parseFloat(card.style.top);
        const w = parseFloat(card.style.width) || card.offsetWidth || 0;
        const h = card.offsetHeight || 200;

        return {
            left: x,
            top: y,
            width: w,
            height: h,
            right: x + w,
            bottom: y + h,
            centerX: x + w / 2,
            centerY: y + h / 2
        };
    };

    app.getCardCenter = function getCardCenter(card) {
        const box = app.getCardBox(card);
        return { x: box.centerX, y: box.centerY };
    };

    app.getConnectionAnchors = function getConnectionAnchors(fromBox, toBox) {
        const dx = toBox.centerX - fromBox.centerX;
        const dy = toBox.centerY - fromBox.centerY;
        const horizontal = Math.abs(dx) >= Math.abs(dy);

        if (horizontal) {
            const fromX = dx >= 0 ? fromBox.right : fromBox.left;
            const toX = dx >= 0 ? toBox.left : toBox.right;

            return {
                orientation: 'horizontal',
                from: { x: fromX, y: fromBox.centerY },
                to: { x: toX, y: toBox.centerY }
            };
        }

        const fromY = dy >= 0 ? fromBox.bottom : fromBox.top;
        const toY = dy >= 0 ? toBox.top : toBox.bottom;

        return {
            orientation: 'vertical',
            from: { x: fromBox.centerX, y: fromY },
            to: { x: toBox.centerX, y: toY }
        };
    };

    app.createFlowPath = function createFlowPath(from, to, orientation) {
        const dx = to.x - from.x;
        const dy = to.y - from.y;

        if (orientation === 'vertical') {
            const curveY = Math.max(22, Math.min(72, Math.abs(dy) * 0.35));
            const c1y = from.y + (dy >= 0 ? curveY : -curveY);
            const c2y = to.y - (dy >= 0 ? curveY : -curveY);

            return `M ${from.x} ${from.y} C ${from.x} ${c1y}, ${to.x} ${c2y}, ${to.x} ${to.y}`;
        }

        const curveX = Math.max(28, Math.min(92, Math.abs(dx) * 0.32));
        const c1x = from.x + (dx >= 0 ? curveX : -curveX);
        const c2x = to.x - (dx >= 0 ? curveX : -curveX);

        return `M ${from.x} ${from.y} C ${c1x} ${from.y}, ${c2x} ${to.y}, ${to.x} ${to.y}`;
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
