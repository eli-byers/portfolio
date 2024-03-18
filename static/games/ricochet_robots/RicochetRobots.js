var map = {
    canvas : document.getElementById("map"),
    context: null,
    array : makeMap(map3B, map1A, map2B, map4B),
    cw : 21,
    init : function(){
        this.canvas.width = this.cw * this.array[0].length;
        this.canvas.height = this.cw * this.array.length;
        this.context = this.canvas.getContext("2d");
        document.body.insertBefore(this.canvas, document.body.childNodes[0]);
    },
    drawMap: function(){
        this.drawTiles();
        this.drawWalls();
        this.drawCenter();
    },
    drawCenter: function(){
        var image = document.getElementById("Center");
        var x = 7*3*this.cw-this.cw/2
        var y = 7*3*this.cw-this.cw/2.5
        this.context.drawImage(image, x, y);
    },
    drawTiles: function(){
        var left = document.getElementById("EmptyL");
        var right = document.getElementById("EmptyR");
        for (var row = 0; row < this.array.length/3; row++){
        for (var col = 0; col < this.array[row].length/3; col++){
            var x = col*this.cw*3;
            var y = row*this.cw*3;
            if (row % 2 == col % 2) image = right;
            else image = left;
            this.context.drawImage(image, x, y)
            var code = targetCode(this.array, col, row);
            if (code > 1){
                code = String(code).split("");
                id = makeTargetCode(code[0], code[1]);
                var target = document.getElementById(id);
                this.context.drawImage(target, x+this.cw/10, y+this.cw/10);
            } 
        }
        }
    },
    drawWalls: function(){
        for (var row = 0; row < this.array.length/3; row++){
            for (var col = 0; col < this.array[row].length/3; col++){
                this.drawWall(col, row);
            }
        }
    },
    drawWall: function (cellX, cellY) {
        var cellType = tileType(this.array, cellX, cellY);
        if (cellType != 'empty'){
            var x = cellX * this.cw * 3;
            var y = cellY * this.cw * 3;
            if (cellType == 'L'){
                rotation = cornerRotation(this.array, cellX, cellY);
                this.drawCorner(x, y, rotation);
            } else if (cellType == 'one side'){
                rotation = lineRotation(this.array, cellX, cellY);
                this.drawSingle(x, y, rotation)
            };
        }
    },
    drawCorner: function(x, y, angle) { 
        var image = document.getElementById('Corner')
        this.context.save(); 
        this.context.translate(x, y);
        var TO_RADIANS = Math.PI/180; 
        this.context.rotate(angle * TO_RADIANS);
        switch (angle){
            case 0:
                var realX = -this.cw/4;
                var realY = -this.cw/4;
                break;
            case 90:
                var realX = -this.cw/4;
                var realY = -(image.height)+this.cw/2;
                break;
            case 180:
                var realX = -(image.width)+this.cw/2;
                var realY = -(image.height)+this.cw/2;
                break;
            case 270:
                var realX = -(image.width)+this.cw/2;
                var realY = -this.cw/4;
                break;
        }
        this.context.drawImage(image, realX, realY);
        this.context.restore(); 
    },
    drawSingle: function(x, y, angle) { 
        var image = document.getElementById('Straight')
        this.context.save(); 
        this.context.translate(x, y);
        var TO_RADIANS = Math.PI/180; 
        this.context.rotate(angle * TO_RADIANS);
        switch (angle){
            case 0:     // top
                var realX = -this.cw/3;
                var realY = -this.cw/3;
                break;
            case 90:    // right
                var realX = -this.cw/3;
                var realY = -(image.height)+this.cw/2;
                break;
            case 180:   // bottom
                var realX = -(image.width)+this.cw/3;
                var realY = -(image.height)+this.cw/3;
                break;
            case 270:   // left
                var realX = -(image.width)+this.cw/3;
                var realY = -this.cw/3;
                break;
        }
        this.context.drawImage(image, realX, realY);
        this.context.restore(); 
    },
};

