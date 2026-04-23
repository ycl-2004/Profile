(function () {
    const app = window.PortfolioApp;

    app.data.connections = [
        { from: 'self-hub', to: 'general-hub', kind: 'path' },
        { from: 'general-hub', to: 'experience-hub', kind: 'path' },
        { from: 'experience-hub', to: 'contact-hub', kind: 'path' },

        { from: 'self-hub', to: 'profile', kind: 'primary' },
        { from: 'self-hub', to: 'narrative', kind: 'primary' },
        { from: 'self-hub', to: 'ai-partner', kind: 'primary' },
        { from: 'self-hub', to: 'motto', kind: 'primary' },
        { from: 'self-hub', to: 'sticky-agent-native', kind: 'primary' },
        { from: 'self-hub', to: 'sticky-intj', kind: 'primary' },
        { from: 'self-hub', to: 'sticky-agent', kind: 'primary' },

        { from: 'general-hub', to: 'timeline', kind: 'primary' },
        { from: 'general-hub', to: 'skills', kind: 'primary' },
        { from: 'general-hub', to: 'content', kind: 'primary' },
        { from: 'content', to: 'opinion', kind: 'primary' },

        { from: 'experience-hub', to: 'work-hub', kind: 'primary' },
        { from: 'experience-hub', to: 'independent-hub', kind: 'primary' },
        { from: 'experience-hub', to: 'research-hub', kind: 'primary' },
        { from: 'experience-hub', to: 'academic-hub', kind: 'primary' },

        { from: 'work-hub', to: 'work-delta', kind: 'primary' },
        { from: 'work-hub', to: 'work-joychime', kind: 'primary' },

        { from: 'independent-hub', to: 'project-family-care', kind: 'primary' },
        { from: 'independent-hub', to: 'project-ycapikit', kind: 'primary' },
        { from: 'independent-hub', to: 'project-todo', kind: 'primary' },

        { from: 'research-hub', to: 'project-dao', kind: 'primary' },
        { from: 'research-hub', to: 'project-crypto', kind: 'primary' },
        { from: 'research-hub', to: 'project-edu-analysis', kind: 'primary' },

        { from: 'academic-hub', to: 'education', kind: 'primary' },
        { from: 'academic-hub', to: 'project-unity', kind: 'primary' },
        { from: 'academic-hub', to: 'project-sailbot', kind: 'primary' },
        { from: 'academic-hub', to: 'project-balance-bot', kind: 'primary' },
        { from: 'academic-hub', to: 'project-metal-detector', kind: 'primary' },

        { from: 'contact-hub', to: 'contact', kind: 'primary' },

        { from: 'narrative', to: 'ai-partner', kind: 'secondary' },
        { from: 'timeline', to: 'skills', kind: 'secondary' },
        { from: 'project-family-care', to: 'project-ycapikit', kind: 'secondary' },
        { from: 'project-balance-bot', to: 'project-metal-detector', kind: 'secondary' }
    ];
})();
