(function () {
    const app = window.PortfolioApp;

    app.templates.terminal = `
        <div id="terminal-entry">
            <div class="terminal-content">
                <div class="terminal-line" style="animation-delay:0.2s;"><span class="terminal-prompt">yichen@portfolio</span> ~ % <span class="terminal-command">whoami</span></div>
                <div class="terminal-line" style="animation-delay:0.6s;">&gt; YI-CHEN LIN</div>
                <div class="terminal-line" style="animation-delay:1.0s;"><span class="terminal-prompt">yichen@portfolio</span> ~ % <span class="terminal-command">cat about.md</span></div>
                <div class="terminal-line" style="animation-delay:1.4s;">&gt; UBC Electrical Engineering · Web3 Builder · AI-assisted Developer</div>
                <div class="terminal-line" style="animation-delay:1.8s;"><span class="terminal-prompt">yichen@portfolio</span> ~ % <span class="terminal-command">echo "Engineer + AI = Future"</span></div>
                <div class="terminal-line" style="animation-delay:2.2s;font-size:16px;color:#ffb3c6;">&gt; Engineer + AI = Future<span class="terminal-cursor"></span></div>
            </div>
            <div class="terminal-hint">按 Enter 进入 Canvas 画布 · Press Enter to enter Canvas</div>
        </div>
    `;
})();
