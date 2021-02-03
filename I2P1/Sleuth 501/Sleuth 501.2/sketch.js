/*

Officer: 1192743
CaseNum: 501-1-70116096-1192743

Case 501 - Max Von Neuman - stage 2

Madame McCarthy says that to summon Max Von Neuman a different approach is needed.
Follow her advice below.

How young Max loved to march with his toy soldiers.
To speak to Max beyond the grave you must place a toy soldier in each of the dashed circles.
Use the image() and the item variable command to place each soldier in its position.
You will need to use a separate for loop for each of the diagonal lines.

There are many possible ways of completing this task,
but you should ONLY use the following commands:

 * for()
 * image()

*/

var backgroundImg, item;

function preload() {
    backgroundImg = loadImage("background.jpg");
    item = loadImage("Soldier.png");
}

function setup() {
    createCanvas(backgroundImg.width, backgroundImg.height);
    image(backgroundImg, 0, 0);

    imageMode(CENTER);
}

function draw() {
    // add your for loop below
    for (var i = 0; i < 7; i++)
        image(item, 682 + i * 31, 322 + i * 32);

    for (var i = 0; i < 11; i++)
        image(item, 565 + i * 38, 505 - i * 18);
}
