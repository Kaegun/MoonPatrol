class Rock {
    constructor() {
        this.position;
        this.color;
        this.accentColor;

        this.initialize = function (x, floorPosY) {
            this.position = createVector(x, floorPosY);
            this.color = color(205, 92, 92);
            this.accentColor = color(85, 107, 47);
        };

        this.draw = function () {
            fill(this.color);
            stroke(this.accentColor);
            ellipse(this.position.x, this.position.y - 15, 100, 40);
            ellipse(this.position.x - 20, this.position.y - 35, 60, 30);
            ellipse(this.position.x + 30, this.position.y - 30, 50, 26);
            ellipse(this.position.x - 15, this.position.y - 60, 80, 30);
        };
    }
}