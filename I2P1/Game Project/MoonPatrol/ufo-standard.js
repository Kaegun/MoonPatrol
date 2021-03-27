const UFO_STD_SIDELEN = 60;
const UFO_STD_DIAMETER = 30;
const UFO_STD_FWD_SPEED = 6;
const UFO_STD_CLIMB_SPEED = 3;

const UFO_STD_SFX_FLYBY = "ufoStandardFlyBy";

class UfoStandard {
    constructor() {
        this.collidable = true;
        this.scoreValue = 100;
        this.collisionRadius = UFO_STD_SIDELEN / 2;
        this.visibleRadius = UFO_STD_SIDELEN + UFO_STD_DIAMETER;
        this.dropsPickup = false;

        this.position;
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

        this.initialize = function (x, y, sfx) {
            this.position = createVector(x, y);
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
            } else if (this.state == COLLIDABLE_STATE_DYING) {
                this.explosion.update();
                if (!this.explosion.alive())
                    this.state = COLLIDABLE_STATE_DEAD;
            }
            else {
                //  Ufo is dead.
            }
        };

        this.draw = function () {
            push();

            translate(this.position.x, this.position.y);
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
                this.sfx.playSound("smallExplosion");
                this.state = COLLIDABLE_STATE_DYING;
            }
        };

        this.stopAllSound = function () {
            if (this.sfx.isSoundPlaying(UFO_STD_SFX_FLYBY))
                this.sfx.stopSound(UFO_STD_SFX_FLYBY);
        };
    }
}