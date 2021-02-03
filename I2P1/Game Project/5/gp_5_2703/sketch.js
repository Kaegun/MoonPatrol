/*

The Game Project 5 - Bring it all together

*/

var gameChar_x;
var gameChar_y;
var floorPos_y;
var scrollPos;
var gameChar_world_x;

var isLeft;
var isRight;
var isJumping;
var isFalling;
var isPlummeting;
var isDead;

var score = 0;

var canyons = [];
var collectables = [];
var mountains = [];
var clouds = [];
var trees = [];

const numTrees = 15;
const numClouds = 8;
const numMountains = 3;
const numCanyons = 3;
const numCollectables = 3;

const maximumCloudHeight = 80;
const cloudWidth = 75;
const cloudHeight = 60;

const viewWidth = 1024;
const gameWorld_x = viewWidth * 5;

var maxJumpHeight;
const moveSpeed = 3;
const jumpSpeed = 3;
const fallSpeed = 6;

const winText = 'YAY!!';
const gameOverText = 'Game Over - Press ESC to restart';

function setup() {
	createCanvas(viewWidth, 576);
	floorPos_y = height * 3 / 4;
	gameChar_x = width / 2;
	gameChar_y = floorPos_y;
	maxJumpHeight = floorPos_y - 100;

	// Variable to control the background scrolling.
	scrollPos = 0;

	// Variable to store the real position of the gameChar in the game
	// world. Needed for collision detection.
	gameChar_world_x = gameChar_x - scrollPos;

	// Boolean variables to control the movement of the game character.
	isLeft = false;
	isRight = false;
	isFalling = false;
	isPlummeting = false;

	// Initialise arrays of scenery objects.
	//	Set up other objects
	createCanyons();

	createMountains();

	createClouds();

	createTrees();

	createCollectables();

	resetGame();
}

function draw() {
	background(0, 191, 255); // fill the sky blue

	noStroke();
	fill(0, 155, 0);
	rect(0, floorPos_y, width, height / 4); // draw some green ground

	push();
	//try parallax scroll
	translate(scrollPos / 10, 0);

	// Draw mountains.
	drawMountains();
	pop();

	push();
	translate(scrollPos / 3, 0);

	// Draw clouds.
	drawClouds();

	pop();

	push();
	translate(scrollPos, 0);

	// Draw canyons.
	drawCanyons();

	// Draw trees.
	drawTrees();

	// Draw collectable items.
	drawCollectables();

	pop();

	// Draw game character.

	drawGameChar();

	// Logic to make the game character move or the background scroll.

	if (isPlummeting) {
		gameChar_y = min(height, gameChar_y + 5);
		isDead = true;
	}
	else {
		if (isLeft) {
			if (gameChar_x > width * 0.2) {
				gameChar_x -= moveSpeed;
			}
			else {
				scrollPos += moveSpeed;
			}
		}

		if (isRight) {
			if (gameChar_x < width * 0.8) {
				gameChar_x += moveSpeed;
			}
			else {
				scrollPos -= moveSpeed; // negative for moving against the background
			}
		}

		// Logic to make the game character rise and fall.
		if (isFalling) {
			gameChar_y = min(gameChar_y + fallSpeed, floorPos_y);
			if (gameChar_y == floorPos_y)
				isFalling = false;
		}

		if (isJumping) {
			gameChar_y = max(gameChar_y - jumpSpeed, maxJumpHeight);
			if (gameChar_y == maxJumpHeight) {
				isFalling = true;
				isJumping = false;
			}
		}
	}

	//	Fall into the canyon
	// if (!isJumping && !isFalling) {
	// 	for (var y = 0; y < numCanyons; y++)
	// 		if (checkCanyon(canyons[y])) {
	// 			isPlummeting = true;
	// 			break;
	// 		}
	// }

	//	check for gem collision
	for (var c = 0; c < numCollectables; c++) {
		if (!collectables[c].isFound && checkCollectable(collectables[c])) {
			collectables[c].isFound = true;
			score += 100;
		}
		else if (collectables[c].isFound && collectables[c].winText_y > height / 2) {
			drawWinText(collectables[c].winText_y);
			collectables[c].winText_y -= 10;
		}
	}

	if (isDead) {
		//	Show Game Over Text
		drawGameOver();
	}

	drawScore();

	// Update real position of gameChar for collision detection.
	gameChar_world_x = gameChar_x - scrollPos;
}

