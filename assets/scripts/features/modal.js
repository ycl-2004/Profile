(function () {
    const app = window.PortfolioApp;

    app.openModal = function openModal(cardId) {
        const data = app.data.modalData[cardId];

        if (!data) return;

        app.dom.modalTitle.textContent = data.title;
        app.dom.modalSubtitle.textContent = data.subtitle;
        app.dom.modalAvatar.textContent = data.avatar;
        app.dom.modalBody.innerHTML = data.body;
        app.dom.modalTags.innerHTML = data.tags.map((tag) => `<span class="tag pink">${tag}</span>`).join('');
        app.dom.modalOverlay.classList.add('active');
    };

    app.bindModal = function bindModal() {
        document.querySelectorAll('.card').forEach((card) => {
            card.addEventListener('dblclick', () => {
                app.openModal(card.dataset.card);
            });
        });

        app.dom.modalCloseButton.addEventListener('click', () => {
            app.dom.modalOverlay.classList.remove('active');
        });

        app.dom.modalOverlay.addEventListener('click', (event) => {
            if (event.target === app.dom.modalOverlay) {
                app.dom.modalOverlay.classList.remove('active');
            }
        });

        document.addEventListener('keydown', (event) => {
            if (event.key === 'Escape') {
                app.dom.modalOverlay.classList.remove('active');
            }
        });
    };
})();
