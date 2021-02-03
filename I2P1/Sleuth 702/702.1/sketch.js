/*

Officer: 1192743
CaseNum: 702-0-88181881-1192743

Case 702 - The case of Vanishing Vannevar
Stage 1 - Mobilise

“Calling all units: the notorious criminal and speedster known as Vanishing Vannevar is on the run.
All cars to mobilise.” Word has it that you’re pretty nifty behind the wheel. I want you in on
this action kid. Get your car on the road by completing the </DRIVE_NAME/> function below.

There are many possible ways of completing this task,
but you should ONLY use the following commands and techniques:

	- increment variables
	- random
	- constrain
	- calling functions

HINT: make sure you take a look at the initialisation of sleuthCarObject to understand it's properties.

*/

///////////////////////// HELPER FUNCTIONS /////////////////////

function MoveVehicle() {
	/*
	This function should do the following: 
	 - increment sleuthCarObject's distAmount property by its gasValue property 
	 - add a random amount between -0.08 and 0.08 to sleuthCarObject's engineVibrateValue property
	 - use the constrain function to constrain sleuthCarObject's engineVibrateValue property to values between 0.06 and 1.07
	 - call the TurnCarEngine function passing sleuthCarObject as an argument
	*/

	sleuthCarObject.distAmount += sleuthCarObject.gasValue;
	sleuthCarObject.engineVibrateValue += random(-0.08, 0.08);
	console.log(sleuthCarObject.engineVibrateValue);
	sleuthCarObject.engineVibrateValue = constrain(sleuthCarObject.engineVibrateValue, 0.06, 1.07);

	TurnCarEngine(sleuthCarObject);
}


//////////////DO NOT CHANGE CODE BELOW THIS LINE//////////////////

var sleuthCarObject;

var roadWidth = 400;
var roadLeftEdge = 200;
var carImages = {};


function preload() {
	carImages.detective = loadImage("cars/detective.png");
}

function setup() {
	createCanvas(800, 800);

	sleuthCarObject =
	{
		xPos: roadLeftEdge + roadWidth / 4,
		yPos: 300,
		distAmount: 0,
		gasValue: 3,
		engineVibrateValue: 0,
		vehicleVariety: 'detective',
		licencePlate: '5L3UTH',
		exhaust: []
	}


}



function draw() {
	background(0);


	MoveVehicle();


	drawRoad();
	drawCars();
}

/////////////////////////DRAWING FUNCTIONS////////////////////////

function drawRoad() {
	stroke(100);
	fill(50);
	rect(roadLeftEdge, 0, roadWidth, 800);
	stroke(255);

	for (var i = -1; i < 20; i++) {
		line(
			roadLeftEdge + roadWidth / 2, i * 100 + (sleuthCarObject.distAmount % 100),
			roadLeftEdge + roadWidth / 2, i * 100 + 70 + (sleuthCarObject.distAmount % 100)
		);
	}
}

function drawCars() {
	//draw the detective car

	image
	drawExhaust(sleuthCarObject);
	image
		(
			carImages["detective"],
			sleuthCarObject.xPos - carImages["detective"].width / 2 + random(-sleuthCarObject.engineVibrateValue, sleuthCarObject.engineVibrateValue),
			sleuthCarObject.yPos + random(-sleuthCarObject.engineVibrateValue, sleuthCarObject.engineVibrateValue)
		);

}

function TurnCarEngine(car) {

	car.exhaust.push({ size: 2, x: car.xPos, y: car.yPos + carImages[car.vehicleVariety].height });

	for (var i = car.exhaust.length - 1; i >= 0; i--) {

		car.exhaust[i].y += max(0.75, car.gasValue / 3);
		car.exhaust[i].x += random(-1, 1);
		car.exhaust[i].size += 0.5;

		if (car.exhaust[i].y > height) {
			car.exhaust.splice(i, 1);
		}
	}
}


function drawExhaust(car) {
	noStroke();
	for (var i = 0; i < car.exhaust.length; i++) {
		var alpha = map(car.exhaust[i].size, 0, 40, 50, 0);
		fill(125, alpha);
		ellipse(car.exhaust[i].x + 20, car.exhaust[i].y, car.exhaust[i].size);

	}
}
