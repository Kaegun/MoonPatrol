//  constants
const BUGGY_STATE_ALIVE = 0;
const BUGGY_STATE_DYING = 1;
const BUGGY_STATE_DEAD = 2;

const BUGGY_CENTER_HEIGHT = 60;

const BUGGY_DEATH_LOOP = 100;

const BUGGY_MAX_BULLETS = 10;
const BUGGY_MAX_SPEED = 8;
const BUGGY_MIN_SPEED = 2;
const BUGGY_JUMP_SPEED = 10;
const BUGGY_MAX_JUMP = 140;
const BUGGY_JUMPJET_FACTOR = 1.5;
const BUGGY_PLUMMET_SPEED = 10;

const BUGGY_COLLISION_BOUND = 60;

class Buggy {
    constructor() {

        //  position is at the approximate center of the buggy, to help with collision and fall detection
        this.position;
        this.worldPosition;
        this.velocity;
        this.floorPosY;
        this.speed = BUGGY_MIN_SPEED;
        this.deathCounter = 0;

        this.color;
        this.cockpitColor;
        this.cockpitLineColor;
        this.colorIdx;
        this.availableColors = [];

        this.wheels = [];

        this.bulletsUp = [];
        this.bulletsFwd = [];
        this.missiles = [];
        this.shield;
        this.jumpJetParticles = [];

        this.sfx;
        this.explosion;

        //  states
        this.state = BUGGY_STATE_ALIVE;
        this.multishot = false;  //  single or multishot turret
        this.multishotActivated = false;
        this.jumpJets = false;
        this.jumpJetsActivated = false;
        this.multishotTimer = 0;
        this.missileCount = 0;
        this.shieldTimer = 0;
        this.jumpJetsTimer = 0;
        this.acelerating = false;
        this.decelerating = false;
        this.jumping = false;
        this.falling = false;
        this.plummeting = false;
        this.lives = 3;

        this.initialize = function (startX, floorPosY, sfx) {

            this.sfx = sfx;
            this.availableColors.push(color(153, 50, 204)); //  DarkOrchid
            this.availableColors.push(color(85, 107, 47)); //  DarkOliveGreen
            this.availableColors.push(color(255, 140, 0)); //  DarkOrange
            this.availableColors.push(color(95, 158, 160)); //  CadetBlue
            this.availableColors.push(color(25, 25, 112)); //  MidnightBlue
            this.availableColors.push(color(47, 79, 79)); //  DarkSlateGrey
            this.availableColors.push(color(128, 0, 0)); //  Maroon

            this.colorIdx = 0;
            this.setActiveColor();

            this.cockpitLineColor = color(255, 255, 255, 150);
            this.cockpitColor = color(0, 255, 255, 150);

            //  Set floor height to initial value.
            this.floorPosY = floorPosY - BUGGY_CENTER_HEIGHT;
            this.position = createVector(startX, this.floorPosY);
            this.worldPosition = this.position.copy();
            this.velocity = createVector(0, 0);

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
        };

        this.reset = function (startX, floorPosY) {
            //  clear array objects
            clearArray(this.wheels);
            clearArray(this.bulletsFwd);
            clearArray(this.bulletsUp);
            clearArray(this.missiles);
            clearArray(this.jumpJetParticles);
            clearArray(this.availableColors);

            //  clear other objects
            this.explosion = null;
            this.shield = null;

            //  clear state flags and counters
            this.state = BUGGY_STATE_ALIVE;
            this.multishot = false;
            this.multishotActivated = false;
            this.jumpJets = false;
            this.jumpJetsActivated = false;
            this.multishotTimer = 0;
            this.missileCount = 0;
            this.shieldTimer = 0;
            this.jumpJetsTimer = 0;
            this.acelerating = false;
            this.decelerating = false;
            this.jumping = false;
            this.falling = false;
            this.plummeting = false;

            this.initialize(startX, floorPosY, this.sfx);
        };

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
            stroke(this.cockpitLineColor);
            fill(this.cockpitColor);
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
                if (this.bulletsUp[i].xVelocity == 0) {
                    rect(this.bulletsUp[i].position.x, this.bulletsUp[i].position.y, 4, 10);
                } else if (this.bulletsUp[i].xVelocity < 0) {
                    quad(this.bulletsUp[i].position.x, this.bulletsUp[i].position.y,
                        this.bulletsUp[i].position.x + 4, this.bulletsUp[i].position.y,
                        this.bulletsUp[i].position.x + 8, this.bulletsUp[i].position.y + 10,
                        this.bulletsUp[i].position.x + 4, this.bulletsUp[i].position.y + 10);
                } else {
                    quad(this.bulletsUp[i].position.x, this.bulletsUp[i].position.y,
                        this.bulletsUp[i].position.x + 4, this.bulletsUp[i].position.y,
                        this.bulletsUp[i].position.x - 4, this.bulletsUp[i].position.y + 10,
                        this.bulletsUp[i].position.x - 8, this.bulletsUp[i].position.y + 10);
                }
            }

