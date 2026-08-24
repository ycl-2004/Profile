(function () {
    const app = window.PortfolioApp;
    const RESUME_PDF_URL = 'https://ycl-2004.github.io/Resume/YC-Resume.pdf';

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

    function openResumePdf() {
        closeMobileSidebar();
        const resumeWindow = window.open(RESUME_PDF_URL, '_blank', 'noopener,noreferrer');
        if (!resumeWindow) window.location.assign(RESUME_PDF_URL);
    }

    app.bindProfileActions = function bindProfileActions() {
        document.addEventListener('click', (event) => {
            const actionTarget = event.target.closest('[data-profile-action]');
            if (!actionTarget) return;

            const action = actionTarget.dataset.profileAction;
            if (action === 'about') app.openModal('profile');
            if (action === 'evidence') showEvidence(false);
            if (action === 'search') showEvidence(true);
            if (action === 'print') openResumePdf();
        });
    };
})();
