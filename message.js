const messageText = 
"Ты — моё всё 💖\n" +
"Я всегда рядом, в каждом шаге, в каждом дне ✨\n" +
"Ты невероятно важна для меня ❤️\n" +
"И вместе мы преодолеем абсолютно всё, любимая 🌹";

const container = document.getElementById('animated-message');
let index = 0;

function typeWriter() {
    if (index < messageText.length) {
        const ch = messageText[index];
        container.innerHTML += (ch === "\n") ? "<br>" : ch;
        index++;
        setTimeout(typeWriter, 50);
    }
}
typeWriter();

/* Сердечки */
function spawnHearts() {
    const container = document.getElementById('hearts');
    setInterval(() => {
        const heart = document.createElement('div');
        heart.classList.add('heart');
        heart.textContent = '❤';
        heart.style.left = Math.random() * 100 + '%';
        heart.style.fontSize = (15 + Math.random() * 25) + 'px';
        heart.style.animationDuration = (4 + Math.random() * 4) + 's';
        container.appendChild(heart);
        setTimeout(() => heart.remove(), 7000);
    }, 600);
}
spawnHearts();
