function Simon(){
	var _ = this;
	this.game = [];
	this.gameInterval = null;
	this.state = "nextRound";
	this.showCount = 0;
	this.playCount = 0;
	this.flashDuration = 150;
	this.flashPause = 400;
	this.roundPause = 1000;
	this.init = function(){
		// store html elements
		this.scoreLabel = document.getElementById("scoreLabel");
		this.scoreDisplay = document.getElementById("scoreDisplay");
		this.highScore = document.getElementById("highScore");
		this.gameState = document.getElementById("gameState");
		this.startButton = 	document.getElementById("startButton");
		// add click listener to each block
		var blocks = document.getElementsByClassName('block');
		for (var i = 0; i < blocks.length; i++){
			// test for mobile client
			if (typeof window.orientation == 'undefined') {
				blocks[i].addEventListener("click", _.choiceMade);
			} else {
				blocks[i].addEventListener("touchstart", _.choiceMade);
			}
		}
		// init high score
		var data = JSON.parse(localStorage.getItem('data'));
		if (!data) localStorage.setItem('data', JSON.stringify({"score": 0}));
		else this.highScore.textContent = data.score;
	};
	this.startGame = function(){
		// init
		this.game = [];
		this.state = "nextRound";
		_.scoreDisplay.textContent = 0;
		_.gameState.textContent = "Score";
		_.startButton.style.visibility = "hidden";
		// start an interval that handels state changes
		this.gameInterval = setInterval(function(){
			// init round variables
			if(_.state == "nextRound"){
				_.addChoice();
				_.showCount = 0;
				_.playCount = 0;
				_.state = "showGame";
			}
			// show the next color in the game
			else if(_.state == "showGame"){
				_.state = "showWait";
				_.flashBlock(_.game[_.showCount]);
			}
			// go to next round when player has completed current
			else if (_.state == "play") {
				if (_.playCount == _.game.length){
					_.state = "playWait";
					setTimeout(function(){ _.state = "nextRound"; }, _.roundPause);
				}
			}
			// stop the game`
			else if (_.state == "done") {
				clearInterval(_.gameInterval);
				_.gameOver();
			}
		}, 100);
	};
	this.addChoice = function(){
		var choice = Math.round(Math.random() * 3);
		this.game.push(choice);
	};
	this.flashBlock = function(id){
		var block = document.getElementById(id+"");
		// class to bright color
		block.className = block.className.replace("d-","l-");
		setTimeout(function(){
			// class to dark color
			block.className = block.className.replace("l-","d-");
			// if showing the game, wait a bit before flashing the next color
			if (_.state == "showWait") {
				setTimeout(function(){ _.flashDone(); }, _.flashPause);
			}
		}, _.flashDuration);
	};
	this.choiceMade = function(){
		// only flash player clicks if it's the players turn
		if (_.state == "play"){
			_.flashBlock(this.id);
			_.checkPlay(this.id);
		}
	};
	this.flashDone = function(){
		// go the next state, game or show next color
		this.showCount++;
		if (this.showCount == this.game.length){ this.state = "play"; }
		else { this.state = "showGame"; }
	};
	this.checkPlay = function(id){
		// see if the player chose correcly, end game or update score
		if (this.game[this.playCount] != id){ this.state = "done"; }
		else if (this.playCount == this.game.length-1) {
			this.scoreDisplay.textContent = this.game.length;
		}
		this.playCount++;
	};
	this.gameOver = function(){
		// update high score, change UI to end game state
		var data = JSON.parse(localStorage.getItem('data'));
		if (this.game.length-1 > data.score) {
			data.score = this.game.length-1;
			localStorage.setItem('data', JSON.stringify(data));
			this.highScore.textContent = data.score;
		}
		_.gameState.textContent = "Final Score";
		_.startButton.style.visibility = "visible";
	};
}

var simon = new Simon();
simon.init();
