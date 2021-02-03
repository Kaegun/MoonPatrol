/*

Officer: 1192743
CaseNum: 303-2-89618087-1192743

Case 303 - The Case of the Crooked Attorney
Stage 3 - The Gates Bank

I’ve made an appointment for you at the Gates Bank to retrieve your safe deposit box from the vault.
Actually you will break into Torvalds’ one.

Crack the safe by doing the following:

	Whilst the mouse is moving:
	- Make Hidden_locker_valueA equal to the value of mouseY
	- Use the 'max' function to prevent Hidden_locker_valueA from falling below 2

	Whilst the mouse is moving:
	- Decrement Hidden_locker_valueB by 2
	- Use the 'max' function to prevent Hidden_locker_valueB from falling below 2

	Whilst the mouse is moving:
	- Make Hidden_locker_valueC equal to the value of mouseY
	- Use the 'max' function to prevent Hidden_locker_valueC from falling below 3

	Whilst the mouse is being dragged:
	- Increment Hidden_locker_valueD by 1
	- Use the 'constrain' function to prevent Hidden_locker_valueD from falling below 3 and going above 13

	Whilst the mouse is moving:
	- Make Hidden_locker_valueE equal to the value of mouseX
	- Use the 'max' function to prevent Hidden_locker_valueE from falling below 17



This time you'll need to create the relevant event handlers yourself.

There are many possible ways of investigating this case, but you
should use ONLY the following commands:

	- The assignment operator aka. the equals sign !
	- mouseX, mouseY
	- Incrementing +=
	- Decrementing -=
	- min, max
	- constrain

*/

//declare the variables

var Hidden_locker_valueA;
var Hidden_locker_valueB;
var Hidden_locker_valueC;
var Hidden_locker_valueD;
var Hidden_locker_valueE;


function preload() {
	//IMAGES WILL BE LOADED HERE

}

function setup() {
	createCanvas(512, 512);

	//initialise the variables
	Hidden_locker_valueA = 0;
	Hidden_locker_valueB = 0;
	Hidden_locker_valueC = 0;
	Hidden_locker_valueD = 0;
	Hidden_locker_valueE = 0;

}

///////////////////EVENT HANDLERS///////////////////
/*
	Whilst the mouse is moving:
	- Make Hidden_locker_valueA equal to the value of mouseY
	- Use the 'max' function to prevent Hidden_locker_valueA from falling below 2

	Whilst the mouse is moving:
	- Decrement Hidden_locker_valueB by 2
	- Use the 'max' function to prevent Hidden_locker_valueB from falling below 2

	Whilst the mouse is moving:
	- Make Hidden_locker_valueC equal to the value of mouseY
	- Use the 'max' function to prevent Hidden_locker_valueC from falling below 3

	Whilst the mouse is being dragged:
	- Increment Hidden_locker_valueD by 1
	- Use the 'constrain' function to prevent Hidden_locker_valueD from falling below 3 and going above 13

	Whilst the mouse is moving:
	- Make Hidden_locker_valueE equal to the value of mouseX
	- Use the 'max' function to prevent Hidden_locker_valueE from falling below 17
*/
//Create event handlers here to open the safe ...

function mouseMoved() {
	console.log("mouseMoved", mouseX, mouseY);

	Hidden_locker_valueA = max(2, mouseY);
	Hidden_locker_valueB = max(2, Hidden_locker_valueB -= 2);
	Hidden_locker_valueC = max(3, mouseY);
	Hidden_locker_valueE = max(17, mouseX);
}

function mouseDragged() {
	console.log("mouseDragged", mouseX, mouseY);

	Hidden_locker_valueD = constrain(Hidden_locker_valueD += 1, 3, 13);
}

function mousePressed() {
	console.log("mousePressed");

}

function mouseReleased() {
	console.log("mouseReleased");

}

function keyPressed() {
	console.log("keyPressed", key);

}

function keyReleased() {
	console.log("keyReleased", key);

}



///////////////DO NOT CHANGE CODE BELOW THIS POINT///////////////////

function draw() {

	//Draw the safe door
	background(70);
	noStroke();
	fill(29, 110, 6);
	rect(26, 26, width - 52, width - 52);

	//Draw the combination dials
	push();
	translate(120, 170);
	drawDial(140, Hidden_locker_valueA, 12);
	pop();

	push();
	translate(120, 380);
	drawDial(140, Hidden_locker_valueB, 20);
	pop();

	push();
	translate(280, 170);
	drawDial(140, Hidden_locker_valueC, 25);
	pop();

	push();
	translate(280, 380);
	drawDial(140, Hidden_locker_valueD, 16);
	pop();

	//Draw the lever
	push();
	translate(width - 125, 256);
	drawLever(Hidden_locker_valueE);
	pop();


}

function drawDial(diameter, num, maxNum) {
	//the combination lock

	var r = diameter * 0.5;
	var p = r * 0.6;

	stroke(0);
	fill(255, 255, 200);
	ellipse(0, 0, diameter, diameter);
	fill(100);
	noStroke();
	ellipse(0, 0, diameter * 0.66, diameter * 0.66);
	fill(150, 0, 0);
	triangle(
		-p * 0.4, -r - p,
		p * 0.4, -r - p,
		0, -r - p / 5
	);

	noStroke();

	push();
	var inc = 360 / maxNum;

	rotate(radians(-num * inc));
	for (var i = 0; i < maxNum; i++) {
		push();
		rotate(radians(i * inc));
		stroke(0);
		line(0, -r * 0.66, 0, -(r - 10));
		noStroke();
		fill(0);
		text(i, 0, -(r - 10));
		pop();
	}

	pop();
}

function drawLever(rot) {
	push();
	rotate(radians(-rot))
	stroke(0);
	fill(100);
	rect(-10, 0, 20, 100);
	ellipse(0, 0, 50, 50);
	ellipse(0, 100, 35, 35);
	pop();
}
