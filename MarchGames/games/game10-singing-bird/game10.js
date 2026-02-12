const notesArea = document.getElementById('notesArea');
const mainBird = document.getElementById('mainBird');
const instruction = document.getElementById('instruction');
const progressMessage = document.getElementById('progressMessage');

const wordList = ['Spring', 'Summer', 'Sun', 'Warm', 'Rain', 'Cloud', 'Grow', 'Seed', 'Bird', 'Sing', 'Grass', 'Leaves'];
let selectedWords = [];
let sequence = [];
let userSequence = [];
let round = 1;
let isPlayerTurn = false;

function initGame() {
    selectedWords = [...wordList].sort(() => Math.random() - 0.5).slice(0, 4);
    renderBubbles();
    startNewRound();
}

function renderBubbles() {
    notesArea.innerHTML = '';
    selectedWords.forEach((word, index) => {
        const bubble = document.createElement('div');
        bubble.className = 'note-bubble';
        bubble.innerText = word;
        bubble.dataset.index = index;
        bubble.onclick = () => handleUserClick(index);
        notesArea.appendChild(bubble);
    });
}

async function startNewRound() {
    isPlayerTurn = false;
    userSequence = [];
    instruction.innerText = "Пташка співає...";
    progressMessage.innerText = `Раунд: ${round} / 3`;

    sequence.push(Math.floor(Math.random() * 4));

    for (const index of sequence) {
        await playNote(index);
        await new Promise(r => setTimeout(r, 400));
    }

    isPlayerTurn = true;
    instruction.innerText = "Повтори за пташкою!";
}

async function playNote(index) {
    const bubbles = document.querySelectorAll('.note-bubble');
    const bubble = bubbles[index];
    
    bubble.classList.add('active');
    mainBird.classList.add('bird-singing');
    
    if (typeof playSound === 'function') playSound('pick.mp3');

    await new Promise(r => setTimeout(r, 500));
    
    bubble.classList.remove('active');
    mainBird.classList.remove('bird-singing');
}

function handleUserClick(index) {
    if (!isPlayerTurn) return;

    userSequence.push(index);
    const expectedIndex = sequence[userSequence.length - 1];

    if (index === expectedIndex) {
        playNote(index);
        if (userSequence.length === sequence.length) {
            isPlayerTurn = false;
            if (round === 3) {
                setTimeout(() => {
                    showVictory();
                }, 800);
            } else {
                round++;
                setTimeout(startNewRound, 1000);
            }
        }
    } else {
        if (typeof playSound === 'function') playSound('error.mp3');
        instruction.innerText = "Ой! Спробуй ще раз.";
        userSequence = [];
        setTimeout(() => {
            instruction.innerText = "Повтори за пташкою!";
        }, 1000);
    }
}

window.onload = initGame;