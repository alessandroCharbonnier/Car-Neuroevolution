let cars = [];

function preload() {
    bg = loadImage("../images/resizeimg.jpg");
}

function setup() {
    createCanvas(windowWidth, windowHeight);
    rectMode(CENTER);
    cars.push(new Car(2705, 1350, 90.5));
}

function draw() {
    // image(bg, 0, 0, bg.width, bg.height);
    background(0);

    translate(width * 0.5 - cars[0].pos.x, height * 0.5 - cars[0].pos.y);

    for (const car of cars) {
        if (car.alive) {
            car.update();
            car.isDead();
            car.show();
        }
    }

    try {
        line(l.x1, l.y1, mouseX, mouseY);
    } catch (error) {}

    noFill();
    stroke(255);
    strokeWeight(2);
    for (const l of lines) {
        line(l.x1, l.y1, l.x2, l.y2);
    }
}

// function mousePressed() {
//     if (click % 2 === 0) {
//         l = {
//             x1: mouseX,
//             y1: mouseY,
//             x2: null,
//             y2: null
//         };
//     } else {
//         l.x2 = mouseX;
//         l.y2 = mouseY;
//         lines.push(l);
//     }
//
//      click++
// }

// function keyPressed() {
//     if (key === " ") {
//         console.log(JSON.stringify(lines));
//     }
// }
