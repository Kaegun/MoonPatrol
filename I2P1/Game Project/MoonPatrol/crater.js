//  Crater class
//  can be drawn either by level, or caused by bomb from enemy
class Crater {
    constructor() {
        this.color;
        this.points = [];

        this.initialize = function (floorPos_y, floorHeight, backgroundColor) {
            this.color = backgroundColor;
            var depth = floorHeight * 0.33 + random(-15, 15);
            var xPos = width / 2 + random(-100, 100);
            var craterWidth = depth * 2;
            var currentWidth = 0;
            var currentDepth = 0;
            while (currentWidth < craterWidth) {
                var x = random(1, 5);
                currentWidth += x;
                var y = random(1, 5) * (currentWidth < craterWidth / 2 ? 1 : -1);
                currentDepth += y;
                var p = { x: xPos + currentWidth, y: (floorPos_y + currentDepth < floorPos_y ? floorPos_y : floorPos_y + currentDepth) };
                this.points.push(p);
            }

            //  Make sure the crater lines up to the floor again.
            if (this.points[this.points.length - 1].y > floorPos_y)
                this.points[this.points.length - 1].y = floorPos_y;
        };

        this.draw = function () {
            fill(this.color);
            stroke(this.color);
            beginShape();

            for (var i = 0; i < this.points.length; i++)
                vertex(this.points[i].x, this.points[i].y);

            vertex(this.points[0].x, this.points[0].y);

            endShape();
        }

        //  Test whether the player fell into the crater
        this.collission = function (x, y) { };
    }
}