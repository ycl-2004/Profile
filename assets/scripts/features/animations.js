(function () {
    const app = window.PortfolioApp;
    const gsap = window.gsap;
    const reducedMotionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');

    function motionIsReduced() {
        return reducedMotionQuery.matches || document.body.dataset.motion === 'reduced';
    }

    function canAnimate() {
        return !!gsap && !motionIsReduced();
    }

    function toArray(selector, scope) {
        if (gsap) return gsap.utils.toArray(selector, scope || document);
        return Array.from((scope || document).querySelectorAll(selector));
    }

    function getCardSource(cardId) {
        return document.querySelector(`[data-card="${cardId}"], [data-card-ref="${cardId}"]`);
    }

    function getElementCenter(element) {
        const rect = element.getBoundingClientRect();
        return {
            x: rect.left + rect.width / 2,
            y: rect.top + rect.height / 2
        };
    }

    function getBaseConnectionPaths() {
        return toArray('svg.connections path[data-from][data-to]:not(.motion-flow-path)');
    }

    function getConnectionKey(path) {
        return `${path.dataset.from}__${path.dataset.to}`;
    }

    function getMotionDash(path, active) {
        const lane = path.dataset.lane || '';
        const kind = path.dataset.kind || '';

        if (active) return lane === 'project' || lane === 'core' ? '22 12' : '16 9';
        if (lane === 'project' || lane === 'core') return '18 34';
        if (lane === 'outreach') return '16 12 3 12';
        if (lane === 'spine') return '14 24';
        if (kind === 'secondary' || lane === 'support') return '4 13';
        return '12 18';
    }

    app.ensureMotionConnectionOverlays = function ensureMotionConnectionOverlays() {
        const svg = document.getElementById('connections');
        if (!svg || !canAnimate()) return [];

        const basePaths = getBaseConnectionPaths();
        const baseKeys = new Set(basePaths.map(getConnectionKey));
        const overlays = app.state.motionConnectionOverlays || new Map();

        overlays.forEach((overlay, key) => {
            if (!baseKeys.has(key)) {
                overlay.remove();
                overlays.delete(key);
            }
        });

        basePaths.forEach((path) => {
            const key = getConnectionKey(path);
            let overlay = overlays.get(key);

            if (!overlay) {
                overlay = path.cloneNode(false);
                overlay.removeAttribute('id');
                overlay.classList.add('motion-flow-path');
                overlay.dataset.motionSource = key;
                overlay.setAttribute('aria-hidden', 'true');
                svg.appendChild(overlay);
                overlays.set(key, overlay);
            }

            overlay.dataset.from = path.dataset.from;
            overlay.dataset.to = path.dataset.to;
            overlay.dataset.kind = path.dataset.kind || '';
            overlay.dataset.lane = path.dataset.lane || '';
            overlay.setAttribute('d', path.getAttribute('d') || '');
            overlay.classList.toggle('is-muted', path.classList.contains('is-muted'));
        });

        app.state.motionConnectionOverlays = overlays;
        return Array.from(overlays.values());
    };

    app.syncMotionConnectionOverlays = function syncMotionConnectionOverlays() {
        if (!canAnimate() || !app.state.motionConnectionOverlays) return;
        app.ensureMotionConnectionOverlays();
    };

    app.closeModal = function closeModal() {
        const overlay = app.dom?.modalOverlay;
        const modal = app.dom?.modal;

        if (!overlay || !overlay.classList.contains('active')) return;

        app.playSound('close');

        if (!canAnimate() || !modal) {
            if (typeof app.finalizeModalClose === 'function') app.finalizeModalClose();
            else overlay.classList.remove('active');
            return;
        }

        gsap.killTweensOf([overlay, modal]);
        gsap.timeline({
            defaults: { ease: 'power2.inOut' },
            onComplete: () => {
                gsap.set([overlay, modal], { clearProps: 'opacity,visibility,transform' });
                if (typeof app.finalizeModalClose === 'function') app.finalizeModalClose();
                else overlay.classList.remove('active');
            }
        })
            .to(modal, { y: 12, scaleX: 0.97, scaleY: 0.97, autoAlpha: 0, duration: 0.2 }, 0)
            .to(overlay, { autoAlpha: 0, duration: 0.18 }, 0.03);
    };

    app.refreshMotionPreference = function refreshMotionPreference() {
        if (!gsap) return;

        const animatedElements = document.querySelectorAll(
            '.entry-orbit-link, .entry-orbit-ring, .card, .btn, .icon-btn, .view-tab, .hint-item, .motion-flow-path'
        );

        if (motionIsReduced()) {
            gsap.killTweensOf(animatedElements);
            if (typeof app.stopActiveConnectionFlow === 'function') app.stopActiveConnectionFlow();
            gsap.set(animatedElements, { clearProps: 'transform,opacity,visibility,boxShadow,filter,strokeDashoffset' });
            document.body.classList.remove('motion-enhanced');
            document.querySelector('.motion-pointer-signal')?.classList.remove('is-visible');
            app.state.motionReady = false;
            app.state.terminalMotionReady = false;
            return;
        }

        // Card proximity tweens belong to the entered Canvas. Creating them on
        // the terminal screen lets the later Canvas intro overwrite their
        // internal quickTo tweens, which produces reset warnings on first use.
        if (app.state.canvasReady && typeof app.initMotion === 'function') app.initMotion();
        if (typeof app.initTerminalMotion === 'function' && !app.dom.terminalEntry?.classList.contains('hidden')) {
            app.initTerminalMotion();
        }
    };

    if (!gsap) return;

    gsap.defaults({ overwrite: 'auto' });

    function setupPointerSignal() {
        if (app.state.pointerSignalReady || window.matchMedia('(pointer: coarse)').matches) return;

        const signal = document.createElement('div');
        signal.className = 'motion-pointer-signal';
        signal.setAttribute('aria-hidden', 'true');
        document.body.appendChild(signal);

        const xTo = gsap.quickTo(signal, 'x', { duration: 0.32, ease: 'power3.out' });
        const yTo = gsap.quickTo(signal, 'y', { duration: 0.32, ease: 'power3.out' });

        document.addEventListener('pointermove', (event) => {
            if (motionIsReduced()) return;
            xTo(event.clientX);
            yTo(event.clientY);
            if (!signal.classList.contains('is-visible')) {
                signal.classList.add('is-visible');
            }
        });

        document.addEventListener('pointerleave', () => {
            signal.classList.remove('is-visible');
        });

        app.state.pointerSignalReady = true;
    }

    function setupMagneticControls() {
        if (app.state.magneticControlsReady) return;

        const controls = toArray(
            '.btn, .icon-btn, .view-tab, .hint-item, .panel-row, .share-url-copy, .seg > button'
        );

        controls.forEach((control) => {
            const xTo = gsap.quickTo(control, 'x', { duration: 0.28, ease: 'power3.out' });
            const yTo = gsap.quickTo(control, 'y', { duration: 0.28, ease: 'power3.out' });

            control.addEventListener('pointermove', (event) => {
                if (motionIsReduced()) return;
                const rect = control.getBoundingClientRect();
                const strength = Math.min(rect.width, rect.height) * 0.12;
                const x = ((event.clientX - rect.left) / rect.width - 0.5) * strength;
                const y = ((event.clientY - rect.top) / rect.height - 0.5) * strength;
                xTo(x);
                yTo(y);
            });

            control.addEventListener('pointerleave', () => {
                xTo(0);
                yTo(0);
            });
        });

        app.state.magneticControlsReady = true;
    }

    app.initTerminalMotion = function initTerminalMotion() {
        if (app.state.terminalMotionReady || !canAnimate()) return;

        const orbitRing = document.querySelector('.entry-orbit-ring');
        const orbitLinks = document.querySelectorAll('.entry-orbit-link');
        // Preferences initialize before the terminal preview is rendered. Wait
        // for real targets so a premature call neither warns nor marks motion
        // ready before bindTerminalEntry gets its second, valid attempt.
        if (!orbitRing || !orbitLinks.length) return;

        document.body.classList.add('motion-enhanced');

        // The entry page carries exactly one ambient animation, and it has to
        // earn the frames: drift along the ring and its spokes so the preview
        // reads as a live system you can walk into, not a diagram of one. The
        // page used to breathe glow on chips, metric icons, dots, and the CTA
        // at once, none of which said anything.
        gsap.to(orbitRing, {
            strokeDashoffset: -12,
            duration: 3.6,
            ease: 'none',
            repeat: -1
        });

        gsap.to(orbitLinks, {
            strokeDashoffset: -8,
            duration: 2.8,
            ease: 'none',
            repeat: -1,
            stagger: 0.24
        });

        app.state.terminalMotionReady = true;
    };

    function setupCardProximity() {
        if (app.state.cardProximityReady || window.matchMedia('(pointer: coarse)').matches) return;

        const canvas = document.getElementById('canvas-app');
        const cards = toArray('.card');
        const clamp = gsap.utils.clamp(0, 1);
        const movers = new Map();
        let pointerX = -1000;
        let pointerY = -1000;
        let pending = false;

        cards.forEach((card) => {
            movers.set(card, {
                x: gsap.quickTo(card, 'x', { duration: 0.38, ease: 'power3.out' }),
                y: gsap.quickTo(card, 'y', { duration: 0.38, ease: 'power3.out' }),
                scaleX: gsap.quickTo(card, 'scaleX', { duration: 0.38, ease: 'power3.out' }),
                scaleY: gsap.quickTo(card, 'scaleY', { duration: 0.38, ease: 'power3.out' })
            });

            card.addEventListener('pointerdown', () => {
                card.dataset.motionLocked = 'true';
                gsap.to(card, { x: 0, y: 0, scaleX: 1.018, scaleY: 1.018, duration: 0.14, ease: 'power2.out' });
            });
        });

        document.addEventListener('pointerup', () => {
            cards.forEach((card) => {
                if (!card.dataset.motionLocked) return;
                delete card.dataset.motionLocked;
                if (!card.classList.contains('dragging')) {
                    gsap.to(card, { scaleX: 1, scaleY: 1, duration: 0.18, ease: 'power2.out' });
                }
            });
        });

        function resetCards() {
            cards.forEach((card) => {
                if (card.classList.contains('dragging')) return;
                const mover = movers.get(card);
                if (!mover) return;
                mover.x(0);
                mover.y(0);
                mover.scaleX(1);
                mover.scaleY(1);
            });
        }

        function updateProximity() {
            pending = false;

            if (document.body.dataset.view && document.body.dataset.view !== 'canvas') {
                resetCards();
                return;
            }

            const radius = window.innerWidth < 900 ? 0 : 190;
            if (!radius || app.state.isPanning || app.state.draggedCard) {
                resetCards();
                return;
            }

            cards.forEach((card) => {
                const mover = movers.get(card);
                if (!mover || card.dataset.motionLocked === 'true' || card.classList.contains('dragging')) return;

                const rect = card.getBoundingClientRect();
                const dx = pointerX - (rect.left + rect.width / 2);
                const dy = pointerY - (rect.top + rect.height / 2);
                const distance = Math.hypot(dx, dy);
                const power = clamp(1 - distance / radius);

                if (!power) {
                    mover.x(0);
                    mover.y(0);
                    mover.scaleX(1);
                    mover.scaleY(1);
                    return;
                }

                const directionX = distance ? dx / distance : 0;
                const directionY = distance ? dy / distance : 0;

                mover.x(directionX * power * 7);
                mover.y(directionY * power * 5);
                mover.scaleX(1 + power * 0.018);
                mover.scaleY(1 + power * 0.018);
            });
        }

        canvas?.addEventListener('pointermove', (event) => {
            pointerX = event.clientX;
            pointerY = event.clientY;

            if (!pending) {
                pending = true;
                requestAnimationFrame(updateProximity);
            }
        });

        canvas?.addEventListener('pointerleave', resetCards);

        app.state.cardProximityReady = true;
    }

    app.initMotion = function initMotion() {
        if (app.state.motionReady || !canAnimate()) return;

        document.body.classList.add('motion-enhanced');
        setupPointerSignal();
        setupMagneticControls();
        setupCardProximity();
        app.state.motionReady = true;
    };

    app.stopActiveConnectionFlow = function stopActiveConnectionFlow() {
        const state = app.state;

        if (state.activeConnectionFlow) {
            state.activeConnectionFlow.kill();
            state.activeConnectionFlow = null;
        }

        if (state.activeConnectionGlow) {
            state.activeConnectionGlow.kill();
            state.activeConnectionGlow = null;
        }

        if (state.activeConnectionFlowPaths?.length) {
            state.activeConnectionFlowPaths.forEach((path) => {
                path.classList.remove('is-active-flow');
                gsap.set(path, {
                    strokeDasharray: getMotionDash(path, false),
                    strokeDashoffset: 0,
                    clearProps: 'opacity,visibility,filter'
                });
            });
            state.activeConnectionFlowPaths = [];
        }

    };

    app.startActiveConnectionFlow = function startActiveConnectionFlow(cardId) {
        if (!canAnimate()) return;

        app.stopActiveConnectionFlow();

        if (!cardId) return;

        const keys = app.state.connectionAdj?.[cardId] || [];
        app.ensureMotionConnectionOverlays();
        const overlays = app.state.motionConnectionOverlays || new Map();
        const paths = keys
            .map((key) => overlays.get(key))
            .filter(Boolean);

        if (!paths.length) return;

        paths.forEach((path) => {
            path.classList.add('is-active-flow');
            gsap.set(path, {
                strokeDasharray: getMotionDash(path, true),
                strokeDashoffset: 0,
                autoAlpha: 1
            });
        });

        app.state.activeConnectionFlowPaths = paths;
        app.state.activeConnectionFlow = gsap.to(paths, {
            strokeDashoffset: '-=64',
            duration: 1.35,
            ease: 'none',
            repeat: -1
        });
        app.state.activeConnectionGlow = gsap.to(paths, {
            autoAlpha: 0.68,
            duration: 1.1,
            ease: 'sine.inOut',
            repeat: -1,
            yoyo: true
        });
    };

    app.animateConnectionsIntro = function animateConnectionsIntro() {
        if (!canAnimate()) return;
        app.ensureMotionConnectionOverlays();
    };

    app.animateCanvasIntro = function animateCanvasIntro() {
        if (!canAnimate() || app.state.motionIntroPlayed) return;

        app.state.motionIntroPlayed = true;

        const cards = toArray('.card');
        const chrome = toArray('.top-bar, .canvas-view-header, .sidebar, .canvas-dock, .bottom-hint, .minimap');

        gsap.set(cards, { autoAlpha: 0, y: 18, scaleX: 0.965, scaleY: 0.965, transformOrigin: '50% 50%' });
        gsap.set(chrome, { autoAlpha: 0, y: -8 });

        return gsap.timeline({ defaults: { ease: 'power3.out' } })
            .to(chrome, { autoAlpha: 1, y: 0, duration: 0.48, stagger: 0.035, clearProps: 'opacity,visibility,y' }, 0)
            .to(cards, {
                autoAlpha: 1,
                y: 0,
                scaleX: 1,
                scaleY: 1,
                duration: 0.72,
                stagger: { amount: 0.62, from: 'random' },
                clearProps: 'opacity,visibility,transform'
            }, 0.1)
            .add(() => app.animateConnectionsIntro(), 0.34);
    };

    app.animateModalOpen = function animateModalOpen(sourceElement) {
        const overlay = app.dom?.modalOverlay;
        const modal = app.dom?.modal;

        if (!overlay || !modal || !canAnimate()) return;

        const modalCenter = getElementCenter(modal);
        const sourceCenter = sourceElement ? getElementCenter(sourceElement) : modalCenter;

        gsap.killTweensOf([overlay, modal]);
        gsap.timeline({ defaults: { ease: 'power3.out' } })
            .fromTo(overlay, { autoAlpha: 0 }, { autoAlpha: 1, duration: 0.22 }, 0)
            .fromTo(modal, {
                x: (sourceCenter.x - modalCenter.x) * 0.16,
                y: (sourceCenter.y - modalCenter.y) * 0.16,
                scaleX: 0.94,
                scaleY: 0.94,
                autoAlpha: 0
            }, {
                x: 0,
                y: 0,
                scaleX: 1,
                scaleY: 1,
                autoAlpha: 1,
                duration: 0.42,
                clearProps: 'transform,opacity,visibility'
            }, 0.03)
            .fromTo(toArray('.modal-section, .modal-tag', modal), {
                autoAlpha: 0,
                y: 10
            }, {
                autoAlpha: 1,
                y: 0,
                duration: 0.36,
                stagger: 0.026,
                clearProps: 'opacity,visibility,y'
            }, 0.18);
    };

    app.animateConnectionFocus = function animateConnectionFocus(cardId) {
        if (!canAnimate() || !cardId) return;

        const keys = app.state.connectionAdj?.[cardId] || [];
        const paths = keys
            .map((key) => app.state.connectionPaths?.get(key))
            .filter(Boolean);

        if (!paths.length) return;

        gsap.fromTo(paths, {
            strokeDashoffset: 14
        }, {
            strokeDashoffset: 0,
            duration: 0.5,
            ease: 'power2.out',
            stagger: 0.018,
            clearProps: 'strokeDashoffset'
        });
    };

    app.animatePortfolioPanel = function animatePortfolioPanel() {
        const shell = app.dom?.portfolioViewShell;
        if (!shell || !canAnimate() || app.state.currentView === 'canvas') return;

        const items = toArray('.journey-column, .timeline-item-card, .portfolio-row, .list-toolbar, .view-panel-head', shell);

        gsap.fromTo(items, {
            autoAlpha: 0,
            y: 12
        }, {
            autoAlpha: 1,
            y: 0,
            duration: 0.42,
            ease: 'power3.out',
            stagger: 0.025,
            clearProps: 'opacity,visibility,y'
        });
    };

    app.animateCanvasToolPress = function animateCanvasToolPress(button, tool) {
        if (!button || !canAnimate()) return;

        const icon = button.querySelector('svg') || button;
        const rotation = tool === 'overview' ? 22 : tool === 'search' ? -12 : tool === 'details' ? 10 : 0;

        gsap.killTweensOf([button, icon]);
        gsap.timeline({ defaults: { ease: 'power3.out' } })
            .to(button, { scaleX: 0.9, scaleY: 0.9, duration: 0.08 }, 0)
            .to(button, { scaleX: 1, scaleY: 1, duration: 0.28, ease: 'elastic.out(1, 0.55)', clearProps: 'transform' }, 0.08)
            .fromTo(icon, { rotation, scaleX: 0.86, scaleY: 0.86 }, {
                rotation: 0,
                scaleX: 1,
                scaleY: 1,
                duration: 0.34,
                clearProps: 'transform'
            }, 0.04);
    };

    app.animateCanvasToolStatus = function animateCanvasToolStatus(status) {
        if (!status || !canAnimate()) return;

        gsap.killTweensOf(status);
        gsap.fromTo(status, {
            autoAlpha: 0,
            y: 8,
            scaleX: 0.97,
            scaleY: 0.97
        }, {
            autoAlpha: 1,
            y: 0,
            scaleX: 1,
            scaleY: 1,
            duration: 0.26,
            ease: 'power3.out'
        });
    };

    app.animateCanvasToolNeedsSelection = function animateCanvasToolNeedsSelection() {
        if (!canAnimate()) return;

        const cards = toArray('.card:not(.card-section-banner)').slice(0, 7);
        if (!cards.length) return;

        gsap.fromTo(cards, {
            y: 0
        }, {
            y: -4,
            duration: 0.16,
            repeat: 1,
            yoyo: true,
            ease: 'power2.inOut',
            stagger: 0.018,
            clearProps: 'y'
        });
    };

    const baseInitCanvas = app.initCanvas;
    if (typeof baseInitCanvas === 'function') {
        app.initCanvas = function initCanvasWithMotion() {
            baseInitCanvas.apply(app, arguments);
            const intro = app.animateCanvasIntro();
            if (intro) intro.eventCallback('onComplete', () => app.initMotion());
            else app.initMotion();
        };
    }

    const baseBindTerminalEntry = app.bindTerminalEntry;
    if (typeof baseBindTerminalEntry === 'function') {
        app.bindTerminalEntry = function bindTerminalEntryWithMotion() {
            baseBindTerminalEntry.apply(app, arguments);
            app.initTerminalMotion();
        };
    }

    const baseOpenModal = app.openModal;
    if (typeof baseOpenModal === 'function') {
        app.openModal = function openModalWithMotion(cardId) {
            const source = getCardSource(cardId);
            baseOpenModal.apply(app, arguments);
            app.animateModalOpen(source);
        };
    }

    const baseSetConnectionFocus = app.setConnectionFocus;
    if (typeof baseSetConnectionFocus === 'function') {
        app.setConnectionFocus = function setConnectionFocusWithMotion(cardId) {
            baseSetConnectionFocus.apply(app, arguments);
            app.animateConnectionFocus(cardId);
            app.startActiveConnectionFlow(cardId);
        };
    }

    const baseUpdateConnections = app.updateConnections;
    if (typeof baseUpdateConnections === 'function') {
        app.updateConnections = function updateConnectionsWithMotion() {
            baseUpdateConnections.apply(app, arguments);
            app.syncMotionConnectionOverlays();
        };
    }

    const baseUpdateConnectionsForCard = app.updateConnectionsForCard;
    if (typeof baseUpdateConnectionsForCard === 'function') {
        app.updateConnectionsForCard = function updateConnectionsForCardWithMotion() {
            baseUpdateConnectionsForCard.apply(app, arguments);
            app.syncMotionConnectionOverlays();
        };
    }

    const baseRenderActivePortfolioView = app.renderActivePortfolioView;
    if (typeof baseRenderActivePortfolioView === 'function') {
        app.renderActivePortfolioView = function renderActivePortfolioViewWithMotion() {
            baseRenderActivePortfolioView.apply(app, arguments);
            app.animatePortfolioPanel();
        };
    }
})();
