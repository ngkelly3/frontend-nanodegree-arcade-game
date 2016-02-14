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

// Player class
var Player = function() {

	// Use superclass Enemy to construct Player
	Enemy.call(this);
	this.sprite = 'images/char-boy.png';

	// Set initial position
	this.x = 200;
	this.y = 383;

};

Player.prototype.update = function(dt) {

	//checks if game was won
	this.reset();

};

Player.prototype.checkCollision = function() {

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

	//reset char position if reaches the water
	if (this.y < 0) {
		waterScore++;
		var delay = 10;
		setTimeout(function(){player.resetpos()}, delay);
	}
	if (this.checkCollision() == true) {
		this.resetpos();
		waterScore = 0;
	};

};

Player.prototype.resetpos = function() {

	// Reset player back to origin
	this.x = 200;
	this.y = 383;
};

var resetpos = function() {
	x = 200;
	y = 383
};

Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

Player.prototype.handleInput = function(key) {

	if (key == 'left' && this.x > 0) {
		this.x -= 101;
	};
	if (key == 'right' && this.x < 303) {
		this.x += 101;
	};
	if (key == 'up' && this.y > 0) {
		this.y -= 83;
	};
	if (key == 'down' && this.y < 357) {
		this.y += 83;
	};
};

function randomSpeed() {
	return Math.random()*500;
};

function randomRow() {

	var rowArray = [226, 143, 60]
    return rowArray[Math.floor(Math.random()*(3))];

};

// Initializing score
var waterScore = 0;

// Instantiate 4 enemies and player
var allEnemies = [];
for (i = 0; i < 4; i++) {
	allEnemies[i] = new Enemy(randomRow(), randomSpeed());
};

var player = new Player();


// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});
