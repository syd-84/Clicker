"use strict";

class CoordinateSystem {
  width = document.body.clientWidth;
  height = document.body.clientHeight;
  x0 = this.width / 2;
  y0 = this.height / 2;
}

let coordinateSystem = new CoordinateSystem();

class Plane {

  plane_box = document.getElementById("plane_box");
  plane = document.getElementById("plane");
  width = plane_box.clientWidth;
  height = plane_box.clientHeight;
  destroyed = false;
  xc = 0;
  yc = 0;
  hp = 100;

  fly() {
    let x0 = coordinateSystem.x0 - this.width / 2;
    let y0 = coordinateSystem.y0 - this.height / 2;
    let amplitudeX = coordinateSystem.x0 - 2 * this.width;
    let amplitudeY = coordinateSystem.y0 - 2 * this.height;
    let amplitude = Math.min(amplitudeX, amplitudeY);
    let count = 0;
    let timePlane = setInterval(() => {
      if (this.crash()) {
        clearInterval(timePlane);
        return;
      };
      this.hpLine();
      const dx = amplitude * Math.sin(2 * count * Math.PI / 180);
      const dy = amplitude * Math.cos(3 * count * Math.PI / 180);
      const ddx = amplitude * Math.sin(2 * (count + 1) * Math.PI / 180);
      const ddy = amplitude * Math.cos(3 * (count + 1) * Math.PI / 180);

      this.xc = coordinateSystem.x0 + dx;
      this.yc = coordinateSystem.y0 + dy;

      plane_box.style.left = x0 + dx + "px";
      plane_box.style.top = y0 + dy + "px";

      let angle = Math.atan2(ddy - dy, ddx - dx);

      this.plane.style.transform = `rotate(${angle}rad)`;
      count++;
    }, 40);
  }

  crash() {
    if (this.hp <= 0) {
      this.destroyed = true;
      plane_box.remove();
      destroyedEvent("boom", this.xc, this.yc);
      document.body.style.cursor = "default";
      let audio = new Audio('./audio/crash.wav');
      audio.volume = 0.3;
      audio.play();

      let count = 0;
      for (const key in rockets) {
        count++;
        setTimeout(() => {
          let element = document.getElementById(rockets[key].id);
          element.style.transform = "rotate(0deg)";
          element.classList.add("bang");
          let audio = new Audio('./audio/bang.wav');
          audio.volume = 0.3;
          audio.play();
          setTimeout(() => {
            delete rockets[key];
            element.remove();
          }, 1000);
        }, count * 300);
      }

      setTimeout(() => {
        bgMusic.pause()
      }, 2000)
      return true;
    }
  }

  hpLine() {
    document.getElementById("hp_line").style.width = `${this.hp}%`;
  }
}

