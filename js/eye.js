class Eye {
    constructor(x1, y1, angle, len) {
        this.x1 = x1;
        this.y1 = y1;
        this.x2 = this.x1 + cos(angle) * len;
        this.y2 = this.y1 + sin(angle) * len;

        this.ipx = this.x2;
        this.ipy = this.y2;

        this.dist = 75;

        this.alpha = 75;
    }

    show() {
        noFill();
        this.dist = dist(this.ipx, this.ipy, this.x1, this.y1);

        stroke(255, this.alpha);
        line(this.x1, this.y1, this.ipx, this.ipy);
        this.drawCross(this.ipx, this.ipy, 15);
    }

    drawCross(x, y, w) {
        noStroke();
        let r = map(this.dist, 5, 75, 255, 0);
        let g = map(this.dist, 5, 75, 0, 255);
        fill(r, g, 0);

        push();
        translate(x, y);
        rotate(-HALF_PI);

        rect(0, 0, w, w * 0.2);
        rotate(HALF_PI);
        rect(0, 0, w, w * 0.2);
        pop();
    }

    intersecting() {
        var colliding = qtree.colliding(
            {
                x: this.ipx,
                y: this.ipy
            },
            (element1, element2) => {
                let x1 = element1.x,
                    y1 = element1.y,
                    x2 = this.x1,
                    y2 = this.y1,
                    x3 = element2.x,
                    y3 = element2.y,
                    x4 = element2.x2,
                    y4 = element2.y2,
                    uA = ((x4 - x3) * (y1 - y3) - (y4 - y3) * (x1 - x3)) / ((y4 - y3) * (x2 - x1) - (x4 - x3) * (y2 - y1)),
                    uB = ((x2 - x1) * (y1 - y3) - (y2 - y1) * (x1 - x3)) / ((y4 - y3) * (x2 - x1) - (x4 - x3) * (y2 - y1));

                if (uA >= 0 && uA <= 1 && uB >= 0 && uB <= 1) {
                    return true;
                } else {
                    return false;
                }
            }
        );
        if (colliding.length > 0) {
            let x1 = this.x1,
                y1 = this.y1,
                x2 = this.x2,
                y2 = this.y2,
                x3 = colliding[0].x,
                y3 = colliding[0].y,
                x4 = colliding[0].x2,
                y4 = colliding[0].y2,
                uA = ((x4 - x3) * (y1 - y3) - (y4 - y3) * (x1 - x3)) / ((y4 - y3) * (x2 - x1) - (x4 - x3) * (y2 - y1));

            this.ipx = x1 + uA * (x2 - x1);
            this.ipy = y1 + uA * (y2 - y1);
            return true;
        } else {
            this.ipx = this.x2;
            this.ipy = this.y2;
            return false;
        }

        /*
        let x3 = this.x1,
            y3 = this.y1,
            x4 = this.x2,
            y4 = this.y2,
            uA = ((x4 - x3) * (y1 - y3) - (y4 - y3) * (x1 - x3)) / ((y4 - y3) * (x2 - x1) - (x4 - x3) * (y2 - y1)),
            uB = ((x2 - x1) * (y1 - y3) - (y2 - y1) * (x1 - x3)) / ((y4 - y3) * (x2 - x1) - (x4 - x3) * (y2 - y1));
        */
    }
}
