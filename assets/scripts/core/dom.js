(function () {
    const app = window.PortfolioApp;

    app.cacheDom = function cacheDom() {
        app.dom = {
            terminalEntry: document.getElementById('terminal-entry'),
            viewport: document.getElementById('canvas-viewport'),
            portfolioViewShell: document.getElementById('portfolio-view-shell'),
            viewTitle: document.querySelector('.canvas-view-title'),
            viewSubtitle: document.querySelector('.canvas-view-subtitle'),
            viewTabs: document.querySelectorAll('[data-view-target]'),
            zoomLevelEl: document.getElementById('zoom-level'),
            zoomInButton: document.getElementById('zoom-in'),
            zoomOutButton: document.getElementById('zoom-out'),
            zoomFitButton: document.getElementById('zoom-fit'),
            minimapContent: document.getElementById('minimap-content'),
            minimapTitle: document.querySelector('.minimap-title'),
            modalOverlay: document.getElementById('modal-overlay'),
            modalTitle: document.getElementById('modal-title'),
            modalSubtitle: document.getElementById('modal-subtitle'),
            modalBody: document.getElementById('modal-body'),
            modalTags: document.getElementById('modal-tags'),
            modalAvatar: document.getElementById('modal-avatar'),
            modalCloseButton: document.getElementById('modal-close')
        };
    };
})();
