//  constants
const MAX_BULLETS = 20;
const STATE_ALIVE = 0;
const STATE_DYING = 1;
const STATE_DEAD = 2;
const DEATH_LOOP = 40;
const BUGGY_MAX_SPEED = 8;
const BUGGY_MIN_SPEED = 2;

class Buggy {
    constructor() {

        //  position is at the approximate center of the buggy, to help with collision and fall detection
        this.position;
        this.speed = BUGGY_MIN_SPEED;
        this.frameCounter = 0;

        this.color;
        this.colorIdx;
        this.availableColors = [];

        this.wheels = [];

        this.bulletsUp = [];
        this.bulletsFwd = [];
        this.missiles = [];
        this.multishot = true;  //  single or multishot turret
        this.shield;

        //  states
        this.state = STATE_ALIVE;
        this.deathCounter = 0;

        this.initialize = function (floorPos_y) {

            this.availableColors.push(color(153, 50, 204)); //  DarkOrchid
            this.availableColors.push(color(85, 107, 47)); //  DarkOliveGreen
            this.availableColors.push(color(255, 140, 0)); //  DarkOrange
            this.availableColors.push(color(95, 158, 160)); //  CadetBlue
            this.availableColors.push(color(25, 25, 112)); //  MidnightBlue
            this.availableColors.push(color(47, 79, 79)); //  DarkSlateGrey
            this.availableColors.push(color(128, 0, 0)); //  Maroon

            this.colorIdx = 0;
            this.setActiveColor();

            //  Set floor height to initial value.
            this.position = createVector(width / 2, floorPos_y - 60);

            this.wheels.push(this.createWheel(20));
            this.wheels.push(this.createWheel(70));
            this.wheels.push(this.createWheel(180));
        };

        this.createWheel = function (xPos) {
            return {
                x: xPos,
                y: 50,
                wheelColor: 0,
                rimColor: 125,
                wheelDiameter: 45,
                rimDiameter: 25
            };
        }

        this.draw = function () {

            push();

            stroke(88, 88, 88, 125);
            strokeWeight(2);
            fill(this.color);

            //  Main Body
            beginShape();

            var x = this.position.x - 120, y = this.position.y;
            vertex(x, y);
            vertex(x + 80, y);
            vertex(x + 140, y - 20);
            vertex(x + 160, y - 20);
            vertex(x + 240, y + 10);
            vertex(x + 240, y + 25);
            vertex(x + 210, y + 40);
            vertex(x - 10, y + 40);
            vertex(x - 20, y + 30);
            vertex(x - 20, y + 15);
            vertex(x, y);

            endShape();

            //  Cockpit
            stroke(255, 255, 255, 150);
            fill(0, 255, 255, 150);
            beginShape();

            vertex(x + 85, y + 5);
            vertex(x + 145, y - 15);
            vertex(x + 155, y - 15);
            vertex(x + 225, y + 10);
            vertex(x + 85, y + 5);

            endShape();

            //  Turret
            stroke(88, 88, 88, 150);
            fill(0);

            rect(x + 20, y, 40, 5);
            rect(x + 30, y - 15, 20, 20);
            rect(x + 35, y - 40, 10, 25);

            //  Forward Gun
            rect(x + 200, y + 13, 50, 10);
            rect(x + 230, y + 15, 35, 7);

            //  Wheels
            strokeWeight(3);
            stroke(88, 88, 88, 150);
            for (var i = 0; i < this.wheels.length; i++) {
                fill(this.wheels[i].wheelColor);
                ellipse(x + this.wheels[i].x, y + this.wheels[i].y, this.wheels[i].wheelDiameter);

                fill(this.wheels[i].rimColor);
                ellipse(x + this.wheels[i].x, y + this.wheels[i].y, this.wheels[i].rimDiameter);
            }

            //  bullets
            for (var i = 0; i < this.bulletsUp.length; i++) {
                stroke(255, 215, 0, 170);
                fill(220, 20, 60);
                rect(this.bulletsUp[i].x, this.bulletsUp[i].y, 4, 10);
                if (this.multishot) {
                    quad(this.bulletsUp[i].left_x, this.bulletsUp[i].y,
                        this.bulletsUp[i].left_x + 4, this.bulletsUp[i].y,
                        this.bulletsUp[i].left_x + 8, this.bulletsUp[i].y + 10,
                        this.bulletsUp[i].left_x + 4, this.bulletsUp[i].y + 10);
                    quad(this.bulletsUp[i].right_x, this.bulletsUp[i].y,
                        this.bulletsUp[i].right_x + 4, this.bulletsUp[i].y,
                        this.bulletsUp[i].right_x - 4, this.bulletsUp[i].y + 10,
                        this.bulletsUp[i].right_x - 8, this.bulletsUp[i].y + 10);
                }
            }

            for (var i = 0; i < this.bulletsFwd.length; i++)
                rect(this.bulletsFwd[i].x, this.bulletsFwd[i].y, 10, 3);

            if (this.shield && this.shield.alive())
                this.shield.draw();

            pop();
        };

        this.update = function () {
            //  Move any bullets or other projectiles
            for (var i = this.bulletsUp.length - 1; i >= 0; i--) {
                this.bulletsUp[i].y -= 20;
                this.bulletsUp[i].left_x -= 10;
                this.bulletsUp[i].right_x += 10;

                if (this.bulletsUp[i].y < 0)
                    this.bulletsUp.splice(i, 1);
            }

            for (var i = this.bulletsFwd.length - 1; i >= 0; i--) {
                this.bulletsFwd[i].x += 20;
                if (this.bulletsFwd[i].x > width)
                    this.bulletsFwd.splice(i, 1);
            }

            switch (this.state) {
                case STATE_ALIVE:
                    //  make the wheels wobble randomly - TODO: use the current speed to determine bounce speed
                    if (++this.frameCounter % 10 == 0) {
                        for (var i = 0; i < this.wheels.length; i++) {
                            this.wheels[i].y = random(47, 53);
                        }
                    }
                    //  update the shield
                    if (this.shield && this.shield.alive())
                        this.shield.update();
                    break;
                case STATE_DYING:
                    //  blow up the buggy
                    console.log(`dying: ${this.deathCounter}`);
                    if (this.deathCounter++ < DEATH_LOOP) {
                        var wheel_delta_y = this.deathCounter > DEATH_LOOP / 2 ? 10 : -10;
                        this.wheels[0].x -= 10;
                        this.wheels[0].y += wheel_delta_y;
                        // this.wheels[1].x -= 3;
                        this.wheels[1].y += wheel_delta_y;
                        this.wheels[2].x += 10;
                        this.wheels[2].y += wheel_delta_y;
                    }
                    else {
                        this.state = STATE_DEAD;
                        this.deathCounter = 0;
                    }
                    break;
                case STATE_DEAD:
                    break;
            }
        };

        this.accelerate = function () {
            this.speed = min(BUGGY_MAX_SPEED, this.speed + 2);
        };

        this.decelerate = function () {
            this.speed = max(BUGGY_MIN_SPEED, this.speed - 2);
        };

        this.jump = function () { };

        this.fireTurrets = function () {
            //  Add bullet to up and forward turret (max 20 bullets)
            if (this.bulletsUp.length < MAX_BULLETS) {
                this.bulletsUp.push({
                    x: this.position.x - 80,
                    left_x: this.position.x - 90,
                    right_x: this.position.x - 70,
                    y: this.position.y - 50
                });
            }
            if (this.bulletsFwd.length < MAX_BULLETS) {
                this.bulletsFwd.push({ x: this.position.x + 155, y: this.position.y + 18 });
            }
        };

        this.fireMissile = function () { };

        this.activateShield = function () {
            this.shield = new Shield();
            this.shield.initialize(this.position.x, this.position.y, 300, 80);
        };

        this.destroy = function () {
            this.state = STATE_DYING;
            this.lives = max(0, this.lives - 1);
        };

        this.setActiveColor = function () {
            this.color = this.availableColors[this.colorIdx];
        };
    }
}