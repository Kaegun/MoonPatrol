/*

Officer: 1192743
CaseNum: 502-1-92668318-1192743

Case 502 - A delicate matter - stage 2

We’re hot on the trail kid, and another document has come my way.
It’s a little more tricky to decipher but I know you can do it.

In setup, fill in the redactedText String variable by replacing the redacted words
with references to the two arrays containing the missing pieces.
you can do this by indexing the appropriate items from the respective arrays.

There are many possible ways of completing this task,
but you should ONLY use the following commands:

" + Array[index].property + "

*/

// you dont need to change these
var missingWords;
var redactedText;

// arrays containing the names needed to fill in the paragraph
var A_excerpt = [
	{ redacted_0: "hurry", redacted_1: "stuff", redacted_2: "protect" },
	{ redacted_0: "consider", redacted_1: "meddle", redacted_2: "sail" },
	{ redacted_0: "Edsger", redacted_1: "sneeze", redacted_2: "COBOL" },
	{ redacted_0: "mend", redacted_1: "rejoice", redacted_2: "start" },
	{ redacted_0: "mend", redacted_1: "sneeze", redacted_2: "she has" },
	{ redacted_0: "succeed", redacted_1: "radiate", redacted_2: "tug" },
	{ redacted_0: "smile", redacted_1: "meddle", redacted_2: "sneeze" },
	{ redacted_0: "plug", redacted_1: "bake", redacted_2: "play" },
	{ redacted_0: "bake", redacted_1: "sail", redacted_2: "delicate" },
	{ redacted_0: "mend", redacted_1: "radiate", redacted_2: "tug" }
];

var B_excerpt = [
	{ redacted_0: "meddle", redacted_1: "start", redacted_2: "tug" },
	{ redacted_0: "a donation", redacted_1: "meddle", redacted_2: "Hopper’s" },
	{ redacted_0: "romantic", redacted_1: "plug", redacted_2: "succeed" },
	{ redacted_0: "tug", redacted_1: "stuff", redacted_2: "consider" },
	{ redacted_0: "sail", redacted_1: "play", redacted_2: "fence" },
	{ redacted_0: "rejoice", redacted_1: "sail", redacted_2: "meddle" },
	{ redacted_0: "syndicate", redacted_1: "radiate", redacted_2: "charge" },
	{ redacted_0: "capital", redacted_1: "succeed", redacted_2: "Governor Zuckerberg" },
	{ redacted_0: "tug", redacted_1: "protect", redacted_2: "meddle" },
	{ redacted_0: "sneeze", redacted_1: "succeed", redacted_2: "smile" }
];

var myFont;
var backgroundImg;

function preload() {
	myFont = loadFont('SpecialElite.ttf');
	backgroundImg = loadImage("Background.png");
}

function setup() {
	createCanvas(1280, 800);

	// replace all redacted words with the correct values from the data structures above

	missingWords = "Edsger, Hopper’s, she has, romantic, COBOL, syndicate, delicate, capital, a donation, Governor Zuckerberg";

	redactedText = "My dearest " + A_excerpt[2].redacted_0
		+ ", Please don’t doubt my sincerity when I say that I hadn’t the faintest idea about " + B_excerpt[1].redacted_2
		+ " intervention. I suspect that " + A_excerpt[4].redacted_2
		+ " a " + B_excerpt[2].redacted_0
		+ " interest at the " + A_excerpt[2].redacted_2
		+ ". I and the " + B_excerpt[6].redacted_0
		+ " appreciate your many contributions over the years. However, this is a most " + A_excerpt[8].redacted_2
		+ " matter which would require significant " + B_excerpt[7].redacted_0
		+ " for me to deal with it satisfactorily. I would not be so crude as to suggest a sum but perhaps " + B_excerpt[1].redacted_0
		+ " to my forthcoming campaign would help. Yours sincerely, " + B_excerpt[7].redacted_2;

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