            for (var i = 0; i < this.bulletsFwd.length; i++)
                rect(this.bulletsFwd[i].position.x, this.bulletsFwd[i].position.y, 10, 3);

            //  TODO: draw the missiles

            //  TODO: draw the jumpJet particles
            for (var i = 0; i < this.jumpJetParticles.length; i++) {
                this.jumpJetParticles[i].draw();
            }

            //  draw the shield
            if (this.shield && this.shield.alive())
                this.shield.draw();

            //  draw the dying explosion
            if (this.state == BUGGY_STATE_DYING && this.explosion) {
                this.explosion.draw();
            }

            pop();
        };

        this.update = function (scrollPos) {
            this.worldPosition.x = this.position.x + scrollPos;
            //  Move any bullets or other projectiles
            for (var i = this.bulletsUp.length - 1; i >= 0; i--) {
                var velocity = createVector(this.bulletsUp[i].xVelocity, -20);
                this.bulletsUp[i].position.add(velocity);

                if (this.bulletsUp[i].position.y < 0)
                    this.bulletsUp.splice(i, 1);
            }

            for (var i = this.bulletsFwd.length - 1; i >= 0; i--) {
                this.bulletsFwd[i].position.x += 20;
                if (this.bulletsFwd[i].position.x > width)
                    this.bulletsFwd.splice(i, 1);
            }

            //  if jumping, the wheels are up, when falling or plummeting, the wheels are down
            if (this.falling || this.plummeting) {
                for (var i = 0; i < this.wheels.length; i++) {
                    this.wheels[i].y = 58;
                }
            } else if (this.jumping) {
                for (var i = 0; i < this.wheels.length; i++) {
                    this.wheels[i].y = 40;
                }
            }
            else if (this.state == BUGGY_STATE_ALIVE) {
                //  make the wheels wobble randomly, use the current speed to determine bounce speed
                var bounceSpeed = round(BUGGY_MAX_SPEED * 1.5 - this.speed);
                if (frameCount % bounceSpeed == 0) {
                    for (var i = 0; i < this.wheels.length; i++) {
                        this.wheels[i].y = random(47, 53);
                    }
                }
            }

            switch (this.state) {
                case BUGGY_STATE_ALIVE:
                    //  update the shield
                    if (this.shield) {
                        if (this.shield.alive()) {
                            this.shield.update(this.velocity);
                            this.shieldTimer = this.shield.lifetime;
                        }
                        else {
                            //  reset the shield when it runs out.
                            this.shield = null;
                        }
                    }

                    //  update the multishot counter
                    if (this.multishotActivated) {
                        if (--this.multishotTimer <= 0) {
                            this.multishotActivated = false;
                            this.multishot = false;
                            this.multishotTimer = 0;
                        }
                    }

                    //  Set the buggy's speed and position
                    if (this.acelerating) {
                        this.speed = min(BUGGY_MAX_SPEED, this.speed + 2);
                        if (this.position.x < width - width / 5)
                            this.velocity.x = this.speed;
                        else
                            this.velocity.x = 0;
                    } else if (this.decelerating) {
                        this.speed = max(BUGGY_MIN_SPEED, this.speed - 2);
                        if (this.position.x > width / 5)
                            this.velocity.x = -BUGGY_MAX_SPEED;
                        else
                            this.velocity.x = 0;
                    }
                    else {
                        this.speed = max(BUGGY_MIN_SPEED, this.speed - 2);
                        this.velocity.x = 0;
                    }

                    if (this.jumping) {
                        var jumpSpeed = BUGGY_JUMP_SPEED;
                        var jumpHeight = BUGGY_MAX_JUMP;
                        if (this.jumpJets) {
                            jumpHeight *= 2;
                            jumpSpeed *= this.falling ? 1 : BUGGY_JUMPJET_FACTOR;
                            this.jumpJetsActivated = true;
                            for (var i = 0; i < this.jumpJets.length; i++) {
                                var jumpSpeedY = BUGGY_JUMP_SPEED * BUGGY_JUMP_SPEED;
                                var jumpSpeedX = this.velocity.x;
                                //  TODO: Update emitter to attach to a moving object
                                this.jumpJetParticles[i].update(createVector(jumpSpeedX, jumpSpeedY));
                            }
                        }

                        if (this.position.y <= this.floorPosY - jumpHeight)
                            this.falling = true;
                        if (this.falling) {

                            //  we're back on the ground
                            if (this.position.y >= this.floorPosY) {
                                this.jumping = false;
                                this.falling = false;
                                this.velocity.y = 0;
                                this.position.y = this.floorPosY;
                            }
                            else {
                                this.velocity.y = jumpSpeed;
                            }
                        }
                        else {
                            this.velocity.y = -jumpSpeed;
                        }
                    }

                    if (this.jumpJetsActivated && --this.jumpJetsTimer <= 0) {
                        this.jumpJets = false;
                        this.jumpJetsActivated = false;
                        this.jumpJetsTimer = 0;
                    }

                    break;
                case BUGGY_STATE_DYING:
                    //  Falling into a crater
                    if (this.plummeting) {
                        this.velocity.y = BUGGY_PLUMMET_SPEED;
                        if (this.position.y > this.floorPosY + 90)
                            this.state = BUGGY_STATE_DEAD;
                    }
                    //  blow up the buggy if destroyed by being hit
                    else if (this.explosion.alive()) {
                        var wheelDeltaY = ++this.deathCounter > BUGGY_DEATH_LOOP / 2 ? 10 : -10;
                        this.wheels[0].x -= 10;
                        this.wheels[0].y += wheelDeltaY;
                        this.wheels[1].y += wheelDeltaY;
                        this.wheels[2].x += 10;
                        this.wheels[2].y += wheelDeltaY;

                        this.explosion.update();

                        var lerpIdx = this.deathCounter / BUGGY_DEATH_LOOP;
                        this.color = lerpColor(this.availableColors[this.colorIdx],
                            color(0, 0, 0),
                            lerpIdx);
                        this.cockpitLineColor = lerpColor(color(255, 255, 255, 150),
                            color(0, 0, 0),
                            lerpIdx);
                        this.cockpitColor = lerpColor(color(0, 255, 255, 150),
                            color(0, 0, 0),
                            lerpIdx);
                    }
                    else {
                        this.state = BUGGY_STATE_DEAD;
                    }
                    break;
                case BUGGY_STATE_DEAD:
                    this.deathCounter = 0;
                    this.velocity.x = this.velocity.y = 0;
                    //  Reset explosion, etc.
                    break;
            }

            //  Always add the buggy's velocity
            this.position.add(this.velocity);
        };

        this.accelerate = function (acelerating) {
            this.acelerating = acelerating;
        };

        this.decelerate = function (decelerating) {
            this.decelerating = decelerating;
        };

        this.jump = function () {
            if (!this.jumping && !this.plummeting) {
                if (this.jumpJets) {
                    //  Play something else when we have jets?
                    this.sfx.playSound("jumpJets");
                    var jj = new ParticleEmitter();
                    jj.initialize(this.position.x, this.position.y, 2, 8, color(128, 128, 128, 100), 3, 80, 60, PS_DOWN, false);
                    this.jumpJetParticles.push(jj);
                }
                else
                    this.sfx.playSound("jump");
            }
            this.jumping = true;
        };

        this.fireTurrets = function () {
            //  Can't shoot when you're dead
            if (this.state != BUGGY_STATE_ALIVE)
                return;

            //  Add bullet to up and forward turret (to maximum)
            var fired = false;
            var maxBullets = this.multishot ? BUGGY_MAX_BULLETS * 2 : BUGGY_MAX_BULLETS;
            if (this.bulletsUp.length < maxBullets) {
                this.bulletsUp.push({
                    position: createVector(this.position.x - 80, this.position.y - 50),
                    xVelocity: 0,
                });
                if (this.multishot) {
                    this.bulletsUp.push({
                        position: createVector(this.position.x - 90, this.position.y - 50),
                        xVelocity: -10,
                    });
                    this.bulletsUp.push({
                        position: createVector(this.position.x - 70, this.position.y - 50),
                        xVelocity: 10,
                    });
                }
                fired = true;
            }
            if (this.bulletsFwd.length < BUGGY_MAX_BULLETS) {
                this.bulletsFwd.push({ position: createVector(this.position.x + 155, this.position.y + 18) });
                fired = true;
            }
            if (fired) {
                if (this.multishot) {
                    this.sfx.playSound("multishot");
                    this.multishotActivated = true;
                }
                else
                    this.sfx.playSound("singleshot");
            }
        };

        this.fireMissile = function () { };

        this.activateShield = function () {
            if (this.shieldTimer > 0 && !this.shield) {
                this.shield = new Shield();
                this.shield.initialize(this.position.x, this.position.y, 340, this.shieldTimer);
            }
        };

        this.destroy = function () {
            this.state = BUGGY_STATE_DYING;
            this.lives = max(0, this.lives - 1);

            this.explosion = new Explosion();
            this.explosion.initialize(this.position.x, this.position.y);

            this.sfx.playSound("playerExplosion");
        };

        this.setPlummeting = function (plummet) {
            if (!this.plummeting && plummet) {
                this.plummeting = true;
                this.state = BUGGY_STATE_DYING;
                this.lives = max(0, this.lives - 1);
                //  Play a falling sound
                this.sfx.playSound("gameOver");
            }
        }

        this.setActiveColor = function () {
            this.color = this.availableColors[this.colorIdx];
        };

        this.setPowerUp = function (pickup) {
            switch (pickup.pickupType) {
                case PICKUP_LIFE:
                    this.lives++;
                    break;
                case PICKUP_MISSILES:
                    this.missileCount += pickup.getValue();
                    break;
                case PICKUP_MULTISHOT:
                    this.multishot = true;
                    this.multishotTimer += pickup.getValue();
                    break;
                case PICKUP_SHIELD:
                    this.shieldTimer += pickup.getValue();
                    break;
                case PICKUP_JUMPJETS:
                    this.jumpJets = true;
                    this.jumpJetsTimer += pickup.getValue();
                    break;
            }
        };

        this.alive = function () {
            return this.state != BUGGY_STATE_DEAD;
        };

        //  Need to display health too
        this.getShieldTimer = function () {
            return this.shieldTimer;
        };

        this.getMultishotTimer = function () {
            return this.multishot ? this.multishotTimer : 0;
        };

        this.getMissileCount = function () {
            return this.missileCount;
        };

        this.getJumpJetTimer = function () {
            return this.jumpJets ? this.jumpJetsTimer : 0;
        };
    }
}