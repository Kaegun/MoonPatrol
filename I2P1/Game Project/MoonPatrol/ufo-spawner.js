const UFO_STANDARD = 0;
const UFO_SCOUT = 1;
const UFO_BOMBER = 2;
const UFO_BOSS = 3;

class UfoSpawner {

    static spawnUfos(sfx, levelWidth, type, numUfos, numWaves, speedFactor, floorPosY) {

        var ufos = [];
        for (var j = 0; j < numWaves; j++) {
            var startX = -j * (levelWidth / (numWaves + 1)), startY = (height - floorPosY) / 2;
            for (var i = 0; i < numUfos; i++) {
                var ufo = UfoSpawner.createUfo(type);
                if (!ufo)
                    return ufos;    //  return empty array if ufo could not be created
                if (i % 2 == 0) {
                    startY += random(20, ufo.speed * 10);
                } else {
                    startY -= random(10, ufo.speed * 6);
                }
                startX -= (random(50, 100) * (type + 1)) * ufo.speed;
                ufo.initialize(startX, startY, sfx, speedFactor, floorPosY);
                ufos.push(ufo);
            }
        }

        return ufos;
    }

    static createUfo(type) {
        switch (type) {
            case UFO_STANDARD:
                return new UfoStandard();
            case UFO_SCOUT:
                return new UfoScout();
            case UFO_BOMBER:
                return new UfoBomber();
            case UFO_BOSS:
                return new UfoBoss();
            default:
                console.log(`Unknown UFO Type requested: ${type}`);
                return null;
        }
    }
}