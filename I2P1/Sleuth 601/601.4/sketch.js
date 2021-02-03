/*
Officer: 1192743
CaseNum: 601-3-93686774-1192743

Case 601 - Narrowing in - stage 4

Casey Fry is on a killing spree and we still haven’t caught her.
We need a more sophisticated approach.

In the setup function, use a for loop to traverse the sightings, marking all of the locations on the map
where she was last seen. Do this by drawing small, Aqua stroke triangles centered over each location.

In addition, we've assembled a list of recent thefts in the area. Using another for loop to traverse the
recent crime records, you should mark those locations on the map. Do this by drawing small, Navy fill ellipses at each location.

This time we will catch Fry by comparing both distance from the crimes and dates of sightings.
If she was within less than 69 pixels of any of the crimes within no more than 3 days of their occurrence then the details
should be pushed to the list of possible matches with the following format.

{ suspect_x: 0, suspect_y: 0 ,crime_x: 0, crime_y: 0, victimName: "John_Doe" }

Note that the possible matches are already being drawn.
Your job is to fill the array with the correct data.

Use X11 colours. You can find a reference table at https://en.wikipedia.org/wiki/Web_colors.

For this mission you will need ONLY the following:

- for loop
- if()
- dist()
- abs()
- stroke
- triangle() NB. Draw each triangle with the point roughly at its center.

- fill
- ellipse()


*/

var countyMap;

var possibleMatches = [];

//Sightings of Casey Fry.

var Casey_Sighted = {
	PosX: [518, 486, 475, 376, 316, 265, 253, 240, 220, 178, 199, 146, 115, 67, 39, 68],
	PosY: [471, 508, 566, 554, 559, 614, 609, 604, 597, 600, 604, 582, 551, 495, 493, 461],
	recordedDay: [12, 12, 13, 13, 13, 14, 14, 14, 15, 15, 17, 18, 20, 21, 22, 24],
};

//Recent crime records.

var Crime_Log_locX = [438, 408, 408, 642, 623, 95, 75, 269, 389, 484, 496, 546, 538, 702, 817];
var Crime_Log_locY = [420, 451, 377, 289, 279, 488, 522, 597, 554, 549, 484, 463, 359, 412, 474];
var Crime_Log_recordDate = [11, 11, 13, 16, 16, 17, 18, 26, 28, 2, 9, 14, 12, 17, 18];
var Crime_Log_victim = ['LAVERNE JACQUELIN', 'DRUSILLA WARMAN', 'LOUISE ZETLAND', 'BRIDGET BROADVIEW', 'TAMICA MAUBERT', 'KITTY THAXTER', 'LINETTE MOHWAWK', 'JACQUELINE DURANTS', 'MALINDA GOODBURY', 'JULIANA ADVERSANE', 'JAUNITA JOYER', 'DARBY MYRLE', 'LARRAINE PEGORD', 'JESSIA PORTOS', 'LESLEY MONKSFORD'];


function preload() {
	countyMap = loadImage("map.png")
}

function setup() {
	createCanvas(countyMap.width, countyMap.height);

	image(countyMap, 0, 0);

	//add your code below here

	noFill();
	stroke(0, 255, 255);
	for (var i = 0; i < Casey_Sighted.PosX.length; i++) {
		triangle(
			Casey_Sighted.PosX[i], Casey_Sighted.PosY[i] - 5,
			Casey_Sighted.PosX[i] + 5, Casey_Sighted.PosY[i] + 5,
			Casey_Sighted.PosX[i] - 5, Casey_Sighted.PosY[i] + 5,
		);
		for (var j = 0; j < Crime_Log_locX.length; j++) {
			var d = dist(Casey_Sighted.PosX[i], Casey_Sighted.PosY[i], Crime_Log_locX[j], Crime_Log_locY[j]);
			var days = abs(Casey_Sighted.recordedDay[i] - Crime_Log_recordDate[j]);
			if (d < 69 && days <= 3)
				possibleMatches.push({ suspect_x: Casey_Sighted.PosX[i], suspect_y: Casey_Sighted.PosY[i], crime_x: Crime_Log_locX[j], crime_y: Crime_Log_locY[j], victimName: Crime_Log_victim[j] });
		}
	}

	//	{ suspect_x: 0, suspect_y: 0 ,crime_x: 0, crime_y: 0, victimName: "John_Doe" }

	noStroke();
	fill(0, 0, 128);
	for (var i = 0; i < Crime_Log_locX.length; i++) {
		ellipse(Crime_Log_locX[i], Crime_Log_locY[i], 10);
	}

	// code to draw the matches ( if any)
	for (let i = 0; i < possibleMatches.length; i++) {
		stroke(127);
		strokeWeight(3);
		line(possibleMatches[i].crime_x, possibleMatches[i].crime_y, possibleMatches[i].suspect_x, possibleMatches[i].suspect_y);

		noStroke();
		fill(127);
		text(possibleMatches[i].victimName, possibleMatches[i].crime_x + 15, possibleMatches[i].crime_y + 15);
	}
}

//We are not using the draw function this time
