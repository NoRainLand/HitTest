export default class Circle {
    circle: Laya.Sprite;

    force: Laya.Vector2;

    radius: number;

    diameter: number;

    minX: number;
    maxX: number;
    minY: number;
    maxY: number;

    isHit: boolean = false;

    changeColorTime: number = 0;


    init(x: number, y: number, radius: number, parent: Laya.Node, forceScale: number = 1) {
        if (!this.circle) {
            this.createCircle(x, y, radius, parent);
        }
        this.reset(forceScale);
    }

    reset(forceScale: number = 1) {
        this.circle.graphics.drawCircle(this.radius, this.radius, this.diameter, '#0f0');
        let angle = Math.random() * 2 * Math.PI;
        this.force = new Laya.Vector2(Math.cos(angle) * forceScale, Math.sin(angle) * forceScale);
    }

    createCircle(x: number, y: number, radius: number, parnet: Laya.Node) {
        this.radius = radius;
        this.diameter = radius * 2;
        this.minX = this.radius;
        this.maxX = Laya.stage.width - this.radius;
        this.minY = this.radius;
        this.maxY = Laya.stage.height - this.radius;


        this.circle = new Laya.Sprite();
        this.circle.size(this.diameter, this.diameter);
        this.circle.pivot(this.radius, this.radius);
        this.circle.pos(x, y);
        parnet.addChild(this.circle);
    }

    update(dt: number) {
        this.circle.x += this.force.x;
        this.circle.y += this.force.y;


        if (this.circle.x < this.minX) {
            this.circle.x = this.minX;
            this.force.x *= -1;
        }

        if (this.circle.x > this.maxX) {
            this.circle.x = this.maxX;
            this.force.x *= -1;
        }

        if (this.circle.y < this.minY) {
            this.circle.y = this.minY;
            this.force.y *= -1;
        }

        if (this.circle.y > this.maxY) {
            this.circle.y = this.maxY;
            this.force.y *= -1;
        }

        if (this.changeColorTime > 0) {
            this.changeColorTime -= dt;
            if (this.changeColorTime <= 0) {
                this.isHit = false;
                this.circle.graphics.drawCircle(this.radius, this.radius, this.diameter, '#0f0');
            }
        }
    }

    hit(force: Laya.Vector2) {
        this.changeColorTime = 500;
        this.isHit = true;
        this.circle.graphics.drawCircle(this.radius, this.radius, this.diameter, '#f00');



    }

    clear() {
        Laya.timer.clear(this, this.update);
    }

}