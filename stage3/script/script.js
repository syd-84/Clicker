"use strict";

let gunLeft = document.getElementById("gun_left");
let gunRight = document.getElementById("gun_right");
let xGunLeft = gunLeft.clientWidth;
let yGunLeft = document.body.clientHeight - gunLeft.clientHeight;
let xGunRight = document.body.clientWidth - gunLeft.clientWidth;
let yGunRight = document.body.clientHeight - gunLeft.clientHeight;
let leftShot = true;