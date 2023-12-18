const startBtn = document.querySelector('#start-btn')
const pauseBtn = document.querySelector('#pause-btn')
const controlBtns = document.querySelectorAll('button[name="control"]')
const controKeys = {
  ArrowRight: 1,
  ArrowLeft: -1,
  ArrowUp: -10,
  ArrowDown: 10
}
let grid = document.querySelector('.grid');
let squares 
let direction = 1
let intervalID
let currentSnake = [2,1,0]
let snakeFoodIndex

function createBoard() {
    for (let i = 0; i < 100; i++) {
      let div = document.createElement('div');
      grid.appendChild(div);
    }
  }

function showSnake() {
    squares = document.querySelectorAll('.grid div')
    currentSnake.forEach((index) => squares[index].classList.add('snake'));
}

function showSnakeFood() {
  do {
    snakeFoodIndex = Math.floor(Math.random() * squares.length);
  } while (squares[snakeFoodIndex].classList.contains("snake"));

  squares[snakeFoodIndex].classList.add("snake-food");
}

function moveSnake() {
    let tail = currentSnake.pop();
    squares[tail].classList.remove('snake');
    let nextSquare = currentSnake[0] + direction
    if(nextSquare < 0 || nextSquare > 99){
      clearInterval(intervalID )
      return
    }
    currentSnake.unshift(nextSquare);
    squares[currentSnake[0]].classList.add('snake');
    showSnake(currentSnake) 
    // movement ends here
    if (squares[currentSnake[0]].classList.contains("snake-food")) eatFood(tail);
}

function setDirection(event) {
  if(event.key) {
    direction = controKeys[event.key]
  }
  else{
    direction = parseInt(event.target.value)
  }
  moveSnake() 
}

function eatFood(tail) {
  squares[currentSnake[0]].classList.remove("snake-food");
  squares[tail].classList.add("snake");
  currentSnake.push(tail);
  showSnakeFood();
}

createBoard()
showSnake()
showSnakeFood()





document.addEventListener('DOMContentLoaded', () => controlBtns.forEach(button => button.addEventListener('click', setDirection)))
window.addEventListener('keyup', setDirection)
startBtn.addEventListener('click', () => { intervalID = setInterval(moveSnake, 2000)}) 
pauseBtn.addEventListener('click', () => clearInterval(intervalID )) 