// ---------------------
// Set up background items
// ---------------------
function createTrees() {
	//	Trees can be anywhere in the gameworld, except overlapping with a canyon.
	for (var i = 0; i < numTrees; i++) {
		var tree = { x_pos: random(0, gameWorld_x), y_pos: floorPos_y, height: 120, trunkHeight: 40, trunkWidth: 20 };
		trees.push(tree);
	}
}

function createClouds() {
	for (var i = 0; i < numClouds; i++) {
		var cloud = { x_pos: random(cloudWidth, gameWorld_x - cloudWidth), y_pos: random(maximumCloudHeight, height / 3), width: cloudWidth, height: cloudHeight };
		clouds.push(cloud);
	}
}

function createMountains() {
	for (var i = 0; i < numMountains; i++) {
		mountains[i] = { x_pos: 600 + (i * gameWorld_x / numMountains), y_pos: floorPos_y, height: 175, width: 250 };
	}
}

function createCanyons() {
	//	TODO: Come up with a nice algorithm for the canyons
	for (var i = 0; i < numCanyons; i++) {
		canyons[i] = { x_pos: random(width / 2, width) + i * (gameWorld_x / numCanyons), y_pos: floorPos_y, widthTop: 120, widthBottom: 60 };
	}
}

// ---------------------
// Create the collectables
// ---------------------
function createCollectables() {
	for (var i = 0; i < numCollectables; i++) {
		while (true) {
			collectables[i] = { x_pos: random(width / 2, width) + i * (gameWorld_x / numCollectables), y_pos: floorPos_y + 20, scale: 1.5, facetWidth: 8, facetHeight: 5, isFound: false, winText_y: 0 };
			// TODO:	ensure gem is not too close to player && check collectable is not in a canyon
			if (!checkCollectable(collectables[i]))
				break;
		}
	}
}

// ---------------------
// Reset the game
// ---------------------
function resetGame() {
	gameChar_x = 50;
	gameChar_y = floorPos_y;
	scrollPos = 0;
	score = 0;

	gameChar_world_x = gameChar_x;

	isDead = false;
	isPlummeting = false;
	isFalling = false;
	isJumping = false;
	for (var c = 0; c < numCollectables; c++) {
		collectables[c].isFound = false;
		collectables[c].winText_y = gameChar_y - 10;
	}
}

// ---------------------
// Key control functions
// ---------------------

function keyPressed() {
	// if statements to control the animation of the character when
	// keys are pressed.

	//open up the console to see how these work
	// console.log("keyPressed: " + key);
	// console.log("keyPressed: " + keyCode);
	switch (keyCode) {
		case 37:	//	Left Arrow
			isLeft = true;
			break;
		case 39:	//	Right Arrow
			isRight = true;
			break;
		case 32:	//	Spacebar
			if (!isJumping && !isPlummeting)
				isJumping = true;
			break;
		case 27:	//	ESC
			//	Need to redraw all items and reset positions
			resetGame();
			break;
	}
}

function keyReleased() {
	// if statements to control the animation of the character when
	// keys are released.

	// console.log("keyReleased: " + key);
	// console.log("keyReleased: " + keyCode);
	switch (keyCode) {
		case 37:	//	Left Arrow
			isLeft = false;
			break;
		case 39:	//	Right Arrow
			isRight = false;
			break;
		case 32:	//	Spacebar
			//isJumping = false;
			break;
	}
}

// ------------------------------
// Game character render function
// ------------------------------

// Function to draw the game character.

function drawGameChar() {
	// draw game character

	if (isLeft && (isFalling || isJumping)) {
		// add your jumping-left code
		drawCharJumpLeft();
	}
	else if (isRight && (isFalling || isJumping)) {
		// add your jumping-right code
		drawCharJumpRight();
	}
	else if (isLeft) {
		// add your walking left code
		drawCharWalkLeft();
	}
	else if (isRight) {
		// add your walking right code
		drawCharWalkRight();
	}
	else if (isJumping || isFalling || isPlummeting) {
		// add your jumping facing forwards code
		drawCharJumpForward();
	}
	else {
		// add your standing front facing code
		drawCharStanding();
	}
}


