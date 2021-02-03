/*
The case of the Python Syndicate
Stage 3


Officer: 1192743
CaseNum: 301-2-88961861-1192743

Right kid let’s work out which of our ‘friends’ is connected to the syndicate.

- An object for Bones karpinski has been declared and initialised
- Modify the x and y parameters of each image command using the x and y
properties from the Bones karpinski object so the images remain at their correct
positions on the board.
- To do this you will need to combine add and subtract operators with the
relevant property for each parameter
*/

var photoBoard;
var robbieKrayImg;
var cecilKarpinskiImg;
var annaKarpinskiImg;
var bonesKarpinskiImg;
var countessHamiltonImg;
var linaLovelaceImg;

var bonesKarpinskiObject;




function preload() {
	photoBoard = loadImage('photoBoard.png');
	robbieKrayImg = loadImage("krayBrothers2.png");
	cecilKarpinskiImg = loadImage("karpinskiBros1.png");
	annaKarpinskiImg = loadImage("karpinskiWoman.png");
	bonesKarpinskiImg = loadImage("karpinskiDog.png");
	countessHamiltonImg = loadImage("countessHamilton.png");
	linaLovelaceImg = loadImage("lina.png");

}

function setup() {
	createCanvas(photoBoard.width, photoBoard.height);
	bonesKarpinskiObject = {
		x: 115,
		y: 309,
		image: bonesKarpinskiImg
	};
}

function draw() {
	image(photoBoard, 0, 0);

	//And update these image commands with your x and y coordinates.
	image(bonesKarpinskiObject.image, bonesKarpinskiObject.x, bonesKarpinskiObject.y);	//	115 309

	//image(robbieKrayImg, 115, 40);
	//image(cecilKarpinskiImg, 408, 40);
	//image(annaKarpinskiImg, 701, 40);
	//image(countessHamiltonImg, 408, 309);
	//image(linaLovelaceImg, 701, 309);

	image(robbieKrayImg, bonesKarpinskiObject.x, bonesKarpinskiObject.y - 269);
	image(cecilKarpinskiImg, bonesKarpinskiObject.x + 293, bonesKarpinskiObject.y - 269);
	image(annaKarpinskiImg, bonesKarpinskiObject.x + 586, bonesKarpinskiObject.y - 269);
	image(countessHamiltonImg, bonesKarpinskiObject.x + 293, bonesKarpinskiObject.y);
	image(linaLovelaceImg, bonesKarpinskiObject.x + 586, bonesKarpinskiObject.y);
}