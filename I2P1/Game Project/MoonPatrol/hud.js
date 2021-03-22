class Hud {
    constructor() {
        const HUD_ACTIVE_COLOR = color(50, 255, 50);
        const HUD_WARNING_COLOR = color(200, 200, 50);
        const HUD_ERROR_COLOR = color(255, 50, 50);

        const HUD_EXTRA_RECT_WIDTH = 200;

        this.font;

        this.score = 0;
        this.lives = 0;
        this.missileCounter = 0;
        this.shieldTimer = 0;
        this.multishotTimer = 0;
        this.jumpJetTimer = 0;
        this.shieldAvailable = false;
        this.jumpJetsAvailable = false;
        this.multishotAvailable = false;
        this.extraBoxStartPos = 0;

        //  This must be called in preload
        this.initialize = function () {
            this.font = loadFont('/assets/fonts/moonhouse/Moonhouse-yE5M.ttf');
        };

        this.update = function (score, lives, missileCounter, shieldTimer, multishotTimer, jumpJetTimer) {
            this.score = score;
            this.lives = lives;
            this.missileCounter = missileCounter;
            this.shielTimer = shieldTimer;
            this.multishotTimer = multishotTimer;
            this.jumpJetTimer = jumpJetTimer;
            this.multishotAvailable = multishotTimer > 0;
            this.shieldAvailable = shieldTimer > 0;
            this.jumpJetsAvailable = jumpJetTimer > 0;
        };

        this.draw = function () {
            textSize(36);
            stroke(128);
            textFont(this.font);

            this.extraBoxStartPos = 500;
            this.drawLives();
            this.drawScore();
            this.drawExtras();
        };

        this.drawScore = function () {
            fill(255);
            strokeWeight(1);
            text(`SCORE: ${this.score}`, 50, 100);
        };

        this.drawLives = function () {
            fill(255);
            strokeWeight(1);
            text(`LIVES: ${this.lives}`, 50, 50);
        };

        this.drawExtras = function () {
            this.extraBoxStartPos = width - 4 * (HUD_EXTRA_RECT_WIDTH + 25);
            this.drawMissiles(this.extraBoxStartPos, 25);
            this.extraBoxStartPos += HUD_EXTRA_RECT_WIDTH + 25;
            this.drawShield(this.extraBoxStartPos, 25);
            this.extraBoxStartPos += HUD_EXTRA_RECT_WIDTH + 25;
            this.drawMultishot(this.extraBoxStartPos, 25);
            this.extraBoxStartPos += HUD_EXTRA_RECT_WIDTH + 25;
            this.drawJumpJets(this.extraBoxStartPos, 25);
        };

        //  Filled / not filled box, with value or color to indicate stuff
        this.drawExtraBox = function (x, y, label, bgColor) {
            textSize(24);
            stroke(128);
            strokeWeight(4);
            if (!bgColor)
                noFill();
            else
                fill(bgColor);

            rect(x, y, HUD_EXTRA_RECT_WIDTH, 35);
            fill(255);
            strokeWeight(1);
            text(`${label}`, x + (HUD_EXTRA_RECT_WIDTH - textWidth(label)) / 2, y + 25);
        };

        this.drawMissiles = function (x, y) {
            this.drawExtraBox(x, y, 'MISSILES', HUD_ACTIVE_COLOR);
            this.drawExtraBox(x, y + 45, `${this.missileCounter}`);
        };

        this.drawShield = function (x, y) {
            this.drawExtraBox(x, y, 'SHIELD', HUD_WARNING_COLOR);
            this.drawExtraBox(x, y + 45, `${this.shieldTimer}`);
        };

        this.drawMultishot = function (x, y) {
            this.drawExtraBox(x, y, 'MULTISHOT', HUD_ERROR_COLOR);
            this.drawExtraBox(x, y + 45, `${this.multishotTimer}`);
        };

        this.drawJumpJets = function (x, y) {
            this.drawExtraBox(x, y, 'JUMPJETS');
            this.drawExtraBox(x, y + 45, `${this.jumpJetTimer}`);
        };
    }
}