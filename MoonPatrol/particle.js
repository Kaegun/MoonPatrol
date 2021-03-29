//  Properly designed we can use the particle system for smoke, jump trails, explosions and volcanic eruptions.
//  Need to give the PS a direction, and a magnitude.
const PS_UP = 0;
const PS_DOWN = 1;
const PS_LEFT = 2;
const PS_RIGHT = 3;
const PS_MIDDLE = 4;
const PS_NOLOOP = 1;

class Particle {
    constructor() {
        this.position;
        this.velocity;
        this.color;
        this.size;
        this.age = 0;

        this.initialize = function (x, y, xSpeed, ySpeed, color, size) {
            this.position = createVector(x, y);
            this.velocity = createVector(xSpeed, ySpeed);
            this.size = size;
            this.color = color;
        };

        this.update = function () {
            //  Update position using velocity
            this.position.add(this.velocity);
            this.age++;
        };

        this.draw = function () {
            noStroke();
            fill(this.color);
            ellipse(this.position.x, this.position.y, this.size, this.size);
        };
    }
}

class ParticleEmitter {
    constructor() {
        this.position;
        this.velocity;
        this.color;
        this.size;
        this.lifetime;
        this.numParticles;
        this.created = false;
        this.direction = PS_UP;
        this.noloop = false;

        this.particles = [];

        this.initialize = function (x, y, xSpeed, ySpeed, color, size, numParticles, lifetime, direction, loop) {
            this.position = createVector(x, y);
            this.velocity = createVector(xSpeed, ySpeed);
            this.color = color;
            this.size = size;
            this.numParticles = numParticles;
            this.lifetime = lifetime;
            this.direction = direction;
            this.noloop = !loop ? false : (loop == PS_NOLOOP);

            //  Create the initial particles
            this.createParticles();
        };

        this.update = function (moveVector) {
            this.killParticles();

            if (moveVector) {
                push();
                translate(moveVector);
                this.updateParticles();
                pop();
            }
            else {
                this.updateParticles();
            }

            this.createParticles();
        };

        this.updateParticles = function () {
            for (var i = 0; i < this.particles.length; i++) {
                this.particles[i].update();
            }
        };

        this.draw = function () {
            for (var i = 0; i < this.particles.length; i++) {
                this.particles[i].draw();
            }
        };

        this.calculateParticleSpeed = function () {
            //  speeds vary depending on direction of particle system
            var pSpeedX = 0, pSpeedY = 0;
            switch (this.direction) {
                case PS_UP:
                    pSpeedX = random(-this.velocity.x, this.velocity.x);
                    pSpeedY = -random(0, this.velocity.y);
                    break;
                case PS_DOWN:
                    pSpeedX = random(-this.velocity.x, this.velocity.x);
                    pSpeedY = -random(0, this.velocity.y);
                    break;
                case PS_LEFT:
                    pSpeedX = -random(0, this.velocity.x);
                    pSpeedY = random(-this.velocity.y, this.velocity.y);
                    break;
                case PS_RIGHT:
                    pSpeedX = random(0, this.velocity.x);
                    pSpeedY = random(-this.velocity.y, this.velocity.y);
                    break;
                case PS_MIDDLE:
                    pSpeedX = random(-this.velocity.x, this.velocity.x);
                    pSpeedY = random(-this.velocity.y, this.velocity.y);
                    break;
            }

            return createVector(pSpeedX, pSpeedY);
        };

        this.createParticles = function () {
            if (!this.noloop || this.noloop && !this.created) {
                for (var i = this.particles.length; i < this.numParticles; i++) {
                    var p = new Particle();
                    var px = random(this.position.x - 5, this.position.x + 5);
                    var py = random(this.position.y - 5, this.position.y + 5);

                    var pSpeed = this.calculateParticleSpeed();
                    var pSize = random(1, this.size);
                    p.initialize(px, py, pSpeed.x, pSpeed.y, this.color, pSize);
                    this.particles.push(p);
                }
                this.created = true;
            }
        };

        this.killParticles = function () {
            for (var i = this.particles.length - 1; i >= 0; i--) {
                if (this.particles[i].age > random(0, this.lifetime))
                    this.particles.splice(i, 1);
            }
        };

        this.alive = function () {
            return this.particles.length > 0;
        };
    }
}