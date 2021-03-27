//  Pickup Types
const PICKUP_LIFE = 0;
const PICKUP_MISSILES = 1;
const PICKUP_SHIELD = 2;
const PICKUP_MULTISHOT = 3;
const PICKUP_GEM = 4;
const PICKUP_JUMPJETS = 5;

const PICKUP_MAX = PICKUP_JUMPJETS;

const PICKUP_FALL_SPEED = 5;

const pickupParameters = [
    { type: PICKUP_LIFE, dropChance: 10, collisionRadius: 80, yOffset: -35, },
    { type: PICKUP_MISSILES, dropChance: 10, collisionRadius: 80, yOffset: -35, },
    { type: PICKUP_SHIELD, dropChance: 20, collisionRadius: 80, yOffset: -35, },
    { type: PICKUP_MULTISHOT, dropChance: 50, collisionRadius: 80, yOffset: -35, },
    { type: PICKUP_GEM, dropChance: 5, collisionRadius: 80, yOffset: -35, },
    { type: PICKUP_JUMPJETS, dropChance: 10, collisionRadius: 80, yOffset: -35, },
];

class Pickup {

    static createRandomPickup(dropChance, x, y, speed, floorPosY) {
        //  randomly determine whether a pikup spawns
        if (random(1, dropChance) <= dropChance) {
            while (true) {
                var puType = round(random(0, PICKUP_MAX));
                if (random(1, pickupParameters[puType].dropChance) <= pickupParameters[puType].dropChance) {
                    var pu = new Pickup();
                    pu.initialize(puType, sfx, x, y + pickupParameters[puType].yOffset, speed, floorPosY);
                    return pu;
                }
            }
        }
    }

    static createPickup(type, x, y, speed, floorPosY) {
        var pu = new Pickup();
        pu.initialize(type, sfx, x, y + pickupParameters[type].yOffset, speed, floorPosY);
        return pu;
    }

    constructor() {
        this.position;
        this.startY;
        this.speed;
        this.floorPosY;
        this.pickupType;
        this.sfx;
        this.scrollPos = 0;

        this.initialize = function (type, sfx, x, y, speed, floorPosY) {
            this.position = createVector(x, y);
            this.startY = y;
            this.floorPosY = floorPosY;
            this.speed = speed;
            this.pickupType = type;
            this.sfx = sfx;
        };

        this.update = function (scrollPos) {
            this.scrollPos = -scrollPos;

            //  If pickup is a drop, it needs to fall
            if (this.position.y >= this.floorPosY + pickupParameters[this.pickupType].yOffset)
                this.position.y = this.floorPosY + pickupParameters[this.pickupType].yOffset;
            else {
                //  lerp the forward speed to the height off the ground
                var xSpeed = lerp(0, this.speed, (abs(this.floorPosY - this.position.y) / this.startY));
                var velocity = createVector(xSpeed, 5);
                this.position.add(velocity);
            }
        };

        this.collision = function (vector) {
            return this.position.dist(vector) < pickupParameters[this.pickupType].collisionRadius;
        };

        this.playCollectedSound = function () {
            this.sfx.playSound("PickupCollected");
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
                    return 200;
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