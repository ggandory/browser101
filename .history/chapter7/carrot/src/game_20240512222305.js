import * as sound from "./sound.js";
import Field from "./field.js";

export default class Game {
  constructor(gameDuration, carrotCount, bugCount, monsterCount) {
    this.gameDuration = gameDuration;
    this.carrotCount = carrotCount;
    this.bugCount = bugCount;
    this.monsterCount = monsterCount;

    this.gameTimer = document.querySelector(".game_timer");
    this.gameScore = document.querySelector(".game_score");
    this.gameBtn = document.querySelector(".game_button");

    this.gameBtn.addEventListener("click", () => {
      if (this.started) {
        this.stop();
      } else {
        this.start();
      }
    });

    this.gameField = new Field(carrotCount, bugCount, monsterCount);
    this.gameField.setClickListener(this.onItemClick);

    this.started = false;
    this.score = 0;
    this.timer = undefined;
  }

  setGameStopListener(onGameStop) {
    this.onGameStop = onGameStop;
  }

  start() {
    this.started = true;
    this.initGame();
    this.showStopButton();
    this.showTimerAndScore();
    this.startGameTimer();
    sound.playBackground();
  }
  stop() {
    this.started = false;
    this.stopGameTimer();
    this.hideGameButton();
    sound.playAlert();
    sound.stopBackground();
    this.onGameStop && this.onGameStop("cancel");
  }

  finish(win) {
    this.started = false;
    this.hideGameButton();
    if (win) {
      sound.playsWin();
    } else {
      sound.playBug();
    }
    this.stopGameTimer(); // 게임 종료 시 타이머 중지
    sound.stopBackground();
    this.onGameStop && this.onGameStop(win ? "win" : "lose");
  }

  onItemClick = (item) => {
    if (!this.started) {
      return;
    }
    if (item === "carrot") {
      this.score++;
      this.updateScoreBoard();
      if (score === CARROT_COUNT) {
        this.finish(true);
      }
    } else if (item === "bug" || item === "monster") {
      this.stopGameTimer();
      this.finish(false);
    }
  };

  showStopButton() {
    const icon = gameBtn.querySelector(".fa-solid");
    icon.classList.add("fa-stop");
    icon.classList.remove("fa-play");
    this.gameBtn.style.visibility = "visible";
  }

  hideGameButton() {
    this.gameBtn.style.visibility = "hidden";
  }

  showTimerAndScore() {
    this.gameTimer.style.visibility = "visible";
    this.gameScore.style.visibility = "visible";
  }

  //이 함수 이해가 잘 안감
  startGameTimer() {
    let remainingTimeSec = GAME_DURATION_SEC;
    this.updateTimerText(remainingTimeSec);
    this.timer = setInterval(() => {
      if (remainingTimeSec <= 0) {
        clearInterval(timer);

        this.finish(this.carrotCount === score);
        return;
      }
      this.updateTimerText(--remainingTimeSec);
    }, 1000);
  }
  stopGameTimer() {
    clearInterval(timer);
  }

  updateTimerText(time) {
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    this.gameTimer.innerHTML = `${minutes}:${seconds}`;
  }

  initGame() {
    //벌레와 당근을 생성한뒤 field에 추가해준다.
    this.score = 0; // 점수 초기화
    this.gameScore.innerText = this.carrotCount;
    this.gameField.init();
  }

  updateScoreBoard() {
    this.gameScore.innerText = this.carrotCount - score;
  }
}
