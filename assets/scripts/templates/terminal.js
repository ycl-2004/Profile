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
                        <div class="terminal-shell-badge">Canvas bootstrap</div>
                    </div>

                    <div class="terminal-shell-body">
                        <div class="terminal-content">
                            <div class="terminal-line terminal-line--prompt" style="animation-delay:0.18s;"><span class="terminal-prompt">yichen@portfolio</span> ~ % <span class="terminal-command">whoami</span></div>
                            <div class="terminal-line terminal-line--response" style="animation-delay:0.46s;">&gt; YI-CHEN LIN</div>
                            <div class="terminal-line terminal-line--prompt" style="animation-delay:0.78s;"><span class="terminal-prompt">yichen@portfolio</span> ~ % <span class="terminal-command">cat about.md</span></div>
                            <div class="terminal-line terminal-line--response" style="animation-delay:1.06s;">&gt; UBC Electrical Engineering · Web3 Builder · AI-assisted Developer</div>
                            <div class="terminal-line terminal-line--prompt" style="animation-delay:1.38s;"><span class="terminal-prompt">yichen@portfolio</span> ~ % <span class="terminal-command">echo "Engineer + AI = Future"</span></div>
                            <div class="terminal-line terminal-line--response terminal-line--accent" style="animation-delay:1.66s;">&gt; Engineer + AI = Future</div>
                            <div class="terminal-line terminal-line--prompt terminal-line--launch" style="animation-delay:1.98s;"><span class="terminal-prompt">yichen@portfolio</span> ~ % <span class="terminal-command">open yichen-canvas.app</span><span class="terminal-cursor"></span></div>
                        </div>

                        <div class="terminal-launch" aria-live="polite">
                            <div class="terminal-progress">
                                <span class="terminal-progress-bracket">[</span>
                                <div class="terminal-progress-track" aria-hidden="true">
                                    <div class="terminal-progress-fill" id="terminal-progress-fill"></div>
                                </div>
                                <span class="terminal-progress-bracket">]</span>
                                <span class="terminal-progress-value" id="terminal-progress-value">0%</span>
                            </div>
                            <div class="terminal-launch-status" id="terminal-launch-status">Launch sequence armed.</div>
                        </div>
                    </div>
                </div>
            </div>

            <div class="terminal-footer">
                <div class="terminal-hint">
                    <kbd class="terminal-keycap">Enter</kbd>
                    <span>进入 Canvas 画布</span>
                    <span class="terminal-hint-divider"></span>
                    <span>Press Enter to enter Canvas</span>
                </div>
                <button class="terminal-enter-button" id="terminal-launch-button" type="button">Press Enter</button>
            </div>
        </div>
    `;
})();
