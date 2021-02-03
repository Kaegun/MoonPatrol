/*

Officer: 1192743
CaseNum: 702-1-79957260-1192743

Case 702 - The case of Vanishing Vannevar
Stage 2 - Downtown traffic

“All units: Vannevar is heading into the downtown area. Heavy traffic ahead. Drive safely.”
Complete the helper functions below to drive the car and avoid other vehicles. Keep on it kid.

There are many possible ways of completing this task,
but you should ONLY use the following commands and techniques:

	- Incrementing and assiging variables
	- Maths function such as random and constrain
	- Conditional statements
	- Traversing arrays with for loops
	- calling functions and returning values

HINT: make sure you take a look at the initialisation of Sleuth_CarObject and the cars in
VehicleObjectList to understand their properties.

*/

///////////////////////// HELPER FUNCTIONS /////////////////////

function driveVehicle() {
	/*
	This function should do the following: 
	 - increment Sleuth_CarObject's Kms_Driven property by its Gas_Amount property 
	 - add a random amount between -0.02 and 0.02 to Sleuth_CarObject's Rumble_Amount property
	 - use the constrain function to constrain Sleuth_CarObject's Rumble_Amount property to values between 0.08 and 0.81
	 - call the turnoverEngine function passing Sleuth_CarObject as an argument
	*/
	Sleuth_CarObject.Kms_Driven += Sleuth_CarObject.Gas_Amount;
	Sleuth_CarObject.Rumble_Amount += random(-0.02, 0.02);
	Sleuth_CarObject.Rumble_Amount = constrain(Sleuth_CarObject.Rumble_Amount, 0.08, 0.81);

	turnoverEngine(Sleuth_CarObject);
}


function switchLanes(targetVehicle) {
	/*
	This function should do the following: 
	 - move targetVehicle from one lane to the other.
	 - do the move in a single step without any extra animation.
	 - use Lane_CoordA and Lane_CoordB to effect the change.
	 hint: You will need to modify the X_Pos property of targetVehicle.
	*/
	targetVehicle.X_Pos = targetVehicle.X_Pos == Lane_CoordA ? Lane_CoordB : Lane_CoordA;
}


function searchAhead(target_vehicle) {
	/*
	This function should do the following: 
	 - determine if target_vehicle is in the same lane and less than 200px behind any of the cars in VehicleObjectList.
	 - do this by traversing VehicleObjectList and comparing each car's Kms_Driven property to that of target_vehicle.
	 - if you find a car that matches these requirements then return the car object. Otherwise return false.
	*/

	for (var i = 0; i < VehicleObjectList.length; i++) {
		if (target_vehicle.X_Pos == VehicleObjectList[i].X_Pos) {
			var range = VehicleObjectList[i].Kms_Driven - target_vehicle.Kms_Driven;
			if (range >= 0 && range < 200) {
				console.log(`found car ${i}`);
				return VehicleObjectList[i];
			}
		}
	}
	return false;
}


//////////////DO NOT CHANGE CODE BELOW THIS LINE//////////////////

var Sleuth_CarObject;

var roadWidth;
var roadLeftEdge;
var Lane_CoordA;
var Lane_CoordB;
var carImages = {};

var VehicleObjectList = [
	{ X_Pos: 300, Y_Pos: 0, Kms_Driven: -200, Vehicle_Category: 'whiteCar', Licence_Plate: 'MJX35V', Gas_Amount: 2, exhaust: [] }, { X_Pos: 500, Y_Pos: 0, Kms_Driven: 200, Vehicle_Category: 'greenCar', Licence_Plate: 'ZSSBW0', Gas_Amount: 2, exhaust: [] }, { X_Pos: 500, Y_Pos: 0, Kms_Driven: 600, Vehicle_Category: 'blueCar', Licence_Plate: '0E9ZT1', Gas_Amount: 2, exhaust: [] }, { X_Pos: 500, Y_Pos: 0, Kms_Driven: 1000, Vehicle_Category: 'redCar', Licence_Plate: 'KJC0OO', Gas_Amount: 2, exhaust: [] }, { X_Pos: 500, Y_Pos: 0, Kms_Driven: 1400, Vehicle_Category: 'redCar', Licence_Plate: 'QY3H71', Gas_Amount: 2, exhaust: [] }, { X_Pos: 500, Y_Pos: 0, Kms_Driven: 1800, Vehicle_Category: 'greenCar', Licence_Plate: '3WOM39', Gas_Amount: 2, exhaust: [] }, { X_Pos: 300, Y_Pos: 0, Kms_Driven: 2200, Vehicle_Category: 'blueCar', Licence_Plate: 'TSBPQE', Gas_Amount: 2, exhaust: [] }, { X_Pos: 500, Y_Pos: 0, Kms_Driven: 2600, Vehicle_Category: 'greenCar', Licence_Plate: 'SWJLQP', Gas_Amount: 2, exhaust: [] }, { X_Pos: 300, Y_Pos: 0, Kms_Driven: 3000, Vehicle_Category: 'whiteCar', Licence_Plate: 'FQ61I3', Gas_Amount: 2, exhaust: [] }, { X_Pos: 300, Y_Pos: 0, Kms_Driven: 3400, Vehicle_Category: 'greenCar', Licence_Plate: '1A0YI8', Gas_Amount: 2, exhaust: [] }, { X_Pos: 500, Y_Pos: 0, Kms_Driven: 3800, Vehicle_Category: 'whiteCar', Licence_Plate: '6J2RLP', Gas_Amount: 2, exhaust: [] }, { X_Pos: 500, Y_Pos: 0, Kms_Driven: 4200, Vehicle_Category: 'whiteCar', Licence_Plate: 'NC2V7P', Gas_Amount: 2, exhaust: [] }, { X_Pos: 500, Y_Pos: 0, Kms_Driven: 4600, Vehicle_Category: 'redCar', Licence_Plate: 'F1V8ME', Gas_Amount: 2, exhaust: [] }, { X_Pos: 300, Y_Pos: 0, Kms_Driven: 5000, Vehicle_Category: 'greenCar', Licence_Plate: 'VTWBRF', Gas_Amount: 2, exhaust: [] }, { X_Pos: 300, Y_Pos: 0, Kms_Driven: 5400, Vehicle_Category: 'whiteCar', Licence_Plate: 'ODLBBL', Gas_Amount: 2, exhaust: [] }, { X_Pos: 300, Y_Pos: 0, Kms_Driven: 5800, Vehicle_Category: 'greenCar', Licence_Plate: 'J0RJ76', Gas_Amount: 2, exhaust: [] }, { X_Pos: 500, Y_Pos: 0, Kms_Driven: 6200, Vehicle_Category: 'blueCar', Licence_Plate: 'ZNV02V', Gas_Amount: 2, exhaust: [] }, { X_Pos: 500, Y_Pos: 0, Kms_Driven: 6600, Vehicle_Category: 'whiteCar', Licence_Plate: '9QAF72', Gas_Amount: 2, exhaust: [] }, { X_Pos: 500, Y_Pos: 0, Kms_Driven: 7000, Vehicle_Category: 'redCar', Licence_Plate: '8X62IS', Gas_Amount: 2, exhaust: [] }, { X_Pos: 300, Y_Pos: 0, Kms_Driven: 7400, Vehicle_Category: 'redCar', Licence_Plate: 'OZT5FZ', Gas_Amount: 2, exhaust: [] }
];



