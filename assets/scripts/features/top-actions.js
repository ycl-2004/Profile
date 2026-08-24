(function () {
    const app = window.PortfolioApp;
    const PUBLIC_PROFILE_URL = 'https://ycl-2004.github.io/Profile/';
    const SHARE_TITLE = 'Yi-Chen Canvas';
    const SHARE_TEXT = 'Explore Yi-Chen Lin\'s AI-native product engineering canvas.';

    function getShareUrl() {
        if (window.location.hostname === 'ycl-2004.github.io') {
            return window.location.href.split('#')[0];
        }

        return PUBLIC_PROFILE_URL;
    }

    function setStatus(message) {
        if (!app.dom.shareStatus) return;
        app.dom.shareStatus.textContent = message || '';
    }

    function setPanelOpen(panel, button, shouldOpen) {
        if (!panel || !button) return;

        panel.hidden = !shouldOpen;
        button.setAttribute('aria-expanded', String(shouldOpen));
    }

    function closePanels(restoreFocus = false) {
        const returnButton = !app.dom.sharePanel?.hidden
            ? app.dom.shareButton
            : !app.dom.settingsPanel?.hidden
                ? app.dom.settingsButton
                : null;
        setPanelOpen(app.dom.sharePanel, app.dom.shareButton, false);
        setPanelOpen(app.dom.settingsPanel, app.dom.settingsButton, false);
        setStatus('');
        if (restoreFocus) returnButton?.focus({ preventScroll: true });
    }

    function togglePanel(panel, button) {
        const willOpen = !!panel && panel.hidden;

        closePanels(false);
        setPanelOpen(panel, button, willOpen);
    }

    function openModalCard(cardId) {
        closePanels(true);
        if (typeof app.openModal === 'function') {
            app.openModal(cardId);
        }
    }

    async function copyText(text) {
        if (navigator.clipboard && window.isSecureContext) {
            await navigator.clipboard.writeText(text);
            return;
        }

        const textarea = document.createElement('textarea');
        textarea.value = text;
        textarea.setAttribute('readonly', '');
        textarea.style.position = 'fixed';
        textarea.style.top = '-1000px';
        textarea.style.opacity = '0';
        document.body.appendChild(textarea);
        textarea.select();
        document.execCommand('copy');
        textarea.remove();
    }

    async function shareNative() {
        const shareData = {
            title: SHARE_TITLE,
            text: SHARE_TEXT,
            url: getShareUrl()
        };

        if (navigator.share) {
            await navigator.share(shareData);
            setStatus('Share sheet opened.');
            return;
        }

        await copyText(shareData.url);
        setStatus('Share sheet is not available here. Link copied instead.');
    }

    async function copyShareLink() {
        await copyText(getShareUrl());
        setStatus('Link copied.');
    }

    function openShareDestination(network) {
        const url = encodeURIComponent(getShareUrl());
        const text = encodeURIComponent(SHARE_TEXT);
        const title = encodeURIComponent(SHARE_TITLE);
        const links = {
            linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${url}`,
            x: `https://twitter.com/intent/tweet?text=${text}&url=${url}`
        };

        if (network === 'email') {
            window.location.href = `mailto:?subject=${title}&body=${text}%0A%0A${url}`;
            setStatus('Email draft opened.');
            return;
        }

        if (!links[network]) return;
        window.open(links[network], '_blank', 'noopener,noreferrer');
        setStatus('Share destination opened.');
    }

    function resetLayerFilter() {
        app.state.activeLayer = '__all__';

        document.querySelectorAll('.layer-item').forEach((item) => {
            item.classList.toggle('active', item.dataset.layer === '__all__');
        });

        document.querySelectorAll('.card').forEach((card) => {
            card.style.opacity = '1';
            card.style.filter = 'none';
        });

        if (typeof app.applyPortfolioLayerFilter === 'function') {
            app.applyPortfolioLayerFilter('__all__');
        }

        if (app.state.connectionPaths) {
            app.state.connectionPaths.forEach((path) => {
                path.style.opacity = '';
            });
        }

        if (typeof app.updateConnections === 'function') app.updateConnections();
    }

    function fitCanvas() {
        if (app.state.currentView !== 'canvas' && typeof app.setPortfolioView === 'function') {
            app.setPortfolioView('canvas');
        }

        requestAnimationFrame(() => {
            if (typeof app.zoomToFit === 'function') {
                app.zoomToFit();
            }
        });
    }

    function updateSettingsState() {
        const currentView = app.state.currentView || 'canvas';
        const themePreference = app.state.themePreference || 'auto';

        document.querySelectorAll('[data-settings-view]').forEach((button) => {
            const isActive = button.dataset.settingsView === currentView;
            button.classList.toggle('is-active', isActive);
            button.setAttribute('aria-pressed', String(isActive));
        });

        document.querySelectorAll('[data-settings-theme]').forEach((button) => {
            const isActive = button.dataset.settingsTheme === themePreference;
            button.classList.toggle('is-active', isActive);
            button.setAttribute('aria-pressed', String(isActive));
        });
    }

    function handleSettingsAction(action) {
        if (action === 'fit') {
            fitCanvas();
            updateSettingsState();
            closePanels(true);
            app.playSound('view');
            return;
        }

        if (action === 'reset-layer') {
            resetLayerFilter();
            updateSettingsState();
            closePanels(true);
            app.playSound('view');
            return;
        }

        if (action === 'contact') {
            openModalCard('contact');
            return;
        }

        if (action === 'yc-system') {
            openModalCard('consumption-logic');
        }
    }

    app.bindTopActions = function bindTopActions() {
        if (app.state.topActionsBound) return;

        document.querySelectorAll('[data-panel-close]').forEach((button) => {
            button.addEventListener('click', () => closePanels(true));
        });

        if (app.dom.shareButton) {
            app.dom.shareButton.addEventListener('click', (event) => {
                event.stopPropagation();
                togglePanel(app.dom.sharePanel, app.dom.shareButton);
            });
        }

        if (app.dom.settingsButton) {
            app.dom.settingsButton.addEventListener('click', (event) => {
                event.stopPropagation();
                updateSettingsState();
                togglePanel(app.dom.settingsPanel, app.dom.settingsButton);
            });
        }

        if (app.dom.ycLogicButton) {
            app.dom.ycLogicButton.addEventListener('click', () => openModalCard('consumption-logic'));
        }

        if (app.dom.sharePanel) {
            app.dom.sharePanel.addEventListener('click', async (event) => {
                const actionButton = event.target.closest('[data-share-action]');
                const networkButton = event.target.closest('[data-share-network]');

                if (actionButton) {
                    try {
                        if (actionButton.dataset.shareAction === 'native') await shareNative();
                        if (actionButton.dataset.shareAction === 'copy') await copyShareLink();
                    } catch {
                        setStatus('Could not complete sharing from this browser.');
                    }
                }

                if (networkButton) {
                    openShareDestination(networkButton.dataset.shareNetwork);
                }
            });
        }

        if (app.dom.settingsPanel) {
            app.dom.settingsPanel.addEventListener('click', (event) => {
                const viewButton = event.target.closest('[data-settings-view]');
                const themeButton = event.target.closest('[data-settings-theme]');
                const actionButton = event.target.closest('[data-settings-action]');
                const profileActionButton = event.target.closest('[data-profile-action]');

                if (viewButton && typeof app.setPortfolioView === 'function') {
                    app.setPortfolioView(viewButton.dataset.settingsView);
                    updateSettingsState();
                    closePanels(true);
                }

                if (themeButton && typeof app.applyThemePreference === 'function') {
                    app.applyThemePreference(themeButton.dataset.settingsTheme || 'auto');
                    updateSettingsState();
                    closePanels(true);
                    app.playSound('tap');
                }

                if (actionButton) {
                    handleSettingsAction(actionButton.dataset.settingsAction);
                }

                if (profileActionButton) closePanels(true);
            });
        }

        document.addEventListener('click', (event) => {
            if (event.target.closest('.top-actions')) return;
            closePanels();
        });

        document.addEventListener('keydown', (event) => {
            if (event.key === 'Escape') closePanels(true);
        });

        app.state.topActionsBound = true;
    };
})();