function drawCharStanding() {
	noStroke(0);
	fill(189, 183, 107);
	ellipse(gameChar_x, gameChar_y - 63, 18, 25);
	fill(128, 0, 0);
	ellipse(gameChar_x, gameChar_y - 43, 30, 22);
	rect(gameChar_x - 10, gameChar_y - 38, 20, 20);
	fill(189, 183, 107);
	rect(gameChar_x - 15, gameChar_y - 44, 3, 12);
	rect(gameChar_x + 12, gameChar_y - 44, 3, 12);
	fill(255, 215, 0);
	rect(gameChar_x - 10, gameChar_y - 30, 20, 5);
	fill(139, 69, 19);
	rect(gameChar_x - 11, gameChar_y - 18, 8, 18);
	rect(gameChar_x + 3, gameChar_y - 18, 8, 18);
	//	face
	fill(0, 0, 255);
	ellipse(gameChar_x - 4, gameChar_y - 66, 2, 2);
	ellipse(gameChar_x + 4, gameChar_y - 66, 2, 2);
	stroke(255, 0, 0);
	line(gameChar_x - 3, gameChar_y - 60, gameChar_x + 3, gameChar_y - 60);
}

function drawCharJumpLeft() {
	fill(189, 183, 107);
	ellipse(gameChar_x, gameChar_y - 63, 18, 25);
	fill(128, 0, 0);
	ellipse(gameChar_x, gameChar_y - 43, 20, 22);
	rect(gameChar_x - 7, gameChar_y - 38, 14, 20);
	fill(189, 183, 107);
	rect(gameChar_x - 2, gameChar_y - 56, 3, 12);
	fill(255, 215, 0);
	rect(gameChar_x - 7, gameChar_y - 30, 14, 5);
	fill(139, 69, 19);
	rect(gameChar_x - 21, gameChar_y - 21, 18, 8);
	rect(gameChar_x + 3, gameChar_y - 21, 18, 8);
	//	face
	fill(0, 0, 255);
	ellipse(gameChar_x - 4, gameChar_y - 66, 2, 2);
	stroke(255, 0, 0);
	line(gameChar_x - 8, gameChar_y - 60, gameChar_x - 3, gameChar_y - 60);
}

function drawCharJumpRight() {
	fill(189, 183, 107);
	ellipse(gameChar_x, gameChar_y - 63, 18, 25);
	fill(128, 0, 0);
	ellipse(gameChar_x, gameChar_y - 43, 20, 22);
	rect(gameChar_x - 7, gameChar_y - 38, 14, 20);
	fill(189, 183, 107);
	rect(gameChar_x - 2, gameChar_y - 56, 3, 12);
	fill(255, 215, 0);
	rect(gameChar_x - 7, gameChar_y - 30, 14, 5);
	fill(139, 69, 19);
	rect(gameChar_x - 21, gameChar_y - 21, 18, 8);
	rect(gameChar_x + 3, gameChar_y - 21, 18, 8);
	//	face
	fill(0, 0, 255);
	ellipse(gameChar_x + 4, gameChar_y - 66, 2, 2);
	stroke(255, 0, 0);
	line(gameChar_x + 3, gameChar_y - 60, gameChar_x + 8, gameChar_y - 60);
}

function drawCharWalkLeft() {
	fill(189, 183, 107);
	ellipse(gameChar_x, gameChar_y - 63, 18, 25);
	fill(128, 0, 0);
	ellipse(gameChar_x, gameChar_y - 43, 20, 22);
	rect(gameChar_x - 7, gameChar_y - 38, 14, 20);
	fill(189, 183, 107);
	rect(gameChar_x - 2, gameChar_y - 44, 3, 12);
	fill(255, 215, 0);
	rect(gameChar_x - 7, gameChar_y - 30, 14, 5);
	fill(139, 69, 19);
	rect(gameChar_x - 21, gameChar_y - 21, 18, 8);
	rect(gameChar_x + 3, gameChar_y - 18, 8, 18);
	//	face
	fill(0, 0, 255);
	ellipse(gameChar_x - 4, gameChar_y - 66, 2, 2);
	stroke(255, 0, 0);
	line(gameChar_x - 8, gameChar_y - 60, gameChar_x - 3, gameChar_y - 60);
}

