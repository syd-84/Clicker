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

document.getElementById("timeDown").textContent = `Time: ${timeDown}`;
let timer = setInterval(() => {
  timeDown--;
  document.getElementById("timeDown").textContent = `Time: ${timeDown}`;
  if (timeDown === 0) {
    clearInterval(timer)
  }
}, 1000)

makeRockets(500);