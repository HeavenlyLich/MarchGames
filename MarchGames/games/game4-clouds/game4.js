const skyArea = document.getElementById('skyArea');
const targetNameDisplay = document.getElementById('targetShapeName');
const scoreDisplay = document.getElementById('score');

const shapes = [
    { id: 'circle', name: 'circle', mask: '../../assets/images/circle_mask.png' },
    { id: 'square', name: 'square', mask: '../../assets/images/square_mask.png' },
    { id: 'triangle', name: 'triangle', mask: '../../assets/images/triangle_mask.png' }
];

let currentTarget = null;
let score = 0;
const WIN_SCORE = 5;

function spawnClouds() {
    skyArea.innerHTML = '';
    currentTarget = shapes[Math.floor(Math.random() * shapes.length)];
    targetNameDisplay.innerText = currentTarget.name;

    for (let i = 0; i < 10; i++) {
        const randomShape = shapes[Math.floor(Math.random() * shapes.length)];
        const cloud = document.createElement('div');
        cloud.className = 'cloud';
        
        cloud.style.webkitMaskImage = `url(${randomShape.mask})`;
        cloud.style.maskImage = `url(${randomShape.mask})`;

        const top = Math.random() * 70 + 10; 
        const left = Math.random() * 80 + 5;  
        cloud.style.top = top + '%';
        cloud.style.left = left + '%';

        const duration = 3 + Math.random() * 4; 
        const delay = Math.random() * -5; 
        cloud.style.animationDuration = `${duration}s`;
        cloud.style.animationDelay = `${delay}s`;

        cloud.onclick = () => {
            if (randomShape.id === currentTarget.id) {
                score++;
                scoreDisplay.innerText = score;
                cloud.style.opacity = '0';
                cloud.style.pointerEvents = 'none';
                if (typeof playSound === 'function') playSound('puff.mp3');

                if (score >= WIN_SCORE) {
                    showVictory();
                } else {
                    setTimeout(spawnClouds, 800);
                }
            } else {
                if (typeof playSound === 'function') playSound('puff.mp3');
                cloud.style.transform = 'shake 0.5s'; 
                cloud.classList.add('shake-animation');
                setTimeout(() => cloud.classList.remove('shake-animation'), 500);
    
            }
        };

        skyArea.appendChild(cloud);
    }
}

window.onload = spawnClouds;