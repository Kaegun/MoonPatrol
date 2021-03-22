const UFO_SCOUT_SPEED = 15;

class UfoScout {
    constructor() {
        this.position;
        this.velocity;
        this.speed;
        this.sfx;

        this.initialize = function (x, y, speedFactor, sfx) {
            this.sfx = sfx;
            this.position = createVector(x, y);
            this.velocity = createVector(1, 0);
            this.speed = UFO_SCOUT_SPEED * speedFactor;
        };

        this.update = function () {
            this.position.add(velocity.mul(this.speed));
        };

        this.draw = function () {
            translate(this.position.x, this.position.y);
            fill(47, 79, 79);
            ellipse(0, 0, 150, 75);
            fill(95, 158, 160);
            ellipse(0, -20, 150, 75);
        };
    }
}