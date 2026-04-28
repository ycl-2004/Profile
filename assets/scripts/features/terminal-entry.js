(function () {
    const app = window.PortfolioApp;
    const LAUNCH_DURATION_MS = 2100;
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
                behavior: 'smooth'
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

    app.enterCanvas = function enterCanvas() {
        const terminalEntry = app.dom.terminalEntry;
        if (!terminalEntry || isLaunching || terminalEntry.classList.contains('hidden')) return;

        const progressFill = terminalEntry.querySelector('#terminal-progress-fill');
        const progressValue = terminalEntry.querySelector('#terminal-progress-value');
        const progressBar = terminalEntry.querySelector('#terminal-progress');
        const launchButton = terminalEntry.querySelector('#terminal-launch-button');

        isLaunching = true;
        terminalEntry.classList.add('is-launching');
        terminalEntry.setAttribute('aria-busy', 'true');

        function formatChargeValue(value) {
            return `${String(value).padStart(3, '0')} / ${LAUNCH_MAX_VALUE}`;
        }

        if (launchButton) {
            launchButton.disabled = true;
        }
        if (progressFill) progressFill.style.width = '0%';
        if (progressValue) progressValue.textContent = formatChargeValue(0);
        if (progressBar) progressBar.setAttribute('aria-valuenow', '0');

        const startTime = performance.now();

        function step(currentTime) {
            const elapsed = currentTime - startTime;
            const rawProgress = Math.min(elapsed / LAUNCH_DURATION_MS, 1);
            const easedProgress = 1 - Math.pow(1 - rawProgress, 3);
            const chargeValue = Math.min(Math.round(easedProgress * LAUNCH_MAX_VALUE), LAUNCH_MAX_VALUE);
            const chargePercentage = (chargeValue / LAUNCH_MAX_VALUE) * 100;

            if (progressFill) progressFill.style.width = chargePercentage + '%';
            if (progressValue) progressValue.textContent = formatChargeValue(chargeValue);
            if (progressBar) progressBar.setAttribute('aria-valuenow', String(chargeValue));
            if (progressBar) progressBar.setAttribute('aria-valuetext', `Boot progress ${chargeValue} of ${LAUNCH_MAX_VALUE}`);

            if (rawProgress < 1) {
                window.requestAnimationFrame(step);
                return;
            }

            window.setTimeout(() => {
                terminalEntry.classList.add('hidden');
                window.setTimeout(() => {
                    app.initCanvas();
                }, 420);
            }, 260);
        }

        window.requestAnimationFrame(step);
    };

    app.bindTerminalEntry = function bindTerminalEntry() {
        const terminalEntry = app.dom.terminalEntry;
        if (!terminalEntry) return;

        const launchButton = terminalEntry.querySelector('#terminal-launch-button');

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
            }
        });

        if (launchButton) {
            launchButton.addEventListener('click', app.enterCanvas);
        }

        terminalEntry.querySelectorAll('.terminal-nav-target').forEach((element) => {
            element.addEventListener('click', () => {
                app.setTerminalNavTarget(element.dataset.navTarget || 'hero');
            });
        });
    };
})();
