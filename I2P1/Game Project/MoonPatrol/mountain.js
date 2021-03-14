class Mountain {
    //  Add different mountain styles, and decorations (volcanoes, etc.)
    constructor() {
        this.x;
        this.y;
        this.width;
        this.height;

        this.initialize = function (floorPos_y, maxLevelWidth) {
            this.x = random(600, maxLevelWidth);
            this.y = floorPos_y;
            this.height = 175;
            this.width = 250;
        };

        this.draw = function () {
            stroke(0);
            fill(125, 125, 125);
            triangle(this.x - this.width, this.y,
                this.x - this.width / 2, this.y - this.height * 0.4,
                this.x, this.y);

            this.drawSnowCap(this.x - this.width / 2, this.y, this.width, this.height * 0.4, 0.2);

            stroke(0);
            fill(125, 125, 125);
            triangle(this.x, this.y,
                this.x + this.width / 2, this.y - this.height * 0.4,
                this.x + this.width, this.y);

            this.drawSnowCap(this.x + this.width / 2, this.y, this.width, this.height * 0.4, 0.2);

            stroke(0);
            fill(125, 125, 125);
            triangle(this.x - this.width / 2, this.y,
                this.x, this.y - this.height,
                this.x + this.width / 2, this.y);

            this.drawSnowCap(this.x, this.y, this.width, this.height, 0.2);
        };

        //	draw snowcap
        this.drawSnowCap = function (x, y, width, height, heightFactor) {
            noStroke();
            fill(255, 255, 255, 180);
            //	calculate the angles
            var snowHeight = height * heightFactor;
            var angle = atan(height / (width / 2));
            var snowWidth = snowHeight / tan(angle);
            triangle(x - snowWidth, y - (height - snowHeight),
                x, y - height,
                x + snowWidth, y - (height - snowHeight));
        };
    }
}