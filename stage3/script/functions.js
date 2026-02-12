"use strict";

function distance(x1, y1, x2, y2) {
  return ((x1 - x2) ** 2 + (y1 - y2) ** 2) ** (1 / 2);
}

function getNumBetween(minNum, maxNum) {
  return minNum + Math.floor(Math.random() * (maxNum - minNum + 1));
}

document.body.addEventListener("click", (e) => {
  if (timeDown === 0) {
    return;
  }

  if (e.target.classList.contains("rocket")) {
    let idTarget = e.target.id;

    let targetXc = rockets[idTarget].xc;
    let targetYc = rockets[idTarget].yc;
    let x1 = e.clientX;
    let y1 = e.clientY;
    if (distance(targetXc, targetYc, x1, y1) <= rockets[idTarget].width / 2) {
      points++;
      e.target.classList.remove("rocket");
      e.target.remove();
      destroyedEvent("bang", x1, y1);
      let audio = new Audio('./../audio/bang.wav');
      audio.volume = 0.5;
      audio.play();
      delete rockets[idTarget];
    }
  }
  shots++;
  let accuracy = points / shots * 100;
  document.getElementById("points").textContent = `Hits: ${points}`;
  document.getElementById("shots").textContent = `Shots: ${shots}`;
  document.getElementById("accuracy").textContent = `Hit percentage: ${accuracy.toFixed(0)}%`;
});

document.body.addEventListener("mousemove", (e) => {
  if (e.target.classList[0] === "rocket") {
    let idTarget = e.target.id;
    let xc = rockets[idTarget].xc;
    let yc = rockets[idTarget].yc;
    let xMouse = e.clientX;
    let yMouse = e.clientY;
    if (distance(xc, yc, xMouse, yMouse) < rockets[idTarget].width) {
      e.target.classList.add("cursorRocket");
    }
  }
});

function destroyedEvent(event, x, y) {
  let element = document.createElement(event);
  element.classList.add(event);
  document.body.append(element);
  element.style.left = (x - element.clientWidth / 2) + "px";
  element.style.top = (y - element.clientHeight / 2) + "px";
  setTimeout(() => {
    element.remove();
  }, 2000);
  return;
}