(function () {
    const app = window.PortfolioApp;
    const LAUNCH_DURATION_MS = 720;
    const LAUNCH_MAX_VALUE = 120;
    const NAV_GRAPH = {
        hero: { down: 'role', right: 'about' },
        role: { up: 'hero', down: 'summary', right: 'what' },
        summary: { up: 'role', down: 'quickfacts', right: 'tools' },
        quickfacts: { up: 'summary', down: 'building', right: 'note' },
        building: { up: 'quickfacts', down: 'command', right: 'note' },
        command: { up: 'building', right: 'note' },
        about: { left: 'hero', down: 'what' },
        what: { up: 'about', down: 'tools', left: 'role' },
        tools: { up: 'what', down: 'note', left: 'summary' },
        note: { up: 'tools', down: 'command', left: 'building' }
    };
    let isLaunching = false;

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

            if (event.key === 'Enter') {
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
