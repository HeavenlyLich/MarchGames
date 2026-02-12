const sky = document.getElementById('sky');
const hiddenSun = document.getElementById('hiddenSun');
const instruction = document.getElementById('instruction');
const progressMessage = document.getElementById('progressMessage');

let cloudsCount = 6;

function initGame() {
    cloudsCount = 6;
    sky.innerHTML = '<div id="hiddenSun" class="big-sun">☀️</div>';
    const sunReference = document.getElementById('hiddenSun');
    
    document.body.classList.remove('warm-sky');
    instruction.innerText = "Прожени всі хмаринки! ☁️";
    updateProgress();

    for (let i = 0; i < cloudsCount; i++) {
        createCloud();
    }
}

function createCloud() {
    const cloud = document.createElement('div');
    cloud.className = 'cloud';
    cloud.innerText = '☁️';
    
    const x = Math.random() * (sky.offsetWidth - 100);
    const y = Math.random() * (sky.offsetHeight - 100);
    
    cloud.style.left = x + 'px';
    cloud.style.top = y + 'px';

    cloud.onclick = () => {
        if (!cloud.classList.contains('vanishing')) {
            cloud.classList.add('vanishing');
            if (typeof playSound === 'function') playSound('puff.mp3');
            
            setTimeout(() => {
                cloud.remove();
                cloudsCount--;
                updateProgress();
                checkVictory();
            }, 300);
        }
    };

    sky.appendChild(cloud);
}

function updateProgress() {
    progressMessage.innerText = `Залишилося хмаринок: ${cloudsCount}`;
}

function checkVictory() {
    if (cloudsCount === 0) {
        document.body.classList.add('warm-sky');
        const sun = document.getElementById('hiddenSun');
        sun.classList.add('visible');
        
        instruction.innerText = "Тепер тепло та сонячно! ☀️";
        
        
        setTimeout(() => {
            if (typeof showVictory === 'function') showVictory();
        }, 1500);
    }
}

window.onload = initGame;