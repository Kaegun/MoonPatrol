/*

Officer: 1192743
CaseNum: 702-3-60089141-1192743

Case 702 - The case of Vanishing Vannevar
Stage 4 - High speed chase

“All units: Vannevar is on the run. They are driving a red car with a Number_Plate of 11BDI8.  Pursue at speed.
I repeat pursue at speed.” Okay Vannevar’s game is nearly up. Go get him kid.
Complete the helper functions below to locate, chase and arrest Vannevar.

There are many possible ways of completing this task,
but you should ONLY use the following commands and techniques:

	- Incrementing and assiging variables
	- Maths function such as random, min, abs, and constrain
	- Conditional statements
	- Traversing arrays with for loops
	- calling functions and returning values

HINT: make sure you take a look at the initialisation of Chase_VehicleObject and the cars in
car_list to understand their properties.

*/

///////////////////////// HELPER FUNCTIONS /////////////////////

function drive_vehicle() {
	/*
	This function should do the following: 
	 - increment Chase_VehicleObject's Miles_Driven property by its Accel_Amt property 
	 - add a random amount between -0.06 and 0.06 to Chase_VehicleObject's EngineRumble_Amt property
	 - use the constrain function to constrain Chase_VehicleObject's EngineRumble_Amt property to values between 0.1 and 0.78
	 - call the turn_carEngine function passing Chase_VehicleObject as an argument
	*/
	Chase_VehicleObject.Miles_Driven += Chase_VehicleObject.Accel_Amt;
	Chase_VehicleObject.EngineRumble_Amt += random(-0.06, 0.06);
	Chase_VehicleObject.EngineRumble_Amt = constrain(Chase_VehicleObject.EngineRumble_Amt, 0.1, 0.78);
	turn_carEngine(Chase_VehicleObject);
}


function swap_lanes(car_obj) {
	/*
	This function should do the following: 
	 - move car_obj from one lane to the other.
	 - do the move in a single step without any extra animation.
	 - use Lane_Position_a and Lane_Position_b to effect the change.
	 - finally you should return car_obj at the end of the function.
	 hint: You will need to modify the X_Position property of car_obj.
	*/
	console.log(`changing lanes: ${car_obj.Number_Plate}`);
	car_obj.X_Position = car_obj.X_Position == Lane_Position_a ? Lane_Position_b : Lane_Position_a;
	return car_obj;
}


function checkVehicle_infront(car_a, car_b) {
	/*
	This function should do the following: 
	 - determine if car_a is in the same lane and less than 200px behind car_b.
	 - do this by comparing the two cars' Miles_Driven properties
	 - if these requirements are met then return the Number_Plate property for car_b. Otherwise return false.
	*/
	if (car_a.X_Position == car_b.X_Position
		&& car_b.Miles_Driven >= car_a.Miles_Driven
		&& car_b.Miles_Driven - car_a.Miles_Driven < 200)
		return car_b.Number_Plate;

	return false;
}


function checkCar_isAtSide(vehicle) {
	/*
	This function should do the following: 
	 - traverse car_list and determine if any of the cars are parallel with vehicle.
	 - if a car is found to be parallel to vehicle then return that car object.
	 - cars are considered parallel if the absolute difference between their Miles_Driven properties is less than 25 px and they have non-matching X_Position properties	*/
	for (var i = 0; i < car_list.length; i++) {
		if (vehicle.X_Position != car_list[i].X_Position
			&& abs(vehicle.Miles_Driven - car_list[i].Miles_Driven) < 25)
			return car_list[i];
	}
	return false;
}


function find_suspect() {
	/*
	This function should do the following: 
	 - Check cars passing parallel to Chase_VehicleObject to see if they match the Number_Plate property in the suspect description.
	 - it does this by calling checkCar_isAtSide.
	 - if a positive result is returned then the Number_Plate property of the found car is then checked against the suspect description.
	 - if a match is found then the object of the car in question is returned.
	 - otherwise return false.
	*/
	var found = checkCar_isAtSide(Chase_VehicleObject);
	if (found)
		console.log(`Found car: ${found.Number_Plate}`);

	if (found && found.Number_Plate == "11BDI8") {
		return found;
	}
	else
		return false;
}


function pursue_suspect() {
	/*
	This function should do the following: 
	 - only operate if the Following_Suspect property of Chase_VehicleObject is true.
	 - scale the Accel_Amt property of Chase_VehicleObject by a factor of 1.001.
	 - use the min function to make sure that Chase_VehicleObject's Accel_Amt property does not exceed 6.
	 - it should traverse car_list calling checkVehicle_infront for each car to detect any cars in front of Chase_VehicleObject.
	 - if a positive result is returned it should check to see if the Number_Plate property of that car matches that of suspect.
	 - for a match, stop_suspect should be called, otherwise call swap_lanes.
	*/
	if (Chase_VehicleObject.Following_Suspect) {
		console.log('pursuing');
		Chase_VehicleObject.Accel_Amt = min(Chase_VehicleObject.Accel_Amt * 1.001, 6);
		for (var i = 0; i < car_list.length; i++) {
			var infront = checkVehicle_infront(Chase_VehicleObject, car_list[i]);
			if (infront) {
				if (infront == "11BDI8") {
					console.log('Suspect found');
					stop_suspect(i);
				}
				else
					swap_lanes(Chase_VehicleObject);
			}
		}
	}
}


