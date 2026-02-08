"use strict";

let points = 0;
let shots = 0;
let plane;
let rockets = {};

let bgMusic = new Audio('./audio/background_music.ogg');
bgMusic.volume = 0.3;
bgMusic.loop;

plane_box.style.opacity = 0;
statistic.style.display = "none";

document.body.addEventListener("click", (e) => {
  if (e.target.classList.contains("start_btn")) {
    e.target.classList.remove("start_btn")
    let countDown = document.getElementById("count_down")
    let count = 3;
    countDown.textContent = count;
    let idInterval = setInterval(() => {
      count--;
      if (count === 0) {
        clearInterval(idInterval);
        countDown.textContent = "GO";
      } else {
        countDown.textContent = count;
      }
    }, 1000);

    setTimeout(() => {
      countDown.remove();
    }, 4000);

    setTimeout(() => {
      setTimeout(() => {
        plane_box.style.opacity = 1;
        statistic.style.display = "flex";
      }, 50);
      bgMusic.play();
      plane = new Plane();
      plane.fly();
      makeRockets(1000);
    }, 4500);

  }
})

