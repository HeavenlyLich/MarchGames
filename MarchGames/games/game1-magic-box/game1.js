const shapesArea = document.getElementById('shapesArea');
const boxes = document.querySelectorAll('.box');

const shapeTypes = ['circle', 'square', 'triangle'];
const colors = ['#ff5f5f', '#5fafff', '#ffcf5f', '#4caf50', '#9c27b0', '#ff9800']; 
let matchedCount = 0;
const TOTAL_TO_MATCH = 6;

function initGame() {
    shapesArea.innerHTML = '';
    matchedCount = 0;

    for (let i = 0; i < TOTAL_TO_MATCH; i++) {
        const randomType = shapeTypes[Math.floor(Math.random() * shapeTypes.length)];
        const randomColor = colors[Math.floor(Math.random() * colors.length)];
        
        const shape = document.createElement('div');
        shape.classList.add('shape'); 
        shape.setAttribute('draggable', 'true');
        shape.setAttribute('data-shape', randomType);
        shape.id = 'shape-' + i;

        const maskUrl = `url('../../assets/images/${randomType}_mask.png')`;
        
        shape.style.webkitMaskImage = maskUrl;
        shape.style.maskImage = maskUrl;
        shape.style.webkitMaskSize = 'contain';
        shape.style.maskSize = 'contain';
        shape.style.webkitMaskRepeat = 'no-repeat';
        shape.style.maskRepeat = 'no-repeat';
        
        shape.style.backgroundColor = randomColor; 
        
        shape.addEventListener('dragstart', handleDragStart);
        shape.addEventListener('dragend', handleDragEnd);
        
        shapesArea.appendChild(shape);
    }
}


function handleDragStart(e) {
    playSound('pick.mp3');
    draggedShape = e.target;
    e.dataTransfer.setData('text/plain', e.target.id);
    
    if (e.target.classList.contains('triangle')) {
        e.target.style.opacity = '0.99'; 
    }
    
    e.target.classList.add('dragging');
}

function handleDragEnd(e) {
    e.target.style.opacity = '1';
}

boxes.forEach(box => {
    box.addEventListener('dragover', (e) => {
        e.preventDefault(); 
    });

    box.addEventListener('dragenter', function() {
        this.classList.add('hovered');
    });

    box.addEventListener('dragleave', function() {
        this.classList.remove('hovered');
    });

    box.addEventListener('drop', function(e) {
        e.preventDefault();
        this.classList.remove('hovered');

        const shapeId = e.dataTransfer.getData('text/plain');
        const draggedShape = document.getElementById(shapeId);
        
        if (!draggedShape) return;

        const shapeType = draggedShape.getAttribute('data-shape');
        const targetType = this.getAttribute('data-target');

        if (shapeType === targetType) {
            playSound('drop_success.mp3');
            matchedCount++;
            draggedShape.remove();
            
            this.classList.add('box-success');
            setTimeout(() => this.classList.remove('box-success'), 500);

            if (matchedCount === TOTAL_TO_MATCH) {
                if (typeof showVictory === 'function') {
                    showVictory(); 
                } else {
                    alert("Congratulations!");
                }
            }
        } else {
            draggedShape.style.transform = "scale(0.8)";
            setTimeout(() => draggedShape.style.transform = "scale(1)", 200);
        }
    });
});

window.onload = initGame;