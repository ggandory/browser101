"use strict";
import * as sound from "./sound.js";
const CARROT_SIZE = 80;

export default class Field {
  constructor(carrotCount, bugCount, monsterCount) {
    this.carrotCount = carrotCount;
    this.bugCount = bugCount;
    this.monsterCount = monsterCount;
    this.field = document.querySelector(".game_field");
    this.fieldRect = this.field.getBoundingClientRect();
    //this.onClick = this.onClick.bind(this);  이걸 쓰거나 this바인딩 처리할 때 밑에꺼처럼 애로우 펑션처리한다 이벤트로
    this.field.addEventListener("click", (event) => this.onClick(event));
  }
  init() {
    this.field.innerHTML = ""; // 필드 초기화
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
  //onClick = event =>{}이렇게 처리해도 됨
  onClick(event) {
    const target = event.target;
    if (target.matches(".carrot")) {
      target.remove();
      sound.playCarrot();
      this.onItemClick && this.onItemClick("carrot");
    } else if (target.matches(".bug")) {
      target.remove();
      sound.playBug();
      this.onItemClick && this.onItemClick("bug");
    } else if (target.matches(".monster")) {
      target.remove();
      sound.playBug(); // 이 부분에서 임시로 playBug() 함수를 호출하도록 설정했습니다. 실제로는 playMonster() 등의 함수를 사용하셔야 합니다.
      this.onItemClick && this.onItemClick("monster");
    }
  }
}

function randomNumber(min, max) {
  return Math.random() * (max - min) + min;
}
