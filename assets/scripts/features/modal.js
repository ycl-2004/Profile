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

    app.openModal = function openModal(cardId, options = {}) {
        const data = app.data.modalData[cardId];

        if (!data) return;

        const variant = data.variant || 'default';

        app.dom.modalTitle.textContent = data.title;
        app.dom.modalSubtitle.textContent = data.subtitle;
        app.dom.modalAvatar.textContent = data.avatar;
        app.dom.modalOverlay.dataset.modalVariant = variant;
        app.dom.modalBody.dataset.modalVariant = variant;
        if (app.dom.modal) app.dom.modal.dataset.modalVariant = variant;
        // A system breakdown owns its own markup, so it skips the h3-to-section pass.
        const hasBreakdown = variant === 'system'
            && app.data.systemBreakdowns?.[cardId]
            && typeof app.renderSystemBreakdown === 'function';

        app.dom.modalBody.innerHTML = hasBreakdown ? app.renderSystemBreakdown(cardId) : data.body;
        app.dom.modalBody.querySelectorAll('a[target="_blank"]').forEach((link) => {
            link.rel = 'noopener noreferrer';
        });
        if (hasBreakdown) {
            app.bindSystemBreakdown(cardId);
        } else {
            app.decorateModalContent();
        }
        app.dom.modalTags.innerHTML = (data.tags || [])
            .map((tag) => `<span class="tag modal-tag ${app.getToneClassName(tag)}">${escapeHtml(tag)}</span>`)
            .join('');
        app.state.modalReturnFocus = document.activeElement instanceof HTMLElement ? document.activeElement : null;
        app.dom.modalOverlay.classList.add('active');
        app.dom.modalOverlay.setAttribute('aria-hidden', 'false');
        document.body.classList.add('modal-open');
        const canvasApp = document.getElementById('canvas-app');
        if (canvasApp) canvasApp.inert = true;
        window.requestAnimationFrame(() => app.dom.modalCloseButton?.focus({ preventScroll: true }));
        app.playSound('open');

        app.state.openModalCardId = cardId;
        app.setModalPermalinkState('idle');
        // A modal reached through the history stack already has the matching URL.
        if (!options.fromHistory && typeof app.writeDeepLink === 'function') {
            app.writeDeepLink(cardId);
        }
    };

    app.finalizeModalClose = function finalizeModalClose() {
        const overlay = app.dom.modalOverlay;
        if (!overlay) return;

        const closedCardId = app.state.openModalCardId;
        const viaHistory = app.state.modalHistorySync;
        app.state.openModalCardId = null;
        app.state.modalHistorySync = false;
        if (closedCardId && !viaHistory && typeof app.writeDeepLink === 'function') {
            app.writeDeepLink(null);
        }

        overlay.classList.remove('active');
        overlay.setAttribute('aria-hidden', 'true');
        document.body.classList.remove('modal-open');
        const canvasApp = document.getElementById('canvas-app');
        if (canvasApp) canvasApp.inert = false;
        const returnFocus = app.state.modalReturnFocus;
        app.state.modalReturnFocus = null;
        if (returnFocus?.isConnected) returnFocus.focus({ preventScroll: true });
    };

    app.setModalPermalinkState = function setModalPermalinkState(state) {
        const button = app.dom.modalPermalinkButton;
        if (!button) return;

        window.clearTimeout(app.state.modalPermalinkTimer);
        button.dataset.copyState = state;
        button.setAttribute('aria-label', state === 'copied' ? 'Link copied' : 'Copy link to this card');
        button.title = state === 'copied' ? 'Link copied' : 'Copy link to this card';

        if (state !== 'copied') return;
        app.state.modalPermalinkTimer = window.setTimeout(() => {
            app.setModalPermalinkState('idle');
        }, 1600);
    };

    async function copyPermalink() {
        const cardId = app.state.openModalCardId;
        if (!cardId || typeof app.getCardPermalink !== 'function') return;

        const link = app.getCardPermalink(cardId);

        try {
            if (navigator.clipboard && window.isSecureContext) {
                await navigator.clipboard.writeText(link);
            } else {
                const textarea = document.createElement('textarea');
                textarea.value = link;
                textarea.setAttribute('readonly', '');
                textarea.style.position = 'fixed';
                textarea.style.top = '-1000px';
                textarea.style.opacity = '0';
                document.body.appendChild(textarea);
                textarea.select();
                document.execCommand('copy');
                textarea.remove();
            }
            app.setModalPermalinkState('copied');
            app.playSound('tap');
        } catch {
            app.setModalPermalinkState('idle');
        }
    }

    app.bindModal = function bindModal() {
        function closeModal() {
            if (typeof app.closeModal === 'function') {
                app.closeModal();
                return;
            }

            app.finalizeModalClose();
        }

        document.querySelectorAll('.card').forEach((card) => {
            if (!app.data.modalData?.[card.dataset.card]) return;
            if (card.querySelector('a, button')) return;

            card.addEventListener('click', (event) => {
                if (event.target.closest('a, button')) return;
                if (app.state.justDraggedCardId === card.dataset.card) {
                    app.state.justDraggedCardId = null;
                    return;
                }
                app.openModal(card.dataset.card);
            });
        });

        app.dom.modalCloseButton.addEventListener('click', () => {
            closeModal();
        });

        app.dom.modalPermalinkButton?.addEventListener('click', copyPermalink);

        app.dom.modalOverlay.addEventListener('click', (event) => {
            if (event.target === app.dom.modalOverlay) {
                closeModal();
            }
        });

        document.addEventListener('keydown', (event) => {
            if (!app.dom.modalOverlay.classList.contains('active')) return;

            if (event.key === 'Escape') {
                event.preventDefault();
                closeModal();
                return;
            }

            if (event.key === 'Tab') {
                const focusable = Array.from(app.dom.modal.querySelectorAll(
                    'a[href], button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])'
                )).filter((element) => !element.hidden && element.getClientRects().length);

                if (!focusable.length) {
                    event.preventDefault();
                    app.dom.modal.focus();
                    return;
                }

                const first = focusable[0];
                const last = focusable[focusable.length - 1];
                if (event.shiftKey && document.activeElement === first) {
                    event.preventDefault();
                    last.focus();
                } else if (!event.shiftKey && document.activeElement === last) {
                    event.preventDefault();
                    first.focus();
                }
            }
        });
    };
})();
