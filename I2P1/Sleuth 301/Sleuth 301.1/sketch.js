/*
The case of the Python Syndicate
Stage 1

Officer: 1192743
CaseNum: 301-0-65426994-1192743

I gotta give it to you kid, you’ve made an excellent start, but now it’s time
to take things up a level. For some time I’ve suspected that there’s something
big going down in Console City.

These cases that we’ve been working are all connected somehow. I need to use
that considerable brain of yours to work it all out. Let’s start by laying out
who we know.

Place each mugshot in its designated position by doing the following:

- Create a new variable for the X and Y coordinates of each mugshot.
	- One has already been done for you.
	- Make sure you use the same style and format for the variable name.
- Find coordinates for the mugshot and initialise your variable with these
values.
- Replace the hard-coded constants in the corresponding image command so that
the mugshot appears in its designated position.

*/

var photoBoard;
var pawelKarpinskiImage;
var rockyKrayImage;
var cecilKarpinskiImage;
var annaKarpinskiImage;
var bonesKarpinskiImage;
var countessHamiltonImage;



//declare your new variables below
var rockyKrayXLocation = 408;
var rockyKrayYLocation = 40;
var pawelKarpinskiXLocation = 115;
var pawelKarpinskiYLocation = 40;
var cecilKarpinskiXLocation = 701;
var cecilKarpinskiYLocation = 40;
var annaKarpinskiXLocation = 115;
var annaKarpinskiYLocation = 309;
var bonesKarpinskiXLocation = 408;
var bonesKarpinskiYLocation = 309;
var countessHamiltonXLocation = 701;
var countessHamiltonYLocation = 309;

function preload() {
	photoBoard = loadImage('photoBoard.png');
	pawelKarpinskiImage = loadImage("karpinskiBros2.png");
	rockyKrayImage = loadImage("krayBrothers1.png");
	cecilKarpinskiImage = loadImage("karpinskiBros1.png");
	annaKarpinskiImage = loadImage("karpinskiWoman.png");
	bonesKarpinskiImage = loadImage("karpinskiDog.png");
	countessHamiltonImage = loadImage("countessHamilton.png");
}

function setup() {
	createCanvas(photoBoard.width, photoBoard.height);
}

function draw() {
	image(photoBoard, 0, 0);



	//And update these image commands with your x and y coordinates.
	image(rockyKrayImage, rockyKrayXLocation, rockyKrayYLocation);

	image(pawelKarpinskiImage, pawelKarpinskiXLocation, pawelKarpinskiYLocation);
	image(cecilKarpinskiImage, cecilKarpinskiXLocation, cecilKarpinskiYLocation);
	image(annaKarpinskiImage, annaKarpinskiXLocation, annaKarpinskiYLocation);
	image(bonesKarpinskiImage, bonesKarpinskiXLocation, bonesKarpinskiYLocation);
	image(countessHamiltonImage, countessHamiltonXLocation, countessHamiltonYLocation);
}