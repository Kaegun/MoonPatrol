class Buggy {
    constructor() {
        this.position;
        this.speed;
        this.frameCounter = 0;

        this.colour;
        this.colourIdx;
        this.availableColours = [];

        this.wheels = [];

        this.initialize = function (floorPos_y) {

            this.availableColours.push(color(153, 50, 204)); //  DarkOrchid
            this.availableColours.push(color(85, 107, 47)); //  DarkOliveGreen
            this.availableColours.push(color(255, 140, 0)); //  DarkOrange
            this.availableColours.push(color(95, 158, 160)); //  CadetBlue
            this.availableColours.push(color(25, 25, 112)); //  MidnightBlue
            this.availableColours.push(color(47, 79, 79)); //  DarkSlateGrey
            this.availableColours.push(color(128, 0, 0)); //  Maroon

            this.colourIdx = 0;
            this.setActiveColour();

            //  Set floor height to initial value.
            this.position = createVector(width / 2, floorPos_y);

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

            stroke(88, 88, 88, 125);
            strokeWeight(2);
            fill(this.colour);

            //  Main Body
            beginShape();

            var x = this.position.x, y = this.position.y - 50;
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
        };

        this.update = function () {
            //  make the wheels wobble randomly - use the current speed to determine bounce speed
            if (++this.frameCounter % 10 == 0) {
                for (var i = 0; i < this.wheels.length; i++) {
                    this.wheels[i].y = random(47, 53);
                }
            }
        };

        this.setActiveColour = function () {
            this.colour = this.availableColours[this.colourIdx];
        };
    }
}