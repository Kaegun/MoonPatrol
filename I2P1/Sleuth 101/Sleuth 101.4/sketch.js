/*

Officer: 1192743
CaseNum: 101-3-17102152-1192743

Case 101 - The Case of Lina Lovelace
Stage 4 - The Plaza Hotel

Okay this place is more Lina’s style. Now’s our chance to find out the root of all
of this. Lets see who is Lina meeting.

Identify Lina by drawing a Green Yellow filled rectangle with a Light Sea Green outline.
She’s the woman in the red dress of course.

Identify the man with the monocle smoking the cigar by drawing a Saddle Brown filled
rectangle with a Dark Orange outline around him.

Identify the man reading the newspaper by drawing a Spring Green filled rectangle
with a Indigo outline around him.

Identify the woman with the dog by drawing a Medium Aquamarine filled rectangle with a
Magenta outline around her. Make sure you include the dog too.

The rectangles should cover the targets as accurately as possible without
including anything else.

Use X11 colours. You can find a reference table at https://en.wikipedia.org/wiki/Web_colors.

There are many possible ways of investigating this case, but you
should use ONLY the following commands:

  rect()
  fill() Use r,g,b values between 0 and 255. Set alpha to 100 for some opacity.
	stroke() Use r,g,b values between 0 and 255.

*/

var img;

function preload()
{
	img = loadImage('img.jpg');
}

function setup()
{
	createCanvas(img.width,img.height);
	strokeWeight(2);
}

function draw()
{
	image(img,0,0);

	//Write your code below here ...
	//	Lina
	stroke(32, 178, 170);
	fill(173, 255, 47, 100);
	rect(530, 250, 170, 345);

	//	Woman with dog
	/* Medium Aquamarine filled rectangle with a
Magenta outline*/
	stroke(255, 0, 255);
	fill(102, 205, 170, 100);
	rect(10, 200, 230, 495);

	//	Man with cigar
	/* Saddle Brown filled
rectangle with a Dark Orange*/
	stroke(255, 140, 0);
	fill(139, 69, 19, 100);
	rect(1235, 450, 220, 295);

	//	Man reading paper
	/* Spring Green filled rectangle
with a Indigo outline*/
	stroke(75, 0, 130);
	fill(0, 255, 127, 100);
	rect(1510, 310, 150, 300);
}
