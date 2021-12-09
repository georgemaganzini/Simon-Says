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

gameBoard.addEventListener('click', playerTurn);
resetBtn.addEventListener('click', init);

function init() {
	gamePhase = true;
	gameOver = false;
	simonSequence = [];
	userSequence = [];
	roundNum = 0;
	turnOffAll();
}

init();

// generate sequence function

function increaseBy(num) {
	for (let i = 0; i < num; i++) {
		simonSequence.push(Math.floor(Math.random() * 4));
	}
}

// function increaseByOne() {
// 	simonSequence.push(Math.floor(Math.random() * 4));
// }

function lightShow() {
	simonSequence.forEach(function (el, index) {
		setTimeout(function () {
			let tempBtn = document.querySelector(`#b${el}`);
			tempBtn.classList.toggle('highlight');
			setTimeout(function () {
				tempBtn.classList.toggle('highlight');
			}, 500);
		}, index * 1000);
	});
}

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

// accept user button presses, immediately change gameOver to true once user's array no longer matches sequence array.

// playerTurn - each click that touches a button -> push into array, each time check if array matches simon array up to that index

function playerTurn(event) {
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
			console.log(userSequence, simonSequence.slice(0, userSequence.length));
			console.log('game over');
			gameOver = true;
		}
		if (
			userSequence.toString() ===
			simonSequence.toString()
		) {
			console.log(userSequence, simonSequence.slice(0, userSequence.length));
			console.log('next round');
			gamePhase = true;
		}
	}
}



// function switchPhase() {
// 	if (gamePhase) {
// 		gamePhase = false;
// 	} else gamePhase = true;
// }
