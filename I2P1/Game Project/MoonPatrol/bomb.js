const BOMB_TYPE_SMALL = 0;
const BOMB_TYPE_MEDIUM = 1;
const BOMB_TYPE_LARGE = 2;

const bombParameters = [
    { type: BOMB_TYPE_SMALL, radius: 15, shootSfx: "shotSmallBomb", impactSfx: ["smallImpact",], },
    { type: BOMB_TYPE_MEDIUM, radius: 30, shootSfx: "shotMediumBomb", impactSfx: ["mediumImpact", "mediumDebris",], },
    { type: BOMB_TYPE_LARGE, radius: 60, shootSfx: "shotLargeBomb", impactSfx: ["largeImpact",], },
];

class Bomb {
    static createSmallBomb(x, y, speed, floorPosY, sfx) {
        return Bomb.createBomb(BOMB_TYPE_SMALL, x, y, speed, floorPosY, sfx)
    }

    static createMediumBomb(x, y, speed, floorPosY, sfx) {
        return Bomb.createBomb(BOMB_TYPE_MEDIUM, x, y, speed, floorPosY, sfx)
    }

    static createLargeBomb(x, y, speed, floorPosY, sfx) {
        return Bomb.createBomb(BOMB_TYPE_LARGE, x, y, speed, floorPosY, sfx)
    }

    static createBomb(type, x, y, speed, floorPosY, sfx) {
        var b = new Bomb();
        b.initialize(type, x, y, speed, floorPosY, sfx);
        return b;
    }

    constructor() {
        this.bombType;
        this.position;
        this.sfx;
        this.speed;
        this.startY;
        this.floorPosY;
        this.flashing = false;

        this.initialize = function (type, x, y, speed, floorPosY, sfx) {
            this.bombType = type;
            this.position = createVector(x, y);
            this.startY = y;
            this.sfx = sfx;
            this.speed = speed;
            this.floorPosY = floorPosY;

            //  play shooting sound for bomb
            this.sfx.playSound(bombParameters[this.bombType].shootSfx);
        };

        this.update = function (scrollPos) {
            //  move the bomb downwards
            //  lerp the forward speed to the height off the ground
            var xSpeed = lerp(0, this.speed, (abs(this.floorPosY - this.position.y) / this.startY));
            var velocity = createVector(xSpeed, 10);
            this.position.add(velocity);
            this.flashing = frameCount % 20 == 0 ? !this.flashing : this.flashing;
        };

        this.draw = function () {
            noStroke();
            fill(0, 255, 0);
            ellipse(this.position.x, this.position.y, bombParameters[this.bombType].radius, bombParameters[this.bombType].radius);
            if (this.flashing)
                fill(255, 0, 0);
            else
                fill(0, 0, 255);
            ellipse(this.position.x, this.position.y, bombParameters[this.bombType].radius / 3, bombParameters[this.bombType].radius / 3);
        };

        this.hitGround = function () {
            if (this.position.y >= this.floorPosY) {
                for (var i = 0; i < bombParameters[this.bombType].impactSfx.length; i++)
                    this.sfx.playSound(bombParameters[this.bombType].impactSfx[i]);
                return true;
            }
            return false;
        }
    }
}