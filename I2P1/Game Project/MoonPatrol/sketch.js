/*

After the mid-term, I decided to change my project up and implement a Moon Patrol clone.
I replaced the character with the Moon Patrol ATB, trees became rock formations, clouds became moons and planets,
and I added some flair to the mountains. The pick-ups are drops from shooting the Recon Fighter.

I've added sound (from a royalty-free library that I downloaded - citations needed?)

I added 4 types of enemies
 - Standard fighters
 - Bombers
 - Recon Fighter (drops a special and plays a sound to warn the player of it coming)
 - Mothership

 Added a base, some platforms and a shield mechanism.

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
        case 17:
            this.buggy.fireTurrets();
            break;
        case 88:
            this.buggy.destroy();
            break;
        default:
            console.log(`key not handled: [${key}]`);
            console.log(`keyCode not handled: [${keyCode}]`);
            break;
    }
}