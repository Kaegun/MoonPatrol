//  Common helper functions

//  Logic is the same for all bullets from all UFOs
function updateBullets(bullets) {
    for (var i = bullets.length - 1; i >= 0; i--) {
        //  if below the ground, remove it
        if (bullets[i].hitGround()) {
            bullets.splice(i, 1);
        }
        else
            bullets[i].update();
    }
}

function testBulletsCollision(bullets, collider, collisionRadius) {
    for (var i = bullets.length - 1; i >= 0; i--) {
        if (bullets[i].position.dist(collider) < collisionRadius) {
            bullets.splice(i, 1);
            return true;
        }
    }
};

//  Logic is the same for all bullets from all UFOs
function drawArray(objects) {
    for (var i = 0; i < objects.length; i++) {
        objects[i].draw();
    }
}

//  Clear all elements from an array
function clearArray(array) {
    if (array && array.length && array.length > 0)
        array.splice(0, array.length);
}

//  Draw an array of points as a Vertex Shape
function drawVertexShape(points) {
    beginShape();

    for (var i = 0; i < points.length; i++)
        vertex(points[i].x, points[i].y);

    endShape();
}