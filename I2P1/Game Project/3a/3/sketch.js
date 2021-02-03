/*

The Game Project

Week 3

Game interaction

*/

var gameChar_x;
var gameChar_y;
var floorPos_y;
var isLeft = false;
var isRight = false;
var isFalling = false;
var isJumping = false;
var isPlummeting = false;
var isDead = false;

var canyon;
var collectable;

var maxJumpHeight;
const moveSpeed = 3;
const jumpSpeed = 3;
const fallSpeed = 6;

function setup() {
	createCanvas(1024, 576);
	floorPos_y = height * 3 / 4;
	resetGameChar();

	maxJumpHeight = floorPos_y - 50;

	//	Set up other objects
	canyon = { x_pos: 80, y_pos: floorPos_y, widthTop: 120, widthBottom: 60 };

}

function draw() {

	///////////DRAWING CODE//////////

	background(100, 155, 255); //fill the sky blue


	noStroke();
	fill(0, 155, 0);
	rect(0, floorPos_y, width, height - floorPos_y); //draw some green ground

	//draw the canyon
	drawCanyon();

	//the game character
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

	///////////INTERACTION CODE//////////
	//Put conditional statements to move the game character below here

	console.log(`isPlummeting: ${isPlummeting}`);
	if (isPlummeting) {
		gameChar_y = min(height, gameChar_y + 5);
		console.log(`gameChar_y: ${gameChar_y}`);
		isDead = true;
	}
	else {
		if (isLeft) {
			gameChar_x = max(5, gameChar_x - moveSpeed);
		}

		if (isRight) {
			gameChar_x = min(width - 5, gameChar_x + moveSpeed);
		}

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
	if (!isJumping
		&& (gameChar_x > (canyon.x_pos - canyon.widthTop / 2)
			&& gameChar_x < (canyon.x_pos + canyon.widthTop / 2))) {
		isPlummeting = true;
	}

	if (isDead) {
		//	Show Game Over Text
		drawGameOver();
	}
}

function resetGameChar() {
	gameChar_x = width / 2;
	gameChar_y = floorPos_y;
}

function keyPressed() {
	// if statements to control the animation of the character when
	// keys are pressed.

	//open up the console to see how these work
	console.log("keyPressed: " + key);
	console.log("keyPressed: " + keyCode);
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
			resetGameChar();
			isDead = false;
			isPlummeting = false;
			break;
	}
}

function keyReleased() {
	// if statements to control the animation of the character when
	// keys are released.

	console.log("keyReleased: " + key);
	console.log("keyReleased: " + keyCode);
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

function drawCanyon() {
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

function drawGem() {
	stroke(255);
	fill(0, 255, 255, 150);

	triangle(collectable.x_pos, collectable.y_pos,
		collectable.x_pos - collectable.facetWidth * collectable.scale, collectable.y_pos - (20 + collectable.facetHeight) * collectable.scale,
		collectable.x_pos + collectable.facetWidth * collectable.scale, collectable.y_pos - (20 + collectable.facetHeight) * collectable.scale);
	triangle(collectable.x_pos, collectable.y_pos,
		collectable.x_pos - collectable.facetWidth * collectable.scale, collectable.y_pos - (20 + collectable.facetHeight) * collectable.scale,
		collectable.x_pos - collectable.facetWidth * 2 * collectable.scale, collectable.y_pos - (20 + collectable.facetHeight * 2) * collectable.scale);
	triangle(collectable.x_pos, collectable.y_pos,
		collectable.x_pos + collectable.facetWidth * collectable.scale, collectable.y_pos - (20 + collectable.facetHeight) * collectable.scale,
		collectable.x_pos + collectable.facetWidth * 2 * collectable.scale, collectable.y_pos - (20 + collectable.facetHeight * 2) * collectable.scale);
	triangle(collectable.x_pos - collectable.facetWidth * 2 * collectable.scale, collectable.y_pos - (20 + collectable.facetHeight * 2) * collectable.scale,
		collectable.x_pos, collectable.y_pos - (20 + collectable.facetHeight * 3) * collectable.scale,
		collectable.x_pos - collectable.facetWidth * collectable.scale, collectable.y_pos - (20 + collectable.facetHeight) * collectable.scale);
	triangle(collectable.x_pos - collectable.facetWidth * collectable.scale, collectable.y_pos - (20 + collectable.facetHeight) * collectable.scale,
		collectable.x_pos, collectable.y_pos - (20 + collectable.facetHeight * 3) * collectable.scale,
		collectable.x_pos + collectable.facetWidth * collectable.scale, collectable.y_pos - (20 + collectable.facetHeight) * collectable.scale);
	triangle(collectable.x_pos + collectable.facetWidth * collectable.scale, collectable.y_pos - (20 + collectable.facetHeight) * collectable.scale,
		collectable.x_pos, collectable.y_pos - (20 + collectable.facetHeight * 3) * collectable.scale,
		collectable.x_pos + collectable.facetWidth * 2 * collectable.scale, collectable.y_pos - (20 + collectable.facetHeight * 2) * collectable.scale);
}

function drawGameOver() {
	textSize(50);
	fill(255, 0, 0);
	text('Game Over - Press ESC to restart', width / 2 - 300, height / 2);
}