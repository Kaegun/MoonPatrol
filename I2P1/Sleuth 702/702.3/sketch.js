/*

Officer: 1192743
CaseNum: 702-2-23587615-1192743

Case 702 - The case of Vanishing Vannevar
Stage 3 - Where's Vannevar

“All units: Vannevar’s car has been sighted. It is a red car with a Licence_Plate of 06EKIW. Approach with
caution.” This is your big chance kid. Don’t blow it. Complete the helper functions below to
drive through the traffic and locate Vannevar.

There are many possible ways of completing this task,
but you should ONLY use the following commands and techniques:

	- Incrementing and assiging variables
	- Maths function such as random, min, abs, and constrain
	- Conditional statements
	- Traversing arrays with for loops
	- calling functions and returning values

HINT: make sure you take a look at the initialisation of Chase_VehicleObject and the cars in
TrafficObjects_List to understand their properties.

*/

///////////////////////// HELPER FUNCTIONS /////////////////////

function Move_Vehicle() {
	/*
	This function should do the following: 
	 - increment Chase_VehicleObject's Miles_Travelled property by its Gas_Amount property 
	 - add a random amount between -0.09 and 0.09 to Chase_VehicleObject's Vibrate_Val property
	 - use the constrain function to constrain Chase_VehicleObject's Vibrate_Val property to values between 0.02 and 1.03
	 - call the Turnover_CarMotor function passing Chase_VehicleObject as an argument
	*/
	Chase_VehicleObject.Miles_Travelled += Chase_VehicleObject.Gas_Amount;
	Chase_VehicleObject.Vibrate_Val += random(-0.09, 0.09);
	Chase_VehicleObject.Vibrate_Val = constrain(Chase_VehicleObject.Vibrate_Val, 0.02, 1.03);
	Turnover_CarMotor(Chase_VehicleObject);
}


function Move_Lanes(target_vehicle) {
	/*
	This function should do the following: 
	 - move target_vehicle from one lane to the other.
	 - do the move in a single step without any extra animation.
	 - use LaneCoord_A and LaneCoord_B to effect the change.
	 - finally you should return target_vehicle at the end of the function.
	 hint: You will need to modify the X_Position property of target_vehicle.
	*/
	target_vehicle.X_Position = target_vehicle.X_Position == LaneCoord_A ? LaneCoord_B : LaneCoord_A;
	return target_vehicle;
}


function CheckVehicle_Ahead(TargetCar_A, TargetCar_B) {
	/*
	This function should do the following: 
	 - determine if TargetCar_A is in the same lane and less than 200px behind TargetCar_B.
	 - do this by comparing the two cars' Miles_Travelled properties
	 - if these requirements are met then return the Licence_Plate property for TargetCar_B. Otherwise return false.
	*/
	if (TargetCar_A.X_Position == TargetCar_B.X_Position
		&& TargetCar_B.Miles_Travelled - TargetCar_A.Miles_Travelled < 200
		&& TargetCar_B.Miles_Travelled - TargetCar_A.Miles_Travelled >= 0)
		return TargetCar_B.Licence_Plate;
}


function Car_Parallel(TargetVehicle_A, TargetVehicle_B) {
	/*
	This function should do the following: 
	 - determine if TargetVehicle_Ais parallel with TargetVehicle_B.
	 - if TargetVehicle_A is found to be parallel to TargetVehicle_B then return TargetVehicle_B.
	 - cars are considered parallel if the absolute difference between their Miles_Travelled properties is less than 25 px and they have non-matching X_Position properties	*/
	if (abs(TargetVehicle_A.Miles_Travelled - TargetVehicle_B.Miles_Travelled) < 25
		&& TargetVehicle_A.X_Position != TargetVehicle_B.X_Position)
		return TargetVehicle_B;

	return false;
}


function Detect_Suspect() {
	/*
	This function should do the following: 
	 - Check cars passing parallel to Chase_VehicleObject to see if they match the Licence_Plate property in the suspect description.
	 - it does this by traversing TrafficObjects_List and calling Car_Parallel for each car
.	 - if a positive result is returned then the Licence_Plate property of the found car is then checked against the suspect description.
	 - if a match is found then the object of the car in question is returned.
	 - otherwise return false.
	*/
	for (var i = 0; i < TrafficObjects_List.length; i++) {
		if (Car_Parallel(Chase_VehicleObject, TrafficObjects_List[i])
			&& TrafficObjects_List[i].Licence_Plate == "06EKIW")
			return TrafficObjects_List[i];
	}
	return false;
}


