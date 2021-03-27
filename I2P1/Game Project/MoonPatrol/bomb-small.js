const BOMB_SMALL_RADIUS = 15;

class BombSmall {
    constructor() {
        this.position;
        this.sfx;
        this.speed;
        this.startY;
        this.floorPosY;
        this.flashing = false;

        this.initialize = function (x, y, speed, floorPosY, sfx) {
            this.position = createVector(x, y);
            this.startY = y;
            this.sfx = sfx;
            this.speed = speed;
            this.floorPosY = floorPosY;
        };

        this.update = function (scrollPos) {
            //  move the bomb downwards
            //  lerp the forward speed to the height off the ground
            var xSpeed = lerp(0, this.speed, (abs(this.floorPosY - this.position.y) / this.startY));
            var velocity = createVector(xSpeed, 10);
            this.position.add(velocity);
            this.flashing = frameCount % 20 == 0 ? !this.flashing : this.flashing;
        };

        this.draw = function () {
            noStroke();
            fill(0, 255, 0);
            ellipse(this.position.x, this.position.y, BOMB_SMALL_RADIUS, BOMB_SMALL_RADIUS);
            if (this.flashing)
                fill(255, 0, 0);
            else
                fill(0, 0, 255);
            ellipse(this.position.x, this.position.y, BOMB_SMALL_RADIUS / 3, BOMB_SMALL_RADIUS / 3);
        };
    }
}