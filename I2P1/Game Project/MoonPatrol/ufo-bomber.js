class UfoBomber {
    constructor() {
        this.scoreValue = 200;
        this.dropsPickup = false;
        this.health = 3;

        this.initialize = function () { };

        this.update = function () { };

        this.draw = function () { };

        this.collision = function (vector) {
            return false;
        };

        this.destroy = function () {
            if (--this.health > 0)  //  bomber takes a few hits to destroy.
                return;
        };

        this.alive = function () { return true; };
    }
}