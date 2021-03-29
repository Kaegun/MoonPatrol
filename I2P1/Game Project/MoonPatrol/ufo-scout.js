const UFO_SCOUT_SPEED = 15;
const UFO_SCOUT_DIAMETER = 120;
const UFO_SCOUT_SFX_WARN = "ufoScoutWarning";
const UFO_SCOUT_SFX_FLYBY = "ufoScoutFlyBy";

class UfoScout {
    constructor() {
        this.collidable = true;
        this.scoreValue = 300;
        this.collisionRadius = UFO_SCOUT_DIAMETER / 2;
        this.visibleRadius = UFO_SCOUT_DIAMETER;
        this.dropsPickup = true;
        this.dropChance = 100;

        this.position;
        this.velocity;
        this.speed = UFO_SCOUT_SPEED;
        this.sfx;
        this.explosion;
        this.state = COLLIDABLE_STATE_ALIVE;
        this.sfxWarningPlaying = false;
        this.sfxFlyByPlaying = false;

        this.initialize = function (x, y, sfx, speedFactor, floorPosY) {
            this.sfx = sfx;
            this.position = createVector(x, y);
            this.velocity = createVector(1, 0);
            this.speed = UFO_SCOUT_SPEED * speedFactor;
        };

        this.update = function () {
            if (this.state == COLLIDABLE_STATE_ALIVE) {
                this.position.add(p5.Vector.mult(this.velocity, this.speed));
                if (this.position.x < -this.visibleRadius && this.position.x > (-this.visibleRadius * 4) && !this.sfxWarningPlaying) {
                    this.sfx.playSound(UFO_SCOUT_SFX_WARN);
                    this.sfxWarningPlaying = true;
                } else if (Collidable.onScreen(this) && !this.sfxFlyByPlaying) {
                    this.sfx.playSound(UFO_SCOUT_SFX_FLYBY, true);
                    this.sfxFlyByPlaying = true;
                    if (this.sfxWarningPlaying) {
                        this.sfx.stopSound(UFO_SCOUT_SFX_WARN);
                        this.sfxWarningPlaying = false;
                    }
                } else if (this.sfxFlyByPlaying && Collidable.offRightEdge(this)) {
                    this.sfxFlyByPlaying = false;
                    this.sfx.stopSound(UFO_SCOUT_SFX_FLYBY);
                    this.state == COLLIDABLE_STATE_DEAD;
                }
                else {
                    //  onScreen and sound already playing, or too far to the left to render
                }
            }
            else if (this.state == COLLIDABLE_STATE_DYING) {
                this.explosion.update();
                if (!this.explosion.alive())
                    this.state = COLLIDABLE_STATE_DEAD;
            }
        };

        this.draw = function () {
            if (this.state == COLLIDABLE_STATE_ALIVE) {
                push();
                translate(this.position.x, this.position.y);
                fill(47, 79, 79);
                ellipse(0, 0, UFO_SCOUT_DIAMETER * 1.1, UFO_SCOUT_DIAMETER / 2);
                fill(95, 158, 160);
                ellipse(0, -10, UFO_SCOUT_DIAMETER, UFO_SCOUT_DIAMETER / 2);
                fill(192, 192, 192);
                ellipse(0, -40, UFO_SCOUT_DIAMETER * 0.3, UFO_SCOUT_DIAMETER * 0.15);

                pop();
            }
            else if (this.state == COLLIDABLE_STATE_DYING) {
                this.explosion.draw();
            }
        };

        this.destroy = function () {
            if (this.state == COLLIDABLE_STATE_ALIVE) {
                this.explosion = new Explosion();
                this.explosion.initialize(this.position.x, this.position.y, 250, 90);
                this.sfx.stopSound(UFO_SCOUT_SFX_FLYBY);
                this.sfx.playSound("smallExplosion");

                this.state = COLLIDABLE_STATE_DYING;
            }
            return true;
        };

        this.stopAllSound = function () {
            if (this.sfx.isSoundPlaying(UFO_SCOUT_SFX_FLYBY))
                this.sfx.stopSound(UFO_SCOUT_SFX_FLYBY);
            if (this.sfx.isSoundPlaying(UFO_SCOUT_SFX_WARN))
                this.sfx.stopSound(UFO_SCOUT_SFX_WARN);
        };

        this.collision = function (collider) {
            return false;
        };
    }
}