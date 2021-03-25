class UfoStandard {
    constructor() {
        this.scoreValue = 100;
        this.dropsPickup = false;

        this.position;
        this.sideLen = 60;
        this.sphereDiameter = 30;
        this.rotation = 0;
        this.direction = 1;
        this.forwardSpeed = 4;
        this.climbSpeed = 3;
        this.maxY;
        this.minY;
        this.sfx;
        this.state;
        this.explosion;
        this.deathCounter = 0;

        this.initialize = function (x, y, sfx) {
            this.position = createVector(x, y);
            this.maxY = y + 50;
            this.minY = y - 50;
            this.sfx = sfx;

            this.state = UFO_STATE_ALIVE;

            //  Play ufo sound loop.
            this.sfx.playSound("ufoStandardFlyBy", true);
        };

        this.update = function () {
            //  move the Ufo - needs to be a predictable pattern, so it doesn't clash with others
            this.rotation++;
            if (this.state == UFO_STATE_ALIVE) {
                if (this.position.y > this.maxY)
                    this.direction = -1;
                else if (this.position.y < this.minY)
                    this.direction = 1;

                this.position.add(createVector(this.forwardSpeed, this.climbSpeed * this.direction));

                if (!this.sfx.isSoundPlaying("ufoStandardFlyBy")) {
                    console.log('ufo sound stopped');
                    this.sfx.playSound("ufoStandardFlyBy");
                }
            } else if (this.state == UFO_STATE_DYING) {
                this.explosion.update();
                if (!this.explosion.alive())
                    this.state = UFO_STATE_DEAD;
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
            var yOffset = sqrt(pow(this.sideLen, 2) + pow(this.sideLen / 2, 2)) / 2;
            var xOffset = this.sideLen / 2;

            if (this.state == UFO_STATE_ALIVE) {
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

            if (this.state != UFO_STATE_DEAD) {
                //  spheres
                fill(192, 192, 192);
                strokeWeight(1);
                ellipse(0, -yOffset, this.sphereDiameter);
                ellipse(-xOffset, yOffset, this.sphereDiameter);
                ellipse(xOffset, yOffset, this.sphereDiameter);
            }
            pop();

            if (this.state == UFO_STATE_DYING) {
                this.explosion.draw();
            }
            else if (this.state == UFO_STATE_DEAD) {
            }
        };

        this.collision = function (vector) {
            if (this.state == UFO_STATE_ALIVE) {
                return this.position.dist(vector) < this.sideLen / 2;
            }
            else return false;
        };

        this.destroy = function () {
            if (this.state == UFO_STATE_ALIVE) {
                this.explosion = new Explosion();
                this.explosion.initialize(this.position.x, this.position.y, 250, 400);
                this.sfx.stopSound("ufoStandardFlyBy");
                this.sfx.playSound("smallExplosion");
                this.state = UFO_STATE_DYING;
            }
        };

        this.alive = function () {
            return this.state != UFO_STATE_DEAD;
        }
    }
}