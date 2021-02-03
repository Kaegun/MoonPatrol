/*

Officer: 1192743
CaseNum: 401-1-28893338-1192743

Case 401 - The Case of Norbert's Weiner Stand
Stage 2 - Toxic Burrito

Norbert is at it again. This time he’s set up a burrito stall and is lacing burritos
with his foul toxin. The chaos is spreading. People are dropping like flies and burrito
sales have fallen through the floor. To make matters worse it seems Norbert has cottoned
on to our methods and has upped the complexity of his poison. You’ll find the antidote
harder to develop this time. So kid, head down to the lab and get working.

You must develop the antidote by using conditional statements in the draw loop to
do the following.

	- When polonium goes above 0.38 or formaldehyde dips below 0.51, decrease opioids by 0.02
	- When warfarin dips below 0.56 and hemlock dips below 0.29, increase opioids by 0.03
	- If formaldehyde goes above 0.35 and warfarin goes above 0.27, decrement methylene by 0.04
	- If polonium dips below 0.63, raise methylene by 0.03
	- If polonium goes above 0.55 and hemlock dips below 0.66, reduce glucagon by 0.01
	- When formaldehyde dips below 0.52 and warfarin goes above 0.57, try increasing glucagon by 0.04
	- When warfarin goes above 0.27 and hemlock goes above 0.71, reduce sodiumBicarbonate by 0.02
	- When formaldehyde goes above 0.35, increment sodiumBicarbonate by 0.03


Your conditional statements should:

consider the following poisons:

	- hemlock
	- warfarin
	- polonium
	- formaldehyde


and modify the following antidotes:

	- opioids
	- methylene
	- glucagon
	- sodiumBicarbonate


- There are many ways to complete this task but you should only use the
following commands:

	if(){}
	+=
	-=

*/

//Declare the poison variables
var hemlock;
var warfarin;
var polonium;
var formaldehyde;


//Declare the antidote variables
var opioids;
var methylene;
var glucagon;
var sodiumBicarbonate;


//This variable is used for drawing the graph
var graphs;


function setup() {

	createCanvas(800, 600);
	strokeWeight(2);

	//initialise the poisons and antidotes
	hemlock = 0.5;
	warfarin = 0.5;
	polonium = 0.5;
	formaldehyde = 0.5;
	opioids = 0.5;
	methylene = 0.5;
	glucagon = 0.5;
	sodiumBicarbonate = 0.5;


	//fills the graph with empty values
	graphs = [];

	for (var i = 0; i < 4; i++) {
		graphs.push([]);
		for (var j = 0; j < 512; j++) {
			graphs[i].push(0.5);
		}
	}

}
/*
	- When polonium goes above 0.38 or formaldehyde dips below 0.51, decrease opioids by 0.02
	- If polonium dips below 0.63, raise methylene by 0.03
	- If polonium goes above 0.55 and hemlock dips below 0.66, reduce glucagon by 0.01
	- When warfarin dips below 0.56 and hemlock dips below 0.29, increase opioids by 0.03
	- When warfarin goes above 0.27 and hemlock goes above 0.71, reduce sodiumBicarbonate by 0.02
	- If formaldehyde goes above 0.35 and warfarin goes above 0.27, decrement methylene by 0.04
	- When formaldehyde dips below 0.52 and warfarin goes above 0.57, try increasing glucagon by 0.04
	- When formaldehyde goes above 0.35, increment sodiumBicarbonate by 0.03
*/
function draw() {

	//Develop the antidote below
	//Write conditional statements to change the amount of each substance ...
	if (polonium > 0.38 || formaldehyde < 0.51) {
		opioids -= 0.02;
	}
	if (polonium < 0.63) {
		methylene += 0.03;
	}
	if (polonium > 0.55 && hemlock < 0.66) {
		glucagon -= 0.01;
	}
	if (warfarin < 0.56 && hemlock < 0.29) {
		opioids += 0.03;
	}
	if (warfarin > 0.27 && hemlock > 0.71) {
		sodiumBicarbonate -= 0.02;
	}
	if (formaldehyde > 0.35 && warfarin > 0.27) {
		methylene -= 0.04;
	}
	if (formaldehyde < 0.52 && warfarin > 0.57) {
		glucagon += 0.04;
	}
	if (formaldehyde > 0.35) {
		sodiumBicarbonate += 0.03;
	}



	//////////////////////////////////////////////////////

	//the code below generates new values using random numbers

	/*
		For testing, you might want to temporarily comment out
		these lines and set the same variables to constant values
		instead.
	*/

	hemlock = nextValue(graphs[0], hemlock);
	warfarin = nextValue(graphs[1], warfarin);
	polonium = nextValue(graphs[2], polonium);
	formaldehyde = nextValue(graphs[3], formaldehyde);


	opioids = constrain(opioids, 0, 1);
	methylene = constrain(methylene, 0, 1);
	glucagon = constrain(glucagon, 0, 1);
	sodiumBicarbonate = constrain(sodiumBicarbonate, 0, 1);


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
	text('hemlock: ' + nf(hemlock, 1, 2), 20, 20);
	fill(colors[1]);
	text('warfarin: ' + nf(warfarin, 1, 2), 20, 40);
	fill(colors[2]);
	text('polonium: ' + nf(polonium, 1, 2), 20, 60);
	fill(colors[3]);
	text('formaldehyde: ' + nf(formaldehyde, 1, 2), 20, 80);


	//draw the antidotes bar chart
	drawBar(opioids, 50, 'opioids');
	drawBar(methylene, 200, 'methylene');
	drawBar(glucagon, 350, 'glucagon');
	drawBar(sodiumBicarbonate, 500, 'sodiumBicarbonate');


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
