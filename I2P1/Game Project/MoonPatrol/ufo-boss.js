class UfoBoss {
    constructor() {
        this.collidable = true;
        this.scoreValue = 1000;
        this.collisionRadius = 500;
        this.visibleRadius = 500;
        this.dropsPickup = true;
        this.health = 10;

        this.initialize = function () { };

        this.update = function () { };

        this.draw = function () { };

        this.destroy = function () {
            if (--this.health > 0)  //  boss takes a few hits to destroy.
                return;
        };
    }
}