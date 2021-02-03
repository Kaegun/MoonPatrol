/*

Officer: 1192743
CaseNum: 202-0-62944942-1192743

Case 202 - The case of Bob and Daisy - stage 1

That pair of notorious criminals Woz and Jobs are up to no good again.
I’ve intercepted letters sent between them. It seems that they are
communicating through an ingenious code in which they masquerade as
besotted lovers, Daisy and Bob. I need you crack their code and determine
the details of their next heist so that we can catch them in the act.

Discover the hidden code by commenting out all text commands except
those which produce Pale Goldenrod text. Only comment out text commands.
Leave fill commands uncommented.

Use X11 colours. You can find a reference table at https://en.wikipedia.org/wiki/Web_colors.

There are many possible ways of investigating this case, but you
should use ONLY the following commands:

  // comments are all that are needed for this case.
  Do NOT add any new lines of code.

*/

var letterFont;

function preload()
{
	letterFont = loadFont('Ballpointprint.ttf');
}

function setup()
{
	createCanvas(625,584);
	textFont(letterFont);
	textSize(28);
}

function draw()
{
	background(255);

	fill(199,21,133);
	// text("unny", 192,361);
	fill(152,251,152);
	// text("are", 70,361);
	fill(34,139,34);
	// text("s,", 218,417);
	// text("I", 158,176);
	fill(100,149,237);
	// text("the", 200,265);
	fill(255,0,255);
	// text("your", 248,176);
	fill(148,0,211);
	// text("voice", 321,176);
	// text("in", 486,142);
	// text("only", 218,114);
	fill(124,252,0);
	// text("am", 391,237);
	fill(0,255,255);
	// text("confession", 195,84);
	fill(255,69,0);
	// text("I", 142,114);
	fill(64,224,208);
	// text("nds", 74,329);
	fill(154,205,50);
	// text("arp.", 332,207);
	fill(238,130,238);
	// text("can", 159,114);
	fill(219,112,147);
	// text("our", 533,84);
	fill(160,82,45);
	// text("I", 256,296);
	// text("eyes.", 101,142);
	fill(0,250,154);
	// text("those", 430,296);
	fill(255,165,0);
	// text("music", 131,207);
	fill(0,191,255);
	// text("since", 451,84);
	fill(154,205,50);
	// text("May", 9,84);
	fill(255,255,0);
	// text("Daisy,", 157,28);
	fill(0,255,127);
	// text("reen", 29,142);
	// text("h", 314,207);
	fill(219,112,147);
	// text("g", 11,142);
	// text("when", 245,142);
	fill(30,144,255);
	// text("saw", 529,265);
	// text("alone", 400,142);
	fill(128,0,128);
	// text("hear", 175,176);
	fill(165,42,42);
	// text("my", 338,329);
	// text("s", 177,361);
	// text("last", 10,114);
	// text("you", 200,329);
	fill(255,215,0);
	// text("darling,", 476,114);
	fill(0,139,139);
	// text("face,", 179,296);
	fill(184,134,11);
	// text("the", 259,207);
	fill(186,85,211);
	// text("quiet", 11,176);
	// text("ovely", 94,296);
	fill(135,206,235);
	// text("l", 86,296);
	fill(0,0,255);
	// text("Bob", 9,473);
	fill(0,255,255);
	// text("seco", 10,329);
	fill(139,0,139);
	// text("blessed", 14,207);
	// text("your", 13,296);
	// text("I", 76,84);
	fill(218,165,32);
	// text("that", 92,176);
	fill(178,34,34);
	// text("am", 347,142);
	fill(218,165,32);
	// text("that", 134,329);
	// text("Oh", 15,28);
	fill(0,0,255);
	// text("I", 397,207);
	fill(0,255,127);
	// text("your", 444,237);
	fill(0,139,139);
	// text("and", 85,417);
	fill(32,178,170);
	// text("the", 461,176);
	fill(255,0,0);
	// text("lovely", 64,28);
	fill(240,128,128);
	// text("I", 330,142);
	fill(219,112,147);
	// text("I", 374,237);
	fill(123,104,238);
	// text("the", 538,207);
	fill(0,128,128);
	// text("of", 367,114);
	fill(148,0,211);
	// text("make", 93,84);
	fill(0,0,205);
	// text("were", 261,329);
	// text("my", 124,361);
	fill(218,112,214);
	// text("Love", 9,417);
	fill(244,164,96);
	// text("knew", 273,296);
	fill(199,21,133);
	// text("that", 446,265);
	fill(135,206,250);
	// text("your", 403,114);
	fill(219,112,147);
	// text("from", 356,296);
	fill(255,140,0);
	// text("I", 512,265);
	fill(218,112,214);
	// text("of", 223,207);
	fill(75,0,130);
	// text("the", 521,142);
	// text("one", 391,329);
	fill(72,209,204);
	// text("It", 185,142);
	fill(218,165,32);
	// text("alive", 232,237);
	// text("?", 354,84);
	fill(255,0,255);
	// text("You", 13,361);
	fill(255,99,71);
	// text("kisse", 147,417);
	// text("x", 72,473);
	fill(128,0,0);
	// text("person", 126,237);
	fill(222,184,135);
	// text("that", 308,237);
	fill(128,0,0);
	// text("Ever", 378,84);
	fill(0,100,0);
	// text("like", 404,176);
	// text("true", 452,329);
	fill(210,105,30);
	// text("must", 414,207);
	// text("few", 517,296);
	fill(222,184,135);
	// text("moment", 320,265);
	fill(238,232,170);
	text("is", 213,142);
	text("day", 272,361);
	fill(72,209,204);
	// text("From", 122,265);
	fill(0,0,139);
	// text("luckiest", 9,237);
	fill(238,130,238);
	// text("be", 494,207);
	fill(238,232,170);
	text("chosen", 13,265);
	text("a", 169,84);
	text("first", 255,265);
	text("in", 333,361);
	text("date", 70,114);
	text("April", 368,361);
	fill(128,128,0);
	// text("love.", 519,329);
	fill(139,69,19);
	// text("think", 287,114);



}
