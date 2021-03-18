const BASE_ORIENTATION_LEFT = "left";
const BASE_ORIENTATION_MIDDLE = "middle";
const BASE_ORIENTATION_RIGHT = "right";
const BASE_FLOOR_WIDTH = 500;

class Base {
    constructor() {
        this.position;
        this.orientation;   //  left, middle, right
        this.color;
        this.accentColor;

        this.initialize = function (x, y, orientation, color, accentColor) {
            this.position = createVector(x + BASE_FLOOR_WIDTH / 2, y);
            this.orientation = orientation;
            this.color = color;
            this.accentColor = accentColor;
        };

        this.update = function () {
            //  Maybe do some animation? flickering lights, etc.
        };

        this.draw = function () {
            push();

            fill(this.color);
            stroke(this.accentColor);
            //  Dome
            var arcX = this.orientation == BASE_ORIENTATION_LEFT ? this.position.x - BASE_FLOOR_WIDTH / 2 + 75 :
                this.orientation == BASE_ORIENTATION_MIDDLE ? this.position.x : this.position.x + BASE_FLOOR_WIDTH / 2 - 75;
            arc(arcX, this.position.y, 150, 150, PI, 0);
            //  Accents
            fill(this.accentColor);
            for (var i = arcX - 45; i < arcX + 75; i += 30)
                ellipse(i, this.position.y - 30, 15);
            //  Flat piece
            fill(this.color);
            rect(this.position.x - BASE_FLOOR_WIDTH / 2, this.position.y - 10, BASE_FLOOR_WIDTH, 50);

            pop();
        };
    }
}