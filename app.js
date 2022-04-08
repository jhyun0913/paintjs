
const canvas = document.getElementById("jsCanvas");
const ctx = canvas.getContext("2d");
const colors = document.getElementsByClassName("jsColor");
const range = document.getElementById("jsRange");
const mode = document.getElementById("jsMode");
const saveBtn = document.getElementById("jsSave");

//컬러 기본값
const INITIAL_COLOR="#2c2c2c";
//canvas 사이즈
const CANVAS_SIZE = 700;


//canvas 사이즈 설정
canvas.width = CANVAS_SIZE;
canvas.height = CANVAS_SIZE;

//기본 배경색 흰색설정
ctx.fillStyle="white";
ctx.fillRect(0,0,canvas.width,canvas.height)

//선 색깔
ctx.strokeStyle = INITIAL_COLOR;
//fill 색상
ctx.fillStyle = INITIAL_COLOR;
//선 굵기
ctx.lineWidth = 2.5;


//선 그리기 조건 초기값
let painting = false;
//버튼 초기값
let filling = false;

function stopPainting() {
  painting = false;
}

function startPainting() {
  painting = true;
}

function onMouseMove(event) {
  const x = event.offsetX;
  const y = event.offsetY;
  if (!painting) {
    ctx.beginPath();    //선 시작점
    ctx.moveTo(x, y);
  } else {//마우스 클릭 상태
    ctx.lineTo(x, y);   //beginPath(x,y)부터 현재 lineTo(x, y) 선을 저장 그 후 lineTo(x, y)선을 저장
    ctx.stroke();       //ctx에 저장된 선을 그린다.
  }
}



function handleColorClick(event) {
   const color = event.target.style.backgroundColor; 
   ctx.strokeStyle = color;
   ctx.fillStyle = color;
}

function handleRangeChange(event){
    const size = event.target.value;
    ctx.lineWidth = size;
}

function handleModeClick() {
  if (filling === true) {
    filling = false;
    mode.innerText = "Fill";
  } else {
    filling = true;
    mode.innerText = "Paint";
  }
}

function handleCanvasClick(){
    if(filling){
        ctx.fillRect(0,0,canvas.width,canvas.height)
    }
}

//우클릭시 메뉴 생성 끄기
function handleCM(event){
    event.preventDefault();
}

function handleSaveClick(){
    const image = canvas.toDataURL();
    const link = document.createElement("a");
    link.href = image;
    link.download = "PaintJS[🎨]"; //win+. 이모티콘 단축키
    //console.log(link);
    link.click();

}

if (canvas) {
  canvas.addEventListener("mousemove", onMouseMove);
  canvas.addEventListener("mousedown", startPainting);
  canvas.addEventListener("mouseup", stopPainting);
  canvas.addEventListener("mouseleave", stopPainting);
  canvas.addEventListener("click", handleCanvasClick);
  canvas.addEventListener("contextmenu", handleCM);
}

//색상 click시 그리는 색 체인지 
Array.from(colors).forEach(color => 
    color.addEventListener("click",handleColorClick)
);


//브러쉬 두께 범위
if(range){
    range.addEventListener("input",handleRangeChange)
}
//버튼 fill,paint 모드
if(mode){
    mode.addEventListener("click", handleModeClick)
    
}
//버튼 save
if(saveBtn){
    saveBtn.addEventListener("click", handleSaveClick)
}