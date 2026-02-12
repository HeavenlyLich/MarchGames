/**
 * Універсальна функція для програвання звуків
 * @param {string} fileName - назва файлу (напр. 'success.mp3')
 * @param {string} path - шлях до папки зі звуками (опціонально)
 */

function playSound(fileName, path = '../../assets/sounds/') {
    const audio = new Audio(`${path}${fileName}`);
    
    audio.play().catch(error => {

        console.warn("Audio playback delayed until user interaction:", error);
    });
}