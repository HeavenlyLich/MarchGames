const flowerState = document.getElementById('flowerState');
const instruction = document.getElementById('instruction');
const progressMessage = document.getElementById('progressMessage');

let currentStep = 1; 

const steps = {
    1: { text: "Посади насіння 🌰", icon: "🪴", toolId: "toolSeed" },
    2: { text: "Тепер полий землю 💧", icon: "🌱", toolId: "toolWater" },
    3: { text: "Потрібно трошки сонечка ☀️", icon: "🌿", toolId: "toolSun" },
    4: { text: "Дивись! Вона розквітла! 🌸", icon: "🌸", toolId: "" }
};

function handleAction(stepClicked) {
    if (stepClicked !== currentStep) {
        if (typeof playSound === 'function') playSound('error.mp3');
        return;
    }


    flowerState.classList.add('bloom');
    setTimeout(() => flowerState.classList.remove('bloom'), 1000);
    
    flowerState.innerText = steps[currentStep + 1].icon;
    
    document.getElementById(steps[currentStep].toolId).classList.add('disabled');
    currentStep++;

    if (currentStep <= 3) {
        document.getElementById(steps[currentStep].toolId).classList.remove('disabled');
        instruction.innerText = steps[currentStep].text;
        progressMessage.innerText = `Крок: ${currentStep} / 3`;
    } else {
        instruction.innerText = steps[4].text;
        progressMessage.innerText = "Готово!";
        setTimeout(showVictory, 1200);
    }
}

document.querySelectorAll('.tool-item').forEach(tool => {
    tool.onclick = () => handleAction(parseInt(tool.dataset.step));
});