const myAudio = document.getElementById("ad");
const audioPlay = document.getElementById("play1");
const audioPlay2 = document.getElementById("play2");
const click = document.getElementById("click");

const btn = document.getElementById("play");
const btn2 = document.getElementById("exit");
const btns = document.getElementById("btns");
btns.tabIndex = 0;

document.getElementById("welcome").addEventListener(
  "click",
  function (e) {
    myAudio.play();
    document.body.classList.add("styles");
    e.target.textContent = "WELCOME TO OUR NEW GAME";
    e.target.style.cursor = "auto";
    btns.style.display = "";
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
  setTimeout(() => {
    window.location.href = 'index2.html'
  }, 1000)
});
btn2.addEventListener("click", () => {
  click.play();
});

document.addEventListener("keydown", function (e) {
  if (e.key === "Escape") {
    this.body.style.display = "none";
  }
});