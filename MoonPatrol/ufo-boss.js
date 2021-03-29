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
const UFO_BOSS_CLIMB_LOWER = 75;
const UFO_BOSS_CLIMB_UPPER = 150;
const UFO_BOSS_MAX_HEALTH = 20;

const UFO_BOSS_SFX_FLYBY = "ufoBossFlyBy";
const UFO_BOSS_SFX_EXPLODE = "largeExplosion";
const UFO_BOSS_SFX_WARN = "ufoBossWarning";

//  The boss's flight path must bring it in from the right
class UfoBoss {
    constructor() {
        this.collidable = true;
        this.scoreValue = 1000;
        this.collisionRadius = 220;
        this.visibleRadius = 500;
        this.dropsPickup = true;
        this.dropChance = 100;
        this.health = UFO_BOSS_MAX_HEALTH;
        this.state = COLLIDABLE_STATE_ALIVE;

        this.position;
        this.velocity;
        this.rotation;
        this.direction;
        this.yStop;

        this.sfx;
        this.floorPosY;
        this.speed = UFO_BOSS_FWD_SPEED;
        this.bullets = [];
        this.explosion;
        this.sfxWarningPlaying = false;

        this.initialize = function (x, y, sfx, speedFactor, floorPosY) {
            this.position = createVector(x, y);
            this.velocity = createVector(0, 0);
            this.floorPosY = floorPosY;
            this.speed = UFO_BOSS_FWD_SPEED * speedFactor;
            this.sfx = sfx;
            this.direction = round(random(0, 1)) == 0 ? -1 : 1;
            this.yStop = this.calculateYStop();
        };

        this.calculateYStop = function () {
            return this.position.y + random(UFO_BOSS_CLIMB_LOWER, UFO_BOSS_CLIMB_UPPER) * this.direction;
        };

        this.changeDirection = function () {
            this.direction *= -1;
            this.yStop = this.calculateYStop();
        };

        this.update = function () {
            //  check the edges
            Collidable.doRightEdgeChecks(this, UFO_BOSS_SFX_FLYBY);

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
                    this.velocity = createVector(UFO_BOSS_FWD_SPEED, UFO_BOSS_CLIMB_SPEED * this.direction);    //UFO_BOMBER_CLIMB_SPEED * this.direction
                    this.position.add(this.velocity);
                    //  Shoot
                    if (Collidable.onScreen(this)) {
                        if (frameCount % UFO_BOSS_FIRE_RATE == 0) {
                            //  fire a bullet
                            this.bullets.push(Bomb.createLargeBomb(this.position.x,
                                this.position.y, this.speed, this.floorPosY, this.sfx));
                        }
                    }

                    if (this.position.x < -this.visibleRadius
                        && this.position.x > (-this.visibleRadius * 60 / this.speed)
                        && !this.sfxWarningPlaying) {
                        this.sfx.playSound(UFO_BOSS_SFX_WARN);
                        this.sfxWarningPlaying = true;
                    } else if (Collidable.onScreen(this) && this.sfxWarningPlaying) {
                        if (this.sfx.isSoundPlaying(UFO_BOSS_SFX_WARN))
                            this.sfx.stopSound(UFO_BOSS_SFX_WARN);
                        this.sfxWarningPlaying = false;
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

            if (this.health < UFO_BOSS_MAX_HEALTH) {
                var label = `${this.health}`;
                drawText(label, -textWidth(label) / 2, 20, 24);
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
                this.explosion.initialize(this.position.x, this.position.y, 600, 180);
                this.sfx.stopSound(UFO_BOSS_SFX_FLYBY);
                this.sfx.playSound(UFO_BOSS_SFX_EXPLODE);
                this.state = COLLIDABLE_STATE_DYING;
            }

            return true;
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