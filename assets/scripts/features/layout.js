(function () {
    const app = window.PortfolioApp;

    function px(n) {
        return Math.round(n) + 'px';
    }

    function setCard(cardId, left, top, width) {
        const el = document.querySelector(`[data-card="${cardId}"]`);
        if (!el) return null;
        el.style.left = px(left);
        el.style.top = px(top);
        if (typeof width === 'number') el.style.width = px(width);
        return el;
    }

    function getH(el) {
        return el ? (el.offsetHeight || 0) : 0;
    }

    app.applyDefaultLayout = function applyDefaultLayout() {
        // 这个布局以“不会互相覆盖”为第一优先，同时对齐你给的截图结构：
        // 左：Profile / Narrative / Agent Native / Content / Opinion
        // 中：Timeline / AI Workflow / Motto + Stickies
        // 右：Skills + 3×3 Project Grid +（下方）extra cards

        // Columns
        const xL = 80;
        const xM = 430;
        const xR1 = 880;
        const xR2 = 1240;
        const xR3 = 1600;

        // Width presets
        const wLeft = 330;
        const wMid = 420;
        const wAi = 380;
        const wSkills = 520;
        const wGrid = 340;

        const top0 = 70;
        const gap = 18;

        // LEFT STACK
        let yL = top0;
        const profile = setCard('profile', xL, yL, wLeft);
        yL += getH(profile) + gap;
        const narrative = setCard('narrative', xL, yL, wLeft);
        yL += getH(narrative) + gap;
        const agentNative = setCard('sticky-agent-native', xL, yL, 260);
        yL += getH(agentNative) + gap;
        const content = setCard('content', xL, yL, wLeft);
        yL += getH(content) + gap;
        setCard('opinion', xL, yL, wLeft);

        // MIDDLE STACK
        let yM = top0;
        const timeline = setCard('timeline', xM, yM, wMid);
        yM += getH(timeline) + gap;
        const ai = setCard('ai-partner', xM, yM, wAi);
        yM += getH(ai) + gap;
        const motto = setCard('motto', xM, yM, 360);
        yM += getH(motto) + gap;
        const stickyIntj = setCard('sticky-intj', xM, yM, 200);
        const stickyAgent = setCard('sticky-agent', xM + 220, yM, 240);
        yM += Math.max(getH(stickyIntj), getH(stickyAgent)) + gap;

        // RIGHT: SKILLS + GRID
        const skills = setCard('skills', xR1, top0, wSkills);
        let yG = top0 + getH(skills) + gap;

        const gridRows = [
            ['project-crypto', 'project-dao', 'project-family-care'],
            ['project-todo', 'project-ycapikit', 'project-edu-analysis'],
            // Delta Controls 放进第三行 grid（按你的反馈）
            ['work-delta', 'project-balance-bot', 'project-unity']
        ];

        gridRows.forEach((row) => {
            const els = [
                setCard(row[0], xR1, yG, wGrid),
                setCard(row[1], xR2, yG, wGrid),
                setCard(row[2], xR3, yG, wGrid)
            ];
            const rowH = Math.max(...els.map(getH));
            yG += rowH + gap;
        });

        // BELOW GRID (extra)
        const below = [
            setCard('project-metal-detector', xR1, yG, wGrid),
            setCard('project-sailbot', xR2, yG, wGrid),
            setCard('education', xR3, yG, wGrid)
        ];
        const belowH = Math.max(...below.map(getH));
        yG += belowH + gap;

        // Contact under Education (same column)
        setCard('contact', xR3, yG, wGrid);

        // 重新算完布局后，同步连线/小地图（注意：connections.js 内部会做缓存与增量更新）
        if (typeof app.updateConnections === 'function') app.updateConnections();
        if (typeof app.updateMinimap === 'function') app.updateMinimap();
    };
})();

