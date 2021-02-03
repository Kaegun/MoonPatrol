/*

Officer: 1192743
CaseNum: 401-0-17572606-1192743

Case 401 - The Case of Norbert's Weiner Stand
Stage 1 - Noxious Weiner

Console city has been plunged into chaos. The notorious poisoner Norbert has struck the
population down with a potent poison. Word has it that he is smuggling his venomous filth
via a streetside weiner stand. Hundreds of people have been affected, and the municipal
water company tells me that their sewers are at full capacity. This is no laughing matter.
I need you to head down to our lab and work on an antidote.

You must develop the antidote by using conditional statements in the draw loop to
do the following:


You must develop the antidote by using conditional statements in the draw loop to
do the following.

	- If arsenic goes above 0.5, reduce opioids by 0.05
	- When ricin dips below 0.45, try increasing opioids by 0.01
	- When chlorine dips below 0.7, decrease plasma by 0.03
	- If arsenic dips below 0.33, increase plasma by 0.01
	- If ricin goes above 0.6, reduce chalk by 0.02
	- When chlorine goes above 0.64, try increasing chalk by 0.01


Your conditional statements should:

consider the following poisons:

	- arsenic
	- ricin
	- chlorine


and modify the following antidotes:

	- opioids
	- plasma
	- chalk


- There are many ways to complete this task but you should only use the
following commands:

	if(){}
	+=
	-=

*/

//Declare the poison variables
var arsenic;
var ricin;
var chlorine;


//Declare the antidote variables
var opioids;
var plasma;
var chalk;


//This variable is used for drawing the graph
var graphs;


function setup() {

	createCanvas(800, 600);
	strokeWeight(2);

	//initialise the poisons and antidotes
	arsenic = 0.5;
	ricin = 0.5;
	chlorine = 0.5;
	opioids = 0.5;
	plasma = 0.5;
	chalk = 0.5;


	//fills the graph with empty values
	graphs = [];

	for (var i = 0; i < 3; i++) {
		graphs.push([]);
		for (var j = 0; j < 512; j++) {
			graphs[i].push(0.5);
		}
	}

}

/*
	- If arsenic goes above 0.5, reduce opioids by 0.05
	- If arsenic dips below 0.33, increase plasma by 0.01
	- When ricin dips below 0.45, try increasing opioids by 0.01
	- If ricin goes above 0.6, reduce chalk by 0.02
	- When chlorine dips below 0.7, decrease plasma by 0.03
	- When chlorine goes above 0.64, try increasing chalk by 0.01
*/
function draw() {

	//Develop the antidote below
	//Write conditional statements to change the amount of each substance ...

	if (arsenic > 0.5) {
		opioids -= 0.05;
	}
	if (arsenic < 0.33) {
		plasma += 0.01;
	}
	if (ricin < 0.45) {
		opioids += 0.01;
	}
	if (ricin > 0.6) {
		chalk -= 0.02;
	}
	if (chlorine < 0.7) {
		plasma -= 0.03;
	}
	if (chlorine > 0.64) {
		chalk += 0.01;
	}



	//////////////////////////////////////////////////////

	//the code below generates new values using random numbers

	/*
		For testing, you might want to temporarily comment out
		these lines and set the same variables to constant values
		instead.
	*/

	arsenic = nextValue(graphs[0], arsenic);
	ricin = nextValue(graphs[1], ricin);
	chlorine = nextValue(graphs[2], chlorine);


	opioids = constrain(opioids, 0, 1);
	plasma = constrain(plasma, 0, 1);
	chalk = constrain(chalk, 0, 1);


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
	text('arsenic: ' + nf(arsenic, 1, 2), 20, 20);
	fill(colors[1]);
	text('ricin: ' + nf(ricin, 1, 2), 20, 40);
	fill(colors[2]);
	text('chlorine: ' + nf(chlorine, 1, 2), 20, 60);


	//draw the antidotes bar chart
	drawBar(opioids, 50, 'opioids');
	drawBar(plasma, 200, 'plasma');
	drawBar(chalk, 350, 'chalk');


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
