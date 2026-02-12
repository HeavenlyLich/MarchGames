const puddlesContainer = document.getElementById('puddlesContainer');
const duckPalette = document.getElementById('duckPalette');
const instruction = document.getElementById('instruction');
const progressMessage = document.getElementById('progressMessage');

const shapes = ['square', 'triangle', 'circle'];
const shapeNames = { square: 'square', triangle: 'triangle', circle: 'circle' };

let targetShape = '';
let score = 0;

function initGame() {
    puddlesContainer.innerHTML = '';
    duckPalette.innerHTML = '';
    score = 0;

    [...shapes].sort(() => Math.random() - 0.5).forEach(type => {
        const puddle = document.createElement('div');
        puddle.className = 'puddle';
        puddle.setAttribute('data-shape', type);
        
        const water = document.createElement('div');
        water.className = 'puddle-water';
        puddle.appendChild(water);

        puddle.addEventListener('dragover', e => e.preventDefault());
        puddle.addEventListener('drop', handleDrop);
        puddlesContainer.appendChild(puddle);
    });

    targetShape = shapes[Math.floor(Math.random() * shapes.length)];
    instruction.innerText = `Постав качечок у ${shapeNames[targetShape]} puddle!`;

    for (let i = 0; i < 3; i++) {
        const duck = document.createElement('div');
        duck.className = 'draggable-duck';
        duck.setAttribute('draggable', 'true');
        duck.id = 'duck-' + i;
        duck.addEventListener('dragstart', e => {
            e.dataTransfer.setData('text/plain', e.target.id);
            if (typeof playSound === 'function') playSound('pick.mp3');
        });
        duckPalette.appendChild(duck);
    }
}

function handleDrop(e) {
    e.preventDefault();
    const duckId = e.dataTransfer.getData('text/plain');
    const duck = document.getElementById(duckId);
    const puddle = e.currentTarget;
    const shape = puddle.getAttribute('data-shape');

    if (shape === targetShape) {
        score++;
        puddle.appendChild(duck);
        
        const randomLeft = Math.floor(Math.random() * 50) + 15; 
        const randomTop = Math.floor(Math.random() * 30) + 20;  
        
        duck.style.left = randomLeft + '%';
        duck.style.top = randomTop + '%';
        
        duck.setAttribute('draggable', 'false');
        duck.style.cursor = 'default';

        progressMessage.innerText = `Знайдено калюж: ${score} / 3`;

        if (score === 3) setTimeout(showVictory, 600);
    } else {
        if (typeof playSound === 'function') playSound('error.mp3');
    }
}

window.onload = initGame;