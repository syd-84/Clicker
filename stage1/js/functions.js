"use strict";

function distance(x1, y1, x2, y2) {
  return ((x1 - x2) ** 2 + (y1 - y2) ** 2) ** (1 / 2);
}

function getNumBetween(minNum, maxNum) {
  return minNum + Math.floor(Math.random() * (maxNum - minNum + 1));
}

document.body.addEventListener("click", (e) => {
  if (plane !== undefined) {
    if (plane.destroyed) {
      return;
    }
    let x1 = plane.xc;
    let y1 = plane.yc;
    let x2 = e.clientX;
    let y2 = e.clientY;
    let idTarget = e.target.id;

    if (plane.canShoot) {
      let laser = new laserRay(x1, y1, x2, y2);
      laser.drawLaserRay();
      let audio = new Audio('./audio/laser.wav');
      audio.volume = 0.4;
      audio.play();
      setTimeout(() => {
        document.getElementById("ray").remove();
      }, 50);
    }

    if (e.target.classList.contains("rocket")) {
      let targetXc = rockets[idTarget].xc;
      let targetYc = rockets[idTarget].yc;
      if (distance(targetXc, targetYc, x2, y2) <= rockets[idTarget].width / 2) {
        points++;
        e.target.classList.remove("rocket");
        e.target.remove();
        destroyedEvent("bang", x2, y2);
        let audio = new Audio('./audio/bang.wav');
        audio.volume = 0.5;
        audio.play();
        delete rockets[idTarget];
      }
    }
    shots++;
    let accuracy = points / shots * 100;
    document.getElementById("points").textContent = `Влучання: ${points}`;
    document.getElementById("shots").textContent = `Пострілів: ${shots}`;
    document.getElementById("accuracy").textContent = `Відсоток влучань: ${accuracy.toFixed(0)}%`;
  }
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
      letsGo.volume = 0.5;
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