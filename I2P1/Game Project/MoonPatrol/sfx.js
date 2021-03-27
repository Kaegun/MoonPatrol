const SFX = [{ key: "smallExplosion", file: "/assets/sfx/explosionSmall.wav", },
{ key: "ufoBossExplosion", file: "/assets/sfx/explosionUfoBoss.wav", },
{ key: "rockExplosion", file: "/assets/sfx/explosionRocks.wav", },
{ key: "playerExplosion", file: "/assets/sfx/explosionPlayer.wav", },
{ key: "singleshot", file: "/assets/sfx/ShotSingle.wav", },
{ key: "multishot", file: "/assets/sfx/ShotMulti.wav", },
{ key: "playerDeath", file: "/assets/sfx/SFXARCADIAGameFinish10.wav", },
{ key: "jump", file: "/assets/sfx/jump.wav", },
{ key: "ufoStandardFlyBy", file: "/assets/sfx/ufoStandardFlyBy.wav", },
{ key: "ufoScoutFlyBy", file: "/assets/sfx/ufoScoutFlyBy.wav", },
{ key: "ufoScoutWarning", file: "/assets/sfx/ufoScoutWarningAlarm.wav", },

{ key: "extraLifePickup", file: "/assets/sfx/8BitRetroSFXPack1TraditionalGameStarting08.wav", },

//  Music Files
{ key: "menubgmusic", file: "/assets/music/Menu.mp3", },
{ key: "level1bgmusic", file: "/assets/music/Loop1.wav", },
];

class Sfx {
    constructor() {
        this.sfx = [];
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
        };

        this.playSound = function (key, loop) {
            var sound = this.findSoundFile(this.sfx, key);
            this.startPlayback(sound, loop);
        };

        this.isSoundPlaying = function (key) {
            var sound = this.findSoundFile(this.sfx, key);
            if (sound)
                return sound.isPlaying();
            else
                return false;
        };

        this.stopSound = function (key) {
            var sound = this.findSoundFile(this.sfx, key);
            this.stopPlayback(sound);
        };

        this.startPlayback = function (sound, loop) {
            if (this.soundOn) {
                if (sound) {
                    sound.play();
                    if (loop)
                        sound.setLoop(true);
                }
            }
        };

        this.stopPlayback = function (sound) {
            if (sound) {
                if (sound.isLooping())
                    sound.setLoop(false);
                if (sound.isPlaying())
                    sound.stop();

                console.log('after stopPlayback');
            }
        };

        this.toggleSound = function () {
            console.log(`toggleSound: ${this.soundOn}`);
            this.soundOn = !this.soundOn;
        };

        this.findSoundFile = function (sounds, key) {
            for (var i = 0; i < sounds.length; i++) {
                if (sounds[i].key == key)
                    return sounds[i].sound;
            }

            console.log(`soundFile [${key}] not found`);
            return null;
        };
    }
}