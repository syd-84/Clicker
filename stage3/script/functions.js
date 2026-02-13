"use strict";

function distance(x1, y1, x2, y2) {
  return ((x1 - x2) ** 2 + (y1 - y2) ** 2) ** (1 / 2);
}

function getNumBetween(minNum, maxNum) {
  return minNum + Math.floor(Math.random() * (maxNum - minNum + 1));
}

document.body.addEventListener("click", (e) => {
  if (timeDown === 0) {
    return;
  }

  if (e.target.classList.contains("rocket")) {
    let idTarget = e.target.id;

    let targetXc = rockets[idTarget].xc;
    let targetYc = rockets[idTarget].yc;
    let x1 = e.clientX;
    let y1 = e.clientY;
    if (distance(targetXc, targetYc, x1, y1) <= rockets[idTarget].width / 2) {
      points++;
      e.target.classList.remove("rocket");
      e.target.remove();
      destroyedEvent("bang", x1, y1);
      let audio = new Audio('./../audio/bang.wav');
      audio.volume = 0.5;
      audio.play();
      delete rockets[idTarget];
    }
  }
  shots++;
  let accuracy = points / shots * 100;
  document.getElementById("points").textContent = `Hits: ${points}`;
  document.getElementById("shots").textContent = `Shots: ${shots}`;
  document.getElementById("accuracy").textContent = `Hit percentage: ${accuracy.toFixed(0)}%`;
});

document.body.addEventListener("mousemove", (e) => {
  if (e.target.classList[0] === "rocket") {
    let idTarget = e.target.id;
    let xc = rockets[idTarget].xc;
    let yc = rockets[idTarget].yc;
    let xMouse = e.clientX;
    let yMouse = e.clientY;
    if (distance(xc, yc, xMouse, yMouse) < rockets[idTarget].width) {
      e.target.classList.add("cursorRocket");
    }
  }
});

function destroyedEvent(event, x, y) {
  let element = document.createElement(event);
  element.classList.add(event);
  document.body.append(element);
  element.style.left = (x - element.clientWidth / 2) + "px";
  element.style.top = (y - element.clientHeight / 2) + "px";
  setTimeout(() => {
    element.remove();
  }, 2000);
  return;
}

function countVoice(num) {
  let audio = new Audio("./../audio/count.mp3");
  audio.currentTime = num - 1;
  audio.play();
  setTimeout(() => {
    audio.pause();
  }, 900)
}

function countdown(numSeconds) {
  let countDown = document.getElementById("count_down")
  let count = numSeconds;
  countDown.textContent = count;
  countVoice(count);
  let idInterval = setInterval(() => {
    count--;
    if (count === 0) {
      clearInterval(idInterval);
      countDown.textContent = "GO";
      let letsGo = new Audio("./../audio/letsGo.mp3");
      letsGo.volume = 0.5;
      letsGo.play();
      setTimeout(() => {
        countDown.remove();
        startGame = true;
        return;
      }, 1000);
    } else {
      countDown.textContent = count;
      countVoice(count);
    };
  }, 1000);
};

function gameOver() {
  setTimeout(() => {
    let gameOver = document.createElement("div");
    gameOver.classList.add("gameOver");
    let audio = new Audio('./../audio/gameOver.mp3');
    audio.play();
    document.body.append(gameOver);
    showStatistic();
    return true;
  }, 3000);
}

function showStatistic() {
  setTimeout(() => {
    document.getElementsByClassName("gameOver")[0].remove();
    statistic.id = "statisticEndGame";
    statisticEndGame.style.display = "block";

    document.getElementById("timeDown").remove();

    if (localStorage.getItem("clickerStage3")) {
      let lastRes = localStorage.getItem("clickerStage3").split("|");
      let lastPoint = document.createElement("div")
      lastPoint.textContent = `Last Points: ${lastRes[0]}`;
      statisticEndGame.append(lastPoint);
      let lastShots = document.createElement("div")
      lastShots.textContent = `Last Shots: ${lastRes[1]}`;
      statisticEndGame.append(lastShots);
    }

    let menuEndGame = document.createElement("div");
    menuEndGame.id = "buttons";
    menuEndGame.innerHTML = `
    <button>Play again</button>
    <button>Back to main menu</button>`
    document.getElementById("wrapper").append(menuEndGame);
    menuEndGameEffects();

    let resTolocalStorage = `${points}|${shots}`;
    localStorage.setItem("clickerStage3", resTolocalStorage);
  }, 5000);
}

function menuEndGameEffects() {
  let buttonsEndGame = document.getElementById("buttons").children;
  let audiosPlay = [];
  let click = new Audio("./../audio/freesound_crunchpixstudio-click-2-384920.mp3")

  for (let i = 0; i < buttonsEndGame.length; i++) {
    audiosPlay.push(new Audio("./../audio/47313572-ui-sounds-pack-3-16-359726.mp3"));
    buttonsEndGame[i].addEventListener("mouseover", () => {
      audiosPlay[i].play();
    });
    buttonsEndGame[i].addEventListener("click", () => {
      click.play();
    });
  }

  document.getElementById("buttons").children[0].addEventListener("click", () => {
    setTimeout(() => {
      window.location.href = './stage_3.html'
    }, 500)
  })

  document.getElementById("buttons").children[1].addEventListener("click", () => {
    setTimeout(() => {
      window.location.href = '../index.html'
    }, 500)
  })

}