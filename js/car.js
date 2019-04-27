class Car {
    constructor(x, y) {
        this.pos = createVector(x, y);
        this.vel = createVector(0, 0);
        this.drag = 0.9;
        this.angularVel = 0;
        this.angularDrag = 0.95;
        this.power = 0.55;
        this.turnSpeed = 0.005;
        this.angle = 0;
        this.minSpeed = 1;
        this.h = 12;
        this.w = 20;
        this.eyes = [];
        (() => {
            for (let i = -HALF_PI; i <= HALF_PI; i += PI / 6) {
                const x = this.pos.x,
                    y = this.pos.y,
                    angle = this.angle + i,
                    len = 175;
                this.eyes.push(new Eye(x, y, angle, len));
            }
        })();
    }

    updateEyes() {
        this.eyes = [];
        for (let i = -HALF_PI; i <= HALF_PI; i += PI / 6) {
            const x = this.pos.x,
                y = this.pos.y,
                angle = this.angle + i,
                len = 175;
            this.eyes.push(new Eye(x, y, angle, len));
        }
    }

    turn(direction) {
        if (!(this.vel.x <= this.minSpeed && this.vel.x >= -this.minSpeed && this.vel.y <= this.minSpeed && this.vel.y >= -this.minSpeed)) {
            if (direction === "right") {
                this.angularVel += this.turnSpeed;
            } else if (direction === "left") {
                this.angularVel -= this.turnSpeed;
            }
        }
    }

    accelerate() {
        this.vel.x += cos(this.angle) * this.power;
        this.vel.y += sin(this.angle) * this.power;
    }

    break() {
        this.vel.x -= cos(this.angle) * this.power * 0.5;
        this.vel.y -= sin(this.angle) * this.power * 0.5;
    }

    update() {
        if (keyIsDown(68)) {
            this.turn("right");
        }
        if (keyIsDown(81)) {
            this.turn("left");
        }

        if (keyIsDown(90)) {
            this.accelerate();
        }
        if (keyIsDown(83)) {
            this.break();
        }

        this.pos.add(this.vel);
        this.vel.mult(this.drag);

        this.angularVel *= this.angularDrag;
        this.angle += this.angularVel;

        this.updateEyes();
    }

    show() {
        noStroke();
        fill(255, 0, 0);
        push();
        translate(this.pos.x, this.pos.y);
        rotate(this.angle);
        rect(0, 0, this.w, this.h);
        pop();

        for (const eye of this.eyes) {
            eye.show();
        }
    }
}
