const myAudio = document.getElementById("ad");
let audiosPlay = [];
const audioPlay2 = document.getElementById("play2");
const click = document.getElementById("click");

const btnsTag = document.getElementsByTagName("BUTTON");
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

for (let i = 0; i < btnsTag.length; i++) {
  audiosPlay.push(new Audio("./audio/47313572-ui-sounds-pack-3-16-359726.mp3"));
  btnsTag[i].addEventListener("mouseover", () => {
    audiosPlay[i].play();
  });
  btnsTag[i].addEventListener("click", () => {
    click.play();
  });
}

btnsTag[0].addEventListener("click", () => {
  setTimeout(() => {
    window.location.href = 'index2.html'
  }, 500)
});

document.addEventListener("keydown", function (e) {
  if (e.key === "Escape") {
    this.body.style.display = "none";
  }
});