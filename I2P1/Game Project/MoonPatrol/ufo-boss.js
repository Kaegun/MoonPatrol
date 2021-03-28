const ufoBossPoints = [
    { x: -20, y: -60 },
    { x: 20, y: -60 },
    { x: 50, y: -120 },
    { x: 110, y: -120 },
    { x: 140, y: -60 },
    { x: 230, y: -30 },
    { x: 230, y: 0 },
    { x: 170, y: 30 },
    { x: 110, y: 90 },
    { x: -110, y: 90 },
    { x: -170, y: 30 },
    { x: -230, y: 0 },
    { x: -230, y: -30 },
    { x: -140, y: -60 },
    { x: -110, y: -120 },
    { x: -50, y: -120 },
    { x: -20, y: -60 },
];

const UFO_BOSS_FWD_SPEED = 4;
const UFO_BOSS_CLIMB_SPEED = 5;
const UFO_BOSS_FIRE_RATE = 45;
const UFO_BOSS_DAMAGE = 10;
const UFO_BOSS_ROTATE_LIMITS = 0.2;
const UFO_BOSS_CLIMB_LIMITS = 150;

const UFO_BOSS_SFX_FLYBY = "ufoBossFlyBy";
const UFO_BOSS_SFX_EXPLODE = "largeExplosion";

//  The boss's flight path must bring it in from the right
class UfoBoss {
    constructor() {
        this.collidable = true;
        this.scoreValue = 1000;
        this.collisionRadius = 220;
        this.visibleRadius = 500;
        this.dropsPickup = true;
        this.dropChance = 100;
        this.health = 10;
        this.state = COLLIDABLE_STATE_ALIVE;

        this.position;
        this.velocity;
        this.rotation;
        this.direction;
        this.maxY;
        this.minY;

        this.sfx;
        this.floorPosY;
        this.speed;
        this.bullets = [];
        this.explosion;
        this.initialize = function (x, y, sfx, speedFactor, floorPosY) {
            this.position = createVector(x, y);
            this.velocity = createVector(0, 0);
            this.floorPosY = floorPosY;
            this.speed = speedFactor;
            this.sfx = sfx;

            //this.sfx.playSound(UFO_BOSS_SFX_FLYBY, true);
        };

        this.update = function () {

            this.velocity = createVector(UFO_BOSS_FWD_SPEED, 0);    //UFO_BOMBER_CLIMB_SPEED * this.direction
            this.position.add(this.velocity);
        };

        this.draw = function () {
            push();
            //  Force it on screen for now
            translate(this.position.x, this.position.y);

            fill(72, 61, 139);
            stroke(199, 21, 133);
            strokeWeight(5);

            drawVertexShape(ufoBossPoints);

            fill(255, 215, 0);
            stroke(255, 140, 0);
            strokeWeight(2);
            var rowX = -200, rowY = -15;
            for (var i = 0; i < 11; i++) {
                ellipse(rowX, rowY, 20, 20);
                rowX += 40;
            }

            fill(47, 79, 79);
            stroke(135, 206, 250);
            strokeWeight(1);
            rowX = -118;
            rowY = 50;
            for (var i = 0; i < 9; i++) {
                quad(rowX - 7, rowY - 7, rowX + 7, rowY - 7,
                    rowX + 5, rowY + 7, rowX - 5, rowY + 7);
                rowX += 30;
            }

            fill(0, 139, 139);
            stroke(135, 206, 250);
            strokeWeight(2);
            rowX = -75;
            rowY = -90;
            for (var i = 0; i < 2; i++) {
                quad(rowX - 15, rowY - 20, rowX + 15, rowY - 20,
                    rowX + 25, rowY + 20, rowX - 25, rowY + 20);
                rowX += 150;
            }

            pop();
        };

        this.collision = function (collider, collisionRadius) {
            return testBulletsCollision(this.bullets, collider, collisionRadius);
        };

        this.destroy = function () {
            if (--this.health > 0)  //  bomber takes a few hits to destroy.
                return;

            if (this.state == COLLIDABLE_STATE_ALIVE) {
                this.explosion = new Explosion();
                this.explosion.initialize(this.position.x, this.position.y, 1000, 800);
                this.sfx.stopSound(UFO_BOSS_SFX_FLYBY);
                this.sfx.playSound(UFO_BOSS_SFX_EXPLODE);
                this.state = COLLIDABLE_STATE_DYING;
            }
        };

        this.stopAllSound = function () {
            if (this.sfx.isSoundPlaying(UFO_BOSS_SFX_FLYBY))
                this.sfx.stopSound(UFO_BOSS_SFX_FLYBY);
        };

        this.getDamage = function () {
            return UFO_BOSS_DAMAGE;
        };
    }
}