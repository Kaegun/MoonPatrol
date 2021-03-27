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
const KEY_HELP = 112;

//  Game state constants
const GAME_STATE_MENU = 0;
const GAME_STATE_PLAYING = 1;
const GAME_STATE_DEAD = 2;
const GAME_STATE_GAME_OVER = 3;
const GAME_STATE_WON = 4;
const GAME_STATE_PAUSED = 5;

//  Sound Constants
const SFX_SOUND_PICKUP_DROPPED = "pickupDropped";
const SFX_MENU_BG = "menubgmusic";
const SFX_PLAYER_DEAD_BG = "defeatmusic";
const SFX_PLAYER_WON_BG = "victorymusic";

//  Game State
var activeLevel = 0;
var numLevels = 0;
var scrollPos = 0;
var levels = [];
var pickups = [];
var sfx;

var gameState = GAME_STATE_MENU;
var showHelp = false;
var toggleMenuMusic = false;
var defeatMusicPlayed = false;

//  Start screen elements
this.starField;

//  player
var buggy;
var hud;
var score = 0;

function preload() {
    //  Loading Sound Effects and Music
    sfx = new Sfx();
    sfx.initialize(preLoadCallback);

    //  Loading Hud and Fonts
    hud = new Hud();
    hud.initialize(preLoadCallback);
}

//  Display files as they complete loading
function preLoadCallback(obj) {
    var div = document.getElementById('files');
    var label = obj.url != undefined ? `${obj.url}` : obj.font != undefined ? 'font' : 'unknown preload item';
    var text = document.createTextNode(`loaded: ${label}`);
    div.appendChild(text);
    var br = document.createElement("br");
    div.appendChild(br);
}

function setup() {
    createCanvas(windowWidth, max(800, windowHeight - 3));
    frameRate(30);  // Set the Framerate to 30 to slow it down on fast PCs

    numLevels = Level.createLevels(levels, sfx, pickups);

    this.starField = new StarField();
    this.starField.initialize(height);

    //  Move this to an initialize level method
    buggy = new Buggy();
    buggy.initialize(levels[activeLevel].startX, levels[activeLevel].floorPosY, sfx);
}

function restartLevel() {

    //  Reset state variables
    scrollPos = 0;

    //  clear arrays
    clearArray(pickups);

    //  Reset the player
    buggy.reset(levels[activeLevel].startX, levels[activeLevel].floorPosY);

    //  Restart the level
    levels[activeLevel].restart();

    //  set state to playing
    gameState = GAME_STATE_PLAYING;
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
        case GAME_STATE_GAME_OVER:
            drawGameOver();
            break;
        case GAME_STATE_WON:
            drawWon();
            break;
        case GAME_STATE_PAUSED:
            drawPaused();
            break;
    }
}

function drawMenu() {
    //  Play some music
    if (!toggleMenuMusic && !sfx.isSoundPlaying(SFX_MENU_BG)) {
        sfx.playSound(SFX_MENU_BG, true);
    } else if (toggleMenuMusic && sfx.isSoundPlaying(SFX_MENU_BG)) {
        sfx.stopSound(SFX_MENU_BG);
    }

    background(0); // fill the background

    //  Draw some stars
    this.starField.draw();

    stroke(128);
    strokeWeight(4);
    fill(255);
    textFont(hud.font); //  breaking some encapsulation rules
    var textY = (height - 120) / 2;
    drawTextCentered('MOON PATROL', textY, 120);
    textY += 150;
    drawTextCentered("Press 'ENTER' to Start", textY, 36);
    textY += 66;
    drawTextCentered("Press 'F1' anytime to show the keys", textY, 36);

    drawHelp();
}

function drawTextCentered(label, y, size) {
    textSize(size); //  set the size to ensure width is calculated corectly
    drawText(label, (width - textWidth(label)) / 2, y, size);
}

function drawText(label, x, y, size) {
    textSize(size);
    text(label, x, y);
}

function drawHelp() {

    //  Return here, rather than checking the flag everywhere else
    if (!showHelp)
        return;
    //  Draw a rectangle background overlay
    stroke(0, 0, 200, 140);
    fill(200, 0, 0, 175);
    var rectSide = 600;
    var rectX = width / 2 - rectSide / 2;
    var rectY = height / 2 - rectSide / 2;
    rect(rectX, rectY, rectSide, rectSide);

    //  Key help
    fill(255);
    stroke(128);
    strokeWeight(2);
    textFont(hud.font); //  breaking some encapsulation rules
    var textY = rectY + 50;
    drawTextCentered("Help", textY, 48);

    //  Could possibly put this in an array
    var textX = rectX + 25;
    textY += 68;
    drawText("[F1]:\tDisplay this Menu", textX, textY, 36);
    textY += 51;
    drawText("[Left Arrow]:\tSlow Down", textX, textY, 36);
    textY += 51;
    drawText("[Right Arrow]:\tAccelerate", textX, textY, 36);
    textY += 51;
    drawText("[Spacebar]:\tJump", textX, textY, 36);
    textY += 51;
    drawText("[Left Ctrl]:\tFire1", textX, textY, 36);
    textY += 51;
    drawText("[Z]:\tFire2", textX, textY, 36);
    textY += 51;
    drawText("[S]:\tShield", textX, textY, 36);
    textY += 51;
    drawText("[M]:\tToggle music", textX, textY, 36);
    textY += 51;
    drawText("[ENTER]:\tAccept", textX, textY, 36);
    textY += 51;
    drawText("[ESC]:\tCancel", textX, textY, 36);
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

function drawDead() {

    fill(255, 0, 0);
    stroke(128, 128, 128);
    strokeWeight(4);

    var startY = (height - 96) / 2;
    drawTextCentered("YOU HAVE DIED", startY, 96);
    startY += 116;
    strokeWeight(2);
    drawTextCentered("Press 'Enter' or 'ESC' to restart the Level", startY, 36);
}

function drawGameOver() {

    fill(255, 0, 0);
    stroke(128, 128, 128);
    strokeWeight(4);

    var startY = (height - 96) / 2;
    drawTextCentered("GAME OVER", startY, 96);
    startY += 116;
    strokeWeight(2);
    drawTextCentered("Press 'Enter' or 'ESC' to restart the Game", startY, 36);

}

function drawWon() { }

function drawPaused() { }

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

    if (!buggy.jumping) {
        for (var i = 0; i < levels[activeLevel].craters.length; i++) {
            var crater = levels[activeLevel].craters[i];
            if (crater.collision(buggy.worldPosition)) {
                buggy.setPlummeting(true);
            }
        }
    }
}

