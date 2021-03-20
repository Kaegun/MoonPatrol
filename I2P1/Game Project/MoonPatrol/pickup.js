const PICKUP_LIFE = 0;
const PICKUP_MISSILES = 1;
const PICKUP_SHIELD = 2;
const PICKUP_MULTISHOT = 3;
const PICKUP_GEM = 4;

class Pickup {
    constructor() {
        this.position;
        this.pickupType;
        this.scrollPos = 0;

        this.initialize = function (x, y, type) {
            this.position = createVector(x, y);
            this.pickupType = type;
        };

        this.update = function (scrollPos) {
            this.scrollPos = -scrollPos;
        };

        this.collision = function (x, y) {
            return dist(this.position.x, this.position.y, x, y) < 40;
        };

        this.draw = function () {
            push();

            translate(this.scrollPos, 0);
            switch (this.pickupType) {
                case PICKUP_GEM:
                    this.drawGem();
                    break;
                case PICKUP_LIFE:
                    this.drawXtraLife();
                    break;
                case PICKUP_MISSILES:
                    this.drawMissile();
                    break;
                case PICKUP_MULTISHOT:
                    this.drawMultishot();
                    break;
                case PICKUP_SHIELD:
                    this.drawShield();
                    break;
                default:
                    console.log(`Invalid pickup type: {${this.pickupType}}`);
                    break;
            }

            pop();
        };

        this.drawGem = function () { };

        this.drawXtraLife = function () {
            stroke(150, 45, 45);   //  Dark Red?
            strokeWeight(1);
            fill(255, 0, 0);

            beginShape();

            vertex(this.position.x, this.position.y);
            vertex(this.position.x + 10, this.position.y - 10);
            vertex(this.position.x + 20, this.position.y - 10);
            vertex(this.position.x + 30, this.position.y);
            vertex(this.position.x + 30, this.position.y + 5);
            vertex(this.position.x, this.position.y + 25);
            vertex(this.position.x - 30, this.position.y + 5);
            vertex(this.position.x - 30, this.position.y);
            vertex(this.position.x - 20, this.position.y - 10);
            vertex(this.position.x - 10, this.position.y - 10);
            vertex(this.position.x, this.position.y);

            endShape();
        };

        this.drawMissile = function () { };

        this.drawMultishot = function () { };

        this.drawShield = function () { };
    }
}