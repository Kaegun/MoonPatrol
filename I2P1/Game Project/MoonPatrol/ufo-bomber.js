class UfoBomber {
    constructor() {
        this.collidable = true;
        this.scoreValue = 200;
        this.collisionRadius = 200;
        this.visibleRadius = 200;
        this.dropsPickup = false;
        this.health = 3;

        this.initialize = function () { };

        this.update = function () { };

        this.draw = function () { };

        this.destroy = function () {
            if (--this.health > 0)  //  bomber takes a few hits to destroy.
                return;
        };
    }
}