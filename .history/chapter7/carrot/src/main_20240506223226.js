"use strict";

import PopUp from "./popup.js";
import Field from "./field.js";
import * as sound from "./sound.js";

const CARROT_COUNT = 10;
const BUG_COUNT = 10;
const MONSTER_COUNT = 10;
const GAME_DURATION_SEC = 10;

const field = document.querySelector(".game_field");
const fieldRect = field.getBoundingClientRect();
const gameBtn = document.querySelector(".game_button");
const gameTimer = document.querySelector(".game_timer");
const gameScore = document.querySelector(".game_score");

let started = false;
let score = 0;
let timer = undefined;

const gameFinishBanner = new PopUp();
gameFinishBanner.setClickListener(() => {
  startGame();
});

const gameField = new Field(CARROT_COUNT, BUG_COUNT, MONSTER_COUNT);
gameField.setClickListener((item) => onItemClick);

function onItemClick(item) {
  if (!started) {
    return;
  }
  if (item === "carrot") {
    score++;
    updateScoreBoard();
    if (score === CARROT_COUNT) {
      finishGame(true);
    }
  } else if (item === "bug" || item === "monster") {
    stopGameTimer();
    finishGame(false);
  }
}

gameBtn.addEventListener("click", () => {
  if (started) {
    stopGame();
  } else {
    startGame();
  }
});

function startGame() {
  if (started) {
    return; // 이미 게임이 시작 중인 경우 더 이상 진행하지 않음
  }
  started = true;
  initGame();
  showStopButton();
  showTimerAndScore();
  startGameTimer();
  sound.playBackground();
}
function stopGame() {
  started = false;
  stopGameTimer();
  hideGameButton();
  gameFinishBanner.showWithText("REPLAY?");
  sound.playAlert();
  sound.stopBackground();
}
function finishGame(win) {
  started = false;
  stopGameTimer(); // 게임 종료 시 타이머 중지
  hideGameButton();
  if (win) {
    sound.playsWin();
  } else {
    sound.playBug();
  }
  sound.stopBackground();
  gameFinishBanner.showWithText(win ? "YOU WON!" : "YOU LOST :(");
  if (!win) {
    initGame();
  } // 게임 종료 후 필드 초기화
}

function showStopButton() {
  const icon = gameBtn.querySelector(".fa-solid");
  icon.classList.add("fa-stop");
  icon.classList.remove("fa-play");
  gameBtn.style.visibility = "visible";
}

function hideGameButton() {
  gameBtn.style.visibility = "hidden";
}

function showTimerAndScore() {
  gameTimer.style.visibility = "visible";
  gameScore.style.visibility = "visible";
}

//이 함수 이해가 잘 안감
function startGameTimer() {
  let remainingTimeSec = GAME_DURATION_SEC;
  updateTimerText(remainingTimeSec);
  timer = setInterval(() => {
    if (remainingTimeSec <= 0) {
      clearInterval(timer);
      //이게 왜 you lost로 뜨는지 이해가 안감
      finishGame(CARROT_COUNT === score);
      return;
    }
    updateTimerText(--remainingTimeSec);
  }, 1000);
}
//게임이 성공으로 끝났는데 왜 시간이 끝나고 나서 다시 애들이 자발적으로 재생성 되지 않도록 할려면 어떻게 해야할지

function stopGameTimer() {
  clearInterval(timer);
}

function updateTimerText(time) {
  const minutes = Math.floor(time / 60);
  const seconds = time % 60;
  gameTimer.innerHTML = `${minutes}:${seconds}`;
}

function initGame() {
  //벌레와 당근을 생성한뒤 field에 추가해준다.
  score = 0; // 점수 초기화
  gameScore.innerText = CARROT_COUNT;
  gameField.init();
}

function updateScoreBoard() {
  gameScore.innerText = CARROT_COUNT - score;
}
