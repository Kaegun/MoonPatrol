class Planet {
    constructor() {
        this.position;
        this.color;
        this.accentColor;
        this.diameter;
        this.xyOffset;
        this.smallDiameter;
        this.scrollPos = 0;

        this.initialize = function (x, y, color, accentColor, diameter) {
            this.position = createVector(x, y);
            this.color = color;
            this.accentColor = accentColor;
            this.diameter = diameter;
            this.xyOffset = random(-this.diameter / 5, this.diameter / 5);
            this.smallDiameter = random(this.diameter / 4, this.diameter / 6);
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
            ellipse(this.position.x, this.position.y, this.diameter, this.diameter);
            fill(this.accentColor);
            ellipse(this.position.x + this.xyOffset,
                this.position.y + this.xyOffset,
                this.smallDiameter,
                this.smallDiameter);

            pop();
        };
    }
}