let playerTurn;
let gameOver;
let simonSequence;
let userSequence;
let roundNum;
let prevHigh = 0;
let lightSwitch;
let GAME = {};

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
	clearTimeout(lightSwitch);
	init();
});

// Initialization for multiple audio files at once, followed this guide:
// https://blog.cotten.io/playing-audio-resources-simultaneously-in-javascript-546ec4d6216a

function Channel(audio_uri) {
	this.audio_uri = audio_uri;
	this.resource = new Audio(audio_uri);
}

Channel.prototype.play = function () {
	this.resource.play();
};

function Switcher(audio_uri, num) {
	this.channels = [];
	this.num = num;
	this.index = 0;

	for (let i = 0; i < num; i++) {
		this.channels.push(new Channel(audio_uri));
	}
}

Switcher.prototype.play = function () {
	this.channels[this.index++].play();
	this.index = this.index < this.num ? this.index : 0;
};

GAME.Sound = (function () {
	let self = {};

	self.playGreen = function () {
		if (GAME.isReady()) {
			sfx_switcher_green.play();
		}
	};

	self.playRed = function () {
		if (GAME.isReady()) {
			sfx_switcher_red.play();
		}
	};

	self.playYellow = function () {
		if (GAME.isReady()) {
			sfx_switcher_yellow.play();
		}
	};

	self.playBlue = function () {
		if (GAME.isReady()) {
			sfx_switcher_blue.play();
		}
	};

	self.init = function () {
		sfx_switcher_green = new Switcher('assets/green.mp3', 10);
		sfx_switcher_red = new Switcher('assets/red.mp3', 10);
		sfx_switcher_yellow = new Switcher('assets/yellow.mp3', 10);
		sfx_switcher_blue = new Switcher('assets/blue.mp3', 10);
	};

	return self;
})();

function init() {
	playerTurn = false;
	gameOver = false;
	simonSequence = [];
	userSequence = [];
	GAME.Sound.init();
	if (roundNum > prevHigh) {
		prevHigh = roundNum;
		if (prevHigh < 10) {
			highCounter.innerText = `High Score:${'00' + prevHigh}`;
		} else highCounter.innerText = `High Score:${'0' + prevHigh}`;
	} else if (prevHigh < 10) {
		highCounter.innerText = `High Score:${'00' + prevHigh}`;
	} else highCounter.innerText = `High Score:${'0' + prevHigh}`;
	roundNum = 1;
	roundCounter.innerText = `Round:${'00' + roundNum}`;
	turnOnAll();
	setTimeout(() => turnOffAll(), 500);
	setTimeout(() => turnOnAll(), 1000);
	setTimeout(() => turnOffAll(), 1500);
	setTimeout(() => turnOnAll(), 2000);
	setTimeout(() => turnOffAll(), 2500);
	setTimeout(() => increaseByOneAndGo(), 3000);
}

init();

function increaseByOneAndGo() {
	simonSequence.push(Math.floor(Math.random() * 4));
	simonTurn();
}

function simonTurn() {
	simonSequence.forEach(function (el, index) {
		lightSwitch = setTimeout(function () {
			let tempBtn = document.querySelector(`#b${el}`);
			tempBtn.classList.toggle('highlight');
					switch (tempBtn.id) {
						case 'b0':
							sfx_switcher_green.play();
						case 'b1':
							sfx_switcher_red.play();
						case 'b2':
							sfx_switcher_yellow.play();
						case 'b3':
							sfx_switcher_blue.play();
						default:
							break;
					}
			setTimeout(function () {
				tempBtn.classList.toggle('highlight');
				if (index === simonSequence.length - 1) {
					playerTurn = true;
				}
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

function handlePlayerTurn(event) {
	if (playerTurn) {
		switch (event.target.id) {
			case 'b0':
				sfx_switcher_green.play();
			case 'b1':
				sfx_switcher_red.play();
			case 'b2':
				sfx_switcher_yellow.play();
			case 'b3':
				sfx_switcher_blue.play();
			default:
				break;
		}

		if (event.target.classList.contains('boardBtns')) {
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
					roundCounter.innerText = `Round:${'00' + roundNum}`;
				} else {
					roundCounter.innerText = `Round:${'0' + roundNum}`;
				}

				setTimeout(() => increaseByOneAndGo(), 2000);
			}
		}
	}
}

// TODO: change gameOver to modal
// 		 instructions modal
