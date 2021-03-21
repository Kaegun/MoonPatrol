class Hud {
    constructor() {
        this.score = 0;
        this.initialize = function () { };

        this.update = function (score) {
            this.score = score;
        };

        this.draw = function () { };

        this.drawScore = function () {
            //  FONTS?
            textSize(50);
            fill(255);
            text(`SCORE: ${this.score}`, 50, 75);
        };
    }
}