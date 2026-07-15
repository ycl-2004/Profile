(function () {
  const app = window.PortfolioApp;

  app.templates.terminal = `
        <div id="terminal-entry" role="dialog" aria-modal="true" aria-labelledby="terminal-entry-title">
            <div class="terminal-stage">
                <div class="terminal-shell">
                    <div class="terminal-shell-header">
                        <div class="terminal-shell-controls" aria-hidden="true">
                            <span class="terminal-shell-dot terminal-shell-dot--close"></span>
                            <span class="terminal-shell-dot terminal-shell-dot--minimize"></span>
                            <span class="terminal-shell-dot terminal-shell-dot--zoom"></span>
                        </div>
                        <div class="terminal-shell-title" id="terminal-entry-title">yichen@portfolio ~ intro</div>
                        <div class="terminal-shell-badge">◎ Proof Mode</div>
                    </div>

                    <div class="terminal-shell-body">
                        <div class="terminal-hero-layout">
                            <section class="terminal-hero-main">
                                <div class="terminal-line terminal-eyebrow" style="animation-delay:0.16s;">Hello, I’m</div>
                                <h1 class="terminal-line terminal-name terminal-nav-target is-active" data-nav-target="hero" style="animation-delay:0.34s;">
                                    Yi-Chen Lin<span class="terminal-name-cursor terminal-nav-cursor"></span>
                                </h1>
                                <p class="terminal-line terminal-role terminal-nav-target terminal-nav-inline terminal-nav-marker" data-nav-target="role" style="animation-delay:0.54s;">Product Engineer · Systems Builder</p>
                                <p class="terminal-line terminal-summary terminal-nav-target terminal-nav-inline terminal-nav-marker" data-nav-target="summary" style="animation-delay:0.78s;">
                                    I build software where product surfaces meet real system logic — from industrial field tools and native apps
                                    to <span class="terminal-summary-accent">AI infrastructure and open-source workflows</span>.
                                </p>

                                <div class="terminal-line terminal-quickfacts terminal-nav-target terminal-nav-section terminal-nav-marker" data-nav-target="quickfacts" style="animation-delay:1s;">
                                    <span class="terminal-quickfact terminal-tone-pink">Based in Vancouver</span>
                                    <span class="terminal-quickfact terminal-tone-violet">Software Developer · Delta Controls</span>
                                    <span class="terminal-quickfact terminal-tone-blue">UBC Electrical Engineering · May 2027</span>
                                </div>

                                <div class="terminal-line terminal-building terminal-nav-target terminal-nav-section terminal-nav-marker" data-nav-target="building" style="animation-delay:1.22s;">
                                    <div class="terminal-section-kicker">
                                        <span class="terminal-section-icon">↗</span>
                                        <span>Verified signals</span>
                                    </div>
                                    <ul class="terminal-project-list">
                                        <li class="terminal-project-item terminal-tone-pink">
                                            <span class="terminal-project-dot" aria-hidden="true"></span>
                                            <div>
                                                <strong>Industrial software</strong>
                                                <span>10 merged PRs across BLE, visualization, test tooling, and control workflows</span>
                                            </div>
                                        </li>
                                        <li class="terminal-project-item terminal-tone-violet">
                                            <span class="terminal-project-dot" aria-hidden="true"></span>
                                            <div>
                                                <strong>Open-source maintenance</strong>
                                                <span>3 upstream PRs merged, with one active product and source-quality improvement</span>
                                            </div>
                                        </li>
                                        <li class="terminal-project-item terminal-tone-blue">
                                            <span class="terminal-project-dot" aria-hidden="true"></span>
                                            <div>
                                                <strong>Original systems</strong>
                                                <span>YC Cast, YCAPIKit, YC Obsidian, ShareMemory, and Always</span>
                                            </div>
                                        </li>
                                    </ul>
                                </div>

                                <div class="terminal-line terminal-command-preview terminal-nav-target terminal-nav-inline" data-nav-target="command" style="animation-delay:1.46s;">
                                    <span class="terminal-prompt">yichen@portfolio</span> ~ % <span class="terminal-command">open evidence-canvas --verified</span><span class="terminal-cursor terminal-nav-cursor"></span>
                                </div>
                            </section>

                            <aside class="terminal-line terminal-detail-panel" style="animation-delay:1.02s;">
                                <section class="terminal-panel-section terminal-nav-target terminal-nav-panel terminal-nav-marker" data-nav-target="about">
                                    <div class="terminal-panel-title"><span class="terminal-panel-icon">◌</span><span>How I build</span></div>
                                    <p>I turn ambiguity into observable systems: working interfaces, testable workflows, and clear evidence of what shipped.</p>
                                </section>

                                <section class="terminal-panel-section terminal-nav-target terminal-nav-panel terminal-nav-marker" data-nav-target="what">
                                    <div class="terminal-panel-title"><span class="terminal-panel-icon">✦</span><span>What I build</span></div>
                                    <ul class="terminal-panel-list">
                                        <li>Industrial web and Android workflows</li>
                                        <li>Native macOS and iPadOS products</li>
                                        <li>AI runtimes, RAG tools, and agent systems</li>
                                        <li>Public knowledge and workflow infrastructure</li>
                                    </ul>
                                </section>

                                <section class="terminal-panel-section terminal-nav-target terminal-nav-panel terminal-nav-marker" data-nav-target="tools">
                                    <div class="terminal-panel-title"><span class="terminal-panel-icon">⬢</span><span>Tech &amp; tools</span></div>
                                    <div class="terminal-chip-cloud">
                                        <span class="terminal-chip terminal-tone-pink">React</span>
                                        <span class="terminal-chip terminal-tone-violet">TypeScript</span>
                                        <span class="terminal-chip terminal-tone-blue">Kotlin</span>
                                        <span class="terminal-chip terminal-tone-violet">Swift</span>
                                        <span class="terminal-chip terminal-tone-pink">Python</span>
                                        <span class="terminal-chip terminal-tone-violet">FastAPI</span>
                                        <span class="terminal-chip terminal-tone-blue">BLE / IP</span>
                                        <span class="terminal-chip terminal-tone-pink">AI / LLM</span>
                                    </div>
                                </section>

                                <section class="terminal-panel-section terminal-panel-section--closing terminal-nav-target terminal-nav-panel terminal-nav-marker" data-nav-target="note">
                                    <p class="terminal-panel-note">Based in Vancouver. Open to 2027 software opportunities and useful collaborations.</p>
                                </section>
                            </aside>
                        </div>

                        <div class="terminal-line terminal-metric-grid" style="animation-delay:1.7s;">
                            <article class="terminal-metric terminal-tone-pink">
                                <div class="terminal-metric-icon">&lt;/&gt;</div>
                                <div>
                                    <div class="terminal-metric-value">10</div>
                                    <div class="terminal-metric-label">Merged Work PRs</div>
                                </div>
                            </article>
                            <article class="terminal-metric terminal-tone-violet">
                                <div class="terminal-metric-icon">⬢</div>
                                <div>
                                    <div class="terminal-metric-value">3</div>
                                    <div class="terminal-metric-label">Upstream PRs Merged</div>
                                </div>
                            </article>
                            <article class="terminal-metric terminal-tone-blue">
                                <div class="terminal-metric-icon">⚡</div>
                                <div>
                                    <div class="terminal-metric-value">31</div>
                                    <div class="terminal-metric-label">Public Repositories</div>
                                </div>
                            </article>
                            <article class="terminal-metric terminal-tone-violet">
                                <div class="terminal-metric-icon">◎</div>
                                <div>
                                    <div class="terminal-metric-value">May 2027</div>
                                    <div class="terminal-metric-label">Expected Graduation</div>
                                </div>
                            </article>
                        </div>

                        <div class="terminal-line terminal-launch" aria-live="polite" style="animation-delay:1.92s;">
                            <div class="terminal-launch-controls">
                                <button class="terminal-enter-button" id="terminal-launch-button" type="button">
                                    <span>Enter the evidence canvas</span>
                                    <span class="terminal-enter-button-icon" aria-hidden="true">↵</span>
                                </button>
                                <div class="terminal-secondary-actions">
                                    <button class="terminal-secondary-button" id="terminal-skip-button" type="button">Skip to searchable résumé</button>
                                    <button class="terminal-secondary-button" type="button" data-sound-toggle aria-pressed="false"><span data-sound-icon aria-hidden="true">🔇</span> <span data-sound-label>Sound off</span></button>
                                </div>
                            </div>
                            <div class="terminal-progress-wrap">
                                <div class="terminal-progress" id="terminal-progress" role="progressbar" aria-valuemin="0" aria-valuemax="120" aria-valuenow="0" aria-label="Canvas charge progress">
                                    <span class="terminal-progress-label">Boot</span>
                                    <div class="terminal-battery">
                                        <div class="terminal-battery-shell">
                                            <div class="terminal-progress-track">
                                                <div class="terminal-progress-fill" id="terminal-progress-fill"></div>
                                            </div>
                                        </div>
                                        <div class="terminal-battery-cap" aria-hidden="true"></div>
                                    </div>
                                    <span class="terminal-progress-value" id="terminal-progress-value">000 / 120</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    `;
})();