function drawCharWalkRight() {
	fill(189, 183, 107);
	ellipse(gameChar_x, gameChar_y - 63, 18, 25);
	fill(128, 0, 0);
	ellipse(gameChar_x, gameChar_y - 43, 20, 22);
	rect(gameChar_x - 7, gameChar_y - 38, 14, 20);
	fill(189, 183, 107);
	rect(gameChar_x - 2, gameChar_y - 44, 3, 12);
	fill(255, 215, 0);
	rect(gameChar_x - 7, gameChar_y - 30, 14, 5);
	fill(139, 69, 19);
	rect(gameChar_x - 11, gameChar_y - 18, 8, 18);
	rect(gameChar_x + 3, gameChar_y - 21, 18, 8);
	//	face
	fill(0, 0, 255);
	ellipse(gameChar_x + 4, gameChar_y - 66, 2, 2);
	stroke(255, 0, 0);
	line(gameChar_x + 3, gameChar_y - 60, gameChar_x + 8, gameChar_y - 60);
}

function drawCharJumpForward() {
	fill(189, 183, 107);
	ellipse(gameChar_x, gameChar_y - 63, 18, 25);
	fill(128, 0, 0);
	ellipse(gameChar_x, gameChar_y - 43, 30, 22);
	rect(gameChar_x - 10, gameChar_y - 38, 20, 20);
	fill(189, 183, 107);
	rect(gameChar_x - 15, gameChar_y - 56, 3, 12);
	rect(gameChar_x + 12, gameChar_y - 56, 3, 12);
	fill(255, 215, 0);
	rect(gameChar_x - 10, gameChar_y - 30, 20, 5);
	fill(139, 69, 19);
	rect(gameChar_x - 21, gameChar_y - 23, 18, 8);
	rect(gameChar_x + 3, gameChar_y - 23, 18, 8);
	//	face
	fill(0, 0, 255);
	ellipse(gameChar_x - 4, gameChar_y - 66, 2, 2);
	ellipse(gameChar_x + 4, gameChar_y - 66, 2, 2);
	stroke(255, 0, 0);
	line(gameChar_x - 3, gameChar_y - 60, gameChar_x + 3, gameChar_y - 60);
}

// ---------------------------
// Background render functions
// ---------------------------

// Function to draw cloud objects.
function drawClouds() {

	for (var i = 0; i < numClouds; i++) {
		noStroke();

		var cloud = clouds[i];
		//	cloud shadows
		fill(125, 125, 125);
		ellipse(cloud.x_pos, cloud.y_pos + 5, cloud.width, cloud.height);
		ellipse(cloud.x_pos - 50, cloud.y_pos, cloud.width - 10, cloud.height - 10);
		ellipse(cloud.x_pos + 50, cloud.y_pos, cloud.width - 10, cloud.height - 10);

		fill(255);
		ellipse(cloud.x_pos, cloud.y_pos, cloud.width, cloud.height);
		ellipse(cloud.x_pos - 50, cloud.y_pos - 5, cloud.width - 10, cloud.height - 10);
		ellipse(cloud.x_pos + 50, cloud.y_pos - 5, cloud.width - 10, cloud.height - 10);
		ellipse(cloud.x_pos, cloud.y_pos - 30, cloud.width - 10, cloud.height - 10);
	}
}

