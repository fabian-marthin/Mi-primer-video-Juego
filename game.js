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

const gifPosition = {
    x: undefined,
    y: undefined
}



window.addEventListener("keydown", teclaPresionada);
btnUp.addEventListener("click", moveUp);
btnDown.addEventListener("click", moveDown);
btnLeft.addEventListener("click", moveLeft);
btnRight.addEventListener("click", moveRight);

let canvasSize;
let elementsSize = canvasSize / 10;

function teclaPresionada(event){
    elementsSize
    if(event.key == "ArrowUp") moveUp();
    else if(event.key == "ArrowDown") moveDown();
    else if(event.key == "ArrowLeft") moveLeft();
    else if(event.key == "ArrowRight") moveRight();
}

function moveUp() {
    console.log('Me quiero mover hacia arriba');
  
    if ((playerPosition.y - elementsSize) < elementsSize -1) {
      console.log('OUT');
    } else {
      playerPosition.y -= elementsSize;
      startGame();
    }
  }
  function moveLeft() {
    console.log('Me quiero mover hacia izquierda');
  
    if ((playerPosition.x - elementsSize) <= elementsSize -1) {
      console.log('OUT');
    } else {
      playerPosition.x -= elementsSize;
      startGame();
    }
  }
  function moveRight() {
    console.log('Me quiero mover hacia derecha');
  
    if ((playerPosition.x + elementsSize) >= canvasSize +1) {
      console.log('OUT');
    } else {
      playerPosition.x += elementsSize;
      startGame();
    }
  }
  function moveDown() {
    console.log('Me quiero mover hacia abajo');
    
    if ((playerPosition.y + elementsSize) > canvasSize +1) {
      console.log('OUT');
    } else {
      playerPosition.y += elementsSize;
      startGame();
    }
  }

window.addEventListener('load',setCanvasSize);
window.addEventListener("resize", setCanvasSize);

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

function startGame(){
    game.font = elementsSize +'px Verdana';
    game.textAlign = 'end';

    const map = maps[0];
    const mapX = map.trim().split("\n");
    const mapXCols = mapX.map(x => x.trim().split(""));

    game.clearRect(0,0, canvasSize, canvasSize);
    
    mapXCols.forEach((row, rowI) => {
        row.forEach((col, colI) => {
          const emoji = emojis[col];
          const posX = elementsSize * (colI + 1);
          const posY = elementsSize * (rowI + 1);

          if(col == "O"){
            if(!playerPosition.x && !playerPosition.y){
                playerPosition.x = posX;
                playerPosition.y = posY;
                console.log({playerPosition});
            }
          }else if(col == "I"){
            gifPosition.x = posX;
            gifPosition.y = posY;
          }

          game.fillText(emoji, posX, posY);
        });
      });
    
    game.fillText(emojis["PLAYER"], playerPosition.x, playerPosition.y);

    movePlayer();
}

function movePlayer(){
    const gifColisionX = gifPosition.x == gifPosition.x;
    const gifColisionY = gifPosition.y == gifPosition.y;
    const gifColision = gifColisionX && gifColisionY;

    if (gifColision){
        console.log("subiste de nivel");
    }

    game.fillText(emojis["PLAYER"], playerPosition.x, playerPosition.y);
}

