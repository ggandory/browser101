"use strict";

import PopUp from "./popup.js";
import Game from "./game.js";

//const field = document.querySelector(".game_field");
//const fieldRect = field.getBoundingClientRect();

const gameFinishBanner = new PopUp();
gameFinishBanner.setClickListener(() => {
  startGame();
});

const game = new Game(20, 20, 20, 20);

game.setGameStopListener((reason) => {});
