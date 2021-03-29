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
const UFO_BOMBER_CLIMB_UPPER = 60;
const UFO_BOMBER_CLIMB_LOWER = 20;
const UFO_BOMBER_MAX_HEALTH = 5;

const UFO_BOMBER_SFX_FLYBY = "ufoBomberFlyBy";
const UFO_BOMBER_SFX_EXPLODE = "mediumExplosion";

class UfoBomber {
    constructor() {
        this.collidable = true;
        this.scoreValue = 200;
        this.collisionRadius = 90;
        this.visibleRadius = 200;
        this.dropsPickup = true;
        this.dropChance = 20;
        this.health = UFO_BOMBER_MAX_HEALTH;
        this.state = COLLIDABLE_STATE_ALIVE;

        this.position;
        this.velocity;
        this.rotation;
        this.direction;
        this.yStop;

        this.sfx;
        this.floorPosY;
        this.speed = UFO_BOMBER_FWD_SPEED;
        this.bullets = [];
        this.explosion;

        this.initialize = function (x, y, sfx, speedFactor, floorPosY) {
            this.position = createVector(x, y);
            this.velocity = createVector(0, 0);
            this.floorPosY = floorPosY;
            this.speed = UFO_BOMBER_FWD_SPEED * speedFactor;
            this.sfx = sfx;
            this.direction = round(random(0, 1)) == 0 ? -1 : 1;
            this.yStop = this.calculateYStop();
        };

        this.calculateYStop = function () {
            return this.position.y + random(UFO_BOMBER_CLIMB_LOWER, UFO_BOMBER_CLIMB_UPPER) * this.direction;
        };

        this.changeDirection = function () {
            this.direction *= -1;
            this.yStop = this.calculateYStop();
        };

        this.update = function () {

            //  check the edges
            Collidable.doRightEdgeChecks(this, UFO_BOMBER_SFX_FLYBY);

            //  create oscilating movement
            if (this.direction > 0) {
                if (this.position.y > this.yStop) {
                    this.changeDirection();
                }
            }
            else if (this.position.y < this.yStop) {
                this.changeDirection();
            }

            switch (this.state) {
                case COLLIDABLE_STATE_ALIVE:
                    this.velocity = createVector(UFO_BOMBER_FWD_SPEED, UFO_BOMBER_CLIMB_SPEED * this.direction);    //UFO_BOMBER_CLIMB_SPEED * this.direction
                    this.position.add(this.velocity);
                    //  Shoot
                    if (Collidable.onScreen(this)) {
                        if (frameCount % UFO_BOMBER_FIRE_RATE == 0) {
                            //  fire a bullet
                            this.bullets.push(Bomb.createMediumBomb(this.position.x, this.position.y, this.speed, this.floorPosY, this.sfx));
                        }
                    }
                    break;
                case COLLIDABLE_STATE_DYING:
                    if (this.explosion) {
                        this.explosion.update();
                        if (!this.explosion.alive())
                            this.state = COLLIDABLE_STATE_DEAD;
                    }
                    break;
            }

            //  always update bullets (they'll disappear though when the ufo does)
            updateBullets(this.bullets);
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

            if (this.health < UFO_BOMBER_MAX_HEALTH) {
                fill(85, 107, 47);
                stroke(0, 255, 127);
                strokeWeight(1);
                var label = `${this.health}`;
                drawText(label, -textWidth(label) / 2, -45, 18);
            }

            pop();

            if (this.explosion)
                this.explosion.draw();

            //  Call helper to draw all bullets
            drawArray(this.bullets);
        };

        this.collision = function (collider, collisionRadius) {
            return testBulletsCollision(this.bullets, collider, collisionRadius);
        };

        this.destroy = function () {
            if (--this.health > 0)  //  bomber takes a few hits to destroy.
                return false;

            if (this.state == COLLIDABLE_STATE_ALIVE) {
                this.explosion = new Explosion();
                this.explosion.initialize(this.position.x, this.position.y, 400, 120);
                this.sfx.stopSound(UFO_BOMBER_SFX_FLYBY);
                this.sfx.playSound(UFO_BOMBER_SFX_EXPLODE);
                this.state = COLLIDABLE_STATE_DYING;
            }
            return true;
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