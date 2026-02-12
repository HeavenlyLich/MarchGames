const windyArea = document.getElementById('windyArea');
const progressMessage = document.getElementById('progressMessage');

const items = [
    { icon: '🌿', colorType: 'light', color: '#aed581' },
    { icon: '🍃', colorType: 'dark', color: '#388e3c' },
];

let score = 0;
const totalToCollect = 6;

function initGame() {
    windyArea.innerHTML = '';
    score = 0;
    
    for (let i = 0; i < totalToCollect; i++) {
        createLeaf();
    }
}

function createLeaf() {
    const data = items[Math.floor(Math.random() * items.length)];
    const leaf = document.createElement('div');
    leaf.className = 'draggable-item';
    leaf.innerText = data.icon;
    leaf.style.color = data.color;
    leaf.setAttribute('draggable', 'true');
    leaf.dataset.type = data.colorType;

    leaf.style.left = Math.random() * 80 + 10 + '%';
    leaf.style.top = Math.random() * 70 + 10 + '%';
    leaf.style.transform = `rotate(${Math.random() * 360}deg)`;

    leaf.ondragstart = (e) => {
        e.dataTransfer.setData('text/plain', data.colorType);
        leaf.id = 'dragging-leaf';
        if (typeof playSound === 'function') playSound('pick.mp3');
    };

    windyArea.appendChild(leaf);
}

document.querySelectorAll('.basket-box').forEach(basket => {
    basket.ondragover = (e) => e.preventDefault();
    basket.ondrop = (e) => {
        e.preventDefault();
        const leafType = e.dataTransfer.getData('text/plain');
        const basketType = basket.dataset.color;
        const leaf = document.getElementById('dragging-leaf');

        if (leafType === basketType) {
            leaf.remove();
            score++;
            progressMessage.innerText = `Зібрано: ${score} / ${totalToCollect}`;

            if (score === totalToCollect) {
                setTimeout(showVictory, 500);
            }
        } else {
            if (typeof playSound === 'function') playSound('error.mp3');
            leaf.id = '';
        }
    };
});

window.onload = initGame;