class Buggy {
    constructor() {
        this.x;
        this.y;
        this.xSpeed;
        this.ySpeed;
        this.colour;
        this.availableColours = [];

        this.initialize = function () {

            this.availableColours.push(color(153, 50, 204)); //  DarkOrchid
            this.availableColours.push(color(85, 107, 47)); //  DarkOliveGreen
            this.availableColours.push(color(255, 140, 0)); //  DarkOrange
            this.availableColours.push(color(95, 158, 160)); //  CadetBlue
            this.availableColours.push(color(25, 25, 112)); //  MidnightBlue
            this.availableColours.push(color(47, 79, 79)); //  DarkSlateGrey
            this.availableColours.push(color(128, 0, 0)); //  Maroon
            console.table(this.availableColours);
            this.colour = this.availableColours[0];
        };

        this.draw = function () {

            stroke(88, 88, 88, 125);
            strokeWeight(2);
            fill(this.colour);

            //  Main Body
            beginShape();

            var x = 800, y = height - 260;
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
            fill(0);
            ellipse(x + 20, y + 50, 45);
            ellipse(x + 70, y + 50, 45);
            ellipse(x + 180, y + 50, 45);

            fill(125);
            ellipse(x + 20, y + 50, 25);
            ellipse(x + 70, y + 50, 25);
            ellipse(x + 180, y + 50, 25);
        };
    }
}