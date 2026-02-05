"use strict";

class Rocket {
  constructor(x, y, numId) {
    this.id = `rocket${numId}`;
    this.xc = x;
    this.yc = y;
    this.destroyed = false;
    let rocket = document.createElement("div");
    rocket.id = `rocket${numId}`;
    rocket.classList.add("rocket");
    rocket.style.left = this.xc + "px";
    rocket.style.top = this.yc + "px";
    document.body.append(rocket);

    this.rocketDiv = document.getElementById(this.id);
    this.width = this.rocketDiv.clientWidth;
    this.height = this.rocketDiv.clientHeight;
  }

  persecution(velocity = 1) {
    this.rocketDiv.style.left = this.xc - this.width / 2 + "px";
    this.rocketDiv.style.top = this.yc - this.height / 2 + "px";

    let timeRocket = setInterval(() => {
      if (this.clash() || plane.destroyed) {
        clearInterval(timeRocket);
      }
      let angle = Math.atan2(plane.yc - this.yc, plane.xc - this.xc);
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
    if (distance(this.xc, this.yc, plane.xc, plane.yc) <= ((plane.width + this.width) / 2) && this.rocketDiv.classList.contains("rocket")) {
      if (!this.destroyed) {
        plane.hp -= 10;
      }
      this.destroyed = true;
      this.rocketDiv.remove();
      return true;
    }
  }
}

<<<<<<< HEAD
=======
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
>>>>>>> 3001a68 (logic done for the first level)
