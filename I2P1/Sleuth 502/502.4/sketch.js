/*

Officer: 1192743
CaseNum: 502-3-25039057-1192743

Case 502 - A donation - stage 4

This final document will seal the deal kid. C’mon kid. Let’s send these crooks down.

In setup, fill in the redactedText String variable by replacing the redacted words
with references to the two arrays containing the missing pieces.
you can do this by indexing the appropriate items from the respective arrays.

There are many possible ways of completing this task,
but you should ONLY use the following commands:

" + array[index].property[index] + "

*/

// you dont need to change these
var missingWords;
var redactedText;

// arrays containing the names needed to fill in the paragraph
var archive_A = [
	{
		bit_0: ["start", "sail", "fence", "sneeze"],
		bit_1: ["bake", "meddle", "meddle", "consider"],
		bit_2: ["sail", "ALGOL", "rejoice", "bake"]
	},
	{
		bit_0: ["mend", "tug", "COBOL", "protect"],
		bit_1: ["mend", "sail", "stuff", "smile"],
		bit_2: ["stuff", "bake", "protect", "succeed"]
	},
	{
		bit_0: ["mend", "rejoice", "you", "radiate"],
		bit_1: ["mend", "meddle", "meddle", "rejoice"],
		bit_2: ["mend", "stuff", "fence", "protect"]
	},
	{
		bit_0: ["Governor Zuckerberg", "bake", "donation", "mend"],
		bit_1: ["rejoice", "fence", "development", "clip"],
		bit_2: ["sail", "fence", "smile", "meddle"]
	},
	{
		bit_0: ["clip", "fence", "start", "bake"],
		bit_1: ["play", "protect", "radiate", "plug"],
		bit_2: ["Edsger", "hurry", "rejoice", "radiate"]
	}];

var archive_B = [
	{
		bit_0: ["hurry", "consider", "smile", "ALGOL fish wholesalers"],
		bit_1: ["charge", "stuff", "succeed", "fence"],
		bit_2: ["rejoice", "rejoice", "rejoice", "succeed"]
	},
	{
		bit_0: ["play", "syndicate", "mend", "smile"],
		bit_1: ["sneeze", "rejoice", "play", "plug"],
		bit_2: ["smile", "play", "charge", "radiate"]
	},
	{
		bit_0: ["consider", "$200,000", "clip", "play"],
		bit_1: ["stuff", "smile", "plug", "stuff"],
		bit_2: ["start", "protect", "hurry", "meddle"]
	},
	{
		bit_0: ["start", "meddle", "succeed", "tug"],
		bit_1: ["plug", "bake", "clip", "start"],
		bit_2: ["sneeze", "start", "stuff", "smile"]
	},
	{
		bit_0: ["tug", "plug", "tug", "smile"],
		bit_1: ["clip", "rejoice", "consider", "mend"],
		bit_2: ["hurry", "mend", "succeed", "start"]
	}];

var myFont;
var backgroundImg;

function preload() {
	myFont = loadFont('SpecialElite.ttf');
	backgroundImg = loadImage("Background.png");
}

function setup() {
	createCanvas(1280, 800);

	// replace all redacted words with the correct values from the data structures above

	missingWords = "Edsger, donation, $200,000, ALGOL, you, ALGOL fish wholesalers, syndicate, development, COBOL, Governor Zuckerberg";

	redactedText = "My dearest " + archive_A[4].bit_2[0]
		+ ", I have just received your very generous " + archive_A[3].bit_0[2]
		+ " of " + archive_B[2].bit_0[1]
		+ ". Thank you. This will be invaluable to our campaign. " + archive_A[0].bit_2[1]
		+ " is a stalwart part of the community and I look forward to continuing our strong partnership in the future. Regard the other matter, I think you will find that all has been satisfactorily dealt with. Just read this morning’s front pages. You can rest assured that no mention was made of " + archive_A[2].bit_0[2]
		+ " or " + archive_B[0].bit_0[3]
		+ "  to the " + archive_B[1].bit_0[1]
		+ ". Your new " + archive_A[3].bit_1[2]
		+ " at the " + archive_A[1].bit_0[2]
		+ " can now proceed without impediment. Yours sincerely, " + archive_A[3].bit_0[0];

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
