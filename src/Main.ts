import Circle from "./Circle";
const { regClass, property } = Laya;

@regClass()
export class Main extends Laya.Script {

    @property(Laya.Box)
    box: Laya.Box;

    @property(Laya.Label)
    label: Laya.Label;

    circleNum: number = 0;

    circlePool: Array<Circle> = [];


    onStart() {
        this.box.on(Laya.Event.CLICK, this, this.onClick);
    }

    onClick(evt: Laya.Event) {
        let x = evt.stageX;
        let y = evt.stageY;
        this.createCircle(x, y);
    }


    createCircle(x: number, y: number) {
        let circle = Laya.Pool.createByClass(Circle);
        circle.init(x, y, 20, this.box, 5);
        this.circlePool.push(circle);

        this.circleNum++;
        this.label.text = this.circleNum.toString();
    }

    onUpdate(): void {
        let time = Laya.timer.delta;


        this.circlePool.forEach((circle, index) => {
            circle.update(time);
        });
    }




}