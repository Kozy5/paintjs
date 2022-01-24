const canvasParent = document.querySelector("canvas");
const canvas = document.querySelector("#jsCanvas");
const ctx = canvas.getContext("2d");
const colors = document.getElementsByClassName("jsColors");
const brush = document.querySelector(".controls_range input");
const brushInitial = document.querySelector("#brush-initial");
const mode = document.querySelector("#jsMode");
const save = document.querySelector("#jsSave");
const eraser = document.querySelector("#eraser");
const BRUSH_DEFAULT = 2.5;
const INITIAL_COLOR = "#2c2c2c";
//기본값 설정
ctx.fillStyle = "white";
ctx.fillRect(0, 0, canvasParent.clientWidth, canvasParent.clientHeight);
ctx.strokeStyle = INITIAL_COLOR;
ctx.fillStyle = INITIAL_COLOR;
ctx.lineWidth = BRUSH_DEFAULT;
canvas.width = canvasParent.clientWidth;
canvas.height = canvasParent.clientHeight;

let painting = false;
let filling = false;
//모두지우기
function allErase() {
  ctx.fillStyle = "white";
  ctx.fillRect(0, 0, canvasParent.clientWidth, canvasParent.clientHeight);
}
eraser.addEventListener("click", allErase);
// 페인팅
function stopPainting() {
  painting = false;
}
function startPainting() {
  painting = true;
}
//캔버스 마우스움직임
function handleMouseMove(event) {
  const x = event.offsetX;
  const y = event.offsetY;
  //패스시작지점,좌표값할당 팔로우,
  // 페인팅시작시 라인그릴좌표 그리는방식 스트로크(일반붓)
  if (!painting) {
    ctx.beginPath();
    ctx.moveTo(x, y);
  } else {
    ctx.lineTo(x, y);
    ctx.stroke();
  }
}

function onTouchStart(event) {
  const x = event.offsetX;
  const y = event.offsetY;
  ctx.beginPath();
  ctx.moveTo(x, y);
  painting = true;
}

function onTouchMove(event) {
  const x = event.offsetX;
  const y = event.offsetY;
  if (painting) {
    ctx.lineTo(x, y);
    ctx.stroke();
  }
}
function onTouchEnd() {
  if (painting) {
    onTouchMove();
    painting = false;
  }
}
//컬러체인지
function handleClickColor(event) {
  const color = event.target.style.backgroundColor;
  ctx.strokeStyle = color;
  ctx.fillStyle = color;
}
//html 컬러파트 Array화
Array.from(colors).forEach((item) =>
  item.addEventListener("click", handleClickColor)
);
// 브러쉬 크기조절
function brushControl() {
  const value = brush.value;
  ctx.lineWidth = value;
}
//채우기모드(전체채우기)
function handleCanvasClick() {
  if (filling) {
    ctx.fillRect(0, 0, canvasParent.clientWidth, canvasParent.clientHeight);
  }
}
// 채우기,일반 변환
function handleMode() {
  if (filling === false) {
    filling = true;
    mode.innerText = "채우기중..";
    canvas.addEventListener("click", handleCanvasClick);
  } else if (filling === true) {
    filling = false;
    mode.innerText = "일반모드";
  }
}
mode.addEventListener("click", handleMode);
// 캔버스 우클릭 막기
function handleCM(event) {
  event.preventDefault();
}
// 저장버튼으로 저장하기
function handleSave() {
  const image = canvas.toDataURL("image/jpg");
  const link = document.createElement("a");
  const saveName = prompt("저장할 파일명을 입력하세용");
  link.href = image;
  link.download = saveName;
  link.click();
}
function onBrushInitial() {
  brush.value = BRUSH_DEFAULT;
  brushControl(BRUSH_DEFAULT);
}

//파트별이벤트
if (canvas) {
  canvas.addEventListener("mousemove", handleMouseMove);
  canvas.addEventListener("mousedown", startPainting);
  canvas.addEventListener("mouseup", stopPainting);
  canvas.addEventListener("mouseleave", stopPainting);
  canvas.addEventListener("touchstart", onTouchStart);
  canvas.addEventListener("touchmove", onTouchMove);
  canvas.addEventListener("touchend", onTouchEnd);
  canvas.addEventListener("touchleave", stopPainting);
  canvas.addEventListener("contextmenu", handleCM);
}

if (brush) {
  brush.addEventListener("input", brushControl);
}
if (save) {
  save.addEventListener("click", handleSave);
}
if (brushInitial) {
  brushInitial.addEventListener("click", onBrushInitial);
}
