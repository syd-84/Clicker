"use strict";

let points = 0;
let shots = 0;
let rockets = {};
let bgMusic = new Audio('./audio/background_music.ogg');

document.body.addEventListener("click", () => {
  bgMusic.volume = 0.1;
  bgMusic.play();
}, {
  once: true
})

let plane = new Plane();
plane.fly();

makeRockets(1000);
