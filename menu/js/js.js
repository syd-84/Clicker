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
    e.target.textContent = "WELCOME TO THE GAME";
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
    window.location.href = './stage1/stage_1.html'
  }, 500)
});

btnsTag[1].addEventListener("click", () => {
  setTimeout(() => {
    window.location.href = './stage2/stage.index.html'
  }, 500)
});

btnsTag[2].addEventListener("click", () => {
  setTimeout(() => {
    window.location.href = './stage3/stage_3.html'
  }, 500)
});

btnsTag[3].addEventListener("click", function () {
  setTimeout(() => {
    document.body.innerHTML = `<div class="welcome" style="cursor: default;">GOODBYE</div>`;
  }, 500)
});