/*

Officer: 1192743
CaseNum: 701-2-40370350-1192743

Case 701 - Recognisable robber - stage 3

Kid you’re becoming a victim of your own success.
I just had a call from DI Max down at the precinct. He specifically requested your services.
They finally have a reliable witness for a robber who has been causing mayhem for some months.
Luckily they have a witness statement from juliana crome. You know what to do kid.

Please create a function that takes a suspect object as parameter from the data structure below.
Your function should return a number value indicating how many of their properties match the witness statement.
You should use conditional statements to compare the suspect's properties to the statement.

The function is already being called in draw() but it is your job to implement it.

There are many possible ways of carrying out your duties,
but you should complete this task using ONLY the following
commands:

 - function matchSuspect(suspectObj){}
 - if()

Witness statement:

It all started when I was exiting the store. That's when I noticed them. It was very dark and I could barely see, It was so scary! I remember they had a jellyfish tattoo. They seemed to be between the age of 38 and 72 years old. The person I saw was female. They were fairly tall, I think between a height of 170 and 192 cm. They wore red glasses. I'll never forget their pale eyes. They brobably weigh between 70 and 87 kg. They had shaved hair. I hope I never have to go through that again. 

*/

var suspectList = [
	{
		"name": "JESUS TINTLE",
		"gender": "female",
		"tattoo": "dark black",
		"eyes": "grey",
		"glasses": "light tan",
		"height": 162,
		"weight": 72,
		"age": 46
	},
	{
		"name": "LARRAINE DAVISWOOD",
		"gender": "female",
		"tattoo": "dragon",
		"eyes": "green",
		"glasses": "dark brown",
		"height": 173,
		"weight": 67,
		"age": 21
	},
	{
		"name": "LOUISE MOHWAWK",
		"gender": "female",
		"tattoo": "sword",
		"eyes": "brown",
		"glasses": "white",
		"height": 172,
		"weight": 85,
		"age": 38
	},
	{
		"name": "SUMMER NIEMELA",
		"gender": "male",
		"tattoo": "big arrow",
		"eyes": "blue",
		"glasses": "very thick",
		"height": 162,
		"weight": 74,
		"age": 38
	},
	{
		"name": "DRUSILLA WILLMAR",
		"gender": "female",
		"tattoo": "jellyfish",
		"eyes": "pale",
		"glasses": "red",
		"height": 179,
		"weight": 75,
		"age": 63
	},
	{
		"name": "MALINDA THAXTER",
		"gender": "male",
		"tattoo": "facial",
		"eyes": "grey",
		"glasses": "cheap plastic",
		"height": 179,
		"weight": 74,
		"age": 46
	},
	{
		"name": "BRAD ZETLAND",
		"gender": "male",
		"tattoo": "bull",
		"eyes": "pale",
		"glasses": "blue",
		"height": 173,
		"weight": 84,
		"age": 49
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
		let matchingProperties = matchSuspect(suspectList[i]);
		fill(50 * matchingProperties, 250 - (50 * matchingProperties), 0);
		text("found " + matchingProperties + " matching properties for " + suspectList[i].name, 60, 60 + i * 20);
	}
}

/*
It all started when I was exiting the store. That's when I noticed them. 
It was very dark and I could barely see, It was so scary! 
I remember they had a jellyfish tattoo. 
They seemed to be between the age of 38 and 72 years old. 
The person I saw was female. They were fairly tall, I think between a height of 170 and 192 cm.
They wore red glasses. I'll never forget their pale eyes. They brobably weigh between 70 and 87 kg. 
They had shaved hair. I hope I never have to go through that again. 
*/
function matchSuspect(suspectObj) {
	var numMatches = 0;

	/*
		"gender": "male",
		"tattoo": "bull",
		"eyes": "pale",
		"glasses": "blue",
		"height": 173,
		"weight": 84,
		"age": 49
	*/
	numMatches += (suspectObj.tattoo == "jellyfish") ? 1 : 0;
	numMatches += (suspectObj.age >= 38 && suspectObj.age <= 72) ? 1 : 0;
	numMatches += (suspectObj.gender == "female") ? 1 : 0;
	numMatches += (suspectObj.height >= 170 && suspectObj.height <= 192) ? 1 : 0;
	numMatches += (suspectObj.weight >= 70 && suspectObj.weight <= 87) ? 1 : 0;
	numMatches += (suspectObj.glasses == "red") ? 1 : 0;
	numMatches += (suspectObj.eyes == "pale") ? 1 : 0;

	return numMatches;
}