function checkEnemyCollision(enemy, projectiles) {
    for (var i = projectiles.length - 1; i >= 0; i--) {
        if (Collidable.collision(enemy, projectiles[i].position)) {
            projectiles.splice(i, 1);
            enemy.destroy();
            score += enemy.scoreValue;
            if (enemy.dropsPickup) {
                //  Assume the pickup dropped is random
                var pu = Pickup.createRandomPickup(enemy.dropChance,
                    enemy.position.x + scrollPos,
                    enemy.position.y,
                    enemy.speed,
                    levels[activeLevel].floorPosY);
                if (pu) {
                    sfx.playSound(SFX_SOUND_PICKUP_DROPPED);
                    pickups.push(pu);
                }
            }
            return;
        }
    }

    //  bullets in screen coordinates?
    if (enemy.collision && enemy.collision(buggy.position)) {
        buggy.destroy();
        return;
    }
}

function update() {

    //  call update on all objects to update positions
    buggy.update(scrollPos);

    hud.update(score, buggy.lives,
        buggy.getMissileCount(),
        buggy.getShieldTimer(),
        buggy.getMultishotTimer(),
        buggy.getJumpJetTimer());

    //  Only scroll the screen when the buggy is alive
    if (buggy.alive()) {
        scrollPos += this.buggy.speed;
        updateObjects(pickups);
        levels[activeLevel].update(scrollPos);
    }
    else {
        gameState = buggy.lives == 0 ? GAME_STATE_GAME_OVER : GAME_STATE_DEAD;
        levels[activeLevel].stopAllSound();
        if (!sfx.isSoundPlaying(SFX_PLAYER_DEAD_BG)) {
            if (!defeatMusicPlayed) {
                sfx.playSound(SFX_PLAYER_DEAD_BG);
                defeatMusicPlayed = true;
            }
            else if (!sfx.isSoundPlaying(SFX_MENU_BG)) {
                sfx.playSound(SFX_MENU_BG);
            }
        }
    }
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
        case GAME_STATE_GAME_OVER:
            keyPressedGameOver();
            break;
        case GAME_STATE_WON:
            keyPressedWon();
            break;
        case GAME_STATE_PAUSED:
            keyPressedPaused();
            break;
    }
}

function keyPressedMenu() {
    switch (keyCode) {
        case KEY_ENTER:
            //  continue / start / next level, etc.
            if (showHelp)
                showHelp = false;
            else {
                gameState = GAME_STATE_PLAYING;
                sfx.stopSound(SFX_MENU_BG);
                levels[activeLevel].start();
            }
            break;
        case KEY_ESC:
            //  restart, back, etc.
            if (showHelp)
                showHelp = false;
            break;
        case KEY_HELP:
            showHelp = !showHelp;
            break;
        case KEY_MUSIC:
            toggleMenuMusic = !toggleMenuMusic;
            break;
    }
}

function keyPressedPlaying() {

    switch (keyCode) {
        case KEY_ENTER:
            //  continue / start / next level, etc.
            if (showHelp)
                showhelp = false;
            break;
        case KEY_ESC:
            //  restart, back, etc.
            if (showHelp)
                showhelp = false;
            else
                gameState = GAME_STATE_PAUSED;
            break;
        case KEY_HELP:
            showHelp = true;
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

function keyPressedDead() {
    switch (keyCode) {
        case KEY_ESC:
        case KEY_ENTER:
            //  Restart the level
            restartLevel();
            break;
        default:
            console.log(`key up not handled: [${key}]: [${keyCode}]`);
            break;
    }
}

function keyPressedGameOver() {
    switch (keyCode) {
        case KEY_ESC:
        case KEY_ENTER:
            //  Restart the level
            startLevel();
            break;
        default:
            console.log(`key up not handled: [${key}]: [${keyCode}]`);
            break;
    }
}

function keyPressedWon() {
    switch (keyCode) {
        case KEY_ESC:
        case KEY_ENTER:
            //  Restart the level
            startLevel();
            break;
        default:
            console.log(`key up not handled: [${key}]: [${keyCode}]`);
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

function clearArray(array) {
    if (array && array.length && array.length > 0)
        array.splice(0, array.length);
}