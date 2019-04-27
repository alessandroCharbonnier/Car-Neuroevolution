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
        this.drawCross(this.x2, this.y2, 15);
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
}
