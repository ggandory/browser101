const vertical = document.querySelector(".vertical");
const horizontal = document.querySelector(".horizontal");
const target = document.querySelector(".target");
const tag = document.querySelector(".tag");

document.addEventListener("mousemove", (event) => {
  const x = event.clientX;
  const y = event.clientY;

  //console.log(`${x} ${y}`);

  //여기서 왜 left랑 top으로 기준을 잡은거임? 선을
  vertical.style.left = `${x}px`;
  horizontal.style.top = `${y}px`;
  target.style.left = `${x}px`;
  target.style.top = `${y}px`;
  tag.style.left = `${x}px`;
  tag.style.top = `${y}px`;
  tag.innerHTML = `${x} ${y}`;
});
