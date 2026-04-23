(function () {
    const app = window.PortfolioApp;

    app.templates.connectionMarker = '<defs><marker id="arrow" markerWidth="10" markerHeight="10" refX="9" refY="3" orient="auto" markerUnits="strokeWidth"><path d="M0,0 L0,6 L9,3 z" fill="#ff8fab" opacity="0.5"/></marker></defs>';
    app.templates.connectionsSvg = `<svg class="connections" id="connections">${app.templates.connectionMarker}</svg>`;
})();
