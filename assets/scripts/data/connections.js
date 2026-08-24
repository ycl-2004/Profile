(function () {
    const app = window.PortfolioApp;

    app.data.connections = [
        { from: 'section-self', to: 'section-general', kind: 'path' },
        { from: 'section-general', to: 'section-experience', kind: 'path' },
        { from: 'section-experience', to: 'section-connect', kind: 'path' },
        { from: 'section-connect', to: 'section-explore', kind: 'path' },

        { from: 'section-self', to: 'self-philosophy', kind: 'primary' },
        { from: 'self-philosophy', to: 'self-builder-mode', kind: 'secondary' },
        { from: 'self-builder-mode', to: 'self-what-i-build', kind: 'secondary' },
        { from: 'self-what-i-build', to: 'project-yc-brand-systems', kind: 'secondary' },
        { from: 'self-philosophy', to: 'timeline', kind: 'secondary' },

        { from: 'section-general', to: 'timeline', kind: 'primary' },
        { from: 'timeline', to: 'skills', kind: 'secondary' },
        { from: 'skills', to: 'content', kind: 'secondary' },
        { from: 'content', to: 'project-yc-brand-systems', kind: 'secondary' },
        { from: 'skills', to: 'project-open-source', kind: 'secondary' },

        { from: 'section-experience', to: 'experience-work-label', kind: 'primary' },
        { from: 'experience-work-label', to: 'work-delta', kind: 'primary' },
        { from: 'experience-work-label', to: 'work-ai-warts', kind: 'primary' },
        { from: 'experience-work-label', to: 'work-joychime', kind: 'primary' },
        { from: 'section-experience', to: 'experience-ai-label', kind: 'primary' },
        { from: 'experience-ai-label', to: 'project-rag-system', kind: 'primary' },
        { from: 'experience-ai-label', to: 'project-media-ops', kind: 'primary' },
        { from: 'experience-ai-label', to: 'project-ai-agents', kind: 'primary' },
        { from: 'work-ai-warts', to: 'project-open-source', kind: 'secondary' },
        { from: 'section-experience', to: 'experience-main-label', kind: 'primary' },
        { from: 'experience-main-label', to: 'project-orbit', kind: 'primary' },
        { from: 'experience-main-label', to: 'project-notype', kind: 'primary' },
        { from: 'experience-main-label', to: 'project-todo', kind: 'primary' },
        { from: 'experience-main-label', to: 'project-browser-organizer', kind: 'primary' },
        { from: 'experience-main-label', to: 'project-sharememory', kind: 'primary' },
        { from: 'experience-main-label', to: 'project-screen-bridge', kind: 'primary' },
        { from: 'section-experience', to: 'experience-side-label', kind: 'secondary' },
        { from: 'experience-side-label', to: 'project-open-source', kind: 'primary' },
        { from: 'experience-side-label', to: 'education', kind: 'primary' },
        { from: 'project-open-source', to: 'connect-stats', kind: 'secondary' },
        { from: 'work-delta', to: 'connect-stats', kind: 'secondary' },

        { from: 'section-connect', to: 'contact', kind: 'primary' },
        { from: 'contact', to: 'connect-collab', kind: 'secondary' },
        { from: 'connect-collab', to: 'connect-stats', kind: 'secondary' },
        { from: 'connect-stats', to: 'connect-quote', kind: 'secondary' },
        { from: 'contact', to: 'explore-links', kind: 'secondary' },
        { from: 'section-explore', to: 'explore-links', kind: 'primary' },
        { from: 'explore-links', to: 'explore-tech', kind: 'secondary' },
        { from: 'explore-tech', to: 'explore-current', kind: 'secondary' }
    ];
})();
