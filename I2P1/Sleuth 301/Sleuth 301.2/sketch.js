/*
The case of the Python Syndicate
Stage 2


Officer: 1192743
CaseNum: 301-1-55730584-1192743

- Word on the street is that there is a new gang in town - The Python Syndicate.
It seems my bones were correct on this one. I need you to organise the gang
around the suspected leader Pawel karpinski

- The variables for Pawel karpinski have been declared and
initialised.
- Modify the x and y parameters of each image command using these two variables
so the images maintain their correct positions their correct positions on the board.
- To do this you will need to combine add and subtract operators with variables
Pawel karpinski for for each parameter.
- Do not create any new variables
- Do not add any additional commands
*/

var photoBoard;
var linaLovelaceImg;
var bonesKarpinskiImg;
var rockyKrayImg;
var annaKarpinskiImg;
var pawelKarpinskiImg;
var countessHamiltonImg;


var pawelKarpinskiXPos = 408;
var pawelKarpinskiYPos = 309;


function preload() {
	photoBoard = loadImage('photoBoard.png');
	linaLovelaceImg = loadImage("lina.png");
	bonesKarpinskiImg = loadImage("karpinskiDog.png");
	rockyKrayImg = loadImage("krayBrothers1.png");
	annaKarpinskiImg = loadImage("karpinskiWoman.png");
	pawelKarpinskiImg = loadImage("karpinskiBros2.png");
	countessHamiltonImg = loadImage("countessHamilton.png");

}

function setup() {
	createCanvas(photoBoard.width, photoBoard.height);
}

function draw() {
	image(photoBoard, 0, 0);

	//And update these image commands with your x and y coordinates.
	image(pawelKarpinskiImg, pawelKarpinskiXPos, pawelKarpinskiYPos);	//	408 309

	image(linaLovelaceImg, pawelKarpinskiXPos - 293, pawelKarpinskiYPos - 269);
	image(bonesKarpinskiImg, pawelKarpinskiXPos, pawelKarpinskiYPos - 269);
	image(rockyKrayImg, pawelKarpinskiXPos + 293, pawelKarpinskiYPos - 269);
	image(annaKarpinskiImg, pawelKarpinskiXPos - 293, pawelKarpinskiYPos);
	image(countessHamiltonImg, pawelKarpinskiXPos + 293, pawelKarpinskiYPos);
}