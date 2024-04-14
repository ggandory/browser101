const items = document.querySelector(".items");
const input = document.querySelector(".footer_input");
const addBtn = document.querySelector(".footer_button");

function onAdd() {
  //1.사용자가 입력한 텍스트를 받아옴
  const text = input.value;
  console.log(text);
  //2. 받아온 텍스트를 새로운 아이템을 만듬(텍스트+ 삭제 버튼)
  const item = createItem(text);

  //3. items 컨테이너 안에 새로 만든 아이템을 추가한다.
  items.appendChild(item);
  //4. 인풋을 초기화 한다.(아무것도 안뜨게)
  input.value = "";
  input.focus();
}

function createItem(text) {
  const itemRow = document.createElement("li");
  itemRow.setAttribute("class", "item_row");
  const item = document.createElement("div");
  item.setAttribute("class", "item");
  const name = document.createElement("span");
  name.setAttribute("class", "item_name");
  name.innerText = text;

  const deleteBtn = document.createElement("button");
  deleteBtn.setAttribute("class", "item_delete");
  deleteBtn.innerHTML = '<i class="fa-solid fa-trash"></i>';
  deleteBtn.addEventListener("click", () => {
    item.removeChild(itemRow);
  });

  const itemDivider = document.createElement("div");
  itemDivider.setAttribute("class", "item_divider");

  item.appendChild(name);
  item.appendChild(deleteBtn);

  itemRow.appendChild(item);
  itemRow.appendChild(itemDivider);
  return itemRow;
}

addBtn.addEventListener("click", () => {
  onAdd();
});
