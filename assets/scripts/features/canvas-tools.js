(function () {
    const app = window.PortfolioApp;

    const TOOL_STATUS = {
        select: 'Canvas signals cleared',
        overview: 'Overview restored',
        search: 'Search view ready',
        details: 'Opening selected detail'
    };

    function getToolButtons() {
        return Array.from(app.dom?.canvasToolButtons || document.querySelectorAll('[data-canvas-tool]'));
    }

    function getCard(cardId) {
        if (!cardId) return null;
        return document.querySelector(`[data-card="${cardId}"], [data-card-ref="${cardId}"]`);
    }

    function getSelectedCardId() {
        const selectedId = app.state.selectedCardId;
        const focusedId = app.state.lastFocusedCardId;

        if (selectedId && app.data.modalData?.[selectedId]) return selectedId;
        if (focusedId && app.data.modalData?.[focusedId]) return focusedId;
        return null;
    }

    function setActiveTool(tool) {
        app.state.activeCanvasTool = tool;

        getToolButtons().forEach((button) => {
            const isActive = button.dataset.canvasTool === tool;
            button.classList.toggle('is-active', isActive);
            button.setAttribute('aria-pressed', String(isActive));
        });
    }

    function setSelectedCard(cardId) {
        app.state.selectedCardId = cardId || null;
        if (cardId) app.state.lastFocusedCardId = cardId;

        document.querySelectorAll('.card, [data-card-ref]').forEach((card) => {
            const id = card.dataset.card || card.dataset.cardRef;
            card.classList.toggle('is-tool-selected', !!cardId && id === cardId);
        });

        if (typeof app.setConnectionFocus === 'function') app.setConnectionFocus(cardId || null);
    }

    function focusCanvasCard(cardId) {
        if (!cardId) return null;
        if (app.state.currentView !== 'canvas' && typeof app.setPortfolioView === 'function') {
            app.setPortfolioView('canvas');
        }

        const card = getCard(cardId);
        if (!card) return null;

        setSelectedCard(cardId);
        if (typeof app.centerCanvasCard === 'function') app.centerCanvasCard(cardId);

        const title = card.querySelector('.project-name, .card-heading, .mini-card-title')?.textContent?.trim() || cardId;
        announce(`Focused: ${title}`, 'select');
        focusCardWhenVisible(card);

        return card;
    }

    function focusCardWhenVisible(card, attempt = 0) {
        const style = window.getComputedStyle(card);
        const isVisible = style.visibility !== 'hidden' && Number(style.opacity) > 0;

        if (isVisible) {
            card.focus({ preventScroll: true });
            return;
        }

        if (attempt < 120) {
            window.requestAnimationFrame(() => focusCardWhenVisible(card, attempt + 1));
        }
    }

    app.focusCanvasCard = focusCanvasCard;

    function announce(message, tool) {
        const status = app.dom?.canvasToolStatus;
        if (!status) return;

        status.textContent = message;
        status.classList.add('is-visible');

        if (typeof app.animateCanvasToolStatus === 'function') {
            app.animateCanvasToolStatus(status, tool);
        }

        clearTimeout(app.state.canvasToolStatusTimer);
        app.state.canvasToolStatusTimer = setTimeout(() => {
            status.classList.remove('is-visible');
        }, 1500);
    }

    function clearCanvasSignals(options = {}) {
        setSelectedCard(null);
        if (typeof app.setConnectionFocus === 'function') app.setConnectionFocus(null);
        if (typeof app.stopActiveConnectionFlow === 'function') app.stopActiveConnectionFlow();
        if (!options.silent) announce(TOOL_STATUS.select, 'select');
    }

    function restoreOverview() {
        clearCanvasSignals({ silent: true });
        if (typeof app.setPortfolioView === 'function') app.setPortfolioView('canvas');
        if (typeof app.applyDefaultLayout === 'function') app.applyDefaultLayout();
        if (typeof app.zoomToOverview === 'function') app.zoomToOverview();
        if (typeof app.updateConnections === 'function') app.updateConnections();
        if (typeof app.updateMinimap === 'function') app.updateMinimap({ forceRender: true });
        announce(TOOL_STATUS.overview, 'overview');
    }

    function openSearchView() {
        if (typeof app.setPortfolioView === 'function') app.setPortfolioView('list');
        if (typeof app.renderActivePortfolioView === 'function') app.renderActivePortfolioView('search');
        announce(TOOL_STATUS.search, 'search');
    }

    function openSelectedDetails() {
        const cardId = getSelectedCardId();

        if (!cardId) {
            announce('Select a card first', 'details');
            if (typeof app.animateCanvasToolNeedsSelection === 'function') {
                app.animateCanvasToolNeedsSelection();
            }
            return;
        }

        setSelectedCard(cardId);
        if (typeof app.setConnectionFocus === 'function') app.setConnectionFocus(cardId);
        app.openModal(cardId);
        announce(TOOL_STATUS.details, 'details');
    }

    function handleToolAction(tool, button) {
        setActiveTool(tool);

        if (typeof app.animateCanvasToolPress === 'function') {
            app.animateCanvasToolPress(button, tool);
        }

        if (tool === 'select') clearCanvasSignals();
        if (tool === 'overview') restoreOverview();
        if (tool === 'search') openSearchView();
        if (tool === 'details') openSelectedDetails();
    }

    function bindCardMemory() {
        document.querySelectorAll('.card').forEach((card) => {
            const cardId = card.dataset.card;
            if (!cardId || card.dataset.toolMemoryBound === 'true') return;
            const hasDetails = !!app.data.modalData?.[cardId];
            const hasNestedAction = !!card.querySelector('a, button');

            card.dataset.toolMemoryBound = 'true';
            if (!hasDetails || hasNestedAction) {
                card.removeAttribute('tabindex');
                return;
            }

            if (!card.hasAttribute('tabindex')) card.tabIndex = 0;
            card.setAttribute('role', 'button');
            card.setAttribute('aria-label', `Open details for ${card.querySelector('.project-name, .card-heading, .mini-card-title')?.textContent?.trim() || cardId}`);

            card.addEventListener('pointerenter', () => {
                app.state.lastFocusedCardId = cardId;
            });

            card.addEventListener('focus', () => {
                app.state.lastFocusedCardId = cardId;
                if (typeof app.setConnectionFocus === 'function') app.setConnectionFocus(cardId);
            });

            card.addEventListener('blur', () => {
                if (!app.state.selectedCardId && typeof app.setConnectionFocus === 'function') {
                    app.setConnectionFocus(null);
                }
            });

            card.addEventListener('click', (event) => {
                if (event.target.closest('a, button')) return;
                if (app.state.justDraggedCardId === cardId) return;
                setSelectedCard(cardId);
            });

            card.addEventListener('keydown', (event) => {
                if (event.key !== 'Enter' && event.key !== ' ') return;
                event.preventDefault();
                setSelectedCard(cardId);
                app.openModal(cardId);
            });
        });
    }

    app.bindCanvasTools = function bindCanvasTools() {
        bindCardMemory();
        setActiveTool(app.state.activeCanvasTool || 'select');

        getToolButtons().forEach((button) => {
            if (button.dataset.toolBound === 'true') return;
            button.dataset.toolBound = 'true';
            button.addEventListener('click', () => {
                handleToolAction(button.dataset.canvasTool, button);
            });
        });
    };
})();
