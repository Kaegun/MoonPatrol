const UFO_SCOUT_SPEED = 15;
const UFO_SCOUT_DIAMETER = 120;
class UfoScout {
    constructor() {
        this.scoreValue = 300;
        this.dropsPickup = true;

        this.position;
        this.velocity;
        this.speed;
        this.sfx;
        this.state = UFO_STATE_ALIVE;
        this.explosion;

        this.initialize = function (x, y, sfx, speedFactor) {
            this.sfx = sfx;
            this.position = createVector(x, y);
            this.velocity = createVector(1, 0);
            this.speed = UFO_SCOUT_SPEED * speedFactor;
        };

        this.update = function () {
            if (this.state == UFO_STATE_ALIVE)
                this.position.add(p5.Vector.mult(this.velocity, this.speed));
            else if (this.state == UFO_STATE_DYING) {
                this.explosion.update();
                if (!this.explosion.alive())
                    this.state = UFO_STATE_DEAD;
            }
        };

        this.draw = function () {
            if (this.state == UFO_STATE_ALIVE) {
                push();
                translate(this.position.x, this.position.y);
                fill(47, 79, 79);
                ellipse(0, 0, UFO_SCOUT_DIAMETER * 1.1, UFO_SCOUT_DIAMETER / 2);
                fill(95, 158, 160);
                ellipse(0, -10, UFO_SCOUT_DIAMETER, UFO_SCOUT_DIAMETER / 2);
                pop();
            }
            else if (this.state == UFO_STATE_DYING) {
                this.explosion.draw();
            }
        };

        this.collision = function (vector) {
            if (this.state == UFO_STATE_ALIVE) {
                return this.position.dist(vector) < UFO_SCOUT_DIAMETER / 2;
            }
            else return false;
        };

        this.destroy = function () {
            if (this.state == UFO_STATE_ALIVE) {
                this.explosion = new Explosion();
                this.explosion.initialize(this.position.x, this.position.y, 250, 200);
                this.sfx.stopSound("ufoScoutWhoosh");
                this.sfx.playSound("smallExplosion");
                this.state = UFO_STATE_DYING;
            }
        };

        this.alive = function () {
            return this.state != UFO_STATE_DEAD;
        };
    }
}