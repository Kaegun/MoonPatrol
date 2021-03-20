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

        this.particles = [];

        this.initialize = function (x, y, xSpeed, ySpeed, color, size, numParticles, lifetime) {
            this.position = createVector(x, y);
            this.velocity = createVector(xSpeed, ySpeed);
            this.color = color;
            this.size = size;
            this.numParticles = numParticles;
            this.lifetime = lifetime;
        };

        this.update = function () {
            this.killParticles();

            for (var i = 0; i < this.particles.length; i++) {
                this.particles[i].update();
            }

            this.createParticles();
        };

        this.draw = function () {
            for (var i = 0; i < this.particles.length; i++) {
                {
                    this.particles[i].draw();
                }
            }
        };

        this.createParticles = function () {
            for (var i = 0; i < this.numParticles - this.particles.length; i++) {
                var p = new Particle();
                var px = random(this.position.x - 5, this.position.x + 5);
                var py = random(this.position.y - 5, this.position.y + 5);
                var pSpeedX = random(-this.velocity.x, this.velocity.x);
                var pSpeedY = random(this.velocity.y - 2, this.velocity.y + 2);
                var pSize = random(max(this.size, this.size - 3), this.size + 3);
                p.initialize(px, py, pSpeedX, pSpeedY, this.color, pSize);
                this.particles.push(p);
            }
        };

        this.killParticles = function () {
            for (var i = this.particles.length - 1; i >= 0; i--) {
                if (this.particles[i].age > this.lifetime)
                    this.particles.splice(i, 1);
            }
        };
    }
}