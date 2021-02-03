/*

Officer: 1192743
CaseNum: 401-2-17385346-1192743

Case 401 - The Case of Norbert's Weiner Stand
Stage 3 - Bilious bagel

As I suspected Norbert has struck again. Ever inventive he’s set up a bagel stand and
has laced the cream cheese with an ingenious but vicious toxin. This one is quite
deadly so get yourself down to the lab right away.

You must develop the antidote by using conditional statements in the draw loop to
do the following.

	- When insecticide goes above 0.71 or AmanitaMushrooms goes above 0.49, decrease BetaBlocker by 0.05
	- When either snake_venom dips below 0.59, ricin dips below 0.73, or perhaps chlorine goes above 0.33, increment BetaBlocker by 0.03
	- If ricin goes above 0.69 and insecticide goes above 0.52, reduce opioids by 0.05
	- When AmanitaMushrooms goes above 0.69 or Deadly_Nightshade goes above 0.43, increment opioids by 0.03
	- If chlorine dips below 0.64 or snake_venom dips below 0.5, reduce aspirin by 0.01
	- When AmanitaMushrooms goes above 0.37 or ricin dips below 0.52, whilst at the same time, insecticide goes above 0.27, raise aspirin by 0.03
	- When chlorine dips below 0.34 and AmanitaMushrooms dips below 0.53, or on the other hand, insecticide dips below 0.7, reduce Calcium_Chloride by 0.04
	- When snake_venom goes above 0.53, or on the other hand, Deadly_Nightshade goes above 0.66 and ricin dips below 0.61, try increasing Calcium_Chloride by 0.01


Your conditional statements should:

consider the following poisons:

	- AmanitaMushrooms
	- ricin
	- insecticide
	- chlorine
	- Deadly_Nightshade
	- snake_venom


and modify the following antidotes:

	- BetaBlocker
	- opioids
	- aspirin
	- Calcium_Chloride


- There are many ways to complete this task but you should only use the
following commands:

	if(){}
	+=
	-=

*/

//Declare the poison variables
var AmanitaMushrooms;
var ricin;
var insecticide;
var chlorine;
var Deadly_Nightshade;
var snake_venom;


//Declare the antidote variables
var BetaBlocker;
var opioids;
var aspirin;
var Calcium_Chloride;


//This variable is used for drawing the graph
var graphs;


function setup() {

	createCanvas(800, 600);
	strokeWeight(2);

	//initialise the poisons and antidotes
	AmanitaMushrooms = 0.5;
	ricin = 0.5;
	insecticide = 0.5;
	chlorine = 0.5;
	Deadly_Nightshade = 0.5;
	snake_venom = 0.5;
	BetaBlocker = 0.5;
	opioids = 0.5;
	aspirin = 0.5;
	Calcium_Chloride = 0.5;


	//fills the graph with empty values
	graphs = [];

	for (var i = 0; i < 6; i++) {
		graphs.push([]);
		for (var j = 0; j < 512; j++) {
			graphs[i].push(0.5);
		}
	}

}