//////////////DO NOT CHANGE CODE BELOW THIS LINE//////////////////

var Chase_VehicleObject;

var roadWidth;
var roadLeftEdge;
var LaneCoord_A;
var LaneCoord_B;
var carImages = {};
var suspect;

var TrafficObjects_List = [
	{ X_Position: 500, Y_Position: 0, Miles_Travelled: -200, Vehicle_Classification: 'blueCar', Licence_Plate: 'ZD7W5R', Gas_Amount: 2, exhaust: [] }, { X_Position: 300, Y_Position: 0, Miles_Travelled: 200, Vehicle_Classification: 'blueCar', Licence_Plate: 'HXU52P', Gas_Amount: 2, exhaust: [] }, { X_Position: 300, Y_Position: 0, Miles_Travelled: 600, Vehicle_Classification: 'redCar', Licence_Plate: 'U6QIEZ', Gas_Amount: 2, exhaust: [] }, { X_Position: 500, Y_Position: 0, Miles_Travelled: 1000, Vehicle_Classification: 'blueCar', Licence_Plate: 'IH60XK', Gas_Amount: 2, exhaust: [] }, { X_Position: 300, Y_Position: 0, Miles_Travelled: 1400, Vehicle_Classification: 'greenCar', Licence_Plate: 'UQB77Y', Gas_Amount: 2, exhaust: [] }, { X_Position: 500, Y_Position: 0, Miles_Travelled: 1800, Vehicle_Classification: 'whiteCar', Licence_Plate: '6ZCOBC', Gas_Amount: 2, exhaust: [] }, { X_Position: 500, Y_Position: 0, Miles_Travelled: 2200, Vehicle_Classification: 'blueCar', Licence_Plate: 'GSIJ5B', Gas_Amount: 2, exhaust: [] }, { X_Position: 500, Y_Position: 0, Miles_Travelled: 2600, Vehicle_Classification: 'greenCar', Licence_Plate: 'VYI4BK', Gas_Amount: 2, exhaust: [] }, { X_Position: 300, Y_Position: 0, Miles_Travelled: 3000, Vehicle_Classification: 'whiteCar', Licence_Plate: 'YK7ZKX', Gas_Amount: 2, exhaust: [] }, { X_Position: 500, Y_Position: 0, Miles_Travelled: 3400, Vehicle_Classification: 'greenCar', Licence_Plate: '9SJDF1', Gas_Amount: 2, exhaust: [] }, { X_Position: 500, Y_Position: 0, Miles_Travelled: 3800, Vehicle_Classification: 'redCar', Licence_Plate: '06EKIW', Gas_Amount: 2, exhaust: [] }, { X_Position: 500, Y_Position: 0, Miles_Travelled: 4200, Vehicle_Classification: 'whiteCar', Licence_Plate: 'TITBYU', Gas_Amount: 2, exhaust: [] }, { X_Position: 500, Y_Position: 0, Miles_Travelled: 4600, Vehicle_Classification: 'blueCar', Licence_Plate: 'U7H8XK', Gas_Amount: 2, exhaust: [] }, { X_Position: 500, Y_Position: 0, Miles_Travelled: 5000, Vehicle_Classification: 'redCar', Licence_Plate: '6EYJZV', Gas_Amount: 2, exhaust: [] }, { X_Position: 300, Y_Position: 0, Miles_Travelled: 5400, Vehicle_Classification: 'blueCar', Licence_Plate: 'SCXN8V', Gas_Amount: 2, exhaust: [] }, { X_Position: 500, Y_Position: 0, Miles_Travelled: 5800, Vehicle_Classification: 'blueCar', Licence_Plate: 'EACVM9', Gas_Amount: 2, exhaust: [] }, { X_Position: 500, Y_Position: 0, Miles_Travelled: 6200, Vehicle_Classification: 'greenCar', Licence_Plate: 'NZZI2W', Gas_Amount: 2, exhaust: [] }, { X_Position: 500, Y_Position: 0, Miles_Travelled: 6600, Vehicle_Classification: 'blueCar', Licence_Plate: 'Z68K0Y', Gas_Amount: 2, exhaust: [] }, { X_Position: 300, Y_Position: 0, Miles_Travelled: 7000, Vehicle_Classification: 'greenCar', Licence_Plate: 'OY394I', Gas_Amount: 2, exhaust: [] }, { X_Position: 500, Y_Position: 0, Miles_Travelled: 7400, Vehicle_Classification: 'whiteCar', Licence_Plate: 'DMT5H1', Gas_Amount: 2, exhaust: [] }
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
	textSize(30);
	textAlign(CENTER);

	roadWidth = 400;
	roadLeftEdge = 200;
	LaneCoord_A = 300;
	LaneCoord_B = 500;

	Chase_VehicleObject =
	{
		X_Position: roadLeftEdge + roadWidth / 4,
		Y_Position: 550,
		Miles_Travelled: 0,
		Gas_Amount: 3,
		Vibrate_Val: 0,
		Vehicle_Classification: 'detective',
		Licence_Plate: '5L3UTH',
		exhaust: []
	}


}



