/*

Officer: 1192743
CaseNum: 202-3-92154776-1192743

Case 202 - The case of Bob and Daisy - stage 4

Here’s the final letter from Daisy (aka. Woz). Decode it to uncover the
final details about Woz and Job’s dastardly plan.

Discover the hidden code by commenting out all text commands except
those which produce Light Green filled text with a Deep Sky Blue outline in Diggity font.
Only comment out text commands - leave fill & stroke, push and pop commands uncommented.

Use X11 colours. You can find a reference table at https://en.wikipedia.org/wiki/Web_colors.

There are many possible ways of investigating this case, but you
should use ONLY the following commands:

  // comments are all that are needed for this case.
  Do NOT add any new lines of code.

*/

var letterFont;

function preload()
{
	Ballpointprint = loadFont('Ballpointprint.ttf');
	Melissa = loadFont('Melissa.otf');
	Diggity = loadFont('Diggity.ttf');
	RonsFont = loadFont('RonsFont.ttf');
}

function setup()
{
	createCanvas(610,457);
	textSize(27);
}

function draw()
{
	background(255);

	fill(160,82,45);
	stroke(0,255,0);
	textFont(Melissa);
	// text("ling", 78,27);
	fill(255,69,0);
	stroke(255,165,0);
	textFont(RonsFont);
	// text("can", 424,202);
	fill(50,205,50);
	stroke(0,206,209);
	textFont(Melissa);
	// text("sure", 211,202);
	push();
	fill(139,0,139);
	stroke(165,42,42);
	textFont(Ballpointprint);
	// text("all", 522,143);
	pop();
	fill(240,230,140);
	// text("ationship", 161,172);
	push();
	fill(238,232,170);
	stroke(34,139,34);
	textFont(RonsFont);
	// text("these", 214,81);
	pop();
	fill(0,128,0);
	stroke(107,142,35);
	// text("of", 578,81);
	fill(139,0,0);
	stroke(34,139,34);
	textFont(Diggity);
	// text("take", 470,202);
	fill(0,206,209);
	stroke(210,105,30);
	textFont(RonsFont);
	// text("I", 9,81);
	push();
	fill(233,150,122);
	stroke(148,0,211);
	textFont(Melissa);
	// text("dar", 54,27);
	pop();
	stroke(32,178,170);
	// text("Is", 57,172);
	fill(255,69,0);
	stroke(0,0,205);
	textFont(Melissa);
	// text("?", 522,202);
	fill(218,112,214);
	stroke(0,139,139);
	textFont(Ballpointprint);
	// text("I", 174,113);
	fill(100,149,237);
	stroke(0,0,255);
	// text("sort", 429,143);
	fill(250,128,114);
	stroke(25,25,112);
	// text("guar", 423,172);
	fill(0,255,255);
	stroke(199,21,133);
	// text("oiding", 450,113);
	fill(238,232,170);
	stroke(0,100,0);
	// text("out.", 15,172);
	fill(72,209,204);
	stroke(46,139,87);
	textFont(Diggity);
	// text("delays.", 359,81);
	push();
	fill(106,90,205);
	stroke(255,0,255);
	textFont(RonsFont);
	// text("away", 223,143);
	pop();
	stroke(0,191,255);
	textFont(Ballpointprint);
	// text("so", 392,172);
	fill(0,255,0);
	stroke(255,0,255);
	textFont(Melissa);
	// text("the", 106,233);
	fill(128,0,128);
	stroke(199,21,133);
	textFont(Diggity);
	// text("sometimes.", 15,202);
	fill(240,128,128);
	stroke(50,205,50);
	textFont(Melissa);
	// text("yours,", 99,287);
	fill(222,184,135);
	stroke(220,20,60);
	textFont(Ballpointprint);
	// text("send", 238,113);
	push();
	fill(75,0,130);
	stroke(107,142,35);
	textFont(RonsFont);
	// text("?", 88,113);
	pop();
	stroke(255,215,0);
	// text("ded", 460,172);
	fill(139,0,0);
	textFont(Melissa);
	// text("break", 340,143);
	push();
	fill(205,133,63);
	stroke(210,105,30);
	textFont(Diggity);
	// text("?", 555,113);
	pop();
	stroke(50,205,50);
	textFont(Ballpointprint);
	// text("av", 430,113);
	fill(0,255,255);
	stroke(0,255,0);
	textFont(Diggity);
	// text("more", 358,202);
	push();
	fill(0,0,128);
	stroke(255,215,0);
	textFont(Melissa);
	// text("x", 67,341);
	pop();
	fill(255,165,0);
	textFont(RonsFont);
	// text("you", 469,81);
	push();
	fill(144,238,144);
	stroke(0,191,255);
	textFont(Diggity);
	text("go", 195,143);
	text("safe", 233,172);
	pop();
	stroke(0,0,255);
	// text("s,", 81,233);
	fill(218,112,214);
	stroke(139,69,19);
	// text("not", 166,202);
	fill(30,144,255);
	stroke(46,139,87);
	textFont(Ballpointprint);
	// text("this", 474,143);
	fill(176,224,230);
	stroke(153,50,204);
	textFont(RonsFont);
	// text("If", 107,113);
	fill(25,25,112);
	stroke(0,128,128);
	textFont(Ballpointprint);
	// text("how", 247,202);
	fill(233,150,122);
	stroke(139,0,0);
	textFont(Melissa);
	// text("Perhaps", 9,143);
	fill(220,20,60);
	stroke(0,250,154);
	textFont(RonsFont);
	// text("My", 15,27);
	fill(0,250,154);
	stroke(0,0,128);
	// text("I'm", 117,202);
	fill(135,206,250);
	stroke(199,21,133);
	textFont(Melissa);
	// text("You", 314,172);
	fill(0,255,127);
	stroke(0,139,139);
	textFont(RonsFont);
	// text("ilence.", 147,233);
	fill(128,0,0);
	stroke(220,20,60);
	textFont(Diggity);
	// text("continual", 276,81);
	fill(255,0,255);
	stroke(128,0,128);
	textFont(Ballpointprint);
	// text("longer", 86,81);
	fill(147,112,219);
	stroke(0,0,205);
	textFont(Melissa);
	// text("The", 536,202);
	fill(0,250,154);
	stroke(0,0,255);
	textFont(Diggity);
	// text("Are", 347,113);
	push();
	fill(127,255,212);
	stroke(255,255,0);
	textFont(Ballpointprint);
	// text("are", 346,172);
	pop();
	fill(222,184,135);
	stroke(0,255,0);
	textFont(RonsFont);
	// text("s", 136,233);
	fill(0,139,139);
	stroke(255,0,0);
	// text("s", 115,143);
	fill(184,134,11);
	stroke(124,252,0);
	textFont(Melissa);
	// text("no", 63,81);
	push();
	fill(0,0,128);
	stroke(32,178,170);
	textFont(Diggity);
	// text("and", 387,143);
	pop();
	fill(144,238,144);
	stroke(0,191,255);
	textFont(Diggity);
	text("cash", 298,113);
	text("ignore", 155,81);
	fill(32,178,170);
	stroke(0,128,0);
	textFont(RonsFont);
	// text("we", 75,143);
	fill(178,34,34);
	stroke(0,250,154);
	// text("our", 91,172);
	fill(107,142,35);
	stroke(128,0,0);
	textFont(Ballpointprint);
	// text("Forever", 9,287);
	fill(65,105,225);
	stroke(34,139,34);
	textFont(Melissa);
	// text("can", 207,113);
	fill(148,0,211);
	stroke(0,139,139);
	textFont(Diggity);
	// text("Are", 425,81);
	fill(250,128,114);
	stroke(0,250,154);
	textFont(Melissa);
	// text("rel", 143,172);
	fill(138,43,226);
	stroke(0,0,205);
	textFont(RonsFont);
	// text("much", 295,202);
	stroke(220,20,60);
	textFont(Ballpointprint);
	// text("?", 284,172);
	fill(144,238,144);
	stroke(0,191,255);
	textFont(Diggity);
	text("for", 286,143);
	fill(148,0,211);
	stroke(139,69,19);
	// text("so,", 142,113);
	push();
	fill(255,255,0);
	stroke(0,191,255);
	textFont(Ballpointprint);
	// text("money", 16,113);
	pop();
	// text("I", 411,202);
	fill(176,224,230);
	stroke(50,205,50);
	textFont(Melissa);
	// text("can", 32,81);
	push();
	fill(0,0,255);
	stroke(210,105,30);
	textFont(RonsFont);
	// text("Daisy", 6,341);
	pop();
	fill(128,0,0);
	stroke(32,178,170);
	textFont(RonsFont);
	// text("secret", 9,233);
	fill(144,238,144);
	stroke(34,139,34);
	textFont(Diggity);
	// text("me", 520,113);
	fill(205,133,63);
	stroke(255,69,0);
	textFont(RonsFont);
	// text("Bob,", 107,27);
	fill(34,139,34);
	stroke(199,21,133);
	textFont(Melissa);
	// text("a", 325,143);
	fill(135,206,250);
	stroke(255,69,0);
	textFont(RonsFont);
	// text("hould", 126,143);
	push();
	fill(0,100,0);
	stroke(184,134,11);
	// text("short", 515,81);
	pop();
	fill(106,90,205);
	stroke(255,0,255);
	textFont(Diggity);
	// text("you", 391,113);



}
