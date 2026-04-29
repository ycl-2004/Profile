(function () {
    const app = window.PortfolioApp;

    app.data.connections = [
        { from: 'section-self', to: 'section-general', kind: 'path' },
        { from: 'section-general', to: 'section-experience', kind: 'path' },
        { from: 'section-experience', to: 'section-connect', kind: 'path' },
        { from: 'section-connect', to: 'section-explore', kind: 'path' },

        { from: 'section-self', to: 'self-philosophy', kind: 'primary' },
        { from: 'self-philosophy', to: 'self-agent-native', kind: 'secondary' },
        { from: 'self-agent-native', to: 'self-builder-mode', kind: 'secondary' },
        { from: 'self-builder-mode', to: 'self-motto', kind: 'secondary' },
        { from: 'self-motto', to: 'self-what-i-build', kind: 'secondary' },
        { from: 'self-builder-mode', to: 'self-ai-tooling', kind: 'secondary' },
        { from: 'self-philosophy', to: 'timeline', kind: 'secondary' },
        { from: 'self-agent-native', to: 'skills', kind: 'secondary' },
        { from: 'self-ai-tooling', to: 'project-ycapikit', kind: 'secondary' },
        { from: 'self-ai-tooling', to: 'project-todo', kind: 'secondary' },

        { from: 'section-general', to: 'timeline', kind: 'primary' },
        { from: 'timeline', to: 'skills', kind: 'secondary' },
        { from: 'skills', to: 'content', kind: 'secondary' },
        { from: 'content', to: 'opinion', kind: 'secondary' },
        { from: 'timeline', to: 'experience-main-label', kind: 'secondary' },
        { from: 'skills', to: 'project-family-care', kind: 'secondary' },
        { from: 'skills', to: 'project-ycapikit', kind: 'secondary' },
        { from: 'content', to: 'project-crypto', kind: 'secondary' },
        { from: 'opinion', to: 'connect-quote', kind: 'secondary' },

        { from: 'section-experience', to: 'experience-work-label', kind: 'primary' },
        { from: 'experience-work-label', to: 'work-delta', kind: 'primary' },
        { from: 'experience-work-label', to: 'work-joychime', kind: 'primary' },
        { from: 'section-experience', to: 'experience-main-label', kind: 'primary' },
        { from: 'experience-main-label', to: 'project-family-care', kind: 'primary' },
        { from: 'experience-main-label', to: 'project-ycapikit', kind: 'primary' },
        { from: 'experience-main-label', to: 'project-crypto', kind: 'primary' },
        { from: 'experience-main-label', to: 'project-todo', kind: 'primary' },
        { from: 'experience-main-label', to: 'project-edu-analysis', kind: 'primary' },
        { from: 'section-experience', to: 'experience-side-label', kind: 'secondary' },
        { from: 'experience-side-label', to: 'project-balance-bot', kind: 'primary' },
        { from: 'experience-side-label', to: 'education', kind: 'primary' },
        { from: 'experience-side-label', to: 'project-unity', kind: 'primary' },
        { from: 'experience-side-label', to: 'project-sailbot', kind: 'primary' },
        { from: 'project-family-care', to: 'connect-collab', kind: 'secondary' },
        { from: 'project-ycapikit', to: 'connect-collab', kind: 'secondary' },
        { from: 'work-delta', to: 'connect-stats', kind: 'secondary' },
        { from: 'work-joychime', to: 'connect-stats', kind: 'secondary' },
        { from: 'project-crypto', to: 'connect-stats', kind: 'secondary' },

        { from: 'section-connect', to: 'contact', kind: 'primary' },
        { from: 'contact', to: 'connect-collab', kind: 'secondary' },
        { from: 'connect-collab', to: 'connect-stats', kind: 'secondary' },
        { from: 'connect-stats', to: 'connect-quote', kind: 'secondary' },
        { from: 'contact', to: 'explore-links', kind: 'secondary' },
        { from: 'connect-stats', to: 'explore-tech', kind: 'secondary' },

        { from: 'section-explore', to: 'explore-links', kind: 'primary' },
        { from: 'explore-links', to: 'explore-tech', kind: 'secondary' },
        { from: 'explore-tech', to: 'explore-current', kind: 'secondary' }
    ];
})();
