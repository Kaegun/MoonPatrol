const PICKUP_LIFE = 0;
const PICKUP_MISSILES = 1;
const PICKUP_SHIELD = 2;
const PICKUP_MULTISHOT = 3;
const PICKUP_GEM = 4;
const PICKUP_JUMPJETS = 5;

class Pickup {
    constructor() {
        this.position;
        this.pickupType;
        this.sfx;
        this.scrollPos = 0;

        this.initialize = function (x, y, type, sfx) {
            this.position = createVector(x, y);
            this.pickupType = type;
            this.sfx = sfx;
        };

        this.update = function (scrollPos) {
            this.scrollPos = -scrollPos;
        };

        this.collision = function (vector) {
            return this.position.dist(vector) < 80;
        };

        this.playCollectedSound = function () {
            this.sfx.playSound("extraLifePickup");
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
                case PICKUP_JUMPJETS:
                    this.drawJumpJets();
                    break;
                default:
                    console.log(`Invalid pickup type: {${this.pickupType}}`);
                    break;
            }

            pop();
        };

        this.getValue = function () {
            switch (this.pickupType) {
                case PICKUP_GEM:
                    return 1000;
                case PICKUP_LIFE:
                    return 1;
                case PICKUP_MISSILES:
                    return 10;
                case PICKUP_MULTISHOT:
                    return 250;
                case PICKUP_SHIELD:
                    return 500;
                case PICKUP_JUMPJETS:
                    return 250;
                default:
                    console.log(`Invalid pickup type: {${this.pickupType}}`);
                    return 0;
            }
        }

        this.drawGem = function () {
            stroke(255);
            fill(0, 255, 255, 150);

            var scale = 1.5, facetWidth = 8, facetHeight = 5;

            triangle(this.position.x, this.position.y,
                this.position.x - facetWidth * scale, this.position.y - (20 + facetHeight) * scale,
                this.position.x + facetWidth * scale, this.position.y - (20 + facetHeight) * scale);
            triangle(this.position.x, this.position.y,
                this.position.x - facetWidth * scale, this.position.y - (20 + facetHeight) * scale,
                this.position.x - facetWidth * 2 * scale, this.position.y - (20 + facetHeight * 2) * scale);
            triangle(this.position.x, this.position.y,
                this.position.x + facetWidth * scale, this.position.y - (20 + facetHeight) * scale,
                this.position.x + facetWidth * 2 * scale, this.position.y - (20 + facetHeight * 2) * scale);
            triangle(this.position.x - facetWidth * 2 * scale, this.position.y - (20 + facetHeight * 2) * scale,
                this.position.x, this.position.y - (20 + facetHeight * 3) * scale,
                this.position.x - facetWidth * scale, this.position.y - (20 + facetHeight) * scale);
            triangle(this.position.x - facetWidth * scale, this.position.y - (20 + facetHeight) * scale,
                this.position.x, this.position.y - (20 + facetHeight * 3) * scale,
                this.position.x + facetWidth * scale, this.position.y - (20 + facetHeight) * scale);
            triangle(this.position.x + facetWidth * scale, this.position.y - (20 + facetHeight) * scale,
                this.position.x, this.position.y - (20 + facetHeight * 3) * scale,
                this.position.x + facetWidth * 2 * scale, this.position.y - (20 + facetHeight * 2) * scale);
        };

        this.drawXtraLife = function () {
            stroke(150, 45, 45);
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

        this.drawMissile = function () {
            stroke(50, 50, 190);
            strokeWeight(1);
            fill(175, 175, 175);

            beginShape();

            vertex(this.position.x + 10, this.position.y - 15);
            vertex(this.position.x + 15, this.position.y - 15);
            vertex(this.position.x + 15, this.position.y - 10);
            vertex(this.position.x - 10, this.position.y + 15);
            vertex(this.position.x - 10, this.position.y + 20);
            vertex(this.position.x - 20, this.position.y + 30);
            vertex(this.position.x - 30, this.position.y + 15);
            vertex(this.position.x - 20, this.position.y + 10);
            vertex(this.position.x - 15, this.position.y + 10);
            vertex(this.position.x + 10, this.position.y - 15);

            endShape();
        };

        this.drawMultishot = function () {
            stroke(255, 215, 0);
            strokeWeight(1);
            fill(255, 165, 0);

            rect(this.position.x - 4, this.position.y, 8, 20);
            quad(this.position.x - 15, this.position.y - 5,
                this.position.x - 30, this.position.y - 25,
                this.position.x - 20, this.position.y - 25,
                this.position.x - 5, this.position.y - 5);
            quad(this.position.x + 15, this.position.y - 5,
                this.position.x + 30, this.position.y - 25,
                this.position.x + 20, this.position.y - 25,
                this.position.x + 5, this.position.y - 5);
        };

        this.drawShield = function () {
            var diameter = 50;
            stroke(255, 255, 0);
            fill(192, 192, 192, 60);
            ellipse(this.position.x, this.position.y, diameter);

            var smaller = diameter * 2 / 3;
            fill(230, 230, 250, 70);
            ellipse(this.position.x, this.position.y, smaller);

            var smallest = smaller * 2 / 3;
            fill(240, 248, 255, 80);
            ellipse(this.position.x, this.position.y, smallest);
        };

        this.drawJumpJets = function () {
            stroke(215, 90, 90);
            strokeWeight(3);
            fill(74, 74, 74);

            beginShape();

            vertex(this.position.x - 5, this.position.y + 20);
            vertex(this.position.x + 5, this.position.y + 20);
            vertex(this.position.x + 5, this.position.y);
            vertex(this.position.x + 20, this.position.y);
            vertex(this.position.x, this.position.y - 15);
            vertex(this.position.x - 20, this.position.y);
            vertex(this.position.x - 5, this.position.y);
            vertex(this.position.x - 5, this.position.y + 20);

            endShape();
        };
    }
}