var scene = {
    canvas: document.getElementById("scene"),
    context: null,
    array: [],
    robots: [],
    placeholders: [],
    history: [],
    paths: [],
    selectedBot: null,
    selectedDir: null,
    roundTarget: null,
    roundsPlayes: {},
    target: null,
    botMoving: false,
    resetting: null,
    time: null,
    timer: null,
    cw: 21,
    mouseX: 0,
    mouseY: 0,
    init: function () {
        var _this = this;
        this.array = newGameArray();
        this.canvas.width = map.cw * map.array[0].length;
        this.canvas.height = (map.cw * map.array.length);
        this.context = this.canvas.getContext("2d");
        document.body.insertBefore(this.canvas, document.body.childNodes[0]);

        $('#timerButton').click(function(){
            // timer
            _this.time = 60;
            $('#timer').html(60);
            _this.timer = setInterval(function(){
                _this.time -= 1;
                $('#timer').html(_this.time);
                if (_this.time == 0) clearInterval(_this.timer);
            }, 1000);
        });

        // reset
        $('#reset').click(function(){
            if(_this.selectedBot) _this.selectedBot.selected = false;
            _this.selectedBot = null;
            _this.selectedDir = null;
            _this.target = null;
            
            var previousMove = null;
            var move = null;

            _this.resetting = setInterval(function(){
                if (!_this.botMoving){                    
                    previousMove = move;
                    if (previousMove) {
                        _this.paths.pop();                        
                        if (previousMove.firstMove) _this.placeholders.pop();
                    }
                    move = _this.history.pop();
                    if (move){
                        _this.moveBot(move.bot, move.target);
                        move.bot.moveTo(move.target);
                    } else {
                        _this.paths.pop();
                        _this.placeholders.pop()
                        clearInterval(_this.resetting)
                        _this.resetting = previousMove = move = null;                        
                        _this.robots.forEach(function(robot){
                            robot.firstMove = true;
                        })
                    }
                }
            }, 50);

        });
        
        $('#newRound').click(function(){ _this.newRound() });

        // canvase click
        this.canvas.addEventListener('click', function(event) {
            if (!_this.resetting){
                var rect = this.getBoundingClientRect();
                var x = event.clientX - rect.left;
                var y = event.clientY - rect.top;

                // check if any bot was clicked
                _this.robots.forEach( function(robot) {
                    if (robot.inTileContaining(x, y)){
                        // select new bot and clear previous bot & target
                        if (_this.selectedBot) _this.selectedBot.selected = false;
                        robot.selected = true;
                        _this.selectedBot = robot;
                        _this.selectedDir = null;
                        _this.target = null;
                    }
                });

                // if there is no not moving and there is a current target
                if (!_this.botMoving && _this.selectedDir){
                    var bot = _this.selectedBot;
                    
                    // if target is another cell
                    if (bot.cellX != _this.target.cellX || bot.cellY != _this.target.cellY){
                        var move = {bot: bot, target: {cellX: bot.cellX, cellY: bot.cellY}, firstMove: bot.firstMove};
                        _this.paths.push(_this.target)
                        _this.history.push(move);
                        _this.moveBot(_this.selectedBot, _this.target);
                        _this.target = null;
                        _this.selectedDir = null;
                    }
                }
            }
        }, false);

        // track mouse position
        this.canvas.addEventListener('mousemove', function(event) {
            var rect = this.getBoundingClientRect();
            var x = event.clientX - rect.left;
            var y = event.clientY - rect.top;
            _this.mouseX = x;
            _this.mouseY = y;
            // if there is not a bot moving, see where the mouse is
            if (!_this.botMoving) _this.checkMouseInRowCol();
        });
    },
    clear: function () {
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
    },
    initGameMap: function(){
        this.array = newGameArray();
        this.robots = [];  
        var red = document.getElementById('RedR');
        var blue = document.getElementById('BlueR');
        var green = document.getElementById('GreenR');
        var yellow = document.getElementById('YellowR');
        var pieces = {Red: red, Blue: blue, Yellow: yellow, Green: green};
        var occupied = {};
        for (var piece in pieces){
            do {
                cellY = Math.floor(Math.random() * this.array.length);
                cellX = Math.floor(Math.random() * this.array[cellY].length);            
            } while ( isMiddleOfBoard(cellX, cellY) || (occupied[cellX+"-"+cellY] == true) );
            occupied[cellX+"-"+cellY] = true;
            robot = new Robot(cellX, cellY, this.context, piece, pieces[piece])
            this.robots.push(robot);
            this.array[cellY][cellX] = piece;
        }
        occupied = null;
    },
    moveBot: function(bot, target){
        this.botMoving = true;
        var cellX = bot.cellX;
        var cellY = bot.cellY;
        var newCellX = target.cellX;
        var newCellY = target.cellY;
        var botCode = this.array[cellY][cellX]
        
        this.array[newCellY][newCellX] = botCode
        this.array[cellY][cellX] = 0;
        bot.moveTo(target);
    },
    checkMouseInRowCol: function(){
        var x = this.mouseX;
        var y = this.mouseY;
        var bot = this.selectedBot;
        if (bot && !bot.inTileContaining(x, y)){
            if (bot.inRowContaining(y)){
                if (x > bot.x) this.selectedDir = 'right';
                else this.selectedDir = 'left';
            } else if(bot.inColContaining(x)){
                if (y > bot.y) this.selectedDir = 'down';
                else this.selectedDir = 'up';
            } else {
                this.selectedDir = null;
            }
        } else {
            this.selectedDir = null;
        }
        if (this.selectedDir){
            var targetCell = wallCellInDirectionFrom(this.selectedDir, bot.cellX, bot.cellY, map.array, this.array)
            this.target = new BotTarget(targetCell.x, targetCell.y, this.context, bot);
        } else this.target = null;
    },
    newRound: function(){
        this.placeholders = [];
        this.history = [];
        this.paths = [];
        if (this.selectedBot) this.selectedBot.selected = false;
        this.selectedBot = null;
        this.selectedDir = null;
        this.robots.forEach(function(robot){
            robot.firstMove = true;
        });
        var code;
        do {
            var color = Math.round((Math.random() * 4) + 1)
            var icon = color == 5? 5: Math.round((Math.random() * 3) + 1);
            code = makeTargetCode(color, icon);
            if (Object.keys(this.roundsPlayes).length == 16) this.roundsPlayes = {};
        } while (this.roundsPlayes[code] == true)

        this.roundsPlayes[code] = true;
        var x = (this.canvas.width/2) - (21 * 1.5);
        var y = (this.canvas.height/2) - (21 * 1.5);
        this.roundTarget = new RoundTarget( x, y, this.context, code);
    }
};

