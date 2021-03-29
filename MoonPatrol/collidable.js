const COLLIDABLE_STATE_ALIVE = 0;
const COLLIDABLE_STATE_DYING = 1;
const COLLIDABLE_STATE_DEAD = 2;

class Collidable {
    static alive(collidable) {
        return collidable.state != COLLIDABLE_STATE_DEAD;
    };

    static collision(collidable, collidor) {
        if (collidable.state == COLLIDABLE_STATE_ALIVE && Collidable.onScreen(collidable)) {
            return collidable.position.dist(collidor) < collidable.collisionRadius;
        }
        else return false;
    };

    static onScreen(collidable) {
        return !Collidable.offLeftEdge(collidable) && !Collidable.offRightEdge(collidable);
    };

    static offLeftEdge(collidable) {
        return collidable.position.x < -collidable.visibleRadius;
    }

    static offRightEdge(collidable) {
        return collidable.position.x > width + collidable.visibleRadius;
    }

    static doRightEdgeChecks(collidable, soundFile) {
        if (Collidable.offRightEdge(collidable)) {
            this.stopCollidableSound(collidable, soundFile);
        }
        else {
            this.playSoundOnScreen(collidable, soundFile);
        }
    }

    static doLeftEdgeChecks(collidable, soundFile) {
        if (Collidable.offLeftEdge(collidable)) {
            this.stopCollidableSound(collidable, soundFile);
        }
        else {
            this.playSoundOnScreen(collidable, soundFile);
        }
    }

    static stopCollidableSound(collidable, soundFile) {
        collidable.state = COLLIDABLE_STATE_DEAD;
        collidable.sfx.stopSound(soundFile);
        collidable.soundPlaying = false;
    }

    static playSoundOnScreen(collidable, soundFile) {
        if (Collidable.onScreen(collidable) && !collidable.soundPlaying) {
            //  Play ufo sound loop.
            collidable.sfx.playSound(soundFile, true);
            collidable.soundPlaying = true;
        }
    }
}