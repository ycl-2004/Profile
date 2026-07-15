(function () {
    const app = window.PortfolioApp;

    function closeMobileSidebar() {
        document.getElementById('sidebar')?.classList.remove('is-open');
        document.getElementById('sidebar-scrim')?.classList.remove('is-open');
        document.body.classList.remove('sidebar-open');
    }

    function showEvidence(focusSearch = false) {
        if (typeof app.setPortfolioView === 'function') app.setPortfolioView('list');
        closeMobileSidebar();
        if (focusSearch && typeof app.renderActivePortfolioView === 'function') {
            app.renderActivePortfolioView('search');
        }
        window.requestAnimationFrame(() => {
            document.getElementById('portfolio-list-search')?.focus({ preventScroll: true });
        });
    }

    function printResume() {
        showEvidence(false);
        document.body.classList.add('is-printing-resume');
        window.setTimeout(() => window.print(), 80);
    }

    app.bindProfileActions = function bindProfileActions() {
        document.addEventListener('click', (event) => {
            const actionTarget = event.target.closest('[data-profile-action]');
            if (!actionTarget) return;

            const action = actionTarget.dataset.profileAction;
            if (action === 'about') app.openModal('profile');
            if (action === 'evidence') showEvidence(false);
            if (action === 'search') showEvidence(true);
            if (action === 'print') printResume();
        });

        window.addEventListener('afterprint', () => {
            document.body.classList.remove('is-printing-resume');
        });
    };
})();
