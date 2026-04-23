(function () {
    const app = window.PortfolioApp;

    app.render = function render() {
        const root = document.getElementById('app-root');

        root.innerHTML = [
            app.templates.terminal,
            '<div id="canvas-app">',
            app.templates.topBar,
            app.templates.sidebar,
            '<div id="canvas-viewport">',
            app.templates.connectionsSvg,
            app.templates.cards,
            '</div>',
            app.templates.canvasUi,
            '</div>',
            app.templates.modal
        ].join('');
    };
})();
