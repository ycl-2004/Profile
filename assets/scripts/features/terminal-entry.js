(function () {
    const app = window.PortfolioApp;
    const LAUNCH_DURATION_MS = 1600;
    let isLaunching = false;

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
            launchButton.textContent = 'Launching...';
        }
        if (launchStatus) {
            launchStatus.textContent = 'Initializing canvas...';
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
                launchStatus.textContent = 'Launching canvas...';
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

        document.addEventListener('keydown', (event) => {
            if (event.key === 'Enter' && !terminalEntry.classList.contains('hidden')) {
                event.preventDefault();
                app.enterCanvas();
            }
        });

        if (launchButton) {
            launchButton.addEventListener('click', app.enterCanvas);
        }
    };
})();
