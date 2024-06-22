import {canvas, ctx, drawBoldLine} from './components/field';
import {Modal} from './components/modal';
import {Menu} from "./components/menu";
import {Timer} from "./components/timer";
import {Button} from "./components/answersButton";
import {ButtonMode} from "./components/buttonMode";
import {getNewGame } from './functions/getNewGame';
import {checkGrids} from "./functions/checkGrids";
import {continueGames } from './functions/getContinue';
import {clearPicture} from "./functions/clearPictureOfAnswer";
import {makeChoice} from "./functions/makeChoice";

import PencilSong from './assets/audio/pencil-short.mp3';
import GumiSong from './assets/audio/gumi.mp3';
import WinnerSong from './assets/audio/winner.mp3';
import './styles/index.scss';


import pictures from './pictures.json';

const body = document.querySelector('body');

const container = document.createElement('div');
const wrapper = document.createElement('div');
const sounds = document.createElement('div');
const pSonund = document.createElement('p');
const theme = document.createElement('div');
const pTheme = document.createElement('p');
const timerBlock = document.createElement("div");
const name = document.createElement("h3");
container.classList.add('container');
wrapper.classList.add('wrapper');
sounds.classList.add('sounds');
theme.classList.add('theme');
timerBlock.classList.add("timer");



body.appendChild(container);
Menu(container);
container.appendChild(canvas);
container.appendChild(wrapper);
ButtonMode(theme, "button_mode");
ButtonMode(sounds, "button_sound");
sounds.append(pSonund);
theme.append(pTheme);
Button(wrapper);
wrapper.appendChild(theme);
wrapper.appendChild(sounds);
wrapper.appendChild(timerBlock);
wrapper.appendChild(name);

Timer(timerBlock, 0);



const menu = container.querySelector('.menu');
const buttonMode = wrapper.querySelector('.button_mode');
const answerButton = container.querySelector('.button_answer');
const buttonSound = sounds.querySelector('.button_sound');
let randomGamesNumber = 0;
let usedGrids=[];
let winnerArr = [];
let win = [];
let returnGame = false;
let timer = false;
let recordWin = true;
const pencilSong = new Audio(PencilSong);
const gumiSong = new Audio(GumiSong);
const winnerSong = new Audio(WinnerSong);
let arrOfAnswers = [...pictures[randomGamesNumber].answers];
let seconds = 0;
let getTimeSolution;
let measure;
let axis;
let quantity;
let statusSound = "on";
let themeOn = false;


pTheme.textContent = `Theme dark off`;
pSonund.textContent =`Sounds ${statusSound.toUpperCase()}`;

buttonSound.addEventListener("click", ()=>{
  if(statusSound ==="on"){
    statusSound = "off";
    buttonSound.classList.add("off")
  }else{
    statusSound = "on";
    buttonSound.classList.remove("off")
  }
  pSonund.textContent =``;
  pSonund.textContent =`Sounds ${statusSound.toUpperCase()}`;
})

name.textContent = `Play:${pictures[randomGamesNumber].name.toUpperCase()}`
//change mode
buttonMode.addEventListener("click",()=>{
  buttonMode.classList.toggle('secondMode');
  if(buttonMode.classList.contains('secondMode')){
    pTheme.textContent = ``;
    pTheme.textContent = `Theme dark on`;
    themeOn = true;
    ctx.fillStyle = "rgb(10, 10, 10)";
    if(usedGrids.length > 0){
      const copyUsed = [...usedGrids];
      continueGames(copyUsed, pictures,randomGamesNumber, pencilSong, "show", themeOn)
     
    }
  }else{
    pTheme.textContent = ``;
    pTheme.textContent = `Theme dark off`;
    themeOn = false;
    ctx.fillStyle = "rgb(117, 129, 129)";
    if( usedGrids.length > 0){
      const copyUsed = [...usedGrids];
      continueGames(copyUsed, pictures,randomGamesNumber, pencilSong, "show", themeOn)
     
    }
  }
  container.classList.toggle("second");
})


//make visible the picture
answerButton.addEventListener("click", () => {
recordWin= false; 
continueGames(pictures[randomGamesNumber].answers, pictures,randomGamesNumber, pencilSong, "show", themeOn);

if(answerButton.classList.contains('on')){
  ctx.clearRect(0, 0, 500, 500);
  getNewGame(pictures, randomGamesNumber);
}
answerButton.classList.toggle('on');
})


//clear class - level 
const clearClassLevel = () => {
  if(canvas.classList.contains("normal")){
    canvas.classList.remove("normal")
  }else if(canvas.classList.contains("easy")){
    canvas.classList.remove("easy")
  }else if(canvas.classList.contains("hard")){
    canvas.classList.remove("hard")
  }
  canvas.style.cssText = ``;
}

