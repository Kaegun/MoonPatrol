function createLevels(levels, sfx) {
    var l = new Level();
    l.initialize(300, color(105, 105, 105), color(0, 0, 0), sfx);
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

        this.sfx;
        this.playingMusic = true;

        //  Testing particles
        this.particleSystems = [];

        this.scrollPos = 0;

        this.initialize = function (floorHeight, groundColor, skyColor, sfx) {
            this.floorPos_y = height - floorHeight;
            this.floorHeight = floorHeight;
            this.groundColor = groundColor;
            this.skyColor = skyColor;
            this.sfx = sfx;

            this.levelWidth = width * 10; //  Need to decide on level size, etc.

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

            //  Temp code, make fire looking thing with smoke
            var ps = new ParticleEmitter();
            ps.initialize(width / 3 * 2, this.floorPos_y, 3, 3, color(128, 128, 128, 100), 30, 400, 500, PS_MIDDLE, PS_NOLOOP);
            this.particleSystems.push(ps);
            var ps = new ParticleEmitter();
            ps.initialize(width / 3 * 2, this.floorPos_y, 6, 6, color(255, 165, 0, 100), 12, 600, 250, PS_MIDDLE, PS_NOLOOP);
            this.particleSystems.push(ps);

            //  Start level bg music
            this.sfx.playMusic("level1bgmusic");

        };

        this.update = function (scrollPos) {
            this.scrollPos = -scrollPos;

            for (var i = 0; i < this.particleSystems.length; i++)
                this.particleSystems[i].update();
        };

        this.draw = function () {
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

            for (var i = 0; i < this.particleSystems.length; i++)
                this.particleSystems[i].draw();
        };

        this.drawObjects = function (objects) {
            for (var i = 0; i < objects.length; i++) {
                objects[i].draw();
            }
        };

        this.toggleMusic = function () {
            console.log(`toggleMusic: ${this.sfx.soundOn} - ${this.playingMusic}`);
            if (this.sfx.playingMusic) {
                console.log('level stopping music');
                this.sfx.stopMusic("level1bgmusic");

            }
            else {
                this.sfx.playMusic("level1bgmusic");
                console.log('level starting music');
            }

            this.playingMusic = !this.playingMusic;
        };
    }
}