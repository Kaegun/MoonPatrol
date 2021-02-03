/*

Officer: 1192743
CaseNum: 403-3-89973278-1192743

Case 403 - Captured - stage 4

A coordinated action is under way to arrest Shiffman. Police are currently in pursuit on Meyers Way.
In order to catch him we must be able to alert all forces of his whereabouts according to the following rules:

- if Shiffman is within 63 meters from Norbert's Begel Emporium then alert local police by drawing a CornflowerBlue circle around it with a radius of 63 pixels.
- if Shiffman is in Gates Bank then the neighbourhood watch must be notified by drawing a Brown rectangle around it.
- if Shiffman is in neither position, a global alert must be issued by drawing a MediumSpringGreen rectangle covering the area between Gates Avenue, Bereners-Lee Street, Meyers Way and Adele Street.

Shiffman's position is signified by the mouse.

Note: all road coordinates are measured from their center.

Use X11 colours. You can find a reference table at https://en.wikipedia.org/wiki/Web_colors.

There are many possible ways of investigating this case, but you
should use ONLY the following commands:

  if()
  fill()
  rect()
  ellipse()
  dist()

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

  var norbert = { x: 940, y: 610 };
  var gates = { left: 1530, right: 1630, top: 760, bottom: 855 };
  var alert = { left: 600, right: 1505, top: 75, bottom: 670 };
  //Write your code below here ...
  if (dist(norbert.x, norbert.y, mouseX, mouseY) < 63) {
    fill(100, 149, 237);
    ellipse(norbert.x, norbert.y, 126, 126);
  }
  else if (mouseX > gates.left && mouseX < gates.right && mouseY > gates.top && mouseY < gates.bottom) {
    fill(165, 42, 42);
    rect(gates.left, gates.top, gates.right - gates.left, gates.bottom - gates.top);
  }
  else {
    // Gates Avenue, Bereners-Lee Street, Meyers Way and Adele Street.
    fill(0, 250, 154);
    rect(alert.left, alert.top, alert.right - alert.left, alert.bottom - alert.top);
  }

  // finally, draw Shiffman's position
  strokeWeight(2);
  stroke(255);
  fill(255, 0, 0);
  ellipse(mouseX, mouseY, 10, 10);
}
