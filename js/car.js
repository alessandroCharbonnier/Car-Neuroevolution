class Car {
    constructor(x, y, angle, brain) {
        this.pos = createVector(x, y);
        this.vel = createVector(0, 0);
        this.stoppedFrame = 0;
        this.drag = 0.9;
        this.angularVel = 0;
        this.angularDrag = 0.95;
        this.power = 0.3;
        this.turnSpeed = 0.005;
        this.angle = angle;
        this.minSpeed = 0.5;
        this.h = 12;
        this.w = 20;
        this.numEyes = PI / 6;
        this.eyes = [];
        this.r = random(255);
        this.g = random(255);
        this.b = random(255);
        (() => {
            for (let i = -HALF_PI; i <= HALF_PI; i += this.numEyes) {
                const x = this.pos.x,
                    y = this.pos.y,
                    angle = this.angle + i,
                    len = 75;
                this.eyes.push(new Eye(x, y, angle, len));
            }
        })();

        this.score = 1;
        this.fitness = 0;
        if (brain) {
            this.brain = brain.copy();
        } else {
            this.brain = new NeuralNetwork(7, 10, 3, 3);
        }
        this.alive = true;
    }

    dispose() {
        this.brain.dispose();
    }

    mutate() {
        this.brain.mutate(0.1);
    }

    isDead() {
        if (this.stoppedFrame > 15) {
            this.alive = false;
        }
        if (!this.alive) {
            return true;
        }

        for (const e of this.eyes) {
            if (e.dist <= 5) {
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

    think() {
        let inputs = [];
        for (const e of this.eyes) {
            inputs.push(map(e.dist, 5, 75, -1, 1));
        }
        return this.brain.predict(inputs);
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
        this.score *= 2;
    }

    break() {
        this.vel.x -= cos(this.angle) * this.power * 0.5;
        this.vel.y -= sin(this.angle) * this.power * 0.5;
    }

    update() {
        const decision = this.think();
        if (decision[0] > 0.5) {
            this.accelerate();
        }
        if (decision[1] > 0.5) {
            this.turn("right");
        }
        if (decision[2] > 0.5) {
            this.turn("left");
        }

        this.angularVel *= this.angularDrag;
        this.angle += this.angularVel;

        this.vel.mult(this.drag);
        this.pos.add(this.vel);

        if (this.vel.x <= this.minSpeed && this.vel.x >= -this.minSpeed && this.vel.y <= this.minSpeed && this.vel.y >= -this.minSpeed) {
            this.stoppedFrame++;
        }

        this.updateEyes();
        for (const i in this.eyes) {
            this.eyes[i].intersecting();
        }
    }

    show() {
        for (const eye of this.eyes) {
            eye.show();
        }
        noStroke();
        fill(this.r, this.g, this.b);
        push();
        translate(this.pos.x, this.pos.y);
        rotate(this.angle);
        rect(0, 0, this.w, this.h);
        pop();
    }
}
