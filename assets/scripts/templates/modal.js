(function () {
    const app = window.PortfolioApp;

    app.templates.modal = `
        <div class="modal-overlay" id="modal-overlay" aria-hidden="true">
            <div class="modal" id="modal" role="dialog" aria-modal="true" aria-labelledby="modal-title" aria-describedby="modal-subtitle" tabindex="-1">
                <div class="modal-header" id="modal-header">
                    <div class="modal-avatar" id="modal-avatar">📋</div>
                    <div class="modal-heading"><div class="modal-title" id="modal-title">Title</div><div class="modal-subtitle" id="modal-subtitle">Subtitle</div></div>
                    <div class="modal-header-actions">
                        <button class="modal-permalink" id="modal-permalink" type="button" aria-label="Copy link to this card" title="Copy link to this card">
                            <svg class="ui-icon" viewBox="0 0 20 20" aria-hidden="true"><path d="M8.6 11.4a3.4 3.4 0 0 0 5 .3l2-2a3.4 3.4 0 0 0-4.8-4.8l-1.1 1.1"/><path d="M11.4 8.6a3.4 3.4 0 0 0-5-.3l-2 2a3.4 3.4 0 0 0 4.8 4.8l1.1-1.1"/></svg>
                            <svg class="ui-icon modal-permalink-done" viewBox="0 0 20 20" aria-hidden="true"><path d="m4.5 10.5 3.5 3.5 7.5-7.5"/></svg>
                        </button>
                        <button class="modal-close" id="modal-close" type="button" aria-label="Close details">
                            <svg class="ui-icon" viewBox="0 0 20 20" aria-hidden="true"><path d="m6 6 8 8M14 6l-8 8"/></svg>
                        </button>
                    </div>
                </div>
                <div class="modal-body" id="modal-body"></div>
                <div class="modal-tags" id="modal-tags"></div>
            </div>
        </div>
    `;
})();
