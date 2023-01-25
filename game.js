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

const giftPosition = {
    x: undefined,
    y: undefined
}

let posicionesEnemigos =[];

window.addEventListener("keydown", teclaPresionada);
btnUp.addEventListener("click", moveUp);
btnDown.addEventListener("click", moveDown);
btnLeft.addEventListener("click", moveLeft);
btnRight.addEventListener("click", moveRight);

let canvasSize;
let elementsSize = canvasSize / 10;
let level = 0;

function teclaPresionada(event){
    elementsSize
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

function movePlayer(){
    game.fillText(emojis["PLAYER"], playerPosition.x, playerPosition.y);
}

function startGame() {
  game.font = elementsSize + 'px Verdana';
  game.textAlign = 'end';

  let map = maps[level];

  if(!map){
    gameWin()
  }

  const mapRows = map.trim().split('\n');
  const mapRowCols = mapRows.map(row => row.trim().split(''));
  
  posicionesEnemigos = [];
  game.clearRect(0,0,canvasSize, canvasSize);
  mapRowCols.forEach((row, rowI) => {
    row.forEach((col, colI) => {
      const emoji = emojis[col];
      const posX = elementsSize * (colI + 1);
      const posY = elementsSize * (rowI + 1);

      if (col == 'O') {
        if (!playerPosition.x && !playerPosition.y) {
          playerPosition.x = posX;
          playerPosition.y = posY;
          console.log({playerPosition});
        }
      } 
      else if (col == 'I') {
        giftPosition.x = posX;
        giftPosition.y = posY;
      } 
      else if (col == "X"){
        posicionesEnemigos.push({
          x: posX,
          y: posY
        })
      }

      
      game.fillText(emoji, posX, posY);
    });
  });

  movePlayer();
}

function movePlayer() {
  const giftPositionX = playerPosition.x.toFixed(3) == giftPosition.x.toFixed(3);
  const giftPositionY = playerPosition.y.toFixed(3) == giftPosition.y.toFixed(3);
  const giftPositionR = giftPositionX && giftPositionY;
  
  if (giftPositionR) {
    levelWin()
  }

  const enemigoColision = posicionesEnemigos.find(enemy => {
    const enemigoColisionX = enemy.x.toFixed(3) == playerPosition.x.toFixed(3);
    const enemigoColisionY = enemy.y.toFixed(3) == playerPosition.y.toFixed(3);
    return enemigoColisionX && enemigoColisionY;
  });

  if(enemigoColision){
    console.log("chocaste con un enemigo")
    }
  
  
  game.fillText(emojis['PLAYER'], playerPosition.x, playerPosition.y);
}

function levelWin(){
 level ++;
 startGame();
}

function gameWin(){
  console.log("terminas el juego");
  return;
}