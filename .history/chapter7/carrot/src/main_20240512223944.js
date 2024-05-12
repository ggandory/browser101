"use strict";

import PopUp from "./popup.js";
import Game from "./game.js";

//const field = document.querySelector(".game_field");
//const fieldRect = field.getBoundingClientRect();

const gameFinishBanner = new PopUp();
const game = new Game(5, 5, 5, 5);
game.setGameStopListener((reason) => {
  let message;
  switch (reason) {
    case "cancel":
      message = "Replay?";
      break;
    case "win":
      message = "YOU WIN!!";
      break;
    case "lose":
      message = "YOU LOSE :(";
      break;
    default:
      throw new Error("now valid reason");
  }
  gameFinishBanner.showWithText(message);
});

gameFinishBanner.setClickListener(() => {
  game.start();
});
