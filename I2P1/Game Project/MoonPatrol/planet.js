class Planet {
    constructor() {
        this.position;
        this.color;
        this.accentColor;
        this.scrollPos = 0;

        this.initialize = function (x, y) {
            this.position = createVector(x, y);
            this.color = color(238, 130, 238);
            this.accentColor = color(186, 85, 211);
        };

        this.update = function (scrollPos) {
            this.scrollPos = -scrollPos;
        };

        this.draw = function () {

            push();

            translate(this.scrollPos / 15, 0);

            stroke(this.accentColor);
            strokeWeight(1);
            fill(this.color);
            ellipse(this.position.x, this.position.y, 280, 280);
            fill(this.accentColor);
            ellipse(this.position.x - 60, this.position.y - 60, 80, 80);

            pop();
        };
    }
}