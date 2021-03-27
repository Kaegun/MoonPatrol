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
const KEY_ESC = 27;
//  Game state constants
const GAME_STATE_MENU = 0;
const GAME_STATE_PLAYING = 1;
const GAME_STATE_DEAD = 2;
const GAME_STATE_WON = 3;
const GAME_STATE_PAUSED = 4;
//  Sound Constants
const SFX_MENU_BG = "menubgmusic";

var activeLevel = 0;
var numLevels = 0;
var scrollPos = 0;
var levels = [];
var pickups = [];
var sfx;

var gameState = GAME_STATE_MENU;

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
    createCanvas(windowWidth, max(800, windowHeight - 3));

    numLevels = createLevels(levels, sfx);

    //  Move this to an initialize level method
    buggy = new Buggy();
    buggy.initialize(levels[activeLevel].startX, levels[activeLevel].floorPosY, sfx);

    var puStartX = 1000;
    for (var pp = 0; pp <= PICKUP_JUMPJETS; pp++) {
        var pu = new Pickup();
        pu.initialize(puStartX, levels[activeLevel].floorPosY - 35, pp, sfx);
        pickups.push(pu);
        puStartX += 200;
    }
}

function draw() {

    switch (gameState) {
        case GAME_STATE_MENU:
            drawMenu();
            break;
        case GAME_STATE_PLAYING:
            drawPlaying();
            break;
        case GAME_STATE_DEAD:
            drawDead();
            break;
        case GAME_STATE_WON:
            drawWon();
            break;
    }
}

function drawMenu() {
    //  TODO: Move this to the Menu class (if it makes sense)
    background(0); // fill the background

    //  Draw some stars

    //  Play some music
    if (!sfx.isSoundPlaying(SFX_MENU_BG)) {
        sfx.playSound(SFX_MENU_BG);
    }

    var textY = (height - 120) / 2;
    textSize(120);
    stroke(128);
    strokeWeight(4);

    fill(255);
    var label = 'MOON PATROL';
    textFont(hud.font); //  breaking some encapsulation rules
    text(`${label}`, (width - textWidth(label)) / 2, textY);
    label = "Press 'ENTER' to Start";
    textY += 150;
    textSize(36);
    text(`${label}`, (width - textWidth(label)) / 2, textY);
    label = "Press 'F1' anytime to show the keys";
    textY += 66;
    textSize(36);
    text(`${label}`, (width - textWidth(label)) / 2, textY);
}

function drawPlaying() {

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

function drawDead() { }

function drawWon() { }

function checkCollisions() {
    for (var i = 0; i < levels[activeLevel].enemies.length; i++) {
        checkEnemyCollision(levels[activeLevel].enemies[i], buggy.bulletsUp);
    }

    for (var i = pickups.length - 1; i >= 0; i--) {
        if (pickups[i].collision(buggy.worldPosition)) {
            pickups[i].playCollectedSound();
            if (pickups[i].pickupType == PICKUP_GEM)
                score += pickups[i].getValue();
            else
                buggy.setPowerUp(pickups[i]);
            pickups.splice(i, 1);
        }
    }
}

function checkEnemyCollision(enemy, projectiles) {
    for (var i = projectiles.length - 1; i >= 0; i--) {
        if (Collidable.collision(enemy, projectiles[i].position)) {
            enemy.destroy();
            score += enemy.scoreValue;
            projectiles.splice(i, 1);
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

    hud.update(score, buggy.lives,
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

/*
    keys:
        LeftCtrl = 17   - Fire1
        Z: 90           - Fire2
        LeftArrow: 37   - Slow
        RightArrow: 39  - Accelerate
        Spacebar: 32    - Jump
        S: 83           - Shield
        M: 77           - Toggle music
        ENTER:          - Accept
        ESC:            - Cancel
        F1:             - Show keys
*/

function keyPressed() {

    switch (gameState) {
        case GAME_STATE_MENU:
            keyPressedMenu();
            break;
        case GAME_STATE_PLAYING:
            keyPressedPlaying();
            break;
        case GAME_STATE_DEAD:
            keyPressedDead();
            break;
        case GAME_STATE_WON:
            keyPressedWon();
            break;
    }
}

function keyPressedMenu() {
    switch (keyCode) {
        case KEY_ENTER:
            //  continue / start / next level, etc.
            gameState = GAME_STATE_PLAYING;
            sfx.stopSound(SFX_MENU_BG);
            levels[activeLevel].start();
            break;
        case KEY_ESC:
            //  restart, back, etc.
            break;
    }
}

function keyPressedPlaying() {

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