function draw() {
	background(0);



	drawRoad();
	drawCars();

	if (suspect) {
		fill(255);

		text("suspect found !", width / 2, height / 2);
		return;
	}

	////////////////////// HANDLE DETECTIVE /////////////////////////

	Move_Vehicle();
	for (var i = 0; i < TrafficObjects_List.length; i++) {
		var b2b = CheckVehicle_Ahead(Chase_VehicleObject, TrafficObjects_List[i]);
		if (b2b) Move_Lanes(Chase_VehicleObject);
	}
	var a = Detect_Suspect();
	if (a != false) suspect = a;


	//////////////////////HANDLE THE OTHER CARS//////////////////////

	for (var i = 0; i < TrafficObjects_List.length; i++) {
		TrafficObjects_List[i].Miles_Travelled += TrafficObjects_List[i].Gas_Amount;
		TrafficObjects_List[i].Y_Position = Chase_VehicleObject.Y_Position - TrafficObjects_List[i].Miles_Travelled + Chase_VehicleObject.Miles_Travelled;
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
			roadLeftEdge + roadWidth / 2, i * 100 + (Chase_VehicleObject.Miles_Travelled % 100),
			roadLeftEdge + roadWidth / 2, i * 100 + 70 + (Chase_VehicleObject.Miles_Travelled % 100)
		);
	}
}

function drawCars() {
	//draw the detective car

	image
	drawExhaust(Chase_VehicleObject);
	image
		(
			carImages["detective"],
			Chase_VehicleObject.X_Position - carImages["detective"].width / 2 + random(-Chase_VehicleObject.Vibrate_Val, Chase_VehicleObject.Vibrate_Val),
			Chase_VehicleObject.Y_Position + random(-Chase_VehicleObject.Vibrate_Val, Chase_VehicleObject.Vibrate_Val)
		);

	//draw all other cars

	for (var i = 0; i < TrafficObjects_List.length; i++) {
		if (TrafficObjects_List[i].Y_Position < height && TrafficObjects_List[i].Y_Position > -height / 2) {
			image(
				carImages[TrafficObjects_List[i].Vehicle_Classification],
				TrafficObjects_List[i].X_Position - carImages[TrafficObjects_List[i].Vehicle_Classification].width / 2,
				TrafficObjects_List[i].Y_Position
			);
			Turnover_CarMotor(TrafficObjects_List[i]);

			drawExhaust(TrafficObjects_List[i]);
		}
	}

}

function Turnover_CarMotor(car) {

	car.exhaust.push({ size: 2, x: car.X_Position, y: car.Y_Position + carImages[car.Vehicle_Classification].height });

	for (var i = car.exhaust.length - 1; i >= 0; i--) {

		car.exhaust[i].y += max(0.75, car.Gas_Amount / 3);
		if (car.Vehicle_Classification != "detective") car.exhaust[i].y += (Chase_VehicleObject.Gas_Amount - car.Gas_Amount);
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
