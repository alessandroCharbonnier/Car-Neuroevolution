class Car {
    constructor(x, y, angle) {
        this.pos = createVector(x, y);
        this.vel = createVector(0, 0);
        this.drag = 0.9;
        this.angularVel = 0;
        this.angularDrag = 0.95;
        this.power = 0.3;
        this.turnSpeed = 0.005;
        this.angle = angle;
        this.minSpeed = 1;
        this.h = 12;
        this.w = 20;
        this.numEyes = PI / 6;
        this.eyes = [];
        this.alive = true;
    }

    isDead() {
        for (const e of this.eyes) {
            if (dist(e.ipx, e.ipy, this.pos.x, this.pos.y) <= 5) {
                this.alive = false;
                return true;
            }
        }
        return false;
    }

    updateEyes() {
        this.eyes = [];
        for (let i = -HALF_PI; i <= HALF_PI; i += this.numEyes) {
            const x = this.pos.x,
                y = this.pos.y,
                angle = this.angle + i,
                len = 75;
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
        for (const i in this.eyes) {
            for (const l of lines) {
                if (this.eyes[i].intersecting(l.x1, l.y1, l.x2, l.y2)) {
                    break;
                }
            }
        }
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
