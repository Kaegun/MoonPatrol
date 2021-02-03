/*
The case of the Python Syndicate
Stage 4

Officer: 1192743
CaseNum: 301-3-68208653-1192743

To really crack the Python Syndicate we need to go in deep. I want to understand
all the connections. I have the data but it’s a mess and I need you to sort it out.

Organise each syndicate member into an object. I’ve done one for you as an example.
Be sure to replicate the naming conventions for your own objects.
Use image command together with the objects you created to organise the mugshots.

- Once you have done this you can comment out or delete the old variables.

*/

var photoBoard;
var rocky_kray_img;
var cecil_karpinski_img;
var pawel_karpinski_img;
var lina_lovelace_img;
var bones_karpinski_img;
var countess_hamilton_img;

var cecil_karpinski_obj;
var rocky_kray_obj;
var pawel_karpinski_obj;
var lina_lovelace_obj;
var bones_karpinski_obj;
var countess_hamilton_obj;

//declare your new objects below


// var rocky_kray_pos_x = 115;
// var rocky_kray_pos_y = 40;
// var pawel_karpinski_pos_x = 701;
// var pawel_karpinski_pos_y = 40;
// var lina_lovelace_pos_x = 115;
// var lina_lovelace_pos_y = 309;
// var bones_karpinski_pos_x = 408;
// var bones_karpinski_pos_y = 309;
// var countess_hamilton_pos_x = 701;
// var countess_hamilton_pos_y = 309;


function preload() {
	photoBoard = loadImage('photoBoard.png');
	rocky_kray_img = loadImage("krayBrothers1.png");
	cecil_karpinski_img = loadImage("karpinskiBros1.png");
	pawel_karpinski_img = loadImage("karpinskiBros2.png");
	lina_lovelace_img = loadImage("lina.png");
	bones_karpinski_img = loadImage("karpinskiDog.png");
	countess_hamilton_img = loadImage("countessHamilton.png");

}

function setup() {
	createCanvas(photoBoard.width, photoBoard.height);
	cecil_karpinski_obj = {
		x: 408,
		y: 40,
		image: cecil_karpinski_img
	};

	//define your new objects below
	rocky_kray_obj = {
		x: 115,
		y: 40,
		image: rocky_kray_img
	};

	pawel_karpinski_obj = {
		x: 701,
		y: 40,
		image: pawel_karpinski_img
	};

	lina_lovelace_obj = {
		x: 115,
		y: 309,
		image: lina_lovelace_img
	};

	bones_karpinski_obj = {
		x: 408,
		y: 309,
		image: bones_karpinski_img
	};

	countess_hamilton_obj = {
		x: 701,
		y: 309,
		image: countess_hamilton_img
	};
}

function draw() {
	image(photoBoard, 0, 0);

	//And update these image commands with your x and y coordinates.
	image(rocky_kray_obj.image, rocky_kray_obj.x, rocky_kray_obj.y);
	image(cecil_karpinski_obj.image, cecil_karpinski_obj.x, cecil_karpinski_obj.y);
	image(pawel_karpinski_obj.image, pawel_karpinski_obj.x, pawel_karpinski_obj.y);
	image(lina_lovelace_obj.image, lina_lovelace_obj.x, lina_lovelace_obj.y);
	image(bones_karpinski_obj.image, bones_karpinski_obj.x, bones_karpinski_obj.y);
	image(countess_hamilton_obj.image, countess_hamilton_obj.x, countess_hamilton_obj.y);


}