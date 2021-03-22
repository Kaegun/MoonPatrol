class Explosion {
    constructor() {
        //  Create a number of particle emitters to simulate exploding.
        this.explosions = [];

        this.initialize = function (x, y, num, lifetime) {
            var e = new ParticleEmitter();
            e.initialize(x, y, 3, 3, color(128, 128, 128, 100), 30, num, lifetime, PS_MIDDLE, PS_NOLOOP);
            this.explosions.push(e);

            e = new ParticleEmitter();
            e.initialize(x, y, 6, 6, color(255, 165, 0, 100), 12, num * 1.5, lifetime / 2, PS_MIDDLE, PS_NOLOOP);
            this.explosions.push(e);
        };

        this.update = function () {
            for (var i = 0; i < this.explosions.length; i++)
                this.explosions[i].update();
        };

        this.draw = function () {
            for (var i = 0; i < this.explosions.length; i++) {
                this.explosions[i].draw();
            }
        };

        this.alive = function () {
            var alive = false;
            for (var i = 0; i < this.explosions.length; i++)
                alive |= this.explosions[i].alive();
            return alive;
        };
    }
}