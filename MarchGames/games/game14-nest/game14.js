const materialsArea = document.getElementById('materialsArea');
const nestTarget = document.getElementById('nestTarget');
const progressMessage = document.getElementById('progressMessage');

const materialTypes = [
    { icon: '🌿', type: 'grass' },
    { icon: '🪵', type: 'twig' },
    { icon: '🌱', type: 'grass' },
    { icon: '🍂', type: 'twig' }
];

let collectedCount = 0;
const goal = 8;

function initGame() {
    materialsArea.innerHTML = '';
    collectedCount = 0;
    updateProgress();

    for (let i = 0; i < goal; i++) {
        createMaterial(i);
    }
}

function createMaterial(id) {
    const data = materialTypes[Math.floor(Math.random() * materialTypes.length)];
    const el = document.createElement('div');
    el.className = 'item';
    el.id = 'material-' + id;
    el.innerText = data.icon;
    el.setAttribute('draggable', 'true');

    el.style.left = Math.random() * 85 + 5 + '%';
    el.style.top = Math.random() * 70 + 10 + '%';
    el.style.transform = `rotate(${Math.random() * 360}deg)`;

    el.ondragstart = (e) => {
        e.dataTransfer.setData('text/plain', el.id);
        if (typeof playSound === 'function') playSound('pick.mp3');
    };

    materialsArea.appendChild(el);
}

nestTarget.ondragover = (e) => {
    e.preventDefault();
    nestTarget.classList.add('drag-over');
};

nestTarget.ondragleave = () => {
    nestTarget.classList.remove('drag-over');
};

nestTarget.ondrop = (e) => {
    e.preventDefault();
    nestTarget.classList.remove('drag-over');
    
    const id = e.dataTransfer.getData('text/plain');
    const el = document.getElementById(id);

    if (el && !el.classList.contains('in-nest')) {
        el.classList.add('in-nest');
        nestTarget.appendChild(el);
        
        el.style.left = Math.random() * 60 + 20 + '%';
        el.style.top = Math.random() * 40 + 20 + '%';
        el.style.transform = `rotate(${Math.random() * 360}deg)`;

        collectedCount++;
        updateProgress();

        if (collectedCount === goal) {
            nestTarget.classList.add('nest-complete');
            
            setTimeout(showVictory, 800);
        }
    }
};

function updateProgress() {
    progressMessage.innerText = `Зібрано матеріалів: ${collectedCount} / ${goal}`;
}

window.onload = initGame;