let cars = [];

function setup() {
    createCanvas(windowWidth, windowHeight);
    rectMode(CENTER);
    cars.push(new Car(250, 250));
}

function draw() {
    background(0);

    for (const car of cars) {
        car.update();
        car.show();
    }
}
