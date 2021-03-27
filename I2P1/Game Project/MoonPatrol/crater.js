const CRATER_NORMAL = 1;
const CRATER_LARGE = 2;

//  Crater class
//  can be drawn either by level, or caused by bomb from enemy
class Crater {
    constructor() {
        this.color;
        this.points = [];
        this.position;
        this.type;
        this.depth;
        this.width;

        this.initialize = function (startX, startY, floorHeight, backgroundColor, type) {
            this.position = createVector(startX, startY);
            this.color = backgroundColor;
            this.depth = min(floorHeight, (floorHeight * 0.4 * type + random(-15, 15)));
            this.width = this.depth * 2;
            var currentWidth = 0;
            var currentDepth = 0;

            this.points.push({ x: this.position.x, y: this.position.y });

            while (currentWidth < this.width) {
                var x = random(1, 5);
                currentWidth += x;
                var y = random(1, 5) * (currentWidth < this.width / 2 ? 1 : -1);
                currentDepth += y;
                var p = { x: this.position.x + currentWidth, y: (this.position.y + currentDepth < this.position.y ? this.position.y : this.position.y + currentDepth) };
                this.points.push(p);
            }

            //  Make sure the crater lines up to the floor again.
            if (this.points[this.points.length - 1].y > this.position.y)
                this.points[this.points.length - 1].y = this.position.y;

            //  After drawn, place the position.x at the center of the crater
            this.position.x += this.width / 2;
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
        this.collision = function (vector) {
            return this.position.dist(vector) < this.width / 2;
        };
    }
}