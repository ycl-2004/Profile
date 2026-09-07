(function () {
    const app = window.PortfolioApp;

    const TABS = [
        { id: 'system', label: 'System' },
        { id: 'decisions', label: 'Decisions' },
        { id: 'constraints', label: 'Constraints' },
        { id: 'failures', label: 'Failures' },
        { id: 'evidence', label: 'Evidence' }
    ];

    function pad(index) {
        return String(index + 1).padStart(2, '0');
    }

    function flattenNodeIds(map) {
        return map.stages.flat();
    }

    // Wire shapes are derived from the stage widths rather than authored, so a
    // breakdown only has to describe which nodes share a row.
    function renderLink(fromCount, toCount) {
        const chevron = '<span class="sysmap-tip" aria-hidden="true"></span>';

        if (fromCount === 1 && toCount === 1) {
            return `<div class="sysmap-link" data-shape="line" aria-hidden="true"><span class="sysmap-stem" data-pos="full">${chevron}</span></div>`;
        }

        const fanned = fromCount === 1 ? toCount : fromCount;
        const edge = (0.5 / fanned) * 100;
        const legs = Array.from({ length: fanned }, (unused, index) => {
            const left = ((index + 0.5) / fanned) * 100;
            const pos = fromCount === 1 ? 'bottom' : 'top';
            const tip = fromCount === 1 ? chevron : '';
            return `<span class="sysmap-leg" data-pos="${pos}" style="left:${left.toFixed(2)}%">${tip}</span>`;
        }).join('');
        const bar = `<span class="sysmap-bar" style="left:${edge.toFixed(2)}%;right:${edge.toFixed(2)}%"></span>`;
        const stem = fromCount === 1
            ? '<span class="sysmap-stem" data-pos="top"></span>'
            : `<span class="sysmap-stem" data-pos="bottom">${chevron}</span>`;
        const shape = fromCount === 1 ? 'split' : 'merge';

        return `<div class="sysmap-link" data-shape="${shape}" aria-hidden="true">${stem}${bar}${legs}</div>`;
    }

    function renderMap(breakdown) {
        const order = flattenNodeIds(breakdown.map);
        let cursor = 0;

        const stages = breakdown.map.stages.map((stage, stageIndex) => {
            const previous = stageIndex === 0 ? null : breakdown.map.stages[stageIndex - 1];
            const link = previous ? renderLink(previous.length, stage.length) : '';
            const nodes = stage.map((nodeId) => {
                const node = breakdown.nodes[nodeId];
                const step = pad(order.indexOf(nodeId));
                const selected = cursor === 0;
                cursor += 1;

                return `
                    <button class="sysnode" type="button" role="tab" data-sys-node="${nodeId}"
                        data-kind="${node.kind}" aria-selected="${selected}" aria-controls="sys-detail"
                        tabindex="${selected ? '0' : '-1'}">
                        <span class="sysnode-step">${step}</span>
                        <span class="sysnode-body">
                            <span class="sysnode-title">${node.title}</span>
                            <span class="sysnode-meta">${node.meta}</span>
                        </span>
                    </button>`;
            }).join('');

            return `${link}<div class="sysmap-stage" style="--fan:${stage.length}">${nodes}</div>`;
        }).join('');

        return `
            <div class="sysmap sysview-stagger" role="tablist" aria-orientation="vertical" aria-label="Orbit system map">
                <div class="sysmap-entry">${breakdown.map.entry}</div>
                ${renderLink(1, breakdown.map.stages[0].length)}
                ${stages}
            </div>`;
    }

    function renderDetail(breakdown, nodeId) {
        const order = flattenNodeIds(breakdown.map);
        const node = breakdown.nodes[nodeId];
        if (!node) return '';

        const flags = (node.flags || [])
            .map((flag) => `<span class="sysflag" data-tone="${flag.tone}">${flag.label}</span>`)
            .join('');
        const rows = (node.detail || [])
            .map((row) => `<div class="sysrow"><dt>${row.label}</dt><dd>${row.text}</dd></div>`)
            .join('');
        const source = node.source
            ? `<p class="sysdetail-source"><span>Source</span><code>${node.source}</code></p>`
            : '';

        return `
            <div class="sysdetail-inner" data-kind="${node.kind}">
                <div class="sysdetail-eyebrow">
                    <span class="sysdetail-step">${pad(order.indexOf(nodeId))}</span>
                    <span class="sysdetail-kindlabel">${node.kind}</span>
                </div>
                <h4 class="sysdetail-title">${node.title}</h4>
                <p class="sysdetail-role">${node.role}</p>
                ${flags ? `<div class="sysdetail-flags">${flags}</div>` : ''}
                <dl class="sysdetail-list">${rows}</dl>
                ${source}
            </div>`;
    }

    function renderDecisions(breakdown) {
        return breakdown.decisions.map((decision) => `
            <article class="sysdecision sysview-stagger">
                <div class="sysdecision-head">
                    <span class="sysdecision-ref">${decision.ref}</span>
                    <h4>${decision.title}</h4>
                </div>
                <dl class="sysdetail-list">
                    <div class="sysrow"><dt>Context</dt><dd>${decision.context}</dd></div>
                    <div class="sysrow"><dt>Decision</dt><dd>${decision.decision}</dd></div>
                    <div class="sysrow" data-accent="tradeoff"><dt>Trade-off</dt><dd>${decision.tradeoff}</dd></div>
                    <div class="sysrow" data-accent="result"><dt>Result</dt><dd>${decision.result}</dd></div>
                </dl>
            </article>`).join('');
    }

    function renderConstraints(breakdown) {
        return breakdown.constraints.map((constraint, index) => `
            <article class="sysconstraint sysview-stagger">
                <span class="sysconstraint-index">${pad(index)}</span>
                <div>
                    <h4>${constraint.title}</h4>
                    <p>${constraint.text}</p>
                </div>
            </article>`).join('');
    }

    function renderFailures(breakdown) {
        return breakdown.failures.map((failure) => `
            <article class="sysfailure sysview-stagger">
                <div class="sysfailure-head">
                    <h4>${failure.title}</h4>
                    ${failure.ref ? `<span class="sysdecision-ref">${failure.ref}</span>` : ''}
                </div>
                <div class="sysfailure-chain">
                    <div class="syschain-step" data-step="observed"><span>Observed</span><p>${failure.observed}</p></div>
                    <div class="syschain-step" data-step="cause"><span>Cause</span><p>${failure.cause}</p></div>
                    <div class="syschain-step" data-step="fix"><span>Fix</span><p>${failure.fix}</p></div>
                </div>
            </article>`).join('');
    }

    function renderEvidence(breakdown) {
        const stats = breakdown.evidence.stats.map((stat) => `
            <div class="sysstat">
                <strong>${stat.value}</strong>
                <span class="sysstat-label">${stat.label}</span>
                <span class="sysstat-note">${stat.note}</span>
            </div>`).join('');
        const links = breakdown.evidence.links.map((link) => `
            <a class="syslink" href="${link.href}" target="_blank" rel="noopener noreferrer">
                <span class="syslink-label">${link.label}</span>
                <span class="syslink-text">${link.text}</span>
            </a>`).join('');

        return `
            <div class="sysstat-grid sysview-stagger">${stats}</div>
            ${breakdown.evidence.note ? `<p class="sysnote sysview-stagger">${breakdown.evidence.note}</p>` : ''}
            <div class="syslink-grid sysview-stagger">${links}</div>`;
    }

    app.renderSystemBreakdown = function renderSystemBreakdown(cardId) {
        const breakdown = app.data.systemBreakdowns?.[cardId];
        if (!breakdown) return '';

        const firstNode = flattenNodeIds(breakdown.map)[0];
        const tabs = TABS.map((tab, index) => `
            <button class="systab" type="button" role="tab" data-sys-tab="${tab.id}"
                aria-selected="${index === 0}" aria-controls="sys-panel-${tab.id}"
                tabindex="${index === 0 ? '0' : '-1'}">${tab.label}</button>`).join('');

        return `
            <div class="sysview" data-sysview="${cardId}">
                <div class="sysview-thesis sysview-stagger">
                    <span class="sysview-thesis-label">System thesis</span>
                    <p class="sysview-thesis-line">${breakdown.thesis}</p>
                    <p class="sysview-frame">${breakdown.frame}</p>
                </div>

                <div class="sysview-tabs sysview-stagger" role="tablist" aria-label="Breakdown sections">${tabs}</div>

                <div class="sysview-panels">
                    <section class="sysview-panel" role="tabpanel" id="sys-panel-system" data-sys-panel="system" tabindex="0">
                        <div class="sysview-split">
                            ${renderMap(breakdown)}
                            <div class="sysdetail sysview-stagger" id="sys-detail" role="tabpanel" tabindex="0">${renderDetail(breakdown, firstNode)}</div>
                        </div>
                    </section>
                    <section class="sysview-panel" role="tabpanel" id="sys-panel-decisions" data-sys-panel="decisions" tabindex="0" hidden>
                        <div class="sysgrid">${renderDecisions(breakdown)}</div>
                    </section>
                    <section class="sysview-panel" role="tabpanel" id="sys-panel-constraints" data-sys-panel="constraints" tabindex="0" hidden>
                        <p class="sysview-panel-lead">What the platform refuses to give, and what the product does about it.</p>
                        <div class="sysstack">${renderConstraints(breakdown)}</div>
                    </section>
                    <section class="sysview-panel" role="tabpanel" id="sys-panel-failures" data-sys-panel="failures" tabindex="0" hidden>
                        <p class="sysview-panel-lead">Things that shipped wrong, what caused them, and what changed in the system.</p>
                        <div class="sysstack">${renderFailures(breakdown)}</div>
                    </section>
                    <section class="sysview-panel" role="tabpanel" id="sys-panel-evidence" data-sys-panel="evidence" tabindex="0" hidden>
                        ${renderEvidence(breakdown)}
                    </section>
                </div>
            </div>`;
    };

    app.bindSystemBreakdown = function bindSystemBreakdown(cardId) {
        const root = app.dom.modalBody?.querySelector('.sysview');
        const breakdown = app.data.systemBreakdowns?.[cardId];
        if (!root || !breakdown) return;

        const tabButtons = Array.from(root.querySelectorAll('[data-sys-tab]'));
        const panels = Array.from(root.querySelectorAll('[data-sys-panel]'));
        const nodeButtons = Array.from(root.querySelectorAll('[data-sys-node]'));
        const detail = root.querySelector('#sys-detail');

        function selectTab(tabId, focus) {
            tabButtons.forEach((button) => {
                const active = button.dataset.sysTab === tabId;
                button.setAttribute('aria-selected', String(active));
                button.tabIndex = active ? 0 : -1;
                if (active && focus) button.focus();
            });
            panels.forEach((panel) => {
                panel.hidden = panel.dataset.sysPanel !== tabId;
            });
            root.dataset.activeTab = tabId;
            // Panels differ in length, so a new tab starts at its own top.
            app.dom.modalBody?.scrollTo({ top: 0, behavior: 'smooth' });
            app.playSound?.('tap');
        }

        function selectNode(nodeId, focus) {
            nodeButtons.forEach((button) => {
                const active = button.dataset.sysNode === nodeId;
                button.setAttribute('aria-selected', String(active));
                button.tabIndex = active ? 0 : -1;
                if (active && focus) button.focus();
            });
            if (detail) detail.innerHTML = renderDetail(breakdown, nodeId);
            app.playSound?.('tap');
        }

        tabButtons.forEach((button, index) => {
            button.addEventListener('click', () => selectTab(button.dataset.sysTab, false));
            button.addEventListener('keydown', (event) => {
                const step = event.key === 'ArrowRight' ? 1 : event.key === 'ArrowLeft' ? -1 : 0;
                if (!step) return;
                event.preventDefault();
                const next = tabButtons[(index + step + tabButtons.length) % tabButtons.length];
                selectTab(next.dataset.sysTab, true);
            });
        });

        nodeButtons.forEach((button, index) => {
            button.addEventListener('click', () => selectNode(button.dataset.sysNode, false));
            button.addEventListener('keydown', (event) => {
                const step = ['ArrowDown', 'ArrowRight'].includes(event.key)
                    ? 1
                    : ['ArrowUp', 'ArrowLeft'].includes(event.key) ? -1 : 0;
                if (!step) return;
                event.preventDefault();
                const next = nodeButtons[(index + step + nodeButtons.length) % nodeButtons.length];
                selectNode(next.dataset.sysNode, true);
            });
        });

        root.dataset.activeTab = 'system';
    };
})();
