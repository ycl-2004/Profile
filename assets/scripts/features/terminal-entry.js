(function () {
    const app = window.PortfolioApp;
    const LAUNCH_DURATION_MS = 1600;
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
        const launchStatus = terminalEntry.querySelector('#terminal-launch-status');
        const launchButton = terminalEntry.querySelector('#terminal-launch-button');

        isLaunching = true;
        terminalEntry.classList.add('is-launching');
        terminalEntry.setAttribute('aria-busy', 'true');

        if (launchButton) {
            launchButton.disabled = true;
            launchButton.textContent = 'Opening canvas...';
        }
        if (launchStatus) {
            launchStatus.textContent = 'Initializing interactive canvas...';
        }

        const startTime = performance.now();

        function step(currentTime) {
            const elapsed = currentTime - startTime;
            const rawProgress = Math.min(elapsed / LAUNCH_DURATION_MS, 1);
            const easedProgress = 1 - Math.pow(1 - rawProgress, 3);
            const percentage = Math.round(easedProgress * 100);

            if (progressFill) progressFill.style.width = percentage + '%';
            if (progressValue) progressValue.textContent = percentage + '%';

            if (rawProgress < 1) {
                window.requestAnimationFrame(step);
                return;
            }

            if (launchStatus) {
                launchStatus.textContent = 'Opening portfolio canvas...';
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
