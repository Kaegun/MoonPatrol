class Terrain {
    constructor() {
        this.points = [];
        this.color;

        this.initialize = function (groundColor, gameWorldWidth, floorPos_y) {
            this.color = groundColor;

            var currentX = 0;
            while (currentX < gameWorldWidth) {
                currentX += random(3, 6);
                this.points.push({ x: currentX, y: floorPos_y + random(0, 8) });
            }
        };

        this.draw = function () {

            //  Need an accent colour on the terrain
            fill(this.color);

            beginShape();

            for (var i = 0; i < this.points.length; i++) {
                vertex(this.points[i].x, this.points[i].y);
            }

            vertex(this.points[this.points.length - 1].x, height);
            vertex(0, height);
            vertex(0, this.points[0].y);

            endShape();
        }
    }
}