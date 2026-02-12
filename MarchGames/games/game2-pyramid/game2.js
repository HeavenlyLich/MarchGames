const rodArea = document.getElementById('rodArea');
const ringsPool = document.getElementById('ringsPool');
const pyramidBase = document.getElementById('pyramidBase');

const ringSizes = [5, 4, 3, 2, 1];
let expectedSize = 5;

const ringColors = [
    '#FF6F61', '#6B5B95', '#88B04B', '#F7CAC9', 
    '#92A8D1', '#955251', '#B565A7', '#009B77'
];

function initGame() {
    ringsPool.innerHTML = '';
    rodArea.innerHTML = '';
    expectedSize = 5;

    const shuffledSizes = [...ringSizes].sort(() => Math.random() - 0.5);

    shuffledSizes.forEach(size => {
        const ring = document.createElement('div');
        ring.className = 'ring';
        ring.id = 'ring-' + size;
        ring.setAttribute('draggable', 'true');
        ring.setAttribute('data-size', size);
        
        const width = 80 + (size * 40); 
        ring.style.width = width + 'px';
        ring.style.height = '45px';
    
        const borderRadius = 10 + (size * 5); 
        ring.style.borderRadius = `${borderRadius}px`;

        const randomColor = ringColors[Math.floor(Math.random() * ringColors.length)];
        ring.style.backgroundColor = randomColor;
        
        ring.style.backgroundImage = `linear-gradient(to bottom, rgba(255,255,255,0.3), rgba(0,0,0,0.1))`;
        
        ring.addEventListener('dragstart', handleDragStart);
        ringsPool.appendChild(ring);
    });
}

function handleDragStart(e) {
    e.dataTransfer.setData('text', e.target.id);
    if (typeof playSound === 'function') {
        playSound('pick.mp3');
    }
}

pyramidBase.addEventListener('dragover', e => e.preventDefault());

pyramidBase.addEventListener('drop', e => {
    e.preventDefault();
    const id = e.dataTransfer.getData('text');
    const draggedRing = document.getElementById(id);
    if (!draggedRing) return;

    const size = parseInt(draggedRing.getAttribute('data-size'));

    if (size === expectedSize) {
        rodArea.appendChild(draggedRing);
        draggedRing.setAttribute('draggable', 'false');
        draggedRing.style.cursor = 'default';
        
        expectedSize--;

        if (expectedSize === 0) {
            setTimeout(showVictory, 500);
        }
    } else {
        if (typeof playSound === 'function') playSound('error.mp3');
        draggedRing.style.transform = "translateX(10px)";
        setTimeout(() => draggedRing.style.transform = "translateX(0)", 100);
    }
});

window.onload = initGame;