/*

Officer: 1192743
CaseNum: 701-0-93375415-1192743

Case 701 - Probable pick pocket - stage 1

There has been a spate of pickpocketing downtown and we’ve been asked to lend a hand down at the precinct.
They’ve managed to collect a witness statement from an unsuspecting tourist randee mohwawk and also rounded up a bunch of the usual suspects.
We need you to unravel this mess and work out who is the guilty one.

Please create a function that takes a suspect object as parameter from the data structure below.
Your function should return a boolean value indicating whether or not they match the witness statement.
You should use conditional statements to compare the suspect's properties to the statement.
It should only return "true" if the suspect matches the description in full.

The function is already being called in draw() but it is your job to implement it.

There are many possible ways of carrying out your duties,
but you should complete this task using ONLY the following
commands:

 - function matchProperties(suspectObj){}
 - if()

Witness statement:

It all started when I was exiting the store. That's when I noticed them. 
It was very dark and I could barely see, They had white hair. 
It was so scary! They were carrying a brown paper bag. 
Their expression seemed nerveous. That's all I can remember about them. 

*/

var suspectList = [
	{
		"name": "JACQUELINE MONKSFORD",
		"accessory": "black duffle bag",
		"hair": "short black",
		"expression": "angry"
	},
	{
		"name": "JULIANA CROME",
		"accessory": "brown paper bag",
		"hair": "white",
		"expression": "nerveous"
	},
	{
		"name": "LAVERNE MAUBERT",
		"accessory": "big black envelope",
		"hair": "no",
		"expression": "nerveous"
	}
];

var myFont;
var backgroundImg;

function preload() {
	myFont = loadFont('SpecialElite.ttf');
	backgroundImg = loadImage("Background.png");
}

function setup() {
	createCanvas(640, 480);
	textFont(myFont);
}

// Declare your function here



function draw() {
	//You don't need to alter this code
	image(backgroundImg, 0, 0);

	for (let i = 0; i < suspectList.length; i++) {
		if (matchProperties(suspectList[i]) == true) {
			fill(255, 0, 0);
			text(suspectList[i].name + " is guilty!", 60, 60 + i * 20);
		} else {
			fill(0, 155, 0);
			text(suspectList[i].name + " is not guilty", 60, 60 + i * 20);
		}
	}
}

/*
It all started when I was exiting the store. That's when I noticed them. 
It was very dark and I could barely see, They had white hair. 
It was so scary! They were carrying a brown paper bag. 
Their expression seemed nerveous. That's all I can remember about them. 
*/
function matchProperties(suspect) {
	return (suspect.hair == "white"
		&& suspect.accessory == "brown paper bag"
		&& suspect.expression == "nerveous");
}