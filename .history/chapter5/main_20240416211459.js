const items = document.querySelector(".items");
const input = document.querySelector(".footer_input");
const addBtn = document.querySelector(".footer_button");

function onAdd() {
  //1.사용자가 입력한 텍스트를 받아옴
  const text = input.value;
  console.log(text);
  //만약 아무것도 입력이 안되면 함수를 빠져나간다.(즉 입력이 화면상에 안올라감)
  if (text === "") {
    input.focus();
    //리턴을 아무것도 안주면 함수를 빠져나와버리는거임 원래?
    return;
  }
  //2. 받아온 텍스트를 새로운 아이템을 만듬(텍스트+ 삭제 버튼)
  const item = createItem(text);

  //3. items 컨테이너 안에 새로 만든 아이템을 추가한다.
  items.appendChild(item);

  //3.5 새로 추가된 아이템으로 스크롤링
  item.scrollIntoView({ block: "center" });
  //4. 인풋을 초기화 한다.(아무것도 안뜨게)
  input.value = "";
  input.focus();
}
//다른 함수에서 선언한 변수를 다른함수에서도 그냥 가져오는게 가능한지 헷갈림(전역변수 처리되나?)
function createItem(text) {
  // const itemRow = document.createElement("li");
  // itemRow.setAttribute("class", "item_row");
  // const item = document.createElement("div");
  // item.setAttribute("class", "item");
  // const name = document.createElement("span");
  // name.setAttribute("class", "item_name");
  // name.innerText = text;

  const htmlObj = ` <li class="item_row">
  <div class="item">
    <span class="item_name">${text}</span>
    <button class="item_delete">
      <i class="fa-solid fa-trash"></i>
    </button>
  </div>
  <div class="item_divider"></div>
</li>`;

  // const deleteBtn = document.createElement("button");
  // deleteBtn.setAttribute("class", "item_delete");
  // deleteBtn.innerHTML = '<i class="fa-solid fa-trash"></i>';
  // deleteBtn.addEventListener("click", () => {
  //   items.removeChild(itemRow);
  // });

  // const itemDivider = document.createElement("div");
  // itemDivider.setAttribute("class", "item_divider");
  // //여기서 name이후로 appendChild를 하는거지? 위에 이미 있는데?createElement는 그냥 노드만 만는건가?
  // //itemRow는 왜 appendChild안하는거지? 그리고 item은 왜 deleteBtn아래에서 하는거임?
  // item.appendChild(name);
  // item.appendChild(deleteBtn);

  // itemRow.appendChild(item);
  // itemRow.appendChild(itemDivider);
  //이거는 왜 리턴함?
  return htmlObj;
}
//버튼을 눌러서 추가를 한다.
addBtn.addEventListener("click", () => {
  onAdd();
});
//엔터를 눌러서 추가를 한다.
input.addEventListener("keypress", (event) => {
  if (event.key === "Enter") {
    onAdd();
  }
});
