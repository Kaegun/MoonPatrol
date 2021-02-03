/*

Officer: 1192743
CaseNum: 202-1-34795215-1192743

Case 202 - The case of Bob and Daisy - stage 2

Here’s another letter kid. This time it’s from Daisy (aka. Woz).
Decode it to uncover more about Woz and Job’s dastardly plan.

Discover the hidden code by commenting out all text commands except
those which produce Brown filled text with a Light Sea Green outline.
Only comment out text commands - leave fill & stroke commands uncommented.

Use X11 colours. You can find a reference table at https://en.wikipedia.org/wiki/Web_colors.

There are many possible ways of investigating this case, but you
should use ONLY the following commands:

  // comments are all that are needed for this case.
  Do NOT add any new lines of code.

*/

var letterFont;

function preload()
{
	letterFont = loadFont('Melissa.otf');
}

function setup()
{
	createCanvas(615,743);
	textFont(letterFont);
	textSize(34);
}

function draw()
{
	background(255);

	fill(255,105,180);
	stroke(0,0,255);
	// text("long", 413,172);
	fill(255,0,0);
	stroke(46,139,87);
	// text("it", 568,137);
	fill(128,128,0);
	stroke(75,0,130);
	// text("hink", 440,247);
	fill(100,149,237);
	stroke(0,255,255);
	// text("can", 354,247);
	fill(218,112,214);
	stroke(255,255,0);
	// text("s", 405,210);
	fill(240,230,140);
	stroke(255,69,0);
	// text("have", 211,443);
	fill(30,144,255);
	stroke(0,0,128);
	// text("my", 213,210);
	fill(124,252,0);
	stroke(139,0,0);
	// text("tare", 423,210);
	fill(64,224,208);
	stroke(255,165,0);
	// text("How", 197,137);
	fill(0,0,128);
	stroke(0,0,205);
	// text("?", 363,172);
	fill(32,178,170);
	stroke(255,0,255);
	// text("ger", 68,443);
	fill(123,104,238);
	// text("you", 97,210);
	fill(222,184,135);
	stroke(75,0,130);
	// text("again", 13,522);
	fill(238,130,238);
	stroke(128,0,0);
	// text("this", 448,443);
	fill(186,85,211);
	stroke(128,128,0);
	// text("having", 207,102);
	fill(255,0,255);
	stroke(139,0,139);
	// text("How", 11,102);
	fill(219,112,147);
	stroke(0,128,128);
	// text("of", 96,288);
	fill(0,128,128);
	stroke(255,0,255);
	// text("rms.", 298,210);
	fill(100,149,237);
	stroke(46,139,87);
	// text("in", 171,210);
	fill(0,255,0);
	stroke(0,128,128);
	// text("a", 277,210);
	fill(127,255,212);
	stroke(0,250,154);
	// text("t", 427,247);
	fill(34,139,34);
	stroke(128,0,0);
	// text("I", 97,102);
	fill(178,34,34);
	stroke(220,20,60);
	// text("only", 13,288);
	fill(255,127,80);
	stroke(210,105,30);
	// text("will", 291,480);
	fill(220,20,60);
	stroke(255,0,0);
	// text("Forever", 11,590);
	fill(173,216,230);
	stroke(0,128,128);
	// text("is", 530,137);
	fill(205,133,63);
	stroke(0,0,205);
	// text("the", 12,247);
	fill(240,230,140);
	stroke(153,50,204);
	// text("at", 224,365);
	fill(138,43,226);
	stroke(0,255,127);
	// text("spring,", 435,324);
	fill(128,128,0);
	stroke(128,0,0);
	// text("When", 181,480);
	fill(220,20,60);
	// text("ing", 88,480);
	fill(218,112,214);
	stroke(0,206,209);
	// text("without", 11,365);
	fill(233,150,122);
	stroke(50,205,50);
	// text("I'm", 225,288);
	fill(128,0,0);
	stroke(0,255,255);
	// text("on", 437,288);
	fill(0,255,0);
	stroke(0,250,154);
	// text("this", 414,365);
	fill(240,128,128);
	stroke(154,205,50);
	// text("do", 136,443);
	fill(186,85,211);
	stroke(0,128,128);
	// text("small", 487,365);
	fill(184,134,11);
	stroke(0,0,139);
	// text("return.", 105,324);
	fill(64,224,208);
	stroke(32,178,170);
	// text("si", 12,172);
	fill(160,82,45);
	stroke(127,255,0);
	// text("feels", 108,406);
	fill(25,25,112);
	stroke(0,100,0);
	// text("miss", 118,102);
	fill(173,255,47);
	// text("around", 408,102);
	fill(176,224,230);
	stroke(0,255,255);
	// text("?", 152,480);
	fill(255,255,0);
	stroke(218,165,32);
	// text("to", 498,172);
	fill(210,105,30);
	stroke(46,139,87);
	// text("your", 491,288);
	fill(135,206,235);
	stroke(0,0,139);
	// text("sky,", 178,247);
	fill(0,0,205);
	stroke(127,255,0);
	// text("place.", 83,137);
	fill(240,230,140);
	stroke(0,206,209);
	// text("be", 417,480);
	fill(127,255,212);
	stroke(0,0,255);
	// text("Daisy", 11,658);
	fill(0,255,255);
	stroke(0,191,255);
	// text("k", 244,172);
	fill(0,100,0);
	stroke(0,255,255);
	// text("darling", 68,34);
	fill(123,104,238);
	stroke(75,0,130);
	// text("I", 190,443);
	fill(75,0,130);
	stroke(0,0,205);
	// text("How", 368,406);
	fill(0,0,205);
	stroke(46,139,87);
	// text("you", 334,102);
	fill(128,0,128);
	stroke(124,252,0);
	// text("you.", 140,288);
	fill(0,128,128);
	stroke(128,0,128);
	// text("the", 16,137);
	fill(0,0,205);
	stroke(0,255,255);
	// text("de", 200,406);
	fill(0,255,0);
	stroke(34,139,34);
	// text("I", 333,247);
	fill(128,0,0);
	stroke(0,128,0);
	// text("?", 119,522);
	fill(0,128,0);
	stroke(0,139,139);
	// text("banking", 288,288);
	fill(255,0,255);
	stroke(127,255,0);
	// text("last", 172,172);
	fill(139,69,19);
	stroke(255,255,0);
	// text("night", 79,247);
	fill(148,0,211);
	stroke(255,0,255);
	// text("nce", 39,172);
	fill(238,130,238);
	stroke(0,0,255);
	// text("I", 392,172);
	fill(165,42,42);
	stroke(32,178,170);
	text("store", 351,443);
	text("up", 502,210);
	fill(144,238,144);
	stroke(0,255,255);
	// text("much", 454,406);
	fill(173,255,47);
	stroke(255,69,0);
	// text("we", 112,172);
	fill(160,82,45);
	stroke(139,69,19);
	// text("yours,", 151,590);
	fill(138,43,226);
	stroke(128,128,0);
	// text("we", 357,480);
	fill(165,42,42);
	stroke(32,178,170);
	text("side", 333,365);
	fill(210,105,30);
	stroke(148,0,211);
	// text("to", 306,443);
	fill(176,224,230);
	stroke(32,178,170);
	// text("lon", 16,443);
	fill(106,90,205);
	stroke(0,139,139);
	// text("x", 116,658);
	fill(128,0,128);
	// text("and", 257,247);
	fill(127,255,0);
	stroke(255,140,0);
	// text("months", 390,137);
	fill(0,255,0);
	stroke(0,0,205);
	// text("in", 326,324);
	fill(153,50,204);
	stroke(178,34,34);
	// text("you", 150,365);
	fill(165,42,42);
	stroke(32,178,170);
	text("town", 13,406);
	text("swift", 15,324);
	text("hold", 12,210);
	fill(199,21,133);
	stroke(255,0,255);
	// text("many", 283,137);
	fill(64,224,208);
	stroke(139,0,0);
	// text("my", 269,365);
	stroke(210,105,30);
	// text("sola", 243,406);
	fill(244,164,96);
	stroke(75,0,130);
	// text("united", 471,480);
	fill(127,255,0);
	stroke(0,191,255);
	// text("Even", 231,324);
	fill(238,232,170);
	stroke(34,139,34);
	// text("the", 368,324);
	fill(75,0,130);
	stroke(0,139,139);
	// text("long", 14,480);
	fill(32,178,170);
	stroke(124,252,0);
	// text("issed", 264,172);
	fill(244,164,96);
	stroke(255,255,0);
	// text("te.", 312,406);
	fill(147,112,219);
	stroke(34,139,34);
	// text("Bob,", 198,34);
	fill(255,99,71);
	stroke(0,128,0);
	// text("I", 384,210);
	fill(240,128,128);
	stroke(0,0,255);
	// text("My", 8,34);
	fill(165,42,42);
	stroke(32,178,170);
	text("at", 557,210);



}
