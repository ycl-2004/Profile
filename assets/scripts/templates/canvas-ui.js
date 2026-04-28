(function () {
    const app = window.PortfolioApp;

    app.templates.canvasUi = `
        <div class="minimap"><div class="minimap-content" id="minimap-content"></div><div class="minimap-title">Minimap</div></div>
        <div class="zoom-controls">
            <div class="zoom-btn" id="zoom-in">+</div>
            <div class="zoom-level" id="zoom-level">100%</div>
            <div class="zoom-btn" id="zoom-out">−</div>
            <div class="zoom-btn" id="zoom-fit">⤢</div>
        </div>
        <div class="bottom-hint">
            <div class="hint-item"><span class="hint-key">Scroll</span><span>Zoom</span></div>
            <span class="hint-sep">·</span>
            <div class="hint-item"><span class="hint-key">Drag</span><span>Move canvas</span></div>
            <span class="hint-sep">·</span>
            <div class="hint-item"><span class="hint-key">Card Drag</span><span>Move cards</span></div>
            <span class="hint-sep">·</span>
            <div class="hint-item"><span class="hint-key">Double-click</span><span>Open details</span></div>
        </div>
    `;
})();
