/*

- Copy your game project code into this file
- for the p5.Sound library look here https://p5js.org/reference/#/libraries/p5.sound
- for finding cool sounds perhaps look here
https://freesound.org/


*/

var activeLevel = 0;
var numLevels = 0;
var levels = [];
var buggy;
var sfx;

function preload() {
    sfx = new Sfx();
    sfx.initialize();
}

function setup() {
    createCanvas(1400, 800);

    numLevels = createLevels(levels);

    buggy = new Buggy();
    buggy.initialize(levels[activeLevel].floorPos_y);
}

function draw() {
    levels[activeLevel].draw();

    buggy.draw();

    buggy.update();
}

function keyPressed() {
    // sfx.playSound(0);
    /*
        keys:
            LeftCtrl = 17   - Fire1
            LeftShift: 16   - Fire2
            LeftArrow: 37   - Slow
            RightArrow: 39  - Accelerate
            Spacebar: 32    - Jump
            S: 83           - Shield
    */

    switch (keyCode) {
        default:
            console.log(`key not handled: [${key}]`);
            console.log(`keyCode not handled: [${keyCode}]`);
    }
}