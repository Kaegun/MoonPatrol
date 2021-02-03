/*

The Game Project

1 - Background Scenery

Use p5 drawing functions such as rect, ellipse, line, triangle and
point to draw the scenery as set out in the code comments. The items
should appear next to the text titles.

Each bit of scenery is worth two marks:

0 marks = not a reasonable attempt
1 mark = attempted but it's messy or lacks detail
2 marks = you've used several shape functions to create the scenery

I've given titles and chosen some base colours, but feel free to
imaginatively modify these and interpret the scenery titles loosely to
match your game theme.


WARNING: Do not get too carried away. If you're shape takes more than 5 lines
of code to draw then you've probably over done it.

*/

var groundStart = 432;
var screenHeight = 576;

function setup() {
	createCanvas(1024, screenHeight);
}

function draw() {
	background(0, 191, 255);

	//	draw the ground
	drawGround();

	//1. a cloud in the sky
	//... add your code here
	drawCloud(200, 100);
	drawCloud(720, 120);
	drawCloud(480, 80);

	//2. a mountain in the distance
	//... add your code here
	drawMountain();

	//3. a tree
	//... add your code here
	drawTree(800);
	drawTree(870);
	drawTree(960);

	//4. a canyon
	//NB. the canyon should go from ground-level to the bottom of the screen
	//... add your code here
	drawCanyon(100);

	//5. a collectable token - eg. a jewel, fruit, coins
	//... add your code here
	drawGem(450, groundStart);
}

function drawGround() {
	//  draw the ground
	noStroke();
	fill(0, 155, 0);
	rect(0, groundStart, 1024, 144);
}

function drawCloud(x, y) {
	noStroke();
	fill(255);
	var cloudWidth = 75;
	var cloudHeight = 65;
	ellipse(x, y, cloudWidth, cloudHeight);
	ellipse(x, y - 30, cloudWidth - 10, cloudHeight - 10);
	ellipse(x - 50, y - 5, cloudWidth - 10, cloudHeight - 10);
	ellipse(x + 50, y - 5, cloudWidth - 10, cloudHeight - 10);
}

function drawMountain() {

	stroke(0);
	fill(125, 125, 125);
	triangle(270, groundStart, 385, 356, 500, groundStart);
	triangle(500, groundStart, 615, 356, 730, groundStart);
	triangle(375, groundStart, 500, 256, 625, groundStart);
	noStroke();
	fill(255, 255, 255, 180);
	triangle(468, 302, 500, 256, 532, 302);
}

function drawTree(x) {
	var treeTrunkHeight = 40;
	var treeTrunkWidth = 20;
	var treeHeight = 120;
	var treeLeft = x - treeTrunkWidth / 2;
	stroke(0);
	fill(139, 69, 19);

	rect(treeLeft, groundStart - treeTrunkHeight, treeTrunkWidth, treeTrunkHeight);
	for (var i = 0; i < treeTrunkWidth; i += 5) {
		line(treeLeft + i + 5, groundStart - 3, treeLeft + i + 5, groundStart - treeTrunkHeight + 3);
	}

	fill(85, 107, 47);
	var branchStart = groundStart - treeTrunkHeight;
	for (var i = 0; i < 3; i++) {
		var branchWidth = (treeTrunkWidth + 5) - (i * 5);
		var branchHeight = (treeHeight / ((i + 1) * 2));
		triangle(x - branchWidth, branchStart, x + branchWidth, branchStart, x, branchStart - branchHeight);
		branchStart = branchStart - branchHeight + 10 - (i + 1) ^ 2;
	}
}

function drawCanyon(x) {
	noStroke(0);
	fill(160, 82, 45);
	var canyonWidthTop = 60;
	var canyonWidthBottom = 30;
	quad(x - canyonWidthTop, groundStart + 1, x + canyonWidthTop, groundStart + 1, x + canyonWidthBottom, screenHeight, x - canyonWidthBottom, screenHeight);

	//	draw some stuff in the bottom of the canyon
	fill(218, 165, 32);
	for (var i = 0; i < 3; i++) {
		var offset = x - canyonWidthBottom + i * 15;
		triangle(offset + 10, screenHeight, offset + 20, screenHeight, offset + 15, screenHeight - 15);
	}
}

function drawGem(x, y) {
	stroke(255);
	fill(0, 255, 255, 150);
	triangle(x, y, x - 8, y - 25, x + 8, y - 25);
	triangle(x, y, x - 8, y - 25, x - 16, y - 30);
	triangle(x, y, x + 8, y - 25, x + 16, y - 30);
	triangle(x - 16, y - 30, x, y - 35, x - 8, y - 25);
	triangle(x - 8, y - 25, x, y - 35, x + 8, y - 25);
	triangle(x + 8, y - 25, x, y - 35, x + 16, y - 30);
}