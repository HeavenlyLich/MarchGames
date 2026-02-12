
const stream = document.getElementById('stream');
const boat = document.getElementById('boat');
const progressDisplay = document.getElementById('progressMessage');
const btnLeft = document.getElementById('btnLeft');
const btnRight = document.getElementById('btnRight');

let score = 0;
const goal = 5;
let boatPosition = 120; 
const step = 30;
const streamWidth = 300;
const boatWidth = 60;

let gameInterval;
let isGameActive = true;

function moveLeft() {
    if (!isGameActive) return;
    if (boatPosition > 0) {
        boatPosition -= step;
        updateBoat();
    }
}

function moveRight() {
    if (!isGameActive) return;
    if (boatPosition < (streamWidth - boatWidth)) {
        boatPosition += step;
        updateBoat();
    }
}

function updateBoat() {
    boat.style.left = boatPosition + 'px';
    boat.style.transform = 'none'; 
}

btnLeft.addEventListener('click', moveLeft);
btnRight.addEventListener('click', moveRight);

document.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowLeft') moveLeft();
    if (e.key === 'ArrowRight') moveRight();
});

function startGame() {
    score = 0;
    updateProgress();
    isGameActive = true;
    
    if (gameInterval) clearInterval(gameInterval);
    
    gameInterval = setInterval(createObstacle, 2000);
}

function createObstacle() {
    if (!isGameActive) return;

    const obstacle = document.createElement('div');
    obstacle.classList.add('obstacle');
    obstacle.textContent = '🪨'; 
    
    const randomLeft = Math.floor(Math.random() * (streamWidth - 40)); 
    obstacle.style.left = randomLeft + 'px';
    
    stream.appendChild(obstacle);

    setTimeout(() => {
        obstacle.style.top = (stream.offsetHeight + 50) + 'px'; 
    }, 50);

    monitorObstacle(obstacle);
}

function monitorObstacle(obstacle) {
    const checker = setInterval(() => {
        if (!isGameActive) {
            clearInterval(checker);
            obstacle.remove();
            return;
        }

        const obsRect = obstacle.getBoundingClientRect();
        const boatRect = boat.getBoundingClientRect();

        if (isColliding(boatRect, obsRect)) {
            handleCollision(obstacle, checker);
        }
        else if (obstacle.offsetTop > stream.offsetHeight) {
            handlePass(obstacle, checker);
        }

    }, 50);
}

function isColliding(rect1, rect2) {
    return !(rect1.right < rect2.left || 
             rect1.left > rect2.right || 
             rect1.bottom < rect2.top || 
             rect1.top > rect2.bottom);
}

function handleCollision(obstacle, intervalId) {
    clearInterval(intervalId);
    obstacle.remove();
    
    if (typeof playSound === 'function') playSound('error.mp3');
    
    boat.style.opacity = '0.5';
    setTimeout(() => boat.style.opacity = '1', 300);
}

function handlePass(obstacle, intervalId) {
    clearInterval(intervalId);
    obstacle.remove();
    
    score++;
    updateProgress();
    
    if (typeof playSound === 'function') playSound('pick.mp3');

    if (score >= goal) {
        finishGame();
    }
}

function updateProgress() {
    progressDisplay.textContent = `Пройдено: ${score} / ${goal}`;
}

function finishGame() {
    isGameActive = false;
    clearInterval(gameInterval); 
    
    document.querySelectorAll('.obstacle').forEach(el => el.remove());

    if (typeof playSound === 'function')

    setTimeout(() => {
        if (typeof showVictory === 'function') {
            showVictory(); 
        }
    }, 800);
}

window.onload = startGame;