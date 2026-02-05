"use strict";

function distance(x1, y1, x2, y2) {
  return ((x1 - x2) ** 2 + (y1 - y2) ** 2) ** (1 / 2);
}

function getNumBetween(minNum, maxNum) {
  return minNum + Math.floor(Math.random() * (maxNum - minNum + 1));
}

<<<<<<< HEAD
function makeRockets(time) {
  let rockets = [];
  let xc;
  let yc;
  let count = 0;
  let velocity = 1;

  let timerMakeRockets = setInterval(() => {
    if (plane.destroyed) {
      clearInterval(timerMakeRockets);
      return;
    }
    if (count % 5 === 0) {
      velocity += 1;
    }
    xc = getNumBetween(50, coordinateSystem.width - 50);
    yc = getNumBetween(50, coordinateSystem.height - 50);
    rockets[count] = new Rocket(xc, yc, count);
    rockets[count].persecution(velocity);
    count++;
  }, time);
}

=======
>>>>>>> 3001a68 (logic done for the first level)
document.body.addEventListener("click", (e) => {
  if (plane.destroyed) {
    return;
  }
  let x1 = plane.xc;
  let y1 = plane.yc;
  let x2 = e.clientX;
  let y2 = e.clientY;

  let laser = new laserRay(x1, y1, x2, y2);
  laser.drawLaserRay();
  setTimeout(() => {
    document.getElementById("ray").remove();
  }, 50);

  if (e.target.classList.contains("rocket")) {
    e.target.destroyed = true;
    console.log(e.target);
    points++;
    document.getElementById("points").textContent = `points: ${points}`
    e.target.classList.remove("rocket");
    e.target.remove();
  }
})