/*

Officer: 1192743
CaseNum: 401-3-22931079-1192743

Case 401 - The Case of Norbert's Weiner Stand
Stage 4 - Mortal Cupcake

It seems that Norbert is getting desperate now. In what appears to be his final
stand he has set up his own cupcake shop. The laced cupcakes look delicious but
they are extremely dangerous. Just a brief whiff of one can induce a series of
deadly symptoms. This is Norbert’s most complex poison to date, so you’ll have
to work hard to produce a viable antidote.

You must develop the antidote by using conditional statements in the draw loop to
do the following.

	- When formaldehyde dips below 0.32, mercury goes above 0.4, and also strychnine goes above 0.49, decrement charcoal by 0.05
	- If either insecticide goes above 0.29, SpiderVenom goes above 0.43, or perhaps NerveGas dips below 0.42, increase charcoal by 0.01
	- If insecticide dips below 0.4 or SpiderVenom goes above 0.46, whilst at the same time, arsenic goes above 0.5 and formaldehyde dips below 0.46, reduce paracetamol by 0.04
	- If NerveGas dips below 0.36 or mercury dips below 0.59, whilst at the same time, hemlock goes above 0.58 and strychnine dips below 0.6, increment paracetamol by 0.05
	- If insecticide goes above 0.26, hemlock dips below 0.39, and also NerveGas goes above 0.56, decrease hydrochloricAcid by 0.03
	- When strychnine goes above 0.5 and arsenic dips below 0.54, whilst at the same time, formaldehyde goes above 0.28 or SpiderVenom dips below 0.65, increment hydrochloricAcid by 0.03
	- If either insecticide goes above 0.5, mercury goes above 0.67, or perhaps hemlock goes above 0.44, try decreasing Calcium_Gluconate by 0.05
	- If either NerveGas goes above 0.56, formaldehyde dips below 0.5, SpiderVenom goes above 0.73, or perhaps arsenic dips below 0.57, try increasing Calcium_Gluconate by 0.02
	- When hemlock goes above 0.67 and strychnine goes above 0.53, whilst at the same time, mercury dips below 0.54 or arsenic goes above 0.33, try decreasing glucagon by 0.04
	- If either formaldehyde goes above 0.54, insecticide dips below 0.45, or perhaps SpiderVenom dips below 0.58, try increasing glucagon by 0.04


Your conditional statements should:

consider the following poisons:

	- arsenic
	- hemlock
	- mercury
	- strychnine
	- NerveGas
	- insecticide
	- formaldehyde
	- SpiderVenom


and modify the following antidotes:

	- charcoal
	- paracetamol
	- hydrochloricAcid
	- Calcium_Gluconate
	- glucagon


- There are many ways to complete this task but you should only use the
following commands:

	if(){}
	+=
	-=

*/

//Declare the poison variables
var arsenic;
var hemlock;
var mercury;
var strychnine;
var NerveGas;
var insecticide;
var formaldehyde;
var SpiderVenom;


//Declare the antidote variables
var charcoal;
var paracetamol;
var hydrochloricAcid;
var Calcium_Gluconate;
var glucagon;


//This variable is used for drawing the graph
var graphs;


function setup() {

	createCanvas(800, 600);
	strokeWeight(2);

	//initialise the poisons and antidotes
	arsenic = 0.5;
	hemlock = 0.5;
	mercury = 0.5;
	strychnine = 0.5;
	NerveGas = 0.5;
	insecticide = 0.5;
	formaldehyde = 0.5;
	SpiderVenom = 0.5;
	charcoal = 0.5;
	paracetamol = 0.5;
	hydrochloricAcid = 0.5;
	Calcium_Gluconate = 0.5;
	glucagon = 0.5;


	//fills the graph with empty values
	graphs = [];

	for (var i = 0; i < 8; i++) {
		graphs.push([]);
		for (var j = 0; j < 512; j++) {
			graphs[i].push(0.5);
		}
	}

}

