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
                        <div class="terminal-shell-badge">&lt;/&gt; Canvas Bootstrap</div>
                    </div>

                    <div class="terminal-shell-body">
                        <div class="terminal-hero-layout">
                            <section class="terminal-hero-main">
                                <div class="terminal-line terminal-eyebrow" style="animation-delay:0.16s;">Hello, I’m</div>
                                <h1 class="terminal-line terminal-name terminal-nav-target is-active" data-nav-target="hero" style="animation-delay:0.34s;">
                                    Yi-Chen Lin<span class="terminal-name-cursor terminal-nav-cursor"></span>
                                </h1>
                                <p class="terminal-line terminal-role terminal-nav-target terminal-nav-inline terminal-nav-marker" data-nav-target="role" style="animation-delay:0.54s;">AI-Native Product Engineer · Full-Stack Builder</p>
                                <p class="terminal-line terminal-summary terminal-nav-target terminal-nav-inline terminal-nav-marker" data-nav-target="summary" style="animation-delay:0.78s;">
                                    I build practical systems that solve real problems by combining software engineering, product thinking,
                                    and <span class="terminal-summary-accent">AI-powered workflows</span>.
                                </p>

                                <div class="terminal-line terminal-quickfacts terminal-nav-target terminal-nav-section terminal-nav-marker" data-nav-target="quickfacts" style="animation-delay:1s;">
                                    <span class="terminal-quickfact terminal-tone-pink">Based in Vancouver</span>
                                    <span class="terminal-quickfact terminal-tone-violet">Open to Internships</span>
                                    <span class="terminal-quickfact terminal-tone-blue">Web · Desktop · AI Systems</span>
                                </div>

                                <div class="terminal-line terminal-building terminal-nav-target terminal-nav-section terminal-nav-marker" data-nav-target="building" style="animation-delay:1.22s;">
                                    <div class="terminal-section-kicker">
                                        <span class="terminal-section-icon">↗</span>
                                        <span>Currently building</span>
                                    </div>
                                    <ul class="terminal-project-list">
                                        <li class="terminal-project-item terminal-tone-pink">
                                            <span class="terminal-project-dot" aria-hidden="true"></span>
                                            <div>
                                                <strong>Family Care Reminder</strong>
                                                <span>Cross-platform reminder flow for seniors and family coordination</span>
                                            </div>
                                        </li>
                                        <li class="terminal-project-item terminal-tone-violet">
                                            <span class="terminal-project-dot" aria-hidden="true"></span>
                                            <div>
                                                <strong>YCAPIKit</strong>
                                                <span>Multi-provider AI runtime for Swift applications</span>
                                            </div>
                                        </li>
                                        <li class="terminal-project-item terminal-tone-blue">
                                            <span class="terminal-project-dot" aria-hidden="true"></span>
                                            <div>
                                                <strong>CryptoPulse</strong>
                                                <span>Real-time crypto analytics dashboard</span>
                                            </div>
                                        </li>
                                    </ul>
                                </div>

                                <div class="terminal-line terminal-command-preview terminal-nav-target terminal-nav-inline" data-nav-target="command" style="animation-delay:1.46s;">
                                    <span class="terminal-prompt">yichen@portfolio</span> ~ % <span class="terminal-command">open YC Profile.app</span><span class="terminal-cursor terminal-nav-cursor"></span>
                                </div>
                            </section>

                            <aside class="terminal-line terminal-detail-panel" style="animation-delay:1.02s;">
                                <section class="terminal-panel-section terminal-nav-target terminal-nav-panel terminal-nav-marker" data-nav-target="about">
                                    <div class="terminal-panel-title"><span class="terminal-panel-icon">◌</span><span>About me</span></div>
                                    <p>I turn ambiguity into useful systems with a strong bias for clarity, execution, and real-world usefulness.</p>
                                </section>

                                <section class="terminal-panel-section terminal-nav-target terminal-nav-panel terminal-nav-marker" data-nav-target="what">
                                    <div class="terminal-panel-title"><span class="terminal-panel-icon">✦</span><span>What I do</span></div>
                                    <ul class="terminal-panel-list">
                                        <li>AI-native development workflows</li>
                                        <li>Full-stack product building</li>
                                        <li>System design and automation</li>
                                        <li>Rapid prototyping with product judgment</li>
                                    </ul>
                                </section>

                                <section class="terminal-panel-section terminal-nav-target terminal-nav-panel terminal-nav-marker" data-nav-target="tools">
                                    <div class="terminal-panel-title"><span class="terminal-panel-icon">⬢</span><span>Tech &amp; tools</span></div>
                                    <div class="terminal-chip-cloud">
                                        <span class="terminal-chip terminal-tone-pink">React</span>
                                        <span class="terminal-chip terminal-tone-violet">TypeScript</span>
                                        <span class="terminal-chip terminal-tone-blue">Flutter</span>
                                        <span class="terminal-chip terminal-tone-violet">Git</span>
                                        <span class="terminal-chip terminal-tone-pink">Supabase</span>
                                        <span class="terminal-chip terminal-tone-violet">SwiftUI</span>
                                        <span class="terminal-chip terminal-tone-blue">AI / LLM</span>
                                        <span class="terminal-chip terminal-tone-pink">Tauri</span>
                                    </div>
                                </section>

                                <section class="terminal-panel-section terminal-panel-section--closing terminal-nav-target terminal-nav-panel terminal-nav-marker" data-nav-target="note">
                                    <p class="terminal-panel-note">Based in Vancouver. Open to internships, thoughtful collaborations, and meaningful product work.</p>
                                </section>
                            </aside>
                        </div>

                        <div class="terminal-line terminal-metric-grid" style="animation-delay:1.7s;">
                            <article class="terminal-metric terminal-tone-pink">
                                <div class="terminal-metric-icon">&lt;/&gt;</div>
                                <div>
                                    <div class="terminal-metric-value">10+</div>
                                    <div class="terminal-metric-label">Projects Built</div>
                                </div>
                            </article>
                            <article class="terminal-metric terminal-tone-violet">
                                <div class="terminal-metric-icon">⬢</div>
                                <div>
                                    <div class="terminal-metric-value">Full-Stack</div>
                                    <div class="terminal-metric-label">End to End Delivery</div>
                                </div>
                            </article>
                            <article class="terminal-metric terminal-tone-blue">
                                <div class="terminal-metric-icon">⚡</div>
                                <div>
                                    <div class="terminal-metric-value">AI-Native</div>
                                    <div class="terminal-metric-label">Workflow Design</div>
                                </div>
                            </article>
                            <article class="terminal-metric terminal-tone-violet">
                                <div class="terminal-metric-icon">◎</div>
                                <div>
                                    <div class="terminal-metric-value">1 Person + AI</div>
                                    <div class="terminal-metric-label">Scalable Builder</div>
                                </div>
                            </article>
                        </div>

                        <div class="terminal-line terminal-launch" aria-live="polite" style="animation-delay:1.92s;">
                            <button class="terminal-enter-button" id="terminal-launch-button" type="button">
                                <span>Press Enter to explore the canvas</span>
                                <span class="terminal-enter-button-icon" aria-hidden="true">↵</span>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    `;
})();
