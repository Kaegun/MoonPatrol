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
        this.planets = [];
        this.mountains = [];
        this.rocks = [];
        this.craters = [];

        this.scrollPos = 0;

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

            //  planets
            var p = new Planet();
            p.initialize(400, 200);
            this.planets.push(p);

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
            base.initialize(0, this.floorPos_y, "left", color(32, 178, 170), color(255, 99, 71));
            this.bases.push(base);
        };

        this.update = function (scrollPos) {
            this.scrollPos = -scrollPos;
        };

        this.draw = function () {

            console.log(`scrollPos: ${this.scrollPos}`);
            background(this.skyColor); // fill the sky

            push();
            translate(this.scrollPos / 20), 0;
            this.starField.draw();
            pop();

            this.drawObjects(this.planets);

            push();
            translate(this.scrollPos, 0);
            this.terrain.draw();
            pop();

            push();
            translate(this.scrollPos / 10, 0);
            this.drawObjects(this.mountains);
            pop();

            push();
            translate(this.scrollPos, 0);
            this.drawObjects(this.rocks);

            this.drawObjects(this.craters);

            this.drawObjects(this.bases);
            pop();
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