(function () {
    const app = window.PortfolioApp;

    const TABS = [
        { id: 'system', label: 'Runtime' },
        { id: 'build', label: 'Build', key: 'build' },
        { id: 'decisions', label: 'Decisions', key: 'decisions' },
        { id: 'constraints', label: 'Constraints', key: 'constraints' },
        { id: 'failures', label: 'Failures', key: 'failures' },
        { id: 'evidence', label: 'Evidence' }
    ];

    const PANEL_LEADS = {
        constraints: 'What the platform refuses to give, and what the product does about it.',
        failures: 'Things that shipped wrong, what caused them, and what changed in the system.'
    };

    // A project without written failure records drops that tab rather than
    // padding it — an empty section reads worse than an absent one.
    function tabsFor(breakdown) {
        return TABS.filter((tab) => {
            if (!tab.key) return true;
            const value = breakdown[tab.key];
            return Array.isArray(value) ? value.length : Boolean(value);
        });
    }

    function leadFor(breakdown, id) {
        const lead = breakdown.leads?.[id] ?? PANEL_LEADS[id];
        return lead ? `<p class="sysview-panel-lead">${lead}</p>` : '';
    }

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

    // --- Build graph -------------------------------------------------------
    // A layered DAG drawn from the module/file reference graph. Edges point
    // consumer -> dependency, so depth 0 is what everything else rests on.
    function computeLayers(nodes, edges) {
        const deps = new Map(nodes.map((node) => [node.id, []]));
        edges.forEach((edge) => deps.get(edge.from)?.push(edge.to));

        const layer = new Map();
        function depth(id, seen) {
            if (layer.has(id)) return layer.get(id);
            if (seen.has(id)) return 0;
            seen.add(id);
            const targets = (deps.get(id) || []).filter((t) => deps.has(t));
            const value = targets.length ? 1 + Math.max(...targets.map((t) => depth(t, seen))) : 0;
            seen.delete(id);
            layer.set(id, value);
            return value;
        }
        nodes.forEach((node) => depth(node.id, new Set()));
        return layer;
    }

    function graphRows(nodes, edges) {
        const layer = computeLayers(nodes, edges);
        const max = Math.max(0, ...nodes.map((node) => layer.get(node.id) || 0));
        const rows = Array.from({ length: max + 1 }, () => []);
        nodes.forEach((node) => {
            const pinned = Number.isInteger(node.row)
                ? Math.min(Math.max(node.row, 0), max)
                : null;
            rows[pinned ?? (max - (layer.get(node.id) || 0))].push(node);
        });

        // One barycentre pass: order each row by where its consumers sit above.
        for (let index = 1; index < rows.length; index += 1) {
            const above = new Map(rows[index - 1].map((node, i) => [node.id, i]));
            rows[index].sort((a, b) => weightOf(a) - weightOf(b));
            function weightOf(node) {
                const parents = edges
                    .filter((edge) => edge.to === node.id && above.has(edge.from))
                    .map((edge) => above.get(edge.from));
                return parents.length ? parents.reduce((sum, v) => sum + v, 0) / parents.length : 99;
            }
        }
        return rows;
    }

    function renderGraphView(view) {
        const nodes = view.nodes.map((node) => `
            <button class="gnode" type="button" data-gnode="${node.id}"
                data-kind="${node.kind || 'core'}"${view.drillable?.has(node.id) ? ' data-drillable="true"' : ''}>
                <span class="gnode-label">${node.label}</span>
                ${node.meta ? `<span class="gnode-meta">${node.meta}</span>` : ''}
                ${node.note ? `<span class="gnode-note">${node.note}</span>` : ''}
            </button>`).join('');
        const labels = view.edges.map((edge, index) => edge.label
            ? `<span class="gedge-label" data-gedge="${index}">${edge.label}</span>`
            : '').join('');

        return `
            <div class="sysgraph" data-graph>
                <svg class="sysgraph-wires" aria-hidden="true">
                    <defs>
                        <marker id="gtip" viewBox="0 0 8 8" refX="7" refY="4" markerWidth="7" markerHeight="7" orient="auto-start-reverse">
                            <path d="M0.5 0.5 L7 4 L0.5 7.5" fill="none" stroke="currentColor" stroke-width="1.2" stroke-linecap="round" stroke-linejoin="round"/>
                        </marker>
                    </defs>
                </svg>
                <div class="sysgraph-nodes">${nodes}</div>
                <div class="sysgraph-labels">${labels}</div>
            </div>`;
    }

    app.layoutBuildGraph = function layoutBuildGraph(container) {
        const graph = container?.querySelector('[data-graph]');
        if (!graph || !graph.offsetParent) return;

        const view = graph.__view;
        if (!view) return;

        const nodeEls = new Map(
            Array.from(graph.querySelectorAll('.gnode')).map((el) => [el.dataset.gnode, el])
        );
        const width = graph.clientWidth;
        if (!width) return;

        const rows = graphRows(view.nodes, view.edges);
        const widest = Math.max(...rows.map((row) => row.length));
        const gapX = widest > 3 ? 22 : 34;
        const gapY = 104;
        const lane = 26;
        // Long edges are routed outside the columns, so leave them room.
        const usable = Math.max(240, width - (lane + 46) * 2);
        const nodeW = Math.max(124, Math.min(236, Math.floor((usable - gapX * (widest - 1)) / widest)));

        nodeEls.forEach((el) => { el.style.width = `${nodeW}px`; el.style.top = '0px'; });

        const pos = new Map();
        let y = 0;
        rows.forEach((row, rowIndex) => {
            const rowWidth = row.length * nodeW + (row.length - 1) * gapX;
            let x = Math.max(lane, (width - rowWidth) / 2);
            let tallest = 0;
            row.forEach((node) => {
                const el = nodeEls.get(node.id);
                if (!el) return;
                el.style.left = `${x}px`;
                tallest = Math.max(tallest, el.offsetHeight);
                pos.set(node.id, { x, y, w: nodeW, h: 0, row: rowIndex });
                x += nodeW + gapX;
            });
            row.forEach((node) => {
                const box = pos.get(node.id);
                const el = nodeEls.get(node.id);
                if (!box || !el) return;
                box.h = tallest;
                el.style.top = `${y}px`;
                el.style.height = `${tallest}px`;
            });
            y += tallest + gapY;
        });

        const height = Math.max(0, y - gapY);
        graph.style.height = `${height}px`;

        const svg = graph.querySelector('.sysgraph-wires');
        svg.setAttribute('viewBox', `0 0 ${width} ${height}`);
        svg.style.width = `${width}px`;
        svg.style.height = `${height}px`;
        Array.from(svg.querySelectorAll('path.gwire')).forEach((el) => el.remove());

        const leftEdge = Math.min(...Array.from(pos.values(), (b) => b.x));
        const rightEdge = Math.max(...Array.from(pos.values(), (b) => b.x + b.w));
        // Each routed edge gets its own lane and its own label height, so several
        // of them running the same side do not stack on top of each other.
        const lanes = { left: 0, right: 0 };

        view.edges.forEach((edge, index) => {
            const a = pos.get(edge.from);
            const b = pos.get(edge.to);
            const label = graph.querySelector(`[data-gedge="${index}"]`);
            if (!a || !b) { if (label) label.style.display = 'none'; return; }

            const x1 = a.x + a.w / 2;
            const y1 = a.y + a.h;
            const x2 = b.x + b.w / 2;
            const y2 = b.y;
            const skips = b.row - a.row > 1;

            let d;
            let labelX;
            let labelY = y1 + Math.min(34, gapY * 0.36);

            if (skips) {
                // Route around the columns instead of drawing through the nodes
                // that sit between these two rows.
                const side = lanes.left <= lanes.right ? 'left' : 'right';
                const slot = lanes[side];
                lanes[side] += 1;
                const step = 13;
                const laneX = side === 'left'
                    ? Math.max(8, leftEdge - lane - slot * step)
                    : Math.min(width - 8, rightEdge + lane + slot * step);
                const enter = Math.min(y1 + 44, y2 - 44);
                const exit = Math.max(y2 - 44, enter);
                d = `M${x1} ${y1} C${x1} ${y1 + 26} ${laneX} ${enter - 26} ${laneX} ${enter}`
                  + ` L${laneX} ${exit}`
                  + ` C${laneX} ${exit + 26} ${x2} ${y2 - 26} ${x2} ${y2}`;
                labelX = laneX;
                labelY = (enter + exit) / 2 + ((slot % 5) - 2) * 25;
            } else {
                const bend = Math.max(20, (y2 - y1) / 2);
                d = `M${x1} ${y1} C${x1} ${y1 + bend} ${x2} ${y2 - bend} ${x2} ${y2}`;
                const t = (labelY - y1) / Math.max(1, y2 - y1);
                labelX = x1 + (x2 - x1) * t * t * (3 - 2 * t);
            }

            const path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
            path.setAttribute('class', 'gwire');
            path.setAttribute('d', d);
            path.setAttribute('marker-end', 'url(#gtip)');
            path.dataset.from = edge.from;
            path.dataset.to = edge.to;
            if (edge.weight) path.dataset.weight = edge.weight;
            if (skips) path.dataset.skips = 'true';
            svg.appendChild(path);

            if (label) {
                label.style.display = '';
                // A lane hard against the edge would push its centred label out.
                label.style.left = `${Math.min(Math.max(labelX, 24), width - 24)}px`;
                label.style.top = `${labelY}px`;
            }
        });
    };

    function renderBuild(breakdown) {
        const build = breakdown.build;
        if (!build) return '';

        const practice = (build.practice || []).map((item) => `
            <article class="syspractice sysview-stagger">
                <h5>${item.title}</h5>
                <p>${item.text}</p>
            </article>`).join('');

        return `
            <div class="sysbuild">
                <div class="sysgraph-shell sysview-stagger">
                    <div class="sysgraph-bar">
                        <nav class="sysgraph-crumbs" data-graph-crumbs></nav>
                        <span class="sysgraph-hint" data-graph-hint></span>
                    </div>
                    <p class="sysgraph-summary" data-graph-summary></p>
                    <div data-graph-mount></div>
                </div>

                ${practice ? `
                <h4 class="sysbuild-heading"><span>02</span>How it is kept honest</h4>
                <div class="sysstack">${practice}</div>` : ''}
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
        const activeTabs = tabsFor(breakdown);
        const has = (id) => activeTabs.some((tab) => tab.id === id);
        const tabs = activeTabs.map((tab, index) => `
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
                    ${has('build') ? `<section class="sysview-panel" role="tabpanel" id="sys-panel-build" data-sys-panel="build" tabindex="0" hidden>
                        ${leadFor(breakdown, 'build')}
                        ${renderBuild(breakdown)}
                    </section>` : ''}
                    ${has('decisions') ? `<section class="sysview-panel" role="tabpanel" id="sys-panel-decisions" data-sys-panel="decisions" tabindex="0" hidden>
                        ${leadFor(breakdown, 'decisions')}
                        <div class="sysgrid">${renderDecisions(breakdown)}</div>
                    </section>` : ''}
                    ${has('constraints') ? `<section class="sysview-panel" role="tabpanel" id="sys-panel-constraints" data-sys-panel="constraints" tabindex="0" hidden>
                        ${leadFor(breakdown, 'constraints')}
                        <div class="sysstack">${renderConstraints(breakdown)}</div>
                    </section>` : ''}
                    ${has('failures') ? `<section class="sysview-panel" role="tabpanel" id="sys-panel-failures" data-sys-panel="failures" tabindex="0" hidden>
                        ${leadFor(breakdown, 'failures')}
                        <div class="sysstack">${renderFailures(breakdown)}</div>
                    </section>` : ''}
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
        const build = breakdown.build;
        const mount = root.querySelector('[data-graph-mount]');
        const crumbs = root.querySelector('[data-graph-crumbs]');
        const summary = root.querySelector('[data-graph-summary]');
        const hint = root.querySelector('[data-graph-hint]');
        let graphView = 'root';

        function showGraph(viewId) {
            if (!build || !mount) return;
            graphView = viewId;

            const drill = viewId === 'root' ? null : build.drill?.[viewId];
            const view = drill
                ? { nodes: drill.nodes, edges: drill.edges }
                : {
                    nodes: build.graph.nodes,
                    edges: build.graph.edges,
                    drillable: new Set(Object.keys(build.drill || {}))
                };

            mount.innerHTML = renderGraphView(view);
            const graph = mount.querySelector('[data-graph]');
            if (graph) {
                graph.__view = view;
                let lastWidth = 0;
                const observer = new ResizeObserver(() => {
                    const width = graph.clientWidth;
                    if (!width || width === lastWidth) return;
                    lastWidth = width;
                    app.layoutBuildGraph(mount);
                });
                observer.observe(graph);
                app.state.buildGraphObserver?.disconnect();
                app.state.buildGraphObserver = observer;
            }

            crumbs.innerHTML = drill
                ? `<button type="button" class="gcrumb" data-graph-up>Modules</button><span class="gcrumb-sep">/</span><span class="gcrumb-current">${drill.title}</span>`
                : '<span class="gcrumb-current">Modules</span>';
            summary.innerHTML = drill ? drill.summary : build.graph.summary;
            hint.textContent = drill ? `${drill.nodes.length} files` : 'Click a module to open its files';

            app.playSound?.('tap');
        }

        if (build && mount) {
            mount.addEventListener('click', (event) => {
                const node = event.target.closest('[data-drillable]');
                if (!node) return;
                if (build.drill?.[node.dataset.gnode]) showGraph(node.dataset.gnode);
            });
            crumbs.addEventListener('click', (event) => {
                if (event.target.closest('[data-graph-up]')) showGraph('root');
            });
            showGraph('root');
        }
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
