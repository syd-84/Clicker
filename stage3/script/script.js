"use strict";

let gunLeft = document.getElementById("gun_left");
let gunRight = document.getElementById("gun_right");
let xGunLeft = gunLeft.clientWidth;
let yGunLeft = document.body.clientHeight - gunLeft.clientHeight;
let xGunRight = document.body.clientWidth - gunLeft.clientWidth;
let yGunRight = document.body.clientHeight - gunLeft.clientHeight;
let points = 0;
let shots = 0;
let leftShot = true;
let rockets = {};
let timeDown = 30;
let canShot = false;
let startGame = false;

document.getElementById("timeDown").textContent = `Time: ${timeDown}`

let bgMusic = new Audio('./../audio/background_music.opus');
bgMusic.volume = 0.3;

document.body.addEventListener("click", (e) => {
  if (e.target.classList.contains("start_btn")) {
    e.target.classList.remove("start_btn")
    countdown(3);

    let waitingStartGame = setInterval(() => {
      if (startGame) {
        setTimeout(() => {
          clearInterval(waitingStartGame);
          statistic.style.display = "flex";
        }, 50);
        bgMusic.play();
        canShot = true;
        timer();
        makeRockets(500);
      }
    }, 1000);
  }
});

function timer() {
  document.getElementById("timeDown").textContent = `Time: ${timeDown}`;
  let timer = setInterval(() => {
    timeDown--;
    document.getElementById("timeDown").textContent = `Time: ${timeDown}`;
    if (timeDown === 0) {
      clearInterval(timer);
      canShot = !canShot;

    }
  }, 1000)
}


let waitingEndGame = setInterval(() => {
  if (timeDown === 0) {
    clearInterval(waitingEndGame);
    gameOver();
  }
}, 40);