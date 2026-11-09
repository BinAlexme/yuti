(function() {
    'use strict';

    // выборка картинки
    function forceQuality() {
        const player = document.getElementById('movie_player');
        if (!player) return;

        // пошаговое вождение
        const settingsButton = player.querySelector('.ytp-settings-button');
        if (settingsButton) {
            settingsButton.click();

            setTimeout(() => {
                const menuItems = player.querySelectorAll('.ytp-menuitem');
                let qualityMenuOpened = false;

                menuItems.forEach(item => {
                    
                    if (item.textContent.includes('Качество') || item.textContent.includes('Quality')) {
                        item.click();
                        qualityMenuOpened = true;
                    }
                });

                // Меню качества открылось, ищем 1080p
                if (qualityMenuOpened) {
                    setTimeout(() => {
                        const qualityItems = player.querySelectorAll('.ytp-menuitem');
                        qualityItems.forEach(item => {
                            // Ищет 1080p или 1080pHD
                            if (item.textContent.includes('1080p')) {
                                item.click();
                            }
                        });
                    }, 300);
                }
            }, 300);
        }
    }

    let lastUrl = location.href;
    new MutationObserver(() => {
        const url = location.href;
        if (url !== lastUrl) {
            lastUrl = url;
            // Задержка
            setTimeout(forceQuality, 1500);
        }
    }).observe(document, {subtree: true, childList: true});

    window.addEventListener('load', () => setTimeout(forceQuality, 1500));
})();