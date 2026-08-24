(function () {
    const app = window.PortfolioApp;

    app.templates.topBar = `
        <div class="top-bar">
            <button class="sidebar-toggle" id="sidebar-toggle" aria-label="Open Layers"><svg class="ui-icon" viewBox="0 0 20 20" aria-hidden="true"><path d="M4 6h12M4 10h12M4 14h12"/></svg></button>
            <div class="logo">
                <div class="logo-icon" aria-hidden="true"><span>Y</span></div>
                <div class="logo-copy">
                    <span class="logo-title">Yi-Chen Canvas</span>
                    <span class="logo-subtitle">AI-Focused Software Engineer · Systems Builder</span>
                </div>
            </div>
            <div class="top-actions">
                <button class="btn btn-primary" id="share-action" type="button" aria-expanded="false" aria-controls="share-panel">Share</button>
                <button class="btn btn-avatar" id="yc-logic-action" type="button" aria-label="Open YC personal system">YC</button>
                <button class="btn btn-icon sound-toggle" id="sound-action" type="button" data-sound-toggle aria-pressed="false" aria-label="Turn sound on" title="Sound is off">
                    <span class="audio-pulse" data-sound-icon data-state="off" aria-hidden="true">
                        <svg viewBox="0 0 24 24" focusable="false">
                            <path d="M4 10v4M8 7.5v9M12 5v14M16 8v8M20 10.5v3"/>
                        </svg>
                    </span>
                </button>
                <button class="btn btn-icon" id="settings-action" type="button" aria-label="Open settings" aria-expanded="false" aria-controls="settings-panel">
                    <svg class="settings-glyph" viewBox="0 0 24 24" aria-hidden="true" focusable="false">
                        <path d="M4 6.5h5M13 6.5h7M4 12h9M17 12h3M4 17.5h3M11 17.5h9"/>
                        <circle cx="11" cy="6.5" r="2"/><circle cx="15" cy="12" r="2"/><circle cx="9" cy="17.5" r="2"/>
                    </svg>
                </button>
                <div class="top-action-popovers" id="top-action-popovers">
                    <section class="top-action-panel share-panel" id="share-panel" aria-labelledby="share-panel-title" hidden>
                        <div class="top-panel-header">
                            <div>
                                <div class="top-panel-kicker">Share Profile</div>
                                <h2 id="share-panel-title">Send this canvas</h2>
                            </div>
                            <button class="top-panel-close" type="button" data-panel-close aria-label="Close share panel"><svg class="ui-icon" viewBox="0 0 20 20" aria-hidden="true"><path d="m6 6 8 8M14 6l-8 8"/></svg></button>
                        </div>
                        <p>Share the portfolio view, or copy a clean link for messages and posts.</p>
                        <div class="top-panel-actions">
                            <button class="top-panel-button is-primary" type="button" data-share-action="native"><svg class="ui-icon" viewBox="0 0 20 20" aria-hidden="true"><path d="M8 5h7v7M15 5 7 13"/><path d="M13 10v5H5V7h5"/></svg>Open share sheet</button>
                            <button class="top-panel-button" type="button" data-share-action="copy"><svg class="ui-icon" viewBox="0 0 20 20" aria-hidden="true"><rect x="7" y="4" width="9" height="10" rx="2"/><path d="M13 16H6a2 2 0 0 1-2-2V7"/></svg>Copy link</button>
                        </div>
                        <div class="top-panel-divider"><span>Share directly</span></div>
                        <div class="share-link-row" aria-label="Share destinations">
                            <button type="button" data-share-network="linkedin"><span aria-hidden="true"><svg viewBox="0 0 20 20"><path class="icon-fill" d="M5.4 7.2H2.5V17h2.9V7.2ZM4 2.5a1.7 1.7 0 1 0 0 3.4 1.7 1.7 0 0 0 0-3.4ZM10.1 7.2H7.3V17h2.8v-4.9c0-1.3.3-2.6 1.9-2.6 1.6 0 1.6 1.5 1.6 2.7V17h2.9v-5.4c0-2.7-.6-4.7-3.7-4.7-1.5 0-2.5.8-2.9 1.6h-.1V7.2h.3Z"/></svg></span>LinkedIn</button>
                            <button type="button" data-share-network="x"><span aria-hidden="true"><svg viewBox="0 0 20 20"><path d="m4 4 12 12M15.5 4 4.5 16"/></svg></span>X</button>
                            <button type="button" data-share-network="email"><span aria-hidden="true"><svg viewBox="0 0 20 20"><rect x="3" y="5" width="14" height="10" rx="2"/><path d="m4 7 6 4 6-4"/></svg></span>Email</button>
                        </div>
                        <div class="top-panel-status" id="share-status" role="status" aria-live="polite"></div>
                    </section>
                    <section class="top-action-panel settings-panel" id="settings-panel" aria-labelledby="settings-panel-title" hidden>
                        <div class="top-panel-header">
                            <div>
                                <div class="top-panel-kicker">Canvas Settings</div>
                                <h2 id="settings-panel-title">Tune the view</h2>
                            </div>
                            <button class="top-panel-close" type="button" data-panel-close aria-label="Close settings panel"><svg class="ui-icon" viewBox="0 0 20 20" aria-hidden="true"><path d="m6 6 8 8M14 6l-8 8"/></svg></button>
                        </div>
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
                        <div class="settings-section-label">Quick actions</div>
                        <div class="settings-grid">
                            <button type="button" data-settings-action="fit"><span class="settings-action-icon" aria-hidden="true"><svg viewBox="0 0 20 20"><path d="M7 3H3v4M13 3h4v4M17 13v4h-4M7 17H3v-4"/></svg></span><span>Fit canvas</span></button>
                            <button type="button" data-settings-action="reset-layer"><span class="settings-action-icon" aria-hidden="true"><svg viewBox="0 0 20 20"><path d="m10 3 7 4-7 4-7-4 7-4Z"/><path d="m4 11 6 3.5 6-3.5M4 14.5l6 3 6-3"/></svg></span><span>All layers</span></button>
                            <button type="button" data-settings-action="contact"><span class="settings-action-icon" aria-hidden="true"><svg viewBox="0 0 20 20"><rect x="3" y="4" width="14" height="12" rx="2"/><circle cx="8" cy="9" r="2"/><path d="M5.5 14c.6-1.5 1.4-2.2 2.5-2.2s1.9.7 2.5 2.2M13 8h2M13 11h2"/></svg></span><span>Contact card</span></button>
                            <button type="button" data-settings-action="yc-system"><span class="settings-action-icon settings-action-icon--brand" aria-hidden="true"><svg viewBox="0 0 20 20"><path d="m5 5 5 6m5-6-5 6v5"/></svg></span><span>YC system</span></button>
                            <button type="button" data-sound-toggle aria-pressed="false"><span class="settings-action-icon audio-pulse" data-sound-icon data-state="off" aria-hidden="true"><svg viewBox="0 0 24 24"><path d="M4 10v4M8 7.5v9M12 5v14M16 8v8M20 10.5v3"/></svg></span><span data-sound-label>Sound off</span></button>
                            <button type="button" data-profile-action="print"><span class="settings-action-icon" aria-hidden="true"><svg viewBox="0 0 20 20"><path d="M6 3h6l3 3v11H6V3Z"/><path d="M12 3v4h3M8.5 11.5h4M10.5 9.5l2 2-2 2"/></svg></span><span>Open résumé PDF</span></button>
                        </div>
                    </section>
                </div>
            </div>
        </div>
    `;
})();
