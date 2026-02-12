const palette = document.getElementById('palette');
const seasonTitle = document.getElementById('seasonTitle');
const nextBtn = document.getElementById('nextBtn');
const paintableAreas = document.querySelectorAll('.paintable');

let selectedColor = null;
let currentSeasonIndex = 0;
let paintedCount = 0; 

const seasons = [
    { 
        name: "Spring", 
        colors: ['#B3E5FC', '#C8E6C9', '#A8E6CF', '#F8BBD0', '#8D6E63', '#5D4037'] 
    },
    { 
        name: "Summer", 
        colors: ['#81D4FA', '#4CAF50', '#2E7D32', '#FFF176', '#FFAB91', '#5D4037'] 
    },
    { 
        name: "Autumn", 
        colors: ['#CFD8DC', '#FFB74D', '#E65100', '#FBC02D', '#8D6E63', '#5D4037'] 
    },
    { 
        name: "Winter", 
        colors: ['#ECEFF1', '#FFFFFF', '#90CAF9', '#3F51B5', '#455A64', '#5D4037'] 
    }
];

function setupSeason(index) {
    const season = seasons[index];
    seasonTitle.innerText = `${season.name} Painter`;
    palette.innerHTML = '';
    selectedColor = null;
    paintedCount = 0;
    nextBtn.style.display = 'none';


    document.getElementById('skyArea').style.backgroundColor = '#f9f9f9';
    document.getElementById('crownArea').style.backgroundColor = '#f0f0f0';
    document.getElementById('trunkArea').style.backgroundColor = '#e0e0e0';
    document.getElementById('groundArea').style.backgroundColor = '#ececec';

    season.colors.forEach(color => {
        const circle = document.createElement('div');
        circle.className = 'color-circle';
        circle.style.backgroundColor = color;
        
        circle.onclick = () => {
            document.querySelectorAll('.color-circle').forEach(c => c.classList.remove('selected'));
            circle.classList.add('selected');
            selectedColor = color;
            if (typeof playSound === 'function') playSound('pick.mp3');
        };
        
        palette.appendChild(circle);
    });
}

paintableAreas.forEach(area => {
    area.onclick = () => {
        if (selectedColor) {
            area.style.backgroundColor = selectedColor;
            paintedCount++;
            
            
            if (paintedCount >= 2) {
                nextBtn.style.display = 'block';
            }
        } else {
            alert("Спочатку обери колір на палітрі!");
        }
    };
});

nextBtn.onclick = () => {
    currentSeasonIndex++;
    
    if (currentSeasonIndex < seasons.length) {
        setupSeason(currentSeasonIndex);
    } else {
        if (typeof showVictory === 'function') {
            showVictory();
        }
    }
};

window.onload = () => setupSeason(0);