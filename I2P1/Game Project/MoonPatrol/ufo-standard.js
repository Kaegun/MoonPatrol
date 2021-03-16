function spawnUfoStandardWave(numUfos, ufos) {
    // spawn a wave of x ufo fighters
    for (var i = 0; i < numUfos; i++) {
        var ufo = new UfoStandard();
        ufo.initialize(80, 80);
        ufos.push(ufo);
    }
}

class UfoStandard {
    constructor() {
        this.position;
        this.sideLen = 60;
        this.sphereDiameter = 30;
        this.rotation = 0;

        this.initialize = function (x, y) {
            this.position = createVector(x, y);
        };

        this.update = function () {
            //  move the Ufo - needs to be a predictable pattern, so it doesn't clash with others
            this.rotation++;
        };

        this.draw = function () {
            push();

            angleMode(DEGREES);
            rotate(this.rotation, this.position);
            //  position offsets
            var yOffset = sqrt(pow(this.sideLen, 2) + pow(this.sideLen / 2, 2)) / 2;
            var xOffset = this.sideLen / 2;
            console.log(`${pow(this.sideLen, 2)} | ${pow(this.sideLen / 2, 2)} | ${yOffset}`);

            //  connecting struts
            beginShape();

            stroke(100, 100, 100);
            strokeWeight(5);
            noFill();
            vertex(this.position.x, this.position.y - yOffset);
            vertex(this.position.x - xOffset, this.position.y + yOffset);
            vertex(this.position.x + xOffset, this.position.y + yOffset);
            vertex(this.position.x, this.position.y - yOffset);

            endShape();

            fill(192, 192, 192);
            strokeWeight(1);
            //  spheres
            ellipse(this.position.x, this.position.y - yOffset, this.sphereDiameter);
            ellipse(this.position.x - xOffset, this.position.y + yOffset, this.sphereDiameter);
            ellipse(this.position.x + xOffset, this.position.y + yOffset, this.sphereDiameter);

            pop();
        };
    }
}