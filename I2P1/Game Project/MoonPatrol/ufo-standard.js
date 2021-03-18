function spawnUfoStandardWave(numUfos, ufos) {
    // spawn a wave of x ufo fighters
    for (var i = 0; i < numUfos; i++) {
        var ufo = new UfoStandard();
        ufo.initialize(300, 150);
        ufos.push(ufo);
    }
}

class UfoStandard {
    constructor() {
        this.position;
        this.sideLen = 60;
        this.sphereDiameter = 30;
        this.rotation = 0;
        this.direction = 1;
        this.forwardSpeed = 4;
        this.climbSpeed = 3;
        this.max_y;
        this.min_y;

        this.initialize = function (x, y) {
            this.position = createVector(x, y);
            this.max_y = y + 50;
            this.min_y = y - 50;
        };

        this.update = function () {
            //  move the Ufo - needs to be a predictable pattern, so it doesn't clash with others
            this.rotation++;
            if (this.position.y > 180)
                this.direction = -1;
            else if (this.position.y < 120)
                this.direction = 1;
            this.position.add(createVector(this.forwardSpeed, this.climbSpeed * this.direction));
        };

        this.draw = function () {
            push();

            //  PI * 2 rads = full rotation
            translate(this.position.x, this.position.y);
            rotate(-this.rotation * ((PI * 2)/90), createVector(0, 0, 1));
            //  position offsets
            var yOffset = sqrt(pow(this.sideLen, 2) + pow(this.sideLen / 2, 2)) / 2;
            var xOffset = this.sideLen / 2;
            console.log(`${pow(this.sideLen, 2)} | ${pow(this.sideLen / 2, 2)} | ${yOffset}`);

            //  connecting struts
            beginShape();

            stroke(100, 100, 100);
            strokeWeight(5);
            noFill();
            vertex(0, -yOffset);
            vertex(-xOffset, yOffset);
            vertex(xOffset, yOffset);
            vertex(0, -yOffset);

            endShape();

            //  spheres
            fill(192, 192, 192);
            strokeWeight(1);
            ellipse(0, -yOffset, this.sphereDiameter);
            ellipse(-xOffset, yOffset, this.sphereDiameter);
            ellipse(xOffset, yOffset, this.sphereDiameter);

            pop();
        };
    }
}