/*

- Copy your game project code into this file
- for the p5.Sound library look here https://p5js.org/reference/#/libraries/p5.sound
- for finding cool sounds perhaps look here
https://freesound.org/


*/

var buggy;
var sfx;

function preload() {
    sfx = new Sfx();
    sfx.initialize();
}

function setup() {
    createCanvas(1400, 800);

    buggy = new Buggy();
    buggy.initialize();
}

function draw() {
    buggy.draw();
}

function keyPressed() {
    sfx.playSound(0);
}