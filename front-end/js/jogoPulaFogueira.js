let jumping = false;
let gameOver = false;
let score = 0;
let scoreInterval;
let obstacleInterval;
let collisionInterval;

const dino = document.getElementById("dino");
const dinoImg = document.getElementById("dino-img");
const scoreElement = document.getElementById("score");
const gameOverElement = document.getElementById("game-over");
const gameContainer = document.getElementById("game");

function handleJump() {
  if (jumping || gameOver) return;
  jumping = true;

  const isMobile = window.innerWidth <= 768;
  const jumpDuration = isMobile ? 600 : 300;

  dino.classList.add("jump");
  dinoImg.src = "../assets/caipira2.png"; 

  setTimeout(() => {
    dino.classList.remove("jump");
    dinoImg.src = "../assets/caipira1.png"; 
    jumping = false;
  }, jumpDuration);
}

function createObstacle() {
  const obstacle = document.createElement("div");
  obstacle.className = "obstacle";

  obstacle.style.backgroundImage = "url('../assets/fogueira\ \(1\).png')";
  obstacle.style.animation = "moveObstacle 3s linear forwards";

  gameContainer.appendChild(obstacle);

  obstacle.addEventListener("animationend", () => {
    if (!gameOver) {
      obstacle.remove();
    }
  });
}

function checkCollision() {
  const dinoRect = dino.getBoundingClientRect();
  const obstacles = document.querySelectorAll(".obstacle");

  obstacles.forEach((obstacle) => {
    const obsRect = obstacle.getBoundingClientRect();

    const collided =
      dinoRect.left < obsRect.right &&
      dinoRect.right > obsRect.left &&
      dinoRect.bottom > obsRect.top;

    if (collided) {
      endGame();
    }
  });
}

function updateScore() {
  score += 1;
  scoreElement.textContent = "Score: " + score;
}

function startGame() {
  score = 0;
  gameOver = false;
  scoreElement.textContent = "Score: 0";
  gameOverElement.classList.add("hidden");

  scoreInterval = setInterval(updateScore, 100);
  obstacleInterval = setInterval(createObstacle, 1800);
  collisionInterval = setInterval(checkCollision, 50);
}

function endGame() {
  gameOver = true;
  clearInterval(scoreInterval);
  clearInterval(obstacleInterval);
  clearInterval(collisionInterval);
  gameOverElement.classList.remove("hidden");
}

function restartGame() {
  document.querySelectorAll(".obstacle").forEach((el) => el.remove());
  startGame();
}

gameContainer.addEventListener("click", handleJump);
startGame();
