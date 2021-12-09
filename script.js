// const user;

let gamePhase;
let gameOver;
let simonSequence;
let userSequence;
let roundNum;

const gameBoard = document.querySelector('#gameBoard');
const resetBtn = document.querySelector('#resetBtn');
const yellowBtn = document.querySelector('.yellowBtn');
const blueBtn = document.querySelector('.blueBtn');
const redBtn = document.querySelector('.redBtn');
const greenBtn = document.querySelector('.greenBtn');

gameBoard.addEventListener('click', handleClick);
resetBtn.addEventListener('click', init);

function init() {
	gamePhase = true;
	gameOver = false;
	simonSequence = [];
	userSequence = [];
	roundNum = 0;
	turnOffAll();
}

function handleClick(event) {
	console.log(`${event.target} clicked!`);
}

function switchPhase() {
	if (gamePhase) {
		gamePhase = false;
	} else gamePhase = true;
}

init();

// generate sequence function

function increaseByOne(num) {
	for (let i = 0; i < num; i++) {
		simonSequence.push(Math.floor(Math.random() * 4));
	}
}

simonSequence.forEach(function (el, index) {
	setTimeout(function () {
		let tempBtn = document.querySelector(`#b${el}`);
		tempBtn.classList.toggle('highlight');
		console.log(el, "on");
		setTimeout(function () {
			tempBtn.classList.toggle('highlight');
			console.log(el, "off")
		}, 500);
	}, index * 1000);
});

function onOff() {}

function turnOnAll() {
	yellowBtn.classList.add('highlight');
	blueBtn.classList.add('highlight');
	redBtn.classList.add('highlight');
	greenBtn.classList.add('highlight');
}

function turnOffAll() {
	yellowBtn.classList.remove('highlight');
	blueBtn.classList.remove('highlight');
	redBtn.classList.remove('highlight');
	greenBtn.classList.remove('highlight');
}

// read array and blink buttons

// function highlight(color) {
// color.classList.toggle('highlight');
// settimeout 1s -> toggle again
// }

// determine sequence length, then use Math.random to determine color and .push it to the array, once complete switchPhase

// accept user button presses, immediately change gameOver to true once user's array no longer matches sequence array.
