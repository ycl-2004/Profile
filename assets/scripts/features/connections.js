(function () {
    const app = window.PortfolioApp;

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
        const svg = document.getElementById('connections');

        if (!svg) return;

        let svgHTML = app.templates.connectionMarker;

        app.data.connections.forEach(([from, to]) => {
            const fromCard = document.querySelector(`[data-card="${from}"]`);
            const toCard = document.querySelector(`[data-card="${to}"]`);

            if (fromCard && toCard) {
                const fromCenter = app.getCardCenter(fromCard);
                const toCenter = app.getCardCenter(toCard);

                svgHTML += `<path d="${app.createCurvedPath(fromCenter, toCenter)}" marker-end="url(#arrow)" />`;
            }
        });

        svg.innerHTML = svgHTML;
    };
})();
