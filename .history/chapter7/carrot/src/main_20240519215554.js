"use strict";

import PopUp from "./popup.js";
import { GameBuilder, Reason } from "./game.js";

//const field = document.querySelector(".game_field");
//const fieldRect = field.getBoundingClientRect();

const gameFinishBanner = new PopUp();
const game = new GameBuilder()
  .gameDuration(10)
  .carrotCount(10)
  .bugCount(10)
  .monsterCount(10)
  .build();

game.setGameStopListener((reason) => {
  let message;
  switch (reason) {
    case Reason.cancel:
      message = "Replay?";
      break;
    case Reason.win:
      message = "YOU WIN!!";
      break;
    case Reason.lose:
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
