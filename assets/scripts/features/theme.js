(function () {
    const app = window.PortfolioApp;
    const STORAGE_KEY = 'yc-canvas-theme';
    const THEME_OPTIONS = new Set(['light', 'dark', 'auto']);
    const systemTheme = window.matchMedia('(prefers-color-scheme: dark)');

    function getStoredThemePreference() {
        try {
            const saved = window.localStorage.getItem(STORAGE_KEY);
            return THEME_OPTIONS.has(saved) ? saved : 'auto';
        } catch {
            return 'auto';
        }
    }

    function resolveTheme(preference) {
        if (preference === 'auto') {
            return systemTheme.matches ? 'dark' : 'light';
        }

        return preference;
    }

    function updateThemeButtons(preference) {
        document.querySelectorAll('.theme-pill').forEach((button) => {
            const option = button.dataset.themeOption;
            const isActive = option === preference;

            button.classList.toggle('is-active', isActive);
            button.setAttribute('aria-pressed', isActive ? 'true' : 'false');
        });
    }

    app.applyThemePreference = function applyThemePreference(preference, shouldPersist = true) {
        const normalizedPreference = THEME_OPTIONS.has(preference) ? preference : 'auto';
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
        document.querySelectorAll('.theme-pill').forEach((button) => {
            if (button.dataset.themeBound === 'true') return;

            button.addEventListener('click', () => {
                app.applyThemePreference(button.dataset.themeOption || 'auto');
            });

            button.dataset.themeBound = 'true';
        });

        app.state.themeToggleBound = true;
    };
})();