//=====================================================
//			             CLASSES
//=====================================================


// ====================  Robot  =======================

function Robot(cellX, cellY, context, color, image){
    this.context = context;
    this.color = color;
    this.image = image;
    this.selected = false;
    this.cellX = cellX;
    this.cellY = cellY;
    this.x = (cellX * 3) * 21;
    this.y = (cellY * 3) * 21;
    this.direction = '';
    this.startTime = 0;
    this.firstMove = true;
}
Robot.prototype.selectedImage = document.getElementById('SelectR');
Robot.prototype.shadowImage = document.getElementById('ShadowR');
Robot.prototype.draw = function(){
    if (this.selected && !this.direction) {
        this.context.drawImage(this.selectedImage, this.x, this.y);
    } else {
        this.context.drawImage(this.shadowImage, this.x, this.y);
    }
    this.context.drawImage(this.image, this.x, this.y);
}
Robot.prototype.update = function(){
    if (this.direction){        
        var offset = offsetFromDir(this.direction);
        this.startTime++;
        var scalar = 1;
        if (scene.resetting) scalar = 2.5;
        this.x += offset.xOff * this.startTime * scalar;
        this.y += offset.yOff * this.startTime * scalar;
        if (this.inHomeCell()) {
            this.startTime = 0;
            this.x = (this.cellX * 3) * 21;
            this.y = (this.cellY * 3) * 21;
            this.direction = '';
            scene.botMoving = false;
            scene.checkMouseInRowCol()
        }
    }
}
Robot.prototype.rowTop = function(){
    return this.cellY * 3 * 21;
}
Robot.prototype.rowBottom = function(){
    return (this.cellY + 1) * 3 * 21;
}
Robot.prototype.colLeft = function(){
    return this.cellX * 3 * 21;
}
Robot.prototype.colRight = function(){
    return (this.cellX + 1) * 3 * 21;
}
Robot.prototype.inRowContaining = function(y){
    var topEdge = this.rowTop();
    var bottomEdge = this.rowBottom();
    return y > topEdge && y < bottomEdge;
}
Robot.prototype.inColContaining = function(x){
    var leftEdge = this.colLeft();
    var rightEdge = this.colRight();
    return x > leftEdge && x < rightEdge;
}
Robot.prototype.inTileContaining = function(x, y){
    return this.inRowContaining(y) && this.inColContaining(x)
}
Robot.prototype.moveTo = function(target){        
    if (target.cellX > this.cellX) this.direction = 'right';
    if (target.cellX < this.cellX) this.direction = 'left';
    if (target.cellY > this.cellY) this.direction = 'down';
    if (target.cellY < this.cellY) this.direction = 'up';
    
    if (this.firstMove) {        
        this.firstMove = false;
        var placeHolder = new BotPlaceholder(this.cellX, this.cellY, this.context, this.color);
        scene.placeholders.push(placeHolder)
    }

    this.cellX = target.cellX;
    this.cellY = target.cellY;
}
Robot.prototype.inHomeCell = function(){
    return this.inTileContaining(this.x+30, this.y+30);
}

