(function () {
    const app = window.PortfolioApp;
    const PHONE_BP = 768;
    const TABLET_BP = 1365;

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

    function stackCards(cardIds, left, top, width, gap) {
        let y = top;

        cardIds.forEach((cardId) => {
            const el = setCard(cardId, left, y, width);
            y += getH(el) + gap;
        });

        return { y };
    }

    function getViewportMode() {
        const viewportWidth = window.innerWidth;

        if (viewportWidth < PHONE_BP) return 'phone';
        if (viewportWidth < TABLET_BP) return 'tablet';
        return 'desktop';
    }

    function layoutDesktop() {
        const xSelf = 80;
        const xGeneral = 470;
        const xExp1 = 960;
        const xExp2 = 1320;
        const xExp3 = 1680;

        const wSelf = 330;
        const wGeneral = 420;
        const wGrid = 340;
        const wHub = 180;
        const wSubHub = 180;

        const top0 = 70;
        const gap = 18;
        const sectionGap = 24;

        const selfHub = setCard('self-hub', xSelf, top0, 170);
        let ySelf = top0 + getH(selfHub) + sectionGap;

        ({ y: ySelf } = stackCards(
            ['profile', 'narrative', 'ai-partner'],
            xSelf,
            ySelf,
            wSelf,
            gap
        ));

        const agentNative = setCard('sticky-agent-native', xSelf, ySelf, 260);
        ySelf += getH(agentNative) + gap;

        const motto = setCard('motto', xSelf, ySelf, wSelf);
        ySelf += getH(motto) + gap;

        const stickyIntj = setCard('sticky-intj', xSelf, ySelf, 156);
        const stickyAgent = setCard('sticky-agent', xSelf + 174, ySelf, 156);
        ySelf += Math.max(getH(stickyIntj), getH(stickyAgent)) + gap;

        const generalHub = setCard('general-hub', xGeneral, top0, wHub);
        let yGeneral = top0 + getH(generalHub) + sectionGap;

        ({ y: yGeneral } = stackCards(
            ['timeline', 'skills', 'content', 'opinion'],
            xGeneral,
            yGeneral,
            wGeneral,
            gap
        ));

        const experienceHub = setCard('experience-hub', xExp2 + 20, top0, 190);
        let yExperience = top0 + getH(experienceHub) + 28;

        const workHub = setCard('work-hub', xExp1, yExperience, 170);
        const independentHub = setCard('independent-hub', xExp2, yExperience, wSubHub);
        const researchHub = setCard('research-hub', xExp3, yExperience, 170);
        yExperience += Math.max(getH(workHub), getH(independentHub), getH(researchHub)) + gap;

        let yWork = yExperience;
        ({ y: yWork } = stackCards(
            ['work-delta', 'work-joychime'],
            xExp1,
            yWork,
            wGrid,
            gap
        ));

        let yIndependent = yExperience;
        ({ y: yIndependent } = stackCards(
            ['project-family-care', 'project-ycapikit', 'project-todo'],
            xExp2,
            yIndependent,
            wGrid,
            gap
        ));

        let yResearch = yExperience;
        ({ y: yResearch } = stackCards(
            ['project-dao', 'project-crypto', 'project-edu-analysis'],
            xExp3,
            yResearch,
            wGrid,
            gap
        ));

        const yAcademic = Math.max(yWork - gap, yIndependent - gap, yResearch - gap) + 40;

        const academicHub = setCard('academic-hub', xExp1, yAcademic, wSubHub);
        let yAcademicCards = yAcademic + getH(academicHub) + gap;

        const academicRowOne = [
            setCard('education', xExp1, yAcademicCards, wGrid),
            setCard('project-unity', xExp2, yAcademicCards, wGrid),
            setCard('project-sailbot', xExp3, yAcademicCards, wGrid)
        ];
        yAcademicCards += Math.max(...academicRowOne.map(getH)) + gap;

        const academicRowTwo = [
            setCard('project-balance-bot', xExp1, yAcademicCards, wGrid),
            setCard('project-metal-detector', xExp2, yAcademicCards, wGrid)
        ];
        const secondRowH = Math.max(...academicRowTwo.map(getH));
        yAcademicCards += secondRowH + gap;

        const contactHub = setCard('contact-hub', xExp3, yAcademicCards + 6, 170);
        yAcademicCards += getH(contactHub) + gap + 6;
        setCard('contact', xExp3, yAcademicCards, wGrid);
    }

    function layoutTablet() {
        const margin = 56;
        const colGap = 32;
        const totalWidth = Math.max(0, window.innerWidth - margin * 2 - colGap);
        const colW = Math.max(296, Math.min(360, Math.floor(totalWidth / 2)));
        const x1 = margin;
        const x2 = margin + colW + colGap;

        const top0 = 70;
        const gap = 18;
        const sectionGap = 22;

        const selfHub = setCard('self-hub', x1, top0, 170);
        const generalHub = setCard('general-hub', x2, top0, 180);

        let ySelf = top0 + getH(selfHub) + sectionGap;
        ({ y: ySelf } = stackCards(
            ['profile', 'narrative', 'ai-partner', 'sticky-agent-native', 'motto', 'sticky-intj', 'sticky-agent'],
            x1,
            ySelf,
            colW,
            gap
        ));

        let yGeneral = top0 + getH(generalHub) + sectionGap;
        ({ y: yGeneral } = stackCards(
            ['timeline', 'skills', 'content', 'opinion'],
            x2,
            yGeneral,
            colW,
            gap
        ));

        const expHubW = 190;
        const expHubX = x1 + Math.round(((colW * 2) + colGap - expHubW) / 2);
        const yExpTop = Math.max(ySelf, yGeneral) + 36;
        const experienceHub = setCard('experience-hub', expHubX, yExpTop, expHubW);
        let yExperience = yExpTop + getH(experienceHub) + 24;

        const workHub = setCard('work-hub', x1, yExperience, 170);
        const independentHub = setCard('independent-hub', x2, yExperience, 180);
        yExperience += Math.max(getH(workHub), getH(independentHub)) + gap;

        let yWork = yExperience;
        ({ y: yWork } = stackCards(
            ['work-delta', 'work-joychime'],
            x1,
            yWork,
            colW,
            gap
        ));

        let yIndependent = yExperience;
        ({ y: yIndependent } = stackCards(
            ['project-family-care', 'project-ycapikit', 'project-todo'],
            x2,
            yIndependent,
            colW,
            gap
        ));

        const yLowerTop = Math.max(yWork, yIndependent) + 32;
        const researchHub = setCard('research-hub', x1, yLowerTop, 170);
        const academicHub = setCard('academic-hub', x2, yLowerTop, 180);
        const yLowerCards = yLowerTop + Math.max(getH(researchHub), getH(academicHub)) + gap;

        let yResearch = yLowerCards;
        ({ y: yResearch } = stackCards(
            ['project-dao', 'project-crypto', 'project-edu-analysis'],
            x1,
            yResearch,
            colW,
            gap
        ));

        let yAcademic = yLowerCards;
        ({ y: yAcademic } = stackCards(
            ['education', 'project-unity', 'project-sailbot', 'project-balance-bot', 'project-metal-detector'],
            x2,
            yAcademic,
            colW,
            gap
        ));

        const yContactTop = Math.max(yResearch, yAcademic) + 36;
        const contactHubW = 170;
        const contactHubX = x1 + Math.round(((colW * 2) + colGap - contactHubW) / 2);
        const contactHub = setCard('contact-hub', contactHubX, yContactTop, contactHubW);
        const yContact = yContactTop + getH(contactHub) + gap;
        const contactX = x1 + Math.round(((colW * 2) + colGap - colW) / 2);
        setCard('contact', contactX, yContact, colW);
    }

    function layoutPhone() {
        const margin = 20;
        const top0 = 68;
        const gap = 14;
        const sectionGap = 20;
        const fullW = Math.max(268, Math.min(380, window.innerWidth - margin * 2));
        const hubW = Math.min(190, fullW);
        const x = margin;

        let y = top0;

        function placeHub(cardId) {
            const hub = setCard(cardId, x, y, hubW);
            y += getH(hub) + sectionGap;
        }

        function placeStack(cardIds) {
            ({ y } = stackCards(cardIds, x, y, fullW, gap));
        }

        placeHub('self-hub');
        placeStack(['profile', 'narrative', 'ai-partner', 'sticky-agent-native', 'motto', 'sticky-intj', 'sticky-agent']);

        y += 8;
        placeHub('general-hub');
        placeStack(['timeline', 'skills', 'content', 'opinion']);

        y += 10;
        placeHub('experience-hub');
        placeHub('work-hub');
        placeStack(['work-delta', 'work-joychime']);

        y += 6;
        placeHub('independent-hub');
        placeStack(['project-family-care', 'project-ycapikit', 'project-todo']);

        y += 6;
        placeHub('research-hub');
        placeStack(['project-dao', 'project-crypto', 'project-edu-analysis']);

        y += 6;
        placeHub('academic-hub');
        placeStack(['education', 'project-unity', 'project-sailbot', 'project-balance-bot', 'project-metal-detector']);

        y += 10;
        placeHub('contact-hub');
        placeStack(['contact']);
    }

    app.getViewportMode = getViewportMode;

    app.applyDefaultLayout = function applyDefaultLayout() {
        const mode = getViewportMode();
        app.state.viewportMode = mode;

        if (mode === 'phone') {
            layoutPhone();
        } else if (mode === 'tablet') {
            layoutTablet();
        } else {
            layoutDesktop();
        }

        if (typeof app.updateConnections === 'function') app.updateConnections();
        if (typeof app.updateMinimap === 'function') app.updateMinimap();
    };
})();
