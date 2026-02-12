const wheel = document.getElementById('wheel');
const instruction = document.getElementById('instruction');

let currentRotation = 45; 
wheel.style.transform = `rotate(${currentRotation}deg)`;

const seasonColors = {
    45:  '#e8f5e9', 
    135: '#f0f8ff', 
    225: '#fff3e0', 
    315: '#fffde7' 
};

function spin() {
    currentRotation += 90;
    wheel.style.transform = `rotate(${currentRotation}deg)`;
    
    if (typeof playSound === 'function') playSound('pick.mp3');

    const angle = currentRotation % 360;
    
    if (seasonColors[angle]) {
        document.body.style.backgroundColor = seasonColors[angle];
    }

    if (angle === 45) {
        setTimeout(checkWin, 800);
    }
}

function checkWin() {
    instruction.innerText = "Ура! Весна настала! ☀️🌱";
    
    setTimeout(() => {
        if (typeof showVictory === 'function') showVictory();
    }, 500);
}

wheel.onclick = spin;
document.getElementById('spinBtn').onclick = spin;