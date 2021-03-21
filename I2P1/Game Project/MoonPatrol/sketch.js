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

var pause = true;

//  player
var buggy;
var hud;
var score = 0;

function preload() {
    //  Loading Sound Effects and Music
    sfx = new Sfx();
    sfx.initialize();

    //  Loading Hud and Fonts
    hud = new Hud();
    hud.initialize();
}

function setup() {
    createCanvas(windowWidth, windowHeight - 3);

    numLevels = createLevels(levels, sfx);

    buggy = new Buggy();
    buggy.initialize(levels[activeLevel].floorPos_y);

    var pu = new Pickup();
    pu.initialize(1000, levels[activeLevel].floorPos_y - 35, 0);
    pickups.push(pu);

    spawnUfoStandardWave(1, enemies);
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
        pickups[i].draw();
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
        case 13:
            //  continue / start / next level, etc.
            break;
        case 37:
            buggy.decelerate();
            break;
        case 39:
            buggy.accelerate();
            break;
        case 32:
            buggy.jump();
            break;
        case 17:
            buggy.fireTurrets();
            break;
        case 16:
            buggy.fireMissile();
            break;
        case 83:
            buggy.activateShield();
            break;
        case 77:    //  turn music playback on or off
            levels[activeLevel].toggleMusic();
            sfx.toggleSound();
            break;
        case 88:    //  TODO: Temporary for testing
            buggy.destroy();
            break;
        default:
            console.log(`key not handled: [${key}]`);
            console.log(`keyCode not handled: [${keyCode}]`);
            break;
    }
}

function keyReleased() {
    switch (keyCode) {
        case 13:
            //  continue / start / next level, etc.
            break;
        case 37:
            //       this.buggy.decelerate();
            break;
        case 39:
            //      this.buggy.accelerate();
            break;
        case 32:
            //         this.buggy.jump();
            break;
        case 17:
            //       this.buggy.fireTurrets();
            break;
        case 16:
            //         this.buggy.fireMissile();
            break;
        case 83:
            //          this.buggy.activateShield();
            break;
        case 77:    //  turn music playback on or off
            //        this.levels[this.activeLevel].toggleMusic();
            break;
        case 88:    //  TODO: Temporary for testing
            //        this.buggy.destroy();
            break;
        default:
            console.log(`key not handled: [${key}]`);
            console.log(`keyCode not handled: [${keyCode}]`);
            break;
    }
}