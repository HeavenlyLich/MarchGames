const weatherIcon = document.getElementById('weatherIcon');
const weatherText = document.getElementById('weatherText');
const optionsContainer = document.getElementById('optionsContainer');
const progressMessage = document.getElementById('progressMessage');

const weatherTypes = [
    { type: 'sun', icon: '☀️', text: 'На вулиці сонячно!', correct: '👕' },
    { type: 'rain', icon: '🌧️', text: 'Ой, іде дощик!', correct: '👢' }
];

const clothes = [
    { icon: '👕', type: 'sun' },
    { icon: '👒', type: 'sun' },
    { icon: '👢', type: 'rain' },
    { icon: '☂️', type: 'rain' }
];

let score = 0;
let currentWeather = {};

function initLevel() {
    optionsContainer.innerHTML = '';
    
    currentWeather = weatherTypes[Math.floor(Math.random() * weatherTypes.length)];
    weatherIcon.innerText = currentWeather.icon;
    weatherText.innerText = currentWeather.text;

    const correctItems = clothes.filter(c => c.type === currentWeather.type);
    const wrongItems = clothes.filter(c => c.type !== currentWeather.type);
    
    const levelOptions = [
        correctItems[Math.floor(Math.random() * correctItems.length)],
        wrongItems[Math.floor(Math.random() * wrongItems.length)]
    ].sort(() => Math.random() - 0.5);

    levelOptions.forEach(item => {
        const card = document.createElement('div');
        card.className = 'clothing-card';
        card.innerText = item.icon;
        card.onclick = () => checkChoice(item.type);
        optionsContainer.appendChild(card);
    });
}

function checkChoice(itemType) {
    if (itemType === currentWeather.type) {
        score++;
        progressMessage.innerText = `Зібрано: ${score} / 3`;

        if (score >= 3) {
            setTimeout(showVictory, 500);
        } else {
            setTimeout(initLevel, 800);
        }
    } else {
        if (typeof playSound === 'function') playSound('error.mp3');
        optionsContainer.classList.add('shake');
        setTimeout(() => optionsContainer.classList.remove('shake'), 500);
    }
}

window.onload = initLevel;