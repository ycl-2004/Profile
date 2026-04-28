(function () {
    const app = window.PortfolioApp;

    app.templates.modal = `
        <div class="modal-overlay" id="modal-overlay">
            <div class="modal" id="modal">
                <div class="modal-header" id="modal-header">
                    <div class="modal-avatar" id="modal-avatar">📋</div>
                    <div><div class="modal-title" id="modal-title">Title</div><div class="modal-subtitle" id="modal-subtitle">Subtitle</div></div>
                    <button class="modal-close" id="modal-close">×</button>
                </div>
                <div class="modal-body" id="modal-body"></div>
                <div class="modal-tags" id="modal-tags"></div>
            </div>
        </div>
    `;
})();
