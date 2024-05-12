"use strict";

import PopUp from "./popup.js";
import Field from "./field.js";
import * as sound from "./sound.js";

const CARROT_COUNT = 10;
const BUG_COUNT = 10;
const MONSTER_COUNT = 10;
const GAME_DURATION_SEC = 10;

//const field = document.querySelector(".game_field");
//const fieldRect = field.getBoundingClientRect();

const gameFinishBanner = new PopUp();
gameFinishBanner.setClickListener(() => {
  startGame();
});
