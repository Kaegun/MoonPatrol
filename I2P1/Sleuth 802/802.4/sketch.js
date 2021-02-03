/*
802 - The case of Monte Carlo
Stage 4 - Club criminal


Officer: 1192743
CaseNum: 802-3-65453204-1192743

The card sharks from Rossling Polling are not pleased with your stellar performance and suspect foul play. They are challenging you to find a single card in the deck in just one cut.
The card you are looking for is stored in the cut_here object. Cut the deck at this exact location and they will give up their secrets.

* Using a for loop search for the card represented by cut_here in the card_deck array.
* Do this in a function called deck_cut and call it from setup.
* We need to be quick to not be spotted. Make sure you use a for loop and the break statement when you find a match in the deck.
* Store the cut card and all the elements after from the card_deck array in the top_of_deck array. Do this using the JavaScript splice() function
* You’ll then need to reverse the elements in top_of_deck so that the card we cut the deck at is the last element and not the first. Unfortunately, 
if we use the JavaScript inbuilt reverse() function we’ll be spotted. You’ll have to write this yourself kid. Do this in the deck_cut after you have filled top_of_deck.


*You also need to write a shuffleSeed() function. Same as before, it needs to return an array of 52 random integers but set the random value to start at 4 and end at 80.
Make sure you use the push method to add values to your array and the round function to convert your random values to integers.
*Call shuffleSeed in setup and use the return value as the argument for shuffleDeck().

*/

var card_deck = [{ "suit": "Spades", "value": "A" }, { "suit": "Spades", "value": "2" }, { "suit": "Spades", "value": "3" }, { "suit": "Spades", "value": "4" }, { "suit": "Spades", "value": "5" }, { "suit": "Spades", "value": "6" }, { "suit": "Spades", "value": "7" }, { "suit": "Spades", "value": "8" }, { "suit": "Spades", "value": "9" }, { "suit": "Spades", "value": "10" }, { "suit": "Spades", "value": "J" }, { "suit": "Spades", "value": "Q" }, { "suit": "Spades", "value": "K" }, { "suit": "Clubs", "value": "A" }, { "suit": "Clubs", "value": "2" }, { "suit": "Clubs", "value": "3" }, { "suit": "Clubs", "value": "4" }, { "suit": "Clubs", "value": "5" }, { "suit": "Clubs", "value": "6" }, { "suit": "Clubs", "value": "7" }, { "suit": "Clubs", "value": "8" }, { "suit": "Clubs", "value": "9" }, { "suit": "Clubs", "value": "10" }, { "suit": "Clubs", "value": "J" }, { "suit": "Clubs", "value": "Q" }, { "suit": "Clubs", "value": "K" }, { "suit": "Hearts", "value": "A" }, { "suit": "Hearts", "value": "2" }, { "suit": "Hearts", "value": "3" }, { "suit": "Hearts", "value": "4" }, { "suit": "Hearts", "value": "5" }, { "suit": "Hearts", "value": "6" }, { "suit": "Hearts", "value": "7" }, { "suit": "Hearts", "value": "8" }, { "suit": "Hearts", "value": "9" }, { "suit": "Hearts", "value": "10" }, { "suit": "Hearts", "value": "J" }, { "suit": "Hearts", "value": "Q" }, { "suit": "Hearts", "value": "K" }, { "suit": "Diamonds", "value": "A" }, { "suit": "Diamonds", "value": "2" }, { "suit": "Diamonds", "value": "3" }, { "suit": "Diamonds", "value": "4" }, { "suit": "Diamonds", "value": "5" }, { "suit": "Diamonds", "value": "6" }, { "suit": "Diamonds", "value": "7" }, { "suit": "Diamonds", "value": "8" }, { "suit": "Diamonds", "value": "9" }, { "suit": "Diamonds", "value": "10" }, { "suit": "Diamonds", "value": "J" }, { "suit": "Diamonds", "value": "Q" }, { "suit": "Diamonds", "value": "K" }];
var deck_img;
var table_img;
var drawCounter = 0;

var cut_here = { "s": "Spades", "number": "8" };
var top_of_deck = [];

function preload() {
	deck_img = loadImage("deck.png");
	table_img = loadImage("table.png");
}
function setup() {
	createCanvas(table_img.width, table_img.height);
	frameRate(30);


	//call your shuffleSeed() function here. Followed by a call to shuffleDeck with the return value of shuffleSeed() as an argument.
	var seed = shuffleSeed();
	shuffleDeck(seed);

	//call your deck_cut function here
	deck_cut();
}

//write your deck_cut function here
function deck_cut() {

	var cut_cards = [];
	for (var i = 0; i < card_deck.length; i++) {
		if (card_deck[i].suit == cut_here.s && card_deck[i].value == cut_here.number) {
			cut_cards = card_deck.splice(i);
			break;
		}
	}
	for (var i = cut_cards.length - 1; i >= 0; i--)
		top_of_deck.push(cut_cards[i]);
}

//write your shuffleSeed() function here.
function shuffleSeed() {
	var cards = [];
	for (var i = 0; i < 52; i++) {
		cards.push(round(random(4, 80)))
	}
	return cards;
}

/////////////////////DON'T CHANGE ANYTHING BELOW HERE/////////////////////////
function shuffleDeck(shuffleSeed) {
	//shuffle the deck by rotating the cards location with the values in
	//shuffleSeed. Repeat this a random number of times between 20 and 50
	var shuffleIterations = parseInt(random(20, 50));
	for (var i = 0; i < shuffleIterations; i++) {
		for (var j = 0; j < card_deck.length; j++) {
			var tempCard = card_deck.splice(j, 1);
			var newLoc = (j + shuffleSeed[j]) % 52;
			card_deck.splice(newLoc, 0, tempCard[0]);
		}
	}
}

function draw() {
	image(table_img, 0, 0);

	if (frameCount % 7 == 0) {
		drawCounter++;
		if (drawCounter == 5) {
			noLoop();
		}
	}
	for (var i = 0; i < drawCounter; i++) {
		if (i < top_of_deck.length) {
			drawCard(top_of_deck[i], 880 + i * 18, 750);
		}
	}


}


function drawCard(card, x, y) {

	var values = ["A", "2", "3", "4", "5", "6", "7", "8", "9", "10", "J", "Q", "K"];
	var suits = ["Spades", "Clubs", "Hearts", "Diamonds"];

	for (var i = 0; i < suits.length; i++) {
		for (var j = 0; j < values.length; j++) {
			if (card.value == values[j] && card.suit == suits[i]) {
				//img, sx, sy, sWidth, sHeight, dx, dy, dWidth, dHeight
				image(deck_img, j * 200, i * 300, 200, 300, x, y, 100, 150);
				break;
			}
		}
	}
}
