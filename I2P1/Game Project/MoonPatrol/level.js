function createLevels(levels) {
    var l = new Level();
    l.initialize(300, color(105, 105, 105), color(0, 0, 0));
    levels.push(l);

    return levels.length;
}

class Level {
    constructor() {
        this.groundColor;
        this.skyColor;
        this.floorPos_y;
        this.floorHeight;
        this.levelWidth;

        this.starField = new StarField();
        this.mountains = [];
        this.craters = [];

        this.initialize = function (floorHeight, groundColor, skyColor) {
            this.floorPos_y = height - floorHeight;
            this.floorHeight = floorHeight;
            this.groundColor = groundColor;
            this.skyColor = skyColor;

            this.levelWidth = 2500; //  Need to decide on level size, etc.

            //  stars
            this.starField.initialize();

            // mountains - Due to parralax scrolling I've not seen a second mountain yet.
            var numMountains = random(1, 5);
            for (var i = 0; i < numMountains; i++) {
                var m = new Mountain();
                m.initialize(this.floorPos_y, this.levelWidth);
                //  TODO: Make sure mountains don't overlap
                this.mountains.push(m);
            }

            //  craters
            var crater = new Crater();
            crater.initialize(this.floorPos_y, this.floorHeight, this.skyColor);
            this.craters.push(crater);
        }

        this.draw = function () {
            background(this.skyColor); // fill the sky

            noStroke();
            fill(this.groundColor);
            rect(0, this.floorPos_y, width, this.floorHeight); // draw the ground

            this.starField.draw();

            for (var i = 0; i < this.mountains.length; i++) {
                this.mountains[i].draw();
            }

            for (var i = 0; i < this.craters.length; i++) {
                this.craters[i].draw();
            }
        };
    }
}