// Function to draw mountains objects.
function drawMountains() {
	for (var i = 0; i < numMountains; i++) {

		var mountain = mountains[i];
		stroke(0);
		fill(125, 125, 125);
		triangle(mountain.x_pos - mountain.width, mountain.y_pos,
			mountain.x_pos - mountain.width / 2, mountain.y_pos - mountain.height * 0.4,
			mountain.x_pos, mountain.y_pos);

		drawSnowCap(mountain.x_pos - mountain.width / 2, mountain.y_pos, mountain.width, mountain.height * 0.4, 0.2);

		stroke(0);
		fill(125, 125, 125);
		triangle(mountain.x_pos, mountain.y_pos,
			mountain.x_pos + mountain.width / 2, mountain.y_pos - mountain.height * 0.4,
			mountain.x_pos + mountain.width, mountain.y_pos);

		drawSnowCap(mountain.x_pos + mountain.width / 2, mountain.y_pos, mountain.width, mountain.height * 0.4, 0.2);

		stroke(0);
		fill(125, 125, 125);
		triangle(mountain.x_pos - mountain.width / 2, mountain.y_pos,
			mountain.x_pos, mountain.y_pos - mountain.height,
			mountain.x_pos + mountain.width / 2, mountain.y_pos);

		drawSnowCap(mountain.x_pos, mountain.y_pos, mountain.width, mountain.height, 0.2);
	}
}

//	draw snowcap
function drawSnowCap(x, y, width, height, heightFactor) {
	noStroke();
	fill(255, 255, 255, 180);
	//	calculate the angles
	var snowHeight = height * heightFactor;
	var angle = atan(height / (width / 2));
	var snowWidth = snowHeight / tan(angle);
	triangle(x - snowWidth, y - (height - snowHeight),
		x, y - height,
		x + snowWidth, y - (height - snowHeight));
}

// Function to draw trees objects.
function drawTrees() {

	for (var t = 0; t < numTrees; t++) {

		var tree = trees[t];

		var treeLeft = tree.x_pos - tree.trunkWidth / 2;
		stroke(0);
		fill(139, 69, 19);

		rect(treeLeft, tree.y_pos - tree.trunkHeight, tree.trunkWidth, tree.trunkHeight);
		for (var i = 0; i < tree.trunkWidth; i += 5) {
			line(treeLeft + i + 5, tree.y_pos - 3, treeLeft + i + 5, tree.y_pos - tree.trunkHeight + 3);
		}

		fill(85, 107, 47);
		var branchStart = tree.y_pos - tree.trunkHeight;
		for (var i = 0; i < 3; i++) {
			var branchWidth = (tree.trunkWidth + 5) - (i * 5);
			var branchHeight = (tree.height / ((i + 1) * 2));
			triangle(tree.x_pos - branchWidth, branchStart, tree.x_pos + branchWidth, branchStart, tree.x_pos, branchStart - branchHeight);
			branchStart = branchStart - branchHeight + 10 - (i + 1) ^ 2;
		}
	}
}

// ---------------------------------
// Canyon render and check functions
// ---------------------------------

// Function to draw canyon objects.
//	TODO: Pass in canyon
function drawCanyons() {
	for (var c = 0; c < numCanyons; c++) {
		drawCanyon(canyons[c]);

		checkCanyon(canyons[c]);
	}
}

function drawCanyon(canyon) {
	noStroke(0);
	fill(160, 82, 45);
	quad(canyon.x_pos - canyon.widthTop / 2, canyon.y_pos,
		canyon.x_pos + canyon.widthTop / 2, canyon.y_pos,
		canyon.x_pos + canyon.widthBottom / 2, height,
		canyon.x_pos - canyon.widthBottom / 2, height);

	//	draw some stuff in the bottom of the canyon
	fill(218, 165, 32);
	for (var i = 0; i < 3; i++) {
		var offset = canyon.x_pos - canyon.widthBottom / 2 + i * 15;
		triangle(offset + 10, height, offset + 20, height, offset + 15, height - 15);
	}
}

// Function to check character is over a canyon.

function checkCanyon(t_canyon) {
	//	console.log(`distance to canyon ${dist(gameChar_world_x, gameChar_y, t_canyon.x_pos, t_canyon.y_pos)}`);
	//	Fall into the canyon
	if (!isJumping && !isFalling) {
		if (dist(gameChar_world_x, gameChar_y, t_canyon.x_pos, t_canyon.y_pos) < t_canyon.widthTop / 2)
			isPlummeting = true;
	}
}

