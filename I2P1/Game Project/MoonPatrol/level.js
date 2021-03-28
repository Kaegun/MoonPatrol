const levelDesigns = [
    {
        floorHeight: 0.3,
        startX: 250,
        width: 10,
        bgColor: { r: 105, g: 105, b: 105 },
        skyColor: { r: 25, g: 25, b: 112 },
        planets: [
            { x: 400, y: 200, color: { r: 238, g: 130, b: 238 }, accentColor: { r: 186, g: 85, b: 211 }, diameter: 280 },
            { x: 900, y: 250, color: { r: 175, g: 238, b: 238 }, accentColor: { r: 95, g: 158, b: 160 }, diameter: 160 },
        ],
        rocks: 20,
        mountains: { qty: 5, type: MOUNTAIN_TYPE_SNOW, },
        craters: 12,
        enemies: [  //  Add property to better space out spawns / calculate spawns better
            { type: UFO_STANDARD, count: 3, waves: 10, speedFactor: 1, },
            { type: UFO_SCOUT, count: 1, waves: 5, speedFactor: 1, },
            { type: UFO_BOMBER, count: 1, waves: 1, speedFactor: 1, },
            { type: UFO_BOSS, count: 1, waves: 1, speedFactor: 1, },
        ],
    },
];

class Level {
    static createLevels(levels, sfx, pickups) {
        for (var i = 0; i < levelDesigns.length; i++) {
            var l = new Level();
            l.initialize(i, sfx, pickups);
            levels.push(l);
        }

        return levels.length;
    }

    constructor() {
        this.groundColor;
        this.skyColor;
        this.floorPosY;
        this.startX;
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
        this.pickups;
        this.playingMusic = true;
        this.bgMusic;

        this.scrollPos = 0;

        this.initialize = function (idx, sfx, pickups) {

            this.levelNumber = idx + 1;
            this.floorHeight = height * levelDesigns[idx].floorHeight;
            this.startX = levelDesigns[idx].startX;
            this.floorPosY = height - this.floorHeight;
            this.groundColor = color(levelDesigns[idx].bgColor.r, levelDesigns[idx].bgColor.g, levelDesigns[idx].bgColor.b);
            this.skyColor = color(levelDesigns[idx].skyColor.r, levelDesigns[idx].skyColor.g, levelDesigns[idx].skyColor.b);
            this.sfx = sfx;
            this.pickups = pickups;

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

            // mountains 
            var numMountains = random(1, levelDesigns[idx].qty);
            for (var i = 0; i < numMountains; i++) {
                var m = new Mountain();
                m.initialize(this.floorPosY + 8, this.levelWidth, levelDesigns[idx].mountains.type);
                this.mountains.push(m);
            }

            //  rock formations
            var numRocks = random(levelDesigns[idx].rocks * 0.4, levelDesigns[idx].rocks);
            var rockOffset = this.levelWidth / numRocks;
            var rockX = rockOffset;
            for (var i = 0; i < numRocks; i++) {
                var rock = new Rock();
                rockX += random(0, rockOffset);
                rock.initialize(rockX, this.floorPosY);
                this.rocks.push(rock);
            }

            //  terrain
            this.terrain = new Terrain();
            this.terrain.initialize(this.groundColor, this.levelWidth, this.floorPosY);

            //  craters
            var numCraters = random(levelDesigns[idx].craters * 0.6, levelDesigns[idx].craters);
            var craterOffset = this.levelWidth / numCraters;
            var craterX = craterOffset;
            for (var i = 0; i < numCraters; i++) {
                var crater = new Crater();
                craterX += random(craterOffset / 3, craterOffset * 1.5);
                var craterType = round(random(1, 2));
                crater.initialize(craterX, this.floorPosY, this.floorHeight, this.skyColor, craterType);
                this.craters.push(crater);
            }

            //  base(s)
            var base = new Base();
            base.initialize(0, this.floorPosY, "left", color(32, 178, 170), color(255, 99, 71));
            this.bases.push(base);

            for (var i = 0; i < levelDesigns[idx].enemies.length; i++) {
                var ufo = levelDesigns[idx].enemies[i];
                var ufos = UfoSpawner.spawnUfos(this.sfx, this.levelWidth, ufo.type, ufo.count, ufo.waves, ufo.speedFactor, this.floorPosY);
                this.enemies.push(...ufos);
            }

            //  Test creating a pcikup in the level
            var pu = Pickup.createRandomPickup(100, 1000, this.floorPosY, 0, this.floorPosY);
            this.pickups.push(pu);
        };

        this.start = function () {

            //  Start level bg music
            this.sfx.playSound(this.bgMusic, true);
        };

        this.restart = function () {
            //  Clear all arrays
            clearArray(this.bases);
            clearArray(this.planets);
            clearArray(this.mountains);
            clearArray(this.rocks);
            clearArray(this.craters);
            clearArray(this.enemies);

            //  Clear state flags
            this.scrollPos = 0;

            //  stop all music
            this.stopAllSound();

            //  init
            this.initialize(this.levelNumber - 1, this.sfx, this.pickups);

            //  start
            this.start();
        };

        this.update = function (scrollPos) {
            this.scrollPos = -scrollPos;

            this.updateObjects(this.enemies);
        };

        this.updateObjects = function (objects) {
            for (var i = objects.length - 1; i >= 0; i--) {
                objects[i].update();
                if (!Collidable.alive(objects[i])) {
                    objects.splice(i, 1);
                }
            }
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

        this.drawObjects = function (objects) {
            for (var i = 0; i < objects.length; i++) {
                if (objects[i].collidable && !Collidable.onScreen(objects[i]))
                    continue;
                objects[i].draw();
            }
        };

        this.toggleMusic = function () {
            if (this.playingMusic) {
                this.sfx.stopSound(this.bgMusic);

            }
            else {
                this.sfx.playSound(this.bgMusic);
            }

            this.playingMusic = !this.playingMusic;
        };

        this.stopAllSound = function () {
            this.sfx.stopSound(this.bgMusic);
            for (var i = 0; i < this.enemies.length; i++) {
                this.enemies[i].stopAllSound();
            }
        };
    }
}