class Eye {
    constructor(x1, y1, angle, len) {
        this.x1 = x1;
        this.y1 = y1;
        this.x2 = this.x1 + cos(angle) * len;
        this.y2 = this.y1 + sin(angle) * len;

        this.ipx;
        this.ipy;

        this.alpha = 75;
    }

    show() {
        noFill();
        stroke(255, this.alpha);
        line(this.x1, this.y1, this.x2, this.y2);
        this.drawCross(this.ipx, this.ipy, 15);
    }

    drawCross(x, y, w) {
        noStroke();
        fill(255, 0, 0);

        push();
        translate(x, y);
        rotate(-HALF_PI);

        rect(0, 0, w, w * 0.2);
        rotate(HALF_PI);
        rect(0, 0, w, w * 0.2);
        pop();
    }

    intersecting(x1, y1, x2, y2) {
        let x3 = this.x1,
            y3 = this.y1,
            x4 = this.x2,
            y4 = this.y2;
        var uA = ((x4 - x3) * (y1 - y3) - (y4 - y3) * (x1 - x3)) / ((y4 - y3) * (x2 - x1) - (x4 - x3) * (y2 - y1));
        var uB = ((x2 - x1) * (y1 - y3) - (y2 - y1) * (x1 - x3)) / ((y4 - y3) * (x2 - x1) - (x4 - x3) * (y2 - y1));

        if (uA >= 0 && uA <= 1 && uB >= 0 && uB <= 1) {
            this.ipx = x1 + uA * (x2 - x1);
            this.ipy = y1 + uA * (y2 - y1);
            return true;
        } else {
            this.ipx = this.x2;
            this.ipy = this.y2;
            return false;
        }
        // this.ipx = this.x2; // (b2 * c1 - b1 * c2) / delta;
        // this.ipy = this.y2; //(a1 * c2 - a2 * c1) / delta;
    }
}
