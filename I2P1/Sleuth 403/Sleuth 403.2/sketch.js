/*

Officer: 1192743
CaseNum: 403-1-74536019-1192743

Case 403 - Stake out - stage 2

I've gotten hold of a hot tip that Shiffman is hiding out at Smalltalk Speakeasy.
We've alerted the local precinct but they cannot act unless they know for certain that he's within 155 meters (pixels) of the spot.

Whenever Shiffman (signified by the mouse) is within 155 pixels of Smalltalk Speakeasy - draw a DarkBlue ellipse with a radius of 155 around it.

Use X11 colours. You can find a reference table at https://en.wikipedia.org/wiki/Web_colors.

There are many possible ways of investigating this case, but you
should use ONLY the following commands:

  if()
  fill()
  ellipse()
  dist()
  mouseX
  mouseY

*/

var img;

function preload() {
  img = loadImage('map.jpg');
}

function setup() {
  createCanvas(img.width, img.height);
}

function draw() {
  // draw the image
  image(img, 0, 0);

  var smalltalk = { x: 2210, y: 670 };
  //Write your code below here ...
  console.log(`${smalltalk.x}, ${smalltalk.y}, ${mouseX}, ${mouseY}`);
  if (dist(smalltalk.x, smalltalk.y, mouseX, mouseY) < 155) {
    fill(0, 0, 139);
    ellipse(smalltalk.x, smalltalk.y, 310, 310);
  }


  // finally, draw Shiffman's position
  strokeWeight(2);
  stroke(255);
  fill(255, 0, 0);
  ellipse(mouseX, mouseY, 10, 10);
}
