/*
See Readme.md
*/

//  constants
const KEY_FIRE1 = 17;
const KEY_FIRE2 = 90
const KEY_SLOWDOWN = 37;
const KEY_SPEEDUP = 39;
const KEY_JUMP = 32;
const KEY_SHIELD = 83;
const KEY_MUSIC = 77;
const KEY_ENTER = 13;
const KEY_ESC = 0;

var activeLevel = 0;
var numLevels = 0;
var scrollPos = 0;
var levels = [];
var pickups = [];
var sfx;

var pause = true;

//  player
var buggy;
var hud;
var score = 0;
var lives = 3;

function preload() {
    //  Loading Sound Effects and Music
    sfx = new Sfx();
    sfx.initialize();

    //  Loading Hud and Fonts
    hud = new Hud();
    hud.initialize();
}

function setup() {
    createCanvas(windowWidth, max(800, windowHeight - 3));

    numLevels = createLevels(levels, sfx);

    //  Move this to an initialize level method
    buggy = new Buggy();
    buggy.initialize(levels[activeLevel].floorPosY, sfx);

    var pu = new Pickup();
    pu.initialize(1000, levels[activeLevel].floorPosY - 35, 0);
    pickups.push(pu);
}

function draw() {

    //  check for collisions
    checkCollisions();

    //  updates
    update();

    //  call draw on all objects to draw all changes
    levels[activeLevel].draw();

    drawObjects(pickups);

    buggy.draw();

    hud.draw();
}

function checkCollisions() {
    for (var i = 0; i < levels[activeLevel].enemies.length; i++) {
        checkEnemyCollision(levels[activeLevel].enemies[i], buggy.bulletsUp);
    }
}

function checkEnemyCollision(enemy, projectiles) {
    for (var i = 0; i < projectiles.length; i++) {
        if (enemy.collision(projectiles[i].position)) {
            enemy.destroy();
            score += enemy.scoreValue;
            return;
        }
    }
}

function update() {
    scrollPos += this.buggy.speed;

    //  call update on all objects to update positions
    buggy.update(scrollPos);

    updateObjects(pickups);

    levels[activeLevel].update(scrollPos);

    hud.update(score, lives,
        buggy.getMissileCount(),
        buggy.getShieldTimer(),
        buggy.getMultishotTimer(),
        buggy.getJumpJetTimer());
}

function updateObjects(objects) {
    for (var i = 0; i < objects.length; i++) {
        objects[i].update(scrollPos);
    }
}

function drawObjects(objects) {
    for (var i = 0; i < objects.length; i++) {
        objects[i].draw();
    }
}

function keyPressed() {
    /*
        keys:
            LeftCtrl = 17   - Fire1
            Z: 90           - Fire2
            LeftArrow: 37   - Slow
            RightArrow: 39  - Accelerate
            Spacebar: 32    - Jump
            S: 83           - Shield
            M: 77           - Toggle music
    */

    switch (keyCode) {
        case KEY_ENTER:
            //  continue / start / next level, etc.
            break;
        case KEY_ESC:
            //  restart, back, etc.
            break;
        case KEY_SLOWDOWN:
            buggy.decelerate(true);
            break;
        case KEY_SPEEDUP:
            buggy.accelerate(true);
            break;
        case KEY_JUMP:
            buggy.jump();
            break;
        case KEY_FIRE1:
            buggy.fireTurrets();
            break;
        case KEY_FIRE2:
            buggy.fireMissile();
            break;
        case KEY_SHIELD:
            buggy.activateShield();
            break;
        case KEY_MUSIC:    //  turn music playback on or off
            sfx.toggleSound();
            levels[activeLevel].toggleMusic();
            break;
        case 88:    //  TODO: Temporary for testing
            buggy.destroy();
            break;
        default:
            console.log(`key press not handled: [${key}]: [${keyCode}]`);
            break;
    }
}

function keyReleased() {
    switch (keyCode) {
        case KEY_SLOWDOWN:
            buggy.decelerate(false);
            break;
        case KEY_SPEEDUP:
            buggy.accelerate(false);
            break;
        default:
            console.log(`key up not handled: [${key}]: [${keyCode}]`);
            break;
    }
}