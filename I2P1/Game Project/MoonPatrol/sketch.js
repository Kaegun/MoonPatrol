/*

See Readme.md

*/

var activeLevel = 0;
var numLevels = 0;
var scrollPos = 0;
var levels = [];
var enemies = [];
var pickups = [];
var sfx;

//  player
var buggy;
var hud;
var score = 0;

function preload() {
    sfx = new Sfx();
    sfx.initialize();
}

function setup() {
    createCanvas(1400, 800);

    numLevels = createLevels(levels);

    buggy = new Buggy();
    buggy.initialize(levels[activeLevel].floorPos_y);

    var pu = new Pickup();
    pu.initialize(1000, levels[activeLevel].floorPos_y - 35, 0);
    pickups.push(pu);

    spawnUfoStandardWave(1, enemies);

    hud = new Hud();
    hud.initialize();
}

function draw() {

    scrollPos += this.buggy.speed;

    //  call update on all objects to update positions
    buggy.update(scrollPos);
    for (var i = 0; i < enemies.length; i++) {
        enemies[i].update(scrollPos);
    }
    for (var i = 0; i < this.pickups.length; i++) {
        pickups[i].update(scrollPos);
    }

    levels[activeLevel].update(scrollPos);

    hud.update(score);

    //  call draw on all objects to draw all changes
    levels[activeLevel].draw();

    for (var i = 0; i < enemies.length; i++) {
        enemies[i].draw();
    }

    for (var i = 0; i < this.pickups.length; i++) {
        this.pickups[i].draw();
    }

    buggy.draw();

    hud.draw();
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
            M: 77           - Toggle music
    */

    switch (keyCode) {
        case 37:
            this.buggy.decelerate();
            break;
        case 39:
            this.buggy.accelerate();
            break;
        case 32:
            this.buggy.jump();
            break;
        case 17:
            this.buggy.fireTurrets();
            break;
        case 16:
            this.buggy.fireMissile();
            break;
        case 83:
            this.buggy.activateShield();
            break;
        case 77:    //  turn music playback on or off
            this.levels[this.activeLevel].toggleMusic();
            break;
        case 88:    //  TODO: Temporary for testing
            this.buggy.destroy();
            break;
        default:
            console.log(`key not handled: [${key}]`);
            console.log(`keyCode not handled: [${keyCode}]`);
            break;
    }
}