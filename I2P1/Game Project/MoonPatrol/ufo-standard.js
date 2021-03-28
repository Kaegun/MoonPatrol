const UFO_STD_SIDELEN = 60;
const UFO_STD_DIAMETER = 30;
const UFO_STD_FWD_SPEED = 6;
const UFO_STD_CLIMB_SPEED = 3;
const UFO_STD_FIRE_RATE = 60;
const UFO_STD_DAMAGE = 1;

const UFO_STD_SFX_FLYBY = "ufoStandardFlyBy";
const UFO_STD_SFX_EXPLODE = "smallExplosion";

class UfoStandard {
    constructor() {
        this.collidable = true;
        this.scoreValue = 100;
        this.collisionRadius = UFO_STD_SIDELEN / 2;
        this.visibleRadius = UFO_STD_SIDELEN + UFO_STD_DIAMETER;
        this.dropsPickup = true;
        this.dropChance = 10;

        this.position;
        this.floorPosY;
        this.speedFactor;
        this.rotation = 0;
        this.direction = 1;
        this.speed;
        this.maxY;
        this.minY;
        this.sfx;
        this.state;
        this.explosion;
        this.deathCounter = 0;
        this.soundPlaying = false;
        this.bullets = [];

        this.initialize = function (x, y, sfx, speedFactor, floorPosY) {
            this.position = createVector(x, y);
            this.floorPosY = floorPosY;
            this.speedFactor = speedFactor;
            this.maxY = y + 50;
            this.minY = y - 50;
            this.sfx = sfx;
            this.speed = UFO_STD_FWD_SPEED;

            this.state = COLLIDABLE_STATE_ALIVE;
        };

        this.update = function () {
            //  If the Ufo is off the right edge, mark it dead
            if (Collidable.offRightEdge(this)) {
                this.state = COLLIDABLE_STATE_DEAD;
                this.sfx.stopSound(UFO_STD_SFX_FLYBY);
                this.soundPlaying = false;
                console.log('Ufo should be dead now');
            }

            else if (Collidable.onScreen(this) && !this.soundPlaying) {
                //  Play ufo sound loop.
                this.sfx.playSound(UFO_STD_SFX_FLYBY, true);
                this.soundPlaying = true;
            }

            //  move the Ufo - needs to be a predictable pattern, so it doesn't clash with others
            this.rotation++;

            if (this.state == COLLIDABLE_STATE_ALIVE) {
                if (this.position.y > this.maxY)
                    this.direction = -1;
                else if (this.position.y < this.minY)
                    this.direction = 1;

                this.position.add(createVector(UFO_STD_FWD_SPEED, UFO_STD_CLIMB_SPEED * this.direction));
                if (Collidable.onScreen(this)) {
                    if (frameCount % UFO_STD_FIRE_RATE == 0) {
                        //  fire a bullet
                        this.bullets.push(Bomb.createSmallBomb(this.position.x, this.position.y, UFO_STD_FWD_SPEED, this.floorPosY, this.sfx));
                    }
                }
            } else if (this.state == COLLIDABLE_STATE_DYING) {
                this.explosion.update();
                if (!this.explosion.alive())
                    this.state = COLLIDABLE_STATE_DEAD;
            }
            else {
                //  Ufo is dead.
            }

            //  always update bullets (they'll disappear though when the ufo does)
            updateBullets(this.bullets);
        };

        this.draw = function () {
            push();

            translate(this.position);
            rotate(-this.rotation * ((PI * 2) / 90), createVector(0, 0, 1));
            //  position offsets
            var yOffset = sqrt(pow(UFO_STD_SIDELEN, 2) + pow(UFO_STD_SIDELEN / 2, 2)) / 2;
            var xOffset = UFO_STD_SIDELEN;

            if (this.state == COLLIDABLE_STATE_ALIVE) {
                //  connecting struts
                beginShape();

                stroke(100, 100, 100);
                strokeWeight(5);
                noFill();
                vertex(0, -yOffset);
                vertex(-xOffset, yOffset);
                vertex(xOffset, yOffset);
                vertex(0, -yOffset);

                endShape();
            }

            if (this.state != COLLIDABLE_STATE_DEAD) {
                //  spheres
                fill(192, 192, 192);
                strokeWeight(1);
                ellipse(0, -yOffset, UFO_STD_DIAMETER);
                ellipse(-xOffset, yOffset, UFO_STD_DIAMETER);
                ellipse(xOffset, yOffset, UFO_STD_DIAMETER);
            }
            pop();

            //  Call helper to draw all bullets
            drawArray(this.bullets);

            if (this.state == COLLIDABLE_STATE_DYING) {
                this.explosion.draw();
            }
            else if (this.state == COLLIDABLE_STATE_DEAD) {
            }
        };

        this.destroy = function () {
            if (this.state == COLLIDABLE_STATE_ALIVE) {
                this.explosion = new Explosion();
                this.explosion.initialize(this.position.x, this.position.y, 250, 400);
                this.sfx.stopSound(UFO_STD_SFX_FLYBY);
                this.sfx.playSound(UFO_STD_SFX_EXPLODE);
                this.state = COLLIDABLE_STATE_DYING;
            }
        };

        this.stopAllSound = function () {
            if (this.sfx.isSoundPlaying(UFO_STD_SFX_FLYBY))
                this.sfx.stopSound(UFO_STD_SFX_FLYBY);
        };

        this.collision = function (collider, collisionRadius) {
            return testBulletsCollision(this.bullets, collider, collisionRadius);
        };

        this.getDamage = function () {
            return UFO_STD_DAMAGE;
        };
    }
}