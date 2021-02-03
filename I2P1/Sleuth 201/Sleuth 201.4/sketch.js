/*
201 - The case of Judge Hopper
Stage 4 - The warehouse

Officer: 1192743
CaseNum: 201-3-49566511-1192743

As you enter the ALGOL warehouse you are struck by the most horrendous stench - 
it’s not the fish. Lying amongst piles of fish carcasses you find the body of 
Judge Hopper. Gathering yourself together, you tie a handkerchief around your 
nose and mouth and quickly set about recording the evidence.

Draw around the Judge’s body ...

You should need around 20 vertices to draw round the judge and make sure you close your shape!


*/

var img;

function preload() {
    img = loadImage('scene.png');
}

function setup() {
    createCanvas(img.width, img.height);
}

function draw() {

    image(img, 0, 0);
    stroke(255, 0, 0);
    strokeWeight(3);
    noFill();

    // write the code to draw around the Judge's body below
    beginShape();

    vertex(350, 335);
    vertex(360, 300);
    vertex(375, 295);
    vertex(400, 270);
    vertex(415, 270);
    vertex(445, 235);
    vertex(420, 215);
    vertex(395, 220);
    vertex(395, 180);
    vertex(485, 218);
    vertex(470, 270);
    vertex(550, 280);
    vertex(660, 265);
    vertex(660, 290);
    vertex(725, 295);
    vertex(745, 335);
    vertex(670, 330);
    vertex(670, 335);
    vertex(725, 338);
    vertex(750, 400);
    vertex(720, 390);
    vertex(690, 365);
    vertex(685, 370);
    vertex(705, 405);
    vertex(575, 395);
    vertex(465, 380);
    vertex(440, 385);
    vertex(440, 520);
    vertex(420, 550);
    vertex(400, 530);
    vertex(410, 500);
    vertex(400, 425);
    vertex(385, 410);
    vertex(370, 395);
    vertex(355, 400);
    vertex(355, 375);
    vertex(360, 360);

    vertex(350, 335);

    endShape();
}
