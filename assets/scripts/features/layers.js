(function () {
    const app = window.PortfolioApp;

    app.bindLayers = function bindLayers() {
        document.querySelectorAll('.layer-item').forEach((item) => {
            item.addEventListener('click', () => {
                document.querySelectorAll('.layer-item').forEach((layerItem) => {
                    layerItem.classList.remove('active');
                });

                item.classList.add('active');

                const layer = item.dataset.layer;

                document.querySelectorAll('.card').forEach((card) => {
                    if (card.dataset.layer === layer) {
                        card.style.opacity = '1';
                        card.style.filter = 'none';
                    } else {
                        card.style.opacity = '0.3';
                        card.style.filter = 'grayscale(0.5)';
                    }
                });
            });
        });
    };
})();
