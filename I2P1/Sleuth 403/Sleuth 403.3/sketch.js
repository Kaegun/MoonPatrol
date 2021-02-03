/*

Officer: 1192743
CaseNum: 403-2-75412979-1192743

Case 403 - Cornered - stage 3


We have Shiffman cornered at The Plaza Hotel and more help is on the way.
Until our backup arrives the orders are to make sure he stays inside The Plaza Hotel

Your job is to indicate that Shiffman (signified by the mouse) is indeed within the North - East - South - West bounds of The Plaza Hotel.
Draw a DarkBlue rectangle covering The Plaza Hotel for as long as Shiffman is in it.

Use X11 colours. You can find a reference table at https://en.wikipedia.org/wiki/Web_colors.

There are many possible ways of investigating this case, but you
should use ONLY the following commands:

  if()
  fill()
  rect()
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

  //Write your code below here ...
  var hotel = { left: 1935, right: 2290, top: 415, bottom: 565 };

  if (mouseX > hotel.left && mouseX < hotel.right && mouseY > hotel.top && mouseY < hotel.bottom) {
    fill(0, 0, 139);
    rect(hotel.left, hotel.top, hotel.right - hotel.left, hotel.bottom - hotel.top);
  }

  // finally, draw Shiffman's position
  strokeWeight(2);
  stroke(255);
  fill(255, 0, 0);
  ellipse(mouseX, mouseY, 10, 10);
}
