/*

The Game Project

2b - using variables

*/

var floorPos_y;

var gameChar_x;
var gameChar_y;

var trees = [];
var numTrees = 3;

var canyon;
var collectable;

var mountain;
var clouds = [];
var numClouds = 3;


function setup() {
	createCanvas(1024, 576);
	floorPos_y = 432; //NB. we are now using a variable for the floor position

	//NB. We are now using the built in variables height and width
	gameChar_x = width / 2;
	gameChar_y = floorPos_y;

	canyon = { x_pos: 80, y_pos: floorPos_y, widthTop: 120, widthBottom: 60 };

	for (var i = 0; i < numTrees; i++) {
		var tree = { x_pos: random((canyon.x_pos + canyon.widthTop / 2 + 1), width - 50), y_pos: floorPos_y, height: 120, trunkHeight: 40, trunkWidth: 20 };
		trees.push(tree);
	}

	collectable = { x_pos: random((canyon.x_pos + canyon.widthTop / 2 + 1), width - 50), y_pos: floorPos_y + 50, scale: 1.5, facetWidth: 8, facetHeight: 5 };

	mountain = { x_pos: 600, y_pos: floorPos_y, height: 175, width: 250 };

	for (var i = 0; i < numClouds; i++) {
		var cloud = { x_pos: random(75, width - 75), y_pos: random(80, height / 3), width: 75, height: 65 };
		clouds.push(cloud);
	}
}

function draw() {
	background(100, 155, 255); //fill the sky blue

	noStroke();
	fill(0, 155, 0);
	rect(0, floorPos_y, width, height); //draw some green ground

	//	draw mountain
	drawMountain();

	//	draw clouds
	for (var i = 0; i < numClouds; i++) {
		drawCloud(clouds[i]);
	}

	//	draw a canyon
	drawCanyon();

	//	draw 3 tree
	for (var i = 0; i < numTrees; i++) {
		drawTree(trees[i]);
	}

	//	draw collectable second to last
	drawGem();

	//	draw the character last!
	drawChar();
}

function mousePressed() {
	gameChar_x = mouseX;
	gameChar_y = mouseY;
}

function drawChar() {
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

function drawTree(tree) {

	console.log(`drawing tree: ${tree.x_pos}`);
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

function drawCloud(cloud) {
	noStroke();

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

function drawMountain() {
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

//	draw snowcap
function drawSnowCap(x, y, width, height, heightFactor) {
	noStroke();
	fill(255, 255, 255, 180);
	//	calculate the angles
	var snowHeight = height * heightFactor;
	// console.log(`snowHeight: ${snowHeight}`);
	var angle = atan(height / (width / 2));
	// console.log(`angle: ${angle}`);
	var snowWidth = snowHeight / tan(angle);
	// console.log(`snowWidth: ${snowWidth}`);
	triangle(x - snowWidth, y - (height - snowHeight),
		x, y - height,
		x + snowWidth, y - (height - snowHeight));
}