/*

Officer: 1192743
CaseNum: 701-1-15329162-1192743

Case 701 - Credible cat thief - stage 2

Kid they need you down at the precinct again.
This time it's a sneaky cat thief who has been absconding with the neighbourhoods felines for some time.
Luckily old Mrs Olivetti caught a glimpse of them as they disappeared over her back fence.
We’ve a bunch of likely characters lined-up but we need your brains to solve the mystery.

Please create a function that takes a suspect object as parameter from the data structure below.
Your function should return a boolean value indicating whether or not they match the witness statement.
You should use conditional statements to compare the suspect's properties to the statement.
It should only return "true" if the suspect matches the description in full.

The function is already being called in draw() but it is your job to implement it.

There are many possible ways of carrying out your duties,
but you should complete this task using ONLY the following
commands:

 - function checkSuspectTraits(suspectObj){}
 - if()

Witness statement:

It was last Thursday, I heard noises outside so I looked out and saw a person in the steet. It's hard to say. It was very dark and I could barely see, They had red hair. They were quite big, they probably weigh more than 75 Kg. I remember they had a dark black tattoo. I distinctly remember that they were wearing a red necktie, I remember thinking that was quite unusual. The person I saw was male. I would say they were shorter than 159 cm. Can I go home now Sir? 

*/

var usualSuspects = [
	{
		"name": "LOUISE OORIN",
		"gender": "male",
		"hair": "red",
		"item": "red necktie",
		"weight": 78,
		"height": 150
	},
	{
		"name": "LIANNE MONKSFORD",
		"gender": "male",
		"hair": "ginger",
		"item": "pair of leather trousers",
		"weight": 68,
		"height": 192
	},
	{
		"name": "JACQUELINE DEAUVILLE",
		"gender": "male",
		"hair": "shaved",
		"item": "dotted necktie",
		"weight": 70,
		"height": 175
	},
	{
		"name": "JESSIA MYRLE",
		"gender": "female",
		"hair": "no",
		"item": "net weave shirt",
		"weight": 100,
		"height": 172
	},
	{
		"name": "TU NIEMELA",
		"gender": "female",
		"hair": "short black",
		"item": "fur vest",
		"weight": 71,
		"height": 178
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

	for (let i = 0; i < usualSuspects.length; i++) {
		if (checkSuspectTraits(usualSuspects[i]) == true) {
			fill(255, 0, 0);
			text(usualSuspects[i].name + " is guilty!", 60, 60 + i * 20);
		} else {
			fill(0, 155, 0);
			text(usualSuspects[i].name + " is not guilty", 60, 60 + i * 20);
		}
	}
}

/*
It was last Thursday, I heard noises outside so I looked out and saw a person in the steet. 
It's hard to say. It was very dark and I could barely see, They had red hair. 
They were quite big, they probably weigh more than 75 Kg. 
I remember they had a dark black tattoo. I distinctly remember that they were wearing a red necktie, 
I remember thinking that was quite unusual. The person I saw was male. 
I would say they were shorter than 159 cm. Can I go home now Sir? 
*/
function checkSuspectTraits(suspectObj) {
	return (
		suspectObj.gender == "male"
		&& suspectObj.hair == "red"
		&& suspectObj.item == "red necktie"
		&& suspectObj.weight > 75
		&& suspectObj.height < 159
	);
}
