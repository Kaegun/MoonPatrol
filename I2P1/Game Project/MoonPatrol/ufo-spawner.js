const UFO_STANDARD = 0;
const UFO_SCOUT = 1;
const UFO_BOMBER = 2;
const UFO_BOSS = 3;

class UfoSpawner {

    static spawnUfos(sfx, levelWidth, type, numUfos, numWaves) {

        //  TODO: Need some defaults by UFO TYPE
        var ufos = [];
        for (var j = 0; j < numWaves; j++) {
            var startX = -j * (levelWidth / (numWaves + 1)) - 100 * (type + 1), startY = 150;
            console.log(`Ufo Start Positions: x:${startX}, y:${startY}`);
            for (var i = 0; i < numUfos; i++) {
                var ufo = UfoSpawner.createUfo(type);
                if (!ufo)
                    return ufos;    //  return empty array if ufo could not be created
                if (i % 2 == 0) {
                    startY += 60;
                } else {
                    startY -= 40;
                }
                startX -= 150;
                ufo.initialize(startX, startY, sfx, 1);
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