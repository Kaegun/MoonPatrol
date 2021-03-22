var levelDesigns = [{
    floorHeight: 0.3,
    width: 10,
    bgColor: { r: 105, g: 105, b: 105 },
    skyColor: { r: 25, g: 25, b: 112 },
    planets: [{ x: 400, y: 200, color: { r: 238, g: 130, b: 238 }, accentColor: { r: 186, g: 85, b: 211 }, diameter: 280 },
    { x: 900, y: 250, color: { r: 175, g: 238, b: 238 }, accentColor: { r: 95, g: 158, b: 160 }, diameter: 160 },],
    rocks: [],
    mountains: [],
    craters: [],
    enemies: [{ type: UFO_STANDARD, count: 3, waves: 2, },
    { type: UFO_SCOUT, count: 1, waves: 2, }],
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
        this.enemies = [];
        this.ufoSpawner;

        this.sfx;
        this.playingMusic = true;
        this.bgMusic;

        this.scrollPos = 0;

        this.initialize = function (idx, sfx) {

            this.levelNumber = idx + 1;
            this.floorHeight = height * levelDesigns[idx].floorHeight;
            this.floorPosY = height - this.floorHeight;
            this.groundColor = color(levelDesigns[idx].bgColor.r, levelDesigns[idx].bgColor.g, levelDesigns[idx].bgColor.b);
            this.skyColor = color(levelDesigns[idx].skyColor.r, levelDesigns[idx].skyColor.g, levelDesigns[idx].skyColor.b);
            this.sfx = sfx;

            this.levelWidth = width * levelDesigns[idx].width;
            this.bgMusic = `level${idx + 1}bgmusic`;

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

            this.ufoSpawner = new UfoSpawner();
            this.ufoSpawner.initialize(this.sfx, this.levelWidth);
            console.table(levelDesigns[idx].enemies);
            for (var i = 0; i < levelDesigns[idx].enemies.length; i++) {
                var ufo = levelDesigns[idx].enemies[i];
                var ufos = this.ufoSpawner.spawnUfos(ufo.type, ufo.count, ufo.waves);
                console.table(ufos);
                this.enemies.push(...ufos);
            }

            //  Start level bg music
            this.sfx.playMusic(this.bgMusic, true);

        };

        this.update = function (scrollPos) {
            this.scrollPos = -scrollPos;

            this.updateObjects(this.enemies);
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

            this.drawObjects(this.enemies);
        };

        this.updateObjects = function (objects) {
            for (var i = 0; i < objects.length; i++) {
                objects[i].update();
            }
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
                this.sfx.stopMusic(this.bgMusic);

            }
            else {
                this.sfx.playMusic(this.bgMusic);
                console.log('level starting music');
            }

            this.playingMusic = !this.playingMusic;
        };
    }
}