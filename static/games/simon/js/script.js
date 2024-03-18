function flashBlock(id){
	var block = document.getElementById(id+"");
	block.className = block.className.replace("d-","l-");
	setTimeout(function(){
		block.className = block.className.replace("l-","d-");
		if (state == "showWait") {
			setTimeout(function(){
				flashDone();
			}, 500);
		}
	}, 300);
}

function flashDone(){
	showCount++;
	if (showCount == game.length){ state = "play"; }
	else { state = "showGame"; }
}

function addChoice(){
	var choice = Math.round(Math.random() * 3);
	game.push(choice);
}

function checkPlay(id){
	if (game[count] != id){ state = "done"; }
	count++;
}

function gameOver(){
	var data = JSON.parse(localStorage.getItem('data'));
	if (game.count > data.score) {
		data.score += 1;
		localStorage.setItem('data', JSON.stringify(data));
	}
	document.getElementById("score").textContent = data.score;
	document.getElementById("gameState").style.visibility = "visible";
	document.getElementById("start").style.visibility = "visible";
}

function startGame(){
	var data = JSON.parse(localStorage.getItem('data'));
	if (!data) localStorage.setItem('data', JSON.stringify({"score": 0}));
	document.getElementById("gameState").style.visibility = "hidden";
	document.getElementById("start").style.visibility = "hidden";
	game = [];
	showCount = 0;
	state = "nextGame";
	count = 0;

	var gameInterval = setInterval(function(){
		console.log(state);
		if(state == "nextGame"){
			addChoice();
			count = 0;
			showCount = 0;
			state = "showGame";
		}
		else if(state == "showGame"){
			state = "showWait";
			flashBlock(game[showCount]);
		}
		else if (state == "play") {
			if (count == game.length){
				state = "playWait";
				setTimeout(function(){ state = "nextGame"; }, 1000);
			}
		}
		else if (state == "done") {
			clearInterval(gameInterval);
			gameOver();
		}
	}, 100);
}


var game, showCount, state, count;
var blocks = document.getElementsByClassName('block');
for (var i = 0; i < blocks.length; i++){
	blocks[i].addEventListener("click", function(){
		if (state == "play"){
			flashBlock(this.id);
			checkPlay(this.id, count);
		}
	});
}
document.getElementById("start").style.visibility = "visible";
document.getElementById("start").addEventListener('click', function(){
	startGame();
	var data = JSON.parse(localStorage.getItem('data'));
	if (!data) localStorage.setItem('data', JSON.stringify({"score": 0}));
});
