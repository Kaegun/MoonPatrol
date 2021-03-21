const SFX = [{ key: "explosion", file: "/assets/sfx/8BitRetroSFXPack1ContemporaryExplosion03.wav", },
{ key: "bullet", file: "/assets/sfx/ShotSingle.wav", },
{ key: "playerDeath", file: "/assets/sfx/SFXARCADIAGameFinish10.wav", },
{ key: "extraLifePickup", file: "/assets/sfx/8BitRetroSFXPack1TraditionalGameStarting08.wav", }];

const MUSIC = [{ key: "level1bgmusic", file: "/assets/music/Loop1.wav", },
];

class Sfx {
    constructor() {
        this.sfx = [];
        this.music = [];
        this.sfxVolume = 0.1;
        this.musicVolume = 0.3;
        this.soundOn = true;

        this.initialize = function () {
            soundFormats('mp3', 'wav');

            for (var i = 0; i < SFX.length; i++) {
                var sound = loadSound(SFX[i].file);
                sound.setVolume(this.sfxVolume);
                this.sfx.push({ key: SFX[i].key, sound: sound });
                console.log(`sfx [${SFX[i].file}] loaded`);
            }

            for (var i = 0; i < MUSIC.length; i++) {
                var sound = loadSound(MUSIC[i].file);
                sound.setVolume(this.musicVolume);
                sound.setLoop(true);
                this.music.push({ key: MUSIC[i].key, sound: sound });
                console.log(`music [${MUSIC[i].file}] loaded`);
            }
        };

        this.playSound = function (key) {
            if (this.soundOn) {
                var idx = this.findSoundFile(this.sfx, key);
                if (idx < 0) {
                    console.log(`sfx key not found: [${key}]`);
                    return;
                }

                console.log(`playing sfx:[${key}]-[${idx}]: [${this.sfx.length}]`);
                console.log(`playing sfx: ${this.sfx[idx]}`);

                this.sfx[idx].sound.play();

                console.log('after playSound');
            }
        };

        this.playMusic = function (key) {
            if (this.soundOn) {
                var idx = this.findSoundFile(this.music, key);
                if (idx < 0) {
                    console.log(`music key not found: [${key}]`);
                    return;
                }

                console.log(`playing music:[${key}]-[${idx}]: [${this.music.length}]`);
                console.log(`playing music: ${this.music[idx]}`);

                this.music[idx].sound.play();

                console.log('after playMusic');
            }
        };

        this.stopMusic = function (key) {
            var idx = this.findSoundFile(this.music, key);
            if (idx < 0) {
                console.log(`music key not found: [${key}]`);
                return;
            }

            console.log(`stopping music:[${key}]-[${idx}]: [${this.music.length}]`);
            console.log(`stopping music: ${this.music[idx]}`);

            if (this.music[idx].sound.isPlaying())
                this.music[idx].sound.stop();

            console.log('after stopMusic');
        };

        this.toggleSound = function () {
            console.log(`toggleSound: ${this.soundOn}`);
            this.soundOn = !this.soundOn;
        };

        this.findSoundFile = function (sounds, key) {
            for (var i = 0; i < sounds.length; i++) {
                if (sounds[i].key == key)
                    return i;
            }
            return -1;
        };
    }
}