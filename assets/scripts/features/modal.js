(function () {
    const app = window.PortfolioApp;
    const TAG_TONES = ['sky', 'mint', 'amber', 'blush', 'lilac'];

    function normalizeLabel(value) {
        return String(value || '').trim().toLowerCase();
    }

    function matchesKeyword(label, keywords) {
        return keywords.some((keyword) => label.includes(keyword));
    }

    function hashLabel(value) {
        return Array.from(value).reduce((hash, char) => {
            return ((hash << 5) - hash) + char.charCodeAt(0);
        }, 0);
    }

    function escapeHtml(value) {
        return String(value)
            .replaceAll('&', '&amp;')
            .replaceAll('<', '&lt;')
            .replaceAll('>', '&gt;')
            .replaceAll('"', '&quot;')
            .replaceAll('\'', '&#39;');
    }

    function getFallbackTone(label) {
        return TAG_TONES[Math.abs(hashLabel(label)) % TAG_TONES.length];
    }

    function getSectionTone(title) {
        const label = normalizeLabel(title);

        if (!label) return 'lilac';
        if (matchesKeyword(label, ['problem', 'trigger', 'challenge', 'recognition'])) return 'blush';
        if (matchesKeyword(label, ['approach', 'system', 'workflow', 'division of labor', 'what changed', 'default behavior', 'focus areas'])) return 'sky';
        if (matchesKeyword(label, ['outcome', 'goal', 'why it matters', 'what matters', 'why it works', 'what i do best', 'foundation', 'core idea', 'positioning'])) return 'mint';
        if (matchesKeyword(label, ['stack', 'tools', 'core stack', 'standard'])) return 'amber';
        if (matchesKeyword(label, ['link', 'links', 'contact', 'location'])) return 'lilac';

        return getFallbackTone(label);
    }

    app.getToneForLabel = function getToneForLabel(label) {
        const normalized = normalizeLabel(label);

        if (!normalized) return 'lilac';
        if (matchesKeyword(normalized, ['ai', 'agent', 'claude', 'gpt', 'gemini', 'codex', 'cursor', 'notebooklm', 'prompt', 'automation', 'multi-provider'])) return 'lilac';
        if (matchesKeyword(normalized, ['react', 'typescript', 'swift', 'flutter', 'supabase', 'tauri', 'python', 'streamlit', 'unity', 'c#', 'arduino', 'solidity', 'ble', 'bluetooth', 'api', 'desktop'])) return 'sky';
        if (matchesKeyword(normalized, ['workflow', 'product', 'design', 'ux', 'ui', 'content', 'documentation', 'dashboard', 'data', 'research'])) return 'amber';
        if (matchesKeyword(normalized, ['system', 'reliability', 'observability', 'testing', 'integration', 'control', 'pid', 'calibration', 'power', 'architecture', 'ownership', 'feedback', 'local-first', 'assembly'])) return 'mint';
        if (matchesKeyword(normalized, ['governance', 'execution', 'shipping', 'iteration', 'learning', 'growth', 'opportunities', 'connect', 'honour', 'ubc', 'team'])) return 'blush';

        return getFallbackTone(normalized);
    };

    app.getToneClassName = function getToneClassName(label) {
        return `tag-tone-${app.getToneForLabel(label)}`;
    };

    app.applyToneClass = function applyToneClass(element) {
        if (!element) return;

        TAG_TONES.forEach((tone) => {
            element.classList.remove(`tag-tone-${tone}`);
        });

        element.classList.add(app.getToneClassName(element.textContent));
    };

    app.decorateProjectTags = function decorateProjectTags(root = document) {
        root.querySelectorAll('.project-tag').forEach((tagElement) => {
            app.applyToneClass(tagElement);
        });
    };

    app.decorateModalContent = function decorateModalContent() {
        const body = app.dom.modalBody;

        if (!body) return;

        const originalNodes = Array.from(body.childNodes);
        let currentSection = null;

        body.innerHTML = '';

        originalNodes.forEach((node) => {
            if (node.nodeType === Node.TEXT_NODE && !node.textContent.trim()) {
                return;
            }

            const isHeading = node.nodeType === Node.ELEMENT_NODE && node.tagName === 'H3';

            if (isHeading) {
                currentSection = document.createElement('section');
                currentSection.className = 'modal-section';
                currentSection.dataset.tone = getSectionTone(node.textContent);
                body.appendChild(currentSection);
            }

            if (!currentSection) {
                currentSection = document.createElement('section');
                currentSection.className = 'modal-section modal-section-intro';
                currentSection.dataset.tone = 'lilac';
                body.appendChild(currentSection);
            }

            currentSection.appendChild(node);
        });

        body.querySelectorAll('.modal-section').forEach((section) => {
            const heading = Array.from(section.children).find((child) => child.tagName === 'H3');
            const firstParagraph = Array.from(section.children).find((child) => child.tagName === 'P');
            const headingLabel = heading ? normalizeLabel(heading.textContent) : '';

            if (heading) {
                heading.classList.add('modal-section-title');
                section.dataset.tone = getSectionTone(heading.textContent);
            }

            if (
                firstParagraph &&
                !firstParagraph.classList.contains('modal-stack-line') &&
                !matchesKeyword(headingLabel, ['stack', 'link', 'links', 'contact'])
            ) {
                firstParagraph.classList.add('modal-lead');
            }
        });

        body.querySelectorAll('.modal-stack-line').forEach((stackLine) => {
            const items = stackLine.textContent
                .split(/[·•]/)
                .map((item) => item.trim())
                .filter(Boolean);

            if (!items.length) return;

            stackLine.classList.add('modal-stack');
            stackLine.innerHTML = items
                .map((item) => `<span class="modal-stack-pill ${app.getToneClassName(item)}">${escapeHtml(item)}</span>`)
                .join('');
        });
    };

    app.openModal = function openModal(cardId) {
        const data = app.data.modalData[cardId];

        if (!data) return;

        app.dom.modalTitle.textContent = data.title;
        app.dom.modalSubtitle.textContent = data.subtitle;
        app.dom.modalAvatar.textContent = data.avatar;
        app.dom.modalBody.innerHTML = data.body;
        app.decorateModalContent();
        app.dom.modalTags.innerHTML = (data.tags || [])
            .map((tag) => `<span class="tag modal-tag ${app.getToneClassName(tag)}">${escapeHtml(tag)}</span>`)
            .join('');
        app.dom.modalOverlay.classList.add('active');
    };

    app.bindModal = function bindModal() {
        document.querySelectorAll('.card').forEach((card) => {
            card.addEventListener('click', () => {
                if (app.state.justDraggedCardId === card.dataset.card) {
                    app.state.justDraggedCardId = null;
                    return;
                }
                app.openModal(card.dataset.card);
            });
        });

        app.dom.modalCloseButton.addEventListener('click', () => {
            app.dom.modalOverlay.classList.remove('active');
        });

        app.dom.modalOverlay.addEventListener('click', (event) => {
            if (event.target === app.dom.modalOverlay) {
                app.dom.modalOverlay.classList.remove('active');
            }
        });

        document.addEventListener('keydown', (event) => {
            if (event.key === 'Escape') {
                app.dom.modalOverlay.classList.remove('active');
            }
        });
    };
})();
