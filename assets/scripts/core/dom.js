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
            shareButton: document.getElementById('share-action'),
            sharePanel: document.getElementById('share-panel'),
            shareStatus: document.getElementById('share-status'),
            ycLogicButton: document.getElementById('yc-logic-action'),
            settingsButton: document.getElementById('settings-action'),
            settingsPanel: document.getElementById('settings-panel'),
            zoomLevelEl: document.getElementById('zoom-level'),
            zoomInButton: document.getElementById('zoom-in'),
            zoomOutButton: document.getElementById('zoom-out'),
            zoomFitButton: document.getElementById('zoom-fit'),
            canvasToolButtons: document.querySelectorAll('[data-canvas-tool]'),
            canvasToolStatus: document.getElementById('canvas-tool-status'),
            minimapContent: document.getElementById('minimap-content'),
            minimapTitle: document.querySelector('.minimap-title'),
            modalOverlay: document.getElementById('modal-overlay'),
            modal: document.getElementById('modal'),
            modalTitle: document.getElementById('modal-title'),
            modalSubtitle: document.getElementById('modal-subtitle'),
            modalBody: document.getElementById('modal-body'),
            modalTags: document.getElementById('modal-tags'),
            modalAvatar: document.getElementById('modal-avatar'),
            modalCloseButton: document.getElementById('modal-close')
        };
    };
})();
