/*
Officer: 1192743
CaseNum: 601-2-28443862-1192743

Case 601 - Murdering Again - stage 3

Now murders are beginning to occur - we're pretty sure that this is the work of Fry.
If we can place her near any of the recent crime scenes in the area we should be able narrow down her location.

In the setup function, use a for loop to traverse the sightings, marking all of the locations on the map
where she was last seen. Do this by drawing small, FireBrick stroke rectangles centered over each location.

In addition, we've assembled a list of recent thefts in the area. Using another for loop to traverse the
recent crime records, you should mark those locations on the map. Do this by drawing small, SandyBrown fill ellipses at each location.

Use X11 colours. You can find a reference table at https://en.wikipedia.org/wiki/Web_colors.

Let's try to catch Fry by looking patterns between sightings and crimes. If she was within less than 37 pixels of any of the crimes then the details
should be pushed to possible matches with the following format.

{ crime:{x: 0, y:0, victimName: "John Doe"}, suspect:{x: 0, y:0} }

Note that the possible matches are already being drawn.
Your job is simply to fill the array with the correct data.

For this mission you will need ONLY the following:

- for loop
- dist()
- if()
- stroke
- rect() NB. Draw each rectangle with the point at its center.

- fill
- ellipse()


*/

var countyMap;

var possibleMatches = [];

//Sightings of Casey Fry.

var Suspect_Sighted = [
  { coordX: 639, coordY: 288 },
  { coordX: 681, coordY: 286 },
  { coordX: 712, coordY: 293 },
  { coordX: 756, coordY: 310 },
  { coordX: 715, coordY: 368 },
  { coordX: 701, coordY: 425 },
  { coordX: 753, coordY: 436 },
  { coordX: 815, coordY: 468 },
  { coordX: 795, coordY: 506 },
  { coordX: 788, coordY: 497 },
  { coordX: 781, coordY: 486 },
  { coordX: 768, coordY: 489 },
  { coordX: 750, coordY: 500 },
  { coordX: 732, coordY: 506 },
  { coordX: 714, coordY: 514 },
  { coordX: 695, coordY: 531 },
  { coordX: 693, coordY: 552 },
  { coordX: 654, coordY: 523 },
  { coordX: 624, coordY: 500 },
  { coordX: 594, coordY: 484 },
  { coordX: 555, coordY: 474 }
];


//Recent crime records.

var Killing_Data = [
  { locationX: 409, locationY: 446, victimName: 'LARRAINE PEGORD' },
  { locationX: 443, locationY: 419, victimName: 'JACQUELINE DURANTS' },
  { locationX: 465, locationY: 548, victimName: 'GAYLA WILLMAR' },
  { locationX: 709, locationY: 552, victimName: 'JENIFFER DEAUVILLE' },
  { locationX: 695, locationY: 421, victimName: 'RANDEE CROME' },
  { locationX: 652, locationY: 268, victimName: 'BRAD SILVEIRA' },
  { locationX: 641, locationY: 306, victimName: 'LAKESHA SYMMES' },
  { locationX: 119, locationY: 344, victimName: 'TU DAVISWOOD' },
  { locationX: 114, locationY: 359, victimName: 'BRIDGET BROADVIEW' },
  { locationX: 90, locationY: 490, victimName: 'PIERRE DORCEY' },
  { locationX: 76, locationY: 516, victimName: 'JESSIA PORTOS' },
  { locationX: 615, locationY: 741, victimName: 'JULIANA ADVERSANE' },
  { locationX: 349, locationY: 796, victimName: 'NICOLE ASHELY' },
  { locationX: 456, locationY: 770, victimName: 'JAUNITA JOYER' }
];


function preload() {
  countyMap = loadImage("map.png")
}

function setup() {
  createCanvas(countyMap.width, countyMap.height);

  image(countyMap, 0, 0);

  //add your code below here
  noFill();
  stroke(178, 34, 34);
  for (var i = 0; i < Suspect_Sighted.length; i++) {
    rect(Suspect_Sighted[i].coordX - 5, Suspect_Sighted[i].coordY - 5, 10, 10);
    for (var j = 0; j < Killing_Data.length; j++) {
      if (dist(Suspect_Sighted[i].coordX, Suspect_Sighted[i].coordY, Killing_Data[j].locationX, Killing_Data[j].locationY) < 37) {
        console.log(`adding suspect ${i}`);
        possibleMatches.push({ crime: { x: Killing_Data[j].locationX, y: Killing_Data[j].locationY, victimName: Killing_Data[j].victimName }, suspect: { x: Suspect_Sighted[i].coordX, y: Suspect_Sighted[i].coordY } });
      }
    }
  }

  noStroke();
  fill(244, 164, 96);
  for (var i = 0; i < Killing_Data.length; i++) {
    ellipse(Killing_Data[i].locationX, Killing_Data[i].locationY, 10);
  }

  // code to draw the matches ( if any)
  for (let i = 0; i < possibleMatches.length; i++) {
    stroke(127);
    strokeWeight(3);
    line(possibleMatches[i].crime.x, possibleMatches[i].crime.y, possibleMatches[i].suspect.x, possibleMatches[i].suspect.y);

    noStroke();
    fill(127);
    text(possibleMatches[i].crime.victimName, possibleMatches[i].crime.x + 15, possibleMatches[i].crime.y + 15);
  }
}

//We are not using the draw function this time
