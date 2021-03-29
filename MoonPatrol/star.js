class StarField {
    constructor() {
        this.stars = [];

        this.initialize = function (floorPosY) {
            var numStars = random(150, 300);
            for (var i = 0; i < numStars; i++) {
                var s = new Star();
                s.initialize(floorPosY);
                this.stars.push(s);
            }
        };

        this.draw = function () {
            for (var i = 0; i < this.stars.length; i++) {
                this.stars[i].draw();
            }
        };
    }
}

class Star {
    constructor() {

        this.initialize = function (floorPosY) {
            this.diameter = random(1, 3);
            this.x = random(0, width);
            this.y = random(0, floorPosY);
        };

        this.draw = function () {
            fill(lerpColor(color(128), color(255), random(128)));
            ellipse(this.x, this.y, this.diameter);
        };
    }
}