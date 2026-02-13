"use strict";

class CoordinateSystem {
  width = document.body.clientWidth;
  height = document.body.clientHeight;
  x0 = this.width / 2;
  y0 = this.height / 2;
}

let coordinateSystem = new CoordinateSystem();

class Rocket {
  constructor(x, y, numId) {
    let size = 0.15 * Math.min(coordinateSystem.width, coordinateSystem.height);
    this.id = `rocket${numId}`;
    this.xc = x;
    this.yc = y;
    let rocket = document.createElement("div");
    rocket.id = this.id;
    rocket.classList.add("rocket");
    rocket.style.width = size + "px";
    rocket.style.height = size + "px";
    rocket.style.left = this.xc + "px";
    rocket.style.top = this.yc + "px";
    document.body.append(rocket);

    this.rocketDiv = document.getElementById(this.id);
    this.width = size;
    this.height = size;
  }

  move(velocity = 10) {
    this.rocketDiv.style.left = this.xc - this.width / 2 + "px";
    this.rocketDiv.style.top = this.yc - this.height / 2 + "px";

    let angle = Math.random() * 2 * Math.PI;
    this.rocketDiv.style.transform = `rotate(${angle}rad)`;
    let dx = velocity * Math.cos(angle);
    let dy = velocity * Math.sin(angle);
    let timeRocket = setInterval(() => {
      if (this.clash() || rockets[this.rocketDiv.id] === undefined) {
        this.rocketDiv.style.cursor = "default";
        clearInterval(timeRocket);
        return;
      }

      this.xc += dx;
      this.yc += dy;
      this.rocketDiv.style.left = this.xc - this.width / 2 + "px";
      this.rocketDiv.style.top = this.yc - this.height / 2 + "px";
    }, 40)
  }
  clash() {
    if (this.xc <= 0 || this.xc >= coordinateSystem.width || this.yc <= 0 || this.yc >= coordinateSystem.height) {
      this.rocketDiv.remove();
      delete rockets[this.rocketDiv.id];
      return true;
    }
  }
}

function makeRockets(time) {
  let xc;
  let yc;
  let count = 0;
  let velocity = 5;

  let timerMakeRockets = setInterval(() => {
    if (timeDown === 0) {
      clearInterval(timerMakeRockets);
      return;
    }
    if (count % 5 === 0) {
      velocity += 1;
    }
    xc = getNumBetween(50, coordinateSystem.width - 50);
    yc = getNumBetween(50, coordinateSystem.height - 50);
    rockets[`rocket${count}`] = new Rocket(xc, yc, count);
    rockets[`rocket${count}`].move(velocity);
    count++;
  }, time);
}