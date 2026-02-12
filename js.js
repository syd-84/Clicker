const player = document.getElementById("player");
const healthBar = document.getElementById("health-bar");
const scoreElement = document.getElementById("score");

let playerX = 100;
let playerY = 300;
let health = 100;
let score = 0;
let gameOver = false;

const keys = { w: false, s: false, a: false, d: false };
document.addEventListener("keydown", (e) => (keys[e.key.toLowerCase()] = true));
document.addEventListener("keyup", (e) => (keys[e.key.toLowerCase()] = false));

function move() {
  if (gameOver) return;
  if (keys.w && playerY > 0) playerY -= 7;
  if (keys.s && playerY < window.innerHeight - 50) playerY += 7;
  if (keys.a && playerX > 0) playerX -= 7;
  if (keys.d && playerX < window.innerWidth - 60) playerX += 7;

  player.style.left = playerX + "px";
  player.style.top = playerY + "px";
  requestAnimationFrame(move);
}

function spawnRocket() {
  if (gameOver) return;
  const rocket = document.createElement("div");
  rocket.className = "rocket";
  document.getElementById("game-container").appendChild(rocket);

  let rx = window.innerWidth;
  let ry = Math.random() * window.innerHeight;

  function animateRocket() {
    if (gameOver) {
      rocket.remove();
      return;
    }

    if (ry < playerY) ry += 2;
    if (ry > playerY) ry -= 2;
    rx -= 5;

    rocket.style.left = rx + "px";
    rocket.style.top = ry + "px";

    if (Math.abs(rx - playerX) < 40 && Math.abs(ry - playerY) < 30) {
      health -= 20;
      healthBar.style.width = health + "%";
      rocket.remove();
      if (health <= 0) {
        gameOver = true;

        location.reload();
      }
      return;
    }

    if (rx < -50) {
      rocket.remove();
      score += 10;
      scoreElement.innerText = "Очки: " + score;
    } else {
      requestAnimationFrame(animateRocket);
    }
  }
  animateRocket();
}

move();
setInterval(spawnRocket, 1500);