/*
	- When insecticide goes above 0.71 or AmanitaMushrooms goes above 0.49, decrease BetaBlocker by 0.05
	- When either snake_venom dips below 0.59, ricin dips below 0.73, or perhaps chlorine goes above 0.33, increment BetaBlocker by 0.03
	- If ricin goes above 0.69 and insecticide goes above 0.52, reduce opioids by 0.05
	- When AmanitaMushrooms goes above 0.69 or Deadly_Nightshade goes above 0.43, increment opioids by 0.03
	- If chlorine dips below 0.64 or snake_venom dips below 0.5, reduce aspirin by 0.01
	- When AmanitaMushrooms goes above 0.37 or ricin dips below 0.52, whilst at the same time, insecticide goes above 0.27, raise aspirin by 0.03
	- When chlorine dips below 0.34 and AmanitaMushrooms dips below 0.53, or on the other hand, insecticide dips below 0.7, reduce Calcium_Chloride by 0.04
	- When snake_venom goes above 0.53, or on the other hand, Deadly_Nightshade goes above 0.66 and ricin dips below 0.61, try increasing Calcium_Chloride by 0.01
*/
function draw() {

	//Develop the antidote below
	//Write conditional statements to change the amount of each substance ...
	if (insecticide > 0.71 || AmanitaMushrooms > 0.49) {
		BetaBlocker -= 0.05;
	}
	if (snake_venom < 0.59 || ricin < 0.73 || chlorine > 0.33) {
		BetaBlocker += 0.03;
	}
	if (ricin > 0.69 && insecticide > 0.52) {
		opioids -= 0.05;
	}
	if (AmanitaMushrooms > 0.69 || Deadly_Nightshade > 0.43) {
		opioids += 0.03;
	}
	if (chlorine < 0.64 || snake_venom < 0.5) {
		aspirin -= 0.01;
	}
	if ((AmanitaMushrooms > 0.37 || ricin < 0.52) && insecticide > 0.27) {
		aspirin += 0.03;
	}
	if (chlorine < 0.34 && AmanitaMushrooms < 0.53 || insecticide < 0.7) {
		Calcium_Chloride -= 0.04;
	}
	if (snake_venom > 0.53 || Deadly_Nightshade > 0.66 && ricin < 0.61) {
		Calcium_Chloride += 0.01;
	}



	//////////////////////////////////////////////////////

	//the code below generates new values using random numbers

	/*
		For testing, you might want to temporarily comment out
		these lines and set the same variables to constant values
		instead.
	*/

	AmanitaMushrooms = nextValue(graphs[0], AmanitaMushrooms);
	ricin = nextValue(graphs[1], ricin);
	insecticide = nextValue(graphs[2], insecticide);
	chlorine = nextValue(graphs[3], chlorine);
	Deadly_Nightshade = nextValue(graphs[4], Deadly_Nightshade);
	snake_venom = nextValue(graphs[5], snake_venom);


	BetaBlocker = constrain(BetaBlocker, 0, 1);
	opioids = constrain(opioids, 0, 1);
	aspirin = constrain(aspirin, 0, 1);
	Calcium_Chloride = constrain(Calcium_Chloride, 0, 1);


	///////// DO NOT CHANGE THE CODE BELOW ///////////

	//drawing code

	// set background
	background(0);
	noFill();

	//draw the graphs for the vitals
	var colors = [
		color(255, 0, 0),
		color(0, 255, 0),
		color(0, 0, 255),
		color(255, 0, 255),
		color(255, 255, 0),
		color(0, 255, 255)
	];

	for (var i = 0; i < graphs.length; i++) {
		stroke(colors[i]);
		drawGraph(graphs[i]);
	}

	//draw the poisons as text
	noStroke();
	fill(colors[0]);
	text('AmanitaMushrooms: ' + nf(AmanitaMushrooms, 1, 2), 20, 20);
	fill(colors[1]);
	text('ricin: ' + nf(ricin, 1, 2), 20, 40);
	fill(colors[2]);
	text('insecticide: ' + nf(insecticide, 1, 2), 20, 60);
	fill(colors[3]);
	text('chlorine: ' + nf(chlorine, 1, 2), 20, 80);
	fill(colors[4]);
	text('Deadly_Nightshade: ' + nf(Deadly_Nightshade, 1, 2), 20, 100);
	fill(colors[5]);
	text('snake_venom: ' + nf(snake_venom, 1, 2), 20, 120);


	//draw the antidotes bar chart
	drawBar(BetaBlocker, 50, 'BetaBlocker');
	drawBar(opioids, 200, 'opioids');
	drawBar(aspirin, 350, 'aspirin');
	drawBar(Calcium_Chloride, 500, 'Calcium_Chloride');


}

function nextValue(graph, val) {
	//gets the next value for a vital and puts it in an array for drawing
	var delta = random(-0.03, 0.03);

	val += delta;
	if (val > 1 || val < 0) {
		delta *= -1;
		val += delta * 2;
	}

	graph.push(val)
	graph.shift();
	return val;
}

function drawGraph(graph) {
	//draws an array as a graph
	beginShape();
	for (var i = 0; i < graph.length; i++) {
		vertex(width * i / 512, height * 0.5 - graph[i] * height / 3)
	}
	endShape();
}


function drawBar(val, x, name) {
	//draws the bars for bar chart
	noStroke();
	fill(0, 100, 100);
	var mh = height * 0.4 - 50;
	rect(x, (height - 50) - val * mh, 100, val * mh);
	fill(255);
	text(name + ": " + val, x, height - 20);
}
