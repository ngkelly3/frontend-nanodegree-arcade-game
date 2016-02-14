// Enemies our player must avoid
var Enemy = function(x, y, speed) {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';
    this.x = x;
    this.y = y;
    this.speed = speed;
    // Setting the Enemy initial location (you need to implement)
	// Setting the Enemy speed (you need to implement)

	// Collision Detection - Bounding Box
	this.width = 50;
	this.height = 50;
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.

    // Updates the Enemy location (you need to implement)
	// Handles collision with the Player (you need to implement)
	this.x = this.x + this.speed*dt;
	if (this.x > 505) {
		this.x = 0;
	};

	// reset char position if reaches the water
	if (player.y < 0) {
		var delay = 250;
		setTimeout(function(){player.reset(200,383)}, delay);
	};

};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.

var Player = function(x, y) {

	// Use superclass Enemy to construct Player
	Enemy.call(this, x, y);
	this.sprite = 'images/char-boy.png';

};

Player.prototype.update = function(dt) {
	player.checkCollision();
};

Player.prototype.checkCollision = function() {

	for (var i=0; i < allEnemies.length; i++) {
		if (this.x < allEnemies[i].x + allEnemies[i].width &&
			this.x + this.width > allEnemies[i].x &&
	   		this.y < allEnemies[i].y + allEnemies[i].height &&
	   		this.height + this.y > allEnemies[i].y) {
	    	// collision detected!
			// reset player position
			this.reset(200,383);
			break;
		};
	};
};

Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

Player.prototype.handleInput = function(key) {
	// redo with canvas.width and canvas.height
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
Player.prototype.reset = function(x,y) {
	this.x = x;
	this.y = y;
}

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player

var allEnemies = [];
first = new Enemy(0,60,500);
second = new Enemy(0,143,200);
third = new Enemy(0,226,400);
allEnemies.push(first, second, third);

var player = new Player(100,300);


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
