/*

Officer: 1192743
CaseNum: 701-3-39971035-1192743

Case 701 - Believable burglar - stage 4

Those guys down at the precinct need to take your brain for one final spin.
This burglar has been a particularly slippery character and now they believe that they have them.
Luckily they have a have a witness statement from hang tintle.
All they need is for you to do the detective work.

This time you must implement two functions:

- A checkSuspect function that takes a suspect object as parameter from the data structure below.
Your function should return a number value indicating how many of their properties match the witness statement.
You should use conditional statements to compare the suspect's properties to the statement.

- A traverseSuspects function which traverses the array of suspects and returns the object representing the guilty suspect,
otherwise - return an empty object.

There are many possible ways of carrying out your duties,
but you should complete this task using ONLY the following
commands:

 - function checkSuspect(suspectObj){}
 - function traverseSuspects(){}
 - if()

Witness statement:

I remember walking down the street and then I saw them. They were fairly tall, I think between a height of 150 and 188 cm. They wore very thin glasses. They were carrying a plastic box. They brobably weigh between 68 and 77 kg. They seemed to be between the age of 18 and 45 years old. It was so scary! It was so scary! They had ginger hair. I distinctly remember that they were wearing a orange socks, I remember thinking that was quite unusual. It was so scary! Their expression seemed blank. I'll never forget their brown eyes. I hope I never have to go through that again. 

*/

var suspectList = [
	{
		"name": "LAKESHA DORCEY",
		"eyes": "brown",
		"accessory": "plastic box",
		"item": "orange socks",
		"expression": "blank",
		"weight": 74,
		"age": 29,
		"height": 181
	},
	{
		"name": "LARRAINE CROME",
		"eyes": "brown",
		"accessory": "orange plasic bag",
		"item": "pair of leather trousers",
		"expression": "menacing",
		"weight": 93,
		"age": 36,
		"height": 192
	},
	{
		"name": "JESUS DEAUVILLE",
		"eyes": "pale",
		"accessory": "brown paper bag",
		"item": "purple hat",
		"expression": "empty",
		"weight": 75,
		"age": 54,
		"height": 189
	},
	{
		"name": "LESLEY PEGORD",
		"eyes": "green",
		"accessory": "orange tote bag",
		"item": "red necktie",
		"expression": "nerveous",
		"weight": 80,
		"age": 24,
		"height": 179
	},
	{
		"name": "GAYLA ADVERSANE",
		"eyes": "black",
		"accessory": "big black envelope",
		"item": "dotted necktie",
		"expression": "sad",
		"weight": 81,
		"age": 31,
		"height": 203
	},
	{
		"name": "LOUISE DAVISWOOD",
		"eyes": "grey",
		"accessory": "laptop bag",
		"item": "net weave shirt",
		"expression": "confused",
		"weight": 75,
		"age": 39,
		"height": 179
	},
	{
		"name": "HANG OORIN",
		"eyes": "blue",
		"accessory": "red backpack",
		"item": "pink scarf",
		"expression": "depressed",
		"weight": 70,
		"age": 36,
		"height": 160
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

// Declare both your functions here



function draw() {
	//You don't need to alter this code
	image(backgroundImg, 0, 0);

	fill(255, 0, 0);
	text(traverseSuspects().name + " is guilty!", 60, 80);
}

function traverseSuspects() {
	var suspect = { "name": "" };
	var bestMatch = 0, matches;
	for (var i = 0; i < suspectList.length; i++) {
		matches = checkSuspect(suspectList[i]);
		if (matches > bestMatch) {
			suspect = suspectList[i];
			bestMatch = matches;
		}
	}

	return suspect;
}

/*
I remember walking down the street and then I saw them. 
They were fairly tall, I think between a height of 150 and 188 cm. 
They wore very thin glasses. They were carrying a plastic box. 
They brobably weigh between 68 and 77 kg. 
They seemed to be between the age of 18 and 45 years old. 
It was so scary! It was so scary! They had ginger hair.
I distinctly remember that they were wearing a orange socks, I remember thinking that was quite unusual. 
It was so scary! Their expression seemed blank. I'll never forget their brown eyes. 
I hope I never have to go through that again. 
*/
function checkSuspect(suspectObj) {

	var matches = 0;
	matches += (suspectObj.height >= 150 && suspectObj.height <= 188) ? 1 : 0;
	matches += (suspectObj.accessory == "plastic box") ? 1 : 0;
	matches += (suspectObj.weight >= 68 && suspectObj.weight <= 77) ? 1 : 0;
	matches += (suspectObj.age >= 18 && suspectObj.age <= 45) ? 1 : 0;
	matches += (suspectObj.item == "orange socks") ? 1 : 0;
	matches += (suspectObj.expression == "blank") ? 1 : 0;
	matches += (suspectObj.eyes == "brown") ? 1 : 0;

	return matches;
}