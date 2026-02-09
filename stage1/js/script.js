"use strict";

let points = 0;
let shots = 0;
let plane;
let rockets = {};
let startGame = false;

let bgMusic = new Audio('./audio/background_music.opus');
bgMusic.volume = 0.3;
bgMusic.loop;

plane_box.style.opacity = 0;
statistic.style.display = "none";

function countVoice(num) {
  let audio = new Audio("./audio/count.mp3");
  audio.currentTime = num - 1;
  audio.play();
  setTimeout(() => {
    audio.pause();
  }, 900)
}

function countdown(numSeconds) {
  let countDown = document.getElementById("count_down")
  let count = numSeconds;
  countDown.textContent = count;
  countVoice(count);
  let idInterval = setInterval(() => {
    count--;
    if (count === 0) {
      clearInterval(idInterval);
      countDown.textContent = "GO";
      let letsGo = new Audio("./audio/letsGo.mp3");
      letsGo.play();
      setTimeout(() => {
        countDown.remove();
        startGame = true;
        return;
      }, 1000);
    } else {
      countDown.textContent = count;
      countVoice(count);
    };
  }, 1000);
};

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
        plane = new Plane();
        plane.fly();
        makeRockets(plane, 1000);
      }
    }, 1000);
  }
})