function stop_suspect(target_car) {
	/*
	This function should do the following: 
	 - set the isArrested property of the car at the index of target_car to true.
	 - set the IsApprehending_Suspect property of Chase_VehicleObject to true.
	 - set the Accel_Amt properties of both vehicles to zero.
	*/
	car_list[target_car].isArrested = true;
	Chase_VehicleObject.IsApprehending_Suspect = true;
	Chase_VehicleObject.Accel_Amt = 0;
	car_list[target_car].Accel_Amt = 0;
}


//////////////DO NOT CHANGE CODE BELOW THIS LINE//////////////////

var Chase_VehicleObject;

var roadWidth;
var roadLeftEdge;
var Lane_Position_a;
var Lane_Position_b;
var carImages = {};
var suspect;

var car_list = [
	{ X_Position: 300, Y_Position: 0, Miles_Driven: -200, Car_Category: 'whiteCar', Number_Plate: '5AVKJA', Accel_Amt: 2, exhaust: [] }, { X_Position: 500, Y_Position: 0, Miles_Driven: 200, Car_Category: 'blueCar', Number_Plate: 'YWGT1X', Accel_Amt: 2, exhaust: [] }, { X_Position: 300, Y_Position: 0, Miles_Driven: 600, Car_Category: 'greenCar', Number_Plate: 'JCH9WB', Accel_Amt: 2, exhaust: [] }, { X_Position: 300, Y_Position: 0, Miles_Driven: 1000, Car_Category: 'whiteCar', Number_Plate: 'FQUBL0', Accel_Amt: 2, exhaust: [] }, { X_Position: 300, Y_Position: 0, Miles_Driven: 1400, Car_Category: 'blueCar', Number_Plate: 'ALW6SU', Accel_Amt: 2, exhaust: [] }, { X_Position: 300, Y_Position: 0, Miles_Driven: 1800, Car_Category: 'greenCar', Number_Plate: 'V0FI0I', Accel_Amt: 2, exhaust: [] }, { X_Position: 300, Y_Position: 0, Miles_Driven: 2200, Car_Category: 'redCar', Number_Plate: '11BDI8', Accel_Amt: 2, exhaust: [] }, { X_Position: 500, Y_Position: 0, Miles_Driven: 2600, Car_Category: 'whiteCar', Number_Plate: 'XVNVCD', Accel_Amt: 2, exhaust: [] }, { X_Position: 500, Y_Position: 0, Miles_Driven: 3000, Car_Category: 'greenCar', Number_Plate: '6D46CC', Accel_Amt: 2, exhaust: [] }, { X_Position: 500, Y_Position: 0, Miles_Driven: 3400, Car_Category: 'greenCar', Number_Plate: 'PEREJA', Accel_Amt: 2, exhaust: [] }, { X_Position: 500, Y_Position: 0, Miles_Driven: 3800, Car_Category: 'blueCar', Number_Plate: '3DHQRZ', Accel_Amt: 2, exhaust: [] }, { X_Position: 500, Y_Position: 0, Miles_Driven: 4200, Car_Category: 'greenCar', Number_Plate: 'W15ILK', Accel_Amt: 2, exhaust: [] }, { X_Position: 500, Y_Position: 0, Miles_Driven: 4600, Car_Category: 'blueCar', Number_Plate: '1IYRYT', Accel_Amt: 2, exhaust: [] }, { X_Position: 300, Y_Position: 0, Miles_Driven: 5000, Car_Category: 'whiteCar', Number_Plate: 'OUFN9N', Accel_Amt: 2, exhaust: [] }, { X_Position: 500, Y_Position: 0, Miles_Driven: 5400, Car_Category: 'redCar', Number_Plate: 'LK7IHU', Accel_Amt: 2, exhaust: [] }, { X_Position: 500, Y_Position: 0, Miles_Driven: 5800, Car_Category: 'blueCar', Number_Plate: 'DZF465', Accel_Amt: 2, exhaust: [] }, { X_Position: 500, Y_Position: 0, Miles_Driven: 6200, Car_Category: 'greenCar', Number_Plate: '5WMBZ6', Accel_Amt: 2, exhaust: [] }, { X_Position: 300, Y_Position: 0, Miles_Driven: 6600, Car_Category: 'redCar', Number_Plate: 'YI2MB0', Accel_Amt: 2, exhaust: [] }, { X_Position: 300, Y_Position: 0, Miles_Driven: 7000, Car_Category: 'blueCar', Number_Plate: 'KYWZ0B', Accel_Amt: 2, exhaust: [] }, { X_Position: 300, Y_Position: 0, Miles_Driven: 7400, Car_Category: 'blueCar', Number_Plate: '62MVVT', Accel_Amt: 2, exhaust: [] }
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
	Lane_Position_a = 300;
	Lane_Position_b = 500;

	Chase_VehicleObject =
	{
		X_Position: roadLeftEdge + roadWidth / 4,
		Y_Position: 550,
		Miles_Driven: 0,
		Accel_Amt: 3,
		EngineRumble_Amt: 0,
		Car_Category: 'detective',
		Number_Plate: '5L3UTH',
		IsApprehending_Suspect: false,
		Following_Suspect: false,
		exhaust: []
	}


}



