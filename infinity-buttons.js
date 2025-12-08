const container = document.getElementById('infinity-container');
const message = document.getElementById('message');

// создаем canvas
const canvas = document.createElement('canvas');
canvas.width = container.offsetWidth;
canvas.height = container.offsetHeight;
canvas.style.position = 'absolute';
canvas.style.top = '0';
canvas.style.left = '0';
container.appendChild(canvas);
const ctx = canvas.getContext('2d');
ctx.strokeStyle = 'white';
ctx.lineWidth = 3;

const N = 12; // количество кнопок
const buttons = [];
const coords = [];
const a = 120; // масштаб Лемнискаты

const centerX = container.offsetWidth / 2;
const centerY = container.offsetHeight / 2;

// создаем координаты по Лемнискате Бернулли
for (let i = 0; i < N; i++) {
  const t = (i / N) * 2 * Math.PI;
  const denom = 1 + Math.sin(t) ** 2;
  const x = a * Math.cos(t) / denom;
  const y = a * Math.sin(t) * Math.cos(t) / denom;
  coords.push({ x: centerX + x - 20, y: centerY + y - 20 }); // -20 для центрирования кнопки
}

let currentStep = 0;

// создаем кнопки
coords.forEach((pos, index) => {
  const btn = document.createElement('button');
  btn.classList.add('inf-btn');
  btn.style.position = 'absolute';
  btn.style.width = '40px';
  btn.style.height = '40px';
  btn.style.borderRadius = '50%';
  btn.style.border = 'none';
  btn.style.backgroundColor = '#ff4444';
  btn.style.color = 'white';
  btn.style.fontWeight = 'bold';
  btn.style.cursor = 'pointer';
  btn.style.left = pos.x + 'px';
  btn.style.top = pos.y + 'px';
  btn.style.display = 'flex';
  btn.style.justifyContent = 'center';
  btn.style.alignItems = 'center';
  btn.textContent = index + 1;

  if (index !== 0) {
    btn.disabled = true;
    btn.style.backgroundColor = '#888';
  }

  btn.addEventListener('click', () => {
    if (index !== currentStep) return;
    btn.style.backgroundColor = '#00c851';
    btn.disabled = true;
    currentStep++;

    if (currentStep < N) {
      buttons[currentStep].disabled = false;
      buttons[currentStep].style.backgroundColor = '#ff4444';
      drawLine(index, currentStep);
    } else {
      drawFullInfinity();
      setTimeout(() => {
        message.textContent = "Здесь появится ваш текст ❤️";
        message.style.display = 'block';
      }, 500);
    }
  });

  container.appendChild(btn);
  buttons.push(btn);
});

// функция рисования линии между кнопками
function drawLine(fromIndex, toIndex) {
  const from = coords[fromIndex];
  const to = coords[toIndex];
  ctx.beginPath();
  ctx.moveTo(from.x + 20, from.y + 20);
  ctx.lineTo(to.x + 20, to.y + 20);
  ctx.stroke();
}

// функция нарисовать весь символ ∞
function drawFullInfinity() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.beginPath();
  ctx.moveTo(coords[0].x + 20, coords[0].y + 20);
  for (let i = 1; i < coords.length; i++) {
    ctx.lineTo(coords[i].x + 20, coords[i].y + 20);
  }
  ctx.stroke();
}
