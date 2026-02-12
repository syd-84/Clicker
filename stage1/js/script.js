"use strict";

let points = 0;
let shots = 0;
let plane = new Plane();
let rockets = {};
let startGame = false;

let bgMusic = new Audio('./../audio/background_music.opus');
bgMusic.volume = 0.3;
bgMusic.loop = true;

plane_box.style.opacity = 0;
statistic.style.display = "none";

document.body.addEventListener("click", (e) => {
  if (e.target.classList.contains("start_btn")) {
    e.target.classList.remove("start_btn")
    countdown(3);

    let waitingStartGame = setInterval(() => {
      if (startGame) {
        setTimeout(() => {
          clearInterval(waitingStartGame);
          plane_box.style.opacity = 1;
          statistic.style.display = "flex";
        }, 50);
        bgMusic.play();
        plane.canShoot = true;
        plane.fly();
        makeRockets(plane, 1000);
      }
    }, 1000);
  }
});

let waitingEndGame = setInterval(() => {
  if (plane.destroyed) {
    clearInterval(waitingEndGame);
    gameOver();
  }
}, 40);