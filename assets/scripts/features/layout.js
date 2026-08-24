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
        return el ? el.offsetHeight || 0 : 0;
    }

    function stackCards(cardIds, left, top, width, gap) {
        let y = top;

        cardIds.forEach((cardId) => {
            const el = setCard(cardId, left, y, width);
            y += getH(el) + gap;
        });

        return { y };
    }

    function placeGridRows(rows, leftA, leftB, top, width, gap) {
        let y = top;

        rows.forEach(([cardA, cardB]) => {
            const elA = cardA ? setCard(cardA, leftA, y, width) : null;
            const elB = cardB ? setCard(cardB, leftB, y, width) : null;
            y += Math.max(getH(elA), getH(elB)) + gap;
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
        const top0 = 112;
        const vGap = 24;
        const sectionGap = 24;
        const rowGap = 24;

        const xSelf = 56;
        const xGeneral = 378;
        const xExpA = 752;
        const xExpB = 1070;
        const xConnect = 1418;
        const xExplore = 1698;

        const wSelf = 286;
        const wGeneral = 334;
        const wExp = 290;
        const wExpSection = (xExpB + wExp) - xExpA;
        const wConnect = 244;
        const wExplore = 236;
        const wLabel = 162;

        const selfSection = setCard('section-self', xSelf, top0, wSelf);
        let ySelf = top0 + getH(selfSection) + sectionGap;
        ({ y: ySelf } = stackCards(
            [
                'self-philosophy',
                'self-builder-mode',
                'self-what-i-build',
                'project-yc-brand-systems'
            ],
            xSelf,
            ySelf,
            wSelf,
            vGap
        ));

        const generalSection = setCard('section-general', xGeneral, top0, wGeneral);
        let yGeneral = top0 + getH(generalSection) + sectionGap;
        ({ y: yGeneral } = stackCards(
            ['timeline', 'skills', 'content'],
            xGeneral,
            yGeneral,
            wGeneral,
            vGap
        ));

        const expSection = setCard('section-experience', xExpA, top0, wExpSection);
        let yExp = top0 + getH(expSection) + sectionGap;
        const workLabel = setCard('experience-work-label', xExpA + 16, yExp, wLabel);
        yExp += getH(workLabel) + rowGap;
        ({ y: yExp } = placeGridRows(
            [
                ['work-delta', 'work-ai-warts'],
                ['work-joychime', null]
            ],
            xExpA,
            xExpB,
            yExp,
            wExp,
            rowGap
        ));

        yExp += 8;
        const aiLabel = setCard('experience-ai-label', xExpA + 16, yExp, 196);
        yExp += getH(aiLabel) + rowGap;
        ({ y: yExp } = placeGridRows(
            [
                ['project-rag-system', 'project-media-ops'],
                ['project-ai-agents', null]
            ],
            xExpA,
            xExpB,
            yExp,
            wExp,
            rowGap
        ));

        yExp += 8;
        const mainLabel = setCard('experience-main-label', xExpA + 16, yExp, wLabel);
        yExp += getH(mainLabel) + rowGap;
        ({ y: yExp } = placeGridRows(
            [
                ['project-orbit', 'project-notype'],
                ['project-todo', 'project-browser-organizer'],
                ['project-sharememory', 'project-screen-bridge']
            ],
            xExpA,
            xExpB,
            yExp,
            wExp,
            rowGap
        ));

        const sideLabel = setCard('experience-side-label', xExpA + 16, yExp + 8, 196);
        yExp = yExp + 8 + getH(sideLabel) + rowGap;
        ({ y: yExp } = placeGridRows(
            [
                ['project-open-source', 'education']
            ],
            xExpA,
            xExpB,
            yExp,
            wExp,
            rowGap
        ));

        const connectSection = setCard('section-connect', xConnect, top0, wConnect);
        let yConnect = top0 + getH(connectSection) + sectionGap;
        ({ y: yConnect } = stackCards(
            ['contact', 'connect-collab', 'connect-stats', 'connect-quote'],
            xConnect,
            yConnect,
            wConnect,
            vGap
        ));

        const exploreSection = setCard('section-explore', xExplore, top0, wExplore);
        let yExplore = top0 + getH(exploreSection) + sectionGap;
        ({ y: yExplore } = stackCards(
            ['explore-links', 'explore-tech', 'explore-current'],
            xExplore,
            yExplore,
            wExplore,
            vGap
        ));
    }

    function layoutTablet() {
        const margin = 44;
        const top0 = 112;
        const gap = 20;
        const rowGap = 18;
        const totalW = Math.max(0, window.innerWidth - margin * 2 - gap);
        const leftW = Math.max(280, Math.min(336, Math.floor(totalW * 0.38)));
        const rightW = Math.max(320, totalW - leftW);
        const xLeft = margin;
        const xRight = margin + leftW + gap;

        const selfSection = setCard('section-self', xLeft, top0, leftW);
        let yLeft = top0 + getH(selfSection) + 20;
        ({ y: yLeft } = stackCards(
            [
                'self-philosophy',
                'self-builder-mode',
                'self-what-i-build',
                'project-yc-brand-systems'
            ],
            xLeft,
            yLeft,
            leftW,
            gap
        ));

        const generalSection = setCard('section-general', xRight, top0, rightW);
        let yRight = top0 + getH(generalSection) + 20;
        ({ y: yRight } = stackCards(
            ['timeline', 'skills', 'content'],
            xRight,
            yRight,
            rightW,
            gap
        ));

        const gridTop = Math.max(yLeft, yRight) + 34;
        const gridW = Math.max(260, Math.floor((window.innerWidth - margin * 2 - gap) / 2));
        const xGridA = margin;
        const xGridB = margin + gridW + gap;

        const expSection = setCard('section-experience', xGridA, gridTop, gridW * 2 + gap);
        let yExp = gridTop + getH(expSection) + 18;
        const workLabel = setCard('experience-work-label', xGridA + 10, yExp, 150);
        yExp += getH(workLabel) + rowGap;
        ({ y: yExp } = placeGridRows(
            [
                ['work-delta', 'work-ai-warts'],
                ['work-joychime', null]
            ],
            xGridA,
            xGridB,
            yExp,
            gridW,
            rowGap
        ));

        yExp += 6;
        const aiLabel = setCard('experience-ai-label', xGridA + 10, yExp, 184);
        yExp += getH(aiLabel) + rowGap;
        ({ y: yExp } = placeGridRows(
            [
                ['project-rag-system', 'project-media-ops'],
                ['project-ai-agents', null]
            ],
            xGridA,
            xGridB,
            yExp,
            gridW,
            rowGap
        ));

        yExp += 6;
        const mainLabel = setCard('experience-main-label', xGridA + 10, yExp, 150);
        yExp += getH(mainLabel) + rowGap;
        ({ y: yExp } = placeGridRows(
            [
                ['project-orbit', 'project-notype'],
                ['project-todo', 'project-browser-organizer'],
                ['project-sharememory', 'project-screen-bridge']
            ],
            xGridA,
            xGridB,
            yExp,
            gridW,
            rowGap
        ));

        const sideLabel = setCard('experience-side-label', xGridA + 10, yExp + 6, 184);
        yExp = yExp + 6 + getH(sideLabel) + rowGap;
        ({ y: yExp } = placeGridRows(
            [
                ['project-open-source', 'education']
            ],
            xGridA,
            xGridB,
            yExp,
            gridW,
            rowGap
        ));

        const yBottom = yExp + 30;
        const bottomColW = Math.floor((window.innerWidth - margin * 2 - gap) / 2);

        const connectSection = setCard('section-connect', xGridA, yBottom, bottomColW);
        let yConnect = yBottom + getH(connectSection) + 18;
        ({ y: yConnect } = stackCards(
            ['contact', 'connect-collab', 'connect-stats', 'connect-quote'],
            xGridA,
            yConnect,
            bottomColW,
            gap
        ));

        const exploreSection = setCard('section-explore', xGridB, yBottom, bottomColW);
        let yExplore = yBottom + getH(exploreSection) + 18;
        ({ y: yExplore } = stackCards(
            ['explore-links', 'explore-tech', 'explore-current'],
            xGridB,
            yExplore,
            bottomColW,
            gap
        ));
    }

    function layoutPhone() {
        const margin = 20;
        const top0 = 108;
        const gap = 14;
        const fullW = Math.max(268, Math.min(430, window.innerWidth - margin * 2));
        const sectionW = fullW;
        const useTwoColumnProjects = window.innerWidth >= 560;
        const x = margin;
        let y = top0;

        function placeOne(cardId, width = fullW) {
            const el = setCard(cardId, x, y, width);
            y += getH(el) + gap;
        }

        function placePair(cardA, cardB) {
            if (!useTwoColumnProjects) {
                if (cardA) placeOne(cardA);
                if (cardB) placeOne(cardB);
                return;
            }

            const halfGap = 12;
            const colW = Math.floor((fullW - halfGap) / 2);
            const elA = setCard(cardA, x, y, colW);
            const elB = setCard(cardB, x + colW + halfGap, y, colW);
            y += Math.max(getH(elA), getH(elB)) + gap;
        }

        placeOne('section-self', sectionW);
        placeOne('self-philosophy');
        placeOne('self-builder-mode');
        placeOne('self-what-i-build');
        placeOne('project-yc-brand-systems');

        y += 4;
        placeOne('section-general', sectionW);
        placeOne('timeline');
        placeOne('skills');
        placeOne('content');

        y += 4;
        placeOne('section-experience', sectionW);
        placeOne('experience-work-label', 164);
        placePair('work-delta', 'work-ai-warts');
        placeOne('work-joychime');
        placeOne('experience-ai-label', 196);
        placePair('project-rag-system', 'project-media-ops');
        placeOne('project-ai-agents');
        placeOne('experience-main-label', 164);
        placePair('project-orbit', 'project-notype');
        placePair('project-todo', 'project-browser-organizer');
        placePair('project-sharememory', 'project-screen-bridge');
        placeOne('experience-side-label', 196);
        placePair('project-open-source', 'education');

        y += 4;
        placeOne('section-connect', sectionW);
        placeOne('contact');
        placeOne('connect-collab');
        placeOne('connect-stats');
        placeOne('connect-quote');

        y += 4;
        placeOne('section-explore', sectionW);
        placeOne('explore-links');
        placeOne('explore-tech');
        placeOne('explore-current');
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
