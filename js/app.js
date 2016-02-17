// Enemies our player must avoid
var Enemy = function(y, speed) {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';

    // Setting the Enemy initial location
    this.y = y;
    this.x = -60;

	// Setting the Enemy speed
    this.speed = speed;

	// Collision Detection - Bounding Box
	this.width = 50;
	this.height = 50;

};

// Update the enemy's position
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {

    // Updates the Enemy location
	this.x = this.x + this.speed*dt;
	if (this.x > 505) {
		this.x = -60;
	};

	// Handles collision
	player.checkCollision();

};

// Draw the enemy on the screen
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

Enemy.prototype.reset = function() {

		this.speed = randomSpeed();
		this.y = randomRow();
		this.x = -60;

};

// Player class
var Player = function() {

	// Use superclass Enemy to construct Player
	Enemy.call(this);
	this.sprite = 'images/char-boy.png';

	// Set initial position
	this.x = 202;
	this.y = 375;
	this.prevX = 0;
	this.prevY = 0;
	this.index = 0;
	this.select = false;

};

Player.prototype.update = function(dt) {

	//checks if game was won
	this.reset();

};

Player.prototype.checkCollision = function() {

	// check enemy collision
	for (var i=0; i < allEnemies.length; i++) {
		if (this.x < allEnemies[i].x + allEnemies[i].width &&
			this.x + this.width > allEnemies[i].x &&
	   		this.y < allEnemies[i].y + allEnemies[i].height &&
	   		this.height + this.y > allEnemies[i].y) {
	    	// collision detected!
			// reset player position
			return true;
			break;
		};
	};

};

Player.prototype.reset = function() {

	// reset char position if reaches the water
	if (this.y < 0) {
		waterScore++;
		var delay = 10;
		setTimeout(function(){player.resetpos()}, delay);

		//reset enemy positions
		for (i=0; i < allEnemies.length; i++) {
			allEnemies[i].reset();
		};

		//reset item positions w/o overlap
		for (i = 0; i < 7; i++) {
			item[i].reset();
		};
		renderOverlap();
	}

	// reset score if hit enemy
	if (this.checkCollision() == true) {
		this.resetpos();
		waterScore = 0;
	};

};

Player.prototype.resetpos = function() {

	// Reset player back to origin
	this.x = 202;
	this.y = 375;
};

Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

Player.prototype.handleInput = function(key) {

	// Select character - nested if loops - code rotates without stopping abruptly
	if (this.select == false) {
		var chars = ['images/char-boy.png',
		'images/char-cat-girl.png',
		'images/char-horn-girl.png',
		'images/char-pink-girl.png',
		'images/char-princess-girl.png'];

		if (key == 'left' && this.index > 0 && this.index <= chars.length) {
			this.index = this.index - 1;
			this.sprite = chars[this.index];
		} else if (key == 'left' && this.index == 0) {
			this.index = chars.length - 1;
			this.sprite = chars[this.index];
		};
		if (key == 'right' && this.index >= 0 && this.index < chars.length-1) {
			this.index = this.index + 1;
			this.sprite = chars[this.index];
		} else if (key == 'right' && this.index == chars.length-1) {
			this.index = 0;
			this.sprite = chars[this.index];
		};
		if (key == 'enter') {
			this.select = true;
		};
	};

	// move player once character selected
	if (this.select == true) {

		// save state of current position before moving
		this.prevX = this.x;
		this.prevY = this.y;

		if (key == 'left' && this.x > 0) {
			this.x -= 101;
		};
		if (key == 'right' && this.x < 404) {
			this.x += 101;
		};
		if (key == 'up' && this.y > 0) {
			this.y -= 83;
		};
		if (key == 'down' && this.y < 357) {
			this.y += 83;
		};

	};

};

function randomSpeed() {
	return Math.random()*500;
};

function randomRow() {
	var rowArray = [226, 143, 60]
    return rowArray[Math.floor(Math.random()*(3))];
};


// Character Selector Code
// Logic:  Call charSelector from Player function (which is linked to engine.js)
// charSelector to return a sprite if "enter" is pushed
// remove charselector sprite
var charSelector = function() {
	this.sprite = 'images/Selector.png'; // receive input from .change function
	this.x = 202;
	this.y = 375;
};

charSelector.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Collectables Code

var collectItems = function(x, y) {
	this.sprite = randomItem(); // receive input from .change function
	this.x = x;
	this.y = y;
	this.width = 50;
	this.height = 50;
};

collectItems.prototype.update = function() {

	// Handles collision
	this.itemCollision()

};

collectItems.prototype.reset = function() {
	this.sprite = randomItem();
	this.x = randomItemLocX();
	this.y = randomItemLocY();

};

collectItems.prototype.itemCollision = function() {

 	if (player.x < this.x + this.width &&
		player.x + player.width > this.x &&
		player.y < this.y + this.height &&
		player.height + player.y > this.y) {
		// collision detected!
		// delete item
		if (this.sprite == 'images/Rock.png') {
			player.x = player.prevX;
			player.y = player.prevY;
		} else {
			itemScore++;

			// redo below properly, terrible way to make an item disappear
			this.x = -100;
		};
	};
};
collectItems.prototype.changeItemLoc = function() {
	this.x = randomItemLocX();
	this.y = randomItemLocY();
};

collectItems.prototype.render = function() {

    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);

};

function randomItem() {
	var item = ['images/Gem_Blue.png',
        'images/Gem_Green.png',
        'images/Gem_Orange.png',
        'images/Heart.png',
        'images/Key.png',
        'images/Rock.png',
        'images/Star.png'];

    return item[Math.floor(Math.random()*7)];
};
function randomItemLocX() {
	var x = [0, 101, 202, 303, 404];
	return x[Math.floor(Math.random()*5)];
};
function randomItemLocY() {
	var y = [63, 146, 229];
	return y[Math.floor(Math.random()*3)];

};

// check overlap function
function checkOverlap() {
	mainLoop:
	for (i = 0; i < item.length; i++) {
		for (j = 0; j < item.length; j++) {
			if (item[i].x == item[j].x && item[i].y == item[j].y && i != j) {
				return true;
				break mainLoop;
			};
		};
	};
	return false;
};

function renderOverlap() {
	while (checkOverlap() == true) {
		for (i = 0; i < 7; i++) {
			item[i].changeItemLoc();
		};
	};
};

// Initializing score
var waterScore = 0;
var itemScore = 0;


// Instantiate 4 enemies and player
var allEnemies = [];
for (i = 0; i < 4; i++) {
	allEnemies[i] = new Enemy(randomRow(), randomSpeed());
};

// Instantiate new items
var item = [];
for (i = 0; i < 7; i++) {
	item[i] = new collectItems(randomItemLocX(), randomItemLocY());
};
// Re-render items if overlap exists
renderOverlap();

var charselector = new charSelector();
var player = new Player();

// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down',
        13: 'enter'
    };

    player.handleInput(allowedKeys[e.keyCode]);

});