// ==============  Bot Place Holders  =================

function BotPlaceholder(cellX, cellY, context, color){    
    this.context = context;
    this.image = document.getElementById(color + 'P');
    this.x = (cellX * 3 * 21) - 9;
    this.y = (cellY * 3 * 21) - 9;
}
BotPlaceholder.prototype.draw = function(){
    this.context.drawImage(this.image, this.x, this.y);
}

// ==================  Bot Targets  ===================

function BotTarget(cellX, cellY, context, bot){
    this.context = context;
    this.bot = bot;
    this.startX = bot.cellX;
    this.startY = bot.cellY;
    this.cellX = cellX;
    this.cellY = cellY;
    this.x = ((cellX * 3) + 1.5) * 21;
    this.y = ((cellY * 3) + 1.5) * 21;    
    switch (bot.color){
        case 'Red': this.color = "rgba(200, 50, 40, 0.5)"; break;
        case 'Yellow': this.color = "rgba(225, 160, 55, 0.5)"; break;
        case 'Blue': this.color = "rgba(60, 100, 190, 0.5)"; break;
        case 'Green': this.color = "rgba(100, 200, 100, 0.5)"; break;
    }
}
BotTarget.prototype.draw = function(){
    // line
    var center = cellCenter(this.startX, this.startY);
    this.context.strokeStyle = this.color;
    this.context.lineWidth = 8;
    this.context.beginPath();
    this.context.moveTo(center.x, center.y);
    this.context.lineTo(this.x, this.y);
    this.context.stroke();
    // circle
    var radius = 17;
    this.context.beginPath();
    this.context.arc(this.x, this.y, radius, 0, 2 * Math.PI, false);
    this.context.fillStyle = this.color;
    this.context.fill();
}

// =================  Round Targets  ==================

function RoundTarget(x, y, context, code){
    this.context = context;
    this.image = document.getElementById(code);
    this.x = x;
    this.y = y;
}
RoundTarget.prototype.draw = function(){
    this.context.drawImage(this.image, this.x, this.y);
}


// ======================  Game  ======================

function Game (scene, map, info){
    var _this = this;
    this.scene = scene;
    this.map = map;
    this.time = 0;
    this.DEBUG = false;
    this.interval = null;
}
Game.prototype.init = function(){
    this.map.init();
    this.map.drawMap();
    this.scene.init();
    this.scene.initGameMap();
    this.scene.newRound();
    this.interval = setInterval(this.updateGameArea, 16);
}
Game.prototype.updateGameArea = function(){
    _this = this.game;
        
    _this.time += 1/50;
    _this.scene.clear();
    
    if(_this.scene.roundTarget) _this.scene.roundTarget.draw();
    _this.scene.paths.forEach( function(path) { path.draw(); })
    _this.scene.placeholders.forEach( function(placeHolder) { placeHolder.draw(); })
    if (_this.scene.target) _this.scene.target.draw();
    _this.scene.robots.forEach( function(bot) { bot.update(); bot.draw(); })
}
//=====================================================
//			            On Load
//=====================================================
function startGame (){
    game = new Game(scene, map);
    game.init();
}