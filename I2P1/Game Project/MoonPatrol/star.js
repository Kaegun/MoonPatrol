class StarField {
    constructor() {
        this.stars = [];

        this.initialize = function () {
            var numStars = random(100, 150);
            for (var i = 0; i < numStars; i++) {
                var s = new Star();
                s.initialize();
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
        this.diameter = random(1, 3);
        this.x = random(0, width);
        this.y = random(0, height / 2); //  Floor height might be needed here

        this.initialize = function () {

        }

        this.draw = function () {
            fill(255);  //  randomize star colors and add some diffusion or other lighting effect
            ellipse(this.x, this.y, this.diameter);
        }
    }
}