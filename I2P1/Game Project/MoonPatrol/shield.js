class Shield {
    constructor() {
        this.position;
        this.diameter;
        this.maxDiameter;
        this.lifetime = 0;
        this.growLifetime = 0;
        this.growth = 0;
        this.shrinkLifetime = 0;
        this.shrinkage = 0;
        this.health = 0;

        this.initialize = function (x, y, diameter, lifetime) {
            this.position = createVector(x, y);
            this.maxDiameter = diameter;
            this.lifetime = lifetime;
            //  create a grow and shrink effect for the shield
            this.growLifetime = floor(lifetime / 10);
            this.shrinkLifetime = floor(lifetime / 10);
            this.health = max(ceil(lifetime / 20), 1);
        };

        this.update = function (moveVector) {
            //  reduce the lifetime of the shield
            this.lifetime--;
            //  grow or shrink the shield
            if (this.growth < this.growLifetime) {
                this.diameter = this.maxDiameter * (++this.growth / this.growLifetime);
            }
            else if (this.lifetime < this.shrinkLifetime) {
                this.diameter = this.maxDiameter * (1 - (++this.shrinkage / this.shrinkLifetime));
            }

            console.log(`${this.diameter} | ${this.maxDiameter} | ${this.growth} | ${this.growLifetime} | ${this.shrinkage} | ${this.shrinkLifetime}`);
            //  move the shield by the moveVector (e.g. it's on a vehicle)
            this.position.add(moveVector);
        };

        //  draw a oscillating shield?
        this.draw = function () {
            if (this.lifetime > 0) {
                push();

                stroke(255, 255, 0);
                fill(192, 192, 192, 60);
                ellipse(this.position.x, this.position.y, this.diameter);

                var smaller = this.diameter * 2 / 3;
                noStroke();
                fill(230, 230, 250, 70);
                ellipse(this.position.x, this.position.y, smaller);

                var smallest = smaller * 2 / 3;
                fill(240, 248, 255, 80);
                ellipse(this.position.x, this.position.y, smallest);

                pop();
            }
        };

        this.alive = function () {
            return this.health > 0 && this.lifetime > 0;
        };

        this.applyDamage = function (damage) {
            this.health = max(0, this.health - damage);
        }

        this.getRadius = function () {
            return this.diameter / 2;
        };
    }
}
