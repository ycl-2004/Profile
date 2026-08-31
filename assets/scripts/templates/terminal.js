(function () {
  const app = window.PortfolioApp;

  // The entry page has one job: prove the evidence exists, then get out of the
  // way. Everything it used to say about stack, philosophy, and project lists
  // now lives on the canvas, where it belongs. A visitor who reads the whole
  // entry page and feels finished never opens the canvas.
  app.templates.terminal = `
        <div id="terminal-entry" role="dialog" aria-modal="true" aria-labelledby="entry-name">
            <div class="entry-stage">
                <section class="entry-lede">
                    <h1 id="entry-name" class="terminal-line entry-name terminal-nav-target is-active" data-nav-target="hero" style="animation-delay:0.14s;">
                        Yi-Chen Lin<span class="entry-caret terminal-nav-cursor" aria-hidden="true"></span>
                    </h1>

                    <p class="terminal-line entry-role" style="animation-delay:0.24s;">AI-Focused Software Engineer · Systems Builder</p>

                    <p class="terminal-line entry-text terminal-nav-target" data-nav-target="lede" style="animation-delay:0.34s;">
                        I build software where product surfaces meet real system logic: RAG pipelines and
                        agent orchestration, industrial field tools, and native apps I ship publicly.
                    </p>

                    <dl class="terminal-line entry-proof terminal-nav-target" data-nav-target="proof" style="animation-delay:0.46s;">
                        <div class="entry-proof-item">
                            <dt>Public GitHub stars</dt>
                            <dd>120+</dd>
                        </div>
                        <div class="entry-proof-item">
                            <dt>Upstream PRs merged</dt>
                            <dd>3</dd>
                        </div>
                        <div class="entry-proof-item">
                            <dt>Public repositories</dt>
                            <dd>29</dd>
                        </div>
                    </dl>

                    <div class="terminal-line entry-actions" style="animation-delay:0.58s;">
                        <button class="entry-cta" id="terminal-launch-button" type="button">Enter the evidence canvas</button>
                        <div class="entry-actions-minor">
                            <a class="entry-link" id="terminal-resume-link" href="https://ycl-2004.github.io/Resume/YC-Resume.pdf" target="_blank" rel="noopener noreferrer">Résumé (PDF) ↗</a>
                            <button class="entry-link entry-link--quiet" type="button" data-sound-toggle aria-pressed="false"><span data-sound-label>Sound off</span></button>
                        </div>
                    </div>

                    <p class="terminal-line entry-meta" style="animation-delay:0.68s;">
                        <span>Vancouver</span>
                        <span>Delta Controls · Aiwoici (Zhuhai) Technology Co., Ltd.</span>
                        <span>UBC Electrical Engineering, May 2027</span>
                    </p>
                </section>

                <aside class="terminal-line entry-preview terminal-nav-target" data-nav-target="preview" style="animation-delay:0.40s;">
                    <div class="entry-orbit" id="entry-orbit"></div>
                <p class="entry-preview-caption" id="entry-preview-caption">Projects and roles, mapped by how they connect.</p>
                </aside>
            </div>

            <div class="entry-launch-status" id="terminal-progress" role="progressbar" aria-valuemin="0" aria-valuemax="120" aria-valuenow="0" aria-label="Canvas load progress">
                <span class="terminal-progress-label">Verify</span>
                <span class="entry-launch-track"><span class="entry-launch-fill" id="terminal-progress-fill"></span></span>
                <span class="entry-launch-value" id="terminal-progress-value">000 / 120</span>
            </div>
        </div>
    `;
})();
