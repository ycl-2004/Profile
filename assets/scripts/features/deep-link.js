(function () {
    const app = window.PortfolioApp;

    function isLinkableCard(cardId) {
        return !!(cardId && app.data.modalData?.[cardId]);
    }

    function readHash() {
        const raw = (window.location.hash || '').replace(/^#/, '');
        if (!raw) return null;

        let decoded = raw;
        try {
            decoded = decodeURIComponent(raw);
        } catch {
            // A malformed hash is simply not a card reference.
        }

        return isLinkableCard(decoded) ? decoded : null;
    }

    app.getDeepLinkTarget = readHash;

    app.getCardPermalink = function getCardPermalink(cardId) {
        const base = `${window.location.origin}${window.location.pathname}${window.location.search}`;
        return isLinkableCard(cardId) ? `${base}#${encodeURIComponent(cardId)}` : base;
    };

    /*
     * One history entry per "a card is open" session: the first open pushes, later
     * opens replace, and closing rewinds only the entry this session created — a
     * visitor landing directly on #card-id must not be sent off the site by Back.
     */
    app.writeDeepLink = function writeDeepLink(cardId) {
        const next = isLinkableCard(cardId) ? `#${encodeURIComponent(cardId)}` : '';
        if (window.location.hash === next) return;

        const url = `${window.location.pathname}${window.location.search}${next}`;

        if (next) {
            if (app.state.deepLinkPushed) {
                window.history.replaceState({ card: cardId }, '', url);
            } else {
                window.history.pushState({ card: cardId }, '', url);
                app.state.deepLinkPushed = true;
            }
            return;
        }

        if (app.state.deepLinkPushed) {
            app.state.deepLinkPushed = false;
            window.history.back();
            return;
        }

        window.history.replaceState(null, '', url);
    };

    function syncFromHistory() {
        const target = readHash();
        const open = app.state.openModalCardId || null;

        if (target === open) return;

        // We arrived here through the history stack, so we own no entry of our own.
        app.state.deepLinkPushed = false;

        if (target) {
            // A hash can change before the visitor has left the entry screen; the
            // canvas has to come up first or the card opens behind it.
            const entry = app.dom?.terminalEntry;
            if (entry && !entry.classList.contains('hidden')) {
                app.enterCanvas({ targetCardId: target, openDetails: true, immediate: true });
                return;
            }

            if (app.state.currentView === 'canvas' && typeof app.focusCanvasCard === 'function') {
                app.focusCanvasCard(target);
            }
            app.openModal(target, { fromHistory: true });
            return;
        }

        if (open) {
            app.state.modalHistorySync = true;
            if (typeof app.closeModal === 'function') app.closeModal();
            else app.finalizeModalClose();
        }
    }

    app.bindDeepLinks = function bindDeepLinks() {
        if (app.state.deepLinkBound) return;
        app.state.deepLinkBound = true;

        window.addEventListener('popstate', syncFromHistory);
        window.addEventListener('hashchange', syncFromHistory);
    };
})();
