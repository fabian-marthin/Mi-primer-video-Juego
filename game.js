const canvas=document.querySelector('#game');
const game=canvas.getContext('2d');
const btnUp = document.querySelector("#up");
const btnDown = document.querySelector("#down");
const btnLeft = document.querySelector("#left");
const btnRight = document.querySelector("#right");

const playerPosition = {
    x: undefined,
    y: undefined
}


window.addEventListener("keydown", teclaPresionada);
btnUp.addEventListener("click", moveUp);
btnDown.addEventListener("click", moveDown);
btnLeft.addEventListener("click", moveLeft);
btnRight.addEventListener("click", moveRight);

let canvasSize;
let elementSize;

function teclaPresionada(event){
    if(event.key == "ArrowUp") moveUp();
    else if(event.key == "ArrowDown") moveDown();
    else if(event.key == "ArrowLeft") moveLeft();
    else if(event.key == "ArrowRight") moveRight();
}

function moveUp(){
    console.log("ARRIBA");
    playerPosition.y -= canvasSize / 10;
    movePlayer();
}
function moveDown(){
    console.log("ABAJO");
    playerPosition.y += canvasSize / 10;
    movePlayer();
}
function moveLeft(){
    console.log("IZQUIERDA");
    playerPosition.x -= canvasSize / 10;
    movePlayer();
}
function moveRight(){
    console.log("DERECHA");
    playerPosition.x += canvasSize / 10;
    movePlayer();
}

function movePlayer(){
    game.fillText(emojis["PLAYER"], playerPosition.x, playerPosition.y);
}

window.addEventListener('load',setCanvasSize);
window.addEventListener("resize", setCanvasSize);

function startGame(){
    game.font = elementsSize +'px Verdana';
    game.textAlign = 'end';

    const map = maps[0];
    const mapX = map.trim().split("\n");
    const mapXCols = mapX.map(x => x.trim().split(""));

    mapXCols.forEach((row, rowI) => {
        row.forEach((col, colI) => {
          const emoji = emojis[col];
          const posX = elementsSize * (colI + 1);
          const posY = elementsSize * (rowI + 1);

          if(col == "O"){
            playerPosition.x = posX;
            playerPosition.y = posY;
            console.log({playerPosition});
          }

          game.fillText(emoji, posX, posY);
        });
      });

    game.fillText(emojis["PLAYER"], playerPosition.x, playerPosition.y);

    console.log({canvasSize,elementsSize, mapX, mapXCols});
}

function setCanvasSize(){
    if(window.innerHeight>window.innerWidth){
        canvasSize=window.innerWidth*0.8;
    }else{
        canvasSize=window.innerHeight*0.8;
    }

    canvas.setAttribute('width',canvasSize);
    canvas.setAttribute('height',canvasSize);

    elementsSize = canvasSize / 10;

    startGame();
}