// ----------------------------------
// Collectable items render and check functions
// ----------------------------------

// Function to draw collectable objects.
function drawCollectables() {
	for (var i = 0; i < numCollectables; i++) {
		if (!collectables[i].isFound)
			drawCollectable(collectables[i]);
	}
}

function drawCollectable(t_collectable) {
	stroke(255);
	fill(0, 255, 255, 150);

	triangle(t_collectable.x_pos, t_collectable.y_pos,
		t_collectable.x_pos - t_collectable.facetWidth * t_collectable.scale, t_collectable.y_pos - (20 + t_collectable.facetHeight) * t_collectable.scale,
		t_collectable.x_pos + t_collectable.facetWidth * t_collectable.scale, t_collectable.y_pos - (20 + t_collectable.facetHeight) * t_collectable.scale);
	triangle(t_collectable.x_pos, t_collectable.y_pos,
		t_collectable.x_pos - t_collectable.facetWidth * t_collectable.scale, t_collectable.y_pos - (20 + t_collectable.facetHeight) * t_collectable.scale,
		t_collectable.x_pos - t_collectable.facetWidth * 2 * t_collectable.scale, t_collectable.y_pos - (20 + t_collectable.facetHeight * 2) * t_collectable.scale);
	triangle(t_collectable.x_pos, t_collectable.y_pos,
		t_collectable.x_pos + t_collectable.facetWidth * t_collectable.scale, t_collectable.y_pos - (20 + t_collectable.facetHeight) * t_collectable.scale,
		t_collectable.x_pos + t_collectable.facetWidth * 2 * t_collectable.scale, t_collectable.y_pos - (20 + t_collectable.facetHeight * 2) * t_collectable.scale);
	triangle(t_collectable.x_pos - t_collectable.facetWidth * 2 * t_collectable.scale, t_collectable.y_pos - (20 + t_collectable.facetHeight * 2) * t_collectable.scale,
		t_collectable.x_pos, t_collectable.y_pos - (20 + t_collectable.facetHeight * 3) * t_collectable.scale,
		t_collectable.x_pos - t_collectable.facetWidth * t_collectable.scale, t_collectable.y_pos - (20 + t_collectable.facetHeight) * t_collectable.scale);
	triangle(t_collectable.x_pos - t_collectable.facetWidth * t_collectable.scale, t_collectable.y_pos - (20 + t_collectable.facetHeight) * t_collectable.scale,
		t_collectable.x_pos, t_collectable.y_pos - (20 + t_collectable.facetHeight * 3) * t_collectable.scale,
		t_collectable.x_pos + t_collectable.facetWidth * t_collectable.scale, t_collectable.y_pos - (20 + t_collectable.facetHeight) * t_collectable.scale);
	triangle(t_collectable.x_pos + t_collectable.facetWidth * t_collectable.scale, t_collectable.y_pos - (20 + t_collectable.facetHeight) * t_collectable.scale,
		t_collectable.x_pos, t_collectable.y_pos - (20 + t_collectable.facetHeight * 3) * t_collectable.scale,
		t_collectable.x_pos + t_collectable.facetWidth * 2 * t_collectable.scale, t_collectable.y_pos - (20 + t_collectable.facetHeight * 2) * t_collectable.scale);

	// clear the lines
	noStroke();
}

// Function to check character has collected an item.

function checkCollectable(t_collectable) {
	var distToPlayer = dist(t_collectable.x_pos, t_collectable.y_pos, gameChar_world_x, gameChar_y);
	//	console.log(`Distance to Player: ${distToPlayer}`);
	return distToPlayer < 30;
}

//	Function to show collected text
function drawWinText(winText_y) {
	textSize(50);
	fill(255, 0, 0);
	text(winText, gameChar_x - textWidth(winText) / 2, winText_y);
}

//	function for death of player
function drawGameOver() {
	textSize(50);
	fill(255, 0, 0);
	text(gameOverText, width / 2 - textWidth(gameOverText) / 2, height / 2);
}

function drawScore() {
	textSize(50);
	fill(255);
	text(`SCORE: ${score}`, 50, 75);
}