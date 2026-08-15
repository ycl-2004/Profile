(function () {
    const app = window.PortfolioApp;
    const LAUNCH_DURATION_MS = 720;
    const LAUNCH_MAX_VALUE = 120;
    const NAV_GRAPH = {
        hero: { down: 'lede', right: 'preview' },
        lede: { up: 'hero', down: 'proof', right: 'preview' },
        proof: { up: 'lede', right: 'preview' },
        preview: { up: 'hero', left: 'hero' }
    };

    // The ring on the entry page, and the records it is drawn from. These five
    // are the same claims the entry used to spell out as a bullet list of
    // "verified signals": industrial work, original systems, open-source
    // maintenance. Resolving them against `portfolioItems` rather than
    // hardcoding them keeps the preview honest when the canvas changes, and
    // `label` is only the title trimmed to card width, so the full record
    // still supplies the accessible name.
    const ORBIT_NODES = [
        { id: 'work-delta', angle: -108, label: 'Delta Controls' },
        { id: 'project-yc-cast', angle: -36, label: 'YC Cast' },
        { id: 'project-sharememory', angle: 36, label: 'ShareMemory' },
        { id: 'project-yc-obsidian', angle: 108, label: 'YC Obsidian' },
        { id: 'project-open-source', angle: 180, label: 'Open Source' }
    ];

    // Orbit's app icon, in numbers: a tilted ellipse with the hub at its
    // centre. The viewBox is mirrored by `aspect-ratio` on `.entry-orbit`, so
    // percentage-positioned nodes land exactly on the SVG geometry.
    const ORBIT_VIEW = { w: 420, h: 340 };
    const ORBIT_RING = { cx: 210, cy: 168, rx: 140, ry: 84, tilt: -16 };

    let isLaunching = false;

    function orbitPoint(angleDeg) {
        const t = (angleDeg * Math.PI) / 180;
        const tilt = (ORBIT_RING.tilt * Math.PI) / 180;
        const x = ORBIT_RING.rx * Math.cos(t);
        const y = ORBIT_RING.ry * Math.sin(t);

        return {
            x: ORBIT_RING.cx + x * Math.cos(tilt) - y * Math.sin(tilt),
            y: ORBIT_RING.cy + x * Math.sin(tilt) + y * Math.cos(tilt)
        };
    }

    function renderOrbitPreview() {
        const mount = document.getElementById('entry-orbit');
        if (!mount) return;

        const items = app.data?.portfolioItems || [];
        const nodes = ORBIT_NODES
            .map((node) => ({ ...node, item: items.find((entry) => entry.id === node.id) }))
            .filter((node) => node.item);

        if (!nodes.length) {
            mount.remove();
            return;
        }

        const points = nodes.map((node) => orbitPoint(node.angle));
        const svgNS = 'http://www.w3.org/2000/svg';
        const svg = document.createElementNS(svgNS, 'svg');
        svg.setAttribute('class', 'entry-orbit-svg');
        svg.setAttribute('viewBox', `0 0 ${ORBIT_VIEW.w} ${ORBIT_VIEW.h}`);
        svg.setAttribute('aria-hidden', 'true');

        const ring = document.createElementNS(svgNS, 'ellipse');
        ring.setAttribute('class', 'entry-orbit-ring');
        ring.setAttribute('cx', String(ORBIT_RING.cx));
        ring.setAttribute('cy', String(ORBIT_RING.cy));
        ring.setAttribute('rx', String(ORBIT_RING.rx));
        ring.setAttribute('ry', String(ORBIT_RING.ry));
        ring.setAttribute('transform', `rotate(${ORBIT_RING.tilt} ${ORBIT_RING.cx} ${ORBIT_RING.cy})`);
        svg.appendChild(ring);

        const links = points.map((point) => {
            const line = document.createElementNS(svgNS, 'line');
            line.setAttribute('class', 'entry-orbit-link');
            line.setAttribute('x1', String(ORBIT_RING.cx));
            line.setAttribute('y1', String(ORBIT_RING.cy));
            line.setAttribute('x2', point.x.toFixed(1));
            line.setAttribute('y2', point.y.toFixed(1));
            svg.appendChild(line);
            return line;
        });

        mount.textContent = '';
        mount.setAttribute('role', 'group');
        mount.setAttribute('aria-label', 'Preview of the evidence canvas');
        mount.appendChild(svg);

        const hub = document.createElement('span');
        hub.className = 'entry-orbit-hub';
        hub.setAttribute('aria-hidden', 'true');
        hub.textContent = 'YC';
        mount.appendChild(hub);

        nodes.forEach((node, index) => {
            const point = points[index];
            const button = document.createElement('button');
            button.type = 'button';
            button.className = 'entry-orbit-node';
            button.dataset.targetCard = node.id;
            button.style.setProperty('--node-tone', `var(--e-node-${index + 1})`);
            button.style.left = `${((point.x / ORBIT_VIEW.w) * 100).toFixed(2)}%`;
            button.style.top = `${((point.y / ORBIT_VIEW.h) * 100).toFixed(2)}%`;
            button.setAttribute('aria-label', `${node.item.title}. Open the evidence canvas.`);

            const dot = document.createElement('span');
            dot.className = 'entry-orbit-dot';
            dot.setAttribute('aria-hidden', 'true');

            const text = document.createElement('span');
            text.className = 'entry-orbit-title';
            text.textContent = node.label;

            button.append(dot, text);

            const lightUp = () => links[index].classList.add('is-lit');
            const dimDown = () => links[index].classList.remove('is-lit');

            button.addEventListener('pointerenter', lightUp);
            button.addEventListener('focus', lightUp);
            button.addEventListener('pointerleave', dimDown);
            button.addEventListener('blur', dimDown);
            button.addEventListener('click', () => app.enterCanvas({ targetCardId: node.id }));

            mount.appendChild(button);
        });
    }

    app.renderOrbitPreview = renderOrbitPreview;

    function motionIsReduced() {
        return document.body.dataset.motion === 'reduced' || window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    }

    app.setTerminalNavTarget = function setTerminalNavTarget(targetId) {
        const terminalEntry = app.dom.terminalEntry;
        if (!terminalEntry) return;

        terminalEntry.querySelectorAll('.terminal-nav-target').forEach((element) => {
            element.classList.toggle('is-active', element.dataset.navTarget === targetId);
        });

        const activeElement = terminalEntry.querySelector(`.terminal-nav-target[data-nav-target="${targetId}"]`);

        if (activeElement) {
            activeElement.scrollIntoView({
                block: 'nearest',
                inline: 'nearest',
                behavior: motionIsReduced() ? 'auto' : 'smooth'
            });
        }
    };

    app.moveTerminalNav = function moveTerminalNav(direction) {
        const terminalEntry = app.dom.terminalEntry;
        if (!terminalEntry) return;

        const activeTarget = terminalEntry.querySelector('.terminal-nav-target.is-active');
        const activeId = activeTarget?.dataset.navTarget || 'hero';
        const nextTarget = NAV_GRAPH[activeId]?.[direction];

        if (!nextTarget) return;

        app.setTerminalNavTarget(nextTarget);
    };

    app.enterCanvas = function enterCanvas(options = {}) {
        const terminalEntry = app.dom.terminalEntry;
        if (!terminalEntry || isLaunching || terminalEntry.classList.contains('hidden')) return;

        const progressFill = terminalEntry.querySelector('#terminal-progress-fill');
        const progressValue = terminalEntry.querySelector('#terminal-progress-value');
        const progressBar = terminalEntry.querySelector('#terminal-progress');
        const launchButton = terminalEntry.querySelector('#terminal-launch-button');
        const progressLabel = terminalEntry.querySelector('.terminal-progress-label');
        const targetView = options.targetView || 'canvas';
        const targetCardId = options.targetCardId || null;
        const shouldAnimate = !options.immediate && !motionIsReduced();
        const duration = shouldAnimate ? LAUNCH_DURATION_MS : 0;

        isLaunching = true;
        terminalEntry.classList.add('is-launching');
        terminalEntry.setAttribute('aria-busy', 'true');
        app.playSound('boot');

        function formatChargeValue(value) {
            return `${String(value).padStart(3, '0')} / ${LAUNCH_MAX_VALUE}`;
        }

        if (launchButton) {
            launchButton.disabled = true;
        }
        if (progressFill) progressFill.style.width = '0%';
        if (progressValue) progressValue.textContent = formatChargeValue(0);
        if (progressBar) progressBar.setAttribute('aria-valuenow', '0');

        function finishLaunch() {
            if (!shouldAnimate) terminalEntry.classList.add('is-immediate');
            terminalEntry.classList.add('hidden');
            terminalEntry.setAttribute('aria-hidden', 'true');
            terminalEntry.setAttribute('aria-busy', 'false');

            window.setTimeout(() => {
                app.initCanvas();
                if (targetView !== 'canvas' && typeof app.setPortfolioView === 'function') {
                    app.setPortfolioView(targetView);
                }

                if (targetView === 'canvas' && targetCardId && typeof app.focusCanvasCard === 'function') {
                    const focusedCard = app.focusCanvasCard(targetCardId);
                    if (focusedCard) return;
                }

                const focusTarget = targetView === 'list'
                    ? document.querySelector('#portfolio-list-search')
                    : document.querySelector('[data-view-target="canvas"]');
                focusTarget?.focus({ preventScroll: true });
            }, shouldAnimate ? 160 : 0);
        }

        if (!duration) {
            if (progressFill) progressFill.style.width = '100%';
            if (progressValue) progressValue.textContent = formatChargeValue(LAUNCH_MAX_VALUE);
            if (progressBar) progressBar.setAttribute('aria-valuenow', String(LAUNCH_MAX_VALUE));
            if (progressLabel) progressLabel.textContent = 'Ready';
            finishLaunch();
            return;
        }

        const startTime = performance.now();

        function step(currentTime) {
            const elapsed = currentTime - startTime;
            const rawProgress = Math.min(elapsed / duration, 1);
            const easedProgress = 1 - Math.pow(1 - rawProgress, 3);
            const chargeValue = Math.min(Math.round(easedProgress * LAUNCH_MAX_VALUE), LAUNCH_MAX_VALUE);
            const chargePercentage = (chargeValue / LAUNCH_MAX_VALUE) * 100;

            if (progressFill) progressFill.style.width = chargePercentage + '%';
            if (progressValue) progressValue.textContent = formatChargeValue(chargeValue);
            if (progressBar) progressBar.setAttribute('aria-valuenow', String(chargeValue));
            if (progressBar) progressBar.setAttribute('aria-valuetext', `Boot progress ${chargeValue} of ${LAUNCH_MAX_VALUE}`);
            if (progressLabel) {
                progressLabel.textContent = chargeValue < 42 ? 'Verify' : chargeValue < 96 ? 'Map' : 'Ready';
            }

            if (rawProgress < 1) {
                window.requestAnimationFrame(step);
                return;
            }

            window.setTimeout(finishLaunch, 110);
        }

        window.requestAnimationFrame(step);
    };

    app.bindTerminalEntry = function bindTerminalEntry() {
        const terminalEntry = app.dom.terminalEntry;
        if (!terminalEntry) return;

        const launchButton = terminalEntry.querySelector('#terminal-launch-button');
        const skipButton = terminalEntry.querySelector('#terminal-skip-button');

        renderOrbitPreview();
        app.setTerminalNavTarget('hero');

        document.addEventListener('keydown', (event) => {
            if (terminalEntry.classList.contains('hidden')) return;

            if (event.key === 'ArrowDown') {
                event.preventDefault();
                app.moveTerminalNav('down');
                return;
            }

            if (event.key === 'ArrowUp') {
                event.preventDefault();
                app.moveTerminalNav('up');
                return;
            }

            if (event.key === 'ArrowRight') {
                event.preventDefault();
                app.moveTerminalNav('right');
                return;
            }

            if (event.key === 'ArrowLeft') {
                event.preventDefault();
                app.moveTerminalNav('left');
                return;
            }

            if (event.key === 'Enter' && !event.target.closest('button, a, input, select, textarea')) {
                event.preventDefault();
                app.enterCanvas();
                return;
            }

            if (event.key === ' ' && !event.target.closest('button, a, input, select, textarea')) {
                event.preventDefault();
                app.enterCanvas();
            }
        });

        if (launchButton) {
            launchButton.addEventListener('click', app.enterCanvas);
        }

        if (skipButton) {
            skipButton.addEventListener('click', () => {
                app.enterCanvas({ targetView: 'list', immediate: true });
            });
        }

        terminalEntry.querySelectorAll('.terminal-nav-target').forEach((element) => {
            element.addEventListener('click', () => {
                app.setTerminalNavTarget(element.dataset.navTarget || 'hero');
            });
        });
    };
})();
