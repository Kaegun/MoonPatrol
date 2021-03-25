class UfoBoss {
    constructor() {
        this.scoreValue = 1000;
        this.dropsPickup = true;
        this.health = 10;

        this.initialize = function () { };

        this.update = function () { };

        this.draw = function () { };

        this.collision = function (vector) {
            return false;
        };

        this.destroy = function () {
            if (--this.health > 0)  //  boss takes a few hits to destroy.
                return;
        };

        this.alive = function () { return true; };
    }
}