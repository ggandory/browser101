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
let id = 0; //UUID
function createItem(text) {
  const itemRow = document.createElement("li");
  itemRow.setAttribute("class", "item_row");
  itemRow.setAttribute("data-id", id);
  itemRow.innerHTML = `
      <div class="item">
      <span class="item_name">${text}</span>
      <button class="item_delete">
      <i class="fa-solid fa-trash" data-id=${id}></i>
      </button>
      </div>
      <div class="item_divider"></div>
  `;
  id++;
  return itemRow;
}
//버튼을 눌러서 추가를 한다.
addBtn.addEventListener("click", () => {
  onAdd();
});
//엔터를 눌러서 추가를 한다.
//keydown은 눌리는순간 적용, keyup은 눌르고 떼면 적용
input.addEventListener("keyup", (event) => {
  if (event.key === "Enter") {
    onAdd();
  }
});

items.addEventListener("click", (event) => {
  const id = event.target.dataset.id;
  //이렇게 표현하면 그냥 id가 존재하면 실행하겠다 이런건가?
  if (id) {
    const toBeDeleted = document.querySelector(`.item_row[data-id="${id}"]`);
    toBeDeleted.remove();
  }
});
