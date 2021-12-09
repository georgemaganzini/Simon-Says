let playerTurn;
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

gameBoard.addEventListener('click', handlePlayerTurn);
resetBtn.addEventListener('click', init);

function init() {
	playerTurn = false;
	gameOver = false;
	simonSequence = [];
	userSequence = [];
	roundNum = 1;
	turnOffAll();
	setTimeout(() => increaseByOneAndGo(), 2000);
}

init();

// generate sequence function

// function increaseBy(num) {
// 	for (let i = 0; i < num; i++) {
// 		simonSequence.push(Math.floor(Math.random() * 4));
// 	}
// }

function increaseByOneAndGo() {
	simonSequence.push(Math.floor(Math.random() * 4));
	lightShow();
}

function lightShow() {
	simonSequence.forEach(function (el, index) {
		setTimeout(function () {
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

// playerTurn - each click that touches a button -> push into array, each time check if array matches simon array up to that index

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
					init();
				}
			}
			if (userSequence.toString() === simonSequence.toString()) {
				userSequence = [];
				playerTurn = false;
				roundNum += 1;
				setTimeout(() => increaseByOneAndGo(), 2000);
			}
		}
	}
}

// TODO: change gameOver notification

// roundNum dom manipulation
