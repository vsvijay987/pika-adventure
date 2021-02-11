import 'core-js/stable';
import 'regenerator-runtime/runtime';

import gameOverAudio from './gameover.mp3';
import audioMusic from './music.mp3';

var score = 0;
let cross = true;

var audiogo = new Audio(gameOverAudio);
var audio = new Audio(audioMusic);

setTimeout(() => {
  audio.play();
}, 1000);

document.onkeydown = function (e) {
  console.log("Key code is: ", e.keyCode);
  if (e.keyCode == 38) {
    let pika = document.querySelector(".pika");
    pika.classList.add("animatePika");
    setTimeout(() => {
      pika.classList.remove("animatePika");
    }, 1000);
  }

  if (e.keyCode == 39) {
    let pika = document.querySelector(".pika");
    let px = parseInt(window.getComputedStyle(pika, null).getPropertyValue("left"));
    pika.style.left = px + 100 + "px";
  }

  if (e.keyCode == 37) {
    let pika = document.querySelector(".pika");
    let px = parseInt(window.getComputedStyle(pika, null).getPropertyValue("left"));
    pika.style.left = px - 100 + "px";
  }
};

setInterval(() => {
  let pika = document.querySelector(".pika");
  let gameOver = document.querySelector(".gameOver");
  let obstacle = document.querySelector(".obstacle");
  let px = parseInt(window.getComputedStyle(pika, null).getPropertyValue("left"));
  let py = parseInt(window.getComputedStyle(pika, null).getPropertyValue("top"));
  let ox = parseInt(
    window.getComputedStyle(obstacle, null).getPropertyValue("left")
  );
  let oy = parseInt(
    window.getComputedStyle(obstacle, null).getPropertyValue("top")
  );

  let offsetX = Math.abs(px - ox);
  let offsetY = Math.abs(py - oy);
  //   console.log(offsetX, offsetY);

  if (offsetX < 110 && offsetY < 60) {
    gameOver.innerHTML = "Game Over - Reload to start again";
    obstacle.classList.remove("obstacleAni");

    audiogo.play();
    setTimeout(() => {
      audiogo.pause();
      audio.pause();
    }, 1000);
  } else if (offsetX < 140 && cross) {
    score += 1;
    updateScore(score);
    cross = false;
    setTimeout(() => {
      cross = true;
    }, 1000);

    setTimeout(() => {
      let aniDur = parseFloat(
        window
          .getComputedStyle(obstacle, null)
          .getPropertyValue("animation-duration")
      );
      let newDur = aniDur - 0.1;
      //   console.log("New animation duration: " + newDur);
      obstacle.style.animationDuration = newDur + "s";
    }, 500);
  }
}, 10);

function updateScore(score) {
  document.querySelector("#scoreCont").innerHTML = "Your score: " + score;
}
