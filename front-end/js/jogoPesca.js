const fish = document.querySelector('.fish');
const catchBtn = document.getElementById('catchBtn');
const scoreDisplay = document.getElementById('score');
const gameOverMessage = document.getElementById('gameOverMessage');
const resetBtn = document.getElementById('resetBtn');

let fishPosition = 0;
let direction = 1;
let score = 0;
let gameOver = false;
let intervalId;

function moveFish() {
  if (gameOver) return;

  if (fishPosition >= 90) {
    direction = -1;
    fishPosition -= 2;
  } else if (fishPosition <= 0) {
    direction = 1;
    fishPosition += 2;
  } else {
    fishPosition += 2 * direction;
  }
  fish.style.left = fishPosition + '%';
}

function startFishMovement() {
  intervalId = setInterval(moveFish, 50);
}

function stopFishMovement() {
  clearInterval(intervalId);
}

function tryToCatch() {
  if (gameOver) return;

  if (fishPosition >= 40 && fishPosition <= 60) {
    const pointsEarned = Math.floor(Math.random() * 50) + 10;
    score += pointsEarned;
    scoreDisplay.textContent = score;

    if (score >= 500) {
      gameOver = true;
      stopFishMovement();
      gameOverMessage.style.display = 'block';
      catchBtn.disabled = true;
    }
  } else {
    alert('O peixe escapou! Tente novamente!');
  }
}

function resetGame() {
  score = 0;
  scoreDisplay.textContent = score;
  gameOver = false;
  fishPosition = 0;
  direction = 1;
  fish.style.left = '0%';
  gameOverMessage.style.display = 'none';
  catchBtn.disabled = false;
  startFishMovement();
}

catchBtn.addEventListener('click', tryToCatch);
resetBtn.addEventListener('click', resetGame);

startFishMovement();
