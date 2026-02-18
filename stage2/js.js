const player = document.getElementById("player");
const healthBar = document.getElementById("health-bar");
const scoreElement = document.getElementById("score");
const audio = new Audio("./../audio/background_music.opus");
audio.volume = 0.5;

const sun = document.getElementById("sun");
document.addEventListener("keydown", () => {
  if (audio.paused) {
    audio.play().catch((e) => console.log(""));
  }
});

const results = document.getElementById("results");
let playerX = 100;
let playerY = 300;
let health = 100;
let score = 0;
let gameOver = false;

const soud = document.querySelectorAll("h1");
soud.forEach((soud) => {
  soud.addEventListener("mouseover", function () {
    const audio1 = new Audio(
      "./../audio/freesound_crunchpixstudio-click-2-384920.mp3",
    );
    audio1.volume = 0.8;
    audio1.play();
  });
});

const keys = { KeyW: false, KeyS: false, KeyA: false, KeyD: false };
document.addEventListener("keydown", (e) => (keys[e.code] = true));
document.addEventListener("keyup", (e) => (keys[e.code] = false));

function move() {
  if (gameOver) return;
  if (keys.KeyW && playerY > 0) playerY -= 7;
  if (keys.KeyS && playerY < window.innerHeight - 50) playerY += 7;
  if (keys.KeyA && playerX > 0) playerX -= 7;
  if (keys.KeyD && playerX < window.innerWidth - 60) playerX += 7;

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

    if (ry < playerY + player.clientHeight / 2) ry += 2;
    if (ry > playerY + player.clientHeight / 2) ry -= 2;
    rx -= 10;

    rocket.style.left = rx + "px";
    rocket.style.top = ry + "px";

    if (Math.abs(rx - playerX) < 40 && Math.abs(ry - playerY - player.clientHeight / 2) < 70) {
      const sounds = new Audio("./../audio/crash.wav");
      sounds.volume = 0.2;
      sounds.play();
      health -= 1;
      healthBar.style.width = health + "%";

      rocket.remove();
      if (health <= 0) {
        gameOver = true;

        audio.pause();

        const gameOver1 = new Audio("./../audio/gameOver.mp3");
        gameOver1.play();

        results.style.display = "flex";

        document.body.classList.add("game-over-active");

        rocket.remove();
        return;
      }
      if (health >= 50) {
        sun.style.display = "flex";

        document.body.classList.add("bg");
      } else if (health <= 20) {
        document.body.classList.add("secbg");
        sun.style.display = "none";
      }
    }

    if (rx <= 10) {
      rocket.remove();
      score += 1;
      scoreElement.innerText = "Очки: " + score;
    } else {
      requestAnimationFrame(animateRocket);
    }
  }
  animateRocket();
}

move();
setInterval(spawnRocket, 1500);
