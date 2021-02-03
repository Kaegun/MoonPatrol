var canvasWidth = 1500;
var canvasHeight = 900;

function setup() {
    createCanvas(canvasWidth, canvasHeight);

    resetDrawingState();
}

function draw() {
    //  Background blue for sky
    background(0, 191, 255);

    //  draw the ground
    drawGround();

    //  draw some clouds
    drawCloud(150, 150);
    drawCloud(450, 120);
    drawCloud(750, 170);
    drawCloud(1050, 140);
    drawCloud(1350, 180);

    //  drawBuggy
    drawBuggy();

    //  reset drawing
    // resetDrawingState();
}

function resetDrawingState() {
    noStroke();
}

function drawGround() {
    //  draw the ground
    fill(210, 180, 140);
    rect(0, height - 200, height, 200);
    stroke(0);
    line(0, height - 200, width, height - 200);
}

function drawCloud(x, y) {
    noStroke();
    fill(255);
    var cloudWidth = 75;
    var cloudHeight = 65;
    ellipse(x, y, cloudWidth, cloudHeight);
    ellipse(x, y - 30, cloudWidth - 10, cloudHeight - 10);
    ellipse(x - 50, y - 5, cloudWidth - 10, cloudHeight - 10);
    ellipse(x + 50, y - 5, cloudWidth - 10, cloudHeight - 10);
}

function drawMountain() {

    stroke(0);
    fill(125, 125, 125);
    triangle(270, 432, 385, 356, 500, 432);
    triangle(500, 432, 615, 356, 730, 432);
    triangle(375, 432, 500, 256, 625, 432);
    noStroke();
    fill(255, 255, 255, 180);
    triangle(468, 302, 500, 256, 532, 302);
}

function drawTree() {

}

function drawBuggy() {

    // console.log('drawBuggy');
    stroke(88, 88, 88, 125);
    strokeWeight(2);
    fill(153, 50, 204); //  DarkOrchid
    fill(85, 107, 47);  //  DarkOliveGreen
    fill(255, 140, 0);  //  DarkOrange
    fill(95, 158, 160); //  CadetBlue
    fill(25, 25, 112);  //  MidnightBlue
    fill(47, 79, 79);   //  DarkSlateGrey
    fill(128, 0, 0);    //  Maroon

    //  Main Body
    beginShape();

    var x = 800, y = height - 260;
    vertex(x, y);
    vertex(x + 80, y);
    vertex(x + 140, y - 20);
    vertex(x + 160, y - 20);
    vertex(x + 240, y + 10);
    vertex(x + 240, y + 25);
    vertex(x + 210, y + 40);
    vertex(x - 10, y + 40);
    vertex(x - 20, y + 30);
    vertex(x - 20, y + 15);
    vertex(x, y);

    endShape();

    //  Cockpit
    stroke(255, 255, 255, 150);
    fill(0, 255, 255, 150);
    beginShape();

    vertex(x + 85, y + 5);
    vertex(x + 145, y - 15);
    vertex(x + 155, y - 15);
    vertex(x + 225, y + 10);
    vertex(x + 85, y + 5);

    endShape();

    //  Turret
    stroke(88, 88, 88, 150);
    fill(0);

    rect(x + 20, y, 40, 5);
    rect(x + 30, y - 15, 20, 20);
    rect(x + 35, y - 40, 10, 25);

    //  Forward Gun
    rect(x + 200, y + 13, 50, 10);
    rect(x + 230, y + 15, 35, 7);

    //  Wheels
    strokeWeight(3);
    stroke(88, 88, 88, 150);
    fill(0);
    ellipse(x + 20, y + 50, 45);
    ellipse(x + 70, y + 50, 45);
    ellipse(x + 180, y + 50, 45);

    fill(125);
    ellipse(x + 20, y + 50, 25);
    ellipse(x + 70, y + 50, 25);
    ellipse(x + 180, y + 50, 25);
}