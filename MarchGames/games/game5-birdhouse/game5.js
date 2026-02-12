const shapePalette = document.getElementById('shapePalette');
const buildArea = document.getElementById('buildArea');
const progressMessage = document.getElementById('progressMessage');

const shapesData = {
    square: { name: 'Стіна', mask: '../../assets/images/square_mask.png', color: '#D7CCC8' },
    triangle: { name: 'Дах', mask: '../../assets/images/triangle_mask.png', color: '#AFB42B' },
    circle: { name: 'Вхід', mask: '../../assets/images/circle_mask.png', color: '#5D4037' }
};

let score = 0;

function initGame() {
    shapePalette.innerHTML = '';
    score = 0;

    Object.keys(shapesData).forEach(type => {
        const data = shapesData[type];
        const shape = document.createElement('div');
        shape.className = 'draggable-shape';
        shape.setAttribute('draggable', 'true');
        shape.setAttribute('data-shape', type);
        
        shape.style.backgroundColor = data.color;
        shape.style.MaskImage = `url(${data.mask})`;
        shape.style.maskImage = `url(${data.mask})`;

        shape.addEventListener('dragstart', (e) => {
            e.dataTransfer.setData('text/plain', type);
            if (typeof playSound === 'function') playSound('pick.mp3');
        });
        
        shapePalette.appendChild(shape);
    });
}

buildArea.addEventListener('dragover', e => e.preventDefault());

buildArea.addEventListener('drop', e => {
    e.preventDefault();
    const shapeType = e.dataTransfer.getData('text/plain');
    const targetPlaceholder = e.target.closest('.placeholder');

    if (targetPlaceholder && targetPlaceholder.getAttribute('data-shape') === shapeType) {
        if (!targetPlaceholder.classList.contains('filled')) {
            placeShape(shapeType, targetPlaceholder);
        }
    } else {
        if (typeof playSound === 'function') playSound('error.mp3');
    }
});

function placeShape(type, placeholder) {
    const data = shapesData[type];
    const shape = document.createElement('div');
    shape.className = 'placed-shape';
    shape.setAttribute('data-shape', type);
    
    shape.style.width = placeholder.offsetWidth + 'px';
    shape.style.height = placeholder.offsetHeight + 'px';
    shape.style.left = placeholder.offsetLeft + 'px';
    shape.style.top = placeholder.offsetTop + 'px';
    
    shape.style.backgroundColor = data.color;
    shape.style.webkitMaskImage = `url(${data.mask})`;
    shape.style.maskImage = `url(${data.mask})`;

    buildArea.appendChild(shape);
    placeholder.classList.add('filled');
    
    const original = document.querySelector(`.draggable-shape[data-shape="${type}"]`);
    if (original) original.style.visibility = 'hidden';

    score++;
    progressMessage.innerText = `Зібрано: ${score} / 3`;

    if (score === 3) {
        setTimeout(showVictory, 800);
    }
}

window.onload = initGame;