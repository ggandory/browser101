"use strict";
import * as sound from "./sound.js";
const carrotSound = new Audio("./sound/carrot_pull.mp3");
const CARROT_SIZE = 80;

export default class Field {
  constructor(carrotCount, bugCount, monsterCount) {
    this.carrotCount = carrotCount;
    this.bugCount = bugCount;
    this.monsterCount = monsterCount;
    this.field = document.querySelector(".game_field");
    this.fieldRect = this.field.getBoundingClientRect();
    //this.onClick = this.onClick.bind(this);
    //이해가 잘 안가네 이부분
    this.field.addEventListener("click", (event) => this.onClick(event));
  }
  init() {
    field.innerHTML = ""; // 필드 초기화
    this._addItem("monster", this.monsterCount, "img/monster.png");
    this._addItem("bug", this.bugCount, "img/bug.png");
    this._addItem("carrot", this.carrotCount, "img/carrot.png");
  }

  setClickListener(onItemClick) {
    this.onItemClick = onItemClick;
  }

  _addItem(className, count, imgPath) {
    const x1 = 0;
    const y1 = 0;
    const x2 = this.fieldRect.width - CARROT_SIZE;
    const y2 = this.fieldRect.height - CARROT_SIZE;
    for (let i = 0; i < count; i++) {
      const item = document.createElement("img");
      item.setAttribute("class", className);
      item.setAttribute("src", imgPath);
      item.style.position = "absolute"; //근데 왜 이걸 absolute로 잡은거지?
      const x = randomNumber(x1, x2);
      const y = randomNumber(y1, y2);
      item.style.left = `${x}px`;
      item.style.top = `${y}px`;
      this.field.appendChild(item);
    }
  }
  onClick(event) {
    const target = event.target;
    if (target.matches(".carrot")) {
      target.remove();
      sound.playCarrot();
      this.onItemClick && this.onItemClick("carrot");
    } else if (target.matches(".bug") || target.matches(".monster")) {
      this.onItemClick && this.onItemClick("bug", "monster");
    }
  }
}

function randomNumber(min, max) {
  return Math.random() * (max - min) + min;
}
