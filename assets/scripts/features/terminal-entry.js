(function () {
    const app = window.PortfolioApp;

    app.enterCanvas = function enterCanvas() {
        app.dom.terminalEntry.classList.add('hidden');
        setTimeout(() => { app.initCanvas(); }, 400);
    };

    app.bindTerminalEntry = function bindTerminalEntry() {
        document.addEventListener('keydown', (event) => {
            if (event.key === 'Enter' && !app.dom.terminalEntry.classList.contains('hidden')) {
                app.enterCanvas();
            }
        });

        app.dom.terminalEntry.addEventListener('click', app.enterCanvas);
    };
})();
