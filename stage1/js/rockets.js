"use strict";

class Rocket {
  constructor(x, y, numId, target) {
    let size = 0.1 * Math.min(coordinateSystem.width, coordinateSystem.height);
    this.id = `rocket${numId}`;
    this.xc = x;
    this.yc = y;
    this.target = target;
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

  persecution(velocity = 1) {
    this.rocketDiv.style.left = this.xc - this.width / 2 + "px";
    this.rocketDiv.style.top = this.yc - this.height / 2 + "px";

    let timeRocket = setInterval(() => {
      if (this.clash() || this.target.destroyed || rockets[this.rocketDiv.id] === undefined) {
        this.rocketDiv.style.cursor = "default";
        clearInterval(timeRocket);
        return;
      }
      let angle = Math.atan2(this.target.yc - this.yc, this.target.xc - this.xc);
      this.rocketDiv.style.transform = `rotate(${angle}rad)`;
      let dx = velocity * Math.cos(angle);
      let dy = velocity * Math.sin(angle);
      this.xc += dx;
      this.yc += dy;
      this.rocketDiv.style.left = this.xc - this.width / 2 + "px";
      this.rocketDiv.style.top = this.yc - this.height / 2 + "px";
    }, 40)
  }

  clash() {
    if (distance(this.xc, this.yc, this.target.xc, this.target.yc) < ((this.target.width + this.width) / 2)) {
      destroyedEvent("clash", this.xc, this.yc)
      this.target.hp -= 10;
      this.rocketDiv.remove();
      delete rockets[this.rocketDiv.id];
      let audio = new Audio('./../audio/clash.wav');
      audio.volume = 0.2;
      audio.play();
      return true;
    }
  }
}

function makeRockets(target, time) {
  let xc;
  let yc;
  let count = 0;
  let velocity = 1;

  let timerMakeRockets = setInterval(() => {
    if (target.destroyed) {
      clearInterval(timerMakeRockets);
      return;
    }
    if (count % 5 === 0) {
      velocity += 1;
    }
    xc = getNumBetween(50, coordinateSystem.width - 50);
    yc = getNumBetween(50, coordinateSystem.height - 50);
    rockets[`rocket${count}`] = new Rocket(xc, yc, count, target);
    rockets[`rocket${count}`].persecution(velocity);
    count++;
  }, time);
}