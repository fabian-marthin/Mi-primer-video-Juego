const canvas = document.querySelector('#game');
const game = canvas.getContext('2d');
const btnUp = document.querySelector("#up");
const btnDown = document.querySelector("#down");
const btnLeft = document.querySelector("#left");
const btnRight = document.querySelector("#right");
const spanLives = document.querySelector("#Lives");
const spanTime = document.querySelector("#Time");
const spanRecord = document.querySelector("#Record");
const pResulatado = document.querySelector("#resultado");

const nombreDelJugador = document.querySelector("#nombreDelJUgador");

const btnReiniciar = document.querySelector("#reiniciar");
btnReiniciar.addEventListener("click", reiniciarJuego);

const btnStart = document.querySelector("#start");
btnStart.addEventListener("click", iniciarJuego);


function iniciarJuego(){
  startTime = Date.now();
  timeInterval = setInterval(showTime,100)
}

function reiniciarJuego(){
  location.reload()
}

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
let vidas = 3;

let startTime;
let timePlayer;
let timeInterval;

  function teclaPresionada(event){
    elementsSize
    elementsSize
    if(event.key == "ArrowUp") moveUp();
    else if(event.key == "ArrowDown") moveDown();
    else if(event.key == "ArrowLeft") moveLeft();
    else if(event.key == "ArrowRight") moveRight();
  }

  function moveUp() {
  
    if ((playerPosition.y - elementsSize) < elementsSize -1) {
      console.log('OUT');
    } else {
      playerPosition.y -= elementsSize;
      startGame();
    }
  }

  function moveLeft() {
  
    if ((playerPosition.x - elementsSize) <= elementsSize -1) {
      console.log('OUT');
    } else {
      playerPosition.x -= elementsSize;
      startGame();
    }
  }

  function moveRight() {
  
    if ((playerPosition.x + elementsSize) >= canvasSize +1) {
      console.log('OUT');
    } else {
      playerPosition.x += elementsSize;
      startGame();
    }
  }

  function moveDown() {
    
    if ((playerPosition.y + elementsSize) > canvasSize +1) {
      console.log('OUT');
    } else {
      playerPosition.y += elementsSize;
      startGame();
    }
  }

window.addEventListener('load', setCanvasSize);
window.addEventListener("resize", setCanvasSize);

function setCanvasSize(){
  if(window.innerHeight>window.innerWidth){
    canvasSize=window.innerWidth*0.7;
  }else{
    canvasSize=window.innerHeight*0.7;
  }

  canvas.setAttribute('width',canvasSize);
  canvas.setAttribute('height',canvasSize);

  elementsSize = canvasSize / 11;

  startGame();
}

function movePlayer(){
    game.fillText(emojis["PLAYER"], playerPosition.x, playerPosition.y);
}

function startGame() {
  game.font = elementsSize + 'px Verdana';
  game.textAlign = 'center';

  const map = maps[level];

  if(!map){
    gameWin()
    return;
  }
  if(map){    
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
  }else{return;}


  showLives();
  movePlayer();
  showRecords();
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
    levelFail();
    }
  
  
  game.fillText(emojis['PLAYER'], playerPosition.x, playerPosition.y);
}

function levelWin(){
 level ++;
 startGame();
}

function gameWin(){
  clearInterval(timeInterval);

  const nombre = nombreDelJugador.value;
  const recordTime = localStorage.getItem('record_time');
  console.log(recordTime);
  const playerTime = Date.now() - startTime;
  console.log(nombre, playerTime);


  if (recordTime) {
    if (recordTime >= playerTime) {
      localStorage.setItem('record_time', playerTime);
      pResulatado.innerHTML = "SUPERASTE EL RECORD " + nombre;
    } else {
      pResulatado.innerHTML = "lo siento, no superaste el records " + nombre;
    }
  } else {
    localStorage.setItem('record_time', playerTime);
    pResulatado.innerHTML = "juegas por primera vez, buena suerte espero que no superen tu record" + nombre;
    
  }
  level = 0;
}

function levelFail(){
  vidas--;
  
  console.log(vidas);
  if (vidas <= 0){
    level = 0;
    vidas = 3
    startTime = undefined;
  }
  playerPosition.x = undefined;
  playerPosition.y = undefined;
  startGame();
}

function showLives(){
  const hardsArray = Array(vidas).fill(emojis["HEART"]);
  spanLives.innerHTML = "";
  hardsArray.forEach(corazon => spanLives.append(corazon));
}
function showTime(){
spanTime.innerHTML = Math.floor((Date.now() - startTime)/1000) + " Segundos";
}
function showRecords(){
  spanRecord.innerHTML = Math.floor(localStorage.getItem("record_time")/1000) + " Segundos";
}
