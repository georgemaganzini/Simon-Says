let playerTurn;
let gameOver;
let simonSequence;
let userSequence;
let roundNum;
let prevHigh = 0;

const gameBoard = document.querySelector('#gameBoard');
const resetBtn = document.querySelector('#resetBtn');
const yellowBtn = document.querySelector('.yellowBtn');
const blueBtn = document.querySelector('.blueBtn');
const redBtn = document.querySelector('.redBtn');
const greenBtn = document.querySelector('.greenBtn');
const roundCounter = document.querySelector('#round-score');
const highCounter = document.querySelector('#high-score');

gameBoard.addEventListener('click', handlePlayerTurn);

resetBtn.addEventListener('click', function () {
	clearTimeout(lightShowSwitch);
	init();
});

function init() {
	if (roundNum > prevHigh) {
		prevHigh = roundNum;
		highCounter.innerText = `High Score:${prevHigh}`;
	}
	playerTurn = false;
	gameOver = false;
	simonSequence = [];
	userSequence = [];
	roundNum = 1;
	roundCounter.innerText = `Round:${'000' + roundNum}`;
	turnOffAll();
	setTimeout(() => increaseByOneAndGo(), 2000);
}

init();

function increaseByOneAndGo() {
	simonSequence.push(Math.floor(Math.random() * 4));
	lightShow();
}

let lightShowSwitch;

function lightShow() {
	simonSequence.forEach(function (el, index) {
		lightShowSwitch = setTimeout(function () {
			let tempBtn = document.querySelector(`#b${el}`);
			tempBtn.classList.toggle('highlight');
			setTimeout(function () {
				tempBtn.classList.toggle('highlight');
				if (index === simonSequence.length - 1) {
					playerTurn = true;
				}
			}, 500);
		}, index * 1000);
	});
}

// function turnOnAll() {
// 	yellowBtn.classList.add('highlight');
// 	blueBtn.classList.add('highlight');
// 	redBtn.classList.add('highlight');
// 	greenBtn.classList.add('highlight');
// }

function turnOffAll() {
	yellowBtn.classList.remove('highlight');
	blueBtn.classList.remove('highlight');
	redBtn.classList.remove('highlight');
	greenBtn.classList.remove('highlight');
}

function handlePlayerTurn(event) {
	if (playerTurn) {
		if (event.target.id !== 'gameBoard') {
			let clickedBtn = document.querySelector(`#${event.target.id}`);
			clickedBtn.classList.toggle('highlight');
			setTimeout(function () {
				clickedBtn.classList.toggle('highlight');
			}, 500);
			userSequence.push(`${event.target.id[1]}`);
			if (
				userSequence.toString() !==
				simonSequence.slice(0, userSequence.length).toString()
			) {
				gameOver = true;
				if (confirm('Game over, would you like to play again?')) {
					setTimeout(() => init(), 1000);
				}
			}
			if (userSequence.toString() === simonSequence.toString()) {
				userSequence = [];
				playerTurn = false;
				roundNum += 1;
				if (roundNum < 10) {
					roundCounter.innerText = `Round:${'000' + roundNum}`;
				} else {
					roundCounter.innerText = `Round:${'00' + roundNum}`;
				}

				setTimeout(() => increaseByOneAndGo(), 2000);
			}
		}
	}
}

// TODO: change gameOver to modal
// 		 instructions modal

// high score display

// reset func, if (roundNum > highScore) {
// scoreCounter = roundNum
// }
