(function () {
    const app = window.PortfolioApp;

    app.templates.modal = `
        <div class="modal-overlay" id="modal-overlay" aria-hidden="true">
            <div class="modal" id="modal" role="dialog" aria-modal="true" aria-labelledby="modal-title" aria-describedby="modal-subtitle" tabindex="-1">
                <div class="modal-header" id="modal-header">
                    <div class="modal-avatar" id="modal-avatar">📋</div>
                    <div><div class="modal-title" id="modal-title">Title</div><div class="modal-subtitle" id="modal-subtitle">Subtitle</div></div>
                    <button class="modal-close" id="modal-close" type="button" aria-label="Close details">×</button>
                </div>
                <div class="modal-body" id="modal-body"></div>
                <div class="modal-tags" id="modal-tags"></div>
            </div>
        </div>
    `;
})();
