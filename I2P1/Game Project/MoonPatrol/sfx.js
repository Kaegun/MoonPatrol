const SFX = [
    { key: "smallExplosion", file: "/assets/sfx/explosionSmall.wav", },
    { key: "mediumExplosion", file: "/assets/sfx/explosionMedium.wav", },
    { key: "largeExplosion", file: "/assets/sfx/explosionUfoBoss.wav", },
    { key: "smallImpact", file: "/assets/sfx/smallImpact.wav", },
    { key: "mediumImpact", file: "/assets/sfx/DeepExplosion02.wav", },
    { key: "largeImpact", file: "/assets/sfx/LargeImpact.wav", },
    { key: "mediumDebris", file: "/assets/sfx/MediumDebris.wav", },
    { key: "playerExplosion", file: "/assets/sfx/explosionPlayer.wav", },
    { key: "singleshot", file: "/assets/sfx/ShotSingle.wav", },
    { key: "multishot", file: "/assets/sfx/ShotMulti.wav", },
    { key: "shotSmallBomb", file: "/assets/sfx/ShotSmallBomb.wav", },
    { key: "shotMediumBomb", file: "/assets/sfx/ShotMediumBomb.wav", },
    { key: "shotLargeBomb", file: "/assets/sfx/ShotLargeBomb.wav", },
    { key: "playerDeath", file: "/assets/sfx/SFXARCADIAGameFinish10.wav", },
    { key: "jump", file: "/assets/sfx/jump.wav", },
    { key: "jumpJets", file: "/assets/sfx/JumpJets.wav", },
    { key: "ufoStandardFlyBy", file: "/assets/sfx/ufoStandardFlyBy.wav", },
    { key: "ufoScoutFlyBy", file: "/assets/sfx/ufoScoutFlyBy.wav", },
    { key: "ufoBomberFlyBy", file: "/assets/sfx/ufoBomberFlyBy.wav", },
    { key: "ufoBossFlyBy", file: "/assets/sfx/ufoMothershipFlyBy.wav", },
    { key: "ufoScoutWarning", file: "/assets/sfx/ufoScoutWarningAlarm.wav", },
    { key: "ufoBossWarning", file: "/assets/sfx/ufoMothershipWarningAlarm.wav", },
    { key: "gameOver", file: "/assets/sfx/GameOver01.wav", },

    { key: "pickupCollected", file: "/assets/sfx/PickupCollected.wav", },
    { key: "pickupDropped", file: "/assets/sfx/PickupDropped.wav", },

    //  Music Files
    { key: "menubgmusic", file: "/assets/music/Menu.mp3", },
    { key: "defeatmusic", file: "/assets/music/Defeat.mp3", },
    { key: "gameovermusic", file: "/assets/music/GameOverLoop.wav", },
    { key: "victorymusic", file: "/assets/music/Triumph.mp3", },
    { key: "level1bgmusic", file: "/assets/music/Loop1.wav", },
    { key: "level2bgmusic", file: "/assets/music/Loop2.wav", },
    { key: "level3bgmusic", file: "/assets/music/Loop3.wav", },
];

class Sfx {
    constructor() {
        this.sfx = [];
        this.sfxVolume = 0.1;
        this.musicVolume = 0.3;
        this.soundOn = true;

        this.initialize = function (callback) {
            soundFormats('mp3', 'wav');

            for (var i = 0; i < SFX.length; i++) {
                var sound = loadSound(SFX[i].file, callback);
                sound.setVolume(this.sfxVolume);
                this.sfx.push({ key: SFX[i].key, sound: sound });
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
            if (this.soundOn && sound) {
                sound.play();
                if (loop)
                    sound.setLoop(true);
            }
        };

        this.stopPlayback = function (sound) {
            if (sound) {
                if (sound.isLooping())
                    sound.setLoop(false);
                if (sound.isPlaying())
                    sound.stop();
            }
        };

        this.toggleSound = function () {
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