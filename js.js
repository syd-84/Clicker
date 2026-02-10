const myAudio = document.getElementById("ad");
const audioPlay = document.getElementById("play1");
const audioPlay2 = document.getElementById("play2");
const click = document.getElementById("click");

const btn = document.getElementById("play");
const btn2 = document.getElementById("exit");
const btns = document.getElementById("btns");
btns.tabIndex = 0;

document.body.addEventListener(
  "keydown",
  function (e) {
    if (e.key === "Enter") {
      myAudio.play();
      this.classList.add("styles");
    }
  },
  { once: true },
);

btn.addEventListener("mouseover", () => {
  audioPlay.play();
});
btn2.addEventListener("mouseover", () => {
  audioPlay.play();
});

btn.addEventListener("click", () => {
  click.play();
});
btn2.addEventListener("click", () => {
  click.play();
});

document.addEventListener("keydown", function (e) {
  if (e.key === "Escape") {
    this.body.style.display = "none";
  }
});
