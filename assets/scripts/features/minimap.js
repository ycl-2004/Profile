(function () {
    const app = window.PortfolioApp;
    const MOBILE_BP = 900;
    const MAP_PADDING = {
        canvas: 100,
        timeline: 24,
        list: 24
    };
    const MAP_TITLES = {
        canvas: 'Canvas Map',
        timeline: 'Timeline Map',
        list: 'List Map'
    };

    function clamp(value, min, max) {
        return Math.max(min, Math.min(max, value));
    }

    function getCurrentView() {
        return app.state.currentView || 'canvas';
    }

    function getCards() {
        return Array.from(document.querySelectorAll('.card'));
    }

    function getCardBounds(cards) {
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

        if (!isFinite(minX) || !isFinite(minY) || !isFinite(maxX) || !isFinite(maxY)) {
            return null;
        }

        return { minX, minY, maxX, maxY };
    }

    function getMinimapMetrics(minimapContent, bounds, padding = MAP_PADDING.canvas) {
        const mw = minimapContent ? minimapContent.clientWidth : 160;
        const mh = minimapContent ? minimapContent.clientHeight : 100;
        const boundsW = (bounds.maxX - bounds.minX) + padding * 2;
        const boundsH = (bounds.maxY - bounds.minY) + padding * 2;
        const minimapScale = Math.min(mw / Math.max(boundsW, 1), mh / Math.max(boundsH, 1));

        return {
            padding,
            minimapScale,
            offsetX: Math.max(0, (mw - boundsW * minimapScale) / 2),
            offsetY: Math.max(0, (mh - boundsH * minimapScale) / 2)
        };
    }

    function setBox(element, left, top, width, height) {
        element.style.left = left + 'px';
        element.style.top = top + 'px';
        element.style.width = Math.max(width, 1) + 'px';
        element.style.height = Math.max(height, 1) + 'px';
    }

    function setMinimapTitle(view) {
        const title = app.dom.minimapTitle || document.querySelector('.minimap-title');

        if (title) title.textContent = MAP_TITLES[view] || MAP_TITLES.canvas;
    }

    function resetMinimapContent(view, signature) {
        const minimapContent = app.dom.minimapContent;

        if (!minimapContent) return null;
        minimapContent.innerHTML = '';
        minimapContent.dataset.mapView = view;
        minimapContent.dataset.mapSignature = signature || '';
        setMinimapTitle(view);

        return minimapContent;
    }

    function ensureViewportIndicator(minimapContent) {
        let indicator = minimapContent.querySelector('#minimap-viewport');

        if (!indicator) {
            indicator = document.createElement('div');
            indicator.className = 'minimap-viewport';
            indicator.id = 'minimap-viewport';
            minimapContent.appendChild(indicator);
        }

        return indicator;
    }

    function getScrollableParts(view) {
        const shell = app.dom.portfolioViewShell;

        if (!shell) return null;
        const panel = shell.querySelector(`[data-view-panel="${view}"]`);

        if (!panel) return null;
        return { shell, panel };
    }

    function getScrollableBounds(shell, panel) {
        const width = Math.max(
            panel.scrollWidth || 0,
            panel.offsetWidth || 0,
            shell.scrollWidth || 0,
            shell.clientWidth || 0,
            1
        );
        const height = Math.max(
            panel.scrollHeight || 0,
            panel.offsetHeight || 0,
            shell.scrollHeight || 0,
            shell.clientHeight || 0,
            1
        );

        return { minX: 0, minY: 0, maxX: width, maxY: height };
    }

    function getElementPanelRect(panel, element) {
        const panelRect = panel.getBoundingClientRect();
        const rect = element.getBoundingClientRect();

        if (!rect.width || !rect.height) return null;

        return {
            x: rect.left - panelRect.left,
            y: rect.top - panelRect.top,
            width: rect.width,
            height: rect.height
        };
    }

    function getMappedBounds(shell, panel, elements) {
        const bounds = getScrollableBounds(shell, panel);

        elements.forEach((element) => {
            if (!element) return;
            const rect = getElementPanelRect(panel, element);

            if (!rect) return;
            bounds.minX = Math.min(bounds.minX, rect.x);
            bounds.minY = Math.min(bounds.minY, rect.y);
            bounds.maxX = Math.max(bounds.maxX, rect.x + rect.width);
            bounds.maxY = Math.max(bounds.maxY, rect.y + rect.height);
        });

        return bounds;
    }

    function appendMappedElement(minimapContent, panel, bounds, metrics, element, className) {
        const rect = getElementPanelRect(panel, element);

        if (!rect) return null;
        const node = document.createElement('div');
        const activeLayer = app.state.activeLayer || '__all__';

        node.className = className;
        if (
            activeLayer !== '__all__' &&
            element.dataset.portfolioLayer &&
            element.dataset.portfolioLayer !== activeLayer
        ) {
            node.classList.add('is-dimmed');
        }

        setBox(
            node,
            metrics.offsetX + (rect.x - bounds.minX + metrics.padding) * metrics.minimapScale,
            metrics.offsetY + (rect.y - bounds.minY + metrics.padding) * metrics.minimapScale,
            rect.width * metrics.minimapScale,
            rect.height * metrics.minimapScale
        );
        minimapContent.appendChild(node);

        return node;
    }

    function getCanvasSignature() {
        const activeLayer = app.state.activeLayer || '__all__';
        const mode = app.state.viewportMode || '';

        return [
            'canvas',
            activeLayer,
            mode,
            getCards().map((card) => [
                card.dataset.card,
                card.dataset.layer,
                card.style.left,
                card.style.top,
                card.style.width,
                card.offsetHeight
            ].join(':')).join('|')
        ].join('::');
    }

    function getScrollableSignature(view) {
        const parts = getScrollableParts(view);
        const state = app.state;

        if (!parts) return `${view}::empty`;
        return [
            view,
            state.activeLayer || '__all__',
            state.listQuery || '',
            state.listCategory || '__all__',
            state.listType || '__all__',
            state.listSort || '',
            parts.shell.clientWidth,
            parts.shell.clientHeight,
            parts.panel.scrollWidth,
            parts.panel.scrollHeight,
            parts.panel.querySelectorAll('[data-card-ref], .journey-column, .portfolio-row, .portfolio-empty-row').length
        ].join('::');
    }

    function getMinimapSignature(view) {
        if (view === 'timeline' || view === 'list') return getScrollableSignature(view);
        return getCanvasSignature();
    }

    function renderCanvasMinimap(signature) {
        const minimapContent = resetMinimapContent('canvas', signature);

        if (!minimapContent) return;
        const cards = getCards();
        const bounds = getCardBounds(cards);

        if (!bounds) {
            ensureViewportIndicator(minimapContent).hidden = true;
            return;
        }

        const metrics = getMinimapMetrics(minimapContent, bounds, MAP_PADDING.canvas);
        const activeLayer = app.state.activeLayer || '__all__';

        cards.forEach((card) => {
            const x = (parseFloat(card.style.left) || 0) - bounds.minX + metrics.padding;
            const y = (parseFloat(card.style.top) || 0) - bounds.minY + metrics.padding;
            const w = parseFloat(card.style.width) || card.offsetWidth || 0;
            const h = card.offsetHeight || 200;
            const div = document.createElement('div');

            div.className = 'minimap-card minimap-canvas-card';
            if (activeLayer !== '__all__') {
                div.classList.toggle('is-active-layer', card.dataset.layer === activeLayer);
                div.classList.toggle('is-dimmed', card.dataset.layer !== activeLayer);
            }
            setBox(
                div,
                metrics.offsetX + x * metrics.minimapScale,
                metrics.offsetY + y * metrics.minimapScale,
                w * metrics.minimapScale,
                h * metrics.minimapScale
            );

            minimapContent.appendChild(div);
        });

        ensureViewportIndicator(minimapContent).hidden = false;
    }

    function renderTimelineMinimap(signature) {
        const minimapContent = resetMinimapContent('timeline', signature);
        const parts = getScrollableParts('timeline');

        if (!minimapContent) return;
        if (!parts) {
            ensureViewportIndicator(minimapContent).hidden = true;
            return;
        }

        const rail = parts.panel.querySelector('.timeline-rail');
        const columns = Array.from(parts.panel.querySelectorAll('.journey-column:not([hidden])'));
        const items = Array.from(
            parts.panel.querySelectorAll('.journey-column-card:not([hidden]), .timeline-item-card:not([hidden]), .timeline-next-focus:not([hidden])')
        );
        const bounds = getMappedBounds(parts.shell, parts.panel, [rail, ...columns, ...items]);
        const metrics = getMinimapMetrics(minimapContent, bounds, MAP_PADDING.timeline);

        if (rail) {
            appendMappedElement(minimapContent, parts.panel, bounds, metrics, rail, 'minimap-rail');
        }

        columns.forEach((column) => {
            appendMappedElement(minimapContent, parts.panel, bounds, metrics, column, 'minimap-timeline-column');
        });

        items.forEach((item) => {
            appendMappedElement(minimapContent, parts.panel, bounds, metrics, item, 'minimap-timeline-item');
        });

        ensureViewportIndicator(minimapContent).hidden = false;
    }

    function renderListMinimap(signature) {
        const minimapContent = resetMinimapContent('list', signature);
        const parts = getScrollableParts('list');

        if (!minimapContent) return;
        if (!parts) {
            ensureViewportIndicator(minimapContent).hidden = true;
            return;
        }

        const toolbars = Array.from(parts.panel.querySelectorAll('.list-toolbar'));
        const rows = Array.from(parts.panel.querySelectorAll('.portfolio-row, .portfolio-empty-row'));
        const bounds = getMappedBounds(parts.shell, parts.panel, [...toolbars, ...rows]);
        const metrics = getMinimapMetrics(minimapContent, bounds, MAP_PADDING.list);

        toolbars.forEach((toolbar) => {
            appendMappedElement(minimapContent, parts.panel, bounds, metrics, toolbar, 'minimap-list-toolbar');
        });

        rows.forEach((row) => {
            appendMappedElement(minimapContent, parts.panel, bounds, metrics, row, 'minimap-list-row');
        });

        ensureViewportIndicator(minimapContent).hidden = false;
    }

    function renderMinimap(view, signature) {
        if (view === 'timeline') {
            renderTimelineMinimap(signature);
            return;
        }

        if (view === 'list') {
            renderListMinimap(signature);
            return;
        }

        renderCanvasMinimap(signature);
    }

    function updateCanvasViewport() {
        const minimapContent = app.dom.minimapContent;
        const indicator = minimapContent && minimapContent.querySelector('#minimap-viewport');

        if (!indicator) return;
        const cards = getCards();
        const bounds = getCardBounds(cards);

        if (!bounds || !app.state.scale) return;

        const metrics = getMinimapMetrics(minimapContent, bounds, MAP_PADDING.canvas);
        const state = app.state;

        const sidebar = document.querySelector('.sidebar');
        const topBar = document.querySelector('.top-bar');
        const sidebarVisible =
            !!sidebar &&
            (!window.matchMedia(`(max-width:${MOBILE_BP}px)`).matches || document.body.classList.contains('sidebar-open'));
        const safeLeft = sidebarVisible ? sidebar.offsetWidth : 0;
        const safeTop = topBar ? topBar.offsetHeight : 0;
        const safeW = Math.max(0, window.innerWidth - safeLeft);
        const safeH = Math.max(0, window.innerHeight - safeTop);

        const worldLeft = (safeLeft - state.panX) / state.scale;
        const worldTop = (safeTop - state.panY) / state.scale;

        indicator.hidden = false;
        setBox(
            indicator,
            metrics.offsetX + (worldLeft - bounds.minX + metrics.padding) * metrics.minimapScale,
            metrics.offsetY + (worldTop - bounds.minY + metrics.padding) * metrics.minimapScale,
            (safeW / state.scale) * metrics.minimapScale,
            (safeH / state.scale) * metrics.minimapScale
        );
    }

    function updateScrollableViewport(view) {
        const minimapContent = app.dom.minimapContent;
        const indicator = minimapContent && minimapContent.querySelector('#minimap-viewport');
        const parts = getScrollableParts(view);

        if (!indicator) return;
        if (!parts) {
            indicator.hidden = true;
            return;
        }

        const elements = view === 'timeline'
            ? [
                parts.panel.querySelector('.timeline-rail'),
                ...parts.panel.querySelectorAll('.journey-column:not([hidden])'),
                ...parts.panel.querySelectorAll('.journey-column-card:not([hidden]), .timeline-item-card:not([hidden]), .timeline-next-focus:not([hidden])')
            ]
            : [
                ...parts.panel.querySelectorAll('.list-toolbar'),
                ...parts.panel.querySelectorAll('.portfolio-row, .portfolio-empty-row')
            ];
        const bounds = getMappedBounds(parts.shell, parts.panel, elements);
        const metrics = getMinimapMetrics(minimapContent, bounds, MAP_PADDING[view] || MAP_PADDING.list);
        const contentWidth = bounds.maxX - bounds.minX;
        const contentHeight = bounds.maxY - bounds.minY;
        const viewportWidth = Math.min(parts.shell.clientWidth, contentWidth);
        const viewportHeight = Math.min(parts.shell.clientHeight, contentHeight);

        indicator.hidden = false;
        setBox(
            indicator,
            metrics.offsetX + (clamp(parts.shell.scrollLeft, 0, contentWidth) - bounds.minX + metrics.padding) * metrics.minimapScale,
            metrics.offsetY + (clamp(parts.shell.scrollTop, 0, contentHeight) - bounds.minY + metrics.padding) * metrics.minimapScale,
            viewportWidth * metrics.minimapScale,
            viewportHeight * metrics.minimapScale
        );
    }

    app.initMinimap = function initMinimap() {
        const shell = app.dom.portfolioViewShell;

        if (shell && !shell.dataset.minimapScrollBound) {
            shell.addEventListener('scroll', () => app.updateMinimap(), { passive: true });
            shell.dataset.minimapScrollBound = 'true';
        }

        app.updateMinimap({ forceRender: true });
    };

    app.updateMinimap = function updateMinimap(options = {}) {
        const minimapContent = app.dom.minimapContent;

        if (!minimapContent) return;
        const view = getCurrentView();
        const signature = getMinimapSignature(view);
        const forceRender = options === true || !!options.forceRender;

        if (
            forceRender ||
            minimapContent.dataset.mapView !== view ||
            minimapContent.dataset.mapSignature !== signature ||
            !minimapContent.querySelector('#minimap-viewport')
        ) {
            renderMinimap(view, signature);
        } else {
            setMinimapTitle(view);
        }

        if (view === 'timeline' || view === 'list') {
            updateScrollableViewport(view);
            return;
        }

        updateCanvasViewport();
    };
})();
