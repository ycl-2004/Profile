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
                <div class="top-action-utils">
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
                </div>
                <button class="btn btn-primary" id="share-action" type="button" aria-expanded="false" aria-controls="share-panel">Share</button>
                <button class="btn btn-avatar" id="yc-logic-action" type="button" aria-label="Open YC personal system">YC</button>
                <div class="top-action-popovers" id="top-action-popovers">
                    <section class="top-action-panel share-panel" id="share-panel" role="dialog" aria-labelledby="share-panel-title" hidden>
                        <div class="top-panel-header">
                            <div>
                                <div class="top-panel-kicker">Share Profile</div>
                                <h2 id="share-panel-title">Send this canvas</h2>
                            </div>
                            <button class="top-panel-close" type="button" data-panel-close aria-label="Close share panel"><svg class="ui-icon" viewBox="0 0 20 20" aria-hidden="true"><path d="m6 6 8 8M14 6l-8 8"/></svg></button>
                        </div>

                        <div class="share-url">
                            <span class="share-url-host" id="share-url-text">ycl-2004.github.io/Profile/</span>
                            <button class="share-url-copy" type="button" data-share-action="copy" aria-label="Copy link to clipboard">
                                <svg class="ui-icon" viewBox="0 0 20 20" aria-hidden="true"><rect x="7" y="4" width="9" height="10" rx="2"/><path d="M13 16H6a2 2 0 0 1-2-2V7"/></svg>
                                <span>Copy</span>
                            </button>
                        </div>

                        <div class="panel-list">
                            <button class="panel-row" type="button" data-share-action="native">
                                <span class="panel-row-icon panel-row-icon--accent" aria-hidden="true"><svg viewBox="0 0 20 20"><path d="M10 13V3M10 3 6.5 6.5M10 3l3.5 3.5"/><path d="M4 12v3.5A1.5 1.5 0 0 0 5.5 17h9a1.5 1.5 0 0 0 1.5-1.5V12"/></svg></span>
                                <span class="panel-row-text"><span class="panel-row-label">Open share sheet</span><span class="panel-row-hint">Uses your system share menu</span></span>
                                <svg class="panel-row-chevron" viewBox="0 0 20 20" aria-hidden="true"><path d="m8 5 5 5-5 5"/></svg>
                            </button>
                            <button class="panel-row" type="button" data-share-network="linkedin">
                                <span class="panel-row-icon" aria-hidden="true"><svg viewBox="0 0 20 20"><path class="icon-fill" d="M5.4 7.2H2.5V17h2.9V7.2ZM4 2.5a1.7 1.7 0 1 0 0 3.4 1.7 1.7 0 0 0 0-3.4ZM10.1 7.2H7.3V17h2.8v-4.9c0-1.3.3-2.6 1.9-2.6 1.6 0 1.6 1.5 1.6 2.7V17h2.9v-5.4c0-2.7-.6-4.7-3.7-4.7-1.5 0-2.5.8-2.9 1.6h-.1V7.2h.3Z"/></svg></span>
                                <span class="panel-row-text"><span class="panel-row-label">LinkedIn</span></span>
                                <svg class="panel-row-chevron" viewBox="0 0 20 20" aria-hidden="true"><path d="M8 5h7v7M15 5 6 14"/></svg>
                            </button>
                            <button class="panel-row" type="button" data-share-network="x">
                                <span class="panel-row-icon" aria-hidden="true"><svg viewBox="0 0 20 20"><path class="icon-fill" d="M12.2 3h2.3l-5 5.7L15.4 17h-4.6l-3.2-4.2L3.9 17H1.6l5.4-6.1L1.9 3h4.7l2.9 3.8L12.2 3Zm-.8 12.6h1.3L5.4 4.3H4l7.4 11.3Z"/></svg></span>
                                <span class="panel-row-text"><span class="panel-row-label">X</span></span>
                                <svg class="panel-row-chevron" viewBox="0 0 20 20" aria-hidden="true"><path d="M8 5h7v7M15 5 6 14"/></svg>
                            </button>
                            <button class="panel-row" type="button" data-share-network="email">
                                <span class="panel-row-icon" aria-hidden="true"><svg viewBox="0 0 20 20"><rect x="3" y="5" width="14" height="10" rx="2"/><path d="m4 7 6 4 6-4"/></svg></span>
                                <span class="panel-row-text"><span class="panel-row-label">Email</span></span>
                                <svg class="panel-row-chevron" viewBox="0 0 20 20" aria-hidden="true"><path d="M8 5h7v7M15 5 6 14"/></svg>
                            </button>
                        </div>

                        <div class="top-panel-status" id="share-status" role="status" aria-live="polite"></div>
                    </section>
                    <section class="top-action-panel settings-panel" id="settings-panel" role="dialog" aria-labelledby="settings-panel-title" hidden>
                        <div class="top-panel-header">
                            <div>
                                <div class="top-panel-kicker">Canvas Settings</div>
                                <h2 id="settings-panel-title">Tune the view</h2>
                            </div>
                            <button class="top-panel-close" type="button" data-panel-close aria-label="Close settings panel"><svg class="ui-icon" viewBox="0 0 20 20" aria-hidden="true"><path d="m6 6 8 8M14 6l-8 8"/></svg></button>
                        </div>

                        <div class="settings-rows">
                            <div class="settings-row">
                                <span class="settings-row-label" id="settings-mode-label">View</span>
                                <div class="seg" role="group" aria-labelledby="settings-mode-label">
                                    <button type="button" data-settings-view="canvas">Canvas</button>
                                    <button type="button" data-settings-view="timeline">Timeline</button>
                                    <button type="button" data-settings-view="list">List</button>
                                </div>
                            </div>
                            <div class="settings-row">
                                <span class="settings-row-label" id="settings-theme-label">Theme</span>
                                <div class="seg" role="group" aria-labelledby="settings-theme-label">
                                    <button type="button" data-settings-theme="light">Light</button>
                                    <button type="button" data-settings-theme="dark">Dark</button>
                                    <button type="button" data-settings-theme="auto">Auto</button>
                                </div>
                            </div>
                            <div class="settings-row">
                                <span class="settings-row-label" id="settings-motion-label">Motion</span>
                                <div class="seg" role="group" aria-labelledby="settings-motion-label">
                                    <button type="button" data-motion-option="full">Full</button>
                                    <button type="button" data-motion-option="reduced">Reduced</button>
                                </div>
                            </div>
                        </div>

                        <div class="panel-section-label">Quick actions</div>
                        <div class="panel-list">
                            <button class="panel-row" type="button" data-settings-action="fit">
                                <span class="panel-row-icon" aria-hidden="true"><svg viewBox="0 0 20 20"><path d="M8 3H3v5M17 8V3h-5M12 17h5v-5M3 12v5h5"/></svg></span>
                                <span class="panel-row-text"><span class="panel-row-label">Fit canvas to view</span></span>
                            </button>
                            <button class="panel-row" type="button" data-settings-action="reset-layer">
                                <span class="panel-row-icon" aria-hidden="true"><svg viewBox="0 0 20 20"><path d="m10 3 7 4-7 4-7-4 7-4Z"/><path d="m4 11 6 3.5 6-3.5M4 14.5l6 3 6-3"/></svg></span>
                                <span class="panel-row-text"><span class="panel-row-label">Show all layers</span></span>
                            </button>
                            <button class="panel-row" type="button" data-settings-action="contact">
                                <span class="panel-row-icon" aria-hidden="true"><svg viewBox="0 0 20 20"><rect x="3" y="4" width="14" height="12" rx="2"/><circle cx="8" cy="9" r="2"/><path d="M5.5 14c.6-1.5 1.4-2.2 2.5-2.2s1.9.7 2.5 2.2M13 8h2M13 11h2"/></svg></span>
                                <span class="panel-row-text"><span class="panel-row-label">Contact card</span></span>
                            </button>
                            <button class="panel-row" type="button" data-settings-action="yc-system">
                                <span class="panel-row-icon panel-row-icon--brand" aria-hidden="true"><svg viewBox="0 0 20 20"><path d="m5 5 5 6m5-6-5 6v5"/></svg></span>
                                <span class="panel-row-text"><span class="panel-row-label">YC system</span></span>
                            </button>
                            <button class="panel-row" type="button" data-sound-toggle aria-pressed="false">
                                <span class="panel-row-icon audio-pulse" data-sound-icon data-state="off" aria-hidden="true"><svg viewBox="0 0 24 24"><path d="M4 10v4M8 7.5v9M12 5v14M16 8v8M20 10.5v3"/></svg></span>
                                <span class="panel-row-text"><span class="panel-row-label" data-sound-label>Sound off</span></span>
                            </button>
                            <button class="panel-row" type="button" data-profile-action="print">
                                <span class="panel-row-icon" aria-hidden="true"><svg viewBox="0 0 20 20"><path d="M6 3h6l3 3v11H6V3Z"/><path d="M12 3v4h3M8.5 11.5h4M10.5 9.5l2 2-2 2"/></svg></span>
                                <span class="panel-row-text"><span class="panel-row-label">Open résumé PDF</span></span>
                                <svg class="panel-row-chevron" viewBox="0 0 20 20" aria-hidden="true"><path d="M8 5h7v7M15 5 6 14"/></svg>
                            </button>
                        </div>
                    </section>
                </div>
            </div>
        </div>
    `;
})();
