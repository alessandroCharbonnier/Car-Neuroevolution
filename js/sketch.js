let cars = [];
let savedCars = [];
const TOTAL = 50;
let tx = -2084.5,
    ty = -971.5;
let qtree;

function setup() {
    createCanvas(windowWidth, windowHeight);
    rectMode(CENTER);
    for (let i = 0; i < TOTAL; i++) cars.push(new Car(2705, 1350, 90.5));
}

function draw() {
    buildQtree();
    background(0);
    const bestCar = findBest();
    tx = lerp(tx, width * 0.5 - bestCar.pos.x, 0.05);
    ty = lerp(ty, height * 0.5 - bestCar.pos.y, 0.05);
    translate(tx, ty);

    if (cars.length === 0) {
        nextGeneration();
    }

    let oneAlive = false;
    for (const i in cars) {
        if (cars[i].isDead()) {
            savedCars.push(cars.splice(i, 1)[0]);
        } else {
            oneAlive = true;
        }
    }

    if (!oneAlive) {
        nextGeneration();
    }

    noFill();
    stroke(255);
    strokeWeight(2);
    for (const l of lines) {
        line(l.x1, l.y1, l.x2, l.y2);
    }

    for (const car of cars) {
        if (car.alive) {
            car.update();
        }
        car.show();
    }

    // try {
    //     line(l.x1, l.y1, mouseX, mouseY);
    // } catch (error) {}
}

function findBest() {
    let bestScore = -1;
    let bestCar;
    for (const c of cars) {
        if (c.score > bestScore) {
            bestScore = c.score;
            bestCar = c;
        }
    }
    return bestCar;
}

function buildQtree() {
    qtree = new Quadtree({
        width: windowWidth,
        height: windowHeight,
        maxElements: 2 //Optional
    });
    for (const l of lines) {
        stroke(0, 255, 0);
        qtree.push({
            x: l.x1,
            y: l.y1,
            x2: l.x2,
            y2: l.y2,
            width: 75,
            height: 75
        });
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

function keyPressed() {
    if (key === " ") {
        for (const car of cars) {
            savedCars.push(car);
        }
        cars = [];
        nextGeneration();
    }
}

function windowResized() {
    resizeCanvas(windowWidth, windowHeight);
}
