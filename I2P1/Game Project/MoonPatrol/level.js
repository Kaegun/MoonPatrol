var levelDesigns = [{
    floorHeight: 300,
    width: 10,
    bgColor: { r: 105, g: 105, b: 105 },
    skyColor: { r: 25, g: 25, b: 112 },
    planets: [{ x: 400, y: 200, color: { r: 238, g: 130, b: 238 }, accentColor: { r: 186, g: 85, b: 211 }, diameter: 280 },
    { x: 900, y: 250, color: { r: 175, g: 238, b: 238 }, accentColor: { r: 95, g: 158, b: 160 }, diameter: 160 },],
    rocks: [],
    mountains: [],
    craters: [],

},];

function createLevels(levels, sfx) {
    for (var i = 0; i < levelDesigns.length; i++) {
        var l = new Level();
        l.initialize(i, sfx);
        levels.push(l);
    }

    return levels.length;
}

class Level {
    constructor() {
        this.groundColor;
        this.skyColor;
        this.floorPosY;
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

        this.initialize = function (idx, sfx) {

            this.levelNumber = idx + 1;
            this.floorPosY = height - levelDesigns[idx].floorHeight;
            this.floorHeight = levelDesigns[idx].floorHeight;
            this.groundColor = color(levelDesigns[idx].bgColor.r, levelDesigns[idx].bgColor.g, levelDesigns[idx].bgColor.b);
            this.skyColor = color(levelDesigns[idx].skyColor.r, levelDesigns[idx].skyColor.g, levelDesigns[idx].skyColor.b);
            this.sfx = sfx;

            this.levelWidth = width * levelDesigns[idx].width;

            //  stars
            this.starField = new StarField();
            this.starField.initialize(this.floorPosY);

            //  planets
            for (var i = 0; i < levelDesigns[idx].planets.length; i++) {
                var planet = levelDesigns[idx].planets[i];
                var p = new Planet();
                p.initialize(planet.x, planet.y,
                    color(planet.color.r, planet.color.g, planet.color.b),
                    color(planet.accentColor.r, planet.accentColor.g, planet.accentColor.b),
                    planet.diameter);
                this.planets.push(p);
            }

            // mountains - Due to parralax scrolling I've not seen a second mountain yet.
            var numMountains = random(1, 5);
            for (var i = 0; i < numMountains; i++) {
                var m = new Mountain();
                m.initialize(this.floorPosY + 8, this.levelWidth);
                //  TODO: Make sure mountains don't overlap
                this.mountains.push(m);
            }

            //  rock formations
            var rock = new Rock();
            rock.initialize(this.floorPosY, this.levelWidth);
            this.rocks.push(rock);

            //  terrain
            this.terrain = new Terrain();
            this.terrain.initialize(this.groundColor, this.levelWidth, this.floorPosY);

            //  craters
            var crater = new Crater();
            crater.initialize(this.floorPosY, this.floorHeight, this.skyColor);
            this.craters.push(crater);

            //  base(s)
            var base = new Base();
            base.initialize(0, this.floorPosY, "left", color(32, 178, 170), color(255, 99, 71));
            this.bases.push(base);

            //  Temp code, make fire looking thing with smoke
            var ps = new ParticleEmitter();
            ps.initialize(width / 3 * 2, this.floorPosY, 3, 3, color(128, 128, 128, 100), 30, 400, 500, PS_MIDDLE, PS_NOLOOP);
            this.particleSystems.push(ps);
            var ps = new ParticleEmitter();
            ps.initialize(width / 3 * 2, this.floorPosY, 6, 6, color(255, 165, 0, 100), 12, 600, 250, PS_MIDDLE, PS_NOLOOP);
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

            this.drawObjects(this.planets);
            pop();

            push();
            translate(this.scrollPos / 10, 0);
            this.drawObjects(this.mountains);
            pop();

            push();
            translate(this.scrollPos, 0);
            this.terrain.draw();

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
            if (this.playingMusic) {
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