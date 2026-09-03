(function () {
    const app = window.PortfolioApp;
    const STORAGE_KEY = 'yc-canvas-theme';
    const THEME_OPTIONS = new Set(['light', 'dark', 'auto']);
    const systemTheme = window.matchMedia('(prefers-color-scheme: dark)');

    // Light is the default identity of this canvas; system dark only applies if asked for.
    const DEFAULT_PREFERENCE = 'light';
    const CYCLE_ORDER = ['light', 'dark', 'auto'];
    const CYCLE_LABEL = { light: 'Light', dark: 'Dark', auto: 'Auto' };

    function getStoredThemePreference() {
        try {
            const saved = window.localStorage.getItem(STORAGE_KEY);
            return THEME_OPTIONS.has(saved) ? saved : DEFAULT_PREFERENCE;
        } catch {
            return DEFAULT_PREFERENCE;
        }
    }

    function resolveTheme(preference) {
        if (preference === 'auto') {
            return systemTheme.matches ? 'dark' : 'light';
        }

        return preference;
    }

    function updateThemeButtons(preference) {
        const next = CYCLE_ORDER[(CYCLE_ORDER.indexOf(preference) + 1) % CYCLE_ORDER.length];

        document.querySelectorAll('[data-theme-cycle]').forEach((button) => {
            button.dataset.themeState = preference;
            button.title = `Theme: ${CYCLE_LABEL[preference]}`;
            button.setAttribute('aria-label', `Theme: ${CYCLE_LABEL[preference]}. Switch to ${CYCLE_LABEL[next]}`);
        });

        // The settings panel shows the same preference as an explicit three-way choice.
        document.querySelectorAll('[data-settings-theme]').forEach((button) => {
            const isActive = button.dataset.settingsTheme === preference;

            button.classList.toggle('is-active', isActive);
            button.setAttribute('aria-pressed', isActive ? 'true' : 'false');
        });
    }

    app.applyThemePreference = function applyThemePreference(preference, shouldPersist = true) {
        const normalizedPreference = THEME_OPTIONS.has(preference) ? preference : DEFAULT_PREFERENCE;
        const resolvedTheme = resolveTheme(normalizedPreference);

        app.state.themePreference = normalizedPreference;
        document.body.dataset.themePreference = normalizedPreference;
        document.body.dataset.theme = resolvedTheme;
        document.documentElement.style.colorScheme = resolvedTheme;

        updateThemeButtons(normalizedPreference);

        if (!shouldPersist) return;

        try {
            window.localStorage.setItem(STORAGE_KEY, normalizedPreference);
        } catch {
            // Ignore storage failures in file:// or privacy-restricted contexts.
        }
    };

    app.initTheme = function initTheme() {
        app.applyThemePreference(getStoredThemePreference(), false);
        app.bindThemeToggle();

        if (app.state.themeListenerBound) return;

        const handleSystemThemeChange = () => {
            if (app.state.themePreference === 'auto') {
                app.applyThemePreference('auto', false);
            }
        };

        if (typeof systemTheme.addEventListener === 'function') {
            systemTheme.addEventListener('change', handleSystemThemeChange);
        } else if (typeof systemTheme.addListener === 'function') {
            systemTheme.addListener(handleSystemThemeChange);
        }

        app.state.themeListenerBound = true;
    };

    app.bindThemeToggle = function bindThemeToggle() {
        document.querySelectorAll('[data-theme-cycle]').forEach((button) => {
            if (button.dataset.themeBound === 'true') return;

            button.addEventListener('click', () => {
                const current = app.state.themePreference || DEFAULT_PREFERENCE;
                const next = CYCLE_ORDER[(CYCLE_ORDER.indexOf(current) + 1) % CYCLE_ORDER.length];

                app.applyThemePreference(next);
                app.playSound('tap');
            });

            button.dataset.themeBound = 'true';
        });

        app.state.themeToggleBound = true;
    };
})();
