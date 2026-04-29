(function () {
    const app = window.PortfolioApp;

    const VIEW_COPY = {
        canvas: {
            title: 'Portfolio Canvas',
            subtitle: 'Explore my journey, projects, and ideas'
        },
        timeline: {
            title: 'Journey Timeline',
            subtitle: 'A chronological view of education, work, projects, and direction'
        },
        list: {
            title: 'All Projects & Experience',
            subtitle: 'Searchable proof points from my resume, projects, and profile notes'
        }
    };

    function escapeHtml(value) {
        return String(value || '')
            .replaceAll('&', '&amp;')
            .replaceAll('<', '&lt;')
            .replaceAll('>', '&gt;')
            .replaceAll('"', '&quot;')
            .replaceAll('\'', '&#39;');
    }

    function getItems() {
        return app.data.portfolioItems || [];
    }

    function getMilestones() {
        return app.data.timelineMilestones || [];
    }

    function getItemById(id) {
        return getItems().find((item) => item.id === id);
    }

    function getToneClass(label) {
        if (typeof app.getToneClassName === 'function') {
            return app.getToneClassName(label);
        }

        return 'tag-tone-lilac';
    }

    function renderStack(stack, limit = 4) {
        const visibleStack = (stack || []).slice(0, limit);
        const remainingCount = Math.max((stack || []).length - visibleStack.length, 0);
        const pills = visibleStack.map((tag) => (
            `<span class="project-tag ${getToneClass(tag)}">${escapeHtml(tag)}</span>`
        ));

        if (remainingCount > 0) {
            pills.push(`<span class="project-tag tag-tone-lilac">+${remainingCount}</span>`);
        }

        return pills.join('');
    }

    function renderTimelineCard(item) {
        if (!item) return '';

        return `
            <article class="timeline-item-card" tabindex="0" data-card-ref="${escapeHtml(item.id)}" data-portfolio-layer="${escapeHtml(item.layer)}">
                <div class="timeline-item-top">
                    <div class="view-item-icon" data-tone="${escapeHtml(item.tone)}">${escapeHtml(item.icon)}</div>
                    <div class="timeline-item-copy">
                        <h3>${escapeHtml(item.title)}</h3>
                        <p>${escapeHtml(item.subtitle)}</p>
                    </div>
                </div>
                <p class="timeline-item-desc">${escapeHtml(item.description)}</p>
                <div class="timeline-item-foot">
                    <span class="view-mini-badge">${escapeHtml(item.category)}</span>
                    <span>${escapeHtml(item.dateLabel)}</span>
                </div>
            </article>
        `;
    }

    function renderTimeline() {
        const columns = getMilestones().map((milestone) => {
            const cards = (milestone.items || [])
                .map((itemId) => renderTimelineCard(getItemById(itemId)))
                .join('');
            const nextFocus = (milestone.items || []).length
                ? ''
                : `
                    <div class="timeline-next-focus" data-portfolio-layer="${escapeHtml(milestone.layer)}">
                        <span>Software Engineer</span>
                        <span>Full-Stack Developer</span>
                        <span>Internal Tooling</span>
                        <span>AI / LLM Tooling</span>
                        <span>Dashboard Systems</span>
                    </div>
                `;

            return `
                <section class="journey-column" data-tone="${escapeHtml(milestone.tone)}" data-portfolio-layer="${escapeHtml(milestone.layer)}">
                    <div class="journey-pin" aria-hidden="true"></div>
                    <div class="journey-year">${escapeHtml(milestone.period)}</div>
                    <div class="journey-column-card">
                        <span class="view-mini-badge">${escapeHtml(milestone.layer)}</span>
                        <h2>${escapeHtml(milestone.title)}</h2>
                        <p>${escapeHtml(milestone.summary)}</p>
                    </div>
                    <div class="timeline-card-stack">
                        ${cards}
                        ${nextFocus}
                    </div>
                </section>
            `;
        }).join('');

        return `
            <section class="portfolio-view-panel timeline-view" data-view-panel="timeline" aria-label="Journey Timeline">
                <div class="view-panel-head view-panel-head-compact">
                    <div class="view-panel-meta">
                        <div class="view-panel-kicker">Chronological Map</div>
                    </div>
                    <div class="timeline-legend" aria-label="Timeline legend">
                        <span><i data-tone="lilac"></i>Foundation</span>
                        <span><i data-tone="sky"></i>Systems</span>
                        <span><i data-tone="mint"></i>Product</span>
                    </div>
                </div>
                <div class="journey-timeline" role="list">
                    <div class="timeline-rail" aria-hidden="true"></div>
                    ${columns}
                </div>
            </section>
        `;
    }

    function getUniqueValues(key) {
        return Array.from(new Set(getItems().map((item) => item[key]).filter(Boolean))).sort();
    }

    function renderOptions(values, selectedValue, allLabel) {
        return [
            `<option value="__all__">${escapeHtml(allLabel)}</option>`,
            ...values.map((value) => (
                `<option value="${escapeHtml(value)}"${value === selectedValue ? ' selected' : ''}>${escapeHtml(value)}</option>`
            ))
        ].join('');
    }

    function getFilteredItems() {
        const state = app.state;
        const activeLayer = state.activeLayer || '__all__';
        const query = (state.listQuery || '').trim().toLowerCase();

        return getItems()
            .filter((item) => activeLayer === '__all__' || item.layer === activeLayer)
            .filter((item) => state.listCategory === '__all__' || item.category === state.listCategory)
            .filter((item) => state.listType === '__all__' || item.type === state.listType)
            .filter((item) => {
                if (!query) return true;

                return [
                    item.title,
                    item.subtitle,
                    item.category,
                    item.type,
                    item.description,
                    item.impact,
                    ...(item.stack || [])
                ].join(' ').toLowerCase().includes(query);
            })
            .sort((a, b) => {
                if (state.listSort === 'oldest') return a.sortDate.localeCompare(b.sortDate);
                if (state.listSort === 'title') return a.title.localeCompare(b.title);
                return b.sortDate.localeCompare(a.sortDate);
            });
    }

    function renderListRow(item) {
        return `
            <tr class="portfolio-row" tabindex="0" data-card-ref="${escapeHtml(item.id)}" data-portfolio-layer="${escapeHtml(item.layer)}">
                <td data-label="Title">
                    <div class="portfolio-title-cell">
                        <div class="view-item-icon" data-tone="${escapeHtml(item.tone)}">${escapeHtml(item.icon)}</div>
                        <div>
                            <strong>${escapeHtml(item.title)}</strong>
                            <span>${escapeHtml(item.subtitle)}</span>
                        </div>
                    </div>
                </td>
                <td data-label="Category"><span class="view-mini-badge">${escapeHtml(item.category)}</span></td>
                <td data-label="Type"><span class="view-soft-pill">${escapeHtml(item.type)}</span></td>
                <td data-label="Tech Stack"><div class="portfolio-stack">${renderStack(item.stack)}</div></td>
                <td data-label="Description">${escapeHtml(item.description)}</td>
                <td data-label="Impact">${escapeHtml(item.impact)}</td>
                <td data-label="Date"><span class="portfolio-date">${escapeHtml(item.dateLabel)}</span></td>
            </tr>
        `;
    }

    function renderList() {
        const items = getFilteredItems();
        const categories = getUniqueValues('category');
        const types = getUniqueValues('type');
        const resultText = `${items.length} of ${getItems().length} items`;

        return `
            <section class="portfolio-view-panel list-view" data-view-panel="list" aria-label="All projects and experience">
                <div class="view-panel-head view-panel-head-compact">
                    <div class="view-panel-meta">
                        <div class="view-panel-kicker">Evidence Bank</div>
                    </div>
                    <div class="list-result-count">${escapeHtml(resultText)}</div>
                </div>
                <div class="list-toolbar" role="search">
                    <label class="list-search">
                        <span>Search</span>
                        <input id="portfolio-list-search" type="search" value="${escapeHtml(app.state.listQuery)}" placeholder="Search anything..." autocomplete="off">
                    </label>
                    <label>
                        <span>Category</span>
                        <select id="portfolio-list-category">
                            ${renderOptions(categories, app.state.listCategory, 'All Categories')}
                        </select>
                    </label>
                    <label>
                        <span>Type</span>
                        <select id="portfolio-list-type">
                            ${renderOptions(types, app.state.listType, 'All Types')}
                        </select>
                    </label>
                    <label>
                        <span>Sort</span>
                        <select id="portfolio-list-sort">
                            <option value="newest"${app.state.listSort === 'newest' ? ' selected' : ''}>Newest first</option>
                            <option value="oldest"${app.state.listSort === 'oldest' ? ' selected' : ''}>Oldest first</option>
                            <option value="title"${app.state.listSort === 'title' ? ' selected' : ''}>Title A-Z</option>
                        </select>
                    </label>
                </div>
                <div class="portfolio-table-wrap">
                    <table class="portfolio-table">
                        <thead>
                            <tr>
                                <th>Title</th>
                                <th>Category</th>
                                <th>Type</th>
                                <th>Tech Stack</th>
                                <th>Description</th>
                                <th>Impact</th>
                                <th>Date</th>
                            </tr>
                        </thead>
                        <tbody>
                            ${items.length ? items.map(renderListRow).join('') : `
                                <tr class="portfolio-empty-row">
                                    <td colspan="7">No matching entries. Try a broader search or reset the layer filter.</td>
                                </tr>
                            `}
                        </tbody>
                    </table>
                </div>
            </section>
        `;
    }

    function bindListControls(focusTarget) {
        const shell = app.dom.portfolioViewShell;

        if (!shell || app.state.currentView !== 'list') return;

        const search = shell.querySelector('#portfolio-list-search');
        const category = shell.querySelector('#portfolio-list-category');
        const type = shell.querySelector('#portfolio-list-type');
        const sort = shell.querySelector('#portfolio-list-sort');

        if (search) {
            search.addEventListener('input', () => {
                app.state.listQuery = search.value;
                app.renderActivePortfolioView('search');
            });

            if (focusTarget === 'search') {
                const cursorPosition = search.value.length;
                search.focus({ preventScroll: true });
                search.setSelectionRange(cursorPosition, cursorPosition);
            }
        }

        if (category) {
            category.addEventListener('change', () => {
                app.state.listCategory = category.value;
                app.renderActivePortfolioView();
            });
        }

        if (type) {
            type.addEventListener('change', () => {
                app.state.listType = type.value;
                app.renderActivePortfolioView();
            });
        }

        if (sort) {
            sort.addEventListener('change', () => {
                app.state.listSort = sort.value;
                app.renderActivePortfolioView();
            });
        }
    }

    app.applyPortfolioLayerFilter = function applyPortfolioLayerFilter(layer) {
        const activeLayer = layer || '__all__';

        app.state.activeLayer = activeLayer;

        if (app.state.currentView === 'list') {
            app.renderActivePortfolioView();
            return;
        }

        if (app.state.currentView !== 'timeline') {
            if (app.state.canvasReady && typeof app.updateMinimap === 'function') {
                app.updateMinimap({ forceRender: true });
            }
            return;
        }

        const shell = app.dom.portfolioViewShell;
        if (!shell) return;

        shell.querySelectorAll('.timeline-item-card').forEach((card) => {
            const isVisible = activeLayer === '__all__' || card.dataset.portfolioLayer === activeLayer;
            card.hidden = !isVisible;
        });

        shell.querySelectorAll('.timeline-next-focus').forEach((focus) => {
            const isVisible = activeLayer === '__all__' || focus.dataset.portfolioLayer === activeLayer;
            focus.hidden = !isVisible;
        });

        shell.querySelectorAll('.journey-column').forEach((column) => {
            if (activeLayer === '__all__') {
                column.hidden = false;
                return;
            }

            const hasVisibleItem = !!column.querySelector('.timeline-item-card:not([hidden]), .timeline-next-focus:not([hidden])');
            column.hidden = !hasVisibleItem;
        });

        if (typeof app.updateMinimap === 'function') {
            app.updateMinimap({ forceRender: true });
        }
    };

    app.renderActivePortfolioView = function renderActivePortfolioView(focusTarget) {
        const shell = app.dom.portfolioViewShell;

        if (!shell) return;

        if (app.state.currentView === 'timeline') {
            shell.innerHTML = renderTimeline();
            app.applyPortfolioLayerFilter(app.state.activeLayer);
            if (typeof app.updateMinimap === 'function') {
                app.updateMinimap({ forceRender: true });
            }
            return;
        }

        if (app.state.currentView === 'list') {
            shell.innerHTML = renderList();
            bindListControls(focusTarget);
            if (typeof app.updateMinimap === 'function') {
                app.updateMinimap({ forceRender: true });
            }
            return;
        }

        shell.innerHTML = '';
        if (typeof app.updateMinimap === 'function') {
            app.updateMinimap({ forceRender: true });
        }
    };

    app.setPortfolioView = function setPortfolioView(view) {
        const nextView = VIEW_COPY[view] ? view : 'canvas';
        const copy = VIEW_COPY[nextView];
        const previousView = app.state.currentView;

        app.state.currentView = nextView;
        document.body.dataset.view = nextView;

        if (app.dom.viewTitle) app.dom.viewTitle.textContent = copy.title;
        if (app.dom.viewSubtitle) app.dom.viewSubtitle.textContent = copy.subtitle;

        app.dom.viewTabs.forEach((tab) => {
            const isActive = tab.dataset.viewTarget === nextView;
            tab.classList.toggle('is-active', isActive);
            tab.setAttribute('aria-pressed', String(isActive));
        });

        app.renderActivePortfolioView();
        if (previousView !== nextView && app.dom.portfolioViewShell) {
            app.dom.portfolioViewShell.scrollTop = 0;
            app.dom.portfolioViewShell.scrollLeft = 0;
        }

        if (nextView === 'canvas') {
            if (app.state.canvasReady) {
                if (typeof app.applyDefaultLayout === 'function') app.applyDefaultLayout();
                if (typeof app.zoomToOverview === 'function') app.zoomToOverview();
                if (typeof app.updateConnections === 'function') app.updateConnections();
                if (typeof app.updateMinimap === 'function') app.updateMinimap({ forceRender: true });
            }
            return;
        }

        if (typeof app.updateConnections === 'function') {
            app.updateConnections();
        }
        if (typeof app.updateMinimap === 'function') {
            app.updateMinimap({ forceRender: true });
        }
    };

    app.bindPortfolioViews = function bindPortfolioViews() {
        document.body.dataset.view = app.state.currentView || 'canvas';

        app.dom.viewTabs.forEach((tab) => {
            tab.addEventListener('click', () => {
                app.setPortfolioView(tab.dataset.viewTarget);
            });
        });

        if (app.dom.portfolioViewShell) {
            app.dom.portfolioViewShell.addEventListener('click', (event) => {
                const target = event.target.closest('[data-card-ref]');
                if (!target) return;
                app.openModal(target.dataset.cardRef);
            });

            app.dom.portfolioViewShell.addEventListener('keydown', (event) => {
                if (event.key !== 'Enter' && event.key !== ' ') return;

                const target = event.target.closest('[data-card-ref]');
                if (!target) return;

                event.preventDefault();
                app.openModal(target.dataset.cardRef);
            });
        }
    };
})();