function draw() {
	background(0);

	drawRoad();
	drawCars();

	if (suspect) {
		if (suspect.isArrested) {
			fill(255);

			text("suspect isArrested!", width / 2, height / 2);
		}

	}


	////////////////////// HANDLE DETECTIVE /////////////////////////

	if (!Chase_VehicleObject.Following_Suspect && !Chase_VehicleObject.IsApprehending_Suspect) {
		drive_vehicle();
		for (var i = 0; i < car_list.length; i++) {
			var b2b = checkVehicle_infront(Chase_VehicleObject, car_list[i]);
			if (b2b) swap_lanes(Chase_VehicleObject);
		}
		var a = find_suspect();
		if (a != false) suspect = a;
		if (suspect) Chase_VehicleObject.Following_Suspect = true;
	}
	else if (!Chase_VehicleObject.IsApprehending_Suspect) {
		pursue_suspect();
		drive_vehicle();
	}


	////////////////////// HANDLE ASSAILANT /////////////////////////

	if (suspect) {
		if (!suspect.isArrested) {
			suspect.Accel_Amt = 5;
			for (var i = 0; i < car_list.length; i++) {
				var b2b = checkVehicle_infront(suspect, car_list[i]);
				if (b2b) {
					if (b2b.Number_Plate != suspect.Number_Plate) {
						swap_lanes(suspect);
					}
				}
			}
		}
	}


	//////////////////////HANDLE THE OTHER CARS//////////////////////

	for (var i = 0; i < car_list.length; i++) {
		car_list[i].Miles_Driven += car_list[i].Accel_Amt;
		car_list[i].Y_Position = Chase_VehicleObject.Y_Position - car_list[i].Miles_Driven + Chase_VehicleObject.Miles_Driven;

		if (suspect) {
			if (suspect.isArrested) {
				if (car_list[i].X_Position == Chase_VehicleObject.X_Position) {
					if (car_list[i].Miles_Driven < Chase_VehicleObject.Miles_Driven) {
						if (car_list[i].Miles_Driven - Chase_VehicleObject.Miles_Driven < 200) {
							swap_lanes(car_list[i]);
						}
					}
				}
			}
		}

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
			roadLeftEdge + roadWidth / 2, i * 100 + (Chase_VehicleObject.Miles_Driven % 100),
			roadLeftEdge + roadWidth / 2, i * 100 + 70 + (Chase_VehicleObject.Miles_Driven % 100)
		);
	}
}

function drawCars() {
	//draw the detective car

	drawExhaust(Chase_VehicleObject);
	image
		(
			carImages["detective"],
			Chase_VehicleObject.X_Position - carImages["detective"].width / 2 + random(-Chase_VehicleObject.EngineRumble_Amt, Chase_VehicleObject.EngineRumble_Amt),
			Chase_VehicleObject.Y_Position + random(-Chase_VehicleObject.EngineRumble_Amt, Chase_VehicleObject.EngineRumble_Amt)
		);

	//draw all other cars

	for (var i = 0; i < car_list.length; i++) {
		if (car_list[i].Y_Position < height && car_list[i].Y_Position > -height / 2) {
			image(
				carImages[car_list[i].Car_Category],
				car_list[i].X_Position - carImages[car_list[i].Car_Category].width / 2,
				car_list[i].Y_Position
			);
			turn_carEngine(car_list[i]);

			drawExhaust(car_list[i]);
		}
	}

}

function turn_carEngine(car) {

	car.exhaust.push({ size: 2, x: car.X_Position, y: car.Y_Position + carImages[car.Car_Category].height });

	for (var i = car.exhaust.length - 1; i >= 0; i--) {

		car.exhaust[i].y += max(0.75, car.Accel_Amt / 3);
		if (car.Car_Category != "detective") car.exhaust[i].y += (Chase_VehicleObject.Accel_Amt - car.Accel_Amt);
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
