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

        this.terrain;
        this.bases = [];
        this.starField;
        this.mountains = [];
        this.rocks = [];
        this.craters = [];

        this.initialize = function (floorHeight, groundColor, skyColor) {
            this.floorPos_y = height - floorHeight;
            this.floorHeight = floorHeight;
            this.groundColor = groundColor;
            this.skyColor = skyColor;

            this.levelWidth = 2500; //  Need to decide on level size, etc.

            //  terrain
            this.terrain = new Terrain();
            this.terrain.initialize(groundColor, this.levelWidth, this.floorPos_y);

            //  stars
            this.starField = new StarField();
            this.starField.initialize();

            // mountains - Due to parralax scrolling I've not seen a second mountain yet.
            var numMountains = random(1, 5);
            for (var i = 0; i < numMountains; i++) {
                var m = new Mountain();
                m.initialize(this.floorPos_y, this.levelWidth);
                //  TODO: Make sure mountains don't overlap
                this.mountains.push(m);
            }

            //  rock formations
            var rock = new Rock();
            rock.initialize(this.floorPos_y, this.levelWidth);
            this.rocks.push(rock);

            //  craters
            var crater = new Crater();
            crater.initialize(this.floorPos_y, this.floorHeight, this.skyColor);
            this.craters.push(crater);

            //  base(s)
            var base = new Base();
            base.initialize(0, this.floorPos_y, "right", color(32, 178, 170), color(255, 99, 71));
            this.bases.push(base);
        }

        this.draw = function () {
            background(this.skyColor); // fill the sky

            this.starField.draw();

            // noStroke();
            // fill(this.groundColor);
            // rect(0, this.floorPos_y, width, this.floorHeight); // draw the ground

            this.terrain.draw();

            this.drawObjects(this.mountains);

            this.drawObjects(this.rocks);

            this.drawObjects(this.craters);

            this.drawObjects(this.bases);
        };

        this.drawObjects = function (objects) {
            for (var i = 0; i < objects.length; i++) {
                objects[i].draw();
            }
        };

        this.toggleMusic = function () {
            //  do nothing yet
        };
    }
}