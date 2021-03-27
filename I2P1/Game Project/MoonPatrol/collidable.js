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
}