function draw() {

	//Develop the antidote below
	//Write conditional statements to change the amount of each substance ...

	// - When formaldehyde dips below 0.32, mercury goes above 0.4, and also strychnine goes above 0.49, decrement charcoal by 0.05
	if (formaldehyde < 0.32 && mercury > 0.4 && strychnine > 0.49) {
		charcoal -= 0.05;
	}
	// - If either insecticide goes above 0.29, SpiderVenom goes above 0.43, or perhaps NerveGas dips below 0.42, increase charcoal by 0.01
	if (insecticide > 0.29 || SpiderVenom > 0.43 || NerveGas < 0.42) {
		charcoal += 0.01;
	}
	// - If insecticide dips below 0.4 or SpiderVenom goes above 0.46, whilst at the same time, arsenic goes above 0.5 and formaldehyde dips below 0.46, reduce paracetamol by 0.04
	if ((insecticide < 0.4 || SpiderVenom > 0.46) && arsenic > 0.5 & formaldehyde < 0.46) {
		paracetamol -= 0.04;
	}
	// - If NerveGas dips below 0.36 or mercury dips below 0.59, whilst at the same time, hemlock goes above 0.58 and strychnine dips below 0.6, increment paracetamol by 0.05
	if ((NerveGas < 0.36 || mercury < 0.59) && hemlock > 0.58 && strychnine < 0.6) {
		paracetamol += 0.05;
	}
	// - If insecticide goes above 0.26, hemlock dips below 0.39, and also NerveGas goes above 0.56, decrease hydrochloricAcid by 0.03
	if (insecticide > 0.26 && hemlock < 0.39 && NerveGas > 0.56) {
		hydrochloricAcid -= 0.03;
	}
	// - When strychnine goes above 0.5 and arsenic dips below 0.54, whilst at the same time, formaldehyde goes above 0.28 or SpiderVenom dips below 0.65, increment hydrochloricAcid by 0.03
	if (strychnine > 0.5 && arsenic < 0.54 && (formaldehyde > 0.28 || SpiderVenom < 0.65)) {
		hydrochloricAcid += 0.03;
	}
	// - If either insecticide goes above 0.5, mercury goes above 0.67, or perhaps hemlock goes above 0.44, try decreasing Calcium_Gluconate by 0.05
	if (insecticide > 0.5 || mercury > 0.67 || hemlock > 0.44) {
		Calcium_Gluconate -= 0.05;
	}
	// - If either NerveGas goes above 0.56, formaldehyde dips below 0.5, SpiderVenom goes above 0.73, or perhaps arsenic dips below 0.57, try increasing Calcium_Gluconate by 0.02
	if (NerveGas > 0.56 || formaldehyde < 0.5 || SpiderVenom > 0.73 || arsenic < 0.57) {
		Calcium_Gluconate += 0.02;
	}
	// - When hemlock goes above 0.67 and strychnine goes above 0.53, whilst at the same time, mercury dips below 0.54 or arsenic goes above 0.33, try decreasing glucagon by 0.04
	if (hemlock > 0.67 && strychnine > 0.53 && (mercury < 0.54 || arsenic > 0.33)) {
		glucagon -= 0.04;
	}
	// - If either formaldehyde goes above 0.54, insecticide dips below 0.45, or perhaps SpiderVenom dips below 0.58, try increasing glucagon by 0.04
	if (formaldehyde > 0.54 || insecticide < 0.45 || SpiderVenom < 0.58) {
		glucagon += 0.04;
	}



	//////////////////////////////////////////////////////

	//the code below generates new values using random numbers

	/*
		For testing, you might want to temporarily comment out
		these lines and set the same variables to constant values
		instead.
	*/

	arsenic = nextValue(graphs[0], arsenic);
	hemlock = nextValue(graphs[1], hemlock);
	mercury = nextValue(graphs[2], mercury);
	strychnine = nextValue(graphs[3], strychnine);
	NerveGas = nextValue(graphs[4], NerveGas);
	insecticide = nextValue(graphs[5], insecticide);
	formaldehyde = nextValue(graphs[6], formaldehyde);
	SpiderVenom = nextValue(graphs[7], SpiderVenom);


	charcoal = constrain(charcoal, 0, 1);
	paracetamol = constrain(paracetamol, 0, 1);
	hydrochloricAcid = constrain(hydrochloricAcid, 0, 1);
	Calcium_Gluconate = constrain(Calcium_Gluconate, 0, 1);
	glucagon = constrain(glucagon, 0, 1);


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
		color(0, 255, 255),
		color(255, 100, 100),
		color(255, 100, 0)
	];

	for (var i = 0; i < graphs.length; i++) {
		stroke(colors[i]);
		drawGraph(graphs[i]);
	}

	//draw the poisons as text
	noStroke();
	fill(colors[0]);
	text('arsenic: ' + nf(arsenic, 1, 2), 20, 20);
	fill(colors[1]);
	text('hemlock: ' + nf(hemlock, 1, 2), 20, 40);
	fill(colors[2]);
	text('mercury: ' + nf(mercury, 1, 2), 20, 60);
	fill(colors[3]);
	text('strychnine: ' + nf(strychnine, 1, 2), 20, 80);
	fill(colors[4]);
	text('NerveGas: ' + nf(NerveGas, 1, 2), 20, 100);
	fill(colors[5]);
	text('insecticide: ' + nf(insecticide, 1, 2), 20, 120);
	fill(colors[6]);
	text('formaldehyde: ' + nf(formaldehyde, 1, 2), 20, 140);
	fill(colors[7]);
	text('SpiderVenom: ' + nf(SpiderVenom, 1, 2), 20, 160);


	//draw the antidotes bar chart
	drawBar(charcoal, 50, 'charcoal');
	drawBar(paracetamol, 200, 'paracetamol');
	drawBar(hydrochloricAcid, 350, 'hydrochloricAcid');
	drawBar(Calcium_Gluconate, 500, 'Calcium_Gluconate');
	drawBar(glucagon, 650, 'glucagon');


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
