// game15.js
const gameBoard = document.getElementById('gameBoard');
const progressMessage = document.getElementById('progressMessage');

const icons = ['☀️', '🌧️', '❄️', '🌱', '🌸', '🐦'];
let cards = [...icons, ...icons]; // Створюємо пари
let flippedCards = [];
let matchedPairs = 0;
let canFlip = true;

function initGame() {
    gameBoard.innerHTML = '';
    matchedPairs = 0;
    // Перемішуємо картки
    cards.sort(() => Math.random() - 0.5);

    cards.forEach((icon, index) => {
        const card = document.createElement('div');
        card.className = 'card';
        card.dataset.icon = icon;
        card.innerHTML = `
            <div class="card-face card-back">?</div>
            <div class="card-face card-front">${icon}</div>
        `;
        card.onclick = () => flipCard(card);
        gameBoard.appendChild(card);
    });
}

function flipCard(card) {
    if (!canFlip || card.classList.contains('flipped') || card.classList.contains('matched')) return;

    if (typeof playSound === 'function') playSound('pick.mp3');
    card.classList.add('flipped');
    flippedCards.push(card);

    if (flippedCards.length === 2) {
        checkMatch();
    }
}

function checkMatch() {
    canFlip = false;
    const [card1, card2] = flippedCards;

    if (card1.dataset.icon === card2.dataset.icon) {
        // УСПІХ: Картки залишаються відкритими і яскравими
        setTimeout(() => {
            card1.classList.add('matched');
            card2.classList.add('matched');
            
            matchedPairs++;
            updateProgress();
                        
            flippedCards = [];
            canFlip = true;

            if (matchedPairs === icons.length) {
                setTimeout(showVictory, 500);
            }
        }, 500); // Невелика затримка, щоб дитина побачила другу картку
    } else {
        // ПОМИЛКА: Закриваємо картки назад
        setTimeout(() => {
            card1.classList.remove('flipped');
            card2.classList.remove('flipped');
            if (typeof playSound === 'function') playSound('error.mp3');
            flippedCards = [];
            canFlip = true;
        }, 1000);
    }
}

function updateProgress() {
    progressMessage.innerText = `Знайдено пар: ${matchedPairs} / ${icons.length}`;
}

window.onload = initGame;