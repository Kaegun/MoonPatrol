/*
Officer: 1192743
CaseNum: 601-1-48563104-1192743

Case 601 - Cross Reference - stage 2

Fry is still on the loose. We think she’s resorted to stealing to get by.
Hopefully we can track her down by cross-referencing sightings and recent thefts in the area.

In the setup function, use a for loop to traverse the sightings, marking all of the locations on the map
where she was last seen. Do this by drawing small, Lime fill triangles centered over each location.

In addition, we've assembled a list of recent thefts in the area. Using another for loop to traverse the
recent crime records, you should mark those locations on the map. Do this by drawing small, LawnGreen fill rectangles centered over each location.

Use X11 colours. You can find a reference table at https://en.wikipedia.org/wiki/Web_colors.

For this mission you will need ONLY the following:

- for loop
- fill
- triangle() NB. Draw each triangle with the point roughly at its center.

- fill
- rect() NB. Draw each rectangle with the point at its center.


*/

var countyMap;

//Sightings of Casey Fry.

var FugitiveSightings = [
  { Location_X: 639, Location_Y: 288 },
  { Location_X: 681, Location_Y: 286 },
  { Location_X: 712, Location_Y: 293 },
  { Location_X: 756, Location_Y: 310 },
  { Location_X: 715, Location_Y: 368 },
  { Location_X: 701, Location_Y: 425 },
  { Location_X: 753, Location_Y: 436 },
  { Location_X: 815, Location_Y: 468 },
  { Location_X: 795, Location_Y: 506 },
  { Location_X: 788, Location_Y: 497 },
  { Location_X: 781, Location_Y: 486 },
  { Location_X: 768, Location_Y: 489 },
  { Location_X: 750, Location_Y: 500 },
  { Location_X: 732, Location_Y: 506 },
  { Location_X: 714, Location_Y: 514 },
  { Location_X: 695, Location_Y: 531 },
  { Location_X: 693, Location_Y: 552 },
  { Location_X: 654, Location_Y: 523 },
  { Location_X: 624, Location_Y: 500 },
  { Location_X: 594, Location_Y: 484 },
  { Location_X: 555, Location_Y: 474 }
];


//Recent crime records.

var CrimesceneLog = [
  { Loc_X: 403, Loc_Y: 401 },
  { Loc_X: 402, Loc_Y: 360 },
  { Loc_X: 427, Loc_Y: 403 },
  { Loc_X: 646, Loc_Y: 284 },
  { Loc_X: 639, Loc_Y: 264 },
  { Loc_X: 830, Loc_Y: 434 },
  { Loc_X: 809, Loc_Y: 443 },
  { Loc_X: 844, Loc_Y: 496 },
  { Loc_X: 802, Loc_Y: 350 },
  { Loc_X: 683, Loc_Y: 413 },
  { Loc_X: 552, Loc_Y: 464 },
  { Loc_X: 629, Loc_Y: 498 },
  { Loc_X: 712, Loc_Y: 562 },
  { Loc_X: 783, Loc_Y: 603 },
  { Loc_X: 415, Loc_Y: 225 },
  { Loc_X: 561, Loc_Y: 282 },
  { Loc_X: 562, Loc_Y: 392 },
  { Loc_X: 751, Loc_Y: 283 },
  { Loc_X: 680, Loc_Y: 359 },
  { Loc_X: 626, Loc_Y: 436 },
  { Loc_X: 701, Loc_Y: 455 },
  { Loc_X: 838, Loc_Y: 565 },
  { Loc_X: 322, Loc_Y: 508 },
  { Loc_X: 468, Loc_Y: 556 },
  { Loc_X: 625, Loc_Y: 737 }
];


function preload() {
  countyMap = loadImage("map.png");
}

function setup() {
  createCanvas(countyMap.width, countyMap.height);

  image(countyMap, 0, 0);

  //add your code below here
  noStroke();

  fill(0, 255, 0);
  for (var i = 0; i < FugitiveSightings.length; i++) {
    triangle(
      FugitiveSightings[i].Location_X, FugitiveSightings[i].Location_Y - 5,
      FugitiveSightings[i].Location_X + 5, FugitiveSightings[i].Location_Y + 5,
      FugitiveSightings[i].Location_X - 5, FugitiveSightings[i].Location_Y + 5,
    );
  }

  fill(124, 252, 0);
  for (var i = 0; i < CrimesceneLog.length; i++) {
    rect(CrimesceneLog[i].Loc_X - 5, CrimesceneLog[i].Loc_Y - 5, 10, 10);
  }

}

//We are not using the draw function this time
