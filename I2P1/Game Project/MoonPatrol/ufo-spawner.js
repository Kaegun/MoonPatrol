const UFO_STANDARD = 0;
const UFO_SCOUT = 1;
const UFO_BOMBER = 2;
const UFO_BOSS = 3;

const UFO_STATE_ALIVE = 0;
const UFO_STATE_DYING = 1;
const UFO_STATE_DEAD = 2;

class UfoSpawner {
    constructor() {
        this.sfx;
        this.levelWidth;

        this.initialize = function (sfx, levelWidth) {
            this.sfx = sfx;
            this.levelWidth = levelWidth;
        };

        this.spawnUfos = function (type, numUfos, numWaves) {
            switch (type) {
                case UFO_STANDARD:
                    return this.spawnUfoStandardWave(numUfos, numWaves);
                case UFO_SCOUT:
                    return this.spawnUfoScoutWave(numUfos, numWaves);
                case UFO_BOMBER:
                    return this.spawnUfoBomberWave(numUfos, numWaves);
                case UFO_BOSS:
                    return this.spawnUfoBossWave(numUfos, numWaves);
                default:
                    console.log(`Unknown UFO Type requested: ${type}`);
                    break;
            }
        };

        this.spawnUfoStandardWave = function (numUfos, numWaves) {
            // spawn a wave of x ufo fighters
            var ufos = [];
            for (var j = 0; j < numWaves; j++) {
                var startX = j * (this.levelWidth / numWaves + 1), startY = 150;
                for (var i = 0; i < numUfos; i++) {
                    var ufo = new UfoStandard();
                    if (i % 2 == 0) {
                        startY += 60;
                    } else {
                        startY -= 40;
                    }
                    startX -= 150;
                    ufo.initialize(startX, startY, this.sfx);
                    ufos.push(ufo);
                }
            }

            return ufos;
        };

        this.spawnUfoScoutWave = function (numUfos, numWaves) {
            return [];
        };

        this.spawnUfoBomberWave = function (numUfos, numWaves) {
            return [];
        };

        this.spawnUfoBossWave = function (numUfos, numWaves) {
            return [];
        };
    }
}