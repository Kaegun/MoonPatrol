const SFX = [{ file: "/assets/sfx/8BitRetroSFXPack1_Contemporary_Explosion03.wav", volume: 0.1 },
];

class Sfx {
    constructor() {
        this.sfx = [];

        this.initialize = function () {
            soundFormats('mp3', 'wav');

            for (var i = 0; i < SFX.length; i++) {
                var sound = loadSound(SFX[i].file);
                sound.setVolume(SFX[i].volume);
                this.sfx.push(sound);
                console.log(`sound [${SFX[i].file}] loaded`);
            }
        }

        this.playSound = function (idx) {
            console.log(`playing sound: [${idx}]: [${this.sfx.length}]`);
            console.log(`playing sound: ${this.sfx[idx]}`);
            if (idx < this.sfx.length)
                this.sfx[idx].play();
            
            console.log('after playSound');
        }
    }
}