function preload() {
	var carTypes = [
		"detective",
		"redCar",
		"greenCar",
		"blueCar",
		"whiteCar",
	];

	for (var i = 0; i < carTypes.length; i++) {
		carImages[carTypes[i]] = loadImage("cars/" + carTypes[i] + ".png");
	}
}

function setup() {
	createCanvas(800, 800);

	roadWidth = 400;
	roadLeftEdge = 200;
	Lane_CoordA = 300;
	Lane_CoordB = 500;

	Sleuth_CarObject =
	{
		X_Pos: roadLeftEdge + roadWidth / 4,
		Y_Pos: 550,
		Kms_Driven: 0,
		Gas_Amount: 3,
		Rumble_Amount: 0,
		Vehicle_Category: 'detective',
		Licence_Plate: '5L3UTH',
		exhaust: []
	}


}



function draw() {
	background(0);



	drawRoad();
	drawCars();

	////////////////////// HANDLE DETECTIVE /////////////////////////


	driveVehicle();
	var b2b = searchAhead(Sleuth_CarObject);
	if (b2b) switchLanes(Sleuth_CarObject);


	//////////////////////HANDLE THE OTHER CARS//////////////////////

	for (var i = 0; i < VehicleObjectList.length; i++) {
		VehicleObjectList[i].Kms_Driven += VehicleObjectList[i].Gas_Amount;
		VehicleObjectList[i].Y_Pos = Sleuth_CarObject.Y_Pos - VehicleObjectList[i].Kms_Driven + Sleuth_CarObject.Kms_Driven;
	}

}

/////////////////////////DRAWING FUNCTIONS////////////////////////

function drawRoad() {
	stroke(100);
	fill(50);
	rect(roadLeftEdge, 0, roadWidth, 800);
	stroke(255);

	for (var i = -1; i < 20; i++) {
		line(
			roadLeftEdge + roadWidth / 2, i * 100 + (Sleuth_CarObject.Kms_Driven % 100),
			roadLeftEdge + roadWidth / 2, i * 100 + 70 + (Sleuth_CarObject.Kms_Driven % 100)
		);
	}
}

function drawCars() {
	//draw the detective car

	image
	drawExhaust(Sleuth_CarObject);
	image
		(
			carImages["detective"],
			Sleuth_CarObject.X_Pos - carImages["detective"].width / 2 + random(-Sleuth_CarObject.Rumble_Amount, Sleuth_CarObject.Rumble_Amount),
			Sleuth_CarObject.Y_Pos + random(-Sleuth_CarObject.Rumble_Amount, Sleuth_CarObject.Rumble_Amount)
		);

	//draw all other cars

	for (var i = 0; i < VehicleObjectList.length; i++) {
		if (VehicleObjectList[i].Y_Pos < height && VehicleObjectList[i].Y_Pos > -height / 2) {
			image(
				carImages[VehicleObjectList[i].Vehicle_Category],
				VehicleObjectList[i].X_Pos - carImages[VehicleObjectList[i].Vehicle_Category].width / 2,
				VehicleObjectList[i].Y_Pos
			);
			turnoverEngine(VehicleObjectList[i]);

			drawExhaust(VehicleObjectList[i]);
		}
	}

}

function turnoverEngine(car) {

	car.exhaust.push({ size: 2, x: car.X_Pos, y: car.Y_Pos + carImages[car.Vehicle_Category].height });

	for (var i = car.exhaust.length - 1; i >= 0; i--) {

		car.exhaust[i].y += max(0.75, car.Gas_Amount / 3);
		if (car.Vehicle_Category != "detective") car.exhaust[i].y += (Sleuth_CarObject.Gas_Amount - car.Gas_Amount);
		car.exhaust[i].x += random(-1, 1);
		car.exhaust[i].size += 0.5;

		if (car.exhaust[i].y > height || car.exhaust[i].y < 0) {
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
