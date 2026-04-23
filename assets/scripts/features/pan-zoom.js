(function () {
    const app = window.PortfolioApp;
    const MOBILE_BP = 900;
    const PHONE_BP = 768;
    const TABLET_BP = 1365;

    function clamp(value, min, max) {
        return Math.max(min, Math.min(max, value));
    }

    function getViewportMode() {
        const width = window.innerWidth;

        if (width < PHONE_BP) return 'phone';
        if (width < TABLET_BP) return 'tablet';
        return 'desktop';
    }

    function getBoundsPadding() {
        const mode = getViewportMode();

        if (mode === 'phone') return 48;
        if (mode === 'tablet') return 96;
        return 160;
    }

    function getSafeArea() {
        const sidebar = document.querySelector('.sidebar');
        const topBar = document.querySelector('.top-bar');

        // 手机/平板：sidebar 可能是抽屉（关闭时不应占用 safe-area）
        const sidebarVisible =
            !!sidebar &&
            (!window.matchMedia(`(max-width:${MOBILE_BP}px)`).matches || document.body.classList.contains('sidebar-open'));

        const left = sidebarVisible ? sidebar.offsetWidth : 0;
        const top = topBar ? topBar.offsetHeight : 0;
        const right = window.innerWidth;
        const bottom = window.innerHeight;

        return {
            left,
            top,
            right,
            bottom,
            width: Math.max(0, right - left),
            height: Math.max(0, bottom - top)
        };
    }

    function getContentBounds() {
        const cards = document.querySelectorAll('.card');
        let minX = Infinity;
        let minY = Infinity;
        let maxX = -Infinity;
        let maxY = -Infinity;

        cards.forEach((card) => {
            const x = parseFloat(card.style.left) || 0;
            const y = parseFloat(card.style.top) || 0;
            const w = parseFloat(card.style.width) || card.offsetWidth || 0;
            const h = card.offsetHeight || 0;

            minX = Math.min(minX, x);
            minY = Math.min(minY, y);
            maxX = Math.max(maxX, x + w);
            maxY = Math.max(maxY, y + h);
        });

        if (!isFinite(minX) || !isFinite(minY) || !isFinite(maxX) || !isFinite(maxY)) {
            return { minX: 0, minY: 0, maxX: 0, maxY: 0, width: 0, height: 0 };
        }

        // 给内容边界加一点缓冲，避免紧贴边缘显得“卡住”
        const padding = getBoundsPadding();
        minX -= padding;
        minY -= padding;
        maxX += padding;
        maxY += padding;

        return { minX, minY, maxX, maxY, width: maxX - minX, height: maxY - minY };
    }

    // 暴露给其它模块（用于默认进入时固定缩放并居中）
    app.getSafeArea = getSafeArea;
    app.getContentBounds = getContentBounds;

    app.constrainView = function constrainView() {
        const state = app.state;
        const safe = getSafeArea();
        const bounds = getContentBounds();
        const mode = getViewportMode();

        const minOverlapX = mode === 'phone'
            ? clamp(safe.width * 0.18, 64, 112)
            : mode === 'tablet'
                ? clamp(safe.width * 0.18, 80, 148)
                : 180;

        const minOverlapY = mode === 'phone'
            ? clamp(safe.height * 0.12, 72, 120)
            : mode === 'tablet'
                ? clamp(safe.height * 0.14, 84, 150)
                : 180;

        const minPanX = (safe.left + minOverlapX) - bounds.maxX * state.scale;
        const maxPanX = (safe.right - minOverlapX) - bounds.minX * state.scale;
        const minPanY = (safe.top + minOverlapY) - bounds.maxY * state.scale;
        const maxPanY = (safe.bottom - minOverlapY) - bounds.minY * state.scale;

        if (minPanX > maxPanX) {
            state.panX = (minPanX + maxPanX) / 2;
        } else {
            state.panX = clamp(state.panX, minPanX, maxPanX);
        }

        if (minPanY > maxPanY) {
            state.panY = (minPanY + maxPanY) / 2;
        } else {
            state.panY = clamp(state.panY, minPanY, maxPanY);
        }
    };

    app.zoomToFit = function zoomToFit() {
        const state = app.state;
        const safe = getSafeArea();
        const bounds = getContentBounds();
        const mode = getViewportMode();
        const padding = mode === 'phone' ? 20 : mode === 'tablet' ? 40 : 80;
        const targetW = Math.max(1, safe.width - padding * 2);
        const targetH = Math.max(1, safe.height - padding * 2);
        const scaleX = bounds.width ? targetW / bounds.width : 1;
        const scaleY = bounds.height ? targetH / bounds.height : 1;

        state.scale = clamp(Math.min(scaleX, scaleY), mode === 'phone' ? 0.45 : 0.3, 3);

        // 让内容在可视区域居中
        state.panX = safe.left + (safe.width - bounds.width * state.scale) / 2 - bounds.minX * state.scale;
        state.panY = safe.top + (safe.height - bounds.height * state.scale) / 2 - bounds.minY * state.scale;

        app.constrainView();
        app.updateTransform();
    };

    // 固定缩放比例并居中到内容（用于“首次进入默认 52%”）
    app.zoomToScale = function zoomToScale(targetScale) {
        const state = app.state;
        const safe = getSafeArea();
        const bounds = getContentBounds();

        state.scale = clamp(targetScale, 0.3, 3);
        state.panX = safe.left + (safe.width - bounds.width * state.scale) / 2 - bounds.minX * state.scale;
        state.panY = safe.top + (safe.height - bounds.height * state.scale) / 2 - bounds.minY * state.scale;

        app.constrainView();
        app.updateTransform();
    };

    app.updateTransform = function updateTransform() {
        const state = app.state;

        app.constrainView();
        app.dom.viewport.style.transform = `translate(${state.panX}px,${state.panY}px) scale(${state.scale})`;
        app.dom.zoomLevelEl.textContent = Math.round(state.scale * 100) + '%';
        app.updateMinimap();
    };

    app.bindPanZoom = function bindPanZoom() {
        document.addEventListener('mousedown', (event) => {
            if (
                event.button === 1 ||
                (event.button === 0 &&
                    event.target.closest('#canvas-app') &&
                    !event.target.closest('.card') &&
                    !event.target.closest('.sidebar') &&
                    !event.target.closest('.sidebar-scrim') &&
                    !event.target.closest('.top-bar'))
            ) {
                app.state.isPanning = true;
                app.state.startX = event.clientX - app.state.panX;
                app.state.startY = event.clientY - app.state.panY;
                event.preventDefault();
            }
        });

        document.addEventListener('mousemove', (event) => {
            if (app.state.isPanning) {
                app.state.panX = event.clientX - app.state.startX;
                app.state.panY = event.clientY - app.state.startY;
                app.updateTransform();
            }
        });

        document.addEventListener('mouseup', () => {
            app.state.isPanning = false;
        });

        document.addEventListener('wheel', (event) => {
            if (event.ctrlKey || event.metaKey) {
                event.preventDefault();

                const delta = event.deltaY > 0 ? 0.9 : 1.1;
                const newScale = Math.max(0.3, Math.min(3, app.state.scale * delta));
                // 以鼠标指向的“世界坐标点”为中心缩放（更准确，不会越放越飘）
                const worldX = (event.clientX - app.state.panX) / app.state.scale;
                const worldY = (event.clientY - app.state.panY) / app.state.scale;

                app.state.scale = newScale;
                app.state.panX = event.clientX - worldX * newScale;
                app.state.panY = event.clientY - worldY * newScale;
                app.updateTransform();
            }
        }, { passive: false });

        // --- Touch support (手机/平板)：单指拖拽平移；双指捏合缩放
        let touchMode = null; // 'pan' | 'pinch'
        let pinchStartDist = 0;
        let pinchStartScale = 1;
        let pinchWorldX = 0;
        let pinchWorldY = 0;

        function getTouchDist(t1, t2) {
            const dx = t2.clientX - t1.clientX;
            const dy = t2.clientY - t1.clientY;
            return Math.hypot(dx, dy);
        }

        function getTouchMid(t1, t2) {
            return {
                x: (t1.clientX + t2.clientX) / 2,
                y: (t1.clientY + t2.clientY) / 2
            };
        }

        document.addEventListener(
            'touchstart',
            (event) => {
                const t = event.touches;
                const target = event.target;

                if (!target.closest('#canvas-app')) return;
                if (target.closest('.sidebar') || target.closest('.sidebar-scrim') || target.closest('.top-bar')) return;
                if (target.closest('.card')) return;

                if (t.length === 1) {
                    touchMode = 'pan';
                    app.state.isPanning = true;
                    app.state.startX = t[0].clientX - app.state.panX;
                    app.state.startY = t[0].clientY - app.state.panY;
                    event.preventDefault();
                } else if (t.length >= 2) {
                    touchMode = 'pinch';
                    app.state.isPanning = false;
                    pinchStartDist = getTouchDist(t[0], t[1]);
                    pinchStartScale = app.state.scale;

                    const mid = getTouchMid(t[0], t[1]);
                    pinchWorldX = (mid.x - app.state.panX) / app.state.scale;
                    pinchWorldY = (mid.y - app.state.panY) / app.state.scale;
                    event.preventDefault();
                }
            },
            { passive: false }
        );

        document.addEventListener(
            'touchmove',
            (event) => {
                const t = event.touches;

                if (touchMode === 'pan' && t.length === 1 && app.state.isPanning) {
                    app.state.panX = t[0].clientX - app.state.startX;
                    app.state.panY = t[0].clientY - app.state.startY;
                    app.updateTransform();
                    event.preventDefault();
                } else if (touchMode === 'pinch' && t.length >= 2) {
                    const dist = getTouchDist(t[0], t[1]);
                    const ratio = pinchStartDist ? dist / pinchStartDist : 1;
                    const newScale = clamp(pinchStartScale * ratio, 0.3, 3);

                    const mid = getTouchMid(t[0], t[1]);
                    app.state.scale = newScale;
                    app.state.panX = mid.x - pinchWorldX * newScale;
                    app.state.panY = mid.y - pinchWorldY * newScale;
                    app.updateTransform();
                    event.preventDefault();
                }
            },
            { passive: false }
        );

        document.addEventListener(
            'touchend',
            () => {
                if (touchMode === 'pan') app.state.isPanning = false;
                if (touchMode === 'pinch') app.state.isPanning = false;
                touchMode = null;
            },
            { passive: true }
        );

        app.dom.zoomInButton.addEventListener('click', () => {
            app.state.scale = Math.min(3, app.state.scale * 1.2);
            app.updateTransform();
        });

        app.dom.zoomOutButton.addEventListener('click', () => {
            app.state.scale = Math.max(0.3, app.state.scale / 1.2);
            app.updateTransform();
        });

        app.dom.zoomFitButton.addEventListener('click', () => {
            app.zoomToFit();
        });
    };
})();
