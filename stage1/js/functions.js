"use strict";

function distance(x1, y1, x2, y2) {
  return ((x1 - x2) ** 2 + (y1 - y2) ** 2) ** (1 / 2);
}

function getNumBetween(minNum, maxNum) {
  return minNum + Math.floor(Math.random() * (maxNum - minNum + 1));
}

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
    points++;
    e.target.classList.remove("rocket");
    e.target.remove();
  }
  shots++;
  let accuracy = points / shots * 100;
  document.getElementById("points").textContent = `Влучання: ${points}`;
  document.getElementById("shots").textContent = `Пострілів: ${shots}`;
  document.getElementById("accuracy").textContent = `Відсоток влучань: ${accuracy.toFixed(0)}%`;
})