const equalsZero = () =>{
  ctx.clearRect(0, 0, 500, 500);  
  getNewGame(pictures, randomGamesNumber);
  usedGrids = [];
  arrOfAnswers = [...pictures[randomGamesNumber].answers];
  clearInterval(getTimeSolution);
  Timer(timerBlock, 0);
  timer = false;
  recordWin=true;
  seconds = 0;
  clearPicture(canvas);
  answerButton.classList.remove('on');
  name.textContent =``;
  name.textContent = `Play:${pictures[randomGamesNumber].name.toUpperCase()}`;
}

menu.addEventListener('click', (event) =>{  
  // new game
if(event.target.textContent === " New game"){ 
  clearClassLevel();
  randomGamesNumber = Math.floor(Math.random() * pictures.length);
  equalsZero();
  returnGame = false;
  name.textContent =``;
  name.textContent = `Play:${pictures[randomGamesNumber].name.toUpperCase()}`;
}
//reset game
if(event.target.textContent === " Reset game"){
  equalsZero();
  returnGame = false;
}
//save game
if(event.target.textContent === " Save game"){
  localStorage.setItem('usedGrids', JSON.stringify(usedGrids));
  localStorage.setItem('number',JSON.stringify( randomGamesNumber));
  localStorage.setItem('time',JSON.stringify(seconds));
  returnGame = false;
  equalsZero();
  name.textContent =``;
  name.textContent = `Play ${pictures[randomGamesNumber].name.toUpperCase()} saved`;
}
//continue game
if(event.target.textContent === " Continue last game"){
  ctx.clearRect(0, 0, 500, 500);
  usedGrids = JSON.parse(localStorage.getItem('usedGrids'));
  seconds = JSON.parse(localStorage.getItem('time'));
  randomGamesNumber = JSON.parse(localStorage.getItem('number'));
  if(!usedGrids.length||!seconds||(!randomGamesNumber && randomGamesNumber!==0) ){
    name.textContent =``;
    name.textContent = `There isn't the saved play, so play ${pictures[randomGamesNumber].name.toUpperCase()}`;
  }else{
    continueGames(usedGrids, pictures,randomGamesNumber, pencilSong, "continue", themeOn);
    arrOfAnswers = Array.from(pictures[randomGamesNumber].answers);
    returnGame = true;
    clearInterval(getTimeSolution);
    Timer(timerBlock, seconds);
    timer = false;
    recordWin=true;
    clearPicture(canvas);
    clearClassLevel();
    answerButton.classList.remove('on');
    name.textContent =``;
    name.textContent = `Play ${pictures[randomGamesNumber].name.toUpperCase()} continue`;
  }

    
}
//random
if(event.target.textContent === " Random game"){
  randomGamesNumber = Math.floor(Math.random() * pictures.length);
  equalsZero();
  returnGame = false;
  name.textContent =``;
  name.textContent = `Play:${pictures[randomGamesNumber].name.toUpperCase()}`;
}
//check winners
if(event.target.textContent === " Check winners"){ 
  clearClassLevel();
  winnerArr = JSON.parse(localStorage.getItem(`winner`));
  
  Modal(container,"check", 0, 0, 0, winnerArr);
  const modal = container.querySelector('.modal');
  const buttonNewGame = container.querySelector('.button_new-game');
  buttonNewGame.addEventListener('click',() => {
  randomGamesNumber = Math.floor(Math.random() * pictures.length);
  equalsZero();
  modal.remove();
  seconds = 0;  
})
}
//make choice picture
if(event.target.textContent === " Available pictures"){
  clearClassLevel();
  answerButton.classList.remove('on');
  makeChoice(container, pictures);
const tasks = document.querySelector('.tasks')
const listTasks = document.querySelector('.tasksList');
listTasks.addEventListener('click', (event)=>{
  let index = 0;
for(const child of listTasks.children){
  if(child.classList[1] === event.target.classList[1]){
    randomGamesNumber = index;
    getNewGame(pictures, randomGamesNumber);
    usedGrids = [];
    arrOfAnswers = [...pictures[randomGamesNumber].answers];
    returnGame = false;
    recordWin=true;
    clearInterval(getTimeSolution);
    timer = false;
    seconds = 0;
    name.textContent =``;
    name.textContent = `Play:${pictures[randomGamesNumber].name.toUpperCase()}`;
  }
  index += 1;
}
tasks.remove();
})
name.textContent =``;
name.textContent = `Play:${pictures[randomGamesNumber].name.toUpperCase()}`;
}
return usedGrids, arrOfAnswers, randomGamesNumber;
})

canvas.addEventListener('contextmenu', event => event.preventDefault());
canvas.addEventListener("mousedown", (event) => { 

  if(pictures[randomGamesNumber].level === "easy"){
    measure = 40;
    axis = 150;
    quantity = 5;
  }else if (pictures[randomGamesNumber].level === "normal"){
    measure = 35;
    axis = 120; 
    quantity = 10;   
  } else if (pictures[randomGamesNumber].level === "hard"){
    measure = 25;
    axis = 100; 
    quantity = 15;   
  }

  answerButton.classList.remove('on');

  if(returnGame) {
    usedGrids = JSON.parse(localStorage.getItem('usedGrids'));
    seconds =  JSON.parse(localStorage.getItem('time'));
    returnGame = false;
  }
  
  const rect = canvas.getBoundingClientRect();
  const x = event.clientX - rect.left -axis;
  const y = event.clientY - rect.top -axis;
  let numberGridOfX = Math.floor(x / measure);
  let numberGridOfY = Math.floor(y/ measure);
 
  if((0 <= numberGridOfX && numberGridOfX  < quantity) && ( 0 <= numberGridOfY && numberGridOfY < quantity)){
    if(!timer) {
      getTimeSolution = setInterval(() => {
        seconds += 1;
        Timer(timerBlock, seconds);
      }, 1000);
      timer = true;
    }
      const dote = ctx.getImageData(event.clientX - rect.left, event.clientY - rect.top, 1, 1);
      const dataDote = dote.data;
      const r = dataDote[0],
      g = dataDote[1],
      b = dataDote[2],
      a = dataDote[3];
    if(r == 0 && g == 0 && b == 0 && a == 0){
    if(event.button === 0){
      ctx.lineWidth = 2;
      themeOn === true ?
      ctx.fillStyle = "rgb(10, 10, 10)":
      ctx.fillStyle = "rgb(117, 129, 129)";
    ctx.fillRect(numberGridOfX  * measure+ 1 +axis, numberGridOfY * measure +1  +axis, measure -2.15, measure- 2.15);
    checkGrids(numberGridOfX, numberGridOfY, usedGrids, pictures[randomGamesNumber].level);
    }else if(event.button === 2){
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.moveTo(numberGridOfX  * measure  + axis, numberGridOfY * measure  +axis);
      ctx.lineTo(numberGridOfX  * measure + measure + axis , numberGridOfY * measure + measure+axis);
      ctx.stroke();
      ctx.beginPath();
      ctx.moveTo(numberGridOfX  * measure  +axis, numberGridOfY * measure  + measure +axis);
      ctx.lineTo(numberGridOfX  * measure + measure +axis, numberGridOfY * measure +axis);
      ctx.stroke();
    }    
    if(statusSound === "on"){
      pencilSong.play();
    }
    
    } else {
    ctx.lineWidth = 2;
    ctx.clearRect(numberGridOfX  * measure +axis, numberGridOfY * measure +axis, measure, measure);
    ctx.strokeRect(numberGridOfX  * measure +axis, numberGridOfY * measure +axis, measure, measure);
    if(statusSound === "on"){
      gumiSong.play();
    }
    checkGrids(numberGridOfX, numberGridOfY, usedGrids, pictures[randomGamesNumber].level);
    }

    if(numberGridOfX === 4 || numberGridOfY === 4 || 
     numberGridOfX === 8 || numberGridOfY === 8){
    drawBoldLine('rows', pictures[randomGamesNumber].rows);
    drawBoldLine('cols', pictures[randomGamesNumber].cols);
    }   

    if( arrOfAnswers.length === usedGrids.length &&
      usedGrids.every(grid => arrOfAnswers.includes(grid))){
        clearInterval(getTimeSolution);
        timer = false;        
        Modal(container,"winn", seconds, pictures[randomGamesNumber].name,pictures[randomGamesNumber].level);
        if(statusSound === "on"){
        winnerSong.play();
        }
    //write win to LocalStorage
        if(recordWin){
          win = [seconds, pictures[randomGamesNumber].level,pictures[randomGamesNumber].name];
          winnerArr.push(win);
         localStorage.setItem(`winner`, JSON.stringify(winnerArr))
        }
    
    const modal = container.querySelector('.modal');
    const buttonNewGame = container.querySelector('.button_new-game');
    buttonNewGame.addEventListener('click',() => {
      ctx.clearRect(0, 0, 500, 500);
      randomGamesNumber = Math.floor(Math.random() * pictures.length);
      getNewGame(pictures, randomGamesNumber);
      modal.remove();
      seconds = 0;
      usedGrids = [];
      arrOfAnswers = [...pictures[randomGamesNumber].answers];
      clearInterval(getTimeSolution);
      Timer(timerBlock, 0);
      returnGame = false;
      timer = false;
      recordWin=true;
      seconds = 0;
      answerButton.classList.remove('on');
      name.textContent =``;
      name.textContent = `Play:${pictures[randomGamesNumber].name.toUpperCase()}`;
    })
    clearPicture(canvas);
    }    
}else{
  return false;
}
 console.log(arrOfAnswers, usedGrids)
})
