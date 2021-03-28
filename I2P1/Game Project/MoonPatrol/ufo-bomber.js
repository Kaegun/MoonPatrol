const bomberPoints = [
    { x: -10, y: -20 },
    { x: -10, y: 0 },
    { x: -50, y: 40 },
    { x: -50, y: 60 },
    { x: -30, y: 60 },
    { x: -30, y: 40 },
    { x: -10, y: 20 },
    { x: -10, y: 60 },
    { x: 10, y: 60 },
    { x: 10, y: 20 },
    { x: 30, y: 40 },
    { x: 30, y: 60 },
    { x: 50, y: 60 },
    { x: 50, y: 40 },
    { x: 10, y: 0 },
    { x: 10, y: -20 },
    { x: -10, y: -20 },
];

const UFO_BOMBER_FWD_SPEED = 5;
const UFO_BOMBER_CLIMB_SPEED = 5;
const UFO_BOMBER_FIRE_RATE = 90;
const UFO_BOMBER_DAMAGE = 3;
const UFO_BOMBER_ROTATE_LIMITS = 0.2;
const UFO_BOMBER_CLIMB_LIMITS = 50;

const UFO_BOMBER_SFX_FLYBY = "ufoBomberFlyBy";
const UFO_BOMBER_SFX_EXPLODE = "mediumExplosion";

class UfoBomber {
    constructor() {
        this.collidable = true;
        this.scoreValue = 200;
        this.collisionRadius = 200;
        this.visibleRadius = 200;
        this.dropsPickup = true;
        this.dropChance = 20;
        this.health = 3;
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

            //  this.sfx.playSound(UFO_BOMBER_SFX_FLYBY, true);
        };

        this.update = function () {

            //  create oscilating movement
            // this.maxY = y + random(0, UFO_BOMBER_CLIMB_LIMITS);
            // this.minY = y - random(0, UFO_BOMBER_CLIMB_LIMITS);

            this.velocity = createVector(UFO_BOMBER_FWD_SPEED, 0);    //UFO_BOMBER_CLIMB_SPEED * this.direction
            this.position.add(this.velocity);
        };

        this.draw = function () {
            push();
            //  Force it on screen for now
            translate(this.position.x, this.position.y);

            fill(85, 107, 47);
            stroke(0, 255, 127);
            strokeWeight(3);

            drawVertexShape(bomberPoints);

            fill(178, 34, 34);
            stroke(255, 69, 0);
            ellipse(0, -45, 30, 60);

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
                this.explosion.initialize(this.position.x, this.position.y, 500, 600);
                this.sfx.stopSound(UFO_BOMBER_SFX_FLYBY);
                this.sfx.playSound(UFO_BOMBER_SFX_EXPLODE);
                this.state = COLLIDABLE_STATE_DYING;
            }
        };

        this.stopAllSound = function () {
            if (this.sfx.isSoundPlaying(UFO_BOMBER_SFX_FLYBY))
                this.sfx.stopSound(UFO_BOMBER_SFX_FLYBY);
        };

        this.getDamage = function () {
            return UFO_BOMBER_DAMAGE;
        };
    }
}