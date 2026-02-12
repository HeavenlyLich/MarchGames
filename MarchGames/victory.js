function showVictory() {
    // 1. Створюємо HTML структуру вікна, якщо її ще немає
    let overlay = document.getElementById('victoryOverlay');
    
    if (!overlay) {
        overlay = document.createElement('div');
        overlay.id = 'victoryOverlay';
        overlay.className = 'overlay';
        overlay.innerHTML = `
            <div class="victory-card">
                <h2 class="congrats-text">Congratulations!</h2>
                <div class="victory-buttons">
                    <button onclick="location.reload()" style="background:#4caf50; color:white; padding:15px; border-radius:10px; cursor:pointer; border:none;">Again</button>
                    <a href="../../index.html" style="background:#2196f3; color:white; padding:15px; border-radius:10px; text-decoration:none; margin-left:10px;">Back to Menu</a>
                </div>
            </div>
        `;
        document.body.appendChild(overlay);
    }

    // 2. Показуємо вікно (з невеликою затримкою для анімації)
    setTimeout(() => {
        overlay.classList.add('visible');
    }, 100);

    // 3. Запускаємо конфеті
    if (typeof confetti === 'function') {
        playSound('victory.mp3');
        confetti({
            particleCount: 150,
            spread: 70,
            origin: { y: 0.6 }
        });
    }
}