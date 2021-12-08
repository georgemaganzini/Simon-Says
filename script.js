const user

let gamePhase;
let gameOver;
let sequence;

const gameBoard = document.querySelector("#gameBoard")
const resetBtn = document.querySelector("#resetBtn")

gameBoard.addEventListener("click", handleClick);
resetBtn.addEventListener("click", init);

function init() {
    gamePhase = true;
    gameOver = false;
    sequence = [];
}

function handleClick(event){
    console.log(`${event.target} clicked!`)
}

function switchPhase (){
    if (gamePhase) {
        gamePhase = false;
    } else gamePhase = true;
}

