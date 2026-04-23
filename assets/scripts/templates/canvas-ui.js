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
            <div class="hint-item"><span class="hint-key">Scroll</span><span>缩放</span></div>
            <span class="hint-sep">·</span>
            <div class="hint-item"><span class="hint-key">Drag</span><span>移动画布</span></div>
            <span class="hint-sep">·</span>
            <div class="hint-item"><span class="hint-key">拖拽卡片</span><span>移动卡片</span></div>
            <span class="hint-sep">·</span>
            <div class="hint-item"><span class="hint-key">双击</span><span>查看详情</span></div>
        </div>
    `;
})();
