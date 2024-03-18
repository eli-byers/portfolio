// 'use strict'

class Map {
    constructor(size, cw, ctx) {
        this.size = size;
        this.array = Array(size).fill(Array(size).fill(0));    
        this.cw = cw;
        this.ctx = ctx;
        this.hasFood = false;
        this.food = {x: null, y: null};
    }
    empty(x, y){
        if (x < 0 || x >= this.array.length) return false;
        if (y < 0 || y >= this.array.length) return false;
        return this.array[y][x] == 0;
    }
    hasFoodAt(x,y){
        return this.food.x == x && this.food.y == y;
    }
    foodAte(){
        this.hasFood = false;
        this.food = {x: null, y: null};
    }
    newFood(){
        var x = 0;
        var y = 0;
        do {
            x = Math.round(Math.random() * this.size - 1);
            y = Math.round(Math.random() * this.size - 1);
        } while(!this.empty(x,y))
        this.food = {x: x, y: y};
    }
    update(){
        if (!this.hasFood) {
            this.hasFood = true;
            this.newFood();
        }
    }
    draw(){
        if (this.hasFood){
            this.ctx.beginPath();
            let x = (this.food.x * this.cw) + this.cw/2
            let y = (this.food.y * this.cw) + this.cw/2
            this.ctx.arc(x, y, this.cw/2, 0, 2 * Math.PI)
            this.ctx.fillStyle = "red";
            this.ctx.fill();
        }
    }
}

class Snake {
    constructor(x, y, ctx, map, game){
        this.body = [{x: x, y: y}]
        this.bodyLoc = {};
        this.ctx = ctx;
        this.game = game;
        this.dir = null;         // left, up, right, down => 0, 1, 2, 3
        this.cw = map.cw;
        this.map = map;
        this.grow = false;
        this.growCount = 0;
    }
    move(){   
        if (this.dir != null) {

            var temp1 = {};
            temp1.x = this.body[0].x;
            temp1.y = this.body[0].y;
            this.bodyLoc[temp1.x+""+temp1.y] = true;
            switch(this.dir){
                case 0: this.body[0].x -= 1; break;
                case 1: this.body[0].y -= 1; break;
                case 2: this.body[0].x += 1; break;
                case 3: this.body[0].y += 1; break;
                default: break;
            }
            
            for (var i = 1; i < this.body.length; i++) {
                var temp2 = {};
                temp2.x = this.body[i].x;
                temp2.y = this.body[i].y;
                this.body[i].x = temp1.x;
                this.body[i].y = temp1.y;
                temp1 = temp2;
            }
            if (this.grow) {
                this.body.push(temp1);
                this.growCount += 1;
                if (this.growCount == 3) {
                    this.growCount = 0;
                    this.grow = false;
                }
            } else { delete this.bodyLoc[temp1.x+""+temp1.y]; }

            let head = this.body[0];
            // hit self
            if (this.bodyLoc[head.x+""+head.y]) { 
                this.game.end(); 
                return; 
            }
            // hit wall
            if (head.x < 0 || head.x >= this.map.size || head.y < 0 || head.y >= this.map.size) {
                this.game.end();
                return;
            }
        }     
    }
    update(){
        let head = this.body[0];
        if (this.map.hasFoodAt(head.x, head.y)){
            this.grow = true;
            this.map.foodAte();
        }
        this.move();
    }
    draw(){
        for (var i in this.body){
            let node = this.body[i];
            this.ctx.beginPath();
            this.ctx.rect(node.x*this.cw, node.y*this.cw, this.cw, this.cw);
            this.ctx.fillStyle = "green";
            this.ctx.fill();
            this.ctx.fillStyle = "black";
            this.ctx.stroke();
        }
    }
    reset(){
        this.body = [{x: 1, y: 1}]
        this.bodyLoc = {};
        this.dir = null;
        this.grow = false;
        this.growCount = 0;
    }
}

class Game {
    constructor() {
        this.components = [];
        this.keys = [];
        this.gameOver = false;
        
        this.canvas = document.getElementById('game');
        this.ctx = this.canvas.getContext("2d");
        this.map = new Map(30,20, this.ctx);
        this.canvas.width = this.map.cw * this.map.size;
        this.canvas.height = this.map.cw * this.map.size;
        document.body.insertBefore(this.canvas, document.body.childNodes[0]);

        this.components.push(this.map);
        this.snake = new Snake(3, 3, this.ctx, this.map, this);
        this.components.push(this.snake);
        
        window.addEventListener('keydown', e => {
            if (e.keyCode >= 37 && e.keyCode <= 40){
                let keyPress = e.keyCode - 37;
                let goodPress = false;
                if (this.snake.body.length > 1) {
                    switch(keyPress){
                        case 0: if (this.snake.dir != 2) goodPress = true; break;
                        case 1: if (this.snake.dir != 3) goodPress = true; break;
                        case 2: if (this.snake.dir != 0) goodPress = true; break;
                        case 3: if (this.snake.dir != 1) goodPress = true; break;
                    }
                } else { goodPress = true; }
                if (goodPress) this.snake.dir = keyPress; 
            }
            // new game
            if (this.gameOver && e.keyCode == 32) {
                this.snake.reset();
                this.gameOver = false;
            }
        });

        this.interval = setInterval(x => {
            if (!this.gameOver){
                this.clear()
                this.components.map(x => { x.update(); })
                if (!this.gameOver) this.components.map(x => { x.draw(); })
            } 
            if (this.gameOver) this.drawGameOver();
        } , 100);
    }

    clear(){
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    }
    end(){
        this.gameOver = true;
    }
    drawGameOver(){
        var width = 300;
        var height = 300;
        var centerX = this.canvas.width / 2;
        var centerY = this.canvas.height / 2;
        var x = centerX - width/2;
        var y = centerY - height/2;
        this.ctx.globalAlpha = 0.75;
        this.ctx.fillStyle = 'black';
        this.ctx.fillRect(x, y, width, height);

        this.ctx.globalAlpha = 1;
        this.ctx.fillStyle = 'white';
        this.ctx.font = "60px Arial";
        this.ctx.fillText("Game Over", x, y + 80);
        this.ctx.font = "30px Arial";
        this.ctx.fillText("Score: "+this.snake.body.length, x+90, y + 170);
        this.ctx.fillText("Press Space to Start", x + 20, y + 250);
    }
}

function startGame (){
    let game = new Game();
}