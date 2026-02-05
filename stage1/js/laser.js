"use strict";

class laserRay {
  constructor(x1, y1, x2, y2) {
    this.x1 = x1;
    this.y1 = y1;
    this.x2 = x2;
    this.y2 = y2;

    this.length = distance(x1, y1, x2, y2);
    this.angle = Math.atan2(y2 - y1, x2 - x1);
  }

  drawLaserRay() {
    let ray = document.createElement("div");
    ray.id = "ray";
    ray.style.left = this.x1 - this.length / 2 * (1 - Math.cos(this.angle)) + "px";
    ray.style.top = (this.y1) + this.length / 2 * Math.sin(this.angle) + "px";
    ray.style.width = this.length + "px";
    ray.style.transform = `rotate(${this.angle}rad) `;
    document.body.append(ray);
  }
}