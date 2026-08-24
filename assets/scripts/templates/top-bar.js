(function () {
    const app = window.PortfolioApp;

    app.templates.topBar = `
        <div class="top-bar">
            <button class="sidebar-toggle" id="sidebar-toggle" aria-label="Open Layers">☰</button>
            <div class="logo">
                <div class="logo-icon">Y</div>
                <div class="logo-copy">
                    <span class="logo-title">Yi-Chen Canvas</span>
                    <span class="logo-subtitle">AI-Focused Software Engineer · Systems Builder</span>
                </div>
            </div>
            <div class="top-actions">
                <button class="btn btn-primary" id="share-action" type="button" aria-expanded="false" aria-controls="share-panel">Share</button>
                <button class="btn btn-avatar" id="yc-logic-action" type="button" aria-label="Open YC personal system">YC</button>
                <button class="btn btn-icon sound-toggle" id="sound-action" type="button" data-sound-toggle aria-pressed="false" aria-label="Turn sound on" title="Sound is off">
                    <span data-sound-icon aria-hidden="true">🔇</span>
                </button>
                <button class="btn btn-icon" id="settings-action" type="button" aria-label="Open settings" aria-expanded="false" aria-controls="settings-panel">⚙</button>
                <div class="top-action-popovers" id="top-action-popovers">
                    <section class="top-action-panel share-panel" id="share-panel" aria-labelledby="share-panel-title" hidden>
                        <div class="top-panel-kicker">Share Profile</div>
                        <h2 id="share-panel-title">Send this canvas</h2>
                        <p>Share the portfolio view, or copy a clean link for messages and posts.</p>
                        <div class="top-panel-actions">
                            <button class="top-panel-button is-primary" type="button" data-share-action="native">Open share sheet</button>
                            <button class="top-panel-button" type="button" data-share-action="copy">Copy link</button>
                        </div>
                        <div class="share-link-row" aria-label="Share destinations">
                            <button type="button" data-share-network="linkedin">LinkedIn</button>
                            <button type="button" data-share-network="x">X</button>
                            <button type="button" data-share-network="email">Email</button>
                        </div>
                        <div class="top-panel-status" id="share-status" role="status" aria-live="polite"></div>
                    </section>
                    <section class="top-action-panel settings-panel" id="settings-panel" aria-labelledby="settings-panel-title" hidden>
                        <div class="top-panel-kicker">Canvas Settings</div>
                        <h2 id="settings-panel-title">Tune the view</h2>
                        <div class="settings-group">
                            <span>Mode</span>
                            <div class="settings-segment" role="group" aria-label="Canvas mode">
                                <button type="button" data-settings-view="canvas">Canvas</button>
                                <button type="button" data-settings-view="timeline">Timeline</button>
                                <button type="button" data-settings-view="list">List</button>
                            </div>
                        </div>
                        <div class="settings-group">
                            <span>Theme</span>
                            <div class="settings-segment" role="group" aria-label="Theme preference">
                                <button type="button" data-settings-theme="light">Light</button>
                                <button type="button" data-settings-theme="dark">Dark</button>
                                <button type="button" data-settings-theme="auto">Auto</button>
                            </div>
                        </div>
                        <div class="settings-group settings-preference-row">
                            <span>Effects</span>
                            <div class="settings-segment settings-segment--two" role="group" aria-label="Motion preference">
                                <button type="button" data-motion-option="full">Full</button>
                                <button type="button" data-motion-option="reduced">Reduced</button>
                            </div>
                        </div>
                        <div class="settings-grid">
                            <button type="button" data-settings-action="fit">Fit canvas</button>
                            <button type="button" data-settings-action="reset-layer">All layers</button>
                            <button type="button" data-settings-action="contact">Contact card</button>
                            <button type="button" data-settings-action="yc-system">YC system</button>
                            <button type="button" data-sound-toggle aria-pressed="false"><span data-sound-label>Sound off</span></button>
                            <button type="button" data-profile-action="print">Print résumé</button>
                        </div>
                    </section>
                </div>
            </div>
        </div>
    `;
})();
