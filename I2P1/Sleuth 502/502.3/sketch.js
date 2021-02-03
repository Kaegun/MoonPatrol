/*

Officer: 1192743
CaseNum: 502-2-10779069-1192743

Case 502 - Out of the picture - stage 3

Yet another document has come my way. This one is even more tricky to decipher.
The Governor must really have something to hide.

In setup, fill in the redactedText String variable by replacing the redacted words
with references to the two arrays containing the missing pieces.
you can do this by indexing the appropriate items from the respective arrays.

There are many possible ways of completing this task,
but you should ONLY use the following commands:

" + object.property[index] + "

*/

// you dont need to change these
var missingWords;
var redactedText;

// arrays containing the names needed to fill in the paragraph
var A_Censored = {
	Token_0: ["play", "play", "meddle"],
	Token_1: ["smile", "start", "plug"],
	Token_2: ["meddle", "consider", "tug"],
	Token_3: ["rejoice", "bake", "play"],
	Token_4: ["rejoice", "consider", "play"],
	Token_5: ["bake", "consider", "hurry"],
	Token_6: ["fence", "tug", "bake"],
	Token_7: ["$200,000", "ALGOL", "mend"],
	Token_8: ["stuff", "charge", "sail"],
	Token_9: ["start", "hit", "mend"]
};

var B_Censored = {
	Token_0: ["rejoice", "charge", "sail"],
	Token_1: ["hurry", "smile", "play"],
	Token_2: ["campaign", "bake", "hurry"],
	Token_3: ["plug", "plug", "clip"],
	Token_4: ["play", "a donation", "radiate"],
	Token_5: ["Governor Zuckerberg", "Edsger", "Hopper"],
	Token_6: ["meddle", "hurry", "protect"],
	Token_7: ["mend", "play", "meddle"],
	Token_8: ["consider", "clip", "tug"],
	Token_9: ["bake", "mend", "syndicate"]
};

var myFont;
var backgroundImg;

function preload() {
	myFont = loadFont('SpecialElite.ttf');
	backgroundImg = loadImage("Background.png");
}

function setup() {
	createCanvas(1280, 800);

	// replace all redacted words with the correct values from the data structures above

	missingWords = "Governor Zuckerberg, a donation, campaign, $200,000, Hopper, syndicate, hit, ALGOL, Edsger";

	redactedText = "Dear " + B_Censored.Token_5[0]
		+ ", I am sure that something could be worked out in terms of " + B_Censored.Token_4[1]
		+ " for your " + B_Censored.Token_2[0]
		+ ". How does " + A_Censored.Token_7[0]
		+ " sound ? I am afraid I will need to be so crude as to spell out what ALGOL requires in return. " + B_Censored.Token_5[2]
		+ " needs to be out of the picture. She’s caused enough trouble. Get the " + B_Censored.Token_9[2]
		+ " to organise the " + A_Censored.Token_9[1]
		+ " but I’d prefer it you don’t mention me or " + A_Censored.Token_7[1]
		+ ". I owe them enough favours already. Your old friend, " + B_Censored.Token_5[1];

}

function draw() {
	// you don't need to change this
	image(backgroundImg, 0, 0);
	stroke(0);
	strokeWeight(3);
	line(width / 2, 10, width / 2, height - 10);
	noStroke();
	textFont(myFont);
	textSize(14);
	text(redactedText, 30, 100, 580, 600);
	text(missingWords, 670, 100, 580